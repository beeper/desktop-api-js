import { CustomHandlerFunction, asFormattedMCPContentResult } from '../types';

export const archiveChatHandler: CustomHandlerFunction = async (client, args) => {
  const currArgs = args as any;
  const output = await client.chats.archive(currArgs);

  const lines: string[] = [];
  lines.push('# Archive Chat');
  if (output.success) {
    lines.push(`Chat ${currArgs?.chatID} ${currArgs?.archived === false ? 'unarchived' : 'archived'}.`);
  } else {
    lines.push('Failed to update archive state.');
  }
  lines.push('\n# Using this information\n');
  lines.push('- Use search_chats to verify the chat moved to the expected inbox.');

  return asFormattedMCPContentResult(lines.join('\n'));
};
