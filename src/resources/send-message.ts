// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as FocusAppAPI from './focus-app';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class SendMessage extends APIResource {
  /**
   * Send a text message to a specific chat. Supports replying to existing messages.
   * Returns the sent message ID and a deeplink to the chat
   *
   * @example
   * ```ts
   * const response = await client.sendMessage.send({
   *   chatID:
   *     '!-5hI_iHR5vSDCtI8PzSDQT0H_3I:ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc.local-whatsapp.localhost',
   * });
   * ```
   */
  send(body: SendMessageSendParams, options?: RequestOptions): APIPromise<SendMessageSendResponse> {
    return this._client.post('/v0/send-message', { body, ...options });
  }
}

export interface SendMessageSendResponse extends FocusAppAPI.BaseResponse {
  /**
   * Link to the chat where the message was sent. This should always be shown to the
   * user.
   */
  deeplink: string;

  /**
   * Stable message ID.
   */
  messageID: string;
}

export interface SendMessageSendParams {
  /**
   * The identifier of the chat where the message will send
   */
  chatID: string;

  /**
   * Provide a message ID to send this as a reply to an existing message
   */
  replyToMessageID?: string;

  /**
   * Text content of the message you want to send. You may use markdown.
   */
  text?: string;
}

export declare namespace SendMessage {
  export {
    type SendMessageSendResponse as SendMessageSendResponse,
    type SendMessageSendParams as SendMessageSendParams,
  };
}
