// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as GetChatAPI from './get-chat';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class GetAccounts extends APIResource {
  /**
   * List connected Beeper accounts available on this device.
   *
   * - When to use: select account context before account-scoped operations.
   * - Scope: only accounts currently Connected on this device are included. Returns:
   *   connected accounts.
   */
  list(options?: RequestOptions): APIPromise<GetAccountListResponse> {
    return this._client.get('/v0/get-accounts', options);
  }
}

/**
 * Response payload for listing connected Beeper accounts.
 */
export interface GetAccountListResponse {
  /**
   * Connected accounts the user can act through. Includes accountID, network, and
   * user identity.
   */
  accounts: Array<GetAccountListResponse.Account>;
}

export namespace GetAccountListResponse {
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
    user: GetChatAPI.User;
  }
}

export declare namespace GetAccounts {
  export { type GetAccountListResponse as GetAccountListResponse };
}
