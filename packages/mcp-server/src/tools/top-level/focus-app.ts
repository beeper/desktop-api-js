// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from '@beeper/desktop-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import BeeperDesktop from '@beeper/desktop-api';

export const metadata: Metadata = {
  resource: '$client',
  operation: 'write',
  tags: ['app'],
  httpMethod: 'post',
<<<<<<<< HEAD:packages/mcp-server/src/tools/top-level/open-in-app.ts
  httpPath: '/v1/open',
  operationId: 'openApp',
========
  httpPath: '/v1/focus',
  operationId: 'focusApp',
>>>>>>>> main:packages/mcp-server/src/tools/top-level/focus-app.ts
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
<<<<<<<< HEAD:packages/mcp-server/src/tools/top-level/open-in-app.ts
  return asTextContentResult(await client.open(body));
========
  return asTextContentResult(await client.focus(body));
>>>>>>>> main:packages/mcp-server/src/tools/top-level/focus-app.ts
};

export default { metadata, tool, handler };
