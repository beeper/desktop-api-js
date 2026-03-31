// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import MiniSearch from 'minisearch';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { getLogger } from './logger';

type PerLanguageData = {
  method?: string;
  example?: string;
};

type MethodEntry = {
  name: string;
  endpoint: string;
  httpMethod: string;
  summary: string;
  description: string;
  stainlessPath: string;
  qualified: string;
  params?: string[];
  response?: string;
  markdown?: string;
  perLanguage?: Record<string, PerLanguageData>;
};

type ProseChunk = {
  content: string;
  tag: string;
  sectionContext?: string;
  source?: string;
};

type MiniSearchDocument = {
  id: string;
  kind: 'http_method' | 'prose';
  name?: string;
  endpoint?: string;
  summary?: string;
  description?: string;
  qualified?: string;
  stainlessPath?: string;
  content?: string;
  sectionContext?: string;
  _original: Record<string, unknown>;
};

type SearchResult = {
  results: (string | Record<string, unknown>)[];
};

const EMBEDDED_METHODS: MethodEntry[] = [
  {
    name: 'focus',
    endpoint: '/v1/focus',
    httpMethod: 'post',
    summary: 'Focus Beeper Desktop app',
    description:
      'Focus Beeper Desktop and optionally navigate to a specific chat, message, or pre-fill draft text and attachment.',
    stainlessPath: '(resource) $client > (method) focus',
    qualified: 'client.focus',
    params: [
      'chatID?: string;',
      'draftAttachmentPath?: string;',
      'draftText?: string;',
      'messageID?: string;',
    ],
    response: '{ success: boolean; }',
    markdown:
      "## focus\n\n`client.focus(chatID?: string, draftAttachmentPath?: string, draftText?: string, messageID?: string): { success: boolean; }`\n\n**post** `/v1/focus`\n\nFocus Beeper Desktop and optionally navigate to a specific chat, message, or pre-fill draft text and attachment.\n\n### Parameters\n\n- `chatID?: string`\n  Optional Beeper chat ID (or local chat ID) to focus after opening the app. If omitted, only opens/focuses the app.\n\n- `draftAttachmentPath?: string`\n  Optional draft attachment path to populate in the message input field.\n\n- `draftText?: string`\n  Optional draft text to populate in the message input field.\n\n- `messageID?: string`\n  Optional message ID. Jumps to that message in the chat when opening.\n\n### Returns\n\n- `{ success: boolean; }`\n  Response indicating successful app focus action.\n\n  - `success: boolean`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst response = await client.focus();\n\nconsole.log(response);\n```",
  },
  {
    name: 'search',
    endpoint: '/v1/search',
    httpMethod: 'get',
    summary: 'Search',
    description:
      'Returns matching chats, participant name matches in groups, and the first page of messages in one call. Paginate messages via search-messages. Paginate chats via search-chats.',
    stainlessPath: '(resource) $client > (method) search',
    qualified: 'client.search',
    params: ['query: string;'],
    response:
      '{ results: { chats: object[]; in_groups: object[]; messages: { chats: object; hasMore: boolean; items: message[]; newestCursor: string; oldestCursor: string; }; }; }',
    markdown:
      "## search\n\n`client.search(query: string): { results: object; }`\n\n**get** `/v1/search`\n\nReturns matching chats, participant name matches in groups, and the first page of messages in one call. Paginate messages via search-messages. Paginate chats via search-chats.\n\n### Parameters\n\n- `query: string`\n  User-typed search text. Literal word matching (non-semantic).\n\n### Returns\n\n- `{ results: { chats: object[]; in_groups: object[]; messages: { chats: object; hasMore: boolean; items: message[]; newestCursor: string; oldestCursor: string; }; }; }`\n\n  - `results: { chats: { id: string; accountID: string; participants: { hasMore: boolean; items: user[]; total: number; }; title: string; type: 'single' | 'group'; unreadCount: number; isArchived?: boolean; isMuted?: boolean; isPinned?: boolean; lastActivity?: string; lastReadMessageSortKey?: string; localChatID?: string; }[]; in_groups: { id: string; accountID: string; participants: { hasMore: boolean; items: user[]; total: number; }; title: string; type: 'single' | 'group'; unreadCount: number; isArchived?: boolean; isMuted?: boolean; isPinned?: boolean; lastActivity?: string; lastReadMessageSortKey?: string; localChatID?: string; }[]; messages: { chats: object; hasMore: boolean; items: { id: string; accountID: string; chatID: string; senderID: string; sortKey: string; timestamp: string; attachments?: attachment[]; isSender?: boolean; isUnread?: boolean; linkedMessageID?: string; reactions?: reaction[]; senderName?: string; text?: string; type?: string; }[]; newestCursor: string; oldestCursor: string; }; }`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst response = await client.search({ query: 'x' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/accounts',
    httpMethod: 'get',
    summary: 'List connected accounts',
    description:
      'Lists chat accounts across networks (WhatsApp, Telegram, Twitter/X, etc.) actively connected to this Beeper Desktop instance',
    stainlessPath: '(resource) accounts > (method) list',
    qualified: 'client.accounts.list',
    response: '{ accountID: string; user: object; }[]',
    markdown:
      "## list\n\n`client.accounts.list(): object[]`\n\n**get** `/v1/accounts`\n\nLists chat accounts across networks (WhatsApp, Telegram, Twitter/X, etc.) actively connected to this Beeper Desktop instance\n\n### Returns\n\n- `{ accountID: string; user: object; }[]`\n  Connected accounts the user can act through. Includes accountID and user identity.\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst accounts = await client.accounts.list();\n\nconsole.log(accounts);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/accounts/{accountID}/contacts/list',
    httpMethod: 'get',
    summary: 'List contacts',
    description: 'List merged contacts for a specific account with cursor-based pagination.',
    stainlessPath: '(resource) accounts.contacts > (method) list',
    qualified: 'client.accounts.contacts.list',
    params: [
      'accountID: string;',
      'cursor?: string;',
      "direction?: 'after' | 'before';",
      'limit?: number;',
      'query?: string;',
    ],
    response:
      '{ id: string; cannotMessage?: boolean; email?: string; fullName?: string; imgURL?: string; isSelf?: boolean; phoneNumber?: string; username?: string; }',
    markdown:
      "## list\n\n`client.accounts.contacts.list(accountID: string, cursor?: string, direction?: 'after' | 'before', limit?: number, query?: string): { id: string; cannotMessage?: boolean; email?: string; fullName?: string; imgURL?: string; isSelf?: boolean; phoneNumber?: string; username?: string; }`\n\n**get** `/v1/accounts/{accountID}/contacts/list`\n\nList merged contacts for a specific account with cursor-based pagination.\n\n### Parameters\n\n- `accountID: string`\n  Account ID this resource belongs to.\n\n- `cursor?: string`\n  Opaque pagination cursor; do not inspect. Use together with 'direction'.\n\n- `direction?: 'after' | 'before'`\n  Pagination direction used with 'cursor': 'before' fetches older results, 'after' fetches newer results. Defaults to 'before' when only 'cursor' is provided.\n\n- `limit?: number`\n  Maximum contacts to return per page.\n\n- `query?: string`\n  Optional search query for blended contact lookup.\n\n### Returns\n\n- `{ id: string; cannotMessage?: boolean; email?: string; fullName?: string; imgURL?: string; isSelf?: boolean; phoneNumber?: string; username?: string; }`\n  User the account belongs to.\n\n  - `id: string`\n  - `cannotMessage?: boolean`\n  - `email?: string`\n  - `fullName?: string`\n  - `imgURL?: string`\n  - `isSelf?: boolean`\n  - `phoneNumber?: string`\n  - `username?: string`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\n// Automatically fetches more pages as needed.\nfor await (const user of client.accounts.contacts.list('accountID')) {\n  console.log(user);\n}\n```",
  },
  {
    name: 'search',
    endpoint: '/v1/accounts/{accountID}/contacts',
    httpMethod: 'get',
    summary: 'Search contacts',
    description:
      'Search contacts on a specific account using merged account contacts, network search, and exact identifier lookup.',
    stainlessPath: '(resource) accounts.contacts > (method) search',
    qualified: 'client.accounts.contacts.search',
    params: ['accountID: string;', 'query: string;'],
    response:
      '{ items: { id: string; cannotMessage?: boolean; email?: string; fullName?: string; imgURL?: string; isSelf?: boolean; phoneNumber?: string; username?: string; }[]; }',
    markdown:
      "## search\n\n`client.accounts.contacts.search(accountID: string, query: string): { items: user[]; }`\n\n**get** `/v1/accounts/{accountID}/contacts`\n\nSearch contacts on a specific account using merged account contacts, network search, and exact identifier lookup.\n\n### Parameters\n\n- `accountID: string`\n  Account ID this resource belongs to.\n\n- `query: string`\n  Text to search users by. Network-specific behavior.\n\n### Returns\n\n- `{ items: { id: string; cannotMessage?: boolean; email?: string; fullName?: string; imgURL?: string; isSelf?: boolean; phoneNumber?: string; username?: string; }[]; }`\n\n  - `items: { id: string; cannotMessage?: boolean; email?: string; fullName?: string; imgURL?: string; isSelf?: boolean; phoneNumber?: string; username?: string; }[]`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst response = await client.accounts.contacts.search('accountID', { query: 'x' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'create',
    endpoint: '/v1/chats',
    httpMethod: 'post',
    summary: 'Create or start a chat',
    description:
      "Create a single/group chat (mode='create') or start a direct chat from merged user data (mode='start').",
    stainlessPath: '(resource) chats > (method) create',
    qualified: 'client.chats.create',
    params: [
      'accountID: string;',
      'allowInvite?: boolean;',
      'messageText?: string;',
      "mode?: 'create' | 'start';",
      'participantIDs?: string[];',
      'title?: string;',
      "type?: 'single' | 'group';",
      'user?: { id?: string; email?: string; fullName?: string; phoneNumber?: string; username?: string; };',
    ],
    response: "{ chatID: string; status?: 'existing' | 'created'; }",
    markdown:
      "## create\n\n`client.chats.create(accountID: string, allowInvite?: boolean, messageText?: string, mode?: 'create' | 'start', participantIDs?: string[], title?: string, type?: 'single' | 'group', user?: { id?: string; email?: string; fullName?: string; phoneNumber?: string; username?: string; }): { chatID: string; status?: 'existing' | 'created'; }`\n\n**post** `/v1/chats`\n\nCreate a single/group chat (mode='create') or start a direct chat from merged user data (mode='start').\n\n### Parameters\n\n- `accountID: string`\n  Account to create or start the chat on.\n\n- `allowInvite?: boolean`\n  Whether invite-based DM creation is allowed when required by the platform. Used for mode='start'.\n\n- `messageText?: string`\n  Optional first message content if the platform requires it to create the chat.\n\n- `mode?: 'create' | 'start'`\n  Operation mode. Defaults to 'create' when omitted.\n\n- `participantIDs?: string[]`\n  Required when mode='create'. User IDs to include in the new chat.\n\n- `title?: string`\n  Optional title for group chats when mode='create'; ignored for single chats on most platforms.\n\n- `type?: 'single' | 'group'`\n  Required when mode='create'. 'single' requires exactly one participantID; 'group' supports multiple participants and optional title.\n\n- `user?: { id?: string; email?: string; fullName?: string; phoneNumber?: string; username?: string; }`\n  Required when mode='start'. Merged user-like contact payload used to resolve the best identifier.\n  - `id?: string`\n    Known user ID when available.\n  - `email?: string`\n    Email candidate.\n  - `fullName?: string`\n    Display name hint used for ranking only.\n  - `phoneNumber?: string`\n    Phone number candidate (E.164 preferred).\n  - `username?: string`\n    Username/handle candidate.\n\n### Returns\n\n- `{ chatID: string; status?: 'existing' | 'created'; }`\n\n  - `chatID: string`\n  - `status?: 'existing' | 'created'`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst chat = await client.chats.create({ accountID: 'accountID' });\n\nconsole.log(chat);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/v1/chats/{chatID}',
    httpMethod: 'get',
    summary: 'Retrieve chat details',
    description: 'Retrieve chat details including metadata, participants, and latest message',
    stainlessPath: '(resource) chats > (method) retrieve',
    qualified: 'client.chats.retrieve',
    params: ['chatID: string;', 'maxParticipantCount?: number;'],
    response:
      "{ id: string; accountID: string; participants: { hasMore: boolean; items: object[]; total: number; }; title: string; type: 'single' | 'group'; unreadCount: number; isArchived?: boolean; isMuted?: boolean; isPinned?: boolean; lastActivity?: string; lastReadMessageSortKey?: string; localChatID?: string; }",
    markdown:
      "## retrieve\n\n`client.chats.retrieve(chatID: string, maxParticipantCount?: number): { id: string; accountID: string; participants: object; title: string; type: 'single' | 'group'; unreadCount: number; isArchived?: boolean; isMuted?: boolean; isPinned?: boolean; lastActivity?: string; lastReadMessageSortKey?: string; localChatID?: string; }`\n\n**get** `/v1/chats/{chatID}`\n\nRetrieve chat details including metadata, participants, and latest message\n\n### Parameters\n\n- `chatID: string`\n  Unique identifier of the chat.\n\n- `maxParticipantCount?: number`\n  Maximum number of participants to return. Use -1 for all; otherwise 0–500. Defaults to all (-1).\n\n### Returns\n\n- `{ id: string; accountID: string; participants: { hasMore: boolean; items: object[]; total: number; }; title: string; type: 'single' | 'group'; unreadCount: number; isArchived?: boolean; isMuted?: boolean; isPinned?: boolean; lastActivity?: string; lastReadMessageSortKey?: string; localChatID?: string; }`\n\n  - `id: string`\n  - `accountID: string`\n  - `participants: { hasMore: boolean; items: { id: string; cannotMessage?: boolean; email?: string; fullName?: string; imgURL?: string; isSelf?: boolean; phoneNumber?: string; username?: string; }[]; total: number; }`\n  - `title: string`\n  - `type: 'single' | 'group'`\n  - `unreadCount: number`\n  - `isArchived?: boolean`\n  - `isMuted?: boolean`\n  - `isPinned?: boolean`\n  - `lastActivity?: string`\n  - `lastReadMessageSortKey?: string`\n  - `localChatID?: string`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst chat = await client.chats.retrieve('!NCdzlIaMjZUmvmvyHU:beeper.com');\n\nconsole.log(chat);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/chats',
    httpMethod: 'get',
    summary: 'List chats',
    description:
      'List all chats sorted by last activity (most recent first). Combines all accounts into a single paginated list.',
    stainlessPath: '(resource) chats > (method) list',
    qualified: 'client.chats.list',
    params: ['accountIDs?: string[];', 'cursor?: string;', "direction?: 'after' | 'before';"],
    response:
      "{ id: string; accountID: string; participants: { hasMore: boolean; items: user[]; total: number; }; title: string; type: 'single' | 'group'; unreadCount: number; isArchived?: boolean; isMuted?: boolean; isPinned?: boolean; lastActivity?: string; lastReadMessageSortKey?: string; localChatID?: string; }",
    markdown:
      "## list\n\n`client.chats.list(accountIDs?: string[], cursor?: string, direction?: 'after' | 'before'): object`\n\n**get** `/v1/chats`\n\nList all chats sorted by last activity (most recent first). Combines all accounts into a single paginated list.\n\n### Parameters\n\n- `accountIDs?: string[]`\n  Limit to specific account IDs. If omitted, fetches from all accounts.\n\n- `cursor?: string`\n  Opaque pagination cursor; do not inspect. Use together with 'direction'.\n\n- `direction?: 'after' | 'before'`\n  Pagination direction used with 'cursor': 'before' fetches older results, 'after' fetches newer results. Defaults to 'before' when only 'cursor' is provided.\n\n### Returns\n\n- `{ id: string; accountID: string; participants: { hasMore: boolean; items: user[]; total: number; }; title: string; type: 'single' | 'group'; unreadCount: number; isArchived?: boolean; isMuted?: boolean; isPinned?: boolean; lastActivity?: string; lastReadMessageSortKey?: string; localChatID?: string; }`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\n// Automatically fetches more pages as needed.\nfor await (const chatListResponse of client.chats.list()) {\n  console.log(chatListResponse);\n}\n```",
  },
  {
    name: 'archive',
    endpoint: '/v1/chats/{chatID}/archive',
    httpMethod: 'post',
    summary: 'Archive or unarchive a chat',
    description:
      'Archive or unarchive a chat. Set archived=true to move to archive, archived=false to move back to inbox',
    stainlessPath: '(resource) chats > (method) archive',
    qualified: 'client.chats.archive',
    params: ['chatID: string;', 'archived?: boolean;'],
    markdown:
      "## archive\n\n`client.chats.archive(chatID: string, archived?: boolean): void`\n\n**post** `/v1/chats/{chatID}/archive`\n\nArchive or unarchive a chat. Set archived=true to move to archive, archived=false to move back to inbox\n\n### Parameters\n\n- `chatID: string`\n  Unique identifier of the chat.\n\n- `archived?: boolean`\n  True to archive, false to unarchive\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nawait client.chats.archive('!NCdzlIaMjZUmvmvyHU:beeper.com')\n```",
  },
  {
    name: 'search',
    endpoint: '/v1/chats/search',
    httpMethod: 'get',
    summary: 'Search chats',
    description: "Search chats by title/network or participants using Beeper Desktop's renderer algorithm.",
    stainlessPath: '(resource) chats > (method) search',
    qualified: 'client.chats.search',
    params: [
      'accountIDs?: string[];',
      'cursor?: string;',
      "direction?: 'after' | 'before';",
      "inbox?: 'primary' | 'low-priority' | 'archive';",
      'includeMuted?: boolean;',
      'lastActivityAfter?: string;',
      'lastActivityBefore?: string;',
      'limit?: number;',
      'query?: string;',
      "scope?: 'titles' | 'participants';",
      "type?: 'single' | 'group' | 'any';",
      'unreadOnly?: boolean;',
    ],
    response:
      "{ id: string; accountID: string; participants: { hasMore: boolean; items: object[]; total: number; }; title: string; type: 'single' | 'group'; unreadCount: number; isArchived?: boolean; isMuted?: boolean; isPinned?: boolean; lastActivity?: string; lastReadMessageSortKey?: string; localChatID?: string; }",
    markdown:
      "## search\n\n`client.chats.search(accountIDs?: string[], cursor?: string, direction?: 'after' | 'before', inbox?: 'primary' | 'low-priority' | 'archive', includeMuted?: boolean, lastActivityAfter?: string, lastActivityBefore?: string, limit?: number, query?: string, scope?: 'titles' | 'participants', type?: 'single' | 'group' | 'any', unreadOnly?: boolean): { id: string; accountID: string; participants: object; title: string; type: 'single' | 'group'; unreadCount: number; isArchived?: boolean; isMuted?: boolean; isPinned?: boolean; lastActivity?: string; lastReadMessageSortKey?: string; localChatID?: string; }`\n\n**get** `/v1/chats/search`\n\nSearch chats by title/network or participants using Beeper Desktop's renderer algorithm.\n\n### Parameters\n\n- `accountIDs?: string[]`\n  Provide an array of account IDs to filter chats from specific messaging accounts only\n\n- `cursor?: string`\n  Opaque pagination cursor; do not inspect. Use together with 'direction'.\n\n- `direction?: 'after' | 'before'`\n  Pagination direction used with 'cursor': 'before' fetches older results, 'after' fetches newer results. Defaults to 'before' when only 'cursor' is provided.\n\n- `inbox?: 'primary' | 'low-priority' | 'archive'`\n  Filter by inbox type: \"primary\" (non-archived, non-low-priority), \"low-priority\", or \"archive\". If not specified, shows all chats.\n\n- `includeMuted?: boolean`\n  Include chats marked as Muted by the user, which are usually less important. Default: true. Set to false if the user wants a more refined search.\n\n- `lastActivityAfter?: string`\n  Provide an ISO datetime string to only retrieve chats with last activity after this time\n\n- `lastActivityBefore?: string`\n  Provide an ISO datetime string to only retrieve chats with last activity before this time\n\n- `limit?: number`\n  Set the maximum number of chats to retrieve. Valid range: 1-200, default is 50\n\n- `query?: string`\n  Literal token search (non-semantic). Use single words users type (e.g., \"dinner\"). When multiple words provided, ALL must match. Case-insensitive.\n\n- `scope?: 'titles' | 'participants'`\n  Search scope: 'titles' matches title + network; 'participants' matches participant names.\n\n- `type?: 'single' | 'group' | 'any'`\n  Specify the type of chats to retrieve: use \"single\" for direct messages, \"group\" for group chats, or \"any\" to get all types\n\n- `unreadOnly?: boolean`\n  Set to true to only retrieve chats that have unread messages\n\n### Returns\n\n- `{ id: string; accountID: string; participants: { hasMore: boolean; items: object[]; total: number; }; title: string; type: 'single' | 'group'; unreadCount: number; isArchived?: boolean; isMuted?: boolean; isPinned?: boolean; lastActivity?: string; lastReadMessageSortKey?: string; localChatID?: string; }`\n\n  - `id: string`\n  - `accountID: string`\n  - `participants: { hasMore: boolean; items: { id: string; cannotMessage?: boolean; email?: string; fullName?: string; imgURL?: string; isSelf?: boolean; phoneNumber?: string; username?: string; }[]; total: number; }`\n  - `title: string`\n  - `type: 'single' | 'group'`\n  - `unreadCount: number`\n  - `isArchived?: boolean`\n  - `isMuted?: boolean`\n  - `isPinned?: boolean`\n  - `lastActivity?: string`\n  - `lastReadMessageSortKey?: string`\n  - `localChatID?: string`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\n// Automatically fetches more pages as needed.\nfor await (const chat of client.chats.search()) {\n  console.log(chat);\n}\n```",
  },
  {
    name: 'create',
    endpoint: '/v1/chats/{chatID}/reminders',
    httpMethod: 'post',
    summary: 'Create a chat reminder',
    description: 'Set a reminder for a chat at a specific time',
    stainlessPath: '(resource) chats.reminders > (method) create',
    qualified: 'client.chats.reminders.create',
    params: ['chatID: string;', 'reminder: { remindAtMs: number; dismissOnIncomingMessage?: boolean; };'],
    markdown:
      "## create\n\n`client.chats.reminders.create(chatID: string, reminder: { remindAtMs: number; dismissOnIncomingMessage?: boolean; }): void`\n\n**post** `/v1/chats/{chatID}/reminders`\n\nSet a reminder for a chat at a specific time\n\n### Parameters\n\n- `chatID: string`\n  Unique identifier of the chat.\n\n- `reminder: { remindAtMs: number; dismissOnIncomingMessage?: boolean; }`\n  Reminder configuration\n  - `remindAtMs: number`\n    Unix timestamp in milliseconds when reminder should trigger\n  - `dismissOnIncomingMessage?: boolean`\n    Cancel reminder if someone messages in the chat\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nawait client.chats.reminders.create('!NCdzlIaMjZUmvmvyHU:beeper.com', { reminder: { remindAtMs: 0 } })\n```",
  },
  {
    name: 'delete',
    endpoint: '/v1/chats/{chatID}/reminders',
    httpMethod: 'delete',
    summary: 'Delete a chat reminder',
    description: 'Clear an existing reminder from a chat',
    stainlessPath: '(resource) chats.reminders > (method) delete',
    qualified: 'client.chats.reminders.delete',
    params: ['chatID: string;'],
    markdown:
      "## delete\n\n`client.chats.reminders.delete(chatID: string): void`\n\n**delete** `/v1/chats/{chatID}/reminders`\n\nClear an existing reminder from a chat\n\n### Parameters\n\n- `chatID: string`\n  Unique identifier of the chat.\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nawait client.chats.reminders.delete('!NCdzlIaMjZUmvmvyHU:beeper.com')\n```",
  },
  {
    name: 'delete',
    endpoint: '/v1/chats/{chatID}/messages/{messageID}/reactions',
    httpMethod: 'delete',
    summary: 'Remove a reaction',
    description: "Remove the authenticated user's reaction from an existing message.",
    stainlessPath: '(resource) chats.messages.reactions > (method) delete',
    qualified: 'client.chats.messages.reactions.delete',
    params: ['chatID: string;', 'messageID: string;', 'reactionKey: string;'],
    response: '{ chatID: string; messageID: string; reactionKey: string; success: true; }',
    markdown:
      "## delete\n\n`client.chats.messages.reactions.delete(chatID: string, messageID: string, reactionKey: string): { chatID: string; messageID: string; reactionKey: string; success: true; }`\n\n**delete** `/v1/chats/{chatID}/messages/{messageID}/reactions`\n\nRemove the authenticated user's reaction from an existing message.\n\n### Parameters\n\n- `chatID: string`\n  Unique identifier of the chat.\n\n- `messageID: string`\n\n- `reactionKey: string`\n  Reaction key to remove\n\n### Returns\n\n- `{ chatID: string; messageID: string; reactionKey: string; success: true; }`\n\n  - `chatID: string`\n  - `messageID: string`\n  - `reactionKey: string`\n  - `success: true`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst reaction = await client.chats.messages.reactions.delete('messageID', { chatID: '!NCdzlIaMjZUmvmvyHU:beeper.com', reactionKey: 'x' });\n\nconsole.log(reaction);\n```",
  },
  {
    name: 'add',
    endpoint: '/v1/chats/{chatID}/messages/{messageID}/reactions',
    httpMethod: 'post',
    summary: 'Add a reaction',
    description: 'Add a reaction to an existing message.',
    stainlessPath: '(resource) chats.messages.reactions > (method) add',
    qualified: 'client.chats.messages.reactions.add',
    params: ['chatID: string;', 'messageID: string;', 'reactionKey: string;', 'transactionID?: string;'],
    response:
      '{ chatID: string; messageID: string; reactionKey: string; success: true; transactionID: string; }',
    markdown:
      "## add\n\n`client.chats.messages.reactions.add(chatID: string, messageID: string, reactionKey: string, transactionID?: string): { chatID: string; messageID: string; reactionKey: string; success: true; transactionID: string; }`\n\n**post** `/v1/chats/{chatID}/messages/{messageID}/reactions`\n\nAdd a reaction to an existing message.\n\n### Parameters\n\n- `chatID: string`\n  Unique identifier of the chat.\n\n- `messageID: string`\n\n- `reactionKey: string`\n  Reaction key to add (emoji, shortcode, or custom emoji key)\n\n- `transactionID?: string`\n  Optional transaction ID for deduplication and local echo tracking\n\n### Returns\n\n- `{ chatID: string; messageID: string; reactionKey: string; success: true; transactionID: string; }`\n\n  - `chatID: string`\n  - `messageID: string`\n  - `reactionKey: string`\n  - `success: true`\n  - `transactionID: string`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst response = await client.chats.messages.reactions.add('messageID', { chatID: '!NCdzlIaMjZUmvmvyHU:beeper.com', reactionKey: 'x' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'update',
    endpoint: '/v1/chats/{chatID}/messages/{messageID}',
    httpMethod: 'put',
    summary: 'Edit a message',
    description: 'Edit the text content of an existing message. Messages with attachments cannot be edited.',
    stainlessPath: '(resource) messages > (method) update',
    qualified: 'client.messages.update',
    params: ['chatID: string;', 'messageID: string;', 'text: string;'],
    response: '{ chatID: string; messageID: string; success: boolean; }',
    markdown:
      "## update\n\n`client.messages.update(chatID: string, messageID: string, text: string): { chatID: string; messageID: string; success: boolean; }`\n\n**put** `/v1/chats/{chatID}/messages/{messageID}`\n\nEdit the text content of an existing message. Messages with attachments cannot be edited.\n\n### Parameters\n\n- `chatID: string`\n  Unique identifier of the chat.\n\n- `messageID: string`\n\n- `text: string`\n  New text content for the message\n\n### Returns\n\n- `{ chatID: string; messageID: string; success: boolean; }`\n\n  - `chatID: string`\n  - `messageID: string`\n  - `success: boolean`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst message = await client.messages.update('messageID', { chatID: '!NCdzlIaMjZUmvmvyHU:beeper.com', text: 'x' });\n\nconsole.log(message);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/chats/{chatID}/messages',
    httpMethod: 'get',
    summary: 'List messages',
    description: 'List all messages in a chat with cursor-based pagination. Sorted by timestamp.',
    stainlessPath: '(resource) messages > (method) list',
    qualified: 'client.messages.list',
    params: ['chatID: string;', 'cursor?: string;', "direction?: 'after' | 'before';"],
    response:
      "{ id: string; accountID: string; chatID: string; senderID: string; sortKey: string; timestamp: string; attachments?: { type: 'unknown' | 'img' | 'video' | 'audio'; id?: string; duration?: number; fileName?: string; fileSize?: number; isGif?: boolean; isSticker?: boolean; isVoiceNote?: boolean; mimeType?: string; posterImg?: string; size?: object; srcURL?: string; }[]; isSender?: boolean; isUnread?: boolean; linkedMessageID?: string; reactions?: { id: string; participantID: string; reactionKey: string; emoji?: boolean; imgURL?: string; }[]; senderName?: string; text?: string; type?: string; }",
    markdown:
      "## list\n\n`client.messages.list(chatID: string, cursor?: string, direction?: 'after' | 'before'): { id: string; accountID: string; chatID: string; senderID: string; sortKey: string; timestamp: string; attachments?: attachment[]; isSender?: boolean; isUnread?: boolean; linkedMessageID?: string; reactions?: reaction[]; senderName?: string; text?: string; type?: string; }`\n\n**get** `/v1/chats/{chatID}/messages`\n\nList all messages in a chat with cursor-based pagination. Sorted by timestamp.\n\n### Parameters\n\n- `chatID: string`\n  Unique identifier of the chat.\n\n- `cursor?: string`\n  Opaque pagination cursor; do not inspect. Use together with 'direction'.\n\n- `direction?: 'after' | 'before'`\n  Pagination direction used with 'cursor': 'before' fetches older results, 'after' fetches newer results. Defaults to 'before' when only 'cursor' is provided.\n\n### Returns\n\n- `{ id: string; accountID: string; chatID: string; senderID: string; sortKey: string; timestamp: string; attachments?: { type: 'unknown' | 'img' | 'video' | 'audio'; id?: string; duration?: number; fileName?: string; fileSize?: number; isGif?: boolean; isSticker?: boolean; isVoiceNote?: boolean; mimeType?: string; posterImg?: string; size?: object; srcURL?: string; }[]; isSender?: boolean; isUnread?: boolean; linkedMessageID?: string; reactions?: { id: string; participantID: string; reactionKey: string; emoji?: boolean; imgURL?: string; }[]; senderName?: string; text?: string; type?: string; }`\n\n  - `id: string`\n  - `accountID: string`\n  - `chatID: string`\n  - `senderID: string`\n  - `sortKey: string`\n  - `timestamp: string`\n  - `attachments?: { type: 'unknown' | 'img' | 'video' | 'audio'; id?: string; duration?: number; fileName?: string; fileSize?: number; isGif?: boolean; isSticker?: boolean; isVoiceNote?: boolean; mimeType?: string; posterImg?: string; size?: { height?: number; width?: number; }; srcURL?: string; }[]`\n  - `isSender?: boolean`\n  - `isUnread?: boolean`\n  - `linkedMessageID?: string`\n  - `reactions?: { id: string; participantID: string; reactionKey: string; emoji?: boolean; imgURL?: string; }[]`\n  - `senderName?: string`\n  - `text?: string`\n  - `type?: string`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\n// Automatically fetches more pages as needed.\nfor await (const message of client.messages.list('!NCdzlIaMjZUmvmvyHU:beeper.com')) {\n  console.log(message);\n}\n```",
  },
  {
    name: 'search',
    endpoint: '/v1/messages/search',
    httpMethod: 'get',
    summary: 'Search messages',
    description: "Search messages across chats using Beeper's message index",
    stainlessPath: '(resource) messages > (method) search',
    qualified: 'client.messages.search',
    params: [
      'accountIDs?: string[];',
      'chatIDs?: string[];',
      "chatType?: 'group' | 'single';",
      'cursor?: string;',
      'dateAfter?: string;',
      'dateBefore?: string;',
      "direction?: 'after' | 'before';",
      'excludeLowPriority?: boolean;',
      'includeMuted?: boolean;',
      'limit?: number;',
      "mediaTypes?: 'any' | 'video' | 'image' | 'link' | 'file'[];",
      'query?: string;',
      'sender?: string;',
    ],
    response:
      "{ id: string; accountID: string; chatID: string; senderID: string; sortKey: string; timestamp: string; attachments?: { type: 'unknown' | 'img' | 'video' | 'audio'; id?: string; duration?: number; fileName?: string; fileSize?: number; isGif?: boolean; isSticker?: boolean; isVoiceNote?: boolean; mimeType?: string; posterImg?: string; size?: object; srcURL?: string; }[]; isSender?: boolean; isUnread?: boolean; linkedMessageID?: string; reactions?: { id: string; participantID: string; reactionKey: string; emoji?: boolean; imgURL?: string; }[]; senderName?: string; text?: string; type?: string; }",
    markdown:
      "## search\n\n`client.messages.search(accountIDs?: string[], chatIDs?: string[], chatType?: 'group' | 'single', cursor?: string, dateAfter?: string, dateBefore?: string, direction?: 'after' | 'before', excludeLowPriority?: boolean, includeMuted?: boolean, limit?: number, mediaTypes?: 'any' | 'video' | 'image' | 'link' | 'file'[], query?: string, sender?: string): { id: string; accountID: string; chatID: string; senderID: string; sortKey: string; timestamp: string; attachments?: attachment[]; isSender?: boolean; isUnread?: boolean; linkedMessageID?: string; reactions?: reaction[]; senderName?: string; text?: string; type?: string; }`\n\n**get** `/v1/messages/search`\n\nSearch messages across chats using Beeper's message index\n\n### Parameters\n\n- `accountIDs?: string[]`\n  Limit search to specific account IDs.\n\n- `chatIDs?: string[]`\n  Limit search to specific chat IDs.\n\n- `chatType?: 'group' | 'single'`\n  Filter by chat type: 'group' for group chats, 'single' for 1:1 chats.\n\n- `cursor?: string`\n  Opaque pagination cursor; do not inspect. Use together with 'direction'.\n\n- `dateAfter?: string`\n  Only include messages with timestamp strictly after this ISO 8601 datetime (e.g., '2024-07-01T00:00:00Z' or '2024-07-01T00:00:00+02:00').\n\n- `dateBefore?: string`\n  Only include messages with timestamp strictly before this ISO 8601 datetime (e.g., '2024-07-31T23:59:59Z' or '2024-07-31T23:59:59+02:00').\n\n- `direction?: 'after' | 'before'`\n  Pagination direction used with 'cursor': 'before' fetches older results, 'after' fetches newer results. Defaults to 'before' when only 'cursor' is provided.\n\n- `excludeLowPriority?: boolean`\n  Exclude messages marked Low Priority by the user. Default: true. Set to false to include all.\n\n- `includeMuted?: boolean`\n  Include messages in chats marked as Muted by the user, which are usually less important. Default: true. Set to false if the user wants a more refined search.\n\n- `limit?: number`\n  Maximum number of messages to return.\n\n- `mediaTypes?: 'any' | 'video' | 'image' | 'link' | 'file'[]`\n  Filter messages by media types. Use ['any'] for any media type, or specify exact types like ['video', 'image']. Omit for no media filtering.\n\n- `query?: string`\n  Literal word search (non-semantic). Finds messages containing these EXACT words in any order. Use single words users actually type, not concepts or phrases. Example: use \"dinner\" not \"dinner plans\", use \"sick\" not \"health issues\". If omitted, returns results filtered only by other parameters.\n\n- `sender?: string`\n  Filter by sender: 'me' (messages sent by the authenticated user), 'others' (messages sent by others), or a specific user ID string (user.id).\n\n### Returns\n\n- `{ id: string; accountID: string; chatID: string; senderID: string; sortKey: string; timestamp: string; attachments?: { type: 'unknown' | 'img' | 'video' | 'audio'; id?: string; duration?: number; fileName?: string; fileSize?: number; isGif?: boolean; isSticker?: boolean; isVoiceNote?: boolean; mimeType?: string; posterImg?: string; size?: object; srcURL?: string; }[]; isSender?: boolean; isUnread?: boolean; linkedMessageID?: string; reactions?: { id: string; participantID: string; reactionKey: string; emoji?: boolean; imgURL?: string; }[]; senderName?: string; text?: string; type?: string; }`\n\n  - `id: string`\n  - `accountID: string`\n  - `chatID: string`\n  - `senderID: string`\n  - `sortKey: string`\n  - `timestamp: string`\n  - `attachments?: { type: 'unknown' | 'img' | 'video' | 'audio'; id?: string; duration?: number; fileName?: string; fileSize?: number; isGif?: boolean; isSticker?: boolean; isVoiceNote?: boolean; mimeType?: string; posterImg?: string; size?: { height?: number; width?: number; }; srcURL?: string; }[]`\n  - `isSender?: boolean`\n  - `isUnread?: boolean`\n  - `linkedMessageID?: string`\n  - `reactions?: { id: string; participantID: string; reactionKey: string; emoji?: boolean; imgURL?: string; }[]`\n  - `senderName?: string`\n  - `text?: string`\n  - `type?: string`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\n// Automatically fetches more pages as needed.\nfor await (const message of client.messages.search()) {\n  console.log(message);\n}\n```",
  },
  {
    name: 'send',
    endpoint: '/v1/chats/{chatID}/messages',
    httpMethod: 'post',
    summary: 'Send a message',
    description:
      'Send a text message to a specific chat. Supports replying to existing messages. Returns a pending message ID.',
    stainlessPath: '(resource) messages > (method) send',
    qualified: 'client.messages.send',
    params: [
      'chatID: string;',
      "attachment?: { uploadID: string; duration?: number; fileName?: string; mimeType?: string; size?: { height: number; width: number; }; type?: 'gif' | 'voiceNote' | 'sticker'; };",
      'replyToMessageID?: string;',
      'text?: string;',
    ],
    response: '{ chatID: string; pendingMessageID: string; }',
    markdown:
      "## send\n\n`client.messages.send(chatID: string, attachment?: { uploadID: string; duration?: number; fileName?: string; mimeType?: string; size?: { height: number; width: number; }; type?: 'gif' | 'voiceNote' | 'sticker'; }, replyToMessageID?: string, text?: string): { chatID: string; pendingMessageID: string; }`\n\n**post** `/v1/chats/{chatID}/messages`\n\nSend a text message to a specific chat. Supports replying to existing messages. Returns a pending message ID.\n\n### Parameters\n\n- `chatID: string`\n  Unique identifier of the chat.\n\n- `attachment?: { uploadID: string; duration?: number; fileName?: string; mimeType?: string; size?: { height: number; width: number; }; type?: 'gif' | 'voiceNote' | 'sticker'; }`\n  Single attachment to send with the message\n  - `uploadID: string`\n    Upload ID from uploadAsset endpoint. Required to reference uploaded files.\n  - `duration?: number`\n    Duration in seconds (optional override of cached value)\n  - `fileName?: string`\n    Filename (optional override of cached value)\n  - `mimeType?: string`\n    MIME type (optional override of cached value)\n  - `size?: { height: number; width: number; }`\n    Dimensions (optional override of cached value)\n  - `type?: 'gif' | 'voiceNote' | 'sticker'`\n    Special attachment type (gif, voiceNote, sticker). If omitted, auto-detected from mimeType\n\n- `replyToMessageID?: string`\n  Provide a message ID to send this as a reply to an existing message\n\n- `text?: string`\n  Text content of the message you want to send. You may use markdown.\n\n### Returns\n\n- `{ chatID: string; pendingMessageID: string; }`\n\n  - `chatID: string`\n  - `pendingMessageID: string`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst response = await client.messages.send('!NCdzlIaMjZUmvmvyHU:beeper.com');\n\nconsole.log(response);\n```",
  },
  {
    name: 'download',
    endpoint: '/v1/assets/download',
    httpMethod: 'post',
    summary: 'Download an asset',
    description:
      'Download a Matrix asset using its mxc:// or localmxc:// URL to the device running Beeper Desktop and return the local file URL.',
    stainlessPath: '(resource) assets > (method) download',
    qualified: 'client.assets.download',
    params: ['url: string;'],
    response: '{ error?: string; srcURL?: string; }',
    markdown:
      "## download\n\n`client.assets.download(url: string): { error?: string; srcURL?: string; }`\n\n**post** `/v1/assets/download`\n\nDownload a Matrix asset using its mxc:// or localmxc:// URL to the device running Beeper Desktop and return the local file URL.\n\n### Parameters\n\n- `url: string`\n  Matrix content URL (mxc:// or localmxc://) for the asset to download.\n\n### Returns\n\n- `{ error?: string; srcURL?: string; }`\n\n  - `error?: string`\n  - `srcURL?: string`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst response = await client.assets.download({ url: 'mxc://example.org/Q4x9CqGz1pB3Oa6XgJ' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'serve',
    endpoint: '/v1/assets/serve',
    httpMethod: 'get',
    summary: 'Serve an asset',
    description:
      'Stream a file given an mxc://, localmxc://, or file:// URL. Downloads first if not cached. Supports Range requests for seeking in large files.',
    stainlessPath: '(resource) assets > (method) serve',
    qualified: 'client.assets.serve',
    params: ['url: string;'],
    markdown:
      "## serve\n\n`client.assets.serve(url: string): void`\n\n**get** `/v1/assets/serve`\n\nStream a file given an mxc://, localmxc://, or file:// URL. Downloads first if not cached. Supports Range requests for seeking in large files.\n\n### Parameters\n\n- `url: string`\n  Asset URL to serve. Accepts mxc://, localmxc://, or file:// URLs.\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nawait client.assets.serve({ url: 'x' })\n```",
  },
  {
    name: 'upload',
    endpoint: '/v1/assets/upload',
    httpMethod: 'post',
    summary: 'Upload an asset',
    description:
      'Upload a file to a temporary location using multipart/form-data. Returns an uploadID that can be referenced when sending messages with attachments.',
    stainlessPath: '(resource) assets > (method) upload',
    qualified: 'client.assets.upload',
    params: ['file: string;', 'fileName?: string;', 'mimeType?: string;'],
    response:
      '{ duration?: number; error?: string; fileName?: string; fileSize?: number; height?: number; mimeType?: string; srcURL?: string; uploadID?: string; width?: number; }',
    markdown:
      "## upload\n\n`client.assets.upload(file: string, fileName?: string, mimeType?: string): { duration?: number; error?: string; fileName?: string; fileSize?: number; height?: number; mimeType?: string; srcURL?: string; uploadID?: string; width?: number; }`\n\n**post** `/v1/assets/upload`\n\nUpload a file to a temporary location using multipart/form-data. Returns an uploadID that can be referenced when sending messages with attachments.\n\n### Parameters\n\n- `file: string`\n  The file to upload (max 500 MB).\n\n- `fileName?: string`\n  Original filename. Defaults to the uploaded file name if omitted\n\n- `mimeType?: string`\n  MIME type. Auto-detected from magic bytes if omitted\n\n### Returns\n\n- `{ duration?: number; error?: string; fileName?: string; fileSize?: number; height?: number; mimeType?: string; srcURL?: string; uploadID?: string; width?: number; }`\n\n  - `duration?: number`\n  - `error?: string`\n  - `fileName?: string`\n  - `fileSize?: number`\n  - `height?: number`\n  - `mimeType?: string`\n  - `srcURL?: string`\n  - `uploadID?: string`\n  - `width?: number`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst response = await client.assets.upload({ file: fs.createReadStream('path/to/file') });\n\nconsole.log(response);\n```",
  },
  {
    name: 'upload_base64',
    endpoint: '/v1/assets/upload/base64',
    httpMethod: 'post',
    summary: 'Upload an asset (base64)',
    description:
      'Upload a file using a JSON body with base64-encoded content. Returns an uploadID that can be referenced when sending messages with attachments. Alternative to the multipart upload endpoint.',
    stainlessPath: '(resource) assets > (method) upload_base64',
    qualified: 'client.assets.uploadBase64',
    params: ['content: string;', 'fileName?: string;', 'mimeType?: string;'],
    response:
      '{ duration?: number; error?: string; fileName?: string; fileSize?: number; height?: number; mimeType?: string; srcURL?: string; uploadID?: string; width?: number; }',
    markdown:
      "## upload_base64\n\n`client.assets.uploadBase64(content: string, fileName?: string, mimeType?: string): { duration?: number; error?: string; fileName?: string; fileSize?: number; height?: number; mimeType?: string; srcURL?: string; uploadID?: string; width?: number; }`\n\n**post** `/v1/assets/upload/base64`\n\nUpload a file using a JSON body with base64-encoded content. Returns an uploadID that can be referenced when sending messages with attachments. Alternative to the multipart upload endpoint.\n\n### Parameters\n\n- `content: string`\n  Base64-encoded file content (max ~500MB decoded)\n\n- `fileName?: string`\n  Original filename. Generated if omitted\n\n- `mimeType?: string`\n  MIME type. Auto-detected from magic bytes if omitted\n\n### Returns\n\n- `{ duration?: number; error?: string; fileName?: string; fileSize?: number; height?: number; mimeType?: string; srcURL?: string; uploadID?: string; width?: number; }`\n\n  - `duration?: number`\n  - `error?: string`\n  - `fileName?: string`\n  - `fileSize?: number`\n  - `height?: number`\n  - `mimeType?: string`\n  - `srcURL?: string`\n  - `uploadID?: string`\n  - `width?: number`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst response = await client.assets.uploadBase64({ content: 'x' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/v1/info',
    httpMethod: 'get',
    summary: 'Get Connect server info',
    description:
      'Returns app, platform, server, and endpoint discovery metadata for this Beeper Desktop instance.',
    stainlessPath: '(resource) info > (method) retrieve',
    qualified: 'client.info.retrieve',
    response:
      '{ app: { bundle_id: string; name: string; version: string; }; endpoints: { mcp: string; oauth: { authorization_endpoint: string; introspection_endpoint: string; registration_endpoint: string; revocation_endpoint: string; token_endpoint: string; userinfo_endpoint: string; }; spec: string; ws_events: string; }; platform: { arch: string; os: string; release?: string; }; server: { base_url: string; hostname: string; mcp_enabled: boolean; port: number; remote_access: boolean; status: string; }; }',
    markdown:
      "## retrieve\n\n`client.info.retrieve(): { app: object; endpoints: object; platform: object; server: object; }`\n\n**get** `/v1/info`\n\nReturns app, platform, server, and endpoint discovery metadata for this Beeper Desktop instance.\n\n### Returns\n\n- `{ app: { bundle_id: string; name: string; version: string; }; endpoints: { mcp: string; oauth: { authorization_endpoint: string; introspection_endpoint: string; registration_endpoint: string; revocation_endpoint: string; token_endpoint: string; userinfo_endpoint: string; }; spec: string; ws_events: string; }; platform: { arch: string; os: string; release?: string; }; server: { base_url: string; hostname: string; mcp_enabled: boolean; port: number; remote_access: boolean; status: string; }; }`\n\n  - `app: { bundle_id: string; name: string; version: string; }`\n  - `endpoints: { mcp: string; oauth: { authorization_endpoint: string; introspection_endpoint: string; registration_endpoint: string; revocation_endpoint: string; token_endpoint: string; userinfo_endpoint: string; }; spec: string; ws_events: string; }`\n  - `platform: { arch: string; os: string; release?: string; }`\n  - `server: { base_url: string; hostname: string; mcp_enabled: boolean; port: number; remote_access: boolean; status: string; }`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst info = await client.info.retrieve();\n\nconsole.log(info);\n```",
  },
];

