// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';

/**
 * OAuth2 authentication and token management
 */
export class OAuth extends APIResource {}

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

export declare namespace OAuth {
  export { type RevokeRequest as RevokeRequest, type UserInfo as UserInfo };
}
