// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'beeper/desktop-api-js-mcp/filtering';
import { Metadata, asTextContentResult } from 'beeper/desktop-api-js-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import BeeperDesktop from 'desktop-api-js';

export const metadata: Metadata = {
  resource: 'app',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v0/focus-app',
  operationId: 'focus_app',
};

export const tool: Tool = {
  name: 'focus_app',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nBring Beeper Desktop to the foreground on this device. Optionally focuses a specific chat if chatID is provided.\n- When to use: open Beeper, or jump to a specific chat.\n- Constraints: requires Beeper Desktop running locally; no-op in headless environments.\n- Idempotent: safe to call repeatedly. Returns an error if chatID is not found.\nReturns: success.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/base_response',\n  $defs: {\n    base_response: {\n      type: 'object',\n      properties: {\n        success: {\n          type: 'boolean'\n        },\n        error: {\n          type: 'string'\n        }\n      },\n      required: [        'success'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      chatID: {
        type: 'string',
        description:
          'Optional Beeper chat ID to focus after bringing the app to foreground. If omitted, only foregrounds the app. Required if messageSortKey is present. No-op in headless environments.',
      },
      messageSortKey: {
        type: 'string',
        description: 'Optional message sort key. Jumps to that message in the chat when foregrounding.',
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
