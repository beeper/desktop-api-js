import type { IMessage } from "react-native-gifted-chat";
import type { DesktopMessage } from "../lib/api/client";

export interface InboxChatItem {
  id: string;
  accountID: string;
  chatType: "single" | "group";
  title: string;
  subtitle: string;
  previewText: string;
  networkLabel: string;
  lastActivityLabel: string;
  unreadCount: number;
  isMuted: boolean;
  isPinned: boolean;
  isArchived: boolean;
  lastActivity?: string;
  previewMessageID?: string;
}

export interface SearchResultItem {
  id: string;
  kind: "chat" | "message";
  chatID: string;
  accountID: string;
  title: string;
  subtitle: string;
  preview: string;
  timestamp?: string;
  timestampLabel?: string;
}

export interface GiftedSDKMessage extends IMessage {
  sdkMessage: DesktopMessage;
  attachmentLabel?: string | null;
  reactionSummary?: string | null;
  reactionLabel?: string | null;
}

export type LabOperation =
  | "info"
  | "accounts"
  | "chats.list"
  | "chats.search"
  | "messages.search"
  | "focus";
