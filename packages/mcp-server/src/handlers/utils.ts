import {
  differenceInMilliseconds,
  differenceInDays,
  endOfDay,
  format,
  isToday,
  isYesterday,
  isSameYear,
  parse,
} from 'date-fns';
import type * as Shared from '@beeper/desktop-api/resources/shared';
import type * as ChatsAPI from '@beeper/desktop-api/resources/chats/chats';
import { ToolCallResult } from '../tools/types';

const MILLIS_IN_WEEK = 86400000 * 7;

type Message = Shared.Message;
type Chat = ChatsAPI.Chat;
type User = Shared.User;
type MessageReaction = NonNullable<Message['reactions']>[number];

export const formatRelativeDate = (date: Date) => {
  const timeDifference = differenceInMilliseconds(endOfDay(new Date()), date);

  if (isToday(date)) return 'Today';
  if (isYesterday(date)) return 'Yesterday';

  return new Intl.DateTimeFormat(
    'default',
    timeDifference < MILLIS_IN_WEEK ?
      {
        weekday: 'long',
      }
    : isSameYear(date, new Date()) ?
      {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      }
    : {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      },
  ).format(date);
};

export const formatBytes = (bytes: number, decimals = 0) => {
  if (bytes === 0) return '0 B';

  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${Math.floor(parseFloat((bytes / k ** i).toFixed(decimals)))}${sizes[i]}`;
};

const skinToneRegex = /\uD83C[\uDFFB-\uDFFF]/g;
const removeSkinTone = (emojiString: string): string => emojiString.replace(skinToneRegex, '');

export function groupReactions(reactions: MessageReaction[]): { [key: string]: MessageReaction[] } {
  const map: { [key: string]: MessageReaction[] } = {};
  reactions.forEach((reaction) => {
    if (!reaction.reactionKey) return;
    const key = removeSkinTone(reaction.reactionKey);
    map[key] ||= [];
    map[key].push(reaction);
  });
  return map;
}

export const getParticipantName = (participant: User, preferFirstName?: boolean): string =>
  participant.fullName && preferFirstName ?
    participant.fullName.split(' ')[0]!
  : participant.fullName ||
    participant.username ||
    participant.email ||
    participant.phoneNumber ||
    participant.id;

export const createOpenLink = (baseURL: string, localChatIDOrChatID: string, messageKey?: string) =>
  `${baseURL}/open/${encodeURIComponent(localChatIDOrChatID)}${messageKey ? `/${messageKey}` : ''}`;

export const formatParticipantsToMarkdown = (participants: User[] | undefined, limit = 3): string => {
  if (!participants || participants.length === 0) return '';

  const names = participants
    .slice(0, limit)
    .map((p) => p.fullName || p.username || p.id)
    .filter(Boolean);

  if (participants.length > limit) {
    const othersCount = participants.length - limit;
    names.push(`& ${othersCount} other${othersCount === 1 ? '' : 's'}`);
  }

  return names.join(', ');
};

export const formatReactionsToMarkdown = (
  reactions: Message['reactions'],
  participants?: Map<string, User>,
): string => {
  if (!reactions || reactions.length === 0) return '';

  const reactionMap = groupReactions(reactions);
  const reactionParts: string[] = [];
  for (const [reactionKey, reactionList] of Object.entries(reactionMap)) {
    const count = reactionList.length;
    const reactorNames = reactionList
      .slice(0, 5)
      .map((r) => {
        if (!r.participantID) return null;
        const participant = participants?.get(r.participantID);
        return participant ? getParticipantName(participant) : r.participantID;
      })
      .filter(Boolean);

    let reactorInfo = '';
    if (reactorNames.length > 0) {
      if (count > 5) {
        const othersCount = count - 5;
        reactorInfo = ` (${reactorNames.join(', ')} & ${othersCount} other${othersCount === 1 ? '' : 's'})`;
      } else {
        reactorInfo = ` (${reactorNames.join(', ')})`;
      }
    }

    reactionParts.push(`${reactionKey} ${count}${reactorInfo}`);
  }

  return reactionParts.length > 0 ? ` [${reactionParts.join(' ')}]` : '';
};

export const formatAttachmentToMarkdown = (attachment: Shared.Attachment | undefined): string => {
  if (!attachment) return '';

  const typeEmoji =
    {
      img: '🖼',
      video: '🎥',
      audio: '🎵',
      unknown: '📎',
    }[attachment.type] || '📎';

  const fileName = attachment.fileName || 'file';
  const url = attachment.srcURL || '';
  const hasBothDimensions =
    typeof attachment.size?.width === 'number' && typeof attachment.size?.height === 'number';

  const metaInfo: string[] = [];
  if (attachment.fileSize) {
    metaInfo.push(formatBytes(attachment.fileSize));
  }
  if (hasBothDimensions) {
    metaInfo.push(`${attachment.size!.width}x${attachment.size!.height}`);
  }

  const metaString = metaInfo.length > 0 ? ` (${metaInfo.join(', ')})` : '';

  return `\n${typeEmoji} [${fileName}](${url})${metaString}`;
};

export const formatChatToMarkdown = (chat: Chat, baseURL: string | undefined): string => {
  const openURL = baseURL ? createOpenLink(baseURL, chat.localChatID ?? chat.id) : undefined;
  const title = openURL ? `[${chat.title}](${openURL})` : chat.title;
  const participantList =
    chat.participants?.items ? formatParticipantsToMarkdown(chat.participants.items, 3) : '';
  const participantInfo = participantList ? ` with ${participantList}` : '';
  const lines: string[] = [];
  lines.push(`\n## ${title} (chatID: ${chat.localChatID})`);
  let chatLine = `Chat on ${chat.network}${participantInfo}.`;
  if (typeof chat.unreadCount === 'number' && chat.unreadCount > 0) {
    chatLine += ` It has ${chat.unreadCount} unread message${chat.unreadCount === 1 ? '' : 's'}.`;
  }
  lines.push(chatLine);
  lines.push(`**Type**: ${chat.type}`);
  if (chat.lastActivity) lines.push(`**Last Activity**: ${chat.lastActivity}`);
  const status: string[] = [];
  if (chat.isArchived) status.push('archived');
  if (chat.isMuted) status.push('muted');
  if (chat.isPinned) status.push('pinned');
  if (status.length > 0) lines.push(`This chat is ${status.join(', ')}.`);
  return lines.join('\n');
};

