// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from '@beeper/desktop-api-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import BeeperDesktop from '@beeper/desktop-api';

export const metadata: Metadata = {
  resource: 'messages',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/messages',
  operationId: 'listMessages',
};

export const tool: Tool = {
  name: 'list_messages',
  description: 'List all messages in a chat with cursor-based pagination. Sorted by timestamp.',
  inputSchema: {
    type: 'object',
    properties: {
      chatID: {
        type: 'string',
        description: 'The chat ID to list messages from',
      },
      cursor: {
        type: 'string',
        description: 'Message cursor for pagination. Use with direction to navigate results.',
      },
      direction: {
        type: 'string',
        description:
          "Pagination direction used with 'cursor': 'before' fetches older messages, 'after' fetches newer messages. Defaults to 'before' when only 'cursor' is provided.",
        enum: ['after', 'before'],
      },
      limit: {
        type: 'integer',
        description: 'Maximum number of messages to return (1–500). Defaults to 50.',
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
  const response = await client.messages.list(body).asResponse();
  return asTextContentResult(await response.json());
};

export default { metadata, tool, handler };
