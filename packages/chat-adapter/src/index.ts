import BeeperDesktop from "@beeper/desktop-api";
import { cardToFallbackText, extractCard } from "@chat-adapter/shared";
import type {
  Adapter,
  AdapterPostableMessage,
  ChannelInfo,
  ChatInstance,
  EmojiValue,
  FetchOptions,
  FetchResult,
  FormattedContent,
  ListThreadsOptions,
  ListThreadsResult,
  Logger,
  RawMessage,
  ThreadSummary,
  ThreadInfo,
  WebhookOptions,
} from "chat";
import { ConsoleLogger, Message, parseMarkdown, stringifyMarkdown } from "chat";
import WebSocket from "ws";
import type {
  BeeperDesktopAPIAdapterConfig,
  BeeperDesktopAPIMessage,
  BeeperDesktopAPIServerInfo,
  BeeperDesktopAPIThreadID,
  WSEventEnvelope,
} from "./types";

export class BeeperDesktopAPIAdapter implements Adapter<BeeperDesktopAPIThreadID, unknown> {
  readonly name = "beeperDesktopAPI";
  readonly userName: string;
  readonly botUserID?: string;

  get botUserId(): string | undefined {
    return this.botUserID;
  }

  private readonly baseUrl: string;
  private readonly accessToken: string;
  private readonly wsEventsUrl?: string;
  private readonly defaultAccountID?: string;
  private readonly autoConnectEvents: boolean;
  private readonly wsReconnectDelayMs: number;
  private readonly logger: Logger;
  private readonly client: BeeperDesktop;
  private chat: ChatInstance | null = null;
  private ws: WebSocket | null = null;
  private wsSubscriptions: string[] = ["*"];
  private reconnectTimer: NodeJS.Timeout | null = null;
  private manualStopWS = false;
  private reactionStateByMessage = new Map<string, Set<string>>();
  private serverInfo: BeeperDesktopAPIServerInfo = { source: "unknown" };

  constructor(config: BeeperDesktopAPIAdapterConfig & { logger: Logger }) {
    this.baseUrl = (config.baseUrl ?? "http://localhost:23373").replace(/\/+$/, "");
    this.accessToken = config.accessToken;
    this.wsEventsUrl = config.wsEventsUrl;
    this.defaultAccountID = config.defaultAccountID;
    this.autoConnectEvents = config.autoConnectEvents ?? false;
    this.wsReconnectDelayMs = config.wsReconnectDelayMs ?? 3000;
    this.logger = config.logger;
    this.userName = config.userName ?? "bot";
    this.botUserID = config.botUserID ?? config.botUserId;
    this.client = new BeeperDesktop({
      accessToken: this.accessToken,
      baseURL: this.baseUrl,
    });
  }

  async initialize(chat: ChatInstance): Promise<void> {
    this.chat = chat;
    await this.detectServerInfo();
    this.logger.info("BeeperDesktopAPI adapter initialized", {
      baseUrl: this.baseUrl,
      autoConnectEvents: this.autoConnectEvents,
      wsReconnectDelayMs: this.wsReconnectDelayMs,
      serverInfo: this.serverInfo,
    });

    if (this.autoConnectEvents) {
      await this.startEventsListener();
    }
  }

  async handleWebhook(_request: Request, _options?: WebhookOptions): Promise<Response> {
    return new Response(
      "BeeperDesktopAPI uses WebSocket events (/v1/ws), not inbound webhooks. Call startEventsListener().",
      { status: 501 },
    );
  }

  getDesktopAPIServerInfo(): BeeperDesktopAPIServerInfo {
    return this.serverInfo;
  }

  async startEventsListener(chatIDs: string[] = ["*"]): Promise<void> {
    if (!this.chat) {
      throw new Error("Chat instance not initialized");
    }
    this.manualStopWS = false;
    this.wsSubscriptions = chatIDs;
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }

