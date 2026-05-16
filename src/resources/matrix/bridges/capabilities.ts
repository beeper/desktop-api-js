// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * Matrix-compatible APIs for accounts and connected network bridges.
 */
export class BaseCapabilities extends APIResource {
  static override readonly _key: readonly ['matrix', 'bridges', 'capabilities'] = Object.freeze([
    'matrix',
    'bridges',
    'capabilities',
  ] as const);

  /**
   * Get bridge capabilities
   *
   * @example
   * ```ts
   * const capability =
   *   await client.matrix.bridges.capabilities.retrieve(
   *     'bridgeID',
   *   );
   * ```
   */
  retrieve(bridgeID: string, options?: RequestOptions): APIPromise<CapabilityRetrieveResponse> {
    return this._client.get(
      path`/_matrix/client/unstable/com.beeper.bridge/${bridgeID}/_matrix/provision/v3/capabilities`,
      options,
    );
  }
}
/**
 * Matrix-compatible APIs for accounts and connected network bridges.
 */
export class Capabilities extends BaseCapabilities {}

export type CapabilityRetrieveResponse = { [key: string]: unknown };

export declare namespace Capabilities {
  export { type CapabilityRetrieveResponse as CapabilityRetrieveResponse };
}
