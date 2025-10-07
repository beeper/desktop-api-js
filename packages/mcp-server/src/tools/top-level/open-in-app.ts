// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from '@beeper/desktop-api-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import BeeperDesktop from '@beeper/desktop-api';

export const metadata: Metadata = {
  resource: '$client',
  operation: 'write',
  tags: ['app'],
  httpMethod: 'post',
  httpPath: '/v0/open-app',
  operationId: 'open_app',
};

export const tool: Tool = {
  name: 'open_in_app',
  description:
    'Open Beeper Desktop and optionally navigate to a specific chat, message, or pre-fill draft text and attachment.',
  inputSchema: {
    type: 'object',
    properties: {
      chatID: {
        type: 'string',
        description:
          'Optional Beeper chat ID (or local chat ID) to focus after opening the app. If omitted, only opens/focuses the app.',
      },
      draftAttachmentPath: {
        type: 'string',
        description: 'Optional draft attachment path to populate in the message input field.',
      },
      draftText: {
        type: 'string',
        description: 'Optional draft text to populate in the message input field.',
      },
      messageID: {
        type: 'string',
        description: 'Optional message ID. Jumps to that message in the chat when opening.',
      },
    },
    required: [],
  },
  annotations: {},
};

export const handler = async (client: BeeperDesktop, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.open(body));
};

export default { metadata, tool, handler };
