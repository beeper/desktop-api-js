// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import * as ContactsAPI from './contacts';
import { ContactListParams, ContactSearchParams, ContactSearchResponse, Contacts } from './contacts';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

/**
 * Manage connected chat accounts
 */
export class Accounts extends APIResource {
  contacts: ContactsAPI.Contacts = new ContactsAPI.Contacts(this._client);

  /**
   * Lists chat accounts across networks (WhatsApp, Telegram, Twitter/X, etc.)
   * actively connected to this Beeper Desktop instance
   *
   * @example
   * ```ts
   * const accounts = await client.accounts.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<AccountListResponse> {
    return this._client.get('/v1/accounts', options);
  }
}

/**
 * A chat account added to Beeper
 */
export interface Account {
  /**
   * Chat account added to Beeper. Use this to route account-scoped actions.
   */
  accountID: string;

  /**
   * Bridge metadata for the account. Available from Beeper Desktop v.4.2.719+.
   */
  bridge: Account.Bridge;

  /**
   * Human-friendly network name for the account.
   */
  network: string;

  /**
   * User the account belongs to.
   */
  user: Shared.User;
}

export namespace Account {
  /**
   * Bridge metadata for the account. Available from Beeper Desktop v.4.2.719+.
   */
  export interface Bridge {
    /**
     * Bridge instance identifier.
     */
    id: string;

    /**
     * Bridge provider for the account.
     */
    provider: 'cloud' | 'self-hosted' | 'local' | 'platform-sdk';

    /**
     * Bridge type.
     */
    type: string;
  }
}

/**
 * Connected accounts the user can act through. Includes accountID and user
 * identity.
 */
export type AccountListResponse = Array<Account>;

Accounts.Contacts = Contacts;

export declare namespace Accounts {
  export { type Account as Account, type AccountListResponse as AccountListResponse };

  export {
    Contacts as Contacts,
    type ContactSearchResponse as ContactSearchResponse,
    type ContactListParams as ContactListParams,
    type ContactSearchParams as ContactSearchParams,
  };
}
