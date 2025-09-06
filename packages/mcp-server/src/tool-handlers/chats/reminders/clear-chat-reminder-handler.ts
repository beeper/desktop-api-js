import { CustomHandlerFunction, asFormattedMCPContentResult } from '../../types';

export const clearChatReminderHandler: CustomHandlerFunction = async (client, args) => {
  const currArgs = args as any;
  const output = await client.chats.reminders.delete(currArgs);

  const lines: string[] = [];
  lines.push('# Clear Reminder');
  if (output.success) {
    lines.push(`Reminder cleared for chat ${currArgs?.chatID}.`);
  } else {
    lines.push('Failed to clear reminder.');
  }
  lines.push('\n# Using this information\n');
  lines.push('- You can set another reminder with set_chat_reminder.');

  return asFormattedMCPContentResult(lines.join('\n'));
};
