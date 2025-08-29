// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

/**
 * Authenticated operations related to the current access token
 */
export class Token extends APIResource {
  /**
   * List connected Beeper accounts available on this device
   */
  accounts(options?: RequestOptions): APIPromise<GetAccountsResponse> {
    return this._client.get('/v0/get-accounts', options);
  }

  /**
   * Returns information about the authenticated user/token
   */
  info(options?: RequestOptions): APIPromise<UserInfo> {
    return this._client.get('/oauth/userinfo', options);
  }

  /**
   * Revoke an access token or refresh token (RFC 7009)
   */
  revoke(body: TokenRevokeParams, options?: RequestOptions): APIPromise<void> {
    return this._client.post('/oauth/revoke', {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

/**
 * Response payload for listing connected Beeper accounts.
 */
export interface GetAccountsResponse {
  /**
   * Connected accounts the user can act through. Includes accountID, network, and
   * user identity.
   */
  accounts: Array<Shared.Account>;
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

export interface TokenRevokeParams {
  /**
   * The token to revoke
   */
  token: string;

  /**
   * Token type hint (RFC 7009)
   */
  token_type_hint?: 'access_token';
}

export declare namespace Token {
  export {
    type GetAccountsResponse as GetAccountsResponse,
    type RevokeRequest as RevokeRequest,
    type UserInfo as UserInfo,
    type TokenRevokeParams as TokenRevokeParams,
  };
}
