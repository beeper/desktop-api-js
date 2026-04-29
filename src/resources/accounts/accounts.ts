// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import * as ContactsAPI from './contacts';
import {
  BaseContacts,
  ContactListParams,
  ContactSearchParams,
  ContactSearchResponse,
  Contacts,
} from './contacts';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

/**
 * Manage connected chat accounts
 */
export class BaseAccounts extends APIResource {
  static override readonly _key: readonly ['accounts'] = Object.freeze(['accounts'] as const);

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
 * Manage connected chat accounts
 */
export class Accounts extends BaseAccounts {
  contacts: ContactsAPI.Contacts = new ContactsAPI.Contacts(this._client);
}

/**
 * A chat account added to Beeper.
 */
export interface Account {
  /**
   * Chat account added to Beeper. Use this to route account-scoped actions.
   */
  accountID: string;

  /**
   * Bridge metadata for the account. Available in Beeper Desktop v4.2.789+.
   */
  bridge: Account.Bridge;

  /**
   * User the account belongs to.
   */
  user: Shared.User;

  /**
   * Human-friendly network name for the account. Omitted when the network is
   * unknown.
   */
  network?: string;
}

export namespace Account {
  /**
   * Bridge metadata for the account. Available in Beeper Desktop v4.2.789+.
   */
  export interface Bridge {
    /**
     * Bridge instance identifier. Available in Beeper Desktop v4.2.789+.
     */
    id: string;

    /**
     * Bridge provider for the account. Available in Beeper Desktop v4.2.789+.
     */
    provider: 'cloud' | 'self-hosted' | 'local' | 'platform-sdk';

    /**
     * Bridge type. Available in Beeper Desktop v4.2.789+.
     */
    type: string;
  }
}

/**
 * Accounts configured on this device. Includes accountID, bridge metadata,
 * optional network name, and user identity.
 */
export type AccountListResponse = Array<Account>;

Accounts.Contacts = Contacts;
Accounts.BaseContacts = BaseContacts;

export declare namespace Accounts {
  export { type Account as Account, type AccountListResponse as AccountListResponse };

  export {
    Contacts as Contacts,
    BaseContacts as BaseContacts,
    type ContactSearchResponse as ContactSearchResponse,
    type ContactListParams as ContactListParams,
    type ContactSearchParams as ContactSearchParams,
  };
}
