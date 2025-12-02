// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asErrorResult, asTextContentResult } from '@beeper/desktop-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import BeeperDesktop from '@beeper/desktop-api';

export const metadata: Metadata = {
  resource: '$client',
  operation: 'read',
  tags: ['app'],
  httpMethod: 'get',
  httpPath: '/v1/search',
  operationId: 'search',
};

export const tool: Tool = {
  name: 'search',
  description:
    'Search for chats, participant name matches in groups, and the first page of messages in one call. Use this when the user asks for a specific chat, group, or person.',
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
  try {
    return asTextContentResult(await client.search(body));
  } catch (error) {
    if (error instanceof BeeperDesktop.APIError) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
