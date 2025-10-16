import type { HandlerFunction } from '../tools/types';
import { asMarkdownContentResult, formatChatToMarkdown } from './utils';

export const handler: HandlerFunction = async (client, args) => {
  const { chatID, ...queryParams } = args as any;
  const chat = await client.chats.retrieve(chatID, queryParams);

  const lines: string[] = [];
  if (!chat) {
    lines.push('Chat not found.');
    return asMarkdownContentResult(lines);
  }
  lines.push(formatChatToMarkdown(chat, undefined));
  lines.push('\n# Using this information\n');
  lines.push('- Use search_messages to find specific content in this chat.');
  lines.push('- Link the "open" link to the user to allow them to view the chat in Beeper Desktop.');
  return asMarkdownContentResult(lines);
};
