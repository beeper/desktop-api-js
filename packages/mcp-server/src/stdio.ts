import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { initMcpServer, newMcpServer } from './server';
import { McpOptions } from './options';
import { getTokenForStdio } from './auth';

export const launchStdioServer = async (options: McpOptions) => {
  try {
    const token = await getTokenForStdio();
    const server = newMcpServer();

    initMcpServer({
      server,
      clientOptions: {
        defaultHeaders: {
          Authorization: `Bearer ${token}`,
        },
      },
      mcpOptions: options,
    });

    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error('MCP Server running on stdio');
  } catch (error) {
    console.error('Failed to obtain access token:', error);
    process.exit(1);
  }
};
