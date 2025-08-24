// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from 'beeper/desktop-api-js/core/resource';
import * as Shared from 'beeper/desktop-api-js/resources/shared';
import { APIPromise } from 'beeper/desktop-api-js/core/api-promise';
import { RequestOptions } from 'beeper/desktop-api-js/internal/request-options';

/**
 * Control the Beeper Desktop application
 */
export class App extends APIResource {
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
   * const baseResponse = await client.app.focus();
   * ```
   */
  focus(
    body: AppFocusParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Shared.BaseResponse> {
    return this._client.post('/v0/focus-app', { body, ...options });
  }
}

/**
 * Bring Beeper Desktop to the foreground on this device and optionally jump to a
 * chat.
 */
export interface FocusRequest {
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

export interface AppFocusParams {
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

export declare namespace App {
  export { type FocusRequest as FocusRequest, type AppFocusParams as AppFocusParams };
}
