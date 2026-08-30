import { execFileSync } from "node:child_process"
import { existsSync, readFileSync } from "node:fs"
import path from "node:path"

const batchManifest = "content/.telegram-publish-batch.json"
const batch = existsSync(batchManifest) ? JSON.parse(readFileSync(batchManifest, "utf8")) : undefined
const changed = batch?.files
  ? batch.files
  : execFileSync("git", ["diff", "--name-only", "HEAD^", "HEAD", "--", "content"], { encoding: "utf8" })
      .split(/\r?\n/)
      .filter((file) => file.endsWith(".md") && !file.endsWith(".gitkeep"))
      // 易学频道由已登录的 Telegram Desktop 账号发布，不使用当前仓库的默认机器人频道。
      .filter((file) => !file.startsWith("content/易学/") && !file.startsWith("content\\易学\\"))
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
  const slug = quartzSlug(file)
  return { title, paragraph, url: `${process.env.SITE_URL}/${encodeURI(slug)}` }
})

console.log(`准备发布 ${articles.length} 篇${batch ? "批量" : "更新"}文章。`)

for (const [index, article] of articles.entries()) {
  const text = `📚 <b>${escapeHtml(article.title)}</b>\n${escapeHtml(article.paragraph ?? "新的投资读书笔记已发布。")}\n<a href="${article.url}">阅读全文</a>`
  const response = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ chat_id: process.env.TELEGRAM_CHAT_ID, text, parse_mode: "HTML", disable_web_page_preview: false }),
  })

  if (!response.ok) throw new Error(`Telegram 第 ${index + 1} 篇通知失败：${await response.text()}`)
  console.log(`已发布 ${index + 1}/${articles.length}：${article.title}`)
  if (index < articles.length - 1) await new Promise((resolve) => setTimeout(resolve, 3200))
}

function escapeHtml(value) {
  return value.replace(/[&<>]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[char])
}

function quartzSlug(file) {
  return file
    .replace(/^content[\\/]/, "")
    .replace(/\.md$/i, "")
    .split(/[\\/]/)
    .map((segment) =>
      segment
        .replace(/\s/g, "-")
        .replace(/&/g, "-and-")
        .replace(/%/g, "-percent")
        .replace(/[?#]/g, "")
        .replace(/[<>:"|*]/g, "")
        .toLowerCase(),
    )
    .join("/")
}
