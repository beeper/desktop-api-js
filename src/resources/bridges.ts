// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as AccountsAPI from './accounts/accounts';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * Manage bridge-backed account types and account availability
 */
export class BaseBridges extends APIResource {
  static override readonly _key: readonly ['bridges'] = Object.freeze(['bridges'] as const);

  /**
   * List bridge-backed account types that can be shown in add-account flows, grouped
   * with connected accounts that use the same Account schema as GET /v1/accounts.
   */
  list(options?: RequestOptions): APIPromise<BridgeListResponse> {
    return this._client.get('/v1/bridges', options);
  }
}
/**
 * Manage bridge-backed account types and account availability
 */
export class Bridges extends BaseBridges {}

/**
 * Bridge-backed account type that can be shown in add-account flows.
 */
export interface BridgeAvailability {
  /**
   * Connected accounts for this bridge. Uses the same Account schema as GET
   * /v1/accounts.
   */
  accounts: Array<AccountsAPI.Account>;

  /**
   * Number of active accounts for this network on this device.
   */
  activeAccountCount: number;

  /**
   * Bridge metadata for the account. Available in Beeper Desktop v4.2.785+.
   */
  bridge: BridgeAvailability.Bridge;

  /**
   * Human-friendly account type name shown in Beeper Desktop.
   */
  displayName: string;

  /**
   * Login mode used by Beeper Desktop for this bridge.
   */
  loginMode: string;

  /**
   * Whether this bridge can currently be used to add an account.
   */
  status: 'available' | 'connected' | 'limit_reached' | 'temporarily_unavailable';

  /**
   * Network grouping used for account counts and limits.
   */
  network?: string;

  /**
   * Human-friendly status text matching Beeper Desktop account management language.
   */
  statusText?: string;
}

export namespace BridgeAvailability {
  /**
   * Bridge metadata for the account. Available in Beeper Desktop v4.2.785+.
   */
  export interface Bridge {
    /**
     * Bridge instance identifier. Matrix and cloud bridges often use the bridge type
     * (for example matrix or discordgo); local bridges use a local bridge ID (for
     * example local-whatsapp). Available in Beeper Desktop v4.2.785+.
     */
    id: string;

    /**
     * Bridge provider for the account. Available in Beeper Desktop v4.2.785+.
     */
    provider: 'cloud' | 'self-hosted' | 'local' | 'platform-sdk';

    /**
     * Bridge type, such as matrix, discordgo, slackgo, whatsapp, telegram, or twitter.
     * Available in Beeper Desktop v4.2.785+.
     */
    type: string;
  }
}

/**
 * Bridge-backed account types and their connected accounts.
 */
export interface BridgeListResponse {
  items: Array<BridgeAvailability>;
}

export declare namespace Bridges {
  export { type BridgeAvailability as BridgeAvailability, type BridgeListResponse as BridgeListResponse };
}
