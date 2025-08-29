// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

/**
 * OAuth2 authentication and token management
 */
export class OAuth extends APIResource {
  /**
   * Starts the OAuth2 Authorization Code flow with PKCE. Renders an HTML consent
   * page where the user can approve the requested scopes.
   */
  authorize(query: OAuthAuthorizeParams, options?: RequestOptions): APIPromise<string> {
    return this._client.get('/oauth/authorize', {
      query,
      ...options,
      headers: buildHeaders([{ Accept: 'text/html' }, options?.headers]),
    });
  }

  /**
   * Completes the OAuth2 approval initiated by the consent screen and returns an
   * authorization code if approved.
   */
  authorizeCallback(
    body: OAuthAuthorizeCallbackParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<OAuthAuthorizeCallbackResponse> {
    return this._client.post('/oauth/authorize/callback', { body, ...options });
  }

  /**
   * Returns information about the authenticated user/token
   */
  getUserInfo(options?: RequestOptions): APIPromise<UserInfo> {
    return this._client.get('/oauth/userinfo', options);
  }

  /**
   * Registers a new OAuth2 public client using Dynamic Client Registration (RFC
   * 7591). Returns client metadata.
   */
  registerClient(
    body: OAuthRegisterClientParams,
    options?: RequestOptions,
  ): APIPromise<OAuthRegisterClientResponse> {
    return this._client.post('/oauth/register', { body, ...options });
  }

  /**
   * Revoke an access token or refresh token (RFC 7009)
   */
  revokeToken(body: OAuthRevokeTokenParams, options?: RequestOptions): APIPromise<void> {
    return this._client.post('/oauth/revoke', {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Exchanges an authorization code (PKCE) for an access token. Supports the
   * Authorization Code grant with PKCE.
   */
  token(body: OAuthTokenParams, options?: RequestOptions): APIPromise<OAuthTokenResponse> {
    return this._client.post('/oauth/token', { body, ...options });
  }

  /**
   * RFC 8414 authorization server metadata document.
   */
  wellKnownAuthorizationServer(
    options?: RequestOptions,
  ): APIPromise<OAuthWellKnownAuthorizationServerResponse> {
    return this._client.get('/.well-known/oauth-authorization-server', options);
  }

  /**
   * RFC 9728 protected resource metadata document.
   */
  wellKnownProtectedResource(options?: RequestOptions): APIPromise<OAuthWellKnownProtectedResourceResponse> {
    return this._client.get('/.well-known/oauth-protected-resource', options);
  }
}

export interface RevokeRequest {
  /**
   * The token to revoke
   */
  token: string;

  /**
   * Hint about the type of token being revoked
   */
  token_type_hint?: 'access_token';
}

export interface UserInfo {
  /**
   * Issued at timestamp (Unix epoch seconds)
   */
  iat: number;

  /**
   * Granted scopes
   */
  scope: string;

  /**
   * Subject identifier (token ID)
   */
  sub: string;

  /**
   * Token type
   */
  token_use: 'access';

  /**
   * Audience (client ID)
   */
  aud?: string;

  /**
   * Client identifier
   */
  client_id?: string;

  /**
   * Expiration timestamp (Unix epoch seconds)
   */
  exp?: number;
}

export type OAuthAuthorizeResponse = string;

export interface OAuthAuthorizeCallbackResponse {
  /**
   * Authorization code to exchange for a token
   */
  code?: string;

  /**
   * Error code if authorization was denied or failed
   */
  error?: string;

  state?: string;
}

export interface OAuthRegisterClientResponse {
  authorization_endpoint: string;

  client_id: string;

  client_id_issued_at: number;

  client_name: string;

  grant_types: Array<'authorization_code'>;

  redirect_uris: Array<string>;

  response_types: Array<'code'>;

  scope: string;

  token_endpoint: string;

  token_endpoint_auth_method: 'none';

  client_uri?: string;
}

export interface OAuthTokenResponse {
  access_token: string;

  expires_in: number;

  scope: string;

  token_type: 'Bearer';
}

export interface OAuthWellKnownAuthorizationServerResponse {
  authorization_endpoint: string;

  code_challenge_methods_supported: Array<'S256'>;

  grant_types_supported: Array<'authorization_code'>;

  issuer: string;

  registration_endpoint: string;

  response_types_supported: Array<'code'>;

  revocation_endpoint: string;

  scopes_supported: Array<'read' | 'write'>;

  service_documentation: string;

  token_endpoint: string;

  token_endpoint_auth_methods_supported: Array<'none'>;

  userinfo_endpoint: string;
}

export interface OAuthWellKnownProtectedResourceResponse {
  authorization_servers: Array<string>;

  resource: string;
}

export interface OAuthAuthorizeParams {
  /**
   * Client identifier
   */
  client_id: string;

  /**
   * PKCE code challenge (S256)
   */
  code_challenge: string;

  /**
   * Redirect URI to receive the authorization code
   */
  redirect_uri: string;

  /**
   * Must be "code"
   */
  response_type: 'code';

  /**
   * PKCE method; only S256 is supported
   */
  code_challenge_method?: 'S256';

  /**
   * Requested resource (RFC 8707)
   */
  resource?: string;

  /**
   * Space-delimited scopes to request
   */
  scope?: string;

  /**
   * Opaque value to maintain state between the request and callback
   */
  state?: string;
}

export interface OAuthAuthorizeCallbackParams {
  clientInfo?: OAuthAuthorizeCallbackParams.ClientInfo;

  /**
   * PKCE code challenge from the authorize request
   */
  codeChallenge?: string;

  /**
   * PKCE method; only S256 is supported
   */
  codeChallengeMethod?: 'S256';

  /**
   * Requested resource (RFC 8707)
   */
  resource?: string;

  /**
   * Requested scopes
   */
  scopes?: Array<'read' | 'write'>;

  state?: string;
}

export namespace OAuthAuthorizeCallbackParams {
  export interface ClientInfo {
    clientID?: string;

    clientURI?: string;

    name?: string;

    remoteAddress?: string;

    userAgent?: string;

    version?: string;
  }
}

export interface OAuthRegisterClientParams {
  /**
   * Human-readable client name
   */
  client_name: string;

  /**
   * Allowed redirect URIs
   */
  redirect_uris: Array<string>;

  /**
   * Client homepage
   */
  client_uri?: string;

  /**
   * Supported grant types
   */
  grant_types?: Array<'authorization_code'>;

  /**
   * Supported response types
   */
  response_types?: Array<'code'>;

  /**
   * Default scopes
   */
  scope?: string;

  /**
   * Auth method for token endpoint; public clients use none
   */
  token_endpoint_auth_method?: 'none';
}

export interface OAuthRevokeTokenParams {
  /**
   * The token to revoke
   */
  token: string;

  /**
   * Token type hint (RFC 7009)
   */
  token_type_hint?: 'access_token';
}

export interface OAuthTokenParams {
  /**
   * Authorization code returned by the authorize step
   */
  code: string;

  /**
   * PKCE code verifier
   */
  code_verifier: string;

  /**
   * OAuth2 grant type; only authorization_code is supported
   */
  grant_type: 'authorization_code';

  /**
   * Client ID (optional for public PKCE clients)
   */
  client_id?: string;

  /**
   * Resource parameter (RFC 8707)
   */
  resource?: string;
}

export declare namespace OAuth {
  export {
    type RevokeRequest as RevokeRequest,
    type UserInfo as UserInfo,
    type OAuthAuthorizeResponse as OAuthAuthorizeResponse,
    type OAuthAuthorizeCallbackResponse as OAuthAuthorizeCallbackResponse,
    type OAuthRegisterClientResponse as OAuthRegisterClientResponse,
    type OAuthTokenResponse as OAuthTokenResponse,
    type OAuthWellKnownAuthorizationServerResponse as OAuthWellKnownAuthorizationServerResponse,
    type OAuthWellKnownProtectedResourceResponse as OAuthWellKnownProtectedResourceResponse,
    type OAuthAuthorizeParams as OAuthAuthorizeParams,
    type OAuthAuthorizeCallbackParams as OAuthAuthorizeCallbackParams,
    type OAuthRegisterClientParams as OAuthRegisterClientParams,
    type OAuthRevokeTokenParams as OAuthRevokeTokenParams,
    type OAuthTokenParams as OAuthTokenParams,
  };
}
