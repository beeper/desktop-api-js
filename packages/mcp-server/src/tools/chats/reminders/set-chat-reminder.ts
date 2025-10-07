// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from '@beeper/desktop-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import BeeperDesktop from '@beeper/desktop-api';

export const metadata: Metadata = {
  resource: 'chats.reminders',
  operation: 'write',
  tags: ['chats'],
  httpMethod: 'post',
  httpPath: '/v1/chats/{chatID}/reminders',
  operationId: 'setChatReminder',
};

export const tool: Tool = {
  name: 'set_chat_reminder',
  description: 'Set a reminder for a chat at a specific time.',
  inputSchema: {
    type: 'object',
    properties: {
      chatID: {
        type: 'string',
        description: 'The identifier of the chat to set reminder for (accepts both chatID and local chat ID)',
      },
      reminder: {
        type: 'object',
        description: 'Reminder configuration',
        properties: {
          remindAtMs: {
            type: 'number',
            description: 'Unix timestamp in milliseconds when reminder should trigger',
          },
          dismissOnIncomingMessage: {
            type: 'boolean',
            description: 'Cancel reminder if someone messages in the chat',
          },
        },
        required: ['remindAtMs'],
      },
    },
    required: ['chatID', 'reminder'],
  },
  annotations: {},
};

export const handler = async (client: BeeperDesktop, args: Record<string, unknown> | undefined) => {
  const { chatID, ...body } = args as any;
  return asTextContentResult(await client.chats.reminders.create(chatID, body));
};

export default { metadata, tool, handler };
