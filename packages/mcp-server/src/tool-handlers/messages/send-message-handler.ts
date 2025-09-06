import { CustomHandlerFunction, asFormattedMCPContentResult } from '../types';
import { createOpenLink } from '../utils';

export const sendMessageHandler: CustomHandlerFunction = async (client, args) => {
  const currArgs = args as any;
  const output = await client.messages.send(currArgs);

  const lines: string[] = [];
  lines.push('# Message Sent');
  if (output.success) {
    lines.push(`**Message ID**: ${output.messageID}`);
    const deeplink =
      client.baseURL ? createOpenLink(client.baseURL, currArgs?.chatID ?? '', output.messageID) : undefined;
    if (deeplink) lines.push(`**Open in Beeper**: ${deeplink}`);
  } else {
    lines.push('Failed to send message.');
  }
  lines.push('\n# Using this information\n');
  lines.push('- Use get_chat to view the conversation, or search_messages for context.');

  return asFormattedMCPContentResult(lines.join('\n'));
};
