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
    'One-shot Cmd+K-style search: chats, in-groups, and messages (first page only). Use search_messages to paginate.',
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
