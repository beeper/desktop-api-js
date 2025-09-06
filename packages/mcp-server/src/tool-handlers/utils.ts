import { Chat } from '@beeper/desktop-api/resources/index';
import { Message, Reaction, User } from '@beeper/desktop-api/resources/shared';

// TODO : Participants type missing
export const getParticipantName = (participant: any, preferFirstName?: boolean): string | null => {
  if (!participant) return null;
  return (
    participant.nickname ||
    (preferFirstName ? participant.fullName?.split(' ')[0] : participant.fullName) ||
    participant.username ||
    participant.email ||
    (participant.id != null ? String(participant.id) : null)
  );
};

const skinToneRegex = /\uD83C[\uDFFB-\uDFFF]/g;
export const removeSkinTone = (emojiString: string): string => emojiString.replace(skinToneRegex, '');

export function groupReactions(reactions: Reaction[]): { [key: string]: Reaction[] } {
  const map: { [key: string]: Reaction[] } = {};
  reactions.forEach((reaction) => {
    if (!reaction.reactionKey) return;
    const key = removeSkinTone(reaction.reactionKey);
    map[key] ||= [];
    map[key].push(reaction);
  });
  return map;
}

export const createOpenLink = (baseURL: string, localChatIDOrChatID: string, messageKey?: string) =>
  `${baseURL}/open/${encodeURIComponent(localChatIDOrChatID)}${messageKey ? `/${messageKey}` : ''}`;

export const formatRelativeDate = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const oneDay = 24 * 60 * 60 * 1000;

  if (diff < oneDay) {
    return 'Today';
  } else if (diff < 2 * oneDay) {
    return 'Yesterday';
  } else if (diff < 7 * oneDay) {
    return `${Math.floor(diff / oneDay)} days ago`;
  } else {
    return date.toLocaleDateString();
  }
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
        return participant ?
            getParticipantName({ ...participant, fullName: participant.fullName ?? undefined })
          : r.participantID;
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

export const formatChatToMarkdown = (chat: Chat, baseURL: string | undefined) => {
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
  return lines;
};
