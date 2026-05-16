// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class BaseAccountData extends APIResource {
  static override readonly _key: readonly ['matrix', 'users', 'accountData'] = Object.freeze([
    'matrix',
    'users',
    'accountData',
  ] as const);

  /**
   * Get some account data for the client. This config is only visible to the user
   * that set the account data.
   *
   * @example
   * ```ts
   * const accountData =
   *   await client.matrix.users.accountData.retrieve(
   *     'org.example.custom.config',
   *     { userId: '@alice:example.com' },
   *   );
   * ```
   */
  retrieve(type: string, params: AccountDataRetrieveParams, options?: RequestOptions): APIPromise<unknown> {
    const { userId } = params;
    return this._client.get(path`/_matrix/client/v3/user/${userId}/account_data/${type}`, options);
  }

  /**
   * Set some account data for the client. This config is only visible to the user
   * that set the account data. The config will be available to clients through the
   * top-level `account_data` field in the homeserver response to
   * [/sync](https://spec.matrix.org/v1.18/client-server-api/#get_matrixclientv3sync).
   *
   * @example
   * ```ts
   * const accountData =
   *   await client.matrix.users.accountData.update(
   *     'org.example.custom.config',
   *     {
   *       userId: '@alice:example.com',
   *       body: {
   *         custom_account_data_key: 'custom_config_value',
   *       },
   *     },
   *   );
   * ```
   */
  update(type: string, params: AccountDataUpdateParams, options?: RequestOptions): APIPromise<unknown> {
    const { userId, body } = params;
    return this._client.put(path`/_matrix/client/v3/user/${userId}/account_data/${type}`, {
      body: body,
      ...options,
    });
  }
}
export class AccountData extends BaseAccountData {}

export type AccountDataRetrieveResponse = unknown;

export type AccountDataUpdateResponse = unknown;

export interface AccountDataRetrieveParams {
  /**
   * The ID of the user to get account data for. The access token must be authorized
   * to make requests for this user ID.
   */
  userId: string;
}

export interface AccountDataUpdateParams {
  /**
   * Path param: The ID of the user to set account data for. The access token must be
   * authorized to make requests for this user ID.
   */
  userId: string;

  /**
   * Body param
   */
  body: unknown;
}

export declare namespace AccountData {
  export {
    type AccountDataRetrieveResponse as AccountDataRetrieveResponse,
    type AccountDataUpdateResponse as AccountDataUpdateResponse,
    type AccountDataRetrieveParams as AccountDataRetrieveParams,
    type AccountDataUpdateParams as AccountDataUpdateParams,
  };
}
