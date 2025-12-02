// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asErrorResult, asTextContentResult } from '@beeper/desktop-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import BeeperDesktop from '@beeper/desktop-api';

export const metadata: Metadata = {
  resource: 'chats',
  operation: 'read',
  tags: ['chats'],
  httpMethod: 'get',
  httpPath: '/v1/chats/{chatID}',
  operationId: 'getChat',
};

export const tool: Tool = {
  name: 'get_chat',
  description: 'Get chat details: metadata, participants (limited), last activity.',
  inputSchema: {
    type: 'object',
    properties: {
      chatID: {
        type: 'string',
        description: 'Unique identifier of the chat.',
      },
      maxParticipantCount: {
        type: 'integer',
        description:
          'Maximum number of participants to return. Use -1 for all; otherwise 0–500. Defaults to all (-1).',
      },
    },
    required: ['chatID'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: BeeperDesktop, args: Record<string, unknown> | undefined) => {
  const { chatID, ...body } = args as any;
  try {
    return asTextContentResult(await client.chats.retrieve(chatID, body));
  } catch (error) {
    if (error instanceof BeeperDesktop.APIError) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
