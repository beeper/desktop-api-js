// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { CursorSearch, CursorSortKey } from '../core/pagination';

export interface Attachment {
  /**
   * Attachment type.
   */
  type: 'unknown' | 'img' | 'video' | 'audio';

  /**
   * Attachment identifier (typically an mxc:// URL). Use with /v1/assets/download to
   * get a local file path.
   */
  id?: string;

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

export interface Error {
  /**
   * Machine-readable error code
   */
  code: string;

  /**
   * Error message
   */
  message: string;

  /**
   * Additional error details for debugging
   */
  details?: Error.ValidationDetails | { [key: string]: unknown } | unknown;
}

export namespace Error {
  /**
   * Validation error details
   */
  export interface ValidationDetails {
    /**
     * List of validation issues
     */
    issues: Array<ValidationDetails.Issue>;
  }

  export namespace ValidationDetails {
    export interface Issue {
      /**
       * Validation issue code
       */
      code: string;

      /**
       * Human-readable description of the validation issue
       */
      message: string;

      /**
       * Path pointing to the invalid field within the payload
       */
      path: Array<string | number>;
    }
  }
}

export interface Message {
  /**
   * Message ID.
   */
  id: string;

  /**
   * Beeper account ID the message belongs to.
   */
  accountID: string;

  /**
   * Unique identifier of the chat.
   */
  chatID: string;

  /**
   * Sender user ID.
   */
  senderID: string;

  /**
   * A unique, sortable key used to sort messages.
   */
  sortKey: string;

  /**
   * Message timestamp.
   */
  timestamp: string;

  /**
   * Attachments included with this message, if any.
   */
  attachments?: Array<Attachment>;

  /**
   * True if the authenticated user sent the message.
   */
  isSender?: boolean;

  /**
   * True if the message is unread for the authenticated user. May be omitted.
   */
  isUnread?: boolean;

  /**
   * ID of the message this is a reply to, if any.
   */
  linkedMessageID?: string;

  /**
   * Reactions to the message, if any.
   */
  reactions?: Array<Reaction>;

  /**
   * Resolved sender display name (impersonator/full name/username/participant name).
   */
  senderName?: string;

  /**
   * Plain-text body if present. May include a JSON fallback with text entities for
   * rich messages.
   */
  text?: string;

  /**
   * Message content type. Useful for distinguishing reactions, media messages, and
   * state events from regular text messages.
   */
  type?:
    | 'TEXT'
    | 'NOTICE'
    | 'IMAGE'
    | 'VIDEO'
    | 'VOICE'
    | 'AUDIO'
    | 'FILE'
    | 'STICKER'
    | 'LOCATION'
    | 'REACTION';
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

/**
 * User the account belongs to.
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
  fullName?: string;

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

export type UsersCursorSearch = CursorSearch<User>;

export type MessagesCursorSortKey = CursorSortKey<Message>;

export type MessagesCursorSearch = CursorSearch<Message>;
