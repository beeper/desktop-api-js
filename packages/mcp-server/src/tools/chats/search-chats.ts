// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from '@beeper/desktop-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import BeeperDesktop from '@beeper/desktop-api';

export const metadata: Metadata = {
  resource: 'chats',
  operation: 'read',
  tags: ['chats'],
  httpMethod: 'get',
  httpPath: '/v0/search-chats',
  operationId: 'search_chats',
};

export const tool: Tool = {
  name: 'search_chats',
  description: 'Search chats by inbox, type, unread status, or text. Paginates.',
  inputSchema: {
    type: 'object',
    properties: {
      accountIDs: {
        type: 'array',
        description: 'Provide an array of account IDs to filter chats from specific messaging accounts only',
        items: {
          type: 'string',
        },
      },
      ending_before: {
        type: 'string',
        description:
          'A cursor for use in pagination. ending_before is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with obj_bar, your subsequent call can include ending_before=obj_bar in order to fetch the previous page of the list.',
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
      participantQuery: {
        type: 'string',
        description:
          'Search string to filter chats by participant names. When multiple words provided, ALL words must match. Searches in username, displayName, and fullName fields.',
      },
      query: {
        type: 'string',
        description:
          'Search string to filter chats by title. When multiple words provided, ALL words must match. Matches are case-insensitive substrings.',
      },
      starting_after: {
        type: 'string',
        description:
          'A cursor for use in pagination. starting_after is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include starting_after=obj_foo in order to fetch the next page of the list.',
      },
      type: {
        type: 'string',
        description:
          'Specify the type of chats to retrieve: use "single" for direct messages, "group" for group chats, "channel" for channels, or "any" to get all types',
        enum: ['single', 'group', 'channel', 'any'],
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
  return asTextContentResult(await response.json());
};

export default { metadata, tool, handler };
