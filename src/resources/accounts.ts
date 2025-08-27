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

/**
 * Response payload for listing connected Beeper accounts.
 */
export interface AccountListResponse {
  /**
   * Connected accounts the user can act through. Includes accountID, network, and
   * user identity.
   */
  accounts: Array<Shared.Account>;
}

export declare namespace Accounts {
  export { type AccountListResponse as AccountListResponse };
}
