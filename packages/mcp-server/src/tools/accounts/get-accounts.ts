// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asErrorResult, asTextContentResult } from '@beeper/desktop-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import BeeperDesktop from '@beeper/desktop-api';

export const metadata: Metadata = {
  resource: 'accounts',
  operation: 'read',
  tags: ['accounts'],
  httpMethod: 'get',
  httpPath: '/v1/accounts',
  operationId: 'getAccounts',
};

export const tool: Tool = {
  name: 'get_accounts',
  description: 'List connected accounts on this device.',
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
  try {
    return asTextContentResult(await client.accounts.list());
  } catch (error) {
    if (error instanceof BeeperDesktop.APIError) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
