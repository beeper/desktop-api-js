// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from '@beeper/desktop-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import BeeperDesktop from '@beeper/desktop-api';

export const metadata: Metadata = {
  resource: 'chats.reminders',
  operation: 'write',
  tags: ['chats'],
  httpMethod: 'delete',
  httpPath: '/v1/chats/{chatID}/reminders',
  operationId: 'clearChatReminder',
};

export const tool: Tool = {
  name: 'clear_chat_reminder',
  description: 'Clear a chat reminder.',
  inputSchema: {
    type: 'object',
    properties: {
      chatID: {
        type: 'string',
        description:
          'The identifier of the chat to clear reminder from (accepts both chatID and local chat ID)',
      },
    },
    required: ['chatID'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: BeeperDesktop, args: Record<string, unknown> | undefined) => {
  const { chatID, ...body } = args as any;
  return asTextContentResult(await client.chats.reminders.delete(chatID));
};

export default { metadata, tool, handler };