    const wsURL = this.wsEventsUrl ?? `${this.baseUrl.replace(/^http/, "ws")}/v1/ws`;
    this.ws = new WebSocket(wsURL, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    this.ws.on("open", () => {
      this.logger.info("BeeperDesktopAPI WS connected", { wsURL });
      this.ws?.send(JSON.stringify({ type: "subscriptions.set", chatIDs }));
    });

    this.ws.on("message", (raw: WebSocket.RawData) => {
      void this.handleWSEvent(raw.toString());
    });

    this.ws.on("error", (error: Error) => {
      this.logger.error("BeeperDesktopAPI WS error", { error: String(error) });
    });

    this.ws.on("close", () => {
      this.logger.warn("BeeperDesktopAPI WS disconnected");
      this.ws = null;
      if (!(this.manualStopWS || !this.autoConnectEvents)) {
        this.scheduleReconnect();
      }
    });
  }

  stopEventsListener(): void {
    this.manualStopWS = true;
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    this.ws?.close();
    this.ws = null;
  }

  async postMessage(threadID: string, message: AdapterPostableMessage): Promise<RawMessage<unknown>> {
    const { chatID } = this.decodeThreadId(threadID);
    const text = this.renderPostable(message);

    const result = await this.client.messages.send(chatID, { text });

    return {
      id: result.pendingMessageID,
      threadId: threadID,
      raw: result,
    };
  }

  async editMessage(threadID: string, messageID: string, message: AdapterPostableMessage): Promise<RawMessage<unknown>> {
    const { chatID } = this.decodeThreadId(threadID);
    const text = this.renderPostable(message);

    await this.client.put(`/v1/chats/${encodeURIComponent(chatID)}/messages/${encodeURIComponent(messageID)}`, {
      body: { text },
    });

    return { id: messageID, threadId: threadID, raw: { ok: true } };
  }

  async deleteMessage(threadID: string, messageID: string): Promise<void> {
    const { chatID } = this.decodeThreadId(threadID);
    await this.client.delete(`/v1/chats/${encodeURIComponent(chatID)}/messages/${encodeURIComponent(messageID)}`, {
      body: { forEveryone: false },
    });
  }

  async addReaction(threadID: string, messageID: string, emoji: EmojiValue | string): Promise<void> {
    const { chatID } = this.decodeThreadId(threadID);
    await this.client.post(`/v1/chats/${encodeURIComponent(chatID)}/messages/${encodeURIComponent(messageID)}/reactions`, {
      body: { reactionKey: String(emoji) },
    });
  }

  async removeReaction(threadID: string, messageID: string, emoji: EmojiValue | string): Promise<void> {
    const { chatID } = this.decodeThreadId(threadID);
    await this.client.delete(`/v1/chats/${encodeURIComponent(chatID)}/messages/${encodeURIComponent(messageID)}/reactions`, {
      query: { reactionKey: String(emoji) },
    });
  }

  async startTyping(threadID: string): Promise<void> {
    const { chatID } = this.decodeThreadId(threadID);
    await this.client.post(`/v1/chats/${encodeURIComponent(chatID)}/typing`, {
      body: { isTyping: true },
    });
  }

  async fetchMessages(threadID: string, options: FetchOptions = {}): Promise<FetchResult<unknown>> {
    const { chatID, accountID } = this.decodeThreadId(threadID);
    const direction = options.direction ?? "backward";

    const data = await this.client.messages.search({
      chatIDs: [chatID],
      limit: options.limit,
      cursor: options.cursor,
      direction: direction === "forward" ? "after" : "before",
    });

    return {
      messages: data.items
        .filter((item: any) => item.chatID === chatID)
        .map((item: any) => this.toChatMessage(item as unknown as BeeperDesktopAPIMessage, accountID, threadID)),
      nextCursor: direction === "forward" ? (data.newestCursor ?? undefined) : (data.oldestCursor ?? undefined),
    };
  }

