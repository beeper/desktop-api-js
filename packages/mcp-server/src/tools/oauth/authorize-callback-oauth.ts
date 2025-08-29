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
  httpPath: '/oauth/authorize/callback',
  operationId: 'oauth_authorize_callback',
};

export const tool: Tool = {
  name: 'authorize_callback_oauth',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nCompletes the OAuth2 approval initiated by the consent screen and returns an authorization code if approved.\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    code: {\n      type: 'string',\n      description: 'Authorization code to exchange for a token'\n    },\n    error: {\n      type: 'string',\n      description: 'Error code if authorization was denied or failed'\n    },\n    state: {\n      type: 'string'\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      clientInfo: {
        type: 'object',
        properties: {
          clientID: {
            type: 'string',
          },
          clientURI: {
            type: 'string',
          },
          name: {
            type: 'string',
          },
          remoteAddress: {
            type: 'string',
          },
          userAgent: {
            type: 'string',
          },
          version: {
            type: 'string',
          },
        },
      },
      codeChallenge: {
        type: 'string',
        description: 'PKCE code challenge from the authorize request',
      },
      codeChallengeMethod: {
        type: 'string',
        description: 'PKCE method; only S256 is supported',
        enum: ['S256'],
      },
      resource: {
        type: 'string',
        description: 'Requested resource (RFC 8707)',
      },
      scopes: {
        type: 'array',
        description: 'Requested scopes',
        items: {
          type: 'string',
          enum: ['read', 'write'],
        },
      },
      state: {
        type: 'string',
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
  return asTextContentResult(await maybeFilter(jq_filter, await client.oauth.authorizeCallback(body)));
};

export default { metadata, tool, handler };
