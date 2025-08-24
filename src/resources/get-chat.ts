// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as GetChatAPI from './get-chat';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class GetChat extends APIResource {
  /**
   * Retrieve chat details: metadata, participants (limited), and latest message.
   *
   * - When to use: fetch a complete view of a chat beyond what search returns.
   * - Constraints: not available for iMessage chats ('imsg##'). Participants limited
   *   by 'maxParticipantCount' (default 20, max 500). Returns: chat details.Agents:
   *   ALWAYS use linkToChat to make clickable links in your response
   */
  retrieve(
    query: GetChatRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<GetChatRetrieveResponse | null> {
    return this._client.get('/v0/get-chat', { query, ...options });
  }
}

/**
 * A person on or reachable through Beeper. Values are best-effort and can vary by
 * network.
 */
export interface User {
  /**
   * Stable Beeper user ID. Use as the primary key when referencing a person.
   */
  id: string;

  /**
   * True if Beeper cannot initiate messages to this user (e.g., blocked, network
   * restriction, or no DM path). The user may still message you.
   */
  cannotMessage?: boolean;

  /**
   * Email address if known. Not guaranteed verified.
   */
  email?: string;

  /**
   * Display name as shown in clients (e.g., 'Alice Example'). May include emojis.
   */
  fullName?: string | null;

  /**
   * Avatar image URL if available. May be temporary or local-only to this device;
   * download promptly if durable access is needed.
   */
  imgURL?: string;

  /**
   * True if this user represents the authenticated account's own identity.
   */
  isSelf?: boolean;

  /**
   * User's phone number in E.164 format (e.g., '+14155552671'). Omit if unknown.
   */
  phoneNumber?: string;

  /**
   * Human-readable handle if available (e.g., '@alice'). May be network-specific and
   * not globally unique.
   */
  username?: string;
}

export interface GetChatRetrieveResponse {
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
  participants: GetChatRetrieveResponse.Participants;

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

export namespace GetChatRetrieveResponse {
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

export interface GetChatRetrieveParams {
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

export declare namespace GetChat {
  export {
    type User as User,
    type GetChatRetrieveResponse as GetChatRetrieveResponse,
    type GetChatRetrieveParams as GetChatRetrieveParams,
  };
}
