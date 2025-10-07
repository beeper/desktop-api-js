// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * Accounts operations
 */
export class Accounts extends APIResource {
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
   * Display-only human-readable network name (e.g., 'WhatsApp', 'Messenger').
   */
  network: string;

  /**
   * User the account belongs to.
   */
  user: Shared.User;
}

/**
 * Connected accounts the user can act through. Includes accountID, network, and
 * user identity.
 */
export type AccountListResponse = Array<Account>;

export declare namespace Accounts {
  export { type Account as Account, type AccountListResponse as AccountListResponse };
}
