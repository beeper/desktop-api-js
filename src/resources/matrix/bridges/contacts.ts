// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * Matrix-compatible APIs for accounts and connected network bridges.
 */
export class BaseContacts extends APIResource {
  static override readonly _key: readonly ['matrix', 'bridges', 'contacts'] = Object.freeze([
    'matrix',
    'bridges',
    'contacts',
  ] as const);

  /**
   * Get a list of contacts.
   *
   * @example
   * ```ts
   * const contacts = await client.matrix.bridges.contacts.list(
   *   'bridgeID',
   * );
   * ```
   */
  list(
    bridgeID: string,
    query: ContactListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ContactListResponse> {
    return this._client.get(
      path`/_matrix/client/unstable/com.beeper.bridge/${bridgeID}/_matrix/provision/v3/contacts`,
      { query, ...options },
    );
  }
}
/**
 * Matrix-compatible APIs for accounts and connected network bridges.
 */
export class Contacts extends BaseContacts {}

export interface ContactListResponse {
  contacts?: Array<ContactListResponse.Contact>;
}

export namespace ContactListResponse {
  /**
   * A successfully resolved identifier.
   */
  export interface Contact {
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

export interface ContactListParams {
  /**
   * An optional explicit login ID to do the action through.
   */
  login_id?: string;
}

export declare namespace Contacts {
  export { type ContactListResponse as ContactListResponse, type ContactListParams as ContactListParams };
}
