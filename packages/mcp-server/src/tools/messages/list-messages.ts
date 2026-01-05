// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asErrorResult, asTextContentResult } from '@beeper/desktop-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import BeeperDesktop from '@beeper/desktop-api';

export const metadata: Metadata = {
  resource: 'messages',
  operation: 'read',
  tags: ['messages'],
  httpMethod: 'get',
  httpPath: '/v1/chats/{chatID}/messages',
  operationId: 'listMessages',
};

export const tool: Tool = {
  name: 'list_messages',
  description: 'List messages from a specific chat with pagination support.',
  inputSchema: {
    type: 'object',
    properties: {
      chatID: {
        type: 'string',
        description: 'Unique identifier of the chat.',
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
    },
    required: ['chatID'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: BeeperDesktop, args: Record<string, unknown> | undefined) => {
  const { chatID, ...body } = args as any;
  const response = await client.messages.list(chatID, body).asResponse();
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
