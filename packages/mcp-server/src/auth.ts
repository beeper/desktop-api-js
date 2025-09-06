import { ProxyOAuthServerProvider } from '@modelcontextprotocol/sdk/server/auth/providers/proxyProvider.js';
import { mcpAuthRouter } from '@modelcontextprotocol/sdk/server/auth/router.js';
import { readEnv } from './server';
import express from 'express';
import { fromError } from 'zod-validation-error/v3';

export const baseURL = readEnv('BEEPER_DESKTOP_BASE_URL') || 'http://localhost:23373';

export const getMcpUrl = (port: number | string | undefined, socket?: string): string => {
  if (socket) {
    return `http://unix:${socket}`;
  }

  const actualPort = port || 3000;
  return `http://localhost:${actualPort}`;
};

export const createProxyProvider = (port: number | string | undefined): ProxyOAuthServerProvider => {
  const mcpUrl = getMcpUrl(port);

  return new ProxyOAuthServerProvider({
    endpoints: {
      authorizationUrl: `${baseURL}/oauth/authorize`,
      tokenUrl: `${baseURL}/oauth/token`,
      revocationUrl: `${baseURL}/oauth/revoke`,
      registrationUrl: `${baseURL}/oauth/register`,
    },
    verifyAccessToken: async (token: string) => {
      try {
        const response = await fetch(`${baseURL}/v0/mcp/validate`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        console.log('Token validation response status:', response.status);

        if (!response.ok) {
          return {
            token,
            clientId: 'unknown',
            scopes: ['read'],
          };
        }

        const tokenData: any = await response.json();

        return {
          token,
          clientId: tokenData.clientInfo?.name || 'unknown',
          scopes: tokenData.scopes || ['read'],
        };
      } catch (error) {
        console.error('Token validation failed:', error);
        return {
          token,
          clientId: 'unknown',
          scopes: ['read'],
        };
      }
    },
    getClient: async (client_id: string) => {
      return {
        client_id,
        redirect_uris: [
          mcpUrl,
          'http://localhost:6274/oauth/callback/debug',
          'http://localhost:6274/oauth/callback',
        ],
      };
    },
  });
};

export const createMCPAuthRouter = (port: number | string | undefined): express.RequestHandler => {
  const proxyProvider = createProxyProvider(port);
  const mcpUrl = getMcpUrl(port);

  return mcpAuthRouter({
    provider: proxyProvider,
    issuerUrl: new URL(baseURL),
    baseUrl: new URL(mcpUrl),
  });
};

export const customWellKnownEndpoint = (
  req: express.Request,
  res: express.Response,
  port: number | string | undefined,
) => {
  const mcpUrl = getMcpUrl(port);

  res.json({
    resource: mcpUrl,
    authorization_servers: [baseURL],
  });
};

export const sendUnauthorizedResponse = (
  res: express.Response,
  port: number | string | undefined,
  error?: any,
) => {
  const resourceIdentifier = getMcpUrl(port);
  const wwwAuth = `Bearer resource="${resourceIdentifier}", resource_metadata="${resourceIdentifier}.well-known/oauth-protected-resource"`;

  res.set('WWW-Authenticate', wwwAuth);
  res.status(401).json({
    jsonrpc: '2.0',
    error: {
      code: -32000,
      message: `Invalid request: ${fromError(error)}`,
    },
  });
};

export const getTokenForStdio = async (): Promise<string> => {
  const response = await fetch(`${baseURL}/oauth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: 'stdio-mcp-client',
      // client_secret: process.env.MCP_CLIENT_SECRET || '',
      scope: 'read write',
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to get token: ${response.status}`);
  }

  const data = await response.json();
  return (data as any).access_token;
};
