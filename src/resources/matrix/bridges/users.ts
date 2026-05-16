// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * Matrix-compatible APIs for accounts and connected network bridges.
 */
export class BaseUsers extends APIResource {
  static override readonly _key: readonly ['matrix', 'bridges', 'users'] = Object.freeze([
    'matrix',
    'bridges',
    'users',
  ] as const);

  /**
   * Resolve an identifier to a user on the remote network.
   *
   * @example
   * ```ts
   * const response = await client.matrix.bridges.users.resolve(
   *   'identifier',
   *   { bridgeID: 'bridgeID' },
   * );
   * ```
   */
  resolve(
    identifier: string,
    params: UserResolveParams,
    options?: RequestOptions,
  ): APIPromise<UserResolveResponse> {
    const { bridgeID, ...query } = params;
    return this._client.get(
      path`/_matrix/client/unstable/com.beeper.bridge/${bridgeID}/_matrix/provision/v3/resolve_identifier/${identifier}`,
      { query, ...options },
    );
  }

  /**
   * Search for users on the remote network
   *
   * @example
   * ```ts
   * const response = await client.matrix.bridges.users.search(
   *   'bridgeID',
   * );
   * ```
   */
  search(
    bridgeID: string,
    params: UserSearchParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<UserSearchResponse> {
    const { login_id, ...body } = params ?? {};
    return this._client.post(
      path`/_matrix/client/unstable/com.beeper.bridge/${bridgeID}/_matrix/provision/v3/search_users`,
      { query: { login_id }, body, ...options },
    );
  }
}
/**
 * Matrix-compatible APIs for accounts and connected network bridges.
 */
export class Users extends BaseUsers {}

/**
 * A successfully resolved identifier.
 */
export interface UserResolveResponse {
  /**
   * The internal user ID of the resolved user.
   */
  id: string;

  /**
   * The avatar of the user on the remote network.
   */
  avatar_url?: string;

  /**
   * The Matrix room ID of the direct chat with the user.
   */
  dm_room_mxid?: string;

  /**
   * A list of identifiers for the user on the remote network.
   */
  identifiers?: Array<string>;

  /**
   * The Matrix user ID of the ghost representing the user.
   */
  mxid?: string;

  /**
   * The name of the user on the remote network.
   */
  name?: string;
}

export interface UserSearchResponse {
  results?: Array<UserSearchResponse.Result>;
}

export namespace UserSearchResponse {
  /**
   * A successfully resolved identifier.
   */
  export interface Result {
    /**
     * The internal user ID of the resolved user.
     */
    id: string;

    /**
     * The avatar of the user on the remote network.
     */
    avatar_url?: string;

    /**
     * The Matrix room ID of the direct chat with the user.
     */
    dm_room_mxid?: string;

    /**
     * A list of identifiers for the user on the remote network.
     */
    identifiers?: Array<string>;

    /**
     * The Matrix user ID of the ghost representing the user.
     */
    mxid?: string;

    /**
     * The name of the user on the remote network.
     */
    name?: string;
  }
}

export interface UserResolveParams {
  /**
   * Path param: Bridge ID for the connected network account, for example discordgo
   * or local-whatsapp.
   */
  bridgeID: string;

  /**
   * Query param: An optional explicit login ID to do the action through.
   */
  login_id?: string;
}

export interface UserSearchParams {
  /**
   * Query param: An optional explicit login ID to do the action through.
   */
  login_id?: string;

  /**
   * Body param: The search query to send to the remote network
   */
  query?: string;
}

export declare namespace Users {
  export {
    type UserResolveResponse as UserResolveResponse,
    type UserSearchResponse as UserSearchResponse,
    type UserResolveParams as UserResolveParams,
    type UserSearchParams as UserSearchParams,
  };
}
