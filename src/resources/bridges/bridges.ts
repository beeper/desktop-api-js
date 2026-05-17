// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as BridgesAPI from './bridges';
import * as Shared from '../shared';
import * as AccountsAPI from '../accounts/accounts';
import * as ConnectionsAPI from './connections';
import {
  BaseConnections,
  ConnectionListResponse,
  ConnectionRemoveParams,
  ConnectionRemoveResponse,
  ConnectionRetrieveParams,
  Connections,
} from './connections';
import * as LoginFlowsAPI from './login-flows';
import { BaseLoginFlows, LoginFlowListResponse, LoginFlows } from './login-flows';
import * as LoginSessionsAPI from './login-sessions/login-sessions';
import {
  BaseLoginSessions,
  LoginSessionCancelParams,
  LoginSessionCancelResponse,
  LoginSessionCreateParams,
  LoginSessionRetrieveParams,
  LoginSessions,
} from './login-sessions/login-sessions';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Manage bridge-backed account types, connections, and login sessions
 */
export class BaseBridges extends APIResource {
  static override readonly _key: readonly ['bridges'] = Object.freeze(['bridges'] as const);

  /**
   * Get one bridge-backed account type and the connected accounts that use it.
   */
  retrieve(bridgeID: string, options?: RequestOptions): APIPromise<BridgeRetrieveResponse> {
    return this._client.get(path`/v1/bridges/${bridgeID}`, options);
  }

  /**
   * List bridge-backed account types that can be shown in add-account flows, grouped
   * with connected accounts that use the same Account schema as GET /v1/accounts.
   */
  list(options?: RequestOptions): APIPromise<BridgeListResponse> {
    return this._client.get('/v1/bridges', options);
  }

  /**
   * Get bridgev2 provisioning capabilities for a bridge.
   */
  retrieveCapabilities(bridgeID: string, options?: RequestOptions): APIPromise<ProvisioningCapabilities> {
    return this._client.get(path`/v1/bridges/${bridgeID}/capabilities`, options);
  }
}
/**
 * Manage bridge-backed account types, connections, and login sessions
 */
export class Bridges extends BaseBridges {
  loginFlows: LoginFlowsAPI.LoginFlows = new LoginFlowsAPI.LoginFlows(this._client);
  connections: ConnectionsAPI.Connections = new ConnectionsAPI.Connections(this._client);
  loginSessions: LoginSessionsAPI.LoginSessions = new LoginSessionsAPI.LoginSessions(this._client);
}

/**
 * Bridge-backed account type that can be shown in add-account flows.
 */
export interface Bridge {
  /**
   * Bridge instance identifier. Use with bridge login-flow endpoints.
   */
  id: string;

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
   * Human-friendly account type name shown in Beeper Desktop.
   */
  displayName: string;

  /**
   * Bridge provider.
   */
  provider: 'cloud' | 'self-hosted' | 'local' | 'platform-sdk';

  /**
   * Whether this bridge can currently be used to add an account.
   */
  status: 'available' | 'connected' | 'limit_reached' | 'temporarily_unavailable' | 'disabled';

  /**
   * Whether this bridge can have multiple active accounts for the same network.
   */
  supportsMultipleAccounts: boolean;

  /**
   * Bridge type, such as matrix, discordgo, slackgo, whatsapp, telegram, or twitter.
   */
  type: string;

  /**
   * Network grouping used for account counts and limits.
   */
  network?: string;

  /**
   * Human-friendly status text matching Beeper Desktop account management language.
   */
  statusText?: string;
}

/**
 * Durable bridge connection identity. This is not guaranteed to be one-to-one with
 * a Desktop API account.
 */
export interface BridgeConnection {
  bridgeID: string;

  loginID: string;

  removeScopes: Array<'current-device' | 'all-devices'>;

  status: 'connected' | 'connecting' | 'needs_login' | 'logged_out' | 'unknown';

