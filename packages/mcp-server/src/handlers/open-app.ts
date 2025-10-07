import { asTextContentResult, type HandlerFunction } from '../tools/types';

export const handler: HandlerFunction = async (client, args) => {
  const body = args as any;
  const output = await client.open(body);

  const lines: string[] = [];
  if (output.success) {
    lines.push('Beeper was opened.');
    if (body?.chatID) {
      const chatRef = String(body.chatID);
      lines.push(`Focused chat: ${chatRef}`);
    }
    if (body?.draftText) lines.push(`Draft text populated: ${body.draftText}`);
    if (body?.draftAttachmentPath) lines.push(`Draft attachment populated: ${body.draftAttachmentPath}`);
  } else {
    lines.push('Failed to open Beeper.');
  }
  return asTextContentResult(lines.join('\n'));
};
