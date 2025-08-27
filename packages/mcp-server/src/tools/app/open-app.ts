// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from '@beeper/desktop-api-mcp/filtering';
import { Metadata, asTextContentResult } from '@beeper/desktop-api-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import BeeperDesktop from '@beeper/desktop-api';

export const metadata: Metadata = {
  resource: 'app',
  operation: 'write',
  tags: ['app'],
  httpMethod: 'post',
  httpPath: '/v0/open-app',
  operationId: 'open_app',
};

export const tool: Tool = {
  name: 'open_app',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nOpen Beeper, optionally focusing a chat or message, or pre-filling a draft.\n\n# Response Schema\n```json\n{\n  type: 'object',\n  description: 'Response indicating successful app opening.',\n  properties: {\n    success: {\n      type: 'boolean',\n      description: 'Whether the app was successfully opened/focused.'\n    }\n  },\n  required: [    'success'\n  ]\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      chatID: {
        type: 'string',
        description:
          'Optional Beeper chat ID to focus after opening the app. If omitted, only opens/focuses the app.',
      },
      draftText: {
        type: 'string',
        description: 'Optional draft text to populate in the message input field.',
      },
      messageSortKey: {
        type: 'string',
        description: 'Optional message sort key. Jumps to that message in the chat when opening.',
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
  return asTextContentResult(await maybeFilter(jq_filter, await client.app.focus(body)));
};

export default { metadata, tool, handler };
