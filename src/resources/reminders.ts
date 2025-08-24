// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * Set and clear reminders for chats
 */
export class Reminders extends APIResource {
  /**
   * Clear an existing reminder from a chat
   *
   * @example
   * ```ts
   * const baseResponse =
   *   await client.reminders.clearChatReminder({
   *     chatID:
   *       '!-5hI_iHR5vSDCtI8PzSDQT0H_3I:ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc.local-whatsapp.localhost',
   *   });
   * ```
   */
  clearChatReminder(
    body: ReminderClearChatReminderParams,
    options?: RequestOptions,
  ): APIPromise<Shared.BaseResponse> {
    return this._client.post('/v0/clear-chat-reminder', { body, ...options });
  }

  /**
   * Set a reminder for a chat at a specific time
   *
   * @example
   * ```ts
   * const baseResponse = await client.reminders.setChatReminder(
   *   {
   *     chatID:
   *       '!-5hI_iHR5vSDCtI8PzSDQT0H_3I:ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc.local-whatsapp.localhost',
   *     reminder: { remindAtMs: 0 },
   *   },
   * );
   * ```
   */
  setChatReminder(
    body: ReminderSetChatReminderParams,
    options?: RequestOptions,
  ): APIPromise<Shared.BaseResponse> {
    return this._client.post('/v0/set-chat-reminder', { body, ...options });
  }
}

export interface ClearReminderRequest {
  /**
   * The identifier of the chat to clear reminder from
   */
  chatID: string;
}

export interface SetReminderRequest {
  /**
   * The identifier of the chat to set reminder for
   */
  chatID: string;

  /**
   * Reminder configuration
   */
  reminder: SetReminderRequest.Reminder;
}

export namespace SetReminderRequest {
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

export interface ReminderClearChatReminderParams {
  /**
   * The identifier of the chat to clear reminder from
   */
  chatID: string;
}

export interface ReminderSetChatReminderParams {
  /**
   * The identifier of the chat to set reminder for
   */
  chatID: string;

  /**
   * Reminder configuration
   */
  reminder: ReminderSetChatReminderParams.Reminder;
}

export namespace ReminderSetChatReminderParams {
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

export declare namespace Reminders {
  export {
    type ClearReminderRequest as ClearReminderRequest,
    type SetReminderRequest as SetReminderRequest,
    type ReminderClearChatReminderParams as ReminderClearChatReminderParams,
    type ReminderSetChatReminderParams as ReminderSetChatReminderParams,
  };
}
