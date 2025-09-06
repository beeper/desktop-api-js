import { CustomHandlerFunction, asFormattedMCPContentResult } from '../../types';

export const downloadAttachmentHandler: CustomHandlerFunction = async (client, args) => {
  const currArgs = args as any;
  const output = await client.messages.attachments.download(currArgs);

  const lines: string[] = [];
  lines.push('# Attachment');
  if (output.success && output.filePath) {
    lines.push(`**Path**: ${output.filePath}`);
    if (currArgs?.chatID && currArgs?.messageID) {
      const local = String(currArgs.chatID);
      // ChatID here may be localChatID or global; link uses localChatID if provided
      const attachmentURL =
        /^\d+$/.test(local) ? `beeper-mcp://attachments/${local}/${currArgs.messageID}/0` : undefined;
      if (attachmentURL) lines.push(`**MCP URL**: ${attachmentURL}`);
    }
  } else {
    lines.push(`Failed to download${output.error ? `: ${output.error}` : ''}.`);
  }
  lines.push('\n# Using this information\n');
  lines.push('- Use the file path to open or process the file locally.');

  return asFormattedMCPContentResult(lines.join('\n'));
};
