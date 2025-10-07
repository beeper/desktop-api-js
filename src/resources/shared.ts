// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

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

export interface BaseResponse {
  success: boolean;

  error?: string;
}

export interface Error {
  /**
   * Error message
   */
  error: string;

  /**
   * Error code
   */
  code?: string;

  /**
   * Additional error details
   */
  details?: { [key: string]: string };
}

export interface Message {
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
