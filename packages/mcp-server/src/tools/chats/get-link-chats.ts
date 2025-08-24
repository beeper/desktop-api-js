// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'beeper/desktop-api-js-mcp/filtering';
import { Metadata, asTextContentResult } from 'beeper/desktop-api-js-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import BeeperDesktop from 'desktop-api-js';

export const metadata: Metadata = {
  resource: 'chats',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v0/get-link-to-chat',
  operationId: 'get_link_to_chat',
};

export const tool: Tool = {
  name: 'get_link_chats',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGenerate a deep link to a specific chat or message. This link can be used to open the chat directly in the Beeper app.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/link_response',\n  $defs: {\n    link_response: {\n      type: 'object',\n      description: 'URL to open a specific chat or message.',\n      properties: {\n        url: {\n          type: 'string',\n          description: 'Deep link URL to the specified chat or message.'\n        }\n      },\n      required: [        'url'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      chatID: {
        type: 'string',
        description: 'The ID of the chat to link to.',
      },
      messageSortKey: {
        type: 'string',
        description: 'Optional message sort key. Jumps to that message in the chat.',
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
  return asTextContentResult(await maybeFilter(jq_filter, await client.chats.getLink(body)));
};

export default { metadata, tool, handler };
