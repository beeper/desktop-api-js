// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { MessagesCursorSearch, MessagesCursorSortKey } from './shared';
import { APIPromise } from '../core/api-promise';
import {
  CursorSearch,
  type CursorSearchParams,
  CursorSortKey,
  type CursorSortKeyParams,
  PagePromise,
} from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Manage messages in chats
 */
export class Messages extends APIResource {
  /**
   * Edit the text content of an existing message. Messages with attachments cannot
   * be edited.
   *
   * @example
   * ```ts
   * const message = await client.messages.update('messageID', {
   *   chatID: '!NCdzlIaMjZUmvmvyHU:beeper.com',
   *   text: 'x',
   * });
   * ```
   */
  update(
    messageID: string,
    params: MessageUpdateParams,
    options?: RequestOptions,
  ): APIPromise<MessageUpdateResponse> {
    const { chatID, ...body } = params;
    return this._client.put(path`/v1/chats/${chatID}/messages/${messageID}`, { body, ...options });
  }

  /**
   * List all messages in a chat with cursor-based pagination. Sorted by timestamp.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const message of client.messages.list(
   *   '!NCdzlIaMjZUmvmvyHU:beeper.com',
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    chatID: string,
    query: MessageListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<MessagesCursorSortKey, Shared.Message> {
    return this._client.getAPIList(path`/v1/chats/${chatID}/messages`, CursorSortKey<Shared.Message>, {
      query,
      ...options,
    });
  }

  /**
   * Search messages across chats using Beeper's message index
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const message of client.messages.search()) {
   *   // ...
   * }
   * ```
   */
  search(
    query: MessageSearchParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<MessagesCursorSearch, Shared.Message> {
    return this._client.getAPIList('/v1/messages/search', CursorSearch<Shared.Message>, {
      query,
      ...options,
    });
  }

  /**
   * Send a text message to a specific chat. Supports replying to existing messages.
   * Returns a pending message ID.
   *
   * @example
   * ```ts
   * const response = await client.messages.send(
   *   '!NCdzlIaMjZUmvmvyHU:beeper.com',
   * );
   * ```
   */
  send(
    chatID: string,
    body: MessageSendParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MessageSendResponse> {
    return this._client.post(path`/v1/chats/${chatID}/messages`, { body, ...options });
  }
}

export interface MessageUpdateResponse {
  /**
   * Unique identifier of the chat.
   */
  chatID: string;

  /**
   * Message ID.
   */
  messageID: string;

  /**
   * Whether the message was successfully edited
   */
  success: boolean;
}

export interface MessageSendResponse {
  /**
   * Unique identifier of the chat.
   */
  chatID: string;

  /**
   * Pending message ID
   */
  pendingMessageID: string;
}

export interface MessageUpdateParams {
  /**
   * Path param: Unique identifier of the chat.
   */
  chatID: string;

  /**
   * Body param: New text content for the message
   */
  text: string;
}

export interface MessageListParams extends CursorSortKeyParams {}

export interface MessageSearchParams extends CursorSearchParams {
  /**
   * Limit search to specific account IDs.
   */
  accountIDs?: Array<string>;

  /**
   * Limit search to specific chat IDs.
   */
  chatIDs?: Array<string>;

  /**
   * Filter by chat type: 'group' for group chats, 'single' for 1:1 chats.
   */
  chatType?: 'group' | 'single';

  /**
   * Only include messages with timestamp strictly after this ISO 8601 datetime
   * (e.g., '2024-07-01T00:00:00Z' or '2024-07-01T00:00:00+02:00').
   */
  dateAfter?: string;

  /**
   * Only include messages with timestamp strictly before this ISO 8601 datetime
   * (e.g., '2024-07-31T23:59:59Z' or '2024-07-31T23:59:59+02:00').
   */
  dateBefore?: string;

  /**
   * Exclude messages marked Low Priority by the user. Default: true. Set to false to
   * include all.
   */
  excludeLowPriority?: boolean | null;

  /**
   * Include messages in chats marked as Muted by the user, which are usually less
   * important. Default: true. Set to false if the user wants a more refined search.
   */
  includeMuted?: boolean | null;

  /**
   * Filter messages by media types. Use ['any'] for any media type, or specify exact
   * types like ['video', 'image']. Omit for no media filtering.
   */
  mediaTypes?: Array<'any' | 'video' | 'image' | 'link' | 'file'>;

  /**
   * Literal word search (non-semantic). Finds messages containing these EXACT words
   * in any order. Use single words users actually type, not concepts or phrases.
   * Example: use "dinner" not "dinner plans", use "sick" not "health issues". If
   * omitted, returns results filtered only by other parameters.
   */
  query?: string;

  /**
   * Filter by sender: 'me' (messages sent by the authenticated user), 'others'
   * (messages sent by others), or a specific user ID string (user.id).
   */
  sender?: string;
}

export interface MessageSendParams {
  /**
   * Single attachment to send with the message
   */
  attachment?: MessageSendParams.Attachment;

  /**
   * Provide a message ID to send this as a reply to an existing message
   */
  replyToMessageID?: string;

  /**
   * Text content of the message you want to send. You may use markdown.
   */
  text?: string;
}

export namespace MessageSendParams {
  /**
   * Single attachment to send with the message
   */
  export interface Attachment {
    /**
     * Upload ID from uploadAsset endpoint. Required to reference uploaded files.
     */
    uploadID: string;

    /**
     * Duration in seconds (optional override of cached value)
     */
    duration?: number;

    /**
     * Filename (optional override of cached value)
     */
    fileName?: string;

    /**
     * MIME type (optional override of cached value)
     */
    mimeType?: string;

    /**
     * Dimensions (optional override of cached value)
     */
    size?: Attachment.Size;

    /**
     * Special attachment type (gif, voiceNote, sticker). If omitted, auto-detected
     * from mimeType
     */
    type?: 'gif' | 'voiceNote' | 'sticker';
  }

  export namespace Attachment {
    /**
     * Dimensions (optional override of cached value)
     */
    export interface Size {
      height: number;

      width: number;
    }
  }
}

export declare namespace Messages {
  export {
    type MessageUpdateResponse as MessageUpdateResponse,
    type MessageSendResponse as MessageSendResponse,
    type MessageUpdateParams as MessageUpdateParams,
    type MessageListParams as MessageListParams,
    type MessageSearchParams as MessageSearchParams,
    type MessageSendParams as MessageSendParams,
  };
}

export { type MessagesCursorSortKey, type MessagesCursorSearch };
