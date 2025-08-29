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
  httpPath: '/.well-known/oauth-authorization-server',
  operationId: 'oauth_well_known_authorization_server',
};

export const tool: Tool = {
  name: 'well_known_authorization_server_oauth',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nRFC 8414 authorization server metadata document.\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    authorization_endpoint: {\n      type: 'string'\n    },\n    code_challenge_methods_supported: {\n      type: 'array',\n      items: {\n        type: 'string',\n        enum: [          'S256'\n        ]\n      }\n    },\n    grant_types_supported: {\n      type: 'array',\n      items: {\n        type: 'string',\n        enum: [          'authorization_code'\n        ]\n      }\n    },\n    issuer: {\n      type: 'string'\n    },\n    registration_endpoint: {\n      type: 'string'\n    },\n    response_types_supported: {\n      type: 'array',\n      items: {\n        type: 'string',\n        enum: [          'code'\n        ]\n      }\n    },\n    revocation_endpoint: {\n      type: 'string'\n    },\n    scopes_supported: {\n      type: 'array',\n      items: {\n        type: 'string',\n        enum: [          'read',\n          'write'\n        ]\n      }\n    },\n    service_documentation: {\n      type: 'string'\n    },\n    token_endpoint: {\n      type: 'string'\n    },\n    token_endpoint_auth_methods_supported: {\n      type: 'array',\n      items: {\n        type: 'string',\n        enum: [          'none'\n        ]\n      }\n    },\n    userinfo_endpoint: {\n      type: 'string'\n    }\n  },\n  required: [    'authorization_endpoint',\n    'code_challenge_methods_supported',\n    'grant_types_supported',\n    'issuer',\n    'registration_endpoint',\n    'response_types_supported',\n    'revocation_endpoint',\n    'scopes_supported',\n    'service_documentation',\n    'token_endpoint',\n    'token_endpoint_auth_methods_supported',\n    'userinfo_endpoint'\n  ]\n}\n```",
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
  return asTextContentResult(await maybeFilter(jq_filter, await client.oauth.wellKnownAuthorizationServer()));
};

export default { metadata, tool, handler };
