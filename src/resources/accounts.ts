// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as TokenAPI from './token';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * Accounts operations
 */
export class Accounts extends APIResource {
  /**
   * List connected Beeper accounts available on this device
   */
  list(options?: RequestOptions): APIPromise<TokenAPI.GetAccountsResponse> {
    return this._client.get('/v0/get-accounts', options);
  }
}
