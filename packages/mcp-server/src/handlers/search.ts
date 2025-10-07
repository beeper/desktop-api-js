import { asTextContentResult, type HandlerFunction } from '../tools/types';
import { formatChatToMarkdown, mapMessagesToText } from './utils';

export const handler: HandlerFunction = async (client, args) => {
  const body = args as any;
  const output = await client.search(body);

  const lines: string[] = [];
  if (body?.query) lines.push(`Query: "${body.query}"`);
  const results = output?.results;
  if (results?.chats?.length) {
    lines.push('\n# Chats');
    for (const chat of results.chats) lines.push(...formatChatToMarkdown(chat, undefined));
  }
  if (results?.in_groups?.length) {
    lines.push('\n# In Groups');
    for (const chat of results.in_groups) lines.push(...formatChatToMarkdown(chat, undefined));
  }
  if (results?.messages?.items?.length) {
    lines.push('\n# Messages');
    lines.push(mapMessagesToText(results.messages as any, body, undefined));
  }
  return asTextContentResult(lines.join('\n'));
};
