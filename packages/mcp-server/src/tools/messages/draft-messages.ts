// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'beeper/desktop-api-js-mcp/filtering';
import { Metadata, asTextContentResult } from 'beeper/desktop-api-js-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import BeeperDesktop from '@beeper/desktop-api-js';

export const metadata: Metadata = {
  resource: 'messages',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v0/draft-message',
  operationId: 'draft_message',
};

export const tool: Tool = {
  name: 'draft_messages',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nDraft a message in a specific chat. This will be placed in the message input field without sending\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/base_response',\n  $defs: {\n    base_response: {\n      type: 'object',\n      properties: {\n        success: {\n          type: 'boolean'\n        },\n        error: {\n          type: 'string'\n        }\n      },\n      required: [        'success'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      chatID: {
        type: 'string',
        description: 'Provide the unique identifier of the chat where you want to draft a message',
      },
      focusApp: {
        type: 'boolean',
        description:
          'Set to true to bring Beeper application to the foreground, or false to draft silently in background',
      },
      text: {
        type: 'string',
        description:
          'Provide the text content you want to draft. This will be placed in the message input field without sending',
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
  return asTextContentResult(await maybeFilter(jq_filter, await client.messages.draft(body)));
};

export default { metadata, tool, handler };