  accountIDs?: Array<string>;

  statusText?: string;

  /**
   * User the account belongs to.
   */
  user?: Shared.User;
}

export interface CookieField {
  id: string;

  name?: string;

  type?: 'cookie' | 'header' | 'local_storage';
}

/**
 * bridgev2 disappearing timer capability.
 */
export interface DisappearingTimerCapability {
  types: Array<'' | 'after_read' | 'after_send'>;

  omit_empty_timer?: true;

  timers?: Array<number>;
}

/**
 * bridgev2 group field capability.
 */
export interface GroupFieldCapability {
  allowed: boolean;

  max_length?: number;

  min_length?: number;

  required?: boolean;

  /**
   * bridgev2 disappearing timer capability.
   */
  settings?: DisappearingTimerCapability;
}

/**
 * bridgev2 group type capabilities.
 */
export interface GroupTypeCapabilities {
  type_description: string;

  /**
   * bridgev2 group field capability.
   */
  avatar?: GroupFieldCapability;

  /**
   * bridgev2 group field capability.
   */
  disappear?: GroupFieldCapability;

  /**
   * bridgev2 group field capability.
   */
  name?: GroupFieldCapability;

  /**
   * bridgev2 group field capability.
   */
  parent?: GroupFieldCapability;

  /**
   * bridgev2 group field capability.
   */
  participants?: GroupFieldCapability;

  /**
   * bridgev2 group field capability.
   */
  topic?: GroupFieldCapability;

  /**
   * bridgev2 group field capability.
   */
  username?: GroupFieldCapability;
}

/**
 * Bridge login flow.
 */
export interface LoginFlow {
  id: string;

  description?: string;

  name?: string;
}

export interface LoginInputField {
  id: string;

  initialValue?: string;

  label?: string;

  optional?: boolean;

  placeholder?: string;

  type?: string;
}

export interface LoginSession {
  bridgeID: string;

  loginSessionID: string;

  status:
    | 'waiting_for_input'
    | 'waiting_for_cookies'
    | 'waiting_for_display'
    | 'complete'
    | 'cancelled'
    | 'failed';

  /**
   * A chat account added to Beeper.
   */
  account?: AccountsAPI.Account;

  accountID?: string;

  /**
   * Durable bridge connection identity. This is not guaranteed to be one-to-one with
   * a Desktop API account.
   */
  connection?: BridgeConnection;

  currentStep?:
    | LoginSession.UserInput
    | LoginSession.Cookies
    | LoginSession.DisplayAndWait
    | LoginSession.Complete;

  error?: Shared.APIError;

  loginID?: string;
}

export namespace LoginSession {
  export interface UserInput {
    fields: Array<BridgesAPI.LoginInputField>;

    stepID: string;

    type: 'user_input';

    attachments?: Array<unknown>;

    instructions?: string;
  }

  export interface Cookies {
    fields: Array<BridgesAPI.CookieField>;

    stepID: string;

    type: 'cookies';

    url: string;

    expectedFinalURLRegex?: string;

    extractJS?: string;

    instructions?: string;

    userAgent?: string;
  }

  export interface DisplayAndWait {
    display: DisplayAndWait.Qr | DisplayAndWait.Emoji | DisplayAndWait.Nothing;

    stepID: string;

    type: 'display_and_wait';

    instructions?: string;
  }

  export namespace DisplayAndWait {
    export interface Qr {
      data: string;

      type: 'qr';
    }

    export interface Emoji {
      imageURL: string;

      type: 'emoji';
    }

    export interface Nothing {
      type: 'nothing';
    }
  }

  export interface Complete {
    type: 'complete';

    /**
     * A chat account added to Beeper.
     */
    account?: AccountsAPI.Account;

    /**
     * Durable bridge connection identity. This is not guaranteed to be one-to-one with
     * a Desktop API account.
     */
    connection?: BridgesAPI.BridgeConnection;

    instructions?: string;

