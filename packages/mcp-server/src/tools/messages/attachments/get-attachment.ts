// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from '@beeper/desktop-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import BeeperDesktop from '@beeper/desktop-api';

export const metadata: Metadata = {
  resource: 'messages.attachments',
  operation: 'write',
  tags: ['messages'],
  httpMethod: 'post',
  httpPath: '/v0/get-attachment',
  operationId: 'get_attachment',
};

export const tool: Tool = {
  name: 'get_attachment',
  description: 'Download a message attachment and return the local file path.',
  inputSchema: {
    type: 'object',
    properties: {
      chatID: {
        type: 'string',
        description: 'Unique identifier of the chat (supports both chatID and localChatID).',
      },
      messageID: {
        type: 'string',
        description: 'The message ID (eventID) containing the attachment.',
      },
    },
    required: ['chatID', 'messageID'],
  },
  annotations: {},
};

export const handler = async (client: BeeperDesktop, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.messages.attachments.retrieve(body));
};

export default { metadata, tool, handler };
