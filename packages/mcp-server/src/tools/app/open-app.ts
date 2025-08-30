// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from '@beeper/desktop-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import BeeperDesktop from '@beeper/desktop-api';

export const metadata: Metadata = {
  resource: 'app',
  operation: 'write',
  tags: ['app'],
  httpMethod: 'post',
  httpPath: '/v0/open-app',
  operationId: 'open_app',
};

export const tool: Tool = {
  name: 'open_app',
  description: 'Open Beeper, optionally focusing a chat or message, or pre-filling a draft.',
  inputSchema: {
    type: 'object',
    properties: {
      chatID: {
        type: 'string',
        description:
          'Optional Beeper chat ID to focus after opening the app. If omitted, only opens/focuses the app.',
      },
      draftText: {
        type: 'string',
        description: 'Optional draft text to populate in the message input field.',
      },
      messageSortKey: {
        type: 'string',
        description: 'Optional message sort key. Jumps to that message in the chat when opening.',
      },
    },
    required: [],
  },
  annotations: {},
};

export const handler = async (client: BeeperDesktop, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.app.focus(body));
};

export default { metadata, tool, handler };
