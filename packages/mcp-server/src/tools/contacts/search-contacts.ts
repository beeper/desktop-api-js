// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from '@beeper/desktop-api-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import BeeperDesktop from '@beeper/desktop-api';

export const metadata: Metadata = {
  resource: 'contacts',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/contacts/search',
  operationId: 'searchContacts',
};

export const tool: Tool = {
  name: 'search_contacts',
  description:
    "Search contacts across on a specific account using the network's search API. Only use for creating new chats.",
  inputSchema: {
    type: 'object',
    properties: {
      accountID: {
        type: 'string',
        description: 'Account ID this resource belongs to.',
      },
      query: {
        type: 'string',
        description: 'Text to search users by. Network-specific behavior.',
      },
    },
    required: ['accountID', 'query'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: BeeperDesktop, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.contacts.search(body));
};

export default { metadata, tool, handler };
