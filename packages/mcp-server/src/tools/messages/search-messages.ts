// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from '@beeper/desktop-api-mcp/filtering';
import { Metadata, asTextContentResult } from '@beeper/desktop-api-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import BeeperDesktop from '@beeper/desktop-api';

export const metadata: Metadata = {
  resource: 'messages',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v0/search-messages',
  operationId: 'search_messages',
};

export const tool: Tool = {
  name: 'search_messages',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nSearch messages across chats using Beeper's message index\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/search_response',\n  $defs: {\n    search_response: {\n      type: 'object',\n      properties: {\n        chats: {\n          type: 'object',\n          description: 'Map of chatID -> chat details for chats referenced in data.',\n          additionalProperties: true\n        },\n        data: {\n          type: 'array',\n          description: 'Messages matching the query and filters.',\n          items: {\n            $ref: '#/$defs/message'\n          }\n        },\n        has_more: {\n          type: 'boolean',\n          description: 'Whether there are more items available after this set.'\n        }\n      },\n      required: [        'chats',\n        'data',\n        'has_more'\n      ]\n    },\n    message: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'Stable message ID for cursor pagination.'\n        },\n        accountID: {\n          type: 'string',\n          description: 'Beeper account ID the message belongs to.'\n        },\n        chatID: {\n          type: 'string',\n          description: 'Beeper chat/thread/room ID.'\n        },\n        messageID: {\n          type: 'string',\n          description: 'Stable message ID (same as id).'\n        },\n        senderID: {\n          type: 'string',\n          description: 'Sender user ID.'\n        },\n        sortKey: {\n          anyOf: [            {\n              type: 'string'\n            },\n            {\n              type: 'number'\n            }\n          ],\n          description: 'A unique key used to sort messages'\n        },\n        timestamp: {\n          type: 'string',\n          description: 'Message timestamp.',\n          format: 'date-time'\n        },\n        attachments: {\n          type: 'array',\n          description: 'Attachments included with this message, if any.',\n          items: {\n            $ref: '#/$defs/attachment'\n          }\n        },\n        isSender: {\n          type: 'boolean',\n          description: 'True if the authenticated user sent the message.'\n        },\n        isUnread: {\n          type: 'boolean',\n          description: 'True if the message is unread for the authenticated user. May be omitted.'\n        },\n        reactions: {\n          type: 'array',\n          description: 'Reactions to the message, if any.',\n          items: {\n            $ref: '#/$defs/reaction'\n          }\n        },\n        senderName: {\n          type: 'string',\n          description: 'Resolved sender display name (impersonator/full name/username/participant name).'\n        },\n        text: {\n          type: 'string',\n          description: 'Plain-text body if present. May include a JSON fallback with text entities for rich messages.'\n        }\n      },\n      required: [        'id',\n        'accountID',\n        'chatID',\n        'messageID',\n        'senderID',\n        'sortKey',\n        'timestamp'\n      ]\n    },\n    attachment: {\n      type: 'object',\n      properties: {\n        type: {\n          type: 'string',\n          description: 'Attachment type.',\n          enum: [            'unknown',\n            'img',\n            'video',\n            'audio'\n          ]\n        },\n        duration: {\n          type: 'number',\n          description: 'Duration in seconds (audio/video).'\n        },\n        fileName: {\n          type: 'string',\n          description: 'Original filename if available.'\n        },\n        fileSize: {\n          type: 'number',\n          description: 'File size in bytes if known.'\n        },\n        isGif: {\n          type: 'boolean',\n          description: 'True if the attachment is a GIF.'\n        },\n        isSticker: {\n          type: 'boolean',\n          description: 'True if the attachment is a sticker.'\n        },\n        isVoiceNote: {\n          type: 'boolean',\n          description: 'True if the attachment is a voice note.'\n        },\n        mimeType: {\n          type: 'string',\n          description: 'MIME type if known (e.g., \\'image/png\\').'\n        },\n        posterImg: {\n          type: 'string',\n          description: 'Preview image URL for video attachments (poster frame). May be temporary or local-only to this device; download promptly if durable access is needed.'\n        },\n        size: {\n          type: 'object',\n          description: 'Pixel dimensions of the attachment: width/height in px.',\n          properties: {\n            height: {\n              type: 'number'\n            },\n            width: {\n              type: 'number'\n            }\n          }\n        },\n        srcURL: {\n          type: 'string',\n          description: 'Public URL or local file path to fetch the asset. May be temporary or local-only to this device; download promptly if durable access is needed.'\n        }\n      },\n      required: [        'type'\n      ]\n    },\n    reaction: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'Reaction ID, typically ${participantID}${reactionKey} if multiple reactions allowed, or just participantID otherwise.'\n        },\n        participantID: {\n          type: 'string',\n          description: 'User ID of the participant who reacted.'\n        },\n        reactionKey: {\n          type: 'string',\n          description: 'The reaction key: an emoji (😄), a network-specific key, or a shortcode like \"smiling-face\".'\n        },\n        emoji: {\n          type: 'boolean',\n          description: 'True if the reactionKey is an emoji.'\n        },\n        imgURL: {\n          type: 'string',\n          description: 'URL to the reaction\\'s image. May be temporary or local-only to this device; download promptly if durable access is needed.'\n        }\n      },\n      required: [        'id',\n        'participantID',\n        'reactionKey'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      accountIDs: {
        type: 'array',
        description: 'Limit search to specific Beeper account IDs (bridge instances).',
        items: {
          type: 'string',
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
      ending_before: {
        type: 'string',
        description:
          'A cursor for use in pagination. ending_before is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with obj_bar, your subsequent call can include ending_before=obj_bar in order to fetch the previous page of the list.',
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
      onlyWithFile: {
        type: 'boolean',
        description: 'Only return messages that contain file attachments.',
      },
      onlyWithImage: {
        type: 'boolean',
        description: 'Only return messages that contain image attachments.',
      },
      onlyWithLink: {
        type: 'boolean',
        description: 'Only return messages that contain link attachments.',
      },
      onlyWithMedia: {
        type: 'boolean',
        description: 'Only return messages that contain any type of media attachment.',
      },
      onlyWithVideo: {
        type: 'boolean',
        description: 'Only return messages that contain video attachments.',
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
      starting_after: {
        type: 'string',
        description:
          'A cursor for use in pagination. starting_after is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include starting_after=obj_foo in order to fetch the next page of the list.',
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
  const response = await client.messages.search(body).asResponse();
  return asTextContentResult(await maybeFilter(jq_filter, await response.json()));
};

export default { metadata, tool, handler };
