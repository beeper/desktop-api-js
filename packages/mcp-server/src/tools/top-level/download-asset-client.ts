// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from '@beeper/desktop-api-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import BeeperDesktop from '@beeper/desktop-api';

export const metadata: Metadata = {
  resource: '$client',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/app/download-asset',
  operationId: 'downloadAsset',
};

export const tool: Tool = {
  name: 'download_asset_client',
  description: 'Download a Matrix asset using its mxc:// or localmxc:// URL and return the local file URL.',
  inputSchema: {
    type: 'object',
    properties: {
      url: {
        type: 'string',
        description: 'Matrix content URL (mxc:// or localmxc://) for the asset to download.',
      },
    },
    required: ['url'],
  },
  annotations: {},
};

export const handler = async (client: BeeperDesktop, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.downloadAsset(body));
};

export default { metadata, tool, handler };
