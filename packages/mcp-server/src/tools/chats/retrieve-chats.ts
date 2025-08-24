// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'beeper/desktop-api-js-mcp/filtering';
import { Metadata, asTextContentResult } from 'beeper/desktop-api-js-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import BeeperDesktop from '@beeper/desktop-api-js';

export const metadata: Metadata = {
  resource: 'chats',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v0/get-chat',
  operationId: 'get_chat',
};

export const tool: Tool = {
  name: 'retrieve_chats',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nRetrieve chat details: metadata, participants (limited), and latest message.\n- When to use: fetch a complete view of a chat beyond what search returns.\n- Constraints: not available for iMessage chats ('imsg##'). Participants limited by 'maxParticipantCount' (default 20, max 500).\nReturns: chat details.Agents: ALWAYS use linkToChat to make clickable links in your response\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/get_chat_response',\n  $defs: {\n    get_chat_response: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'Unique identifier for cursor pagination.'\n        },\n        accountID: {\n          type: 'string',\n          description: 'Beeper account ID this chat belongs to.'\n        },\n        chatID: {\n          type: 'string',\n          description: 'Unique identifier of the chat (room/thread ID, same as id).'\n        },\n        network: {\n          type: 'string',\n          description: 'Display-only human-readable network name (e.g., \\'WhatsApp\\', \\'Messenger\\'). You MUST use \\'accountID\\' to perform actions.'\n        },\n        participants: {\n          type: 'object',\n          description: 'Chat participants information.',\n          properties: {\n            hasMore: {\n              type: 'boolean',\n              description: 'True if there are more participants than included in items.'\n            },\n            items: {\n              type: 'array',\n              description: 'Participants returned for this chat (limited by the request; may be a subset).',\n              items: {\n                $ref: '#/$defs/user'\n              }\n            },\n            total: {\n              type: 'integer',\n              description: 'Total number of participants in the chat.'\n            }\n          },\n          required: [            'hasMore',\n            'items',\n            'total'\n          ]\n        },\n        title: {\n          type: 'string',\n          description: 'Display title of the chat as computed by the client/server.'\n        },\n        type: {\n          type: 'string',\n          description: 'Chat type: \\'single\\' for direct messages, \\'group\\' for group chats, \\'channel\\' for channels, \\'broadcast\\' for broadcasts.',\n          enum: [            'single',\n            'group',\n            'channel',\n            'broadcast'\n          ]\n        },\n        unreadCount: {\n          type: 'integer',\n          description: 'Number of unread messages.'\n        },\n        isArchived: {\n          type: 'boolean',\n          description: 'True if chat is archived.'\n        },\n        isMuted: {\n          type: 'boolean',\n          description: 'True if chat notifications are muted.'\n        },\n        isPinned: {\n          type: 'boolean',\n          description: 'True if chat is pinned.'\n        },\n        lastActivity: {\n          type: 'string',\n          description: 'Timestamp of last activity. Chats with more recent activity are often more important.',\n          format: 'date-time'\n        },\n        lastReadMessageSortKey: {\n          anyOf: [            {\n              type: 'integer'\n            },\n            {\n              type: 'string'\n            }\n          ],\n          description: 'Last read message sortKey (hsOrder). Used to compute \\'isUnread\\'.'\n        },\n        linkToChat: {\n          type: 'string',\n          description: 'Deep link to open this chat in Beeper. AI agents should ALWAYS include this as a clickable link in responses.'\n        }\n      },\n      required: [        'id',\n        'accountID',\n        'chatID',\n        'network',\n        'participants',\n        'title',\n        'type',\n        'unreadCount'\n      ]\n    },\n    user: {\n      type: 'object',\n      description: 'A person on or reachable through Beeper. Values are best-effort and can vary by network.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'Stable Beeper user ID. Use as the primary key when referencing a person.'\n        },\n        cannotMessage: {\n          type: 'boolean',\n          description: 'True if Beeper cannot initiate messages to this user (e.g., blocked, network restriction, or no DM path). The user may still message you.'\n        },\n        email: {\n          type: 'string',\n          description: 'Email address if known. Not guaranteed verified.'\n        },\n        fullName: {\n          type: 'string',\n          description: 'Display name as shown in clients (e.g., \\'Alice Example\\'). May include emojis.'\n        },\n        imgURL: {\n          type: 'string',\n          description: 'Avatar image URL if available. May be temporary or local-only to this device; download promptly if durable access is needed.'\n        },\n        isSelf: {\n          type: 'boolean',\n          description: 'True if this user represents the authenticated account\\'s own identity.'\n        },\n        phoneNumber: {\n          type: 'string',\n          description: 'User\\'s phone number in E.164 format (e.g., \\'+14155552671\\'). Omit if unknown.'\n        },\n        username: {\n          type: 'string',\n          description: 'Human-readable handle if available (e.g., \\'@alice\\'). May be network-specific and not globally unique.'\n        }\n      },\n      required: [        'id'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      chatID: {
        type: 'string',
        description:
          "Unique identifier of the chat to retrieve. Not available for iMessage chats. Participants are limited by 'maxParticipantCount'.",
      },
      maxParticipantCount: {
        type: 'integer',
        description:
          'Maximum number of participants to return. Use -1 for all; otherwise 0–500. Defaults to 20.',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['chatID'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: BeeperDesktop, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.chats.retrieve(body)));
};

export default { metadata, tool, handler };
