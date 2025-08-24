// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from 'beeper/desktop-api-js/core/resource';
import * as Shared from 'beeper/desktop-api-js/resources/shared';
import { APIPromise } from 'beeper/desktop-api-js/core/api-promise';
import { CursorID, type CursorIDParams, PagePromise } from 'beeper/desktop-api-js/core/pagination';
import { RequestOptions } from 'beeper/desktop-api-js/internal/request-options';

/**
 * Manage chats, conversations, and threads
 */
export class Chats extends APIResource {
  /**
   * Retrieve chat details: metadata, participants (limited), and latest message.
   *
   * - When to use: fetch a complete view of a chat beyond what search returns.
   * - Constraints: not available for iMessage chats ('imsg##'). Participants limited
   *   by 'maxParticipantCount' (default 20, max 500). Returns: chat details.Agents:
   *   ALWAYS use linkToChat to make clickable links in your response
   *
   * @example
   * ```ts
   * const getChatResponse = await client.chats.retrieve({
   *   chatID:
   *     '!-5hI_iHR5vSDCtI8PzSDQT0H_3I:ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc.local-whatsapp.localhost',
   * });
   * ```
   */
  retrieve(query: ChatRetrieveParams, options?: RequestOptions): APIPromise<GetChatResponse | null> {
    return this._client.get('/v0/get-chat', { query, ...options });
  }

  /**
   * Archive or unarchive a chat. Set archived=true to move to archive,
   * archived=false to move back to inbox
   *
   * @example
   * ```ts
   * const baseResponse = await client.chats.archive({
   *   chatID:
   *     '!-5hI_iHR5vSDCtI8PzSDQT0H_3I:ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc.local-whatsapp.localhost',
   * });
   * ```
   */
  archive(body: ChatArchiveParams, options?: RequestOptions): APIPromise<Shared.BaseResponse> {
    return this._client.post('/v0/archive-chat', { body, ...options });
  }

  /**
   * Search and filter conversations across all messaging accounts.
   *
   * - When to use: browse chats by inbox (primary/low-priority/archive), type,
   *   unread status, or search terms.
   * - Pagination: use cursor + direction for pagination.
   * - Performance: provide accountIDs when known for faster filtering. Returns:
   *   matching chats with pagination. Agents: ALWAYS use linkToChat to make
   *   clickable links in your response
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const chat of client.chats.find()) {
   *   // ...
   * }
   * ```
   */
  find(
    query: ChatFindParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ChatsCursorID, Chat> {
    return this._client.getAPIList('/v0/find-chats', CursorID<Chat>, { query, ...options });
  }

  /**
   * Generate a deep link to a specific chat or message. This link can be used to
   * open the chat directly in the Beeper app.
   *
   * @example
   * ```ts
   * const linkResponse = await client.chats.getLink({
   *   chatID:
   *     '!-5hI_iHR5vSDCtI8PzSDQT0H_3I:ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc.local-whatsapp.localhost',
   * });
   * ```
   */
  getLink(body: ChatGetLinkParams, options?: RequestOptions): APIPromise<LinkResponse> {
    return this._client.post('/v0/get-link-to-chat', { body, ...options });
  }
}

export type ChatsCursorID = CursorID<Chat>;

export interface ArchiveRequest {
  /**
   * The identifier of the chat to archive or unarchive
   */
  chatID: string;

  /**
   * True to archive, false to unarchive
   */
  archived?: boolean;
}

export interface Chat {
  /**
   * Unique identifier for cursor pagination.
   */
  id: string;

  /**
   * Beeper account ID this chat belongs to.
   */
  accountID: string;

  /**
   * Unique identifier of the chat (room/thread ID, same as id).
   */
  chatID: string;

  /**
   * Display-only human-readable network name (e.g., 'WhatsApp', 'Messenger'). You
   * MUST use 'accountID' to perform actions.
   */
  network: string;

  /**
   * Chat participants information.
   */
  participants: Chat.Participants;

  /**
   * Display title of the chat as computed by the client/server.
   */
  title: string;

  /**
   * Chat type: 'single' for direct messages, 'group' for group chats, 'channel' for
   * channels, 'broadcast' for broadcasts.
   */
  type: 'single' | 'group' | 'channel' | 'broadcast';

  /**
   * Number of unread messages.
   */
  unreadCount: number;

  /**
   * True if chat is archived.
   */
  isArchived?: boolean;

  /**
   * True if chat notifications are muted.
   */
  isMuted?: boolean;

