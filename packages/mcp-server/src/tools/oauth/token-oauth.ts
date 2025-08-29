// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from '@beeper/desktop-api-mcp/filtering';
import { Metadata, asTextContentResult } from '@beeper/desktop-api-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import BeeperDesktop from '@beeper/desktop-api';

export const metadata: Metadata = {
  resource: 'oauth',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/oauth/token',
  operationId: 'oauth_token',
};

export const tool: Tool = {
  name: 'token_oauth',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nExchanges an authorization code (PKCE) for an access token. Supports the Authorization Code grant with PKCE.\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    access_token: {\n      type: 'string'\n    },\n    expires_in: {\n      type: 'integer'\n    },\n    scope: {\n      type: 'string'\n    },\n    token_type: {\n      type: 'string',\n      enum: [        'Bearer'\n      ]\n    }\n  },\n  required: [    'access_token',\n    'expires_in',\n    'scope',\n    'token_type'\n  ]\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      code: {
        type: 'string',
        description: 'Authorization code returned by the authorize step',
      },
      code_verifier: {
        type: 'string',
        description: 'PKCE code verifier',
      },
      grant_type: {
        type: 'string',
        description: 'OAuth2 grant type; only authorization_code is supported',
        enum: ['authorization_code'],
      },
      client_id: {
        type: 'string',
        description: 'Client ID (optional for public PKCE clients)',
      },
      resource: {
        type: 'string',
        description: 'Resource parameter (RFC 8707)',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['code', 'code_verifier', 'grant_type'],
  },
  annotations: {},
};

export const handler = async (client: BeeperDesktop, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.oauth.token(body)));
};

export default { metadata, tool, handler };