  async fetchMessage(threadID: string, messageID: string): Promise<Message<unknown> | null> {
    const { chatID, accountID } = this.decodeThreadId(threadID);

    try {
      const message = await this.client.get<BeeperDesktopAPIMessage>(
        `/v1/chats/${encodeURIComponent(chatID)}/messages/${encodeURIComponent(messageID)}`,
      );
      return this.toChatMessage(message, accountID, threadID);
    } catch {
      const data = await this.client.messages.search({
        chatIDs: [chatID],
        limit: 50,
      });
      const found = data.items.find((item: any) => item.id === messageID);
      if (!found) return null;
      return this.toChatMessage(found as unknown as BeeperDesktopAPIMessage, accountID, threadID);
    }
  }

  async fetchThread(threadID: string): Promise<ThreadInfo> {
    const { chatID, accountID } = this.decodeThreadId(threadID);
    const chat = await this.client.chats.retrieve(chatID);

    return {
      id: threadID,
      channelId: `beeperDesktopAPI:${accountID}`,
      channelName: chat.title ?? chatID,
      isDM: chat.type === "single",
      metadata: {
        accountID,
        chatID,
        raw: chat,
      },
    };
  }

  async fetchChannelInfo(channelId: string): Promise<ChannelInfo> {
    const accountID = this.parseAccountIDFromChannelID(channelId);
    const accounts = await this.client.accounts.list();
    const account = accounts.find((item: any) => item.accountID === accountID);

    return {
      id: channelId,
      name: account?.user?.fullName ?? account?.user?.username ?? accountID,
      isDM: false,
      metadata: {
        accountID,
        network: account?.network,
        user: account?.user,
      },
    };
  }

  async listThreads(channelId: string, options: ListThreadsOptions = {}): Promise<ListThreadsResult<unknown>> {
    const accountID = this.parseAccountIDFromChannelID(channelId);
    const page = await this.client.chats.search({
      accountIDs: [accountID],
      cursor: options.cursor,
      direction: "before",
      limit: options.limit ?? 50,
      includeMuted: true,
      type: "any",
    });

    const threads: ThreadSummary<unknown>[] = page.items.map((chat: any) => {
      const threadID = this.encodeThreadId({ accountID: chat.accountID, chatID: chat.id });
      const rootMessageData = (chat as unknown as { preview?: BeeperDesktopAPIMessage }).preview;
      const rootMessage = this.toChatMessage(
        rootMessageData ?? {
          id: `chat-${chat.id}`,
          accountID: chat.accountID,
          chatID: chat.id,
          senderID: "unknown",
          senderName: chat.title ?? "unknown",
          timestamp: chat.lastActivity ?? new Date().toISOString(),
          text: chat.title ?? "",
          attachments: [],
        },
        chat.accountID,
        threadID,
      );

      return {
        id: threadID,
        lastReplyAt: chat.lastActivity ? new Date(chat.lastActivity) : undefined,
        rootMessage,
      };
    });

    return {
      threads,
      nextCursor: page.oldestCursor ?? undefined,
    };
  }

  async openDM(userID: string): Promise<string> {
    const { accountID, participantID } = this.parseScopedUserID(userID);
    const created = await this.client.chats.create({
      accountID,
      participantIDs: [participantID],
      type: "single",
    });
    return this.encodeThreadId({ accountID, chatID: created.chatID });
  }

  encodeThreadId(platformData: BeeperDesktopAPIThreadID): string {
    return `beeperDesktopAPI:${encodeURIComponent(platformData.accountID)}:${encodeURIComponent(platformData.chatID)}`;
  }

  decodeThreadId(threadID: string): BeeperDesktopAPIThreadID {
    const [prefix, accountID, chatID] = threadID.split(":");
    if (!(prefix === "beeperDesktopAPI" && accountID && chatID)) {
      throw new Error(`Invalid BeeperDesktopAPI thread ID: ${threadID}`);
    }
    return {
      accountID: decodeURIComponent(accountID),
      chatID: decodeURIComponent(chatID),
    };
  }

  parseMessage(raw: unknown): Message<unknown> {
    const message = raw as BeeperDesktopAPIMessage;
    const threadID = this.encodeThreadId({
      accountID: message.accountID,
      chatID: message.chatID,
    });
    return this.toChatMessage(message, message.accountID, threadID);
  }

