import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import express from 'express';
import { fromError } from 'zod-validation-error/v3';
import { McpOptions, parseQueryOptions } from './options';
import { initMcpServer, newMcpServer } from './server';
import { parseAuthHeaders } from './headers';
import { createMCPAuthRouter, customWellKnownEndpoint, sendUnauthorizedResponse } from './auth';

const newServer = (
  defaultMcpOptions: McpOptions,
  req: express.Request,
  res: express.Response,
): McpServer | null => {
  const server = newMcpServer();
  let mcpOptions: McpOptions;

  try {
    mcpOptions = parseQueryOptions(defaultMcpOptions, req.query);
  } catch (error) {
    res.status(400).json({
      jsonrpc: '2.0',
      error: {
        code: -32000,
        message: `Invalid request: ${fromError(error)}`,
      },
    });
    return null;
  }

  try {
    const authOptions = parseAuthHeaders(req);

    if (!authOptions.accessToken) {
      sendUnauthorizedResponse(res);
      return null;
    }

    initMcpServer({
      server: server,
      clientOptions: {
        ...authOptions,
        defaultHeaders: {
          'X-Stainless-MCP': 'true',
        },
      },
      mcpOptions,
    });
  } catch (error) {
    sendUnauthorizedResponse(res);
    return null;
  }

  return server;
};

const post = (defaultOptions: McpOptions) => async (req: express.Request, res: express.Response) => {
  const server = newServer(defaultOptions, req, res);

  if (server === null) return;

  const transport = new StreamableHTTPServerTransport({
    // Stateless server
    sessionIdGenerator: undefined,
  });

  await server.connect(transport);
  await transport.handleRequest(req, res, req.body);
};

const get = async (req: express.Request, res: express.Response) => {
  res.status(405).json({
    jsonrpc: '2.0',
    error: {
      code: -32000,
      message: 'Method not supported',
    },
  });
};

const del = async (req: express.Request, res: express.Response) => {
  res.status(405).json({
    jsonrpc: '2.0',
    error: {
      code: -32000,
      message: 'Method not supported',
    },
  });
};

export const streamableHTTPApp = (options: McpOptions): express.Express => {
  const app = express();

  app.set('query parser', 'extended');
  app.use(express.json());

  const beeperProxyRouter = createMCPAuthRouter();
  app.get('/.well-known/oauth-protected-resource', (req, res) => customWellKnownEndpoint(req, res));
  app.use(beeperProxyRouter);

  app.get('/', get);
  app.post('/', post(options));
  app.delete('/', del);

  return app;
};

export const launchStreamableHTTPServer = async (options: McpOptions, port: number | string | undefined) => {
  const app = streamableHTTPApp(options);
  const server = app.listen(port);
  const address = server.address();

  if (typeof address === 'string') {
    console.error(`MCP Server running on streamable HTTP at ${address}`);
  } else if (address !== null) {
    console.error(`MCP Server running on streamable HTTP on port ${address.port}`);
  } else {
    console.error(`MCP Server running on streamable HTTP on port ${port}`);
  }
};
