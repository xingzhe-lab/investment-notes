import { readFileSync } from "node:fs"

const token = process.env.TELEGRAM_BOT_TOKEN
const messagesPath = process.env.TELEGRAM_MESSAGES_PATH ?? "static/misc-20260902/messages.json"
const mode = process.env.PUBLISH_MODE ?? "discover"
const startIndex = Number.parseInt(process.env.START_INDEX ?? "1", 10)

if (!token) throw new Error("缺少 TELEGRAM_BOT_TOKEN")
if (!Number.isInteger(startIndex) || startIndex < 1) throw new Error("START_INDEX 必须是正整数")

const bot = await telegram("getMe")
console.log(`发布机器人：@${bot.result.username}`)

const updates = await telegram("getUpdates", {
  allowed_updates: JSON.stringify(["channel_post", "my_chat_member"]),
})
const chats = new Map()
for (const update of updates.result ?? []) {
  const chat = update.channel_post?.chat ?? update.my_chat_member?.chat
  if (chat?.id) chats.set(String(chat.id), chat)
}
for (const chat of chats.values()) {
  console.log(`频道识别：${chat.title ?? ""} ${chat.id}`)
}

const target = [...chats.values()].find((chat) => chat.title === "杂文")
if (!target) {
  throw new Error("未在机器人更新中识别到“杂文”频道。请在频道中发一条新消息后重试。")
}
console.log(`已锁定“杂文”频道：${target.id}`)

if (mode === "discover") process.exit(0)

const messages = JSON.parse(readFileSync(messagesPath, "utf8"))
if (!Array.isArray(messages) || messages.length === 0) throw new Error("发布清单为空")

const selected = mode === "test"
  ? messages.filter((item) => item.index === startIndex).slice(0, 1)
  : messages.filter((item) => item.index >= startIndex)

if (selected.length === 0) throw new Error(`没有找到从第 ${startIndex} 篇开始的消息`)
console.log(`准备向“杂文”频道发布 ${selected.length} 篇，起始序号 ${startIndex}。`)

for (const [offset, item] of selected.entries()) {
  await telegram("sendMessage", {
    chat_id: target.id,
    text: item.text,
    disable_web_page_preview: false,
  })
  console.log(`已发布 ${offset + 1}/${selected.length}，清单序号 ${item.index}`)
  if (offset < selected.length - 1) await new Promise((resolve) => setTimeout(resolve, 3200))
}

async function telegram(method, body) {
  const response = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body ?? {}),
  })
  const payload = await response.json()
  if (!response.ok || !payload.ok) {
    throw new Error(`Telegram ${method} 失败：${JSON.stringify(payload)}`)
  }
  return payload
}
