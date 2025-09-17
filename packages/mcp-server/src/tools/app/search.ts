// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from '@beeper/desktop-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import BeeperDesktop from '@beeper/desktop-api';

export const metadata: Metadata = {
  resource: 'app',
  operation: 'read',
  tags: ['app'],
  httpMethod: 'get',
  httpPath: '/v0/search',
  operationId: 'search',
};

export const tool: Tool = {
  name: 'search',
  description:
    'Returns matching chats, participant name matches in groups, and the first page of messages in one call. Paginate messages via search-messages. Paginate chats via search-chats. Uses the same sorting as the chat search in the app.',
  inputSchema: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description: 'User-typed search text. Literal word matching (NOT semantic).',
      },
    },
    required: ['query'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: BeeperDesktop, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.app.search(body));
};

export default { metadata, tool, handler };
