import { Chat } from "chat";
import { createMemoryState } from "@chat-adapter/state-memory";
import { createBeeperDesktopAPIAdapter } from "../../dist/index.js";

const accessToken = process.env.BEEPER_DESKTOP_API_ACCESS_TOKEN;
if (!accessToken) {
  throw new Error("Missing BEEPER_DESKTOP_API_ACCESS_TOKEN");
}

const baseUrl = process.env.BEEPER_DESKTOP_API_BASE_URL ?? "http://localhost:23373";
const botUserID = process.env.BEEPER_DESKTOP_API_BOT_USER_ID;
const defaultAccountID = process.env.BEEPER_DESKTOP_API_DEFAULT_ACCOUNT_ID;
const chatIDs = (process.env.BEEPER_DESKTOP_API_CHAT_IDS ?? "*")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);

const adapter = createBeeperDesktopAPIAdapter({
  baseUrl,
  accessToken,
  botUserID,
  defaultAccountID,
  autoConnectEvents: false,
  userName: process.env.BEEPER_DESKTOP_API_BOT_NAME ?? "bot",
});

const bot = new Chat({
  userName: process.env.BEEPER_DESKTOP_API_BOT_NAME ?? "bot",
  adapters: {
    beeperDesktopAPI: adapter,
  },
  state: createMemoryState(),
  logger: "info",
});

bot.onNewMention(async (thread, message) => {
  console.log("[mention]", {
    threadId: thread.id,
    messageId: message.id,
    sender: message.author.userName,
    text: message.text,
  });
  await thread.subscribe();
});

bot.onNewMessage(/[\s\S]*/u, async (thread, message) => {
  console.log("[new-message]", {
    threadId: thread.id,
    messageId: message.id,
    sender: message.author.userName,
    isMention: message.isMention,
    text: message.text,
  });
});

bot.onSubscribedMessage(async (thread, message) => {
  console.log("[subscribed-message]", {
    threadId: thread.id,
    messageId: message.id,
    sender: message.author.userName,
    text: message.text,
  });
});

bot.onReaction(async (event) => {
  console.log("[reaction]", {
    threadId: event.threadId,
    messageId: event.messageId,
    added: event.added,
    emoji: event.rawEmoji,
    by: event.user.userName,
  });
});

await bot.initialize();
console.log("BeeperDesktopAPI server info", adapter.getDesktopAPIServerInfo());
await adapter.startEventsListener(chatIDs);

console.log("BeeperDesktopAPI logger is running", {
  baseUrl,
  chatIDs,
});

await new Promise(() => {});
