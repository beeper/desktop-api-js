// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from '@beeper/desktop-api-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import BeeperDesktop from '@beeper/desktop-api';

export const metadata: Metadata = {
  resource: 'chats',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v0/create-chat',
  operationId: 'create_chat',
};

export const tool: Tool = {
  name: 'create_chats',
  description:
    'Create a single or group chat on a specific account using participant IDs and optional title.',
  inputSchema: {
    type: 'object',
    properties: {
      accountID: {
        type: 'string',
        description: 'Account to create the chat on.',
      },
      participantIDs: {
        type: 'array',
        description: 'User IDs to include in the new chat.',
        items: {
          type: 'string',
        },
      },
      type: {
        type: 'string',
        description:
          "Chat type to create: 'single' requires exactly one participantID; 'group' supports multiple participants and optional title.",
        enum: ['single', 'group'],
      },
      messageText: {
        type: 'string',
        description: 'Optional first message content if the platform requires it to create the chat.',
      },
      title: {
        type: 'string',
        description: 'Optional title for group chats; ignored for single chats on most platforms.',
      },
    },
    required: ['accountID', 'participantIDs', 'type'],
  },
  annotations: {},
};

export const handler = async (client: BeeperDesktop, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.chats.create(body));
};

export default { metadata, tool, handler };
