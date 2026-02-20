// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import * as RemindersAPI from './reminders';
import { ReminderCreateParams, Reminders } from './reminders';
import * as MessagesAPI from './messages/messages';
import { Messages } from './messages/messages';
import { APIPromise } from '../../core/api-promise';
import {
  CursorNoLimit,
  type CursorNoLimitParams,
  CursorSearch,
  type CursorSearchParams,
  PagePromise,
} from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Manage chats
 */
export class Chats extends APIResource {
  reminders: RemindersAPI.Reminders = new RemindersAPI.Reminders(this._client);
  messages: MessagesAPI.Messages = new MessagesAPI.Messages(this._client);

  /**
   * Create a single/group chat (mode='create') or start a direct chat from merged
   * user data (mode='start').
   *
   * @example
   * ```ts
   * const chat = await client.chats.create({
   *   accountID: 'accountID',
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
   * await client.chats.archive(
   *   '!NCdzlIaMjZUmvmvyHU:beeper.com',
   * );
   * ```
   */
  archive(
    chatID: string,
    body: ChatArchiveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<void> {
    return this._client.post(path`/v1/chats/${chatID}/archive`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
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

  /**
   * Only returned in start mode. 'existing' means an existing chat was reused;
   * 'created' means a new chat was created.
   */
  status?: 'existing' | 'created';
}

export interface ChatListResponse extends Chat {
  /**
   * Last message preview for this chat, if available.
   */
  preview?: Shared.Message;
}

export interface ChatCreateParams {
  /**
   * Account to create or start the chat on.
   */
  accountID: string;

  /**
   * Whether invite-based DM creation is allowed when required by the platform. Used
   * for mode='start'.
   */
  allowInvite?: boolean;

  /**
   * Optional first message content if the platform requires it to create the chat.
   */
  messageText?: string;

  /**
   * Operation mode. Defaults to 'create' when omitted.
   */
  mode?: 'create' | 'start';

  /**
   * Required when mode='create'. User IDs to include in the new chat.
   */
  participantIDs?: Array<string>;

  /**
   * Optional title for group chats when mode='create'; ignored for single chats on
   * most platforms.
   */
  title?: string;

  /**
   * Required when mode='create'. 'single' requires exactly one participantID;
   * 'group' supports multiple participants and optional title.
   */
  type?: 'single' | 'group';

  /**
   * Required when mode='start'. Merged user-like contact payload used to resolve the
   * best identifier.
   */
  user?: ChatCreateParams.User;
}

export namespace ChatCreateParams {
  /**
   * Required when mode='start'. Merged user-like contact payload used to resolve the
   * best identifier.
   */
  export interface User {
    /**
     * Known user ID when available.
     */
    id?: string;

    /**
     * Email candidate.
     */
    email?: string;

    /**
     * Display name hint used for ranking only.
     */
    fullName?: string;

    /**
     * Phone number candidate (E.164 preferred).
     */
    phoneNumber?: string;

    /**
     * Username/handle candidate.
     */
    username?: string;
  }
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
Chats.Messages = Messages;

export declare namespace Chats {
  export {
    type Chat as Chat,
    type ChatCreateResponse as ChatCreateResponse,
    type ChatListResponse as ChatListResponse,
    type ChatListResponsesCursorNoLimit as ChatListResponsesCursorNoLimit,
    type ChatsCursorSearch as ChatsCursorSearch,
    type ChatCreateParams as ChatCreateParams,
    type ChatRetrieveParams as ChatRetrieveParams,
    type ChatListParams as ChatListParams,
    type ChatArchiveParams as ChatArchiveParams,
    type ChatSearchParams as ChatSearchParams,
  };

  export { Reminders as Reminders, type ReminderCreateParams as ReminderCreateParams };

  export { Messages as Messages };
}
