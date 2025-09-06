import { CustomHandlerFunction, asFormattedMCPContentResult } from '../../types';

export const setChatReminderHandler: CustomHandlerFunction = async (client, args) => {
  const currArgs = args as any;
  const output = await client.chats.reminders.create(currArgs);

  const lines: string[] = [];
  lines.push('# Set Reminder');
  if (output.success) {
    lines.push(`Reminder set for chat ${currArgs?.chatID} at ${currArgs?.reminder?.remindAtMs}.`);
  } else {
    lines.push('Failed to set reminder.');
  }
  lines.push('\n# Using this information\n');
  lines.push('- Use clear_chat_reminder to remove it later.');

  return asFormattedMCPContentResult(lines.join('\n'));
};
