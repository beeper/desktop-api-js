import { ProxyOAuthServerProvider } from '@modelcontextprotocol/sdk/server/auth/providers/proxyProvider.js';
import { mcpAuthRouter } from '@modelcontextprotocol/sdk/server/auth/router.js';
import { readEnv } from './server';
import express from 'express';
import { fromError } from 'zod-validation-error/v3';

export const BEEPER_DESKTOP_BASE_URL = readEnv('BEEPER_DESKTOP_BASE_URL') || 'http://localhost:23373';
export const BEEPER_MCP_BASE_URL = readEnv('BEEPER_MCP_BASE_URL') || 'http://localhost:3000';
export const BEEPER_AUTH_TOKEN = readEnv('AUTH_TOKEN') || '';

export const createProxyProvider = (redirect_uris?: string[]): ProxyOAuthServerProvider => {
  return new ProxyOAuthServerProvider({
    endpoints: {
      authorizationUrl: `${BEEPER_DESKTOP_BASE_URL}/oauth/authorize`,
      tokenUrl: `${BEEPER_DESKTOP_BASE_URL}/oauth/token`,
      revocationUrl: `${BEEPER_DESKTOP_BASE_URL}/oauth/revoke`,
      registrationUrl: `${BEEPER_DESKTOP_BASE_URL}/oauth/register`,
    },
    verifyAccessToken: async (token: string) => {
      try {
        const response = await fetch(`${BEEPER_DESKTOP_BASE_URL}/v0/mcp/validate`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        console.log('Token validation response status:', response.status);

        if (!response.ok) {
          throw new Error(`invalid_token (status ${response.status})`);
        }

        const tokenData: any = await response.json();

        return {
          token,
          clientId: tokenData.clientInfo?.name || 'unknown',
          scopes: tokenData.scopes || ['read'],
        };
      } catch (error) {
        console.error('Token validation failed:', error);
        throw error;
      }
    },
    getClient: async (client_id: string) => {
      return {
        client_id,
        redirect_uris:
          redirect_uris ? redirect_uris : (
            [
              BEEPER_MCP_BASE_URL,
              'http://localhost:6274/oauth/callback/debug',
              'http://localhost:6274/oauth/callback',
            ]
          ),
      };
    },
  });
};

export const createMCPAuthRouter = (redirect_uris?: string[]): express.RequestHandler => {
  const proxyProvider = createProxyProvider(redirect_uris);

  return mcpAuthRouter({
    provider: proxyProvider,
    issuerUrl: new URL(BEEPER_DESKTOP_BASE_URL),
    baseUrl: new URL(BEEPER_MCP_BASE_URL),
  });
};

export const customWellKnownEndpoint = (req: express.Request, res: express.Response) => {
  res.json({
    resource: BEEPER_MCP_BASE_URL,
    authorization_servers: [BEEPER_DESKTOP_BASE_URL],
  });
};

export const sendUnauthorizedResponse = (res: express.Response, error?: any) => {
  const wwwAuth = `Bearer resource_metadata="${BEEPER_MCP_BASE_URL}/.well-known/oauth-protected-resource"`;

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
  if (BEEPER_AUTH_TOKEN) return BEEPER_AUTH_TOKEN;

  // Needs to be implemented
  const response = await fetch(`${BEEPER_DESKTOP_BASE_URL}/oauth/token`, {
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