  /**
   * True if chat is pinned.
   */
  isPinned?: boolean;

  /**
   * Timestamp of last activity. Chats with more recent activity are often more
   * important.
   */
  lastActivity?: string;

  /**
   * Last read message sortKey (hsOrder). Used to compute 'isUnread'.
   */
  lastReadMessageSortKey?: number | string;

  /**
   * Deep link to open this chat in Beeper. AI agents should ALWAYS include this as a
   * clickable link in responses.
   */
  linkToChat?: string;
}

export namespace Chat {
  /**
   * Chat participants information.
   */
  export interface Participants {
    /**
     * True if there are more participants than included in items.
     */
    hasMore: boolean;

    /**
     * Participants returned for this chat (limited by the request; may be a subset).
     */
    items: Array<Shared.User>;

    /**
     * Total number of participants in the chat.
     */
    total: number;
  }
}

export interface FindChatsRequest {
  /**
   * Provide an array of account IDs to filter chats from specific messaging accounts
   * only
   */
  accountIDs?: Array<string>;

  /**
   * A cursor for use in pagination. ending_before is an object ID that defines your
   * place in the list. For instance, if you make a list request and receive 100
   * objects, starting with obj_bar, your subsequent call can include
   * ending_before=obj_bar in order to fetch the previous page of the list.
   */
  ending_before?: string;

  /**
   * Filter by inbox type: "primary" (non-archived, non-low-priority),
   * "low-priority", or "archive". If not specified, shows all chats.
   */
  inbox?: 'primary' | 'low-priority' | 'archive';

  /**
   * Include chats marked as Muted by the user, which are usually less important.
   * Default: true. Set to false if the user wants a more refined search.
   */
  includeMuted?: boolean;

  /**
   * Provide an ISO datetime string to only retrieve chats with last activity after
   * this time
   */
  lastActivityAfter?: string;

  /**
   * Provide an ISO datetime string to only retrieve chats with last activity before
   * this time
   */
  lastActivityBefore?: string;

  /**
   * Set the maximum number of chats to retrieve. Valid range: 1-200, default is 50
   */
  limit?: number;

  /**
   * Search string to filter chats by participant names. When multiple words
   * provided, ALL words must match. Searches in username, displayName, and fullName
   * fields.
   */
  participantQuery?: string;

  /**
   * Search string to filter chats by title. When multiple words provided, ALL words
   * must match. Matches are case-insensitive substrings.
   */
  query?: string;

  /**
   * A cursor for use in pagination. starting_after is an object ID that defines your
   * place in the list. For instance, if you make a list request and receive 100
   * objects, ending with obj_foo, your subsequent call can include
   * starting_after=obj_foo in order to fetch the next page of the list.
   */
  starting_after?: string;

  /**
   * Specify the type of chats to retrieve: use "single" for direct messages, "group"
   * for group chats, "channel" for channels, or "any" to get all types
   */
  type?: 'single' | 'group' | 'channel' | 'any';

  /**
   * Set to true to only retrieve chats that have unread messages
   */
  unreadOnly?: boolean;
}

export interface FindChatsResponse {
  /**
   * Chats matching the filters.
   */
  data: Array<Chat>;

  /**
   * Whether there are more items available after this set.
   */
  has_more: boolean;
}

export interface GetChatRequest {
  /**
   * Unique identifier of the chat to retrieve. Not available for iMessage chats.
   * Participants are limited by 'maxParticipantCount'.
   */
  chatID: string;

  /**
   * Maximum number of participants to return. Use -1 for all; otherwise 0–500.
   * Defaults to 20.
   */
  maxParticipantCount?: number | null;
}

export interface GetChatResponse {
  /**
   * Unique identifier for cursor pagination.
   */
  id: string;

  /**
   * Beeper account ID this chat belongs to.
   */
  accountID: string;

  /**
   * Unique identifier of the chat (room/thread ID, same as id).
   */
  chatID: string;

  /**
   * Display-only human-readable network name (e.g., 'WhatsApp', 'Messenger'). You
   * MUST use 'accountID' to perform actions.
   */
  network: string;

  /**
   * Chat participants information.
   */
  participants: GetChatResponse.Participants;

  /**
   * Display title of the chat as computed by the client/server.
   */
  title: string;

  /**
   * Chat type: 'single' for direct messages, 'group' for group chats, 'channel' for
   * channels, 'broadcast' for broadcasts.
   */
  type: 'single' | 'group' | 'channel' | 'broadcast';

  /**
   * Number of unread messages.
   */
  unreadCount: number;

