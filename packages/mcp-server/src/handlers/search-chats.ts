import { asTextContentResult, type HandlerFunction } from '../tools/types';
import { formatChatToMarkdown } from './utils';

export const handler: HandlerFunction = async (client, args) => {
  const body = args as any;
  const output = await client.chats.search(body);

  const lines: string[] = [];
  lines.push('# Chats');

  const items = output.items || [];
  const hasMore = !!output.hasMore;

  if (hasMore) {
    lines.push(`\nFound ${items.length}+ chats (showing ${items.length})`);
    if (output.oldestCursor) {
      lines.push(`Next page (older): cursor='${output.oldestCursor}', direction='before'`);
    }
    if (output.newestCursor) {
      lines.push(`Previous page (newer): cursor='${output.newestCursor}', direction='after'`);
    }
  } else if (items.length > 0) {
    lines.push(`\nFound ${items.length} chat${items.length === 1 ? '' : 's'}`);
  }

  if (items.length === 0) {
    lines.push('\nNo chats found.');
  } else {
    for (const chat of items) {
      lines.push(...formatChatToMarkdown(chat, undefined));
    }
  }
  lines.push('\n# Using this information\n');
  lines.push(
    '- Pass the "chatID" to get_chat or search_messages for details about a chat, or send_message to send a message to a chat.',
  );
  lines.push('- Link the "open" link to the user to allow them to view the chat in Beeper Desktop.');
  return asTextContentResult(lines.join('\n'));
};
