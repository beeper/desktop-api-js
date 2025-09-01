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
   * List connected Beeper accounts available on this device
   */
  list(options?: RequestOptions): APIPromise<AccountListResponse> {
    return this._client.get('/v0/get-accounts', options);
  }
}

export type AccountListResponse = Array<AccountListResponse.AccountListResponseItem>;

export namespace AccountListResponse {
  /**
   * A chat account added to Beeper
   */
  export interface AccountListResponseItem {
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

export declare namespace Accounts {
  export { type AccountListResponse as AccountListResponse };
}
