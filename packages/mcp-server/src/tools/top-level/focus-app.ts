// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asErrorResult, asTextContentResult } from '@beeper/desktop-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import BeeperDesktop from '@beeper/desktop-api';

export const metadata: Metadata = {
  resource: '$client',
  operation: 'write',
  tags: ['app'],
  httpMethod: 'post',
  httpPath: '/v1/focus',
  operationId: 'focusApp',
};

export const tool: Tool = {
  name: 'focus_app',
  description:
    'Focus Beeper Desktop and optionally navigate to a specific chat, message, or pre-fill draft text and attachment.',
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
  try {
    return asTextContentResult(await client.focus(body));
  } catch (error) {
    if (error instanceof BeeperDesktop.APIError) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
