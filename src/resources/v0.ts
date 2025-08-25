// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { ChatsCursorID, MessagesCursorID } from './shared';
import { APIPromise } from '../core/api-promise';
import { CursorID, type CursorIDParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';

/**
 * Beeper Desktop API v0
 */
export class V0 extends APIResource {
  /**
   * Archive or unarchive a chat. Set archived=true to move to archive,
   * archived=false to move back to inbox
   *
   * @example
   * ```ts
   * const baseResponse = await client.v0.archiveChat({
   *   chatID:
   *     '!-5hI_iHR5vSDCtI8PzSDQT0H_3I:ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc.local-whatsapp.localhost',
   * });
   * ```
   */
  archiveChat(body: V0ArchiveChatParams, options?: RequestOptions): APIPromise<Shared.BaseResponse> {
    return this._client.post('/v0/archive-chat', { body, ...options });
  }

  /**
   * Clear an existing reminder from a chat
   *
   * @example
   * ```ts
   * const baseResponse = await client.v0.clearChatReminder({
   *   chatID:
   *     '!-5hI_iHR5vSDCtI8PzSDQT0H_3I:ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc.local-whatsapp.localhost',
   * });
   * ```
   */
  clearChatReminder(
    body: V0ClearChatReminderParams,
    options?: RequestOptions,
  ): APIPromise<Shared.BaseResponse> {
    return this._client.post('/v0/clear-chat-reminder', { body, ...options });
  }

  /**
   * Draft a message in a specific chat. This will be placed in the message input
   * field without sending
   *
   * @example
   * ```ts
   * const baseResponse = await client.v0.draftMessage({
   *   chatID:
   *     '!-5hI_iHR5vSDCtI8PzSDQT0H_3I:ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc.local-whatsapp.localhost',
   * });
   * ```
   */
  draftMessage(body: V0DraftMessageParams, options?: RequestOptions): APIPromise<Shared.BaseResponse> {
    return this._client.post('/v0/draft-message', { body, ...options });
  }

  /**
   * Search and filter conversations across all messaging accounts
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const chat of client.v0.findChats()) {
   *   // ...
   * }
   * ```
   */
  findChats(
    query: V0FindChatsParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ChatsCursorID, Shared.Chat> {
    return this._client.getAPIList('/v0/find-chats', CursorID<Shared.Chat>, { query, ...options });
  }

  /**
   * Bring Beeper Desktop to the foreground on this device
   *
   * @example
   * ```ts
   * const baseResponse = await client.v0.focusApp();
   * ```
   */
  focusApp(
    body: V0FocusAppParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Shared.BaseResponse> {
    return this._client.post('/v0/focus-app', { body, ...options });
  }

  /**
   * List connected Beeper accounts available on this device
   *
   * @example
   * ```ts
   * const accountsResponse = await client.v0.getAccounts();
   * ```
   */
  getAccounts(options?: RequestOptions): APIPromise<AccountsResponse> {
    return this._client.get('/v0/get-accounts', options);
  }

  /**
   * Retrieve chat details including metadata, participants, and latest message
   *
   * @example
   * ```ts
   * const getChatResponse = await client.v0.getChat({
   *   chatID:
   *     '!-5hI_iHR5vSDCtI8PzSDQT0H_3I:ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc.local-whatsapp.localhost',
   * });
   * ```
   */
  getChat(query: V0GetChatParams, options?: RequestOptions): APIPromise<GetChatResponse | null> {
    return this._client.get('/v0/get-chat', { query, ...options });
  }

  /**
   * Generate a deep link to a specific chat or message. This link can be used to
   * open the chat directly in the Beeper app.
   *
   * @example
   * ```ts
   * const linkResponse = await client.v0.getLinkToChat({
   *   chatID:
   *     '!-5hI_iHR5vSDCtI8PzSDQT0H_3I:ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc.local-whatsapp.localhost',
   * });
   * ```
   */
  getLinkToChat(body: V0GetLinkToChatParams, options?: RequestOptions): APIPromise<LinkResponse> {
    return this._client.post('/v0/get-link-to-chat', { body, ...options });
  }

  /**
   * Search messages across chats using Beeper's message index
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const message of client.v0.searchMessages()) {
   *   // ...
   * }
   * ```
   */
  searchMessages(
    query: V0SearchMessagesParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<MessagesCursorID, Shared.Message> {
    return this._client.getAPIList('/v0/search-messages', CursorID<Shared.Message>, { query, ...options });
  }

  /**
   * Send a text message to a specific chat. Supports replying to existing messages.
   * Returns the sent message ID and a deeplink to the chat
   *
   * @example
   * ```ts
   * const sendResponse = await client.v0.sendMessage({
   *   chatID:
   *     '!-5hI_iHR5vSDCtI8PzSDQT0H_3I:ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc.local-whatsapp.localhost',
   * });
   * ```
   */
  sendMessage(body: V0SendMessageParams, options?: RequestOptions): APIPromise<SendResponse> {
    return this._client.post('/v0/send-message', { body, ...options });
  }

  /**
   * Set a reminder for a chat at a specific time
   *
   * @example
   * ```ts
   * const baseResponse = await client.v0.setChatReminder({
   *   chatID:
   *     '!-5hI_iHR5vSDCtI8PzSDQT0H_3I:ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc.local-whatsapp.localhost',
   *   reminder: { remindAtMs: 0 },
   * });
   * ```
   */
  setChatReminder(body: V0SetChatReminderParams, options?: RequestOptions): APIPromise<Shared.BaseResponse> {
    return this._client.post('/v0/set-chat-reminder', { body, ...options });
  }
}

/**
 * Response payload for listing connected Beeper accounts.
 */
export interface AccountsResponse {
  /**
   * Connected accounts the user can act through. Includes accountID, network, and
   * user identity.
   */
  accounts: Array<Shared.Account>;
}

export interface ArchiveRequest {
  /**
   * The identifier of the chat to archive or unarchive
   */
  chatID: string;

  /**
   * True to archive, false to unarchive
   */
  archived?: boolean;
}

export interface ClearReminderRequest {
  /**
   * The identifier of the chat to clear reminder from
   */
  chatID: string;
}

export interface DraftRequest {
  /**
   * Provide the unique identifier of the chat where you want to draft a message
   */
  chatID: string;

  /**
   * Set to true to bring Beeper application to the foreground, or false to draft
   * silently in background
   */
  focusApp?: boolean;

  /**
   * Provide the text content you want to draft. This will be placed in the message
   * input field without sending
   */
  text?: string;
}

export interface FindChatsRequest {
  /**
   * Provide an array of account IDs to filter chats from specific messaging accounts
   * only
   */
  accountIDs?: Array<string>;

  /**
   * A cursor for use in pagination. ending_before is an object ID that defines your
   * place in the list. For instance, if you make a list request and receive 100
   * objects, starting with obj_bar, your subsequent call can include
   * ending_before=obj_bar in order to fetch the previous page of the list.
   */
  ending_before?: string;

  /**
   * Filter by inbox type: "primary" (non-archived, non-low-priority),
   * "low-priority", or "archive". If not specified, shows all chats.
   */
  inbox?: 'primary' | 'low-priority' | 'archive';

  /**
   * Include chats marked as Muted by the user, which are usually less important.
   * Default: true. Set to false if the user wants a more refined search.
   */
  includeMuted?: boolean;

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
   * Set the maximum number of chats to retrieve. Valid range: 1-200, default is 50
   */
  limit?: number;

  /**
   * Search string to filter chats by participant names. When multiple words
   * provided, ALL words must match. Searches in username, displayName, and fullName
   * fields.
   */
  participantQuery?: string;

  /**
   * Search string to filter chats by title. When multiple words provided, ALL words
   * must match. Matches are case-insensitive substrings.
   */
  query?: string;

  /**
   * A cursor for use in pagination. starting_after is an object ID that defines your
   * place in the list. For instance, if you make a list request and receive 100
   * objects, ending with obj_foo, your subsequent call can include
   * starting_after=obj_foo in order to fetch the next page of the list.
   */
  starting_after?: string;

  /**
   * Specify the type of chats to retrieve: use "single" for direct messages, "group"
   * for group chats, "channel" for channels, or "any" to get all types
   */
  type?: 'single' | 'group' | 'channel' | 'any';

  /**
   * Set to true to only retrieve chats that have unread messages
   */
  unreadOnly?: boolean;
}

export interface FindChatsResponse {
  /**
   * Chats matching the filters.
   */
  data: Array<Shared.Chat>;

  /**
   * Whether there are more items available after this set.
   */
  has_more: boolean;
}

/**
 * Bring Beeper Desktop to the foreground on this device and optionally jump to a
 * chat.
 */
export interface FocusRequest {
  /**
   * Optional Beeper chat ID to focus after bringing the app to foreground. If
   * omitted, only foregrounds the app. Required if messageSortKey is present. No-op
   * in headless environments.
   */
  chatID?: string;

  /**
   * Optional message sort key. Jumps to that message in the chat when foregrounding.
   */
  messageSortKey?: string;
}

export interface GetChatRequest {
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

export interface GetChatResponse {
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
  participants: GetChatResponse.Participants;

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

  /**
   * Local numeric chat ID specific to this Beeper Desktop installation. null for
   * iMessage chats.
   */
  localChatID?: number | null;
}

export namespace GetChatResponse {
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

/**
 * Request to foreground Beeper and optionally jump to a specific chat or message.
 */
export interface LinkRequest {
  /**
   * The ID of the chat to link to.
   */
  chatID: string;

  /**
   * Optional message sort key. Jumps to that message in the chat.
   */
  messageSortKey?: string;
}

/**
 * URL to open a specific chat or message.
 */
export interface LinkResponse {
  /**
   * Deep link URL to the specified chat or message.
   */
  url: string;
}

export interface SearchRequest {
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

export interface SearchResponse {
  /**
   * Map of chatID -> chat details for chats referenced in data.
   */
  chats: { [key: string]: Shared.Chat };

  /**
   * Messages matching the query and filters.
   */
  data: Array<Shared.Message>;

  /**
   * Whether there are more items available after this set.
   */
  has_more: boolean;
}

export interface SendRequest {
  /**
   * The identifier of the chat where the message will send
   */
  chatID: string;

  /**
   * Provide a message ID to send this as a reply to an existing message
   */
  replyToMessageID?: string;

  /**
   * Text content of the message you want to send. You may use markdown.
   */
  text?: string;
}

export interface SendResponse extends Shared.BaseResponse {
  /**
   * Link to the chat where the message was sent. This should always be shown to the
   * user.
   */
  deeplink: string;

  /**
   * Stable message ID.
   */
  messageID: string;
}

export interface SetReminderRequest {
  /**
   * The identifier of the chat to set reminder for
   */
  chatID: string;

  /**
   * Reminder configuration
   */
  reminder: SetReminderRequest.Reminder;
}

export namespace SetReminderRequest {
  /**
   * Reminder configuration
   */
  export interface Reminder {
    /**
     * Unix timestamp in milliseconds when reminder should trigger
     */
    remindAtMs: number;

    /**
     * Cancel reminder if someone messages in the chat
     */
    dismissOnIncomingMessage?: boolean;
  }
}

export interface V0ArchiveChatParams {
  /**
   * The identifier of the chat to archive or unarchive
   */
  chatID: string;

  /**
   * True to archive, false to unarchive
   */
  archived?: boolean;
}

export interface V0ClearChatReminderParams {
  /**
   * The identifier of the chat to clear reminder from
   */
  chatID: string;
}

export interface V0DraftMessageParams {
  /**
   * Provide the unique identifier of the chat where you want to draft a message
   */
  chatID: string;

  /**
   * Set to true to bring Beeper application to the foreground, or false to draft
   * silently in background
   */
  focusApp?: boolean;

  /**
   * Provide the text content you want to draft. This will be placed in the message
   * input field without sending
   */
  text?: string;
}

export interface V0FindChatsParams extends CursorIDParams {
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
  includeMuted?: boolean;

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
   * Search string to filter chats by participant names. When multiple words
   * provided, ALL words must match. Searches in username, displayName, and fullName
   * fields.
   */
  participantQuery?: string;

  /**
   * Search string to filter chats by title. When multiple words provided, ALL words
   * must match. Matches are case-insensitive substrings.
   */
  query?: string;

  /**
   * Specify the type of chats to retrieve: use "single" for direct messages, "group"
   * for group chats, "channel" for channels, or "any" to get all types
   */
  type?: 'single' | 'group' | 'channel' | 'any';

  /**
   * Set to true to only retrieve chats that have unread messages
   */
  unreadOnly?: boolean;
}

export interface V0FocusAppParams {
  /**
   * Optional Beeper chat ID to focus after bringing the app to foreground. If
   * omitted, only foregrounds the app. Required if messageSortKey is present. No-op
   * in headless environments.
   */
  chatID?: string;

  /**
   * Optional message sort key. Jumps to that message in the chat when foregrounding.
   */
  messageSortKey?: string;
}

export interface V0GetChatParams {
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

export interface V0GetLinkToChatParams {
  /**
   * The ID of the chat to link to.
   */
  chatID: string;

  /**
   * Optional message sort key. Jumps to that message in the chat.
   */
  messageSortKey?: string;
}

export interface V0SearchMessagesParams extends CursorIDParams {
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
}

export interface V0SendMessageParams {
  /**
   * The identifier of the chat where the message will send
   */
  chatID: string;

  /**
   * Provide a message ID to send this as a reply to an existing message
   */
  replyToMessageID?: string;

  /**
   * Text content of the message you want to send. You may use markdown.
   */
  text?: string;
}

export interface V0SetChatReminderParams {
  /**
   * The identifier of the chat to set reminder for
   */
  chatID: string;

  /**
   * Reminder configuration
   */
  reminder: V0SetChatReminderParams.Reminder;
}

export namespace V0SetChatReminderParams {
  /**
   * Reminder configuration
   */
  export interface Reminder {
    /**
     * Unix timestamp in milliseconds when reminder should trigger
     */
    remindAtMs: number;

    /**
     * Cancel reminder if someone messages in the chat
     */
    dismissOnIncomingMessage?: boolean;
  }
}

export declare namespace V0 {
  export {
    type AccountsResponse as AccountsResponse,
    type ArchiveRequest as ArchiveRequest,
    type ClearReminderRequest as ClearReminderRequest,
    type DraftRequest as DraftRequest,
    type FindChatsRequest as FindChatsRequest,
    type FindChatsResponse as FindChatsResponse,
    type FocusRequest as FocusRequest,
    type GetChatRequest as GetChatRequest,
    type GetChatResponse as GetChatResponse,
    type LinkRequest as LinkRequest,
    type LinkResponse as LinkResponse,
    type SearchRequest as SearchRequest,
    type SearchResponse as SearchResponse,
    type SendRequest as SendRequest,
    type SendResponse as SendResponse,
    type SetReminderRequest as SetReminderRequest,
    type V0ArchiveChatParams as V0ArchiveChatParams,
    type V0ClearChatReminderParams as V0ClearChatReminderParams,
    type V0DraftMessageParams as V0DraftMessageParams,
    type V0FindChatsParams as V0FindChatsParams,
    type V0FocusAppParams as V0FocusAppParams,
    type V0GetChatParams as V0GetChatParams,
    type V0GetLinkToChatParams as V0GetLinkToChatParams,
    type V0SearchMessagesParams as V0SearchMessagesParams,
    type V0SendMessageParams as V0SendMessageParams,
    type V0SetChatReminderParams as V0SetChatReminderParams,
  };
}

export { type ChatsCursorID, type MessagesCursorID };