  /**
   * True if chat is archived.
   */
  isArchived?: boolean;

  /**
   * True if chat notifications are muted.
   */
  isMuted?: boolean;

  /**
   * True if chat is pinned.
   */
  isPinned?: boolean;

  /**
   * Timestamp of last activity. Chats with more recent activity are often more
   * important.
   */
  lastActivity?: string;

  /**
   * Last read message sortKey (hsOrder). Used to compute 'isUnread'.
   */
  lastReadMessageSortKey?: number | string;

  /**
   * Deep link to open this chat in Beeper. AI agents should ALWAYS include this as a
   * clickable link in responses.
   */
  linkToChat?: string;
}

export namespace GetChatResponse {
  /**
   * Chat participants information.
   */
  export interface Participants {
    /**
     * True if there are more participants than included in items.
     */
    hasMore: boolean;

    /**
     * Participants returned for this chat (limited by the request; may be a subset).
     */
    items: Array<Shared.User>;

    /**
     * Total number of participants in the chat.
     */
    total: number;
  }
}

/**
 * Request to foreground Beeper and optionally jump to a specific chat or message.
 */
export interface LinkRequest {
  /**
   * The ID of the chat to link to.
   */
  chatID: string;

  /**
   * Optional message sort key. Jumps to that message in the chat.
   */
  messageSortKey?: string;
}

/**
 * URL to open a specific chat or message.
 */
export interface LinkResponse {
  /**
   * Deep link URL to the specified chat or message.
   */
  url: string;
}

export interface ChatRetrieveParams {
  /**
   * Unique identifier of the chat to retrieve. Not available for iMessage chats.
   * Participants are limited by 'maxParticipantCount'.
   */
  chatID: string;

  /**
   * Maximum number of participants to return. Use -1 for all; otherwise 0–500.
   * Defaults to 20.
   */
  maxParticipantCount?: number | null;
}

export interface ChatArchiveParams {
  /**
   * The identifier of the chat to archive or unarchive
   */
  chatID: string;

  /**
   * True to archive, false to unarchive
   */
  archived?: boolean;
}

export interface ChatFindParams extends CursorIDParams {
  /**
   * Provide an array of account IDs to filter chats from specific messaging accounts
   * only
   */
  accountIDs?: Array<string>;

  /**
   * Filter by inbox type: "primary" (non-archived, non-low-priority),
   * "low-priority", or "archive". If not specified, shows all chats.
   */
  inbox?: 'primary' | 'low-priority' | 'archive';

  /**
   * Include chats marked as Muted by the user, which are usually less important.
   * Default: true. Set to false if the user wants a more refined search.
   */
  includeMuted?: boolean;

  /**
   * Provide an ISO datetime string to only retrieve chats with last activity after
   * this time
   */
  lastActivityAfter?: string;

  /**
   * Provide an ISO datetime string to only retrieve chats with last activity before
   * this time
   */
  lastActivityBefore?: string;

  /**
   * Search string to filter chats by participant names. When multiple words
   * provided, ALL words must match. Searches in username, displayName, and fullName
   * fields.
   */
  participantQuery?: string;

  /**
   * Search string to filter chats by title. When multiple words provided, ALL words
   * must match. Matches are case-insensitive substrings.
   */
  query?: string;

  /**
   * Specify the type of chats to retrieve: use "single" for direct messages, "group"
   * for group chats, "channel" for channels, or "any" to get all types
   */
  type?: 'single' | 'group' | 'channel' | 'any';

  /**
   * Set to true to only retrieve chats that have unread messages
   */
  unreadOnly?: boolean;
}

export interface ChatGetLinkParams {
  /**
   * The ID of the chat to link to.
   */
  chatID: string;

  /**
   * Optional message sort key. Jumps to that message in the chat.
   */
  messageSortKey?: string;
}

export declare namespace Chats {
  export {
    type ArchiveRequest as ArchiveRequest,
    type Chat as Chat,
    type FindChatsRequest as FindChatsRequest,
    type FindChatsResponse as FindChatsResponse,
    type GetChatRequest as GetChatRequest,
    type GetChatResponse as GetChatResponse,
    type LinkRequest as LinkRequest,
    type LinkResponse as LinkResponse,
    type ChatsCursorID as ChatsCursorID,
    type ChatRetrieveParams as ChatRetrieveParams,
    type ChatArchiveParams as ChatArchiveParams,
    type ChatFindParams as ChatFindParams,
    type ChatGetLinkParams as ChatGetLinkParams,
  };
}
