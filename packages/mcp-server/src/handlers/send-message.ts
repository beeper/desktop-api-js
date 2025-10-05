import type { HandlerFunction } from "../tools/types";
import { createOpenLink } from "./utils";

export const handler: HandlerFunction = async (client, args) => {
  const body = args as any;
  const output = await client.messages.send(body);

  const lines: string[] = []
  if (output.success) {
    const deeplink = createOpenLink('', body?.chatID ?? '')
    if (deeplink) lines.push(`**Open the chat in Beeper**: ${deeplink}`)
  } else {
    lines.push('Failed to send message.')
  }
  return { content: [{ type: 'text', text: lines.join('\n') }] }
};
