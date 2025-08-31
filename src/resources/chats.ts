// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { ChatsCursor } from './shared';
import { APIPromise } from '../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';

/**
 * Chats operations
 */
export class Chats extends APIResource {
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
   * Retrieve chat details including metadata, participants, and latest message
   *
   * @example
   * ```ts
   * const chat = await client.chats.get({
   *   chatID:
   *     '!-5hI_iHR5vSDCtI8PzSDQT0H_3I:ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc.local-whatsapp.localhost',
   * });
   * ```
   */
  get(query: ChatGetParams, options?: RequestOptions): APIPromise<ChatGetResponse | null> {
    return this._client.get('/v0/get-chat', { query, ...options });
  }

  /**
   * Search and filter conversations across all messaging accounts
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const chat of client.chats.search()) {
   *   // ...
   * }
   * ```
   */
  search(
    query: ChatSearchParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ChatsCursor, Shared.Chat> {
    return this._client.getAPIList('/v0/search-chats', Cursor<Shared.Chat>, { query, ...options });
  }
}

export interface ChatGetResponse {
  /**
   * Unique identifier of the chat (room/thread ID, same as id) across Beeper.
   */
  id: string;

  /**
   * Beeper account ID this chat belongs to.
   */
  accountID: string;

  /**
   * Display-only human-readable network name (e.g., 'WhatsApp', 'Messenger'). You
   * MUST use 'accountID' to perform actions.
   */
  network: string;

  /**
   * Chat participants information.
   */
  participants: ChatGetResponse.Participants;

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
   * Local chat ID specific to this Beeper Desktop installation.
   */
  localChatID?: string | null;
}

export namespace ChatGetResponse {
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

export interface ChatArchiveParams {
  /**
   * The identifier of the chat to archive or unarchive (accepts both chatID and
   * local chat ID)
   */
  chatID: string;

  /**
   * True to archive, false to unarchive
   */
  archived?: boolean;
}

export interface ChatGetParams {
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

export interface ChatSearchParams extends CursorParams {
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

export declare namespace Chats {
  export {
    type ChatGetResponse as ChatGetResponse,
    type ChatArchiveParams as ChatArchiveParams,
    type ChatGetParams as ChatGetParams,
    type ChatSearchParams as ChatSearchParams,
  };
}

export { type ChatsCursor };
