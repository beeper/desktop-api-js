// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import * as RemindersAPI from './reminders';
import { Reminders } from './reminders';

/**
 * Chats operations
 */
export class Chats extends APIResource {
  reminders: RemindersAPI.Reminders = new RemindersAPI.Reminders(this._client);
}

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

Chats.Reminders = Reminders;

export declare namespace Chats {
  export { type Chat as Chat };

  export { Reminders as Reminders };
}
