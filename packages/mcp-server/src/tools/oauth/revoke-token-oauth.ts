// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from '@beeper/desktop-api-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import BeeperDesktop from '@beeper/desktop-api';

export const metadata: Metadata = {
  resource: 'oauth',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/oauth/revoke',
  operationId: 'oauth_revoke_token',
};

export const tool: Tool = {
  name: 'revoke_token_oauth',
  description: 'Revoke an access token or refresh token (RFC 7009)',
  inputSchema: {
    type: 'object',
    properties: {
      token: {
        type: 'string',
        description: 'The token to revoke',
      },
      token_type_hint: {
        type: 'string',
        description: 'Token type hint (RFC 7009)',
        enum: ['access_token'],
      },
    },
    required: ['token'],
  },
  annotations: {},
};

export const handler = async (client: BeeperDesktop, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  const response = await client.oauth.revokeToken(body).asResponse();
  return asTextContentResult(await response.text());
};

export default { metadata, tool, handler };
