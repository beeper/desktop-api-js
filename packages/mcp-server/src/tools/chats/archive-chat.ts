// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from '@beeper/desktop-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import BeeperDesktop from '@beeper/desktop-api';

export const metadata: Metadata = {
  resource: 'chats',
  operation: 'write',
  tags: ['chats'],
  httpMethod: 'post',
  httpPath: '/v1/chats/{chatID}/archive',
  operationId: 'archiveChat',
};

export const tool: Tool = {
  name: 'archive_chat',
  description: 'Archive or unarchive a chat.',
  inputSchema: {
    type: 'object',
    properties: {
      chatID: {
        type: 'string',
        description: 'Unique identifier of the chat.',
      },
      archived: {
        type: 'boolean',
        description: 'True to archive, false to unarchive',
      },
    },
    required: ['chatID'],
  },
  annotations: {},
};

export const handler = async (client: BeeperDesktop, args: Record<string, unknown> | undefined) => {
  const { chatID, ...body } = args as any;
  return asTextContentResult(await client.chats.archive(chatID, body));
};

export default { metadata, tool, handler };
