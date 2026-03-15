export interface BeeperDesktopAPIAdapterConfig {
  baseUrl?: string;
  accessToken: string;
  userName?: string;
  botUserID?: string;
  botUserId?: string;
  defaultAccountID?: string;
  autoConnectEvents?: boolean;
  wsEventsUrl?: string;
  wsReconnectDelayMs?: number;
}

export interface BeeperDesktopAPIServerInfo {
  source: "info-endpoint" | "headers" | "unknown";
  version?: string;
  apiVersion?: string;
  raw?: Record<string, unknown>;
  headers?: Record<string, string>;
}

export interface BeeperDesktopAPIThreadID {
  accountID: string;
  chatID: string;
}

export interface BeeperDesktopAPIMessage {
  id: string;
  chatID: string;
  accountID: string;
  senderID: string;
  senderName?: string;
  timestamp: string;
  text?: string;
  mentions?: string[] | null;
  reactions?: Array<{
    id?: string;
    participantID?: string;
    reactionKey?: string;
    emoji?: boolean;
    imgURL?: string;
  }>;
  attachments?: Array<{
    type?: string;
    srcURL?: string;
    fileName?: string;
    mimeType?: string;
    fileSize?: number;
    size?: { width?: number; height?: number };
  }>;
}

export interface WSEventEnvelope {
  type:
    | "ready"
    | "subscriptions.updated"
    | "error"
    | "chat.upserted"
    | "chat.deleted"
    | "message.upserted"
    | "message.deleted"
    | "reaction.added"
    | "reaction.removed";
  seq?: number;
  ts?: number;
  accountID?: string;
  chatID?: string;
  ids?: string[];
  entries?: Array<Record<string, unknown>>;
}
