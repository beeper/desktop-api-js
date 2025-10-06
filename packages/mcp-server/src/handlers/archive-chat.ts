import type { HandlerFunction } from '../tools/types';

export const handler: HandlerFunction = async (client, args) => {
  const body = args as any;
  const output = await client.chats.archive(body);

  const lines: string[] = [];
  lines.push('# Archive Chat');
  if (output.success) {
    lines.push(`Chat ${body?.chatID} ${body?.archived === false ? 'unarchived' : 'archived'}.`);
  } else {
    lines.push('Failed to update archive state.');
  }
  lines.push('\n# Using this information\n');
  lines.push('- Use search_chats to verify the chat moved to the expected inbox.');
  return { content: [{ type: 'text', text: lines.join('\n') }] };
};
