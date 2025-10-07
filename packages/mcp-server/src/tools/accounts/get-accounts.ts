// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from '@beeper/desktop-api-mcp/filtering';
import { Metadata, asTextContentResult } from '@beeper/desktop-api-mcp/tools/types';

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
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nList connected accounts on this device.\n\n# Response Schema\n```json\n{\n  type: 'array',\n  description: 'Connected accounts the user can act through. Includes accountID, network, and user identity.',\n  items: {\n    $ref: '#/$defs/account'\n  },\n  $defs: {\n    account: {\n      type: 'object',\n      description: 'A chat account added to Beeper',\n      properties: {\n        accountID: {\n          type: 'string',\n          description: 'Chat account added to Beeper. Use this to route account-scoped actions.'\n        },\n        network: {\n          type: 'string',\n          description: 'Display-only human-readable network name (e.g., \\'WhatsApp\\', \\'Messenger\\').'\n        },\n        user: {\n          $ref: '#/$defs/user'\n        }\n      },\n      required: [        'accountID',\n        'network',\n        'user'\n      ]\n    },\n    user: {\n      type: 'object',\n      description: 'User the account belongs to.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'Stable Beeper user ID. Use as the primary key when referencing a person.'\n        },\n        cannotMessage: {\n          type: 'boolean',\n          description: 'True if Beeper cannot initiate messages to this user (e.g., blocked, network restriction, or no DM path). The user may still message you.'\n        },\n        email: {\n          type: 'string',\n          description: 'Email address if known. Not guaranteed verified.'\n        },\n        fullName: {\n          type: 'string',\n          description: 'Display name as shown in clients (e.g., \\'Alice Example\\'). May include emojis.'\n        },\n        imgURL: {\n          type: 'string',\n          description: 'Avatar image URL if available. May be temporary or local-only to this device; download promptly if durable access is needed.'\n        },\n        isSelf: {\n          type: 'boolean',\n          description: 'True if this user represents the authenticated account\\'s own identity.'\n        },\n        phoneNumber: {\n          type: 'string',\n          description: 'User\\'s phone number in E.164 format (e.g., \\'+14155552671\\'). Omit if unknown.'\n        },\n        username: {\n          type: 'string',\n          description: 'Human-readable handle if available (e.g., \\'@alice\\'). May be network-specific and not globally unique.'\n        }\n      },\n      required: [        'id'\n      ]\n    }\n  }\n}\n```",
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
  return asTextContentResult(await maybeFilter(jq_filter, await client.accounts.list()));
};

export default { metadata, tool, handler };
