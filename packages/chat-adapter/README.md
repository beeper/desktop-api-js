# Beeper Desktop API Chat Adapter

Chat SDK adapter for Beeper Desktop API built on top of `@beeper/desktop-api`.

## Install

```bash
yarn add @beeper/chat-adapter-desktop-api
```

## Usage

```ts
import { Chat } from "chat";
import { createMemoryState } from "@chat-adapter/state-memory";
import { createBeeperDesktopAPIAdapter } from "@beeper/chat-adapter-desktop-api";

const adapter = createBeeperDesktopAPIAdapter({
  accessToken: process.env.BEEPER_DESKTOP_API_ACCESS_TOKEN!,
  botUserID: process.env.BEEPER_DESKTOP_API_BOT_USER_ID,
  defaultAccountID: process.env.BEEPER_DESKTOP_API_DEFAULT_ACCOUNT_ID,
});

const bot = new Chat({
  userName: "bot",
  adapters: { beeperDesktopAPI: adapter },
  state: createMemoryState(),
});

await bot.initialize();
console.log(adapter.getDesktopAPIServerInfo());
await adapter.startEventsListener(["*"]);
```

## Implemented easy-win features

- `openDM(userID)` with either:
  - scoped input `<accountID>:<participantID>`, or
  - `defaultAccountID` in adapter config
- `fetchMessage(threadID, messageID)`
- `fetchChannelInfo(channelId)`
- `listThreads(channelId, { cursor, limit })`
- auto reconnect for WS listener (`wsReconnectDelayMs`, default `3000`)
- auto server version detection (`/v1/info` first, then response headers fallback)

## Logger Example

A runnable logger example is included in `examples/logger`.

Run it:

```bash
BEEPER_DESKTOP_API_ACCESS_TOKEN=... yarn example:logger
```

If you run the example file directly:

```bash
yarn build
cd examples/logger
BEEPER_DESKTOP_API_ACCESS_TOKEN=... node index.mjs
```

Optional env vars:

- `BEEPER_DESKTOP_API_BASE_URL` (default `http://localhost:23373`)
- `BEEPER_DESKTOP_API_BOT_USER_ID`
- `BEEPER_DESKTOP_API_BOT_NAME`
- `BEEPER_DESKTOP_API_CHAT_IDS` (comma-separated, default `*`)
- `BEEPER_DESKTOP_API_DEFAULT_ACCOUNT_ID`
