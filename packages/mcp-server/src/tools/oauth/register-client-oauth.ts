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
  httpPath: '/oauth/register',
  operationId: 'oauth_register_client',
};

export const tool: Tool = {
  name: 'register_client_oauth',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nRegisters a new OAuth2 public client using Dynamic Client Registration (RFC 7591). Returns client metadata.\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    authorization_endpoint: {\n      type: 'string'\n    },\n    client_id: {\n      type: 'string'\n    },\n    client_id_issued_at: {\n      type: 'integer'\n    },\n    client_name: {\n      type: 'string'\n    },\n    grant_types: {\n      type: 'array',\n      items: {\n        type: 'string',\n        enum: [          'authorization_code'\n        ]\n      }\n    },\n    redirect_uris: {\n      type: 'array',\n      items: {\n        type: 'string'\n      }\n    },\n    response_types: {\n      type: 'array',\n      items: {\n        type: 'string',\n        enum: [          'code'\n        ]\n      }\n    },\n    scope: {\n      type: 'string'\n    },\n    token_endpoint: {\n      type: 'string'\n    },\n    token_endpoint_auth_method: {\n      type: 'string',\n      enum: [        'none'\n      ]\n    },\n    client_uri: {\n      type: 'string'\n    }\n  },\n  required: [    'authorization_endpoint',\n    'client_id',\n    'client_id_issued_at',\n    'client_name',\n    'grant_types',\n    'redirect_uris',\n    'response_types',\n    'scope',\n    'token_endpoint',\n    'token_endpoint_auth_method'\n  ]\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      client_name: {
        type: 'string',
        description: 'Human-readable client name',
      },
      redirect_uris: {
        type: 'array',
        description: 'Allowed redirect URIs',
        items: {
          type: 'string',
        },
      },
      client_uri: {
        type: 'string',
        description: 'Client homepage',
      },
      grant_types: {
        type: 'array',
        description: 'Supported grant types',
        items: {
          type: 'string',
          enum: ['authorization_code'],
        },
      },
      response_types: {
        type: 'array',
        description: 'Supported response types',
        items: {
          type: 'string',
          enum: ['code'],
        },
      },
      scope: {
        type: 'string',
        description: 'Default scopes',
      },
      token_endpoint_auth_method: {
        type: 'string',
        description: 'Auth method for token endpoint; public clients use none',
        enum: ['none'],
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['client_name', 'redirect_uris'],
  },
  annotations: {},
};

export const handler = async (client: BeeperDesktop, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.oauth.registerClient(body)));
};

export default { metadata, tool, handler };