const EMBEDDED_READMES: { language: string; content: string }[] = [];

const INDEX_OPTIONS = {
  fields: [
    'name',
    'endpoint',
    'summary',
    'description',
    'qualified',
    'stainlessPath',
    'content',
    'sectionContext',
  ],
  storeFields: ['kind', '_original'],
  searchOptions: {
    prefix: true,
    fuzzy: 0.1,
    boost: {
      name: 5,
      stainlessPath: 3,
      endpoint: 3,
      qualified: 3,
      summary: 2,
      content: 1,
      description: 1,
    } as Record<string, number>,
  },
};

/**
 * Self-contained local search engine backed by MiniSearch.
 * Method data is embedded at SDK build time; prose documents
 * can be loaded from an optional docs directory at runtime.
 */
export class LocalDocsSearch {
  private methodIndex: MiniSearch<MiniSearchDocument>;
  private proseIndex: MiniSearch<MiniSearchDocument>;

  private constructor() {
    this.methodIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
    this.proseIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
  }

  static async create(opts?: { docsDir?: string }): Promise<LocalDocsSearch> {
    const instance = new LocalDocsSearch();
    instance.indexMethods(EMBEDDED_METHODS);
    for (const readme of EMBEDDED_READMES) {
      instance.indexProse(readme.content, `readme:${readme.language}`);
    }
    if (opts?.docsDir) {
      await instance.loadDocsDirectory(opts.docsDir);
    }
    return instance;
  }

