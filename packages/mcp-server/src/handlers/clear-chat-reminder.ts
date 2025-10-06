import type { HandlerFunction } from '../tools/types';

export const handler: HandlerFunction = async (client, args) => {
  const body = args as any;
  const output = await client.chats.reminders.delete(body);

  const lines: string[] = [];
  lines.push('# Clear Reminder');
  if (output.success) {
    lines.push(`Reminder cleared for chat ${body?.chatID}.`);
  } else {
    lines.push('Failed to clear reminder.');
  }
  lines.push('\n# Using this information\n');
  lines.push('- You can set another reminder with set_chat_reminder.');
  return { content: [{ type: 'text', text: lines.join('\n') }] };
};
