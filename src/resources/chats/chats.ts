// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import * as RemindersAPI from './reminders';
import { ReminderCreateParams, Reminders } from './reminders';
import { APIPromise } from '../../core/api-promise';
import { CursorList, type CursorListParams, CursorSearch, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Chats operations
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
   *   accountID:
   *     'local-whatsapp_ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc',
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
  ): PagePromise<ChatListResponsesCursorList, ChatListResponse> {
    return this._client.getAPIList('/v1/chats', CursorList<ChatListResponse>, { query, ...options });
  }

  /**
   * Archive or unarchive a chat. Set archived=true to move to archive,
   * archived=false to move back to inbox
   *
   * @example
   * ```ts
   * const baseResponse = await client.chats.archive(
   *   '!NCdzlIaMjZUmvmvyHU:beeper.com',
   * );
   * ```
   */
  archive(
    chatID: string,
    body: ChatArchiveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Shared.BaseResponse> {
    return this._client.post(path`/v1/chats/${chatID}/archive`, { body, ...options });
  }
}

export type ChatListResponsesCursorList = CursorList<ChatListResponse>;

export type ChatsCursorSearch = CursorSearch<Chat>;

export interface Chat {
  /**
   * Unique identifier of the chat (room/thread ID, same as id) across Beeper.
   */
  id: string;

  /**
   * Beeper account ID this chat belongs to.
   */
  accountID: string;

  /**
   * Display-only human-readable network name (e.g., 'WhatsApp', 'Messenger').
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

export interface ChatCreateResponse extends Shared.BaseResponse {
  /**
   * Newly created chat if available.
   */
  chatID?: string;
}

export interface ChatListResponse extends Chat {
  /**
   * Last message preview for this chat, if available.
   */
  preview?: Shared.Message;
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
   * Defaults to 20.
   */
  maxParticipantCount?: number | null;
}

export interface ChatListParams extends CursorListParams {
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

Chats.Reminders = Reminders;

export declare namespace Chats {
  export {
    type Chat as Chat,
    type ChatCreateResponse as ChatCreateResponse,
    type ChatListResponse as ChatListResponse,
    type ChatListResponsesCursorList as ChatListResponsesCursorList,
    type ChatCreateParams as ChatCreateParams,
    type ChatRetrieveParams as ChatRetrieveParams,
    type ChatListParams as ChatListParams,
    type ChatArchiveParams as ChatArchiveParams,
  };

  export { Reminders as Reminders, type ReminderCreateParams as ReminderCreateParams };
}
