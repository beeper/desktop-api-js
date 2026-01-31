// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import * as RemindersAPI from './reminders';
import { ReminderCreateParams, ReminderCreateResponse, ReminderDeleteResponse, Reminders } from './reminders';
import { APIPromise } from '../../core/api-promise';
import {
  CursorNoLimit,
  type CursorNoLimitParams,
  CursorSearch,
  type CursorSearchParams,
  PagePromise,
} from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Manage chats
 */
export class Chats extends APIResource {
  reminders: RemindersAPI.Reminders = new RemindersAPI.Reminders(this._client);

  /**
   * Create a single or group chat on a specific account using participant IDs and
   * optional title.
   *
   * @example
   * ```ts
   * const chat = await client.chats.create({
   *   accountID: 'accountID',
   *   participantIDs: ['string'],
   *   type: 'single',
   * });
   * ```
   */
  create(body: ChatCreateParams, options?: RequestOptions): APIPromise<ChatCreateResponse> {
    return this._client.post('/v1/chats', { body, ...options });
  }

  /**
   * Retrieve chat details including metadata, participants, and latest message
   *
   * @example
   * ```ts
   * const chat = await client.chats.retrieve(
   *   '!NCdzlIaMjZUmvmvyHU:beeper.com',
   * );
   * ```
   */
  retrieve(
    chatID: string,
    query: ChatRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Chat> {
    return this._client.get(path`/v1/chats/${chatID}`, { query, ...options });
  }

  /**
   * List all chats sorted by last activity (most recent first). Combines all
   * accounts into a single paginated list.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const chatListResponse of client.chats.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: ChatListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ChatListResponsesCursorNoLimit, ChatListResponse> {
    return this._client.getAPIList('/v1/chats', CursorNoLimit<ChatListResponse>, { query, ...options });
  }

  /**
   * Archive or unarchive a chat. Set archived=true to move to archive,
   * archived=false to move back to inbox
   *
   * @example
   * ```ts
   * const response = await client.chats.archive(
   *   '!NCdzlIaMjZUmvmvyHU:beeper.com',
   * );
   * ```
   */
  archive(
    chatID: string,
    body: ChatArchiveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ChatArchiveResponse> {
    return this._client.post(path`/v1/chats/${chatID}/archive`, { body, ...options });
  }

  /**
   * Search chats by title/network or participants using Beeper Desktop's renderer
   * algorithm.
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
  ): PagePromise<ChatsCursorSearch, Chat> {
    return this._client.getAPIList('/v1/chats/search', CursorSearch<Chat>, { query, ...options });
  }
}

export type ChatListResponsesCursorNoLimit = CursorNoLimit<ChatListResponse>;

export type ChatsCursorSearch = CursorSearch<Chat>;

export interface Chat {
  /**
   * Unique identifier of the chat across Beeper.
   */
  id: string;

  /**
   * Account ID this chat belongs to.
   */
  accountID: string;

  /**
   * Chat participants information.
   */
  participants: Chat.Participants;

  /**
   * Display title of the chat as computed by the client/server.
   */
  title: string;

  /**
   * Chat type: 'single' for direct messages, 'group' for group chats.
   */
  type: 'single' | 'group';

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
   * Timestamp of last activity.
   */
  lastActivity?: string;

  /**
   * Last read message sortKey.
   */
  lastReadMessageSortKey?: string;

  /**
   * Local chat ID specific to this Beeper Desktop installation.
   */
  localChatID?: string | null;
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

export interface ChatCreateResponse {
  /**
   * Newly created chat ID.
   */
  chatID: string;
}

export interface ChatListResponse extends Chat {
  /**
   * Last message preview for this chat, if available.
   */
  preview?: Shared.Message;
}

export interface ChatArchiveResponse {
  /**
   * Indicates the operation completed successfully
   */
  success: true;
}

export interface ChatCreateParams {
  /**
   * Account to create the chat on.
   */
  accountID: string;

  /**
   * User IDs to include in the new chat.
   */
  participantIDs: Array<string>;

  /**
   * Chat type to create: 'single' requires exactly one participantID; 'group'
   * supports multiple participants and optional title.
   */
  type: 'single' | 'group';

  /**
   * Optional first message content if the platform requires it to create the chat.
   */
  messageText?: string;

  /**
   * Optional title for group chats; ignored for single chats on most platforms.
   */
  title?: string;
}

export interface ChatRetrieveParams {
  /**
   * Maximum number of participants to return. Use -1 for all; otherwise 0–500.
   * Defaults to all (-1).
   */
  maxParticipantCount?: number | null;
}

export interface ChatListParams extends CursorNoLimitParams {
  /**
   * Limit to specific account IDs. If omitted, fetches from all accounts.
   */
  accountIDs?: Array<string>;
}

export interface ChatArchiveParams {
  /**
   * True to archive, false to unarchive
   */
  archived?: boolean;
}

export interface ChatSearchParams extends CursorSearchParams {
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
  includeMuted?: boolean | null;

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
   * Literal token search (non-semantic). Use single words users type (e.g.,
   * "dinner"). When multiple words provided, ALL must match. Case-insensitive.
   */
  query?: string;

  /**
   * Search scope: 'titles' matches title + network; 'participants' matches
   * participant names.
   */
  scope?: 'titles' | 'participants';

  /**
   * Specify the type of chats to retrieve: use "single" for direct messages, "group"
   * for group chats, or "any" to get all types
   */
  type?: 'single' | 'group' | 'any';

  /**
   * Set to true to only retrieve chats that have unread messages
   */
  unreadOnly?: boolean | null;
}

Chats.Reminders = Reminders;

export declare namespace Chats {
  export {
    type Chat as Chat,
    type ChatCreateResponse as ChatCreateResponse,
    type ChatListResponse as ChatListResponse,
    type ChatArchiveResponse as ChatArchiveResponse,
    type ChatListResponsesCursorNoLimit as ChatListResponsesCursorNoLimit,
    type ChatsCursorSearch as ChatsCursorSearch,
    type ChatCreateParams as ChatCreateParams,
    type ChatRetrieveParams as ChatRetrieveParams,
    type ChatListParams as ChatListParams,
    type ChatArchiveParams as ChatArchiveParams,
    type ChatSearchParams as ChatSearchParams,
  };

  export {
    Reminders as Reminders,
    type ReminderCreateResponse as ReminderCreateResponse,
    type ReminderDeleteResponse as ReminderDeleteResponse,
    type ReminderCreateParams as ReminderCreateParams,
  };
}
