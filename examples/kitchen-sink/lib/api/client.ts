import BeeperDesktop from "@beeper/desktop-api";

import type { ConnectionProfile } from "../../types/profile";

export interface DesktopInfo {
  app: {
    bundle_id: string;
    name: string;
    version: string;
  };
  platform: {
    arch: string;
    os: string;
    release?: string;
  };
  server: {
    base_url: string;
    hostname: string;
    mcp_enabled: boolean;
    port: number;
    remote_access: boolean;
    status: string;
  };
  endpoints: {
    mcp: string;
    spec: string;
    ws_events: string;
    oauth: {
      authorization_endpoint: string;
      introspection_endpoint: string;
      registration_endpoint: string;
      revocation_endpoint: string;
      token_endpoint: string;
      userinfo_endpoint: string;
    };
  };
}

export interface DesktopAccount {
  accountID: string;
  user: {
    id: string;
    fullName?: string;
    username?: string;
    imgURL?: string;
    isSelf?: boolean;
  };
}

export interface DesktopMessage {
  id: string;
  accountID: string;
  chatID: string;
  senderID: string;
  sortKey: string;
  timestamp: string;
  text?: string;
  type?:
    | "TEXT"
    | "NOTICE"
    | "IMAGE"
    | "VIDEO"
    | "VOICE"
    | "AUDIO"
    | "FILE"
    | "STICKER"
    | "LOCATION"
    | "REACTION";
  attachments?: Array<{
    id?: string;
    fileName?: string;
    type: "unknown" | "img" | "video" | "audio";
    srcURL?: string;
  }>;
  reactions?: Array<{
    id: string;
    reactionKey: string;
  }>;
  senderName?: string;
  isSender?: boolean;
}

export interface DesktopChat {
  id: string;
  accountID: string;
  title: string;
  type: "single" | "group";
  unreadCount: number;
  isArchived?: boolean;
  isMuted?: boolean;
  isPinned?: boolean;
  lastActivity?: string;
}

export interface DesktopChatListItem extends DesktopChat {
  preview?: DesktopMessage;
}

export interface DesktopClient {
  info: {
    retrieve(): Promise<DesktopInfo>;
  };
  accounts: {
    list(): Promise<DesktopAccount[]>;
  };
  chats: {
    list(params?: Record<string, unknown>): Promise<{ items: DesktopChatListItem[] }>;
    search(params?: Record<string, unknown>): Promise<{ items: DesktopChat[] }>;
  };
  messages: {
    list(
      chatID: string,
      params?: Record<string, unknown>,
    ): Promise<{ items: DesktopMessage[] }>;
    search(
      params?: Record<string, unknown>,
    ): Promise<{ items: DesktopMessage[] }>;
    send(
      chatID: string,
      body?: { text?: string; replyToMessageID?: string },
    ): Promise<{ chatID: string; pendingMessageID: string }>;
  };
  focus(body?: Record<string, unknown>): Promise<{ success: boolean }>;
}

function normalizeBaseURL(baseURL: string): string {
  return baseURL.trim().replace(/\/+$/, "");
}

export function createDesktopClient(profile: ConnectionProfile): DesktopClient {
  const baseURL = normalizeBaseURL(profile.baseURL);
  const accessToken = profile.accessToken.trim();

  if (!baseURL) {
    throw new Error("A base URL is required before creating a Desktop API client.");
  }

  if (!accessToken) {
    throw new Error("An access token is required before creating a Desktop API client.");
  }

  return new BeeperDesktop({
    baseURL,
    accessToken,
    dangerouslyAllowBrowser: process.env.EXPO_OS === "web" ? profile.allowBrowser : undefined,
    timeout: 20_000,
    maxRetries: 0,
  }) as unknown as DesktopClient;
}
