// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as GetChatAPI from './get-chat';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class FindChats extends APIResource {
  /**
   * Search and filter conversations across all messaging accounts.
   *
   * - When to use: browse chats by inbox (primary/low-priority/archive), type,
   *   unread status, or search terms.
   * - Pagination: use cursor + direction for pagination.
   * - Performance: provide accountIDs when known for faster filtering. Returns:
   *   matching chats with pagination. Agents: ALWAYS use linkToChat to make
   *   clickable links in your response
   */
  list(
    query: FindChatListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<FindChatListResponse> {
    return this._client.get('/v0/find-chats', { query, ...options });
  }
}

export interface FindChatListResponse {
  /**
   * Chats matching the filters.
   */
  data: Array<FindChatListResponse.Data>;

  /**
   * Whether there are more items available after this set.
   */
  has_more: boolean;
}

export namespace FindChatListResponse {
  export interface Data {
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
    participants: Data.Participants;

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

  export namespace Data {
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
      items: Array<GetChatAPI.User>;

      /**
       * Total number of participants in the chat.
       */
      total: number;
    }
  }
}

export interface FindChatListParams {
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

export declare namespace FindChats {
  export { type FindChatListResponse as FindChatListResponse, type FindChatListParams as FindChatListParams };
}
