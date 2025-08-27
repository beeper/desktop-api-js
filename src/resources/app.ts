// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * App operations
 */
export class App extends APIResource {
  /**
   * Open Beeper Desktop and optionally navigate to a specific chat, message, or
   * pre-fill draft text
   *
   * @example
   * ```ts
   * const response = await client.app.focus();
   * ```
   */
  focus(
    body: AppFocusParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<AppFocusResponse> {
    return this._client.post('/v0/open-app', { body, ...options });
  }
}

/**
 * Response indicating successful app opening.
 */
export interface AppFocusResponse {
  /**
   * Whether the app was successfully opened/focused.
   */
  success: boolean;
}

export interface AppFocusParams {
  /**
   * Optional Beeper chat ID to focus after opening the app. If omitted, only
   * opens/focuses the app.
   */
  chatID?: string;

  /**
   * Optional draft text to populate in the message input field.
   */
  draftText?: string;

  /**
   * Optional message sort key. Jumps to that message in the chat when opening.
   */
  messageSortKey?: string;
}

export declare namespace App {
  export { type AppFocusResponse as AppFocusResponse, type AppFocusParams as AppFocusParams };
}
