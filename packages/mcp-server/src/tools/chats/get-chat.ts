// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from '@beeper/desktop-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import BeeperDesktop from '@beeper/desktop-api';

export const metadata: Metadata = {
  resource: 'chats',
  operation: 'read',
  tags: ['chats'],
  httpMethod: 'get',
  httpPath: '/v0/get-chat',
  operationId: 'get_chat',
};

export const tool: Tool = {
  name: 'get_chat',
  description: 'Get chat details: metadata, participants (limited), last activity.',
  inputSchema: {
    type: 'object',
    properties: {
      chatID: {
        type: 'string',
        description:
          "Unique identifier of the chat to retrieve. Not available for iMessage chats. Participants are limited by 'maxParticipantCount'.",
      },
      maxParticipantCount: {
        type: 'integer',
        description:
          'Maximum number of participants to return. Use -1 for all; otherwise 0–500. Defaults to 20.',
      },
    },
    required: ['chatID'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: BeeperDesktop, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.chats.retrieve(body));
};

export default { metadata, tool, handler };
