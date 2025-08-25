// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from '@beeper/desktop-api-mcp/filtering';
import { Metadata, asTextContentResult } from '@beeper/desktop-api-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import BeeperDesktop from '@beeper/desktop-api';

export const metadata: Metadata = {
  resource: 'v0',
  operation: 'write',
  tags: ['messages'],
  httpMethod: 'post',
  httpPath: '/v0/send-message',
  operationId: 'send_message',
};

export const tool: Tool = {
  name: 'send_message',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nSend a text message to a specific chat. Supports replying to existing messages. Returns the sent message ID and a deeplink to the chat\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/send_response',\n  $defs: {\n    send_response: {\n      allOf: [        {\n          $ref: '#/$defs/base_response'\n        }\n      ]\n    },\n    base_response: {\n      type: 'object',\n      properties: {\n        success: {\n          type: 'boolean'\n        },\n        error: {\n          type: 'string'\n        }\n      },\n      required: [        'success'\n      ]\n    }\n  }\n}\n```",
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
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['chatID'],
  },
  annotations: {},
};

export const handler = async (client: BeeperDesktop, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.v0.sendMessage(body)));
};

export default { metadata, tool, handler };