  search(props: {
    query: string;
    language?: string;
    detail?: string;
    maxResults?: number;
    maxLength?: number;
  }): SearchResult {
    const { query, language = 'typescript', detail = 'default', maxResults = 5, maxLength = 100_000 } = props;

    const useMarkdown = detail === 'verbose' || detail === 'high';

    // Search both indices and merge results by score.
    // Filter prose hits so language-tagged content (READMEs and docs with
    // frontmatter) only matches the requested language.
    const methodHits = this.methodIndex
      .search(query)
      .map((hit) => ({ ...hit, _kind: 'http_method' as const }));
    const proseHits = this.proseIndex
      .search(query)
      .filter((hit) => {
        const source = ((hit as Record<string, unknown>)['_original'] as ProseChunk | undefined)?.source;
        if (!source) return true;
        // Check for language-tagged sources: "readme:<lang>" or "lang:<lang>:<filename>"
        let taggedLang: string | undefined;
        if (source.startsWith('readme:')) taggedLang = source.slice('readme:'.length);
        else if (source.startsWith('lang:')) taggedLang = source.split(':')[1];
        if (!taggedLang) return true;
        return taggedLang === language || (language === 'javascript' && taggedLang === 'typescript');
      })
      .map((hit) => ({ ...hit, _kind: 'prose' as const }));
    const merged = [...methodHits, ...proseHits].sort((a, b) => b.score - a.score);
    const top = merged.slice(0, maxResults);

    const fullResults: (string | Record<string, unknown>)[] = [];

    for (const hit of top) {
      const original = (hit as Record<string, unknown>)['_original'];
      if (hit._kind === 'http_method') {
        const m = original as MethodEntry;
        if (useMarkdown && m.markdown) {
          fullResults.push(m.markdown);
        } else {
          // Use per-language data when available, falling back to the
          // top-level fields (which are TypeScript-specific in the
          // legacy codepath).
          const langData = m.perLanguage?.[language];
          fullResults.push({
            method: langData?.method ?? m.qualified,
            summary: m.summary,
            description: m.description,
            endpoint: `${m.httpMethod.toUpperCase()} ${m.endpoint}`,
            ...(langData?.example ? { example: langData.example } : {}),
            ...(m.params ? { params: m.params } : {}),
            ...(m.response ? { response: m.response } : {}),
          });
        }
      } else {
        const c = original as ProseChunk;
        fullResults.push({
          content: c.content,
          ...(c.source ? { source: c.source } : {}),
        });
      }
    }

    let totalLength = 0;
    const results: (string | Record<string, unknown>)[] = [];
    for (const result of fullResults) {
      const len = typeof result === 'string' ? result.length : JSON.stringify(result).length;
      totalLength += len;
      if (totalLength > maxLength) break;
      results.push(result);
    }

    if (results.length < fullResults.length) {
      results.unshift(`Truncated; showing ${results.length} of ${fullResults.length} results.`);
    }

    return { results };
  }

