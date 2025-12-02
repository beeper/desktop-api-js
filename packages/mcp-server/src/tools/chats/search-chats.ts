// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asErrorResult, asTextContentResult } from '@beeper/desktop-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import BeeperDesktop from '@beeper/desktop-api';

export const metadata: Metadata = {
  resource: 'chats',
  operation: 'read',
  tags: ['chats'],
  httpMethod: 'get',
  httpPath: '/v1/chats/search',
  operationId: 'searchChats',
};

export const tool: Tool = {
  name: 'search_chats',
  description:
    "Search chats by title/network or participants using Beeper Desktop's renderer algorithm. Optional 'scope'.",
  inputSchema: {
    type: 'object',
    properties: {
      accountIDs: {
        type: 'array',
        description: 'Provide an array of account IDs to filter chats from specific messaging accounts only',
        items: {
          type: 'string',
          description: 'Account ID this resource belongs to.',
        },
      },
      cursor: {
        type: 'string',
        description: "Opaque pagination cursor; do not inspect. Use together with 'direction'.",
      },
      direction: {
        type: 'string',
        description:
          "Pagination direction used with 'cursor': 'before' fetches older results, 'after' fetches newer results. Defaults to 'before' when only 'cursor' is provided.",
        enum: ['after', 'before'],
      },
      inbox: {
        type: 'string',
        description:
          'Filter by inbox type: "primary" (non-archived, non-low-priority), "low-priority", or "archive". If not specified, shows all chats.',
        enum: ['primary', 'low-priority', 'archive'],
      },
      includeMuted: {
        type: 'boolean',
        description:
          'Include chats marked as Muted by the user, which are usually less important. Default: true. Set to false if the user wants a more refined search.',
      },
      lastActivityAfter: {
        type: 'string',
        description:
          'Provide an ISO datetime string to only retrieve chats with last activity after this time',
        format: 'date-time',
      },
      lastActivityBefore: {
        type: 'string',
        description:
          'Provide an ISO datetime string to only retrieve chats with last activity before this time',
        format: 'date-time',
      },
      limit: {
        type: 'integer',
        description: 'Set the maximum number of chats to retrieve. Valid range: 1-200, default is 50',
      },
      query: {
        type: 'string',
        description:
          'Literal token search (non-semantic). Use single words users type (e.g., "dinner"). When multiple words provided, ALL must match. Case-insensitive.',
      },
      scope: {
        type: 'string',
        description:
          "Search scope: 'titles' matches title + network; 'participants' matches participant names.",
        enum: ['titles', 'participants'],
      },
      type: {
        type: 'string',
        description:
          'Specify the type of chats to retrieve: use "single" for direct messages, "group" for group chats, or "any" to get all types',
        enum: ['single', 'group', 'any'],
      },
      unreadOnly: {
        type: 'boolean',
        description: 'Set to true to only retrieve chats that have unread messages',
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
  const response = await client.chats.search(body).asResponse();
  try {
    return asTextContentResult(await response.json());
  } catch (error) {
    if (error instanceof BeeperDesktop.APIError) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
