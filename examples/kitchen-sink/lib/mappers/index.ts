import type {
  DesktopChat,
  DesktopChatListItem,
  DesktopInfo,
  DesktopMessage,
} from "../api/client";

import type { CapabilityFlags } from "../../types/profile";
import type {
  GiftedSDKMessage,
  InboxChatItem,
  SearchResultItem,
} from "../../types/view-models";

function attachmentLabel(message: DesktopMessage): string | null {
  const attachment = message.attachments?.[0];
  if (!attachment) {
    return null;
  }
  if (attachment.fileName) {
    return attachment.fileName;
  }
  switch (attachment.type) {
    case "img":
      return "Image attachment";
    case "video":
      return "Video attachment";
    case "audio":
      return "Audio attachment";
    default:
      return "Attachment";
  }
}

function summarizePreview(message?: DesktopMessage): string {
  if (!message) {
    return "No messages yet";
  }
  if (message.text?.trim()) {
    return message.text.trim();
  }
  return attachmentLabel(message) ?? message.type ?? "Message";
}

function formatRelativeTimestamp(value?: string): string {
  if (!value) {
    return "No activity";
  }
  const timestamp = Date.parse(value);
  if (Number.isNaN(timestamp)) {
    return "Unknown time";
  }
  const deltaMinutes = Math.round((Date.now() - timestamp) / 60_000);
  if (deltaMinutes <= 1) {
    return "just now";
  }
  if (deltaMinutes < 60) {
    return `${deltaMinutes}m ago`;
  }
  const deltaHours = Math.round(deltaMinutes / 60);
  if (deltaHours < 24) {
    return `${deltaHours}h ago`;
  }
  const deltaDays = Math.round(deltaHours / 24);
  return `${deltaDays}d ago`;
}

function inferNetworkLabel(accountID: string): string {
  if (!accountID) {
    return "unknown";
  }
  const segments = accountID.split(/[:_/-]/).filter(Boolean);
  return segments[1] || segments[0] || "unknown";
}

export function deriveCapabilitiesFromInfo(info: DesktopInfo): CapabilityFlags {
  const isReady = info.server.status === "ready";

  return {
    canReadChats: isReady,
    canReadMessages: isReady,
    canSendMessages: isReady,
    canSearchChats: isReady,
    canSearchMessages: isReady,
    canFocus: isReady,
    canRealtime: Boolean(info.endpoints.ws_events),
    canAssetPreview: isReady,
  };
}

export function mapChatToInboxItem(
  chat: DesktopChatListItem | DesktopChat,
): InboxChatItem {
  const preview = "preview" in chat ? chat.preview : undefined;

  return {
    id: chat.id,
    accountID: chat.accountID,
    chatType: chat.type,
    title: chat.title || (chat.type === "group" ? "Untitled group" : "Untitled chat"),
    subtitle: summarizePreview(preview),
    previewText: summarizePreview(preview),
    networkLabel: inferNetworkLabel(chat.accountID),
    lastActivityLabel: formatRelativeTimestamp(chat.lastActivity),
    unreadCount: chat.unreadCount ?? 0,
    isMuted: Boolean(chat.isMuted),
    isPinned: Boolean(chat.isPinned),
    isArchived: Boolean(chat.isArchived),
    lastActivity: chat.lastActivity,
    previewMessageID: preview?.id,
  };
}

export function mapMessageToGiftedMessage(
  message: DesktopMessage,
): GiftedSDKMessage {
  const summary = attachmentLabel(message);
  const reactions = message.reactions?.map((reaction) => reaction.reactionKey).join(" ");

  return {
    _id: message.id,
    text: message.text?.trim() || summary || message.type || "Message",
    createdAt: new Date(message.timestamp),
    user: {
      _id: message.isSender ? "__self__" : message.senderID,
      name: message.senderName || message.senderID,
      avatar: undefined,
    },
    sent: Boolean(message.isSender),
    received: !message.isSender,
    pending: false,
    quickReplies: undefined,
    system: message.type === "NOTICE",
    sdkMessage: message,
    attachmentLabel: summary,
    reactionSummary: reactions || null,
    reactionLabel: reactions || null,
  };
}

export function mapSearchResults(
  chats: Array<DesktopChatListItem | DesktopChat>,
  messages: DesktopMessage[],
): SearchResultItem[] {
  const chatItems: SearchResultItem[] = chats.map((chat) => ({
    id: `chat:${chat.id}`,
    kind: "chat",
    chatID: chat.id,
    accountID: chat.accountID,
    title: chat.title || "Untitled chat",
    subtitle: "Open conversation",
    preview: "Open conversation",
    timestamp: chat.lastActivity,
    timestampLabel: formatRelativeTimestamp(chat.lastActivity),
  }));

  const messageItems: SearchResultItem[] = messages.map((message) => ({
    id: `message:${message.id}`,
    kind: "message",
    chatID: message.chatID,
    accountID: message.accountID,
    title: message.senderName || message.senderID,
    subtitle: message.text?.trim() || attachmentLabel(message) || message.type || "Message",
    preview: message.text?.trim() || attachmentLabel(message) || message.type || "Message",
    timestamp: message.timestamp,
    timestampLabel: formatRelativeTimestamp(message.timestamp),
  }));

  return [...chatItems, ...messageItems].sort((left, right) => {
    const leftTime = left.timestamp ? Date.parse(left.timestamp) : 0;
    const rightTime = right.timestamp ? Date.parse(right.timestamp) : 0;
    return rightTime - leftTime;
  });
}
