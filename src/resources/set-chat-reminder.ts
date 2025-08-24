// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as FocusAppAPI from './focus-app';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class SetChatReminder extends APIResource {
  /**
   * Set a reminder for a chat at a specific time
   *
   * @example
   * ```ts
   * const baseResponse = await client.setChatReminder.create({
   *   chatID:
   *     '!-5hI_iHR5vSDCtI8PzSDQT0H_3I:ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc.local-whatsapp.localhost',
   *   reminder: { remindAtMs: 0 },
   * });
   * ```
   */
  create(body: SetChatReminderCreateParams, options?: RequestOptions): APIPromise<FocusAppAPI.BaseResponse> {
    return this._client.post('/v0/set-chat-reminder', { body, ...options });
  }
}

export interface SetChatReminderCreateParams {
  /**
   * The identifier of the chat to set reminder for
   */
  chatID: string;

  /**
   * Reminder configuration
   */
  reminder: SetChatReminderCreateParams.Reminder;
}

export namespace SetChatReminderCreateParams {
  /**
   * Reminder configuration
   */
  export interface Reminder {
    /**
     * Unix timestamp in milliseconds when reminder should trigger
     */
    remindAtMs: number;

    /**
     * Cancel reminder if someone messages in the chat
     */
    dismissOnIncomingMessage?: boolean;
  }
}

export declare namespace SetChatReminder {
  export { type SetChatReminderCreateParams as SetChatReminderCreateParams };
}