const parseLocalDateKey = (key: string): Date => {
  const parsed = parse(key, 'yyyy-MM-dd', new Date());
  if (isNaN(parsed.getTime())) {
    throw new Error(`Invalid date key: ${key}`);
  }
  return parsed;
};

interface MessagesResponse {
  items: Message[];
  chats: Record<string, Chat>;
  hasMore?: boolean;
  oldestCursor?: string;
  newestCursor?: string;
}

export const mapMessagesToText = (
  output: Shared.MessagesCursorSearch,
  input?: {
    query?: string;
    sender?: string;
    mediaTypes?: string[];
  },
  ctx?: { apiBaseURL?: string; maxTextLength?: number },
) => {
  const { items, hasMore } = output;
  const chats = (output as any)?.body?.chats ?? {};

  const messageCount = items.length;
  const chatCount = Object.keys(chats).length;

  // Determine if search filters would cause gaps in timeline
  // Gaps occur when filtering by: query text, sender, or media types
  // Gaps do NOT occur when only filtering by: chatIDs, accountIDs, chatType, or date ranges
  const hasGapCausingFilters =
    input && (input.query || input.sender || (input.mediaTypes && input.mediaTypes.length > 0));

  const paginationInfo: string[] = [];
  if (messageCount === 0) {
    if (!chats || chatCount === 0) {
      paginationInfo.push('No matching chats found');
    } else {
      paginationInfo.push(`No messages found in ${chatCount} chat${chatCount === 1 ? '' : 's'}`);
    }
  } else if (hasMore) {
    paginationInfo.push(
      `Found ${messageCount}+ messages across ${chatCount} chat${
        chatCount === 1 ? '' : 's'
      } (showing ${messageCount})`,
    );
    if (output.oldestCursor) {
      paginationInfo.push(`Next page (older): cursor='${output.oldestCursor}', direction='before'`);
    }
    if (output.newestCursor) {
      paginationInfo.push(`Previous page (newer): cursor='${output.newestCursor}', direction='after'`);
    }
  } else {
    paginationInfo.push(
      `Found ${messageCount} message${messageCount === 1 ? '' : 's'} across ${chatCount} chat${
        chatCount === 1 ? '' : 's'
      } (complete)`,
    );
  }

  if (hasGapCausingFilters && messageCount > 0) {
    paginationInfo.push('⚠️ Filtered results: only showing messages matching your search criteria.');
  }

  const messagesByChat = new Map<string, typeof items>();
  for (const message of items) {
    const chatMessages = messagesByChat.get(message.chatID) || [];
    chatMessages.push(message);
    messagesByChat.set(message.chatID, chatMessages);
  }

  const chatSummaries: string[] = [];
  for (const [chatID, messages] of messagesByChat) {
    const chat = chats[chatID];
    if (chat) {
      chatSummaries.push(`# ${chat.title} [${messages.length} message${messages.length === 1 ? '' : 's'}]`);
    }
  }

  const headerLines = [...paginationInfo, '', ...chatSummaries];

  const summary = headerLines.join('\n');

  const chatSections: string[] = [];

  for (const [chatID, messages] of messagesByChat) {
    const chat = chats[chatID];
    if (!chat) continue;

    const participantList =
      chat.participants?.items ? formatParticipantsToMarkdown(chat.participants.items, 3) : '';
    const participantInfo = participantList ? ` with ${participantList}` : '';
    const openURL = ctx?.apiBaseURL ? createOpenLink(ctx.apiBaseURL, chat.localChatID ?? chat.id) : undefined;
    const title = openURL ? `[${chat.title}](${openURL})` : chat.title;
    chatSections.push(`# ${title} (chatID: ${chat.localChatID})`);
    chatSections.push(`Chat on ${chat.network}${participantInfo}.`);
    chatSections.push('');

    const messagesByDate = new Map<string, Message[]>();
    for (const message of messages) {
      const dateKey = format(new Date(message.timestamp), 'yyyy-MM-dd');
      const dateMessages = messagesByDate.get(dateKey) || [];
      dateMessages.push(message);
      messagesByDate.set(dateKey, dateMessages);
    }

    const sortedDates = Array.from(messagesByDate.keys()).sort();

    const participantMap =
      chat?.participants?.items ?
        new Map<string, User>(chat.participants.items.map((p: User) => [p.id, p]))
      : undefined;

    for (let i = 0; i < sortedDates.length; i++) {
      const dateKey = sortedDates[i]!;
      const dateObj = parseLocalDateKey(dateKey);
      const relativeTime = formatRelativeDate(dateObj);
      chatSections.push(`## ${relativeTime} (${dateKey})`);
      chatSections.push('');

      const dateMessages = messagesByDate.get(dateKey) || [];
      dateMessages.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

      for (const message of dateMessages) {
        const time = new Date(message.timestamp);
        const timeStr = format(time, 'HH:mm');

        const baseSenderName = message.senderName || message.senderID;
        const senderName = message.isSender ? `${baseSenderName} (You)` : baseSenderName;

        const maxTextLength = ctx?.maxTextLength ?? 1000;
        let text = message.text || '';
        if (text && text.length > maxTextLength) {
          const remainingChars = text.length - maxTextLength;
          text = text.substring(0, maxTextLength) + `... [+${remainingChars} chars]`;
        }

        const attachment = message.attachments?.[0]; // Assume single attachment
        const attachmentChatID = chat.localChatID ?? chat.id;
        const attachmentLink =
          attachment && attachmentChatID ?
            `\n📎 [${attachment.fileName || 'attachment'}](beeper-mcp://attachments/${attachmentChatID}/${
              message.id
            }/0)`
          : '';
        const reactionsStr = formatReactionsToMarkdown(message.reactions, participantMap);

        const sortKeyLink =
          chat.localChatID ?
            `([open at sort key](${createOpenLink(
              ctx?.apiBaseURL || '',
              chat.localChatID,
              String(message.sortKey),
            )}))`
          : `(sortKey: ${message.sortKey})`;
        const messageStr = `**${senderName}** (${timeStr}): ${text}${attachmentLink}${reactionsStr} ${sortKeyLink}`;

        chatSections.push(messageStr);
        chatSections.push('');
      }

      // Add date gap indicator when dates are not consecutive
      if (i < sortedDates.length - 1) {
        const nextDateKey = sortedDates[i + 1]!;
        const currentDate = parseLocalDateKey(dateKey!);
        const nextDate = parseLocalDateKey(nextDateKey);
        const dayDiff = differenceInDays(nextDate, currentDate);

        // Only show gap if dates are not consecutive
        if (dayDiff > 1) {
          const gapDays = dayDiff - 1;
          chatSections.push(`*[... ${gapDays} day${gapDays === 1 ? '' : 's'} gap ...]*`);
          chatSections.push('');
        }
      }
    }
  }

  return [summary, '', ...chatSections].join('\n');
};

export function asMarkdownContentResult(text: string | string[]): ToolCallResult {
  return {
    content: [
      {
        type: 'text',
        text: Array.isArray(text) ? text.join('\n') : text,
      },
    ],
  };
}
