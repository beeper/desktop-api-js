// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as FocusAppAPI from './focus-app';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class ClearChatReminder extends APIResource {
  /**
   * Clear an existing reminder from a chat
   *
   * @example
   * ```ts
   * const baseResponse = await client.clearChatReminder.clear({
   *   chatID:
   *     '!-5hI_iHR5vSDCtI8PzSDQT0H_3I:ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc.local-whatsapp.localhost',
   * });
   * ```
   */
  clear(body: ClearChatReminderClearParams, options?: RequestOptions): APIPromise<FocusAppAPI.BaseResponse> {
    return this._client.post('/v0/clear-chat-reminder', { body, ...options });
  }
}

export interface ClearChatReminderClearParams {
  /**
   * The identifier of the chat to clear reminder from
   */
  chatID: string;
}

export declare namespace ClearChatReminder {
  export { type ClearChatReminderClearParams as ClearChatReminderClearParams };
}