  private indexMethods(methods: MethodEntry[]): void {
    const docs: MiniSearchDocument[] = methods.map((m, i) => ({
      id: `method-${i}`,
      kind: 'http_method' as const,
      name: m.name,
      endpoint: m.endpoint,
      summary: m.summary,
      description: m.description,
      qualified: m.qualified,
      stainlessPath: m.stainlessPath,
      _original: m as unknown as Record<string, unknown>,
    }));
    if (docs.length > 0) {
      this.methodIndex.addAll(docs);
    }
  }

  private async loadDocsDirectory(docsDir: string): Promise<void> {
    let entries;
    try {
      entries = await fs.readdir(docsDir, { withFileTypes: true });
    } catch (err) {
      getLogger().warn({ err, docsDir }, 'Could not read docs directory');
      return;
    }

    const files = entries
      .filter((e) => e.isFile())
      .filter((e) => e.name.endsWith('.md') || e.name.endsWith('.markdown') || e.name.endsWith('.json'));

    for (const file of files) {
      try {
        const filePath = path.join(docsDir, file.name);
        const content = await fs.readFile(filePath, 'utf-8');

        if (file.name.endsWith('.json')) {
          const texts = extractTexts(JSON.parse(content));
          if (texts.length > 0) {
            this.indexProse(texts.join('\n\n'), file.name);
          }
        } else {
          // Parse optional YAML frontmatter for language tagging.
          // Files with a "language" field in frontmatter will only
          // surface in searches for that language.
          //
          // Example:
          //   ---
          //   language: python
          //   ---
          //   # Error handling in Python
          //   ...
          const frontmatter = parseFrontmatter(content);
          const source = frontmatter.language ? `lang:${frontmatter.language}:${file.name}` : file.name;
          this.indexProse(content, source);
        }
      } catch (err) {
        getLogger().warn({ err, file: file.name }, 'Failed to index docs file');
      }
    }
  }

