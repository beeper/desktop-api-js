// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from '@beeper/desktop-api-mcp/filtering';
import { Metadata, asTextContentResult } from '@beeper/desktop-api-mcp/tools/types';

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
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nSearch chats by title/network or participants using Beeper Desktop's renderer algorithm. Optional 'scope'.\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    hasMore: {\n      type: 'boolean',\n      description: 'True if additional results can be fetched using the provided cursors.'\n    },\n    items: {\n      type: 'array',\n      description: 'Chats matching the filters.',\n      items: {\n        $ref: '#/$defs/chat'\n      }\n    },\n    newestCursor: {\n      type: 'string',\n      description: 'Cursor for fetching newer results (use with direction=\\'after\\'). Opaque string; do not inspect.'\n    },\n    oldestCursor: {\n      type: 'string',\n      description: 'Cursor for fetching older results (use with direction=\\'before\\'). Opaque string; do not inspect.'\n    }\n  },\n  required: [    'hasMore',\n    'items',\n    'newestCursor',\n    'oldestCursor'\n  ],\n  $defs: {\n    chat: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'Unique identifier of the chat (room/thread ID, same as id) across Beeper.'\n        },\n        accountID: {\n          type: 'string',\n          description: 'Beeper account ID this chat belongs to.'\n        },\n        network: {\n          type: 'string',\n          description: 'Display-only human-readable network name (e.g., \\'WhatsApp\\', \\'Messenger\\').'\n        },\n        participants: {\n          type: 'object',\n          description: 'Chat participants information.',\n          properties: {\n            hasMore: {\n              type: 'boolean',\n              description: 'True if there are more participants than included in items.'\n            },\n            items: {\n              type: 'array',\n              description: 'Participants returned for this chat (limited by the request; may be a subset).',\n              items: {\n                $ref: '#/$defs/user'\n              }\n            },\n            total: {\n              type: 'integer',\n              description: 'Total number of participants in the chat.'\n            }\n          },\n          required: [            'hasMore',\n            'items',\n            'total'\n          ]\n        },\n        title: {\n          type: 'string',\n          description: 'Display title of the chat as computed by the client/server.'\n        },\n        type: {\n          type: 'string',\n          description: 'Chat type: \\'single\\' for direct messages, \\'group\\' for group chats.',\n          enum: [            'single',\n            'group'\n          ]\n        },\n        unreadCount: {\n          type: 'integer',\n          description: 'Number of unread messages.'\n        },\n        isArchived: {\n          type: 'boolean',\n          description: 'True if chat is archived.'\n        },\n        isMuted: {\n          type: 'boolean',\n          description: 'True if chat notifications are muted.'\n        },\n        isPinned: {\n          type: 'boolean',\n          description: 'True if chat is pinned.'\n        },\n        lastActivity: {\n          type: 'string',\n          description: 'Timestamp of last activity. Chats with more recent activity are often more important.',\n          format: 'date-time'\n        },\n        lastReadMessageSortKey: {\n          anyOf: [            {\n              type: 'integer'\n            },\n            {\n              type: 'string'\n            }\n          ],\n          description: 'Last read message sortKey (hsOrder). Used to compute \\'isUnread\\'.'\n        },\n        localChatID: {\n          type: 'string',\n          description: 'Local chat ID specific to this Beeper Desktop installation.'\n        }\n      },\n      required: [        'id',\n        'accountID',\n        'network',\n        'participants',\n        'title',\n        'type',\n        'unreadCount'\n      ]\n    },\n    user: {\n      type: 'object',\n      description: 'User the account belongs to.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'Stable Beeper user ID. Use as the primary key when referencing a person.'\n        },\n        cannotMessage: {\n          type: 'boolean',\n          description: 'True if Beeper cannot initiate messages to this user (e.g., blocked, network restriction, or no DM path). The user may still message you.'\n        },\n        email: {\n          type: 'string',\n          description: 'Email address if known. Not guaranteed verified.'\n        },\n        fullName: {\n          type: 'string',\n          description: 'Display name as shown in clients (e.g., \\'Alice Example\\'). May include emojis.'\n        },\n        imgURL: {\n          type: 'string',\n          description: 'Avatar image URL if available. May be temporary or local-only to this device; download promptly if durable access is needed.'\n        },\n        isSelf: {\n          type: 'boolean',\n          description: 'True if this user represents the authenticated account\\'s own identity.'\n        },\n        phoneNumber: {\n          type: 'string',\n          description: 'User\\'s phone number in E.164 format (e.g., \\'+14155552671\\'). Omit if unknown.'\n        },\n        username: {\n          type: 'string',\n          description: 'Human-readable handle if available (e.g., \\'@alice\\'). May be network-specific and not globally unique.'\n        }\n      },\n      required: [        'id'\n      ]\n    }\n  }\n}\n```",
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
        description: 'Pagination cursor from previous response. Use with direction to navigate results',
      },
      direction: {
        type: 'string',
        description:
          'Pagination direction: "after" for newer page, "before" for older page. Defaults to "before" when only cursor is provided.',
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
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: [],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: BeeperDesktop, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  const response = await client.chats.search(body).asResponse();
  return asTextContentResult(await maybeFilter(jq_filter, await response.json()));
};

export default { metadata, tool, handler };
