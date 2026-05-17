// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as BridgesAPI from './bridges';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Bridge-backed account types, bridge connections, login sessions, and bridgev2 capabilities.
 */
export class BaseConnections extends APIResource {
  static override readonly _key: readonly ['bridges', 'connections'] = Object.freeze([
    'bridges',
    'connections',
  ] as const);

  /**
   * Get one durable bridge connection identity.
   */
  retrieve(
    loginID: string,
    params: ConnectionRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<BridgesAPI.BridgeConnection> {
    const { bridgeID } = params;
    return this._client.get(path`/v1/bridges/${bridgeID}/connections/${loginID}`, options);
  }

  /**
   * List durable bridge connection identities for a bridge.
   */
  list(bridgeID: string, options?: RequestOptions): APIPromise<ConnectionListResponse> {
    return this._client.get(path`/v1/bridges/${bridgeID}/connections`, options);
  }

  /**
   * Remove a bridge connection from this device or from all devices.
   */
  remove(
    loginID: string,
    params: ConnectionRemoveParams,
    options?: RequestOptions,
  ): APIPromise<ConnectionRemoveResponse> {
    const { bridgeID, ...body } = params;
    return this._client.post(path`/v1/bridges/${bridgeID}/connections/${loginID}/remove`, {
      body,
      ...options,
    });
  }
}
/**
 * Bridge-backed account types, bridge connections, login sessions, and bridgev2 capabilities.
 */
export class Connections extends BaseConnections {}

export interface ConnectionListResponse {
  items: Array<BridgesAPI.BridgeConnection>;
}

export interface ConnectionRemoveResponse {
  bridgeID: string;

  loginID: string;

  /**
   * Where this bridge connection should be removed.
   */
  scope: 'current-device' | 'all-devices';

  status: 'removed';

  affectedAccountIDs?: Array<string>;
}

export interface ConnectionRetrieveParams {
  /**
   * Bridge ID.
   */
  bridgeID: string;
}

export interface ConnectionRemoveParams {
  /**
   * Path param: Bridge ID.
   */
  bridgeID: string;

  /**
   * Body param: Where this bridge connection should be removed.
   */
  scope: 'current-device' | 'all-devices';
}

export declare namespace Connections {
  export {
    type ConnectionListResponse as ConnectionListResponse,
    type ConnectionRemoveResponse as ConnectionRemoveResponse,
    type ConnectionRetrieveParams as ConnectionRetrieveParams,
    type ConnectionRemoveParams as ConnectionRemoveParams,
  };
}
