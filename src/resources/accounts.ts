// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from 'beeper/desktop-api-typescript/core/resource';
import * as Shared from 'beeper/desktop-api-typescript/resources/shared';
import { APIPromise } from 'beeper/desktop-api-typescript/core/api-promise';
import { RequestOptions } from 'beeper/desktop-api-typescript/internal/request-options';

/**
 * Manage and list connected messaging accounts
 */
export class Accounts extends APIResource {
  /**
   * List connected Beeper accounts available on this device.
   *
   * - When to use: select account context before account-scoped operations.
   * - Scope: only accounts currently Connected on this device are included. Returns:
   *   connected accounts.
   */
  list(options?: RequestOptions): APIPromise<AccountsResponse> {
    return this._client.get('/v0/get-accounts', options);
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

/**
 * Response payload for listing connected Beeper accounts.
 */
export interface AccountsResponse {
  /**
   * Connected accounts the user can act through. Includes accountID, network, and
   * user identity.
   */
  accounts: Array<Account>;
}

export declare namespace Accounts {
  export { type Account as Account, type AccountsResponse as AccountsResponse };
}
