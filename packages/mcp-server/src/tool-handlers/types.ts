import BeeperDesktop from '@beeper/desktop-api';
import { ToolCallResult } from '@beeper/desktop-mcp/tools/types';

export interface HandlerContext {
  apiBaseURL?: string;
}

export type CustomHandlerFunction = (
  client: BeeperDesktop,
  args: Record<string, unknown> | undefined,
) => Promise<ToolCallResult>;

export function asFormattedMCPContentResult(result: string): ToolCallResult {
  return {
    content: [
      {
        type: 'text',
        text: result,
      },
    ],
  };
}
