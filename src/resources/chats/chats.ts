// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import * as RemindersAPI from './reminders';
import { BaseReminders, ReminderCreateParams, Reminders } from './reminders';
import * as MessagesAPI from './messages/messages';
import { BaseMessages, Messages } from './messages/messages';
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
export class BaseChats extends APIResource {
  static override readonly _key: readonly ['chats'] = Object.freeze(['chats'] as const);

  /**
   * Create a direct or group chat from participant IDs. Returns the created chat.
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
   * Update supported chat fields. Non-empty draft objects are accepted only when the
   * current draft is empty. Send draft=null to clear the draft before setting new
   * draft text or attachments.
   *
   * @example
   * ```ts
   * const chat = await client.chats.update(
   *   '!NCdzlIaMjZUmvmvyHU:beeper.com',
   * );
   * ```
   */
  update(
    chatID: string,
    body: ChatUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Chat> {
    return this._client.patch(path`/v1/chats/${chatID}`, { body, ...options });
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
   * Mark a chat as read, optionally through a specific message ID.
   *
   * @example
   * ```ts
   * const chat = await client.chats.markRead(
   *   '!NCdzlIaMjZUmvmvyHU:beeper.com',
   * );
   * ```
   */
  markRead(
    chatID: string,
    body: ChatMarkReadParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Chat> {
    return this._client.post(path`/v1/chats/${chatID}/read`, { body, ...options });
  }

  /**
   * Mark a chat as unread, optionally from a specific message ID.
   *
   * @example
   * ```ts
   * const chat = await client.chats.markUnread(
   *   '!NCdzlIaMjZUmvmvyHU:beeper.com',
   * );
   * ```
   */
  markUnread(
    chatID: string,
    body: ChatMarkUnreadParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Chat> {
    return this._client.post(path`/v1/chats/${chatID}/unread`, { body, ...options });
  }

  /**
   * Force a delivery notification when supported by the underlying network.
   * Currently intended for iMessage on macOS; unsupported networks return an error.
   *
   * @example
   * ```ts
   * const chat = await client.chats.notifyAnyway(
   *   '!NCdzlIaMjZUmvmvyHU:beeper.com',
   * );
   * ```
   */
  notifyAnyway(
    chatID: string,
    body?: ChatNotifyAnywayParams | null | undefined,
    options?: RequestOptions,
  ): APIPromise<Chat> {
    return this._client.post(path`/v1/chats/${chatID}/notify-anyway`, { body, ...options });
  }

  /**
   * Search chats by title, network, or participant names.
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

  /**
   * Resolve a user/contact and open a direct chat. Reuses and returns an existing
   * direct chat when one is found. Available in Beeper Desktop v4.2.808+.
   *
   * @example
   * ```ts
   * const response = await client.chats.start({
   *   accountID: 'accountID',
   *   user: {},
   * });
   * ```
   */
  start(body: ChatStartParams, options?: RequestOptions): APIPromise<ChatStartResponse> {
    return this._client.post('/v1/chats/start', { body, ...options });
  }
}
/**
 * Manage chats
 */
export class Chats extends BaseChats {
  reminders: RemindersAPI.Reminders = new RemindersAPI.Reminders(this._client);
  messages: MessagesAPI.Messages = new MessagesAPI.Messages(this._client);
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
   * Display-only human-readable account/network name.
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
   * Chat capabilities reported by the platform.
   */
  capabilities?: Chat.Capabilities;

  /**
   * Group chat description/topic when available.
   */
  description?: string | null;

  /**
   * Current draft object for this chat, or null when no draft is set.
   */
  draft?: Chat.Draft | null;

  /**
   * Local filesystem path to the chat avatar image when available.
   */
  imgURL?: string | null;

  /**
   * True if chat is archived.
   */
  isArchived?: boolean;

  /**
   * True if chat is marked low priority.
   */
  isLowPriority?: boolean;

  /**
   * True if the chat was explicitly marked unread by the authenticated user.
   */
  isMarkedUnread?: boolean;

  /**
   * True if chat notifications are muted.
   */
  isMuted?: boolean;

  /**
   * True if chat is pinned.
   */
  isPinned?: boolean;

  /**
   * True if messages cannot be sent in this chat.
   */
  isReadOnly?: boolean;

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

  /**
   * Disappearing-message timer in seconds when available.
   */
  messageExpirySeconds?: number | null;

  /**
   * Current reminder for this chat, or null when no reminder is set.
   */
  reminder?: Chat.Reminder | null;

  /**
   * Current snooze state for this chat, or null when no snooze is set.
   */
  snooze?: Chat.Snooze | null;

  /**
   * Number of unread messages that mention the authenticated user or @room.
   */
  unreadMentionsCount?: number;
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
    items: Array<Participants.Item>;

    /**
     * Total number of participants in the chat.
     */
    total: number;
  }

  export namespace Participants {
    /**
     * A chat participant. Extends User with chat membership metadata.
     */
    export interface Item extends Shared.User {
      /**
       * True if this participant has admin privileges in the chat.
       */
      isAdmin?: boolean;

      /**
       * True if this participant represents a network or bridge bot.
       */
      isNetworkBot?: boolean;

      /**
       * True if this participant has been invited but has not joined yet.
       */
      isPending?: boolean;
    }
  }

  /**
   * Chat capabilities reported by the platform.
   */
  export interface Capabilities {
    /**
     * Allowed Unicode reactions. Omitted means all emoji reactions are allowed.
     */
    allowedReactions?: Array<string>;

    /**
     * True if archive/unarchive is supported.
     */
    archive?: boolean;

    /**
     * Supported attachment message types and their per-type constraints, keyed by
     * Matrix msgtype or pseudo-msgtype (for example m.image, m.video,
     * org.matrix.msc3245.voice). Missing message types should be treated as rejected.
     */
    attachments?: { [key: string]: Capabilities.Attachments };

    /**
     * True if custom emoji reactions are supported.
     */
    customEmojiReactions?: boolean;

    /**
     * -2: rejected, -1: dropped, 0: unsupported, 1: partially supported, 2: fully
     * supported.
     */
    delete?: -2 | -1 | 0 | 1 | 2;

    /**
     * True if deleting chats for the authenticated user is supported.
     */
    deleteChat?: boolean;

    /**
     * True if deleting chats for everyone is supported.
     */
    deleteChatForEveryone?: boolean;

    /**
     * True if deleting messages only for the authenticated user is supported.
     */
    deleteForMe?: boolean;

    /**
     * Maximum message age for delete-for-everyone, in seconds.
     */
    deleteMaxAge?: number;

    /**
     * Disappearing-message timer capabilities.
     */
    disappearingTimer?: Capabilities.DisappearingTimer;

    /**
     * -2: rejected, -1: dropped, 0: unsupported, 1: partially supported, 2: fully
     * supported.
     */
    edit?: -2 | -1 | 0 | 1 | 2;

    /**
     * Maximum message age for edits, in seconds.
     */
    editMaxAge?: number;

    /**
     * Maximum number of edits allowed for one message.
     */
    editMaxCount?: number;

    /**
     * Supported rich-text formatting features keyed by feature name (for example bold,
     * inline_code, code_block.syntax_highlighting). Omitted means no formatting
     * support is advertised.
     */
    formatting?: { [key: string]: -2 | -1 | 0 | 1 | 2 };

    /**
     * -2: rejected, -1: dropped, 0: unsupported, 1: partially supported, 2: fully
     * supported.
     */
    locationMessage?: -2 | -1 | 0 | 1 | 2;

    /**
     * True if marking chats unread is supported.
     */
    markAsUnread?: boolean;

    /**
     * Maximum length of normal text messages.
     */
    maxTextLength?: number;

    /**
     * Message request capabilities.
     */
    messageRequest?: Capabilities.MessageRequest;

    /**
     * Participant management capabilities.
     */
    participantActions?: Capabilities.ParticipantActions;

    /**
     * -2: rejected, -1: dropped, 0: unsupported, 1: partially supported, 2: fully
     * supported.
     */
    poll?: -2 | -1 | 0 | 1 | 2;

    /**
     * -2: rejected, -1: dropped, 0: unsupported, 1: partially supported, 2: fully
     * supported.
     */
    reaction?: -2 | -1 | 0 | 1 | 2;

    /**
     * Maximum number of reactions allowed on a single message.
     */
    reactionCount?: number;

    /**
     * True if read receipts are supported.
     */
    readReceipts?: boolean;

    /**
     * -2: rejected, -1: dropped, 0: unsupported, 1: partially supported, 2: fully
     * supported.
     */
    reply?: -2 | -1 | 0 | 1 | 2;

    /**
     * Chat state update capabilities.
     */
    state?: Capabilities.State;

    /**
     * -2: rejected, -1: dropped, 0: unsupported, 1: partially supported, 2: fully
     * supported.
     */
    thread?: -2 | -1 | 0 | 1 | 2;

    /**
     * True if typing notifications are supported.
     */
    typingNotifications?: boolean;
  }

  export namespace Capabilities {
    /**
     * Capabilities for one attachment message type.
     */
    export interface Attachments {
      /**
       * Supported MIME types or MIME patterns for this file message type. Missing MIME
       * types should be treated as rejected.
       */
      mimeTypes: { [key: string]: -2 | -1 | 0 | 1 | 2 };

      /**
       * -2: rejected, -1: dropped, 0: unsupported, 1: partially supported, 2: fully
       * supported.
       */
      caption?: -2 | -1 | 0 | 1 | 2;

      /**
       * Maximum caption length when captions are supported.
       */
      maxCaptionLength?: number;

      /**
       * Maximum audio or video duration in seconds.
       */
      maxDuration?: number;

      /**
       * Maximum image or video height in pixels.
       */
      maxHeight?: number;

      /**
       * Maximum file size in bytes.
       */
      maxSize?: number;

      /**
       * Maximum image or video width in pixels.
       */
      maxWidth?: number;

      /**
       * True if this file type can be sent as view-once media.
       */
      viewOnce?: boolean;
    }

    /**
     * Disappearing-message timer capabilities.
     */
    export interface DisappearingTimer {
      /**
       * True if empty timer objects should be omitted from message content.
       */
      omitEmptyTimer?: boolean;

      /**
       * Allowed disappearing timer values in milliseconds. Omitted means any timer is
       * allowed.
       */
      timers?: Array<number>;

      /**
       * Supported disappearing timer types.
       */
      types?: Array<'afterRead' | 'afterSend'>;
    }

    /**
     * Message request capabilities.
     */
    export interface MessageRequest {
      /**
       * -2: rejected, -1: dropped, 0: unsupported, 1: partially supported, 2: fully
       * supported.
       */
      acceptWithButton?: -2 | -1 | 0 | 1 | 2;

      /**
       * -2: rejected, -1: dropped, 0: unsupported, 1: partially supported, 2: fully
       * supported.
       */
      acceptWithMessage?: -2 | -1 | 0 | 1 | 2;
    }

    /**
     * Participant management capabilities.
     */
    export interface ParticipantActions {
      /**
       * -2: rejected, -1: dropped, 0: unsupported, 1: partially supported, 2: fully
       * supported.
       */
      ban?: -2 | -1 | 0 | 1 | 2;

      /**
       * -2: rejected, -1: dropped, 0: unsupported, 1: partially supported, 2: fully
       * supported.
       */
      invite?: -2 | -1 | 0 | 1 | 2;

      /**
       * -2: rejected, -1: dropped, 0: unsupported, 1: partially supported, 2: fully
       * supported.
       */
      kick?: -2 | -1 | 0 | 1 | 2;

      /**
       * -2: rejected, -1: dropped, 0: unsupported, 1: partially supported, 2: fully
       * supported.
       */
      leave?: -2 | -1 | 0 | 1 | 2;

      /**
       * -2: rejected, -1: dropped, 0: unsupported, 1: partially supported, 2: fully
       * supported.
       */
      revokeInvite?: -2 | -1 | 0 | 1 | 2;
    }

    /**
     * Chat state update capabilities.
     */
    export interface State {
      /**
       * Chat avatar state capability.
       */
      avatar?: State.Avatar;

      /**
       * Chat description/topic state capability.
       */
      description?: State.Description;

      /**
       * Disappearing-message timer state capability.
       */
      disappearingTimer?: State.DisappearingTimer;

      /**
       * Chat title state capability.
       */
      title?: State.Title;
    }

    export namespace State {
      /**
       * Chat avatar state capability.
       */
      export interface Avatar {
        /**
         * -2: rejected, -1: dropped, 0: unsupported, 1: partially supported, 2: fully
         * supported.
         */
        level: -2 | -1 | 0 | 1 | 2;
      }

      /**
       * Chat description/topic state capability.
       */
      export interface Description {
        /**
         * -2: rejected, -1: dropped, 0: unsupported, 1: partially supported, 2: fully
         * supported.
         */
        level: -2 | -1 | 0 | 1 | 2;
      }

      /**
       * Disappearing-message timer state capability.
       */
      export interface DisappearingTimer {
        /**
         * -2: rejected, -1: dropped, 0: unsupported, 1: partially supported, 2: fully
         * supported.
         */
        level: -2 | -1 | 0 | 1 | 2;
      }

      /**
       * Chat title state capability.
       */
      export interface Title {
        /**
         * -2: rejected, -1: dropped, 0: unsupported, 1: partially supported, 2: fully
         * supported.
         */
        level: -2 | -1 | 0 | 1 | 2;
      }
    }
  }

  /**
   * Current draft object for this chat, or null when no draft is set.
   */
  export interface Draft {
    /**
     * Matrix HTML draft body.
     */
    text: string;

    /**
     * Draft attachments keyed by attachment ID.
     */
    attachments?: { [key: string]: Draft.Attachments };
  }

  export namespace Draft {
    export interface Attachments {
      /**
       * Draft attachment identifier.
       */
      id: string;

      /**
       * Draft attachment type. GIF and recorded audio are mutually exclusive types.
       */
      type: 'file' | 'gif' | 'recorded_audio';

      /**
       * Audio duration in seconds if known.
       */
      audioDurationSeconds?: number;

      /**
       * Original filename if available.
       */
      fileName?: string;

      /**
       * Local filesystem path for the draft attachment.
       */
      filePath?: string;

      /**
       * File size in bytes if known.
       */
      fileSize?: number;

      /**
       * MIME type if known.
       */
      mimeType?: string;

      /**
       * Pixel dimensions of the attachment.
       */
      size?: Attachments.Size;

      /**
       * Sticker identifier if the draft attachment is a sticker.
       */
      stickerID?: string;
    }

    export namespace Attachments {
      /**
       * Pixel dimensions of the attachment.
       */
      export interface Size {
        height?: number;

        width?: number;
      }
    }
  }

  /**
   * Current reminder for this chat, or null when no reminder is set.
   */
  export interface Reminder {
    /**
     * Cancel reminder if someone messages in the chat.
     */
    dismissOnIncomingMessage?: boolean;

    /**
     * Timestamp when the reminder should trigger.
     */
    remindAt?: string;
  }

  /**
   * Current snooze state for this chat, or null when no snooze is set.
   */
  export interface Snooze {
    /**
     * Timestamp when the snooze expires.
     */
    snoozeUntil?: string;

    /**
     * Timestamp when the user set the snooze.
     */
    userSnoozedAt?: string;
  }
}

export interface ChatCreateResponse extends Chat {
  /**
   * @deprecated DEPRECATED - use id instead. Compatibility alias for older clients.
   */
  chatID: string;

  /**
   * @deprecated DEPRECATED - legacy start-chat status for older clients. New clients
   * should inspect the returned Chat instead.
   */
  status?: 'existing' | 'created';
}

/**
 * Chat with optional last message preview.
 */
export interface ChatListResponse extends Chat {
  /**
   * Last message preview for this chat, if available.
   */
  preview?: Shared.Message;
}

export interface ChatStartResponse extends Chat {
  /**
   * @deprecated DEPRECATED - use id instead. Compatibility alias for older clients.
   */
  chatID: string;

  /**
   * @deprecated DEPRECATED - legacy start-chat status for older clients. New clients
   * should inspect the returned Chat instead.
   */
  status?: 'existing' | 'created';
}

export interface ChatCreateParams {
  /**
   * Account to create or start the chat on.
   */
  accountID: string;

  /**
   * User IDs to include in the new chat.
   */
  participantIDs: Array<string>;

  /**
   * 'single' requires exactly one participantID; 'group' supports multiple
   * participants and optional title.
   */
  type: 'single' | 'group';

  /**
   * Optional first message content if the platform requires it to create the chat.
   */
  messageText?: string;

  /**
   * Optional title for group chats; ignored for single chats on most networks.
   */
  title?: string;
}

export interface ChatRetrieveParams {
  /**
   * Maximum number of participants to return. Use -1 for all; otherwise 0-500.
   * Defaults to 100. List and search endpoints return up to 20 participants per
   * chat.
   */
  maxParticipantCount?: number | null;
}

export interface ChatUpdateParams {
  /**
   * Group chat description/topic. Support depends on the chat account and chat
   * permissions.
   */
  description?: string | null;

  /**
   * Draft object to set or clear. Non-empty drafts are only accepted when the
   * current draft is empty. Send draft=null to clear text and attachments together
   * before setting a new draft.
   */
  draft?: ChatUpdateParams.Draft | null;

  /**
   * Local filesystem path to a group chat avatar image. Support depends on the chat
   * account and chat permissions.
   */
  imgURL?: string | null;

  /**
   * Archive or unarchive the chat.
   */
  isArchived?: boolean;

  /**
   * Mark or unmark the chat as low priority when supported by the account.
   */
  isLowPriority?: boolean;

  /**
   * Mute or unmute the chat.
   */
  isMuted?: boolean;

  /**
   * Pin or unpin the chat when supported by the account.
   */
  isPinned?: boolean;

  /**
   * Disappearing-message timer in seconds, or null to clear when supported.
   */
  messageExpirySeconds?: number | null;

  /**
   * Custom chat title. Support depends on the chat account and chat permissions.
   */
  title?: string | null;
}

export namespace ChatUpdateParams {
  /**
   * Draft object to set or clear. Non-empty drafts are only accepted when the
   * current draft is empty. Send draft=null to clear text and attachments together
   * before setting a new draft.
   */
  export interface Draft {
    /**
     * Draft text. Plain text and Markdown are converted to Matrix HTML with the same
     * rules used by send and edit.
     */
    text: string;

    /**
     * Draft attachments keyed by attachment ID. Each attachment must reference an
     * uploadID returned by the upload file endpoint.
     */
    attachments?: { [key: string]: Draft.Attachments };
  }

  export namespace Draft {
    export interface Attachments {
      /**
       * Upload ID from uploadAsset endpoint. Required to reference uploaded files.
       */
      uploadID: string;

      /**
       * Optional draft attachment identifier. If omitted, a new identifier is generated.
       */
      id?: string;

      /**
       * Duration in seconds (optional override of cached value)
       */
      duration?: number;

      /**
       * Filename (optional override of cached value)
       */
      fileName?: string;

      /**
       * MIME type (optional override of cached value)
       */
      mimeType?: string;

      /**
       * Dimensions (optional override of cached value)
       */
      size?: Attachments.Size;

      /**
       * Attachment type hint (image, video, audio, file, gif, voice-note, sticker). If
       * omitted, auto-detected from mimeType
       */
      type?: 'image' | 'video' | 'audio' | 'file' | 'gif' | 'voice-note' | 'sticker';
    }

    export namespace Attachments {
      /**
       * Dimensions (optional override of cached value)
       */
      export interface Size {
        height: number;

        width: number;
      }
    }
  }
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

export interface ChatMarkReadParams {
  /**
   * Optional message ID to mark read through.
   */
  messageID?: string;
}

export interface ChatMarkUnreadParams {
  /**
   * Optional message ID to mark unread from.
   */
  messageID?: string;
}

export interface ChatNotifyAnywayParams {}

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

export interface ChatStartParams {
  /**
   * Account to create or start the chat on.
   */
  accountID: string;

  /**
   * Merged user-like contact payload used to resolve the best identifier.
   */
  user: ChatStartParams.User;

  /**
   * Whether invite-based DM creation is allowed when required by the platform.
   */
  allowInvite?: boolean;

  /**
   * Optional first message content if the platform requires it to create the chat.
   */
  messageText?: string;
}

export namespace ChatStartParams {
  /**
   * Merged user-like contact payload used to resolve the best identifier.
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

Chats.Reminders = Reminders;
Chats.BaseReminders = BaseReminders;
Chats.Messages = Messages;
Chats.BaseMessages = BaseMessages;

export declare namespace Chats {
  export {
    type Chat as Chat,
    type ChatCreateResponse as ChatCreateResponse,
    type ChatListResponse as ChatListResponse,
    type ChatStartResponse as ChatStartResponse,
    type ChatListResponsesCursorNoLimit as ChatListResponsesCursorNoLimit,
    type ChatsCursorSearch as ChatsCursorSearch,
    type ChatCreateParams as ChatCreateParams,
    type ChatRetrieveParams as ChatRetrieveParams,
    type ChatUpdateParams as ChatUpdateParams,
    type ChatListParams as ChatListParams,
    type ChatArchiveParams as ChatArchiveParams,
    type ChatMarkReadParams as ChatMarkReadParams,
    type ChatMarkUnreadParams as ChatMarkUnreadParams,
    type ChatNotifyAnywayParams as ChatNotifyAnywayParams,
    type ChatSearchParams as ChatSearchParams,
    type ChatStartParams as ChatStartParams,
  };

  export {
    Reminders as Reminders,
    BaseReminders as BaseReminders,
    type ReminderCreateParams as ReminderCreateParams,
  };

  export { Messages as Messages, BaseMessages as BaseMessages };
}
