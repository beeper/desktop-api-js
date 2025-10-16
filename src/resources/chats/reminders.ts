// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Manage reminders for chats
 */
export class Reminders extends APIResource {
  /**
   * Set a reminder for a chat at a specific time
   *
   * @example
   * ```ts
   * await client.chats.reminders.create(
   *   '!NCdzlIaMjZUmvmvyHU:beeper.com',
   *   { reminder: { remindAtMs: 0 } },
   * );
   * ```
   */
  create(chatID: string, body: ReminderCreateParams, options?: RequestOptions): APIPromise<void> {
    return this._client.post(path`/v1/chats/${chatID}/reminders`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Clear an existing reminder from a chat
   *
   * @example
   * ```ts
   * await client.chats.reminders.delete(
   *   '!NCdzlIaMjZUmvmvyHU:beeper.com',
   * );
   * ```
   */
  delete(chatID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/chats/${chatID}/reminders`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface ReminderCreateParams {
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

export declare namespace Reminders {
  export { type ReminderCreateParams as ReminderCreateParams };
}
