const expectedBot = "touzizhidao_publish_bot"
const expectedChannel = "投资之道"
const token = process.env.TELEGRAM_BOT_TOKEN
const title = process.env.ARTICLE_TITLE
const pageUrl = process.env.ARTICLE_URL

if (!token || !title || !pageUrl) throw new Error("缺少 Telegram 密钥、文章标题或文章链接")

const apiBase = `https://api.telegram.org/bot${token}`
const botResponse = await fetch(`${apiBase}/getMe`)
if (!botResponse.ok) throw new Error("无法核验 Telegram 机器人")
const bot = (await botResponse.json()).result
if (bot.username !== expectedBot) {
  throw new Error(`机器人身份不符：@${bot.username ?? "unknown"}`)
}

const updatesResponse = await fetch(
  `${apiBase}/getUpdates?offset=-100&limit=100&allowed_updates=%5B%22channel_post%22%2C%22edited_channel_post%22%2C%22my_chat_member%22%2C%22chat_member%22%5D`,
)
if (!updatesResponse.ok) throw new Error("无法读取 Telegram 频道信息")
const updates = (await updatesResponse.json()).result ?? []
const chats = updates.flatMap((update) =>
  ["channel_post", "edited_channel_post", "my_chat_member", "chat_member"]
    .map((kind) => update[kind]?.chat)
    .filter(Boolean),
)
const channelIds = [...new Set(chats.filter((chat) => chat.title === expectedChannel).map((chat) => String(chat.id)))]
if (channelIds.length !== 1) throw new Error(`频道匹配数异常：${channelIds.length}`)

const chatId = channelIds[0]
const membershipResponse = await fetch(`${apiBase}/getChatMember`, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ chat_id: chatId, user_id: bot.id }),
})
if (!membershipResponse.ok) throw new Error("无法核验机器人频道权限")
const membership = (await membershipResponse.json()).result
if (membership.status !== "administrator" || membership.can_post_messages !== true) {
  throw new Error("机器人没有频道发布权限")
}

const text = `<a href="${escapeHtml(pageUrl)}">${escapeHtml(title)}</a>`
const sendResponse = await fetch(`${apiBase}/sendMessage`, {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    chat_id: chatId,
    text,
    parse_mode: "HTML",
    link_preview_options: { is_disabled: true },
  }),
})
if (!sendResponse.ok) throw new Error("Telegram 标题链接发送失败")
const sent = (await sendResponse.json()).result
if (sent.chat?.title !== expectedChannel) throw new Error("Telegram 返回的频道名称不符")
console.log(`发送成功：频道=${sent.chat.title} 消息ID=${sent.message_id}`)

function escapeHtml(value) {
  return value.replace(/[&<>\"]/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
  })[char])
}
