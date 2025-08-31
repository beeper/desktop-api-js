// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * Messages operations
 */
export class Messages extends APIResource {
  /**
   * Download an attachment from a message and return the local file path
   *
   * @example
   * ```ts
   * const response = await client.messages.getAttachment({
   *   chatID:
   *     '!-5hI_iHR5vSDCtI8PzSDQT0H_3I:ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc.local-whatsapp.localhost',
   *   messageID: 'messageID',
   * });
   * ```
   */
  getAttachment(
    body: MessageGetAttachmentParams,
    options?: RequestOptions,
  ): APIPromise<MessageGetAttachmentResponse> {
    return this._client.post('/v0/get-attachment', { body, ...options });
  }

  /**
   * Search messages across chats using Beeper's message index
   *
   * @example
   * ```ts
   * const response = await client.messages.search();
   * ```
   */
  search(
    query: MessageSearchParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MessageSearchResponse> {
    return this._client.get('/v0/search-messages', { query, ...options });
  }

  /**
   * Send a text message to a specific chat. Supports replying to existing messages.
   * Returns the sent message ID and a deeplink to the chat
   *
   * @example
   * ```ts
   * const response = await client.messages.send({
   *   chatID:
   *     '!-5hI_iHR5vSDCtI8PzSDQT0H_3I:ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc.local-whatsapp.localhost',
   * });
   * ```
   */
  send(body: MessageSendParams, options?: RequestOptions): APIPromise<MessageSendResponse> {
    return this._client.post('/v0/send-message', { body, ...options });
  }
}

export interface MessageGetAttachmentResponse {
  /**
   * Whether the attachment was successfully downloaded.
   */
  success: boolean;

  /**
   * Error message if the download failed.
   */
  error?: string;

  /**
   * Local file system path to the downloaded attachment.
   */
  filePath?: string;
}

export interface MessageSearchResponse {
  /**
   * Map of chatID -> chat details for chats referenced in items.
   */
  chats: { [key: string]: Shared.Chat };

  /**
   * True if additional results can be fetched using the provided cursors.
   */
  hasMore: boolean;

  /**
   * Messages matching the query and filters.
   */
  items: Array<Shared.Message>;

  /**
   * Cursor for fetching newer results (use with direction='after'). Opaque string;
   * do not inspect.
   */
  newestCursor: string | null;

  /**
   * Cursor for fetching older results (use with direction='before'). Opaque string;
   * do not inspect.
   */
  oldestCursor: string | null;
}

export interface MessageSendResponse extends Shared.BaseResponse {
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

export interface MessageGetAttachmentParams {
  /**
   * Unique identifier of the chat (supports both chatID and localChatID).
   */
  chatID: string;

  /**
   * The message ID (eventID) containing the attachment.
   */
  messageID: string;
}

export interface MessageSearchParams {
  /**
   * Limit search to specific Beeper account IDs (bridge instances).
   */
  accountIDs?: Array<string>;

  /**
   * Limit search to specific Beeper chat IDs.
   */
  chatIDs?: Array<string>;

  /**
   * Filter by chat type: 'group' for group chats, 'single' for 1:1 chats.
   */
  chatType?: 'group' | 'single';

  /**
   * Opaque pagination cursor; do not inspect. Use together with 'direction'.
   */
  cursor?: string;

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
   * Pagination direction used with 'cursor': 'before' fetches older results, 'after'
   * fetches newer results. Defaults to 'before' when only 'cursor' is provided.
   */
  direction?: 'after' | 'before';

  /**
   * Exclude messages marked Low Priority by the user. Default: true. Set to false to
   * include all.
   */
  excludeLowPriority?: boolean;

  /**
   * Include messages in chats marked as Muted by the user, which are usually less
   * important. Default: true. Set to false if the user wants a more refined search.
   */
  includeMuted?: boolean;

  /**
   * Maximum number of messages to return (1–500). Defaults to 50.
   */
  limit?: number;

  /**
   * Only return messages that contain file attachments.
   */
  onlyWithFile?: boolean;

  /**
   * Only return messages that contain image attachments.
   */
  onlyWithImage?: boolean;

  /**
   * Only return messages that contain link attachments.
   */
  onlyWithLink?: boolean;

  /**
   * Only return messages that contain any type of media attachment.
   */
  onlyWithMedia?: boolean;

  /**
   * Only return messages that contain video attachments.
   */
  onlyWithVideo?: boolean;

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

export declare namespace Messages {
  export {
    type MessageGetAttachmentResponse as MessageGetAttachmentResponse,
    type MessageSearchResponse as MessageSearchResponse,
    type MessageSendResponse as MessageSendResponse,
    type MessageGetAttachmentParams as MessageGetAttachmentParams,
    type MessageSearchParams as MessageSearchParams,
    type MessageSendParams as MessageSendParams,
  };
}
