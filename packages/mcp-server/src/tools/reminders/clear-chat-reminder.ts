// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from '@beeper/desktop-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import BeeperDesktop from '@beeper/desktop-api';

export const metadata: Metadata = {
  resource: 'reminders',
  operation: 'write',
  tags: ['reminders'],
  httpMethod: 'post',
  httpPath: '/v0/clear-chat-reminder',
  operationId: 'clear_chat_reminder',
};

export const tool: Tool = {
  name: 'clear_chat_reminder',
  description: 'Clear a chat reminder.',
  inputSchema: {
    type: 'object',
    properties: {
      chatID: {
        type: 'string',
        description: 'The identifier of the chat to clear reminder from',
      },
    },
    required: ['chatID'],
  },
  annotations: {},
};

export const handler = async (client: BeeperDesktop, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.reminders.clear(body));
};

export default { metadata, tool, handler };
