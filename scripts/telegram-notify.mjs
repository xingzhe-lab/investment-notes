import { execFileSync } from "node:child_process"
import { readFileSync } from "node:fs"
import path from "node:path"

const before = process.env.GITHUB_EVENT_BEFORE
const changed = execFileSync("git", ["diff", "--name-only", "HEAD^", "HEAD", "--", "content"], { encoding: "utf8" })
  .split(/\r?\n/)
  .filter((file) => file.endsWith(".md") && !file.endsWith(".gitkeep"))
  .slice(0, 5)

if (changed.length === 0) {
  console.log("没有文章变更，跳过 Telegram 通知。")
  process.exit(0)
}

const articles = changed.map((file) => {
  const content = readFileSync(file, "utf8")
  const title = content.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? path.basename(file, ".md")
  const paragraph = content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .find((line) => line && !line.startsWith("#") && !line.startsWith(">") && !line.startsWith("---") && !line.startsWith("|"))
    ?.replace(/[*_`]/g, "")
    ?.slice(0, 180)
  const slug = file.slice("content/".length, -".md".length).split(path.sep).join("/")
  return { title, paragraph, url: `${process.env.SITE_URL}/${encodeURI(slug)}` }
})

const text = articles
  .map(({ title, paragraph, url }) => `📚 <b>${escapeHtml(title)}</b>\n${escapeHtml(paragraph ?? "新的投资读书笔记已发布。")}\n<a href="${url}">阅读全文</a>`)
  .join("\n\n")

const response = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ chat_id: process.env.TELEGRAM_CHAT_ID, text, parse_mode: "HTML", disable_web_page_preview: false }),
})

if (!response.ok) throw new Error(`Telegram 通知失败：${await response.text()}`)

function escapeHtml(value) {
  return value.replace(/[&<>]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[char])
}
