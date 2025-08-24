// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class FocusApp extends APIResource {
  /**
   * Bring Beeper Desktop to the foreground on this device. Optionally focuses a
   * specific chat if chatID is provided.
   *
   * - When to use: open Beeper, or jump to a specific chat.
   * - Constraints: requires Beeper Desktop running locally; no-op in headless
   *   environments.
   * - Idempotent: safe to call repeatedly. Returns an error if chatID is not found.
   *   Returns: success.
   *
   * @example
   * ```ts
   * const baseResponse = await client.focusApp.open();
   * ```
   */
  open(body: FocusAppOpenParams | null | undefined = {}, options?: RequestOptions): APIPromise<BaseResponse> {
    return this._client.post('/v0/focus-app', { body, ...options });
  }
}

export interface BaseResponse {
  success: boolean;

  error?: string;
}

export interface FocusAppOpenParams {
  /**
   * Optional Beeper chat ID to focus after bringing the app to foreground. If
   * omitted, only foregrounds the app. Required if messageSortKey is present. No-op
   * in headless environments.
   */
  chatID?: string;

  /**
   * Optional message sort key. Jumps to that message in the chat when foregrounding.
   */
  messageSortKey?: string;
}

export declare namespace FocusApp {
  export { type BaseResponse as BaseResponse, type FocusAppOpenParams as FocusAppOpenParams };
}