  renderFormatted(content: FormattedContent): string {
    return stringifyMarkdown(content);
  }

  private async handleWSEvent(raw: string): Promise<void> {
    if (!this.chat) return;

    let event: WSEventEnvelope;
    try {
      event = JSON.parse(raw) as WSEventEnvelope;
    } catch {
      this.logger.warn("Ignoring invalid BeeperDesktopAPI WS payload");
      return;
    }

    if (event.type === "message.upserted") {
      const entries = event.entries ?? [];
      for (const entry of entries) {
        const msg = entry as unknown as BeeperDesktopAPIMessage;
        if (!(msg?.id && msg.chatID && msg.accountID)) continue;

        this.processReactionDiffFromMessageUpsert(msg);
        if (this.isContentlessMessageUpsert(msg)) continue;
        if (this.isReactionOnlyMessageUpsert(msg)) continue;

        const threadID = this.encodeThreadId({ accountID: msg.accountID, chatID: msg.chatID });
        const parsed = this.toChatMessage(msg, msg.accountID, threadID);
        this.chat.processMessage(this, threadID, parsed);
      }
      return;
    }

    if (event.type === "reaction.added" || event.type === "reaction.removed") {
      const entries = event.entries ?? [];
      for (const entry of entries) {
        if (!(event.accountID && event.chatID)) continue;
        const parsed = this.parseWSReactionEntry(entry, event.ids?.[0]);
        if (!parsed) continue;

        const threadID = this.encodeThreadId({ accountID: event.accountID, chatID: event.chatID });
        this.applyExplicitReactionState({
          accountID: event.accountID,
          chatID: event.chatID,
          messageID: parsed.messageID,
          participantID: parsed.participantID,
          reactionKey: parsed.reactionKey,
          added: event.type === "reaction.added",
        });

        this.chat.processReaction({
          adapter: this,
          threadId: threadID,
          messageId: parsed.messageID,
          emoji: parsed.reactionKey as unknown as EmojiValue,
          rawEmoji: parsed.reactionKey,
          added: event.type === "reaction.added",
          user: {
            userId: parsed.participantID,
            userName: parsed.participantID,
            fullName: parsed.participantID,
            isBot: "unknown",
            isMe: this.botUserID ? parsed.participantID === this.botUserID : false,
          },
          raw: entry,
        });
      }
    }
  }

