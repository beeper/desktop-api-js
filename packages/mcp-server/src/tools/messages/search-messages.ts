// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from '@beeper/desktop-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import BeeperDesktop from '@beeper/desktop-api';

export const metadata: Metadata = {
  resource: 'messages',
  operation: 'read',
  tags: ['messages'],
  httpMethod: 'get',
  httpPath: '/v0/search-messages',
  operationId: 'search_messages',
};

export const tool: Tool = {
  name: 'search_messages',
  description:
    'Search messages across chats using Beeper\'s message index.\n- When to use: find messages by text and/or filters (chatIDs, accountIDs, chatType, media type filters, sender, date ranges).\n- CRITICAL: Query is LITERAL WORD MATCHING, NOT semantic search! Only finds messages containing these EXACT words.\n  • ✅ RIGHT: query="dinner" or query="sick" or query="error" (single words users type)\n  • ❌ WRONG: query="dinner plans tonight" or query="health issues" (phrases/concepts)\n  • The query matches ALL words provided (in any order). Example: query="flight booking" finds messages with both "flight" AND "booking".\n- Performance: provide chatIDs/accountIDs when known. Omitted \'query\' returns results based on filters only. Partial matches enabled; \'excludeLowPriority\' defaults to true.\n- Workflow tip: To search messages in specific conversations: 1) Use find-chats to get chatIDs, 2) Use search-messages with those chatIDs.\n- IMPORTANT: Chat names vary widely. ASK the user for clarification:\n  • "Which chat do you mean by family?" (could be "The Smiths", "Mom Dad Kids", etc.)\n  • "What\'s the name of your work chat?" (could be "Team", company name, project name)\n  • "Who are the participants?" (use participantQuery in find-chats)\nReturns: matching messages and referenced chats.',
  inputSchema: {
    type: 'object',
    properties: {
      accountIDs: {
        type: 'array',
        description: 'Limit search to specific Beeper account IDs (bridge instances).',
        items: {
          type: 'string',
          description: 'Beeper account ID this resource belongs to.',
        },
      },
      chatIDs: {
        type: 'array',
        description: 'Limit search to specific Beeper chat IDs.',
        items: {
          type: 'string',
        },
      },
      chatType: {
        type: 'string',
        description: "Filter by chat type: 'group' for group chats, 'single' for 1:1 chats.",
        enum: ['group', 'single'],
      },
      cursor: {
        type: 'string',
        description: "Opaque pagination cursor; do not inspect. Use together with 'direction'.",
      },
      dateAfter: {
        type: 'string',
        description:
          "Only include messages with timestamp strictly after this ISO 8601 datetime (e.g., '2024-07-01T00:00:00Z' or '2024-07-01T00:00:00+02:00').",
        format: 'date-time',
      },
      dateBefore: {
        type: 'string',
        description:
          "Only include messages with timestamp strictly before this ISO 8601 datetime (e.g., '2024-07-31T23:59:59Z' or '2024-07-31T23:59:59+02:00').",
        format: 'date-time',
      },
      direction: {
        type: 'string',
        description:
          "Pagination direction used with 'cursor': 'before' fetches older results, 'after' fetches newer results. Defaults to 'before' when only 'cursor' is provided.",
        enum: ['after', 'before'],
      },
      excludeLowPriority: {
        type: 'boolean',
        description:
          'Exclude messages marked Low Priority by the user. Default: true. Set to false to include all.',
      },
      includeMuted: {
        type: 'boolean',
        description:
          'Include messages in chats marked as Muted by the user, which are usually less important. Default: true. Set to false if the user wants a more refined search.',
      },
      limit: {
        type: 'integer',
        description: 'Maximum number of messages to return (1–500). Defaults to 50.',
      },
      mediaTypes: {
        type: 'array',
        description:
          "Filter messages by media types. Use ['any'] for any media type, or specify exact types like ['video', 'image']. Omit for no media filtering.",
        items: {
          type: 'string',
          enum: ['any', 'video', 'image', 'link', 'file'],
        },
      },
      query: {
        type: 'string',
        description:
          'Literal word search (NOT semantic). Finds messages containing these EXACT words in any order. Use single words users actually type, not concepts or phrases. Example: use "dinner" not "dinner plans", use "sick" not "health issues". If omitted, returns results filtered only by other parameters.',
      },
      sender: {
        anyOf: [
          {
            type: 'string',
            description:
              "Filter by sender: 'me' (messages sent by the authenticated user), 'others' (messages sent by others), or a specific user ID string (user.id).",
            enum: ['me', 'others'],
          },
          {
            type: 'string',
          },
        ],
        description:
          "Filter by sender: 'me' (messages sent by the authenticated user), 'others' (messages sent by others), or a specific user ID string (user.id).",
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
  const response = await client.messages.search(body).asResponse();
  return asTextContentResult(await response.json());
};

export default { metadata, tool, handler };
