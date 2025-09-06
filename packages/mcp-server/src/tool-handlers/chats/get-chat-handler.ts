import { CustomHandlerFunction, asFormattedMCPContentResult } from '../types';
import { formatChatToMarkdown } from '../utils';

export const getChatHandler: CustomHandlerFunction = async (client, args) => {
  const currArgs = args as any;
  const chat = await client.chats.retrieve(currArgs);

  const lines: string[] = [];
  if (!chat) {
    lines.push('# Chat');
    lines.push('Not found.');
    return asFormattedMCPContentResult(lines.join('\n'));
  }

  for (const line of formatChatToMarkdown(chat, client.baseURL)) {
    lines.push(line);
  }
  lines.push('\n# Using this information\n');
  lines.push('- Use search_messages to find specific content in this chat.');
  lines.push('- Link the "open" link to the user to allow them to view the chat in Beeper Desktop.');

  return asFormattedMCPContentResult(lines.join('\n'));
};
