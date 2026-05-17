// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as BridgesAPI from '../bridges';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * Bridge-backed account types, bridge connections, login sessions, and bridgev2 capabilities.
 */
export class BaseSteps extends APIResource {
  static override readonly _key: readonly ['bridges', 'loginSessions', 'steps'] = Object.freeze([
    'bridges',
    'loginSessions',
    'steps',
  ] as const);

  /**
   * Submit input for the current step of a bridge login session.
   */
  submit(
    stepID: string,
    params: StepSubmitParams,
    options?: RequestOptions,
  ): APIPromise<BridgesAPI.LoginSession> {
    const { bridgeID, loginSessionID, ...body } = params;
    return this._client.post(path`/v1/bridges/${bridgeID}/login-sessions/${loginSessionID}/steps/${stepID}`, {
      body,
      ...options,
    });
  }
}
/**
 * Bridge-backed account types, bridge connections, login sessions, and bridgev2 capabilities.
 */
export class Steps extends BaseSteps {}

export interface StepSubmitParams {
  /**
   * Path param: Bridge ID.
   */
  bridgeID: string;

  /**
   * Path param: Temporary bridge login session ID.
   */
  loginSessionID: string;

  /**
   * Body param
   */
  type: 'user_input' | 'cookies' | 'display_and_wait';

  /**
   * Body param
   */
  fields?: { [key: string]: string };

  /**
   * Body param
   */
  lastURL?: string;

  /**
   * Body param
   */
  source?: 'api' | 'webview' | 'browser_extension';
}

export declare namespace Steps {
  export { type StepSubmitParams as StepSubmitParams };
}
