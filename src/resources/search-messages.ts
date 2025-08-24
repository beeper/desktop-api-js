// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as GetChatAPI from './get-chat';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class SearchMessages extends APIResource {
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
   */
  search(
    query: SearchMessageSearchParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SearchMessageSearchResponse> {
    return this._client.get('/v0/search-messages', { query, ...options });
  }
}

export interface SearchMessageSearchResponse {
  /**
   * Map of chatID -> chat details for chats referenced in data.
   */
  chats: { [key: string]: SearchMessageSearchResponse.Chats };

  /**
   * Messages matching the query and filters.
   */
  data: Array<SearchMessageSearchResponse.Data>;

  /**
   * Whether there are more items available after this set.
   */
  has_more: boolean;
}

export namespace SearchMessageSearchResponse {
  export interface Chats {
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
    participants: Chats.Participants;

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

  export namespace Chats {
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

  export interface Data {
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
    attachments?: Array<Data.Attachment>;

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
    reactions?: Array<Data.Reaction>;

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

  export namespace Data {
    export interface Attachment {
      /**
       * Attachment type.
       */
      type: 'unknown' | 'img' | 'video' | 'audio';

      /**
       * Duration in seconds (audio/video).
       */
      duration?: number;

      /**
       * Original filename if available.
       */
      fileName?: string;

      /**
       * File size in bytes if known.
       */
      fileSize?: number;

      /**
       * True if the attachment is a GIF.
       */
      isGif?: boolean;

      /**
       * True if the attachment is a sticker.
       */
      isSticker?: boolean;

      /**
       * True if the attachment is a voice note.
       */
      isVoiceNote?: boolean;

      /**
       * MIME type if known (e.g., 'image/png').
       */
      mimeType?: string;

      /**
       * Preview image URL for video attachments (poster frame). May be temporary or
       * local-only to this device; download promptly if durable access is needed.
       */
      posterImg?: string;

      /**
       * Pixel dimensions of the attachment: width/height in px.
       */
      size?: Attachment.Size;

      /**
       * Public URL or local file path to fetch the asset. May be temporary or local-only
       * to this device; download promptly if durable access is needed.
       */
      srcURL?: string;
    }

    export namespace Attachment {
      /**
       * Pixel dimensions of the attachment: width/height in px.
       */
      export interface Size {
        height?: number;

        width?: number;
      }
    }

    export interface Reaction {
      /**
       * Reaction ID, typically ${participantID}${reactionKey} if multiple reactions
       * allowed, or just participantID otherwise.
       */
      id: string;

      /**
       * User ID of the participant who reacted.
       */
      participantID: string;

      /**
       * The reaction key: an emoji (😄), a network-specific key, or a shortcode like
       * "smiling-face".
       */
      reactionKey: string;

      /**
       * True if the reactionKey is an emoji.
       */
      emoji?: boolean;

      /**
       * URL to the reaction's image. May be temporary or local-only to this device;
       * download promptly if durable access is needed.
       */
      imgURL?: string;
    }
  }
}

export interface SearchMessageSearchParams {
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

export declare namespace SearchMessages {
  export {
    type SearchMessageSearchResponse as SearchMessageSearchResponse,
    type SearchMessageSearchParams as SearchMessageSearchParams,
  };
}
