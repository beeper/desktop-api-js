// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * Operations related to the current access token
 */
export class Token extends APIResource {
  /**
   * Returns information about the authenticated user/token
   */
  info(options?: RequestOptions): APIPromise<UserInfo> {
    return this._client.get('/oauth/userinfo', options);
  }
}

/**
 * Connected accounts the user can act through. Includes accountID, network, and
 * user identity.
 */
export type GetAccountsResponse = Array<GetAccountsResponse.GetAccountsResponseItem>;

export namespace GetAccountsResponse {
  /**
   * A chat account added to Beeper
   */
  export interface GetAccountsResponseItem {
    /**
     * Chat account added to Beeper. Use this to route account-scoped actions.
     */
    accountID: string;

    /**
     * Display-only human-readable network name (e.g., 'WhatsApp', 'Messenger'). You
     * MUST use 'accountID' to perform actions.
     */
    network: string;

    /**
     * A person on or reachable through Beeper. Values are best-effort and can vary by
     * network.
     */
    user: Shared.User;
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

export declare namespace Token {
  export {
    type GetAccountsResponse as GetAccountsResponse,
    type RevokeRequest as RevokeRequest,
    type UserInfo as UserInfo,
  };
}
