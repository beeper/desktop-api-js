// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from '@beeper/desktop-api-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import BeeperDesktop from '@beeper/desktop-api';

export const metadata: Metadata = {
  resource: '$client',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/oauth/userinfo',
  operationId: 'oauth_get_user_info',
};

export const tool: Tool = {
  name: 'get_token_info_client',
  description: 'Returns information about the authenticated user/token',
  inputSchema: {
    type: 'object',
    properties: {},
    required: [],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: BeeperDesktop, args: Record<string, unknown> | undefined) => {
  return asTextContentResult(await client.getTokenInfo());
};

export default { metadata, tool, handler };
