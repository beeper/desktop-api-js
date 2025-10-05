import type { HandlerFunction } from "../tools/types";

export const handler: HandlerFunction = async (client, args) => {
  const body = args as any;
  const output = await client.chats.reminders.create(body);

  const lines: string[] = []
  lines.push('# Set Reminder')
  if (output.success) {
    lines.push(`Reminder set for chat ${body?.chatID} at ${body?.reminder?.remindAtMs}.`)
  } else {
    lines.push('Failed to set reminder.')
  }
  lines.push('\n# Using this information\n')
  lines.push('- Use clear_chat_reminder to remove it later.')
  return { content: [{ type: 'text', text: lines.join('\n') }] }
};
