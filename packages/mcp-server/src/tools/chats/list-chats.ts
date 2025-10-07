// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from '@beeper/desktop-api-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import BeeperDesktop from '@beeper/desktop-api';

export const metadata: Metadata = {
  resource: 'chats',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/chats',
  operationId: 'listChats',
};

export const tool: Tool = {
  name: 'list_chats',
  description:
    'List all chats sorted by last activity (most recent first). Combines all accounts into a single paginated list.',
  inputSchema: {
    type: 'object',
    properties: {
      accountIDs: {
        type: 'array',
        description: 'Limit to specific account IDs. If omitted, fetches from all accounts.',
        items: {
          type: 'string',
          description: 'Account ID this resource belongs to.',
        },
      },
      cursor: {
        type: 'string',
        description:
          'Timestamp cursor (milliseconds since epoch) for pagination. Use with direction to navigate results.',
      },
      direction: {
        type: 'string',
        description:
          "Pagination direction used with 'cursor': 'before' fetches older results, 'after' fetches newer results. Defaults to 'before' when only 'cursor' is provided.",
        enum: ['after', 'before'],
      },
      limit: {
        type: 'integer',
        description: 'Maximum number of chats to return (1–200). Defaults to 50.',
      },
    },
    required: [],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: BeeperDesktop, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  const response = await client.chats.list(body).asResponse();
  return asTextContentResult(await response.json());
};

export default { metadata, tool, handler };
