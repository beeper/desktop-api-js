// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as ChatsAPI from './chats';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { CursorID, type CursorIDParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';

/**
 * Send, draft, and search messages across all chat networks
 */
export class Messages extends APIResource {
  /**
   * Draft a message in a specific chat. This will be placed in the message input
   * field without sending
   *
   * @example
   * ```ts
   * const baseResponse = await client.messages.draft({
   *   chatID:
   *     '!-5hI_iHR5vSDCtI8PzSDQT0H_3I:ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc.local-whatsapp.localhost',
   * });
   * ```
   */
  draft(body: MessageDraftParams, options?: RequestOptions): APIPromise<Shared.BaseResponse> {
    return this._client.post('/v0/draft-message', { body, ...options });
  }

  /**
   * Search messages across chats using Beeper's message index.
   *
   * - When to use: find messages by text and/or filters (chatIDs, accountIDs,
   *   chatType, media type filters, sender, date ranges).
   * - CRITICAL: Query is LITERAL WORD MATCHING, NOT semantic search! Only finds
   *   messages containing these EXACT words. • ✅ RIGHT: query="dinner" or
   *   query="sick" or query="error" (single words users type) • ❌ WRONG:
   *   query="dinner plans tonight" or query="health issues" (phrases/concepts) • The
   *   query matches ALL words provided (in any order). Example: query="flight
   *   booking" finds messages with both "flight" AND "booking".
   * - Media filters: Use onlyWithMedia for any media, or specific filters like
   *   onlyWithVideo, onlyWithImage, onlyWithLink, onlyWithFile for specific types.
   * - Pagination: use 'oldestCursor' + direction='before' for older;
   *   'newestCursor' + direction='after' for newer.
   * - Performance: provide chatIDs/accountIDs when known. Omitted 'query' returns
   *   results based on filters only. Partial matches enabled; 'excludeLowPriority'
   *   defaults to true.
   * - Workflow tip: To search messages in specific conversations: 1) Use find-chats
   *   to get chatIDs, 2) Use search-messages with those chatIDs.
   * - IMPORTANT: Chat names vary widely. ASK the user for clarification: • "Which
   *   chat do you mean by family?" (could be "The Smiths", "Mom Dad Kids", etc.) •
   *   "What's the name of your work chat?" (could be "Team", company name, project
   *   name) • "Who are the participants?" (use participantQuery in find-chats)
   *   Returns: matching messages and referenced chats.
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
  ): PagePromise<MessagesCursorID, Message> {
    return this._client.getAPIList('/v0/search-messages', CursorID<Message>, { query, ...options });
  }

  /**
   * Send a text message to a specific chat. Supports replying to existing messages.
   * Returns the sent message ID and a deeplink to the chat
   *
   * @example
   * ```ts
   * const sendResponse = await client.messages.send({
   *   chatID:
   *     '!-5hI_iHR5vSDCtI8PzSDQT0H_3I:ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc.local-whatsapp.localhost',
   * });
   * ```
   */
  send(body: MessageSendParams, options?: RequestOptions): APIPromise<SendResponse> {
    return this._client.post('/v0/send-message', { body, ...options });
  }
}

export type MessagesCursorID = CursorID<Message>;

export interface DraftRequest {
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

export interface Message {
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

export interface SearchRequest {
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
   * A cursor for use in pagination. ending_before is an object ID that defines your
   * place in the list. For instance, if you make a list request and receive 100
   * objects, starting with obj_bar, your subsequent call can include
   * ending_before=obj_bar in order to fetch the previous page of the list.
   */
  ending_before?: string;

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

  /**
   * A cursor for use in pagination. starting_after is an object ID that defines your
   * place in the list. For instance, if you make a list request and receive 100
   * objects, ending with obj_foo, your subsequent call can include
   * starting_after=obj_foo in order to fetch the next page of the list.
   */
  starting_after?: string;
}

export interface SearchResponse {
  /**
   * Map of chatID -> chat details for chats referenced in data.
   */
  chats: { [key: string]: ChatsAPI.Chat };

  /**
   * Messages matching the query and filters.
   */
  data: Array<Message>;

  /**
   * Whether there are more items available after this set.
   */
  has_more: boolean;
}

export interface SendRequest {
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

export interface SendResponse extends Shared.BaseResponse {
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

export interface MessageDraftParams {
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

export interface MessageSearchParams extends CursorIDParams {
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
    type DraftRequest as DraftRequest,
    type Message as Message,
    type SearchRequest as SearchRequest,
    type SearchResponse as SearchResponse,
    type SendRequest as SendRequest,
    type SendResponse as SendResponse,
    type MessagesCursorID as MessagesCursorID,
    type MessageDraftParams as MessageDraftParams,
    type MessageSearchParams as MessageSearchParams,
    type MessageSendParams as MessageSendParams,
  };
}
