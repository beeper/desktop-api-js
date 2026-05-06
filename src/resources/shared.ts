// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { CursorNoLimit, CursorSearch } from '../core/pagination';

export interface Attachment {
  /**
   * Attachment type.
   */
  type: 'unknown' | 'img' | 'video' | 'audio';

  /**
   * Attachment identifier (typically an mxc:// URL). Use the download file endpoint
   * to get a local file path.
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
   * Public URL or local file path to fetch the file. May be temporary or local-only
   * to this device; download promptly if durable access is needed.
   */
  srcURL?: string;

  /**
   * Attachment transcription if available.
   */
  transcription?: Attachment.Transcription;
}

export namespace Attachment {
  /**
   * Pixel dimensions of the attachment: width/height in px.
   */
  export interface Size {
    height?: number;

    width?: number;
  }

  /**
   * Attachment transcription if available.
   */
  export interface Transcription {
    /**
     * Transcription engine.
     */
    engine: string;

    /**
     * Transcribed text.
     */
    transcription: string;

    /**
     * Detected or selected language.
     */
    language?: string;
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
   * Chat ID. Input routes also accept the local chat ID from this Beeper Desktop
   * installation when available.
   */
  chatID: string;

  /**
   * Matrix-style fully-qualified sender user ID, usually including a bridge prefix
   * and homeserver.
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
   * Timestamp when the message was edited, if known.
   */
  editedTimestamp?: string;

  /**
   * True if the message has been deleted.
   */
  isDeleted?: boolean;

  /**
   * True if the message is hidden from normal display.
   */
  isHidden?: boolean;

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
   * Link previews included with this message, if any.
   */
  links?: Array<Message.Link>;

  /**
   * Mentioned user IDs, @room, or null for legacy messages that require text
   * scanning.
   */
  mentions?: Array<string> | null;

  /**
   * Reactions to the message, if any.
   */
  reactions?: Array<Reaction>;

  /**
   * Read receipt state for this message, when available.
   */
  seen?: boolean | string | { [key: string]: boolean | string };

  /**
   * Resolved sender display name (impersonator/full name/username/participant name).
   */
  senderName?: string;

  /**
   * Message send status for this message, when reported by the bridge.
   */
  sendStatus?: Message.SendStatus;

  /**
   * Matrix HTML body if present.
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

export namespace Message {
  /**
   * Link preview included with a message.
   */
  export interface Link {
    /**
     * Link preview title.
     */
    title: string;

    /**
     * Resolved link URL.
     */
    url: string;

    /**
     * Favicon URL if available. May be temporary or local-only to this device;
     * download promptly if durable access is needed.
     */
    favicon?: string;

    /**
     * Preview image URL if available. May be temporary or local-only to this device;
     * download promptly if durable access is needed.
     */
    img?: string;

    /**
     * Preview image dimensions.
     */
    imgSize?: Link.ImgSize;

    /**
     * Original URL when the displayed URL is shortened or redirected.
     */
    originalURL?: string;

    /**
     * Link preview summary.
     */
    summary?: string;
  }

  export namespace Link {
    /**
     * Preview image dimensions.
     */
    export interface ImgSize {
      height?: number;

      width?: number;
    }
  }

  /**
   * Message send status for this message, when reported by the bridge.
   */
  export interface SendStatus {
    /**
     * Current status of the message send attempt.
     */
    status: 'SUCCESS' | 'PENDING' | 'FAIL_RETRIABLE' | 'FAIL_PERMANENT';

    /**
     * Timestamp for the send status event.
     */
    timestamp: string;

    /**
     * User IDs the message was delivered to, when reported by the network.
     */
    deliveredToUsers?: Array<string>;

    /**
     * Internal bridge error detail. Intended for diagnostics, not end-user display.
     */
    internalError?: string;

    /**
     * Human-readable send status or failure message.
     */
    message?: string;

    /**
     * Machine-readable failure reason. Present when the send status is a failure.
     */
    reason?: string;
  }
}

export interface Reaction {
  /**
   * Reaction ID. When a participant can react more than once, the ID is the
   * participant ID concatenated with the reaction key; otherwise it equals the
   * participant ID.
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
   * Avatar image URL if available. This may be a remote URL, Matrix media URL, data
   * URL, or local filesystem URL depending on source and endpoint. May be temporary
   * or local-only to this device; download promptly if durable access is needed.
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

export type MessagesCursorNoLimit = CursorNoLimit<Message>;

export type MessagesCursorSearch = CursorSearch<Message>;
