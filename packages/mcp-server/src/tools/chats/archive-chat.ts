// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from '@beeper/desktop-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import BeeperDesktop from '@beeper/desktop-api';

export const metadata: Metadata = {
  resource: 'chats',
  operation: 'write',
  tags: ['chats'],
  httpMethod: 'post',
  httpPath: '/v0/archive-chat',
  operationId: 'archive_chat',
};

export const tool: Tool = {
  name: 'archive_chat',
  description: 'Archive or unarchive a chat.',
  inputSchema: {
    type: 'object',
    properties: {
      chatID: {
        type: 'string',
        description: 'The identifier of the chat to archive or unarchive',
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
  const body = args as any;
  return asTextContentResult(await client.chats.archive(body));
};

export default { metadata, tool, handler };
