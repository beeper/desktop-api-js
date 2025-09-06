import { CustomHandlerFunction, asFormattedMCPContentResult } from '../types';

export const openInAppHandler: CustomHandlerFunction = async (client, args) => {
  const currArgs = args as any;
  const output = await client.app.open(currArgs);

  const lines: string[] = [];
  lines.push('# App');
  if (output.success) {
    lines.push('Beeper was opened.');
    if (currArgs?.chatID) {
      const chatRef = String(currArgs.chatID);
      lines.push(`Focused chat: ${chatRef}`);
    }
    if (currArgs?.draftText) {
      lines.push('Draft text populated.');
    }
  } else {
    lines.push('Failed to open Beeper.');
  }
  lines.push('\n# Using this information\n');
  lines.push('- Use search_chats or get_chat to retrieve chat context.');

  return asFormattedMCPContentResult(lines.join('\n'));
};
