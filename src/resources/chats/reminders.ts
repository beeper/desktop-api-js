// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

/**
 * Reminders operations
 */
export class Reminders extends APIResource {
  /**
   * Set a reminder for a chat at a specific time
   *
   * @example
   * ```ts
   * const baseResponse = await client.chats.reminders.create({
   *   chatID: '!NCdzlIaMjZUmvmvyHU:beeper.com',
   *   reminder: { remindAtMs: 0 },
   * });
   * ```
   */
  create(body: ReminderCreateParams, options?: RequestOptions): APIPromise<Shared.BaseResponse> {
    return this._client.post('/v0/set-chat-reminder', { body, ...options });
  }

  /**
   * Clear an existing reminder from a chat
   *
   * @example
   * ```ts
   * const baseResponse = await client.chats.reminders.delete({
   *   chatID: '!NCdzlIaMjZUmvmvyHU:beeper.com',
   * });
   * ```
   */
  delete(body: ReminderDeleteParams, options?: RequestOptions): APIPromise<Shared.BaseResponse> {
    return this._client.post('/v0/clear-chat-reminder', { body, ...options });
  }
}

export interface ReminderCreateParams {
  /**
   * The identifier of the chat to set reminder for (accepts both chatID and local
   * chat ID)
   */
  chatID: string;

  /**
   * Reminder configuration
   */
  reminder: ReminderCreateParams.Reminder;
}

export namespace ReminderCreateParams {
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

export interface ReminderDeleteParams {
  /**
   * The identifier of the chat to clear reminder from (accepts both chatID and local
   * chat ID)
   */
  chatID: string;
}

export declare namespace Reminders {
  export {
    type ReminderCreateParams as ReminderCreateParams,
    type ReminderDeleteParams as ReminderDeleteParams,
  };
}
