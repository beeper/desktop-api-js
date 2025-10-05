import type { HandlerFunction } from "../tools/types";
import { mapMessagesToText } from "./utils";

export const handler: HandlerFunction = async (client, args) => {
  const body = args as any;
  const output = await client.messages.search(body);

  const lines: string[] = []
  lines.push('# Messages')

  const items = (output as any).items || []
  const hasMore = !!(output as any).hasMore

  if (hasMore) {
    lines.push(`\nShowing ${items.length} messages (more available)`)
    if ((output as any).oldestCursor) {
      lines.push(`Next page (older): cursor='${(output as any).oldestCursor}', direction='before'`)
    }
    if ((output as any).newestCursor) {
      lines.push(`Previous page (newer): cursor='${(output as any).newestCursor}', direction='after'`)
    }
  } else if (items.length > 0) {
    lines.push(`\nShowing ${items.length} message${items.length === 1 ? '' : 's'}`)
  }

  if (items.length === 0) {
    lines.push('\nNo messages found.')
  } else {
    lines.push(mapMessagesToText(output as any, body, undefined))
  }

  return { content: [{ type: 'text', text: lines.join('\n') }] }
};
