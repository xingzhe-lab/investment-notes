from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import unicodedata
from pathlib import Path

import mammoth


ZERO_WIDTH = {"\u200b", "\u200c", "\u200d", "\u2060", "\ufeff"}
CONTENT_TYPE_EXTENSIONS = {
    "image/png": ".png",
    "image/jpeg": ".jpg",
    "image/gif": ".gif",
    "image/svg+xml": ".svg",
    "image/webp": ".webp",
    "image/tiff": ".tiff",
    "image/bmp": ".bmp",
}


def clean_markdown(text: str) -> str:
    text = text.replace("\r\n", "\n").replace("\r", "\n")
    normalized: list[str] = []
    for char in text:
        if char in ZERO_WIDTH:
            continue
        if char == "\t":
            normalized.append(" ")
        elif char != " " and unicodedata.category(char) == "Zs":
            normalized.append(" ")
        else:
            normalized.append(char)
    text = "".join(normalized)

    lines: list[str] = []
    for line in text.split("\n"):
        line = re.sub(r" {2,}", " ", line).strip()
        # Word exports frequently split thousands and dates with ordinary spaces.
        while re.search(r"(?<=\d) (?=\d)", line):
            line = re.sub(r"(?<=\d) (?=\d)", "", line)
        lines.append(line)
    text = "\n".join(lines)
    text = re.sub(r"\n{3,}", "\n\n", text).strip()
    return text + "\n" if text else ""


def convert_one(source: Path, destination: Path, output_root: Path) -> list[str]:
    destination.parent.mkdir(parents=True, exist_ok=True)
    attachments = output_root / "attachments"
    written_images: list[str] = []

    def save_image(image):
        with image.open() as stream:
            data = stream.read()
        extension = CONTENT_TYPE_EXTENSIONS.get(image.content_type, ".bin")
        name = hashlib.sha256(data).hexdigest()[:16] + extension
        target = attachments / name
        attachments.mkdir(parents=True, exist_ok=True)
        if not target.exists():
            target.write_bytes(data)
        written_images.append(name)
        relative = os.path.relpath(target, destination.parent).replace("\\", "/")
        return {"src": relative}

    with source.open("rb") as docx:
        result = mammoth.convert_to_markdown(
            docx,
            convert_image=mammoth.images.img_element(save_image),
        )

    title = source.stem.strip()
    body = clean_markdown(result.value)
    modified = source.stat().st_mtime
    date = __import__("datetime").datetime.fromtimestamp(modified).date().isoformat()
    frontmatter = (
        "---\n"
        f"title: {json.dumps(title, ensure_ascii=False)}\n"
        f"date: {date}\n"
        "tags:\n"
        "  - 杂文\n"
        "---\n\n"
    )
    destination.write_text(frontmatter + body, encoding="utf-8", newline="\n")
    return result.messages


def main() -> int:
    parser = argparse.ArgumentParser(description="Convert a DOCX tree to clean Quartz Markdown.")
    parser.add_argument("source", type=Path)
    parser.add_argument("output", type=Path)
    args = parser.parse_args()

    source = args.source.resolve()
    output = args.output.resolve()
    if not source.is_dir():
        raise SystemExit(f"Source directory not found: {source}")
    if output.exists() and any(output.iterdir()):
        raise SystemExit(f"Output directory is not empty: {output}")

    documents = sorted(source.rglob("*.docx"), key=lambda path: str(path).casefold())
    output.mkdir(parents=True, exist_ok=True)
    failures: list[dict[str, str]] = []
    warnings = 0

    for index, document in enumerate(documents, 1):
        relative = document.relative_to(source).with_suffix(".md")
        try:
            messages = convert_one(document, output / relative, output)
            warnings += len(messages)
        except Exception as exc:  # keep the batch auditable
            failures.append({"file": str(relative), "error": str(exc)})
        print(f"[{index}/{len(documents)}] {relative}")

    report = {
        "source": str(source),
        "output": str(output),
        "docx_count": len(documents),
        "markdown_count": len(documents) - len(failures),
        "warning_count": warnings,
        "failures": failures,
    }
    (output / "conversion-report.json").write_text(
        json.dumps(report, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(json.dumps(report, ensure_ascii=False, indent=2))
    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main())
