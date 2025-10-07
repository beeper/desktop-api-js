import { asTextContentResult, type HandlerFunction } from '../tools/types';
import { formatChatToMarkdown } from './utils';

export const handler: HandlerFunction = async (client, args) => {
  const body = args as any;
  const chat = await client.chats.retrieve(body);

  const lines: string[] = [];
  if (!chat) {
    lines.push('Chat not found.');
    return asTextContentResult(lines.join('\n'));
  }
  for (const line of formatChatToMarkdown(chat, undefined)) {
    lines.push(line);
  }
  lines.push('\n# Using this information\n');
  lines.push('- Use search_messages to find specific content in this chat.');
  lines.push('- Link the "open" link to the user to allow them to view the chat in Beeper Desktop.');
  return asTextContentResult(lines.join('\n'));
};
