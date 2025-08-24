// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as FocusAppAPI from './focus-app';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class DraftMessage extends APIResource {
  /**
   * Draft a message in a specific chat. This will be placed in the message input
   * field without sending
   *
   * @example
   * ```ts
   * const baseResponse = await client.draftMessage.create({
   *   chatID:
   *     '!-5hI_iHR5vSDCtI8PzSDQT0H_3I:ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc.local-whatsapp.localhost',
   * });
   * ```
   */
  create(body: DraftMessageCreateParams, options?: RequestOptions): APIPromise<FocusAppAPI.BaseResponse> {
    return this._client.post('/v0/draft-message', { body, ...options });
  }
}

export interface DraftMessageCreateParams {
  /**
   * Provide the unique identifier of the chat where you want to draft a message
   */
  chatID: string;

  /**
   * Set to true to bring Beeper application to the foreground, or false to draft
   * silently in background
   */
  focusApp?: boolean;

  /**
   * Provide the text content you want to draft. This will be placed in the message
   * input field without sending
   */
  text?: string;
}

export declare namespace DraftMessage {
  export { type DraftMessageCreateParams as DraftMessageCreateParams };
}
