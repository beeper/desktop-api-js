// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { MessagesCursorSearch } from './shared';
import { APIPromise } from '../core/api-promise';
import { CursorSearch, type CursorSearchParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';

/**
 * Messages operations
 */
export class Messages extends APIResource {
  /**
   * List all messages in a chat with cursor-based pagination. Sorted by timestamp.
   *
   * @example
   * ```ts
   * const messages = await client.messages.list({
   *   chatID: '!NCdzlIaMjZUmvmvyHU:beeper.com',
   * });
   * ```
   */
  list(query: MessageListParams, options?: RequestOptions): APIPromise<MessageListResponse> {
    return this._client.get('/v1/messages', { query, ...options });
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
   * Returns the sent message ID.
   *
   * @example
   * ```ts
   * const response = await client.messages.send();
   * ```
   */
  send(
    body: MessageSendParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MessageSendResponse> {
    return this._client.post('/v1/messages', { body, ...options });
  }
}

export interface MessageListResponse {
  /**
   * True if additional results can be fetched.
   */
  hasMore: boolean;

  /**
   * Messages from the chat, sorted by timestamp. Use message.sortKey as cursor for
   * pagination.
   */
  items: Array<Shared.Message>;
}

export interface MessageSendResponse extends Shared.BaseResponse {
  /**
   * Unique identifier of the chat.
   */
  chatID: string;

  /**
   * Pending message ID
   */
  pendingMessageID: string;
}

export interface MessageListParams {
  /**
   * Chat ID to list messages from
   */
  chatID: string;

  /**
   * Message cursor for pagination. Use with direction to navigate results.
   */
  cursor?: string;

  /**
   * Pagination direction used with 'cursor': 'before' fetches older messages,
   * 'after' fetches newer messages. Defaults to 'before' when only 'cursor' is
   * provided.
   */
  direction?: 'after' | 'before';
}

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
   * Literal word search (NOT semantic). Finds messages containing these EXACT words
   * in any order. Use single words users actually type, not concepts or phrases.
   * Example: use "dinner" not "dinner plans", use "sick" not "health issues". If
   * omitted, returns results filtered only by other parameters.
   */
  query?: string;

  /**
   * Filter by sender: 'me' (messages sent by the authenticated user), 'others'
   * (messages sent by others), or a specific user ID string (user.id).
   */
  sender?: 'me' | 'others' | (string & {});
}

export interface MessageSendParams {
  /**
   * Unique identifier of the chat.
   */
  chatID?: string;

  /**
   * Provide a message ID to send this as a reply to an existing message
   */
  replyToMessageID?: string;

  /**
   * Text content of the message you want to send. You may use markdown.
   */
  text?: string;
}

export declare namespace Messages {
  export {
    type MessageListResponse as MessageListResponse,
    type MessageSendResponse as MessageSendResponse,
    type MessageListParams as MessageListParams,
    type MessageSearchParams as MessageSearchParams,
    type MessageSendParams as MessageSendParams,
  };
}

export { type MessagesCursorSearch };