  private scheduleReconnect(): void {
    if (this.reconnectTimer) return;
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      void this.startEventsListener(this.wsSubscriptions).catch((error) => {
        this.logger.error("BeeperDesktopAPI WS reconnect failed", { error: String(error) });
        this.scheduleReconnect();
      });
    }, this.wsReconnectDelayMs);
  }

  private parseAccountIDFromChannelID(channelId: string): string {
    const [prefix, accountID] = channelId.split(":");
    if (prefix !== "beeperDesktopAPI" || !accountID) {
      throw new Error(`Invalid BeeperDesktopAPI channel ID: ${channelId}`);
    }
    return decodeURIComponent(accountID);
  }

  private parseScopedUserID(userID: string): { accountID: string; participantID: string } {
    const firstColon = userID.indexOf(":");
    if (firstColon > 0) {
      const accountID = userID.slice(0, firstColon);
      const participantID = userID.slice(firstColon + 1);
      if (accountID && participantID) {
        return {
          accountID: decodeURIComponent(accountID),
          participantID: decodeURIComponent(participantID),
        };
      }
    }

    if (!this.defaultAccountID) {
      throw new Error(
        "openDM requires userID formatted as '<accountID>:<participantID>' or adapter config defaultAccountID",
      );
    }

    return {
      accountID: this.defaultAccountID,
      participantID: userID,
    };
  }

  private async detectServerInfo(): Promise<void> {
    try {
      const { data, response } = await this.client.get<Record<string, unknown>>("/v1/info").withResponse();
      const headers = this.extractVersionHeaders(response.headers);
      this.serverInfo = {
        source: "info-endpoint",
        version: this.extractStringField(data, ["version", "desktopVersion", "appVersion"]),
        apiVersion: this.extractStringField(data, ["apiVersion", "desktopAPIVersion", "specVersion"]),
        raw: data,
        headers,
      };
      return;
    } catch {
      // fall through to headers-based detection
    }

    try {
      const { response } = await this.client.accounts.list().withResponse();
      this.serverInfo = {
        source: "headers",
        headers: this.extractVersionHeaders(response.headers),
      };
    } catch {
      this.serverInfo = { source: "unknown" };
    }
  }

  private extractStringField(input: Record<string, unknown>, keys: string[]): string | undefined {
    for (const key of keys) {
      const value = input[key];
      if (typeof value === "string" && value.trim().length > 0) return value;
    }
    return undefined;
  }

  private extractVersionHeaders(headers: Headers): Record<string, string> {
    const names = [
      "x-beeper-desktop-api-version",
      "x-beeper-desktop-version",
      "x-api-version",
      "server",
    ];
    const out: Record<string, string> = {};
    for (const name of names) {
      const value = headers.get(name);
      if (value) out[name] = value;
    }
    return out;
  }

  private parseWSReactionEntry(
    entry: Record<string, unknown>,
    messageIDFallback?: string,
  ): { messageID: string; reactionKey: string; participantID: string } | null {
    const messageID = this.pickString(entry, ["messageID", "messageId"]) ?? messageIDFallback;
    const reactionKey = this.pickString(entry, ["reactionKey", "reaction", "description"]);
    const participantID = this.pickString(entry, ["participantID", "senderID", "userID"]) ?? "unknown";
    if (!(messageID && reactionKey)) return null;
    return { messageID, reactionKey, participantID };
  }

  private pickString(entry: Record<string, unknown>, keys: string[]): string | undefined {
    for (const key of keys) {
      const value = entry[key];
      if (typeof value === "string" && value.length > 0) return value;
    }
    return undefined;
  }

  private isReactionOnlyMessageUpsert(message: BeeperDesktopAPIMessage): boolean {
    const hasText = typeof message.text === "string" && message.text.trim().length > 0;
    const hasAttachments = Array.isArray(message.attachments) && message.attachments.length > 0;
    const hasReactions = Array.isArray(message.reactions) && message.reactions.length > 0;

    return !hasText && !hasAttachments && hasReactions;
  }

  private isContentlessMessageUpsert(message: BeeperDesktopAPIMessage): boolean {
    const hasText = typeof message.text === "string" && message.text.trim().length > 0;
    const hasAttachments = Array.isArray(message.attachments) && message.attachments.length > 0;
    const hasMentions = Array.isArray(message.mentions) && message.mentions.length > 0;

    return !hasText && !hasAttachments && !hasMentions;
  }

  private processReactionDiffFromMessageUpsert(message: BeeperDesktopAPIMessage): void {
    if (!(this.chat && Array.isArray(message.reactions))) return;

    const messageKey = `${message.accountID}:${message.chatID}:${message.id}`;
    const previous = this.reactionStateByMessage.get(messageKey) ?? new Set<string>();
    const next = new Set<string>();
    const reactionByIdentity = new Map<
      string,
      {
        reactionKey: string;
        participantID: string;
      }
    >();

    for (const reaction of message.reactions) {
      const reactionKey = String(reaction.reactionKey ?? "");
      if (!reactionKey) continue;
      const participantID = String(reaction.participantID ?? "unknown");
      const identity = `${participantID}::${reactionKey}`;
      next.add(identity);
      reactionByIdentity.set(identity, { reactionKey, participantID });
    }

    if (next.size === 0 && previous.size === 0) return;

    const threadID = this.encodeThreadId({
      accountID: message.accountID,
      chatID: message.chatID,
    });

    for (const identity of next) {
      if (previous.has(identity)) continue;
      const info = reactionByIdentity.get(identity);
      if (!info) continue;

      this.chat.processReaction({
        adapter: this,
        threadId: threadID,
        messageId: message.id,
        emoji: info.reactionKey as unknown as EmojiValue,
        rawEmoji: info.reactionKey,
        added: true,
        user: {
          userId: info.participantID,
          userName: info.participantID,
          fullName: info.participantID,
          isBot: "unknown",
          isMe: this.botUserID ? info.participantID === this.botUserID : false,
        },
        raw: message,
      });
    }

    for (const identity of previous) {
      if (next.has(identity)) continue;
      const [participantID = "unknown", reactionKey = ""] = identity.split("::");
      if (!reactionKey) continue;

      this.chat.processReaction({
        adapter: this,
        threadId: threadID,
        messageId: message.id,
        emoji: reactionKey as unknown as EmojiValue,
        rawEmoji: reactionKey,
        added: false,
        user: {
          userId: participantID,
          userName: participantID,
          fullName: participantID,
          isBot: "unknown",
          isMe: this.botUserID ? participantID === this.botUserID : false,
        },
        raw: message,
      });
    }

    this.reactionStateByMessage.set(messageKey, next);
  }

  private applyExplicitReactionState(input: {
    accountID: string;
    chatID: string;
    messageID: string;
    participantID: string;
    reactionKey: string;
    added: boolean;
  }): void {
    const messageKey = `${input.accountID}:${input.chatID}:${input.messageID}`;
    const state = this.reactionStateByMessage.get(messageKey) ?? new Set<string>();
    const identity = `${input.participantID}::${input.reactionKey}`;
    if (input.added) state.add(identity);
    else state.delete(identity);
    this.reactionStateByMessage.set(messageKey, state);
  }

  private toChatMessage(message: BeeperDesktopAPIMessage, accountID: string, threadID: string): Message<unknown> {
    const text = message.text ?? "";
    const mentions = Array.isArray(message.mentions) ? message.mentions : [];
    const isMention = this.botUserID
      ? mentions.includes(this.botUserID) || mentions.includes("@room")
      : false;

    return new Message({
      id: message.id,
      threadId: threadID,
      text,
      formatted: parseMarkdown(text),
      raw: message,
      author: {
        userId: message.senderID,
        userName: message.senderName ?? message.senderID,
        fullName: message.senderName ?? message.senderID,
        isBot: "unknown",
        isMe: this.botUserID ? message.senderID === this.botUserID : false,
      },
      metadata: {
        dateSent: new Date(message.timestamp),
        edited: false,
      },
      attachments: (message.attachments ?? []).map((att) => ({
        type: this.mapAttachmentType(att.type),
        url: att.srcURL,
        name: att.fileName,
        mimeType: att.mimeType,
        size: att.fileSize,
        width: att.size?.width,
        height: att.size?.height,
      })),
      isMention
    });
  }

  private mapAttachmentType(type?: string): "image" | "video" | "audio" | "file" {
    if (!type) return "file";
    const normalized = type.toUpperCase();
    if (normalized === "IMAGE" || normalized === "STICKER" || normalized === "IMG") return "image";
    if (normalized === "VIDEO") return "video";
    if (normalized === "AUDIO" || normalized === "VOICE") return "audio";
    return "file";
  }

  private renderPostable(message: AdapterPostableMessage): string {
    const card = extractCard(message);
    if (card) return cardToFallbackText(card);

    if (typeof message === "string") return message;
    if ("raw" in message) return message.raw;
    if ("markdown" in message) return message.markdown;
    if ("ast" in message) return stringifyMarkdown(message.ast);

    return "";
  }
}

export function createBeeperDesktopAPIAdapter(
  config: BeeperDesktopAPIAdapterConfig,
): BeeperDesktopAPIAdapter {
  return new BeeperDesktopAPIAdapter({
    ...config,
    logger: new ConsoleLogger("info", "beeper-desktop-api-adapter"),
    userName: config.userName,
  });
}

export type {
  BeeperDesktopAPIAdapterConfig,
  BeeperDesktopAPIServerInfo,
  BeeperDesktopAPIThreadID,
} from "./types";