  private indexProse(markdown: string, source: string): void {
    const chunks = chunkMarkdown(markdown);
    const baseId = this.proseIndex.documentCount;

    const docs: MiniSearchDocument[] = chunks.map((chunk, i) => ({
      id: `prose-${baseId + i}`,
      kind: 'prose' as const,
      content: chunk.content,
      ...(chunk.sectionContext != null ? { sectionContext: chunk.sectionContext } : {}),
      _original: { ...chunk, source } as unknown as Record<string, unknown>,
    }));

    if (docs.length > 0) {
      this.proseIndex.addAll(docs);
    }
  }
}

/** Lightweight markdown chunker — splits on headers, chunks by word count. */
function chunkMarkdown(markdown: string): { content: string; tag: string; sectionContext?: string }[] {
  // Strip YAML frontmatter
  const stripped = markdown.replace(/^---\n[\s\S]*?\n---\n?/, '');
  const lines = stripped.split('\n');

  const chunks: { content: string; tag: string; sectionContext?: string }[] = [];
  const headers: string[] = [];
  let current: string[] = [];

  const flush = () => {
    const text = current.join('\n').trim();
    if (!text) return;
    const sectionContext = headers.length > 0 ? headers.join(' > ') : undefined;
    // Split into ~200-word chunks
    const words = text.split(/\s+/);
    for (let i = 0; i < words.length; i += 200) {
      const slice = words.slice(i, i + 200).join(' ');
      if (slice) {
        chunks.push({ content: slice, tag: 'p', ...(sectionContext != null ? { sectionContext } : {}) });
      }
    }
    current = [];
  };

  for (const line of lines) {
    const headerMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (headerMatch) {
      flush();
      const level = headerMatch[1]!.length;
      const text = headerMatch[2]!.trim();
      while (headers.length >= level) headers.pop();
      headers.push(text);
    } else {
      current.push(line);
    }
  }
  flush();

  return chunks;
}

/** Recursively extracts string values from a JSON structure. */
function extractTexts(data: unknown, depth = 0): string[] {
  if (depth > 10) return [];
  if (typeof data === 'string') return data.trim() ? [data] : [];
  if (Array.isArray(data)) return data.flatMap((item) => extractTexts(item, depth + 1));
  if (typeof data === 'object' && data !== null) {
    return Object.values(data).flatMap((v) => extractTexts(v, depth + 1));
  }
  return [];
}

/** Parses YAML frontmatter from a markdown string, extracting the language field if present. */
function parseFrontmatter(markdown: string): { language?: string } {
  const match = markdown.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const body = match[1] ?? '';
  const langMatch = body.match(/^language:\s*(.+)$/m);
  return langMatch ? { language: langMatch[1]!.trim() } : {};
}
