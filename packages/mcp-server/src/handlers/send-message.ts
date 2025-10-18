import type { HandlerFunction } from '../tools/types';
import { asMarkdownContentResult, createOpenLink } from './utils';

export const handler: HandlerFunction = async (client, args) => {
  const { chatID, ...body } = args as any;
  const output = await client.messages.send(chatID, body);

  const lines: string[] = [];
  if (output.pendingMessageID) {
    const deeplink = createOpenLink('', chatID ?? '');
    if (deeplink) lines.push(`**Open the chat in Beeper**: ${deeplink}`);
  } else {
    lines.push('Failed to send message.');
  }

  return asMarkdownContentResult(lines);
};
