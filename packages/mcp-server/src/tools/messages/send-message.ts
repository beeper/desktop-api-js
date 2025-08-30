// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from '@beeper/desktop-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import BeeperDesktop from '@beeper/desktop-api';

export const metadata: Metadata = {
  resource: 'messages',
  operation: 'write',
  tags: ['messages'],
  httpMethod: 'post',
  httpPath: '/v0/send-message',
  operationId: 'send_message',
};

export const tool: Tool = {
  name: 'send_message',
  description: 'Send a text message to a chat. Can reply to an existing message.',
  inputSchema: {
    type: 'object',
    properties: {
      chatID: {
        type: 'string',
        description: 'The identifier of the chat where the message will send',
      },
      replyToMessageID: {
        type: 'string',
        description: 'Provide a message ID to send this as a reply to an existing message',
      },
      text: {
        type: 'string',
        description: 'Text content of the message you want to send. You may use markdown.',
      },
    },
    required: ['chatID'],
  },
  annotations: {},
};

export const handler = async (client: BeeperDesktop, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.messages.send(body));
};

export default { metadata, tool, handler };
