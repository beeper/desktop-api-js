// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import * as AttachmentsAPI from './attachments';
import { AttachmentRetrieveParams, AttachmentRetrieveResponse, Attachments } from './attachments';
import { APIPromise } from '../../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';

/**
 * Messages operations
 */
export class Messages extends APIResource {
  attachments: AttachmentsAPI.Attachments = new AttachmentsAPI.Attachments(this._client);

  /**
   * Search messages across chats using Beeper's message index
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const messageSearchResponse of client.messages.search()) {
   *   // ...
   * }
   * ```
   */
  search(
    query: MessageSearchParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<MessageSearchResponsesCursor, MessageSearchResponse> {
    return this._client.getAPIList('/v0/search-messages', Cursor<MessageSearchResponse>, {
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

export type MessageSearchResponsesCursor = Cursor<MessageSearchResponse>;

export interface MessageSearchResponse {
  /**
   * Stable message ID for cursor pagination.
   */
  id: string;

  /**
   * Beeper account ID the message belongs to.
   */
  accountID: string;

  /**
   * Beeper chat/thread/room ID.
   */
  chatID: string;

  /**
   * Stable message ID (same as id).
   */
  messageID: string;

  /**
   * Sender user ID.
   */
  senderID: string;

  /**
   * A unique key used to sort messages
   */
  sortKey: string | number;

  /**
   * Message timestamp.
   */
  timestamp: string;

  /**
   * Attachments included with this message, if any.
   */
  attachments?: Array<Shared.Attachment>;

  /**
   * True if the authenticated user sent the message.
   */
  isSender?: boolean;

  /**
   * True if the message is unread for the authenticated user. May be omitted.
   */
  isUnread?: boolean;

  /**
   * Reactions to the message, if any.
   */
  reactions?: Array<Shared.Reaction>;

  /**
   * Resolved sender display name (impersonator/full name/username/participant name).
   */
  senderName?: string;

  /**
   * Plain-text body if present. May include a JSON fallback with text entities for
   * rich messages.
   */
  text?: string;
}

export interface MessageSendResponse extends Shared.BaseResponse {
  /**
   * Stable message ID.
   */
  messageID: string;
}

export interface MessageSearchParams extends CursorParams {
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
  excludeLowPriority?: boolean;

  /**
   * Include messages in chats marked as Muted by the user, which are usually less
   * important. Default: true. Set to false if the user wants a more refined search.
   */
  includeMuted?: boolean;

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
   * The identifier of the chat where the message will send (accepts both chatID and
   * local chat ID)
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

Messages.Attachments = Attachments;

export declare namespace Messages {
  export {
    type MessageSearchResponse as MessageSearchResponse,
    type MessageSendResponse as MessageSendResponse,
    type MessageSearchResponsesCursor as MessageSearchResponsesCursor,
    type MessageSearchParams as MessageSearchParams,
    type MessageSendParams as MessageSendParams,
  };

  export {
    Attachments as Attachments,
    type AttachmentRetrieveResponse as AttachmentRetrieveResponse,
    type AttachmentRetrieveParams as AttachmentRetrieveParams,
  };
}