    stepID?: string;
  }
}

/**
 * bridgev2 provisioning capabilities.
 */
export interface ProvisioningCapabilities {
  group_creation: { [key: string]: GroupTypeCapabilities };

  /**
   * bridgev2 resolve_identifier capabilities.
   */
  resolve_identifier: ResolveIdentifierCapabilities;

  image_pack_import?: boolean;
}

/**
 * bridgev2 resolve_identifier capabilities.
 */
export interface ResolveIdentifierCapabilities {
  any_phone: boolean;

  contact_list: boolean;

  create_dm: boolean;

  lookup_email: boolean;

  lookup_phone: boolean;

  lookup_username: boolean;

  search: boolean;
}

/**
 * Bridge-backed account type that can be shown in add-account flows.
 */
export interface BridgeRetrieveResponse {
  /**
   * Bridge instance identifier. Use with bridge login-flow endpoints.
   */
  id: string;

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
   * Human-friendly account type name shown in Beeper Desktop.
   */
  displayName: string;

  /**
   * Bridge provider.
   */
  provider: 'cloud' | 'self-hosted' | 'local' | 'platform-sdk';

  /**
   * Whether this bridge can currently be used to add an account.
   */
  status: 'available' | 'connected' | 'limit_reached' | 'temporarily_unavailable' | 'disabled';

  /**
   * Whether this bridge can have multiple active accounts for the same network.
   */
  supportsMultipleAccounts: boolean;

  /**
   * Bridge type, such as matrix, discordgo, slackgo, whatsapp, telegram, or twitter.
   */
  type: string;

  /**
   * Network grouping used for account counts and limits.
   */
  network?: string;

  /**
   * Human-friendly status text matching Beeper Desktop account management language.
   */
  statusText?: string;
}

/**
 * Bridge-backed account types and their connected accounts.
 */
export interface BridgeListResponse {
  items: Array<Bridge>;
}

Bridges.LoginFlows = LoginFlows;
Bridges.BaseLoginFlows = BaseLoginFlows;
Bridges.Connections = Connections;
Bridges.BaseConnections = BaseConnections;
Bridges.LoginSessions = LoginSessions;
Bridges.BaseLoginSessions = BaseLoginSessions;

export declare namespace Bridges {
  export {
    type Bridge as Bridge,
    type BridgeConnection as BridgeConnection,
    type CookieField as CookieField,
    type DisappearingTimerCapability as DisappearingTimerCapability,
    type GroupFieldCapability as GroupFieldCapability,
    type GroupTypeCapabilities as GroupTypeCapabilities,
    type LoginFlow as LoginFlow,
    type LoginInputField as LoginInputField,
    type LoginSession as LoginSession,
    type ProvisioningCapabilities as ProvisioningCapabilities,
    type ResolveIdentifierCapabilities as ResolveIdentifierCapabilities,
    type BridgeRetrieveResponse as BridgeRetrieveResponse,
    type BridgeListResponse as BridgeListResponse,
  };

  export {
    LoginFlows as LoginFlows,
    BaseLoginFlows as BaseLoginFlows,
    type LoginFlowListResponse as LoginFlowListResponse,
  };

  export {
    Connections as Connections,
    BaseConnections as BaseConnections,
    type ConnectionListResponse as ConnectionListResponse,
    type ConnectionRemoveResponse as ConnectionRemoveResponse,
    type ConnectionRetrieveParams as ConnectionRetrieveParams,
    type ConnectionRemoveParams as ConnectionRemoveParams,
  };

  export {
    LoginSessions as LoginSessions,
    BaseLoginSessions as BaseLoginSessions,
    type LoginSessionCancelResponse as LoginSessionCancelResponse,
    type LoginSessionCreateParams as LoginSessionCreateParams,
    type LoginSessionRetrieveParams as LoginSessionRetrieveParams,
    type LoginSessionCancelParams as LoginSessionCancelParams,
  };
}
