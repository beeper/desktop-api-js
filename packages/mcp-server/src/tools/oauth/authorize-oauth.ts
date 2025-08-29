// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from '@beeper/desktop-api-mcp/filtering';
import { Metadata, asTextContentResult } from '@beeper/desktop-api-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import BeeperDesktop from '@beeper/desktop-api';

export const metadata: Metadata = {
  resource: 'oauth',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/oauth/authorize',
  operationId: 'oauth_authorize',
};

export const tool: Tool = {
  name: 'authorize_oauth',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nStarts the OAuth2 Authorization Code flow with PKCE. Renders an HTML consent page where the user can approve the requested scopes.\n\n# Response Schema\n```json\n{\n  type: 'string'\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      client_id: {
        type: 'string',
        description: 'Client identifier',
      },
      code_challenge: {
        type: 'string',
        description: 'PKCE code challenge (S256)',
      },
      redirect_uri: {
        type: 'string',
        description: 'Redirect URI to receive the authorization code',
      },
      response_type: {
        type: 'string',
        description: 'Must be "code"',
        enum: ['code'],
      },
      code_challenge_method: {
        type: 'string',
        description: 'PKCE method; only S256 is supported',
        enum: ['S256'],
      },
      resource: {
        type: 'string',
        description: 'Requested resource (RFC 8707)',
      },
      scope: {
        type: 'string',
        description: 'Space-delimited scopes to request',
      },
      state: {
        type: 'string',
        description: 'Opaque value to maintain state between the request and callback',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['client_id', 'code_challenge', 'redirect_uri', 'response_type'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: BeeperDesktop, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.oauth.authorize(body)));
};

export default { metadata, tool, handler };
