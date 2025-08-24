// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from 'beeper/desktop-api-typescript/core/resource';
import { APIPromise } from 'beeper/desktop-api-typescript/core/api-promise';
import { buildHeaders } from 'beeper/desktop-api-typescript/internal/headers';
import { RequestOptions } from 'beeper/desktop-api-typescript/internal/request-options';

/**
 * OAuth2 authentication and token management
 */
export class OAuth extends APIResource {
  /**
   * Returns information about the authenticated user/token
   */
  getUserInfo(options?: RequestOptions): APIPromise<UserInfo> {
    return this._client.get('/oauth/userinfo', options);
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
}

export interface RevokeRequest {
  /**
   * The token to revoke
   */
  token: string;

  /**
   * Hint about the type of token being revoked
   */
  token_type_hint?: 'access_token' | 'refresh_token';
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

export declare namespace OAuth {
  export {
    type RevokeRequest as RevokeRequest,
    type UserInfo as UserInfo,
    type OAuthRevokeTokenParams as OAuthRevokeTokenParams,
  };
}
