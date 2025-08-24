// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class GetLinkToChat extends APIResource {
  /**
   * Generate a deep link to a specific chat or message. This link can be used to
   * open the chat directly in the Beeper app.
   *
   * @example
   * ```ts
   * const getLinkToChat = await client.getLinkToChat.create({
   *   chatID:
   *     '!-5hI_iHR5vSDCtI8PzSDQT0H_3I:ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc.local-whatsapp.localhost',
   * });
   * ```
   */
  create(body: GetLinkToChatCreateParams, options?: RequestOptions): APIPromise<GetLinkToChatCreateResponse> {
    return this._client.post('/v0/get-link-to-chat', { body, ...options });
  }
}

/**
 * URL to open a specific chat or message.
 */
export interface GetLinkToChatCreateResponse {
  /**
   * Deep link URL to the specified chat or message.
   */
  url: string;
}

export interface GetLinkToChatCreateParams {
  /**
   * The ID of the chat to link to.
   */
  chatID: string;

  /**
   * Optional message sort key. Jumps to that message in the chat.
   */
  messageSortKey?: string;
}

export declare namespace GetLinkToChat {
  export {
    type GetLinkToChatCreateResponse as GetLinkToChatCreateResponse,
    type GetLinkToChatCreateParams as GetLinkToChatCreateParams,
  };
}
