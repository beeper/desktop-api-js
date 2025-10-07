// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from '@beeper/desktop-mcp/filtering';
import { Metadata, asTextContentResult } from '@beeper/desktop-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import BeeperDesktop from '@beeper/desktop-api';

export const metadata: Metadata = {
  resource: '$client',
  operation: 'write',
  tags: ['app'],
  httpMethod: 'post',
  httpPath: '/v1/app/open',
  operationId: 'openApp',
};

export const tool: Tool = {
  name: 'open_in_app',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nOpen Beeper Desktop and optionally navigate to a specific chat, message, or pre-fill draft text and attachment.\n\n# Response Schema\n```json\n{\n  type: 'object',\n  description: 'Response indicating successful app opening.',\n  properties: {\n    success: {\n      type: 'boolean',\n      description: 'Whether the app was successfully opened/focused.'\n    }\n  },\n  required: [    'success'\n  ]\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      chatID: {
        type: 'string',
        description:
          'Optional Beeper chat ID (or local chat ID) to focus after opening the app. If omitted, only opens/focuses the app.',
      },
      draftAttachmentPath: {
        type: 'string',
        description: 'Optional draft attachment path to populate in the message input field.',
      },
      draftText: {
        type: 'string',
        description: 'Optional draft text to populate in the message input field.',
      },
      messageID: {
        type: 'string',
        description: 'Optional message ID. Jumps to that message in the chat when opening.',
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
  annotations: {},
};

export const handler = async (client: BeeperDesktop, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.open(body)));
};

export default { metadata, tool, handler };
