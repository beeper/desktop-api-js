import { CustomHandlerFunction } from '../types';
import { asTextContentResult } from '@beeper/desktop-mcp/tools/types';

export const searchMessagesHandler: CustomHandlerFunction = async (client, args) => {
  const currArgs = args as any;
  const output = await client.messages.search(currArgs);
  // const { items, chats, hasMore } = output;
  const response = await client.messages.search(currArgs).asResponse();
  // const messageCount = items.length;
  // const chatCount = Object.keys(chats).length;

  // // Determine if search filters would cause gaps in timeline
  // const hasGapCausingFilters =
  //   currArgs &&
  //   (currArgs.query ||
  //     currArgs.sender ||
  //     currArgs.onlyWithMedia ||
  //     currArgs.onlyWithVideo ||
  //     currArgs.onlyWithImage ||
  //     currArgs.onlyWithLink ||
  //     currArgs.onlyWithFile);

  // const paginationInfo: string[] = [];
  // if (messageCount === 0) {
  //   if (!chats || chatCount === 0) {
  //     paginationInfo.push('No matching chats found');
  //   } else {
  //     paginationInfo.push(`No messages found in ${chatCount} chat${chatCount === 1 ? '' : 's'}`);
  //   }
  // } else if (hasMore) {
  //   paginationInfo.push(
  //     `Found ${messageCount}+ messages across ${chatCount} chat${chatCount === 1 ? '' : 's'} (showing ${messageCount})`,
  //   );
  //   if (output.oldestCursor) {
  //     paginationInfo.push(`Next page (older): cursor='${output.oldestCursor}', direction='before'`);
  //   }
  //   if (output.newestCursor) {
  //     paginationInfo.push(`Previous page (newer): cursor='${output.newestCursor}', direction='after'`);
  //   }
  // } else {
  //   paginationInfo.push(
  //     `Found ${messageCount} message${messageCount === 1 ? '' : 's'} across ${chatCount} chat${chatCount === 1 ? '' : 's'} (complete)`,
  //   );
  // }

  // if (hasGapCausingFilters && messageCount > 0) {
  //   paginationInfo.push('⚠️ Filtered results: only showing messages matching your search criteria.');
  // }

  // const messagesByChat = new Map<string, typeof items>();
  // for (const message of items) {
  //   const chatMessages = messagesByChat.get(message.chatID) || [];
  //   chatMessages.push(message);
  //   messagesByChat.set(message.chatID, chatMessages);
  // }

  // const chatSummaries: string[] = [];
  // for (const [chatID, messages] of messagesByChat) {
  //   const chat = chats[chatID];
  //   if (chat) {
  //     chatSummaries.push(`# ${chat.title} [${messages.length} message${messages.length === 1 ? '' : 's'}]`);
  //   }
  // }

  // const headerLines = [...paginationInfo, '', ...chatSummaries];

  // const chatSections: string[] = [];

  // for (const [chatID, messages] of messagesByChat) {
  //   const chat = chats[chatID];
  //   if (!chat) continue;

  //   const participantList =
  //     chat.participants?.items ? formatParticipantsToMarkdown(chat.participants.items, 3) : '';
  //   const participantInfo = participantList ? ` with ${participantList}` : '';
  //   const openURL = ctx?.apiBaseURL ? createOpenLink(ctx.apiBaseURL, chat.localChatID ?? chat.id) : undefined;
  //   const title = openURL ? `[${chat.title}](${openURL})` : chat.title;
  //   chatSections.push(`# ${title} (chatID: ${chat.localChatID})`);
  //   chatSections.push(`Chat on ${chat.network}${participantInfo}.`);
  //   chatSections.push('');

  //   const messagesByDate = new Map<string, any[]>();
  //   for (const message of messages) {
  //     const date = new Date(message.timestamp);
  //     const dateKey = date.toISOString().split('T')[0];
  //     const dateMessages = messagesByDate.get(dateKey) || [];
  //     dateMessages.push(message);
  //     messagesByDate.set(dateKey, dateMessages);
  //   }

  //   const sortedDates = Array.from(messagesByDate.keys()).sort();
  //   const participantMap =
  //     chat?.participants?.items ? new Map(chat.participants.items.map((p: any) => [p.id, p])) : undefined;

  //   for (let i = 0; i < sortedDates.length; i++) {
  //     const dateKey = sortedDates[i];
  //     const dateObj = new Date(dateKey);
  //     const relativeTime = formatRelativeDate(dateObj);
  //     chatSections.push(`## ${relativeTime} (${dateKey})`);
  //     chatSections.push('');

  //     const dateMessages = messagesByDate.get(dateKey) || [];
  //     dateMessages.sort(
  //       (a: any, b: any) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
  //     );

  //     for (const message of dateMessages) {
  //       const time = new Date(message.timestamp);
  //       const hours = time.getHours().toString().padStart(2, '0');
  //       const minutes = time.getMinutes().toString().padStart(2, '0');
  //       const timeStr = `${hours}:${minutes}`;

  //       const baseSenderName = message.senderName || message.senderID;
  //       const senderName = message.isSender ? `${baseSenderName} (You)` : baseSenderName;
  //       const text = message.text || '';
  //       const attachment = message.attachments?.[0];
  //       const attachmentLink =
  //         attachment && typeof chat.localChatID === 'number' ?
  //           `\n📎 [${attachment.fileName || 'attachment'}](beeper-mcp://attachments/${chat.localChatID}/${message.messageID}/0)`
  //         : '';
  //       const reactionsStr = formatReactionsToMarkdown(message.reactions, participantMap);

  //       const sortKeyLink =
  //         chat.localChatID ?
  //           `([open at sort key](${createOpenLink(ctx?.apiBaseURL || '', chat.localChatID, String(message.sortKey))}))`
  //         : `(sortKey: ${message.sortKey})`;
  //       const messageStr = `**${senderName}** (${timeStr}): ${text}${attachmentLink}${reactionsStr} ${sortKeyLink}`;

  //       chatSections.push(messageStr);
  //       chatSections.push('');
  //     }

  //     // Add date gap indicator when dates are not consecutive
  //     if (i < sortedDates.length - 1) {
  //       const nextDateKey = sortedDates[i + 1];
  //       const currentDate = new Date(dateKey);
  //       const nextDate = new Date(nextDateKey);
  //       const dayDiff = Math.floor((nextDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));

  //       if (dayDiff > 1) {
  //         const gapDays = dayDiff - 1;
  //         chatSections.push(`*[... ${gapDays} day${gapDays === 1 ? '' : 's'} gap ...]*`);
  //         chatSections.push('');
  //       }
  //     }
  //   }
  // }

  // return asFormattedMCPContentResult([...headerLines, '', ...chatSections].join('\n'));

  return asTextContentResult(await response.json());
};
