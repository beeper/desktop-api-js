// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from '@beeper/desktop-api-mcp/filtering';
import { Metadata, asTextContentResult } from '@beeper/desktop-api-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import BeeperDesktop from '@beeper/desktop-api';

export const metadata: Metadata = {
  resource: 'messages',
  operation: 'write',
  tags: ['messages'],
  httpMethod: 'post',
  httpPath: '/v0/get-attachment',
  operationId: 'get_attachment',
};

export const tool: Tool = {
  name: 'get_attachment',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nDownload a message attachment and return the local file path.\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    success: {\n      type: 'boolean',\n      description: 'Whether the attachment was successfully downloaded.'\n    },\n    error: {\n      type: 'string',\n      description: 'Error message if the download failed.'\n    },\n    filePath: {\n      type: 'string',\n      description: 'Local file system path to the downloaded attachment.'\n    }\n  },\n  required: [    'success'\n  ]\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      chatID: {
        type: 'string',
        description: 'Unique identifier of the chat (supports both chatID and localChatID).',
      },
      messageID: {
        type: 'string',
        description: 'The message ID (eventID) containing the attachment.',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['chatID', 'messageID'],
  },
  annotations: {},
};

export const handler = async (client: BeeperDesktop, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.messages.getAttachment(body)));
};

export default { metadata, tool, handler };
