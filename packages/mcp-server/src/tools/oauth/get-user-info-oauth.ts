// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'beeper/desktop-api-js-mcp/filtering';
import { Metadata, asTextContentResult } from 'beeper/desktop-api-js-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import BeeperDesktop from 'desktop-api-js';

export const metadata: Metadata = {
  resource: 'oauth',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/oauth/userinfo',
  operationId: 'oauth_get_user_info',
};

export const tool: Tool = {
  name: 'get_user_info_oauth',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nReturns information about the authenticated user/token\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/user_info',\n  $defs: {\n    user_info: {\n      type: 'object',\n      properties: {\n        iat: {\n          type: 'number',\n          description: 'Issued at timestamp (Unix epoch seconds)'\n        },\n        scope: {\n          type: 'string',\n          description: 'Granted scopes'\n        },\n        sub: {\n          type: 'string',\n          description: 'Subject identifier (token ID)'\n        },\n        token_use: {\n          type: 'string',\n          description: 'Token type',\n          enum: [            'access'\n          ]\n        },\n        aud: {\n          type: 'string',\n          description: 'Audience (client ID)'\n        },\n        client_id: {\n          type: 'string',\n          description: 'Client identifier'\n        },\n        exp: {\n          type: 'number',\n          description: 'Expiration timestamp (Unix epoch seconds)'\n        }\n      },\n      required: [        'iat',\n        'scope',\n        'sub',\n        'token_use'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: [],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: BeeperDesktop, args: Record<string, unknown> | undefined) => {
  const { jq_filter } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.oauth.getUserInfo()));
};

export default { metadata, tool, handler };
