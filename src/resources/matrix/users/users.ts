// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as AccountDataAPI from './account-data';
import {
  AccountData,
  AccountDataRetrieveParams,
  AccountDataRetrieveResponse,
  AccountDataUpdateParams,
  AccountDataUpdateResponse,
  BaseAccountData,
} from './account-data';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class BaseUsers extends APIResource {
  static override readonly _key: readonly ['matrix', 'users'] = Object.freeze(['matrix', 'users'] as const);

  /**
   * Get the complete profile for a user.
   *
   * @example
   * ```ts
   * const response = await client.matrix.users.retrieveProfile(
   *   '@alice:example.com',
   * );
   * ```
   */
  retrieveProfile(userID: string, options?: RequestOptions): APIPromise<UserRetrieveProfileResponse> {
    return this._client.get(path`/_matrix/client/v3/profile/${userID}`, options);
  }
}
export class Users extends BaseUsers {
  accountData: AccountDataAPI.AccountData = new AccountDataAPI.AccountData(this._client);
}

export interface UserRetrieveProfileResponse {
  /**
   * The user's avatar URL if they have set one, otherwise not present.
   */
  avatar_url?: string;

  /**
   * The user's display name if they have set one, otherwise not present.
   */
  displayname?: string;

  /**
   * The user's time zone.
   */
  'm.tz'?: string;

  [k: string]: unknown;
}

Users.AccountData = AccountData;
Users.BaseAccountData = BaseAccountData;

export declare namespace Users {
  export { type UserRetrieveProfileResponse as UserRetrieveProfileResponse };

  export {
    AccountData as AccountData,
    BaseAccountData as BaseAccountData,
    type AccountDataRetrieveResponse as AccountDataRetrieveResponse,
    type AccountDataUpdateResponse as AccountDataUpdateResponse,
    type AccountDataRetrieveParams as AccountDataRetrieveParams,
    type AccountDataUpdateParams as AccountDataUpdateParams,
  };
}
