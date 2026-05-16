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
      'Focus Beeper Desktop and optionally navigate to a specific chat, message, or pre-fill plain text and an image path.',
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
      "## focus\n\n`client.focus(chatID?: string, draftAttachmentPath?: string, draftText?: string, messageID?: string): { success: boolean; }`\n\n**post** `/v1/focus`\n\nFocus Beeper Desktop and optionally navigate to a specific chat, message, or pre-fill plain text and an image path.\n\n### Parameters\n\n- `chatID?: string`\n  Optional Beeper chat ID (or local chat ID) to focus after opening the app. If omitted, only opens/focuses the app.\n\n- `draftAttachmentPath?: string`\n  Optional image path to populate in the message input field.\n\n- `draftText?: string`\n  Optional plain text to populate in the message input field.\n\n- `messageID?: string`\n  Optional message ID. Jumps to that message in the chat when opening.\n\n### Returns\n\n- `{ success: boolean; }`\n  Response indicating successful app focus action.\n\n  - `success: boolean`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst response = await client.focus();\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.focus',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.focus();\n\nconsole.log(response.success);",
      },
      python: {
        method: 'focus',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.focus()\nprint(response.success)',
      },
      go: {
        method: 'client.Focus',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.Focus(context.TODO(), beeperdesktopapi.FocusParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Success)\n}\n',
      },
      cli: {
        method: '$client focus',
        example: "beeper-desktop-cli focus \\\n  --access-token 'My Access Token'",
      },
      php: {
        method: 'focus',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->focus(\n  chatID: '!NCdzlIaMjZUmvmvyHU:beeper.com',\n  draftAttachmentPath: 'draftAttachmentPath',\n  draftText: 'draftText',\n  messageID: 'messageID',\n);\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl http://localhost:23373/v1/focus \\\n    -X POST \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
    },
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
      "## search\n\n`client.search(query: string): { results: object; }`\n\n**get** `/v1/search`\n\nReturns matching chats, participant name matches in groups, and the first page of messages in one call. Paginate messages via search-messages. Paginate chats via search-chats.\n\n### Parameters\n\n- `query: string`\n  User-typed search text. Literal word matching (non-semantic).\n\n### Returns\n\n- `{ results: { chats: object[]; in_groups: object[]; messages: { chats: object; hasMore: boolean; items: message[]; newestCursor: string; oldestCursor: string; }; }; }`\n\n  - `results: { chats: { id: string; accountID: string; network: string; participants: { hasMore: boolean; items: user[]; total: number; }; title: string; type: 'single' | 'group'; unreadCount: number; capabilities?: { allowedReactions?: string[]; archive?: boolean; attachments?: object; customEmojiReactions?: boolean; delete?: -2 | -1 | 0 | 1 | 2; deleteChat?: boolean; deleteChatForEveryone?: boolean; deleteForMe?: boolean; deleteMaxAge?: number; disappearingTimer?: object; edit?: -2 | -1 | 0 | 1 | 2; editMaxAge?: number; editMaxCount?: number; formatting?: object; locationMessage?: -2 | -1 | 0 | 1 | 2; markAsUnread?: boolean; maxTextLength?: number; messageRequest?: object; participantActions?: object; poll?: -2 | -1 | 0 | 1 | 2; reaction?: -2 | -1 | 0 | 1 | 2; reactionCount?: number; readReceipts?: boolean; reply?: -2 | -1 | 0 | 1 | 2; state?: object; thread?: -2 | -1 | 0 | 1 | 2; typingNotifications?: boolean; }; description?: string; draft?: { text: string; attachments?: object; }; imgURL?: string; isArchived?: boolean; isLowPriority?: boolean; isMarkedUnread?: boolean; isMuted?: boolean; isPinned?: boolean; isReadOnly?: boolean; lastActivity?: string; lastReadMessageSortKey?: string; localChatID?: string; messageExpirySeconds?: number; reminder?: { dismissOnIncomingMessage?: boolean; remindAt?: string; }; snooze?: { snoozeUntil?: string; userSnoozedAt?: string; }; unreadMentionsCount?: number; }[]; in_groups: { id: string; accountID: string; network: string; participants: { hasMore: boolean; items: user[]; total: number; }; title: string; type: 'single' | 'group'; unreadCount: number; capabilities?: { allowedReactions?: string[]; archive?: boolean; attachments?: object; customEmojiReactions?: boolean; delete?: -2 | -1 | 0 | 1 | 2; deleteChat?: boolean; deleteChatForEveryone?: boolean; deleteForMe?: boolean; deleteMaxAge?: number; disappearingTimer?: object; edit?: -2 | -1 | 0 | 1 | 2; editMaxAge?: number; editMaxCount?: number; formatting?: object; locationMessage?: -2 | -1 | 0 | 1 | 2; markAsUnread?: boolean; maxTextLength?: number; messageRequest?: object; participantActions?: object; poll?: -2 | -1 | 0 | 1 | 2; reaction?: -2 | -1 | 0 | 1 | 2; reactionCount?: number; readReceipts?: boolean; reply?: -2 | -1 | 0 | 1 | 2; state?: object; thread?: -2 | -1 | 0 | 1 | 2; typingNotifications?: boolean; }; description?: string; draft?: { text: string; attachments?: object; }; imgURL?: string; isArchived?: boolean; isLowPriority?: boolean; isMarkedUnread?: boolean; isMuted?: boolean; isPinned?: boolean; isReadOnly?: boolean; lastActivity?: string; lastReadMessageSortKey?: string; localChatID?: string; messageExpirySeconds?: number; reminder?: { dismissOnIncomingMessage?: boolean; remindAt?: string; }; snooze?: { snoozeUntil?: string; userSnoozedAt?: string; }; unreadMentionsCount?: number; }[]; messages: { chats: object; hasMore: boolean; items: { id: string; accountID: string; chatID: string; senderID: string; sortKey: string; timestamp: string; attachments?: attachment[]; editedTimestamp?: string; isDeleted?: boolean; isHidden?: boolean; isSender?: boolean; isUnread?: boolean; linkedMessageID?: string; links?: object[]; mentions?: string[]; reactions?: reaction[]; seen?: boolean | string | object; senderName?: string; sendStatus?: object; text?: string; type?: string; }[]; newestCursor: string; oldestCursor: string; }; }`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst response = await client.search({ query: 'x' });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.search',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.search({ query: 'x' });\n\nconsole.log(response.results);",
      },
      python: {
        method: 'search',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.search(\n    query="x",\n)\nprint(response.results)',
      },
      go: {
        method: 'client.Search',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.Search(context.TODO(), beeperdesktopapi.SearchParams{\n\t\tQuery: "x",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Results)\n}\n',
      },
      cli: {
        method: '$client search',
        example: "beeper-desktop-cli search \\\n  --access-token 'My Access Token' \\\n  --query x",
      },
      php: {
        method: 'search',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->search(query: 'x');\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl http://localhost:23373/v1/search \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v1/accounts',
    httpMethod: 'get',
    summary: 'List Chat Accounts',
    description:
      'List Chat Accounts connected to this Beeper Desktop instance, including bridge metadata and network identity.',
    stainlessPath: '(resource) accounts > (method) list',
    qualified: 'client.accounts.list',
    response:
      "{ accountID: string; bridge: { id: string; provider: 'cloud' | 'self-hosted' | 'local' | 'platform-sdk'; type: string; }; user: object; network?: string; }[]",
    markdown:
      "## list\n\n`client.accounts.list(): object[]`\n\n**get** `/v1/accounts`\n\nList Chat Accounts connected to this Beeper Desktop instance, including bridge metadata and network identity.\n\n### Returns\n\n- `{ accountID: string; bridge: { id: string; provider: 'cloud' | 'self-hosted' | 'local' | 'platform-sdk'; type: string; }; user: object; network?: string; }[]`\n  Accounts configured on this device. Includes accountID, bridge metadata, optional network name, and user identity.\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst accounts = await client.accounts.list();\n\nconsole.log(accounts);\n```",
    perLanguage: {
      typescript: {
        method: 'client.accounts.list',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst accounts = await client.accounts.list();\n\nconsole.log(accounts);",
      },
      python: {
        method: 'accounts.list',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\naccounts = client.accounts.list()\nprint(accounts)',
      },
      go: {
        method: 'client.Accounts.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\taccounts, err := client.Accounts.List(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", accounts)\n}\n',
      },
      cli: {
        method: 'accounts list',
        example: "beeper-desktop-cli accounts list \\\n  --access-token 'My Access Token'",
      },
      php: {
        method: 'accounts->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$accounts = $client->accounts->list();\n\nvar_dump($accounts);",
      },
      http: {
        example:
          'curl http://localhost:23373/v1/accounts \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.accounts.contacts.search',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.accounts.contacts.search('accountID', { query: 'x' });\n\nconsole.log(response.items);",
      },
      python: {
        method: 'accounts.contacts.search',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.accounts.contacts.search(\n    account_id="accountID",\n    query="x",\n)\nprint(response.items)',
      },
      go: {
        method: 'client.Accounts.Contacts.Search',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.Accounts.Contacts.Search(\n\t\tcontext.TODO(),\n\t\t"accountID",\n\t\tbeeperdesktopapi.AccountContactSearchParams{\n\t\t\tQuery: "x",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Items)\n}\n',
      },
      cli: {
        method: 'contacts search',
        example:
          "beeper-desktop-cli accounts:contacts search \\\n  --access-token 'My Access Token' \\\n  --account-id accountID \\\n  --query x",
      },
      php: {
        method: 'accounts->contacts->search',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->accounts->contacts->search('accountID', query: 'x');\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl http://localhost:23373/v1/accounts/$ACCOUNT_ID/contacts \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.accounts.contacts.list',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const user of client.accounts.contacts.list('accountID')) {\n  console.log(user.id);\n}",
      },
      python: {
        method: 'accounts.contacts.list',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\npage = client.accounts.contacts.list(\n    account_id="accountID",\n)\npage = page.items[0]\nprint(page.id)',
      },
      go: {
        method: 'client.Accounts.Contacts.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tpage, err := client.Accounts.Contacts.List(\n\t\tcontext.TODO(),\n\t\t"accountID",\n\t\tbeeperdesktopapi.AccountContactListParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      cli: {
        method: 'contacts list',
        example:
          "beeper-desktop-cli accounts:contacts list \\\n  --access-token 'My Access Token' \\\n  --account-id accountID",
      },
      php: {
        method: 'accounts->contacts->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$page = $client->accounts->contacts->list(\n  'accountID',\n  cursor: '1725489123456|c29tZUltc2dQYWdl',\n  direction: 'before',\n  limit: 1,\n  query: 'x',\n);\n\nvar_dump($page);",
      },
      http: {
        example:
          'curl http://localhost:23373/v1/accounts/$ACCOUNT_ID/contacts/list \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v1/bridges',
    httpMethod: 'get',
    summary: 'List bridges',
    description:
      'List bridge-backed account types that can be shown in add-account flows, grouped with connected accounts that use the same Account schema as GET /v1/accounts.',
    stainlessPath: '(resource) bridges > (method) list',
    qualified: 'client.bridges.list',
    response:
      "{ items: { accounts: account[]; activeAccountCount: number; bridge: object; displayName: string; loginMode: string; status: 'available' | 'connected' | 'limit_reached' | 'temporarily_unavailable'; network?: string; statusText?: string; }[]; }",
    markdown:
      "## list\n\n`client.bridges.list(): { items: bridge_availability[]; }`\n\n**get** `/v1/bridges`\n\nList bridge-backed account types that can be shown in add-account flows, grouped with connected accounts that use the same Account schema as GET /v1/accounts.\n\n### Returns\n\n- `{ items: { accounts: account[]; activeAccountCount: number; bridge: object; displayName: string; loginMode: string; status: 'available' | 'connected' | 'limit_reached' | 'temporarily_unavailable'; network?: string; statusText?: string; }[]; }`\n  Bridge-backed account types and their connected accounts.\n\n  - `items: { accounts: { accountID: string; bridge: object; user: user; network?: string; }[]; activeAccountCount: number; bridge: { id: string; provider: 'cloud' | 'self-hosted' | 'local' | 'platform-sdk'; type: string; }; displayName: string; loginMode: string; status: 'available' | 'connected' | 'limit_reached' | 'temporarily_unavailable'; network?: string; statusText?: string; }[]`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst bridges = await client.bridges.list();\n\nconsole.log(bridges);\n```",
    perLanguage: {
      typescript: {
        method: 'client.bridges.list',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst bridges = await client.bridges.list();\n\nconsole.log(bridges.items);",
      },
      python: {
        method: 'bridges.list',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nbridges = client.bridges.list()\nprint(bridges.items)',
      },
      go: {
        method: 'client.Bridges.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tbridges, err := client.Bridges.List(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", bridges.Items)\n}\n',
      },
      cli: {
        method: 'bridges list',
        example: "beeper-desktop-cli bridges list \\\n  --access-token 'My Access Token'",
      },
      php: {
        method: 'bridges->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$bridges = $client->bridges->list();\n\nvar_dump($bridges);",
      },
      http: {
        example:
          'curl http://localhost:23373/v1/bridges \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
    },
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
      "{ id: string; accountID: string; network: string; participants: object; title: string; type: 'single' | 'group'; unreadCount: number; capabilities?: object; description?: string; draft?: object; imgURL?: string; isArchived?: boolean; isLowPriority?: boolean; isMarkedUnread?: boolean; isMuted?: boolean; isPinned?: boolean; isReadOnly?: boolean; lastActivity?: string; lastReadMessageSortKey?: string; localChatID?: string; messageExpirySeconds?: number; reminder?: object; snooze?: object; unreadMentionsCount?: number; }",
    markdown:
      "## retrieve\n\n`client.chats.retrieve(chatID: string, maxParticipantCount?: number): { id: string; accountID: string; network: string; participants: object; title: string; type: 'single' | 'group'; unreadCount: number; capabilities?: object; description?: string; draft?: object; imgURL?: string; isArchived?: boolean; isLowPriority?: boolean; isMarkedUnread?: boolean; isMuted?: boolean; isPinned?: boolean; isReadOnly?: boolean; lastActivity?: string; lastReadMessageSortKey?: string; localChatID?: string; messageExpirySeconds?: number; reminder?: object; snooze?: object; unreadMentionsCount?: number; }`\n\n**get** `/v1/chats/{chatID}`\n\nRetrieve chat details including metadata, participants, and latest message\n\n### Parameters\n\n- `chatID: string`\n  Chat ID. Input routes also accept the local chat ID from this Beeper Desktop installation when available.\n\n- `maxParticipantCount?: number`\n  Maximum number of participants to return. Use -1 for all; otherwise 0-500. Defaults to 100. List and search endpoints return up to 20 participants per chat.\n\n### Returns\n\n- `{ id: string; accountID: string; network: string; participants: { hasMore: boolean; items: object[]; total: number; }; title: string; type: 'single' | 'group'; unreadCount: number; capabilities?: { allowedReactions?: string[]; archive?: boolean; attachments?: object; customEmojiReactions?: boolean; delete?: -2 | -1 | 0 | 1 | 2; deleteChat?: boolean; deleteChatForEveryone?: boolean; deleteForMe?: boolean; deleteMaxAge?: number; disappearingTimer?: { omitEmptyTimer?: boolean; timers?: number[]; types?: 'afterRead' | 'afterSend'[]; }; edit?: -2 | -1 | 0 | 1 | 2; editMaxAge?: number; editMaxCount?: number; formatting?: object; locationMessage?: -2 | -1 | 0 | 1 | 2; markAsUnread?: boolean; maxTextLength?: number; messageRequest?: { acceptWithButton?: -2 | -1 | 0 | 1 | 2; acceptWithMessage?: -2 | -1 | 0 | 1 | 2; }; participantActions?: { ban?: -2 | -1 | 0 | 1 | 2; invite?: -2 | -1 | 0 | 1 | 2; kick?: -2 | -1 | 0 | 1 | 2; leave?: -2 | -1 | 0 | 1 | 2; revokeInvite?: -2 | -1 | 0 | 1 | 2; }; poll?: -2 | -1 | 0 | 1 | 2; reaction?: -2 | -1 | 0 | 1 | 2; reactionCount?: number; readReceipts?: boolean; reply?: -2 | -1 | 0 | 1 | 2; state?: { avatar?: object; description?: object; disappearingTimer?: object; title?: object; }; thread?: -2 | -1 | 0 | 1 | 2; typingNotifications?: boolean; }; description?: string; draft?: { text: string; attachments?: object; }; imgURL?: string; isArchived?: boolean; isLowPriority?: boolean; isMarkedUnread?: boolean; isMuted?: boolean; isPinned?: boolean; isReadOnly?: boolean; lastActivity?: string; lastReadMessageSortKey?: string; localChatID?: string; messageExpirySeconds?: number; reminder?: { dismissOnIncomingMessage?: boolean; remindAt?: string; }; snooze?: { snoozeUntil?: string; userSnoozedAt?: string; }; unreadMentionsCount?: number; }`\n\n  - `id: string`\n  - `accountID: string`\n  - `network: string`\n  - `participants: { hasMore: boolean; items: { id: string; cannotMessage?: boolean; email?: string; fullName?: string; imgURL?: string; isSelf?: boolean; phoneNumber?: string; username?: string; }[]; total: number; }`\n  - `title: string`\n  - `type: 'single' | 'group'`\n  - `unreadCount: number`\n  - `capabilities?: { allowedReactions?: string[]; archive?: boolean; attachments?: object; customEmojiReactions?: boolean; delete?: -2 | -1 | 0 | 1 | 2; deleteChat?: boolean; deleteChatForEveryone?: boolean; deleteForMe?: boolean; deleteMaxAge?: number; disappearingTimer?: { omitEmptyTimer?: boolean; timers?: number[]; types?: 'afterRead' | 'afterSend'[]; }; edit?: -2 | -1 | 0 | 1 | 2; editMaxAge?: number; editMaxCount?: number; formatting?: object; locationMessage?: -2 | -1 | 0 | 1 | 2; markAsUnread?: boolean; maxTextLength?: number; messageRequest?: { acceptWithButton?: -2 | -1 | 0 | 1 | 2; acceptWithMessage?: -2 | -1 | 0 | 1 | 2; }; participantActions?: { ban?: -2 | -1 | 0 | 1 | 2; invite?: -2 | -1 | 0 | 1 | 2; kick?: -2 | -1 | 0 | 1 | 2; leave?: -2 | -1 | 0 | 1 | 2; revokeInvite?: -2 | -1 | 0 | 1 | 2; }; poll?: -2 | -1 | 0 | 1 | 2; reaction?: -2 | -1 | 0 | 1 | 2; reactionCount?: number; readReceipts?: boolean; reply?: -2 | -1 | 0 | 1 | 2; state?: { avatar?: { level: -2 | -1 | 0 | 1 | 2; }; description?: { level: -2 | -1 | 0 | 1 | 2; }; disappearingTimer?: { level: -2 | -1 | 0 | 1 | 2; }; title?: { level: -2 | -1 | 0 | 1 | 2; }; }; thread?: -2 | -1 | 0 | 1 | 2; typingNotifications?: boolean; }`\n  - `description?: string`\n  - `draft?: { text: string; attachments?: object; }`\n  - `imgURL?: string`\n  - `isArchived?: boolean`\n  - `isLowPriority?: boolean`\n  - `isMarkedUnread?: boolean`\n  - `isMuted?: boolean`\n  - `isPinned?: boolean`\n  - `isReadOnly?: boolean`\n  - `lastActivity?: string`\n  - `lastReadMessageSortKey?: string`\n  - `localChatID?: string`\n  - `messageExpirySeconds?: number`\n  - `reminder?: { dismissOnIncomingMessage?: boolean; remindAt?: string; }`\n  - `snooze?: { snoozeUntil?: string; userSnoozedAt?: string; }`\n  - `unreadMentionsCount?: number`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst chat = await client.chats.retrieve('!NCdzlIaMjZUmvmvyHU:beeper.com');\n\nconsole.log(chat);\n```",
    perLanguage: {
      typescript: {
        method: 'client.chats.retrieve',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst chat = await client.chats.retrieve('!NCdzlIaMjZUmvmvyHU:beeper.com');\n\nconsole.log(chat.id);",
      },
      python: {
        method: 'chats.retrieve',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nchat = client.chats.retrieve(\n    chat_id="!NCdzlIaMjZUmvmvyHU:beeper.com",\n)\nprint(chat.id)',
      },
      go: {
        method: 'client.Chats.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tchat, err := client.Chats.Get(\n\t\tcontext.TODO(),\n\t\t"!NCdzlIaMjZUmvmvyHU:beeper.com",\n\t\tbeeperdesktopapi.ChatGetParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", chat.ID)\n}\n',
      },
      cli: {
        method: 'chats retrieve',
        example:
          "beeper-desktop-cli chats retrieve \\\n  --access-token 'My Access Token' \\\n  --chat-id '!NCdzlIaMjZUmvmvyHU:beeper.com'",
      },
      php: {
        method: 'chats->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$chat = $client->chats->retrieve(\n  '!NCdzlIaMjZUmvmvyHU:beeper.com', maxParticipantCount: 100\n);\n\nvar_dump($chat);",
      },
      http: {
        example:
          'curl http://localhost:23373/v1/chats/$CHAT_ID \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v1/chats',
    httpMethod: 'post',
    summary: 'Create a chat',
    description: 'Create a direct or group chat from participant IDs. Returns the created chat.',
    stainlessPath: '(resource) chats > (method) create',
    qualified: 'client.chats.create',
    params: [
      'accountID: string;',
      'participantIDs: string[];',
      "type: 'single' | 'group';",
      'messageText?: string;',
      'title?: string;',
    ],
    response:
      "{ id: string; accountID: string; network: string; participants: object; title: string; type: 'single' | 'group'; unreadCount: number; capabilities?: object; description?: string; draft?: object; imgURL?: string; isArchived?: boolean; isLowPriority?: boolean; isMarkedUnread?: boolean; isMuted?: boolean; isPinned?: boolean; isReadOnly?: boolean; lastActivity?: string; lastReadMessageSortKey?: string; localChatID?: string; messageExpirySeconds?: number; reminder?: object; snooze?: object; unreadMentionsCount?: number; }",
    markdown:
      "## create\n\n`client.chats.create(accountID: string, participantIDs: string[], type: 'single' | 'group', messageText?: string, title?: string): object`\n\n**post** `/v1/chats`\n\nCreate a direct or group chat from participant IDs. Returns the created chat.\n\n### Parameters\n\n- `accountID: string`\n  Account to create or start the chat on.\n\n- `participantIDs: string[]`\n  User IDs to include in the new chat.\n\n- `type: 'single' | 'group'`\n  'single' requires exactly one participantID; 'group' supports multiple participants and optional title.\n\n- `messageText?: string`\n  Optional first message content if the platform requires it to create the chat.\n\n- `title?: string`\n  Optional title for group chats; ignored for single chats on most networks.\n\n### Returns\n\n- `{ id: string; accountID: string; network: string; participants: { hasMore: boolean; items: user[]; total: number; }; title: string; type: 'single' | 'group'; unreadCount: number; capabilities?: { allowedReactions?: string[]; archive?: boolean; attachments?: object; customEmojiReactions?: boolean; delete?: -2 | -1 | 0 | 1 | 2; deleteChat?: boolean; deleteChatForEveryone?: boolean; deleteForMe?: boolean; deleteMaxAge?: number; disappearingTimer?: object; edit?: -2 | -1 | 0 | 1 | 2; editMaxAge?: number; editMaxCount?: number; formatting?: object; locationMessage?: -2 | -1 | 0 | 1 | 2; markAsUnread?: boolean; maxTextLength?: number; messageRequest?: object; participantActions?: object; poll?: -2 | -1 | 0 | 1 | 2; reaction?: -2 | -1 | 0 | 1 | 2; reactionCount?: number; readReceipts?: boolean; reply?: -2 | -1 | 0 | 1 | 2; state?: object; thread?: -2 | -1 | 0 | 1 | 2; typingNotifications?: boolean; }; description?: string; draft?: { text: string; attachments?: object; }; imgURL?: string; isArchived?: boolean; isLowPriority?: boolean; isMarkedUnread?: boolean; isMuted?: boolean; isPinned?: boolean; isReadOnly?: boolean; lastActivity?: string; lastReadMessageSortKey?: string; localChatID?: string; messageExpirySeconds?: number; reminder?: { dismissOnIncomingMessage?: boolean; remindAt?: string; }; snooze?: { snoozeUntil?: string; userSnoozedAt?: string; }; unreadMentionsCount?: number; }`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst chat = await client.chats.create({\n  accountID: 'accountID',\n  participantIDs: ['string'],\n  type: 'single',\n});\n\nconsole.log(chat);\n```",
    perLanguage: {
      typescript: {
        method: 'client.chats.create',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst chat = await client.chats.create({\n  accountID: 'accountID',\n  participantIDs: ['string'],\n  type: 'single',\n});\n\nconsole.log(chat);",
      },
      python: {
        method: 'chats.create',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nchat = client.chats.create(\n    account_id="accountID",\n    participant_ids=["string"],\n    type="single",\n)\nprint(chat)',
      },
      go: {
        method: 'client.Chats.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tchat, err := client.Chats.New(context.TODO(), beeperdesktopapi.ChatNewParams{\n\t\tAccountID:      "accountID",\n\t\tParticipantIDs: []string{"string"},\n\t\tType:           beeperdesktopapi.ChatNewParamsTypeSingle,\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", chat)\n}\n',
      },
      cli: {
        method: 'chats create',
        example:
          "beeper-desktop-cli chats create \\\n  --access-token 'My Access Token' \\\n  --account-id accountID \\\n  --participant-id string \\\n  --type single",
      },
      php: {
        method: 'chats->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$chat = $client->chats->create(\n  accountID: 'accountID',\n  participantIDs: ['string'],\n  type: 'single',\n  messageText: 'messageText',\n  title: 'title',\n);\n\nvar_dump($chat);",
      },
      http: {
        example:
          'curl http://localhost:23373/v1/chats \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN" \\\n    -d \'{\n          "accountID": "accountID",\n          "participantIDs": [\n            "string"\n          ],\n          "type": "single"\n        }\'',
      },
    },
  },
  {
    name: 'start',
    endpoint: '/v1/chats/start',
    httpMethod: 'post',
    summary: 'Start a direct chat',
    description:
      'Resolve a user/contact and open a direct chat. Reuses and returns an existing direct chat when one is found. Available in Beeper Desktop v4.2.808+.',
    stainlessPath: '(resource) chats > (method) start',
    qualified: 'client.chats.start',
    params: [
      'accountID: string;',
      'user: { id?: string; email?: string; fullName?: string; phoneNumber?: string; username?: string; };',
      'allowInvite?: boolean;',
      'messageText?: string;',
    ],
    response:
      "{ id: string; accountID: string; network: string; participants: object; title: string; type: 'single' | 'group'; unreadCount: number; capabilities?: object; description?: string; draft?: object; imgURL?: string; isArchived?: boolean; isLowPriority?: boolean; isMarkedUnread?: boolean; isMuted?: boolean; isPinned?: boolean; isReadOnly?: boolean; lastActivity?: string; lastReadMessageSortKey?: string; localChatID?: string; messageExpirySeconds?: number; reminder?: object; snooze?: object; unreadMentionsCount?: number; }",
    markdown:
      "## start\n\n`client.chats.start(accountID: string, user: { id?: string; email?: string; fullName?: string; phoneNumber?: string; username?: string; }, allowInvite?: boolean, messageText?: string): object`\n\n**post** `/v1/chats/start`\n\nResolve a user/contact and open a direct chat. Reuses and returns an existing direct chat when one is found. Available in Beeper Desktop v4.2.808+.\n\n### Parameters\n\n- `accountID: string`\n  Account to create or start the chat on.\n\n- `user: { id?: string; email?: string; fullName?: string; phoneNumber?: string; username?: string; }`\n  Merged user-like contact payload used to resolve the best identifier.\n  - `id?: string`\n    Known user ID when available.\n  - `email?: string`\n    Email candidate.\n  - `fullName?: string`\n    Display name hint used for ranking only.\n  - `phoneNumber?: string`\n    Phone number candidate (E.164 preferred).\n  - `username?: string`\n    Username/handle candidate.\n\n- `allowInvite?: boolean`\n  Whether invite-based DM creation is allowed when required by the platform.\n\n- `messageText?: string`\n  Optional first message content if the platform requires it to create the chat.\n\n### Returns\n\n- `{ id: string; accountID: string; network: string; participants: { hasMore: boolean; items: user[]; total: number; }; title: string; type: 'single' | 'group'; unreadCount: number; capabilities?: { allowedReactions?: string[]; archive?: boolean; attachments?: object; customEmojiReactions?: boolean; delete?: -2 | -1 | 0 | 1 | 2; deleteChat?: boolean; deleteChatForEveryone?: boolean; deleteForMe?: boolean; deleteMaxAge?: number; disappearingTimer?: object; edit?: -2 | -1 | 0 | 1 | 2; editMaxAge?: number; editMaxCount?: number; formatting?: object; locationMessage?: -2 | -1 | 0 | 1 | 2; markAsUnread?: boolean; maxTextLength?: number; messageRequest?: object; participantActions?: object; poll?: -2 | -1 | 0 | 1 | 2; reaction?: -2 | -1 | 0 | 1 | 2; reactionCount?: number; readReceipts?: boolean; reply?: -2 | -1 | 0 | 1 | 2; state?: object; thread?: -2 | -1 | 0 | 1 | 2; typingNotifications?: boolean; }; description?: string; draft?: { text: string; attachments?: object; }; imgURL?: string; isArchived?: boolean; isLowPriority?: boolean; isMarkedUnread?: boolean; isMuted?: boolean; isPinned?: boolean; isReadOnly?: boolean; lastActivity?: string; lastReadMessageSortKey?: string; localChatID?: string; messageExpirySeconds?: number; reminder?: { dismissOnIncomingMessage?: boolean; remindAt?: string; }; snooze?: { snoozeUntil?: string; userSnoozedAt?: string; }; unreadMentionsCount?: number; }`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst response = await client.chats.start({\n  accountID: 'accountID',\n  user: {},\n});\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.chats.start',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.chats.start({\n  accountID: 'accountID',\n  user: {},\n});\n\nconsole.log(response);",
      },
      python: {
        method: 'chats.start',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.chats.start(\n    account_id="accountID",\n    user={},\n)\nprint(response)',
      },
      go: {
        method: 'client.Chats.Start',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.Chats.Start(context.TODO(), beeperdesktopapi.ChatStartParams{\n\t\tAccountID: "accountID",\n\t\tUser:      beeperdesktopapi.ChatStartParamsUser{},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response)\n}\n',
      },
      cli: {
        method: 'chats start',
        example:
          "beeper-desktop-cli chats start \\\n  --access-token 'My Access Token' \\\n  --account-id accountID \\\n  --user '{}'",
      },
      php: {
        method: 'chats->start',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->chats->start(\n  accountID: 'accountID',\n  user: [\n    'id' => 'id',\n    'email' => 'email',\n    'fullName' => 'fullName',\n    'phoneNumber' => 'phoneNumber',\n    'username' => 'username',\n  ],\n  allowInvite: true,\n  messageText: 'messageText',\n);\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl http://localhost:23373/v1/chats/start \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN" \\\n    -d \'{\n          "accountID": "accountID",\n          "user": {}\n        }\'',
      },
    },
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
      "{ id: string; accountID: string; network: string; participants: object; title: string; type: 'single' | 'group'; unreadCount: number; capabilities?: object; description?: string; draft?: object; imgURL?: string; isArchived?: boolean; isLowPriority?: boolean; isMarkedUnread?: boolean; isMuted?: boolean; isPinned?: boolean; isReadOnly?: boolean; lastActivity?: string; lastReadMessageSortKey?: string; localChatID?: string; messageExpirySeconds?: number; reminder?: object; snooze?: object; unreadMentionsCount?: number; }",
    markdown:
      "## list\n\n`client.chats.list(accountIDs?: string[], cursor?: string, direction?: 'after' | 'before'): object`\n\n**get** `/v1/chats`\n\nList all chats sorted by last activity (most recent first). Combines all accounts into a single paginated list.\n\n### Parameters\n\n- `accountIDs?: string[]`\n  Limit to specific account IDs. If omitted, fetches from all accounts.\n\n- `cursor?: string`\n  Opaque pagination cursor; do not inspect. Use together with 'direction'.\n\n- `direction?: 'after' | 'before'`\n  Pagination direction used with 'cursor': 'before' fetches older results, 'after' fetches newer results. Defaults to 'before' when only 'cursor' is provided.\n\n### Returns\n\n- `{ id: string; accountID: string; network: string; participants: { hasMore: boolean; items: user[]; total: number; }; title: string; type: 'single' | 'group'; unreadCount: number; capabilities?: { allowedReactions?: string[]; archive?: boolean; attachments?: object; customEmojiReactions?: boolean; delete?: -2 | -1 | 0 | 1 | 2; deleteChat?: boolean; deleteChatForEveryone?: boolean; deleteForMe?: boolean; deleteMaxAge?: number; disappearingTimer?: object; edit?: -2 | -1 | 0 | 1 | 2; editMaxAge?: number; editMaxCount?: number; formatting?: object; locationMessage?: -2 | -1 | 0 | 1 | 2; markAsUnread?: boolean; maxTextLength?: number; messageRequest?: object; participantActions?: object; poll?: -2 | -1 | 0 | 1 | 2; reaction?: -2 | -1 | 0 | 1 | 2; reactionCount?: number; readReceipts?: boolean; reply?: -2 | -1 | 0 | 1 | 2; state?: object; thread?: -2 | -1 | 0 | 1 | 2; typingNotifications?: boolean; }; description?: string; draft?: { text: string; attachments?: object; }; imgURL?: string; isArchived?: boolean; isLowPriority?: boolean; isMarkedUnread?: boolean; isMuted?: boolean; isPinned?: boolean; isReadOnly?: boolean; lastActivity?: string; lastReadMessageSortKey?: string; localChatID?: string; messageExpirySeconds?: number; reminder?: { dismissOnIncomingMessage?: boolean; remindAt?: string; }; snooze?: { snoozeUntil?: string; userSnoozedAt?: string; }; unreadMentionsCount?: number; }`\n  Chat with optional last message preview.\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\n// Automatically fetches more pages as needed.\nfor await (const chatListResponse of client.chats.list()) {\n  console.log(chatListResponse);\n}\n```",
    perLanguage: {
      typescript: {
        method: 'client.chats.list',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const chatListResponse of client.chats.list()) {\n  console.log(chatListResponse);\n}",
      },
      python: {
        method: 'chats.list',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\npage = client.chats.list()\npage = page.items[0]\nprint(page)',
      },
      go: {
        method: 'client.Chats.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tpage, err := client.Chats.List(context.TODO(), beeperdesktopapi.ChatListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      cli: {
        method: 'chats list',
        example: "beeper-desktop-cli chats list \\\n  --access-token 'My Access Token'",
      },
      php: {
        method: 'chats->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$page = $client->chats->list(\n  accountIDs: [\n    'matrix', 'discordgo', 'local-whatsapp_ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc'\n  ],\n  cursor: '1725489123456|c29tZUltc2dQYWdl',\n  direction: 'before',\n);\n\nvar_dump($page);",
      },
      http: {
        example:
          'curl http://localhost:23373/v1/chats \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
    },
  },
  {
    name: 'search',
    endpoint: '/v1/chats/search',
    httpMethod: 'get',
    summary: 'Search chats',
    description: 'Search chats by title, network, or participant names.',
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
      "{ id: string; accountID: string; network: string; participants: object; title: string; type: 'single' | 'group'; unreadCount: number; capabilities?: object; description?: string; draft?: object; imgURL?: string; isArchived?: boolean; isLowPriority?: boolean; isMarkedUnread?: boolean; isMuted?: boolean; isPinned?: boolean; isReadOnly?: boolean; lastActivity?: string; lastReadMessageSortKey?: string; localChatID?: string; messageExpirySeconds?: number; reminder?: object; snooze?: object; unreadMentionsCount?: number; }",
    markdown:
      "## search\n\n`client.chats.search(accountIDs?: string[], cursor?: string, direction?: 'after' | 'before', inbox?: 'primary' | 'low-priority' | 'archive', includeMuted?: boolean, lastActivityAfter?: string, lastActivityBefore?: string, limit?: number, query?: string, scope?: 'titles' | 'participants', type?: 'single' | 'group' | 'any', unreadOnly?: boolean): { id: string; accountID: string; network: string; participants: object; title: string; type: 'single' | 'group'; unreadCount: number; capabilities?: object; description?: string; draft?: object; imgURL?: string; isArchived?: boolean; isLowPriority?: boolean; isMarkedUnread?: boolean; isMuted?: boolean; isPinned?: boolean; isReadOnly?: boolean; lastActivity?: string; lastReadMessageSortKey?: string; localChatID?: string; messageExpirySeconds?: number; reminder?: object; snooze?: object; unreadMentionsCount?: number; }`\n\n**get** `/v1/chats/search`\n\nSearch chats by title, network, or participant names.\n\n### Parameters\n\n- `accountIDs?: string[]`\n  Provide an array of account IDs to filter chats from specific messaging accounts only\n\n- `cursor?: string`\n  Opaque pagination cursor; do not inspect. Use together with 'direction'.\n\n- `direction?: 'after' | 'before'`\n  Pagination direction used with 'cursor': 'before' fetches older results, 'after' fetches newer results. Defaults to 'before' when only 'cursor' is provided.\n\n- `inbox?: 'primary' | 'low-priority' | 'archive'`\n  Filter by inbox type: \"primary\" (non-archived, non-low-priority), \"low-priority\", or \"archive\". If not specified, shows all chats.\n\n- `includeMuted?: boolean`\n  Include chats marked as Muted by the user, which are usually less important. Default: true. Set to false if the user wants a more refined search.\n\n- `lastActivityAfter?: string`\n  Provide an ISO datetime string to only retrieve chats with last activity after this time\n\n- `lastActivityBefore?: string`\n  Provide an ISO datetime string to only retrieve chats with last activity before this time\n\n- `limit?: number`\n  Set the maximum number of chats to retrieve. Valid range: 1-200, default is 50\n\n- `query?: string`\n  Literal token search (non-semantic). Use single words users type (e.g., \"dinner\"). When multiple words provided, ALL must match. Case-insensitive.\n\n- `scope?: 'titles' | 'participants'`\n  Search scope: 'titles' matches title + network; 'participants' matches participant names.\n\n- `type?: 'single' | 'group' | 'any'`\n  Specify the type of chats to retrieve: use \"single\" for direct messages, \"group\" for group chats, or \"any\" to get all types\n\n- `unreadOnly?: boolean`\n  Set to true to only retrieve chats that have unread messages\n\n### Returns\n\n- `{ id: string; accountID: string; network: string; participants: { hasMore: boolean; items: object[]; total: number; }; title: string; type: 'single' | 'group'; unreadCount: number; capabilities?: { allowedReactions?: string[]; archive?: boolean; attachments?: object; customEmojiReactions?: boolean; delete?: -2 | -1 | 0 | 1 | 2; deleteChat?: boolean; deleteChatForEveryone?: boolean; deleteForMe?: boolean; deleteMaxAge?: number; disappearingTimer?: { omitEmptyTimer?: boolean; timers?: number[]; types?: 'afterRead' | 'afterSend'[]; }; edit?: -2 | -1 | 0 | 1 | 2; editMaxAge?: number; editMaxCount?: number; formatting?: object; locationMessage?: -2 | -1 | 0 | 1 | 2; markAsUnread?: boolean; maxTextLength?: number; messageRequest?: { acceptWithButton?: -2 | -1 | 0 | 1 | 2; acceptWithMessage?: -2 | -1 | 0 | 1 | 2; }; participantActions?: { ban?: -2 | -1 | 0 | 1 | 2; invite?: -2 | -1 | 0 | 1 | 2; kick?: -2 | -1 | 0 | 1 | 2; leave?: -2 | -1 | 0 | 1 | 2; revokeInvite?: -2 | -1 | 0 | 1 | 2; }; poll?: -2 | -1 | 0 | 1 | 2; reaction?: -2 | -1 | 0 | 1 | 2; reactionCount?: number; readReceipts?: boolean; reply?: -2 | -1 | 0 | 1 | 2; state?: { avatar?: object; description?: object; disappearingTimer?: object; title?: object; }; thread?: -2 | -1 | 0 | 1 | 2; typingNotifications?: boolean; }; description?: string; draft?: { text: string; attachments?: object; }; imgURL?: string; isArchived?: boolean; isLowPriority?: boolean; isMarkedUnread?: boolean; isMuted?: boolean; isPinned?: boolean; isReadOnly?: boolean; lastActivity?: string; lastReadMessageSortKey?: string; localChatID?: string; messageExpirySeconds?: number; reminder?: { dismissOnIncomingMessage?: boolean; remindAt?: string; }; snooze?: { snoozeUntil?: string; userSnoozedAt?: string; }; unreadMentionsCount?: number; }`\n\n  - `id: string`\n  - `accountID: string`\n  - `network: string`\n  - `participants: { hasMore: boolean; items: { id: string; cannotMessage?: boolean; email?: string; fullName?: string; imgURL?: string; isSelf?: boolean; phoneNumber?: string; username?: string; }[]; total: number; }`\n  - `title: string`\n  - `type: 'single' | 'group'`\n  - `unreadCount: number`\n  - `capabilities?: { allowedReactions?: string[]; archive?: boolean; attachments?: object; customEmojiReactions?: boolean; delete?: -2 | -1 | 0 | 1 | 2; deleteChat?: boolean; deleteChatForEveryone?: boolean; deleteForMe?: boolean; deleteMaxAge?: number; disappearingTimer?: { omitEmptyTimer?: boolean; timers?: number[]; types?: 'afterRead' | 'afterSend'[]; }; edit?: -2 | -1 | 0 | 1 | 2; editMaxAge?: number; editMaxCount?: number; formatting?: object; locationMessage?: -2 | -1 | 0 | 1 | 2; markAsUnread?: boolean; maxTextLength?: number; messageRequest?: { acceptWithButton?: -2 | -1 | 0 | 1 | 2; acceptWithMessage?: -2 | -1 | 0 | 1 | 2; }; participantActions?: { ban?: -2 | -1 | 0 | 1 | 2; invite?: -2 | -1 | 0 | 1 | 2; kick?: -2 | -1 | 0 | 1 | 2; leave?: -2 | -1 | 0 | 1 | 2; revokeInvite?: -2 | -1 | 0 | 1 | 2; }; poll?: -2 | -1 | 0 | 1 | 2; reaction?: -2 | -1 | 0 | 1 | 2; reactionCount?: number; readReceipts?: boolean; reply?: -2 | -1 | 0 | 1 | 2; state?: { avatar?: { level: -2 | -1 | 0 | 1 | 2; }; description?: { level: -2 | -1 | 0 | 1 | 2; }; disappearingTimer?: { level: -2 | -1 | 0 | 1 | 2; }; title?: { level: -2 | -1 | 0 | 1 | 2; }; }; thread?: -2 | -1 | 0 | 1 | 2; typingNotifications?: boolean; }`\n  - `description?: string`\n  - `draft?: { text: string; attachments?: object; }`\n  - `imgURL?: string`\n  - `isArchived?: boolean`\n  - `isLowPriority?: boolean`\n  - `isMarkedUnread?: boolean`\n  - `isMuted?: boolean`\n  - `isPinned?: boolean`\n  - `isReadOnly?: boolean`\n  - `lastActivity?: string`\n  - `lastReadMessageSortKey?: string`\n  - `localChatID?: string`\n  - `messageExpirySeconds?: number`\n  - `reminder?: { dismissOnIncomingMessage?: boolean; remindAt?: string; }`\n  - `snooze?: { snoozeUntil?: string; userSnoozedAt?: string; }`\n  - `unreadMentionsCount?: number`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\n// Automatically fetches more pages as needed.\nfor await (const chat of client.chats.search()) {\n  console.log(chat);\n}\n```",
    perLanguage: {
      typescript: {
        method: 'client.chats.search',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const chat of client.chats.search()) {\n  console.log(chat.id);\n}",
      },
      python: {
        method: 'chats.search',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\npage = client.chats.search()\npage = page.items[0]\nprint(page.id)',
      },
      go: {
        method: 'client.Chats.Search',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tpage, err := client.Chats.Search(context.TODO(), beeperdesktopapi.ChatSearchParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      cli: {
        method: 'chats search',
        example: "beeper-desktop-cli chats search \\\n  --access-token 'My Access Token'",
      },
      php: {
        method: 'chats->search',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$page = $client->chats->search(\n  accountIDs: [\n    'matrix', 'discordgo', 'local-whatsapp_ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc'\n  ],\n  cursor: '1725489123456|c29tZUltc2dQYWdl',\n  direction: 'before',\n  inbox: 'primary',\n  includeMuted: true,\n  lastActivityAfter: new \\DateTimeImmutable('2019-12-27T18:11:19.117Z'),\n  lastActivityBefore: new \\DateTimeImmutable('2019-12-27T18:11:19.117Z'),\n  limit: 1,\n  query: 'x',\n  scope: 'titles',\n  type: 'single',\n  unreadOnly: true,\n);\n\nvar_dump($page);",
      },
      http: {
        example:
          'curl http://localhost:23373/v1/chats/search \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
    },
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
      "## archive\n\n`client.chats.archive(chatID: string, archived?: boolean): void`\n\n**post** `/v1/chats/{chatID}/archive`\n\nArchive or unarchive a chat. Set archived=true to move to archive, archived=false to move back to inbox\n\n### Parameters\n\n- `chatID: string`\n  Chat ID. Input routes also accept the local chat ID from this Beeper Desktop installation when available.\n\n- `archived?: boolean`\n  True to archive, false to unarchive\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nawait client.chats.archive('!NCdzlIaMjZUmvmvyHU:beeper.com')\n```",
    perLanguage: {
      typescript: {
        method: 'client.chats.archive',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nawait client.chats.archive('!NCdzlIaMjZUmvmvyHU:beeper.com');",
      },
      python: {
        method: 'chats.archive',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nclient.chats.archive(\n    chat_id="!NCdzlIaMjZUmvmvyHU:beeper.com",\n)',
      },
      go: {
        method: 'client.Chats.Archive',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\terr := client.Chats.Archive(\n\t\tcontext.TODO(),\n\t\t"!NCdzlIaMjZUmvmvyHU:beeper.com",\n\t\tbeeperdesktopapi.ChatArchiveParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      cli: {
        method: 'chats archive',
        example:
          "beeper-desktop-cli chats archive \\\n  --access-token 'My Access Token' \\\n  --chat-id '!NCdzlIaMjZUmvmvyHU:beeper.com'",
      },
      php: {
        method: 'chats->archive',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$result = $client->chats->archive(\n  '!NCdzlIaMjZUmvmvyHU:beeper.com', archived: true\n);\n\nvar_dump($result);",
      },
      http: {
        example:
          'curl http://localhost:23373/v1/chats/$CHAT_ID/archive \\\n    -X POST \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
    },
  },
  {
    name: 'update',
    endpoint: '/v1/chats/{chatID}',
    httpMethod: 'patch',
    summary: 'Update chat',
    description:
      'Update supported chat fields. Non-empty draft objects are accepted only when the current draft is empty. Send draft=null to clear the draft before setting new draft text or attachments.',
    stainlessPath: '(resource) chats > (method) update',
    qualified: 'client.chats.update',
    params: [
      'chatID: string;',
      'description?: string;',
      'draft?: { text: string; attachments?: object; };',
      'imgURL?: string;',
      'isArchived?: boolean;',
      'isLowPriority?: boolean;',
      'isMuted?: boolean;',
      'isPinned?: boolean;',
      'messageExpirySeconds?: number;',
      'title?: string;',
    ],
    response:
      "{ id: string; accountID: string; network: string; participants: object; title: string; type: 'single' | 'group'; unreadCount: number; capabilities?: object; description?: string; draft?: object; imgURL?: string; isArchived?: boolean; isLowPriority?: boolean; isMarkedUnread?: boolean; isMuted?: boolean; isPinned?: boolean; isReadOnly?: boolean; lastActivity?: string; lastReadMessageSortKey?: string; localChatID?: string; messageExpirySeconds?: number; reminder?: object; snooze?: object; unreadMentionsCount?: number; }",
    markdown:
      "## update\n\n`client.chats.update(chatID: string, description?: string, draft?: { text: string; attachments?: object; }, imgURL?: string, isArchived?: boolean, isLowPriority?: boolean, isMuted?: boolean, isPinned?: boolean, messageExpirySeconds?: number, title?: string): { id: string; accountID: string; network: string; participants: object; title: string; type: 'single' | 'group'; unreadCount: number; capabilities?: object; description?: string; draft?: object; imgURL?: string; isArchived?: boolean; isLowPriority?: boolean; isMarkedUnread?: boolean; isMuted?: boolean; isPinned?: boolean; isReadOnly?: boolean; lastActivity?: string; lastReadMessageSortKey?: string; localChatID?: string; messageExpirySeconds?: number; reminder?: object; snooze?: object; unreadMentionsCount?: number; }`\n\n**patch** `/v1/chats/{chatID}`\n\nUpdate supported chat fields. Non-empty draft objects are accepted only when the current draft is empty. Send draft=null to clear the draft before setting new draft text or attachments.\n\n### Parameters\n\n- `chatID: string`\n  Chat ID. Input routes also accept the local chat ID from this Beeper Desktop installation when available.\n\n- `description?: string`\n  Group chat description/topic. Support depends on the chat account and chat permissions.\n\n- `draft?: { text: string; attachments?: object; }`\n  Draft object to set or clear. Non-empty drafts are only accepted when the current draft is empty. Send draft=null to clear text and attachments together before setting a new draft.\n  - `text: string`\n    Draft text. Plain text and Markdown are converted to Matrix HTML with the same rules used by send and edit.\n  - `attachments?: object`\n    Draft attachments keyed by attachment ID. Each attachment must reference an uploadID returned by the upload file endpoint.\n\n- `imgURL?: string`\n  Local filesystem path to a group chat avatar image. Support depends on the chat account and chat permissions.\n\n- `isArchived?: boolean`\n  Archive or unarchive the chat.\n\n- `isLowPriority?: boolean`\n  Mark or unmark the chat as low priority when supported by the account.\n\n- `isMuted?: boolean`\n  Mute or unmute the chat.\n\n- `isPinned?: boolean`\n  Pin or unpin the chat when supported by the account.\n\n- `messageExpirySeconds?: number`\n  Disappearing-message timer in seconds, or null to clear when supported.\n\n- `title?: string`\n  Custom chat title. Support depends on the chat account and chat permissions.\n\n### Returns\n\n- `{ id: string; accountID: string; network: string; participants: { hasMore: boolean; items: object[]; total: number; }; title: string; type: 'single' | 'group'; unreadCount: number; capabilities?: { allowedReactions?: string[]; archive?: boolean; attachments?: object; customEmojiReactions?: boolean; delete?: -2 | -1 | 0 | 1 | 2; deleteChat?: boolean; deleteChatForEveryone?: boolean; deleteForMe?: boolean; deleteMaxAge?: number; disappearingTimer?: { omitEmptyTimer?: boolean; timers?: number[]; types?: 'afterRead' | 'afterSend'[]; }; edit?: -2 | -1 | 0 | 1 | 2; editMaxAge?: number; editMaxCount?: number; formatting?: object; locationMessage?: -2 | -1 | 0 | 1 | 2; markAsUnread?: boolean; maxTextLength?: number; messageRequest?: { acceptWithButton?: -2 | -1 | 0 | 1 | 2; acceptWithMessage?: -2 | -1 | 0 | 1 | 2; }; participantActions?: { ban?: -2 | -1 | 0 | 1 | 2; invite?: -2 | -1 | 0 | 1 | 2; kick?: -2 | -1 | 0 | 1 | 2; leave?: -2 | -1 | 0 | 1 | 2; revokeInvite?: -2 | -1 | 0 | 1 | 2; }; poll?: -2 | -1 | 0 | 1 | 2; reaction?: -2 | -1 | 0 | 1 | 2; reactionCount?: number; readReceipts?: boolean; reply?: -2 | -1 | 0 | 1 | 2; state?: { avatar?: object; description?: object; disappearingTimer?: object; title?: object; }; thread?: -2 | -1 | 0 | 1 | 2; typingNotifications?: boolean; }; description?: string; draft?: { text: string; attachments?: object; }; imgURL?: string; isArchived?: boolean; isLowPriority?: boolean; isMarkedUnread?: boolean; isMuted?: boolean; isPinned?: boolean; isReadOnly?: boolean; lastActivity?: string; lastReadMessageSortKey?: string; localChatID?: string; messageExpirySeconds?: number; reminder?: { dismissOnIncomingMessage?: boolean; remindAt?: string; }; snooze?: { snoozeUntil?: string; userSnoozedAt?: string; }; unreadMentionsCount?: number; }`\n\n  - `id: string`\n  - `accountID: string`\n  - `network: string`\n  - `participants: { hasMore: boolean; items: { id: string; cannotMessage?: boolean; email?: string; fullName?: string; imgURL?: string; isSelf?: boolean; phoneNumber?: string; username?: string; }[]; total: number; }`\n  - `title: string`\n  - `type: 'single' | 'group'`\n  - `unreadCount: number`\n  - `capabilities?: { allowedReactions?: string[]; archive?: boolean; attachments?: object; customEmojiReactions?: boolean; delete?: -2 | -1 | 0 | 1 | 2; deleteChat?: boolean; deleteChatForEveryone?: boolean; deleteForMe?: boolean; deleteMaxAge?: number; disappearingTimer?: { omitEmptyTimer?: boolean; timers?: number[]; types?: 'afterRead' | 'afterSend'[]; }; edit?: -2 | -1 | 0 | 1 | 2; editMaxAge?: number; editMaxCount?: number; formatting?: object; locationMessage?: -2 | -1 | 0 | 1 | 2; markAsUnread?: boolean; maxTextLength?: number; messageRequest?: { acceptWithButton?: -2 | -1 | 0 | 1 | 2; acceptWithMessage?: -2 | -1 | 0 | 1 | 2; }; participantActions?: { ban?: -2 | -1 | 0 | 1 | 2; invite?: -2 | -1 | 0 | 1 | 2; kick?: -2 | -1 | 0 | 1 | 2; leave?: -2 | -1 | 0 | 1 | 2; revokeInvite?: -2 | -1 | 0 | 1 | 2; }; poll?: -2 | -1 | 0 | 1 | 2; reaction?: -2 | -1 | 0 | 1 | 2; reactionCount?: number; readReceipts?: boolean; reply?: -2 | -1 | 0 | 1 | 2; state?: { avatar?: { level: -2 | -1 | 0 | 1 | 2; }; description?: { level: -2 | -1 | 0 | 1 | 2; }; disappearingTimer?: { level: -2 | -1 | 0 | 1 | 2; }; title?: { level: -2 | -1 | 0 | 1 | 2; }; }; thread?: -2 | -1 | 0 | 1 | 2; typingNotifications?: boolean; }`\n  - `description?: string`\n  - `draft?: { text: string; attachments?: object; }`\n  - `imgURL?: string`\n  - `isArchived?: boolean`\n  - `isLowPriority?: boolean`\n  - `isMarkedUnread?: boolean`\n  - `isMuted?: boolean`\n  - `isPinned?: boolean`\n  - `isReadOnly?: boolean`\n  - `lastActivity?: string`\n  - `lastReadMessageSortKey?: string`\n  - `localChatID?: string`\n  - `messageExpirySeconds?: number`\n  - `reminder?: { dismissOnIncomingMessage?: boolean; remindAt?: string; }`\n  - `snooze?: { snoozeUntil?: string; userSnoozedAt?: string; }`\n  - `unreadMentionsCount?: number`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst chat = await client.chats.update('!NCdzlIaMjZUmvmvyHU:beeper.com');\n\nconsole.log(chat);\n```",
    perLanguage: {
      typescript: {
        method: 'client.chats.update',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst chat = await client.chats.update('!NCdzlIaMjZUmvmvyHU:beeper.com');\n\nconsole.log(chat.id);",
      },
      python: {
        method: 'chats.update',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nchat = client.chats.update(\n    chat_id="!NCdzlIaMjZUmvmvyHU:beeper.com",\n)\nprint(chat.id)',
      },
      go: {
        method: 'client.Chats.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tchat, err := client.Chats.Update(\n\t\tcontext.TODO(),\n\t\t"!NCdzlIaMjZUmvmvyHU:beeper.com",\n\t\tbeeperdesktopapi.ChatUpdateParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", chat.ID)\n}\n',
      },
      cli: {
        method: 'chats update',
        example:
          "beeper-desktop-cli chats update \\\n  --access-token 'My Access Token' \\\n  --chat-id '!NCdzlIaMjZUmvmvyHU:beeper.com'",
      },
      php: {
        method: 'chats->update',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$chat = $client->chats->update(\n  '!NCdzlIaMjZUmvmvyHU:beeper.com',\n  description: 'description',\n  draft: [\n    'text' => 'text',\n    'attachments' => [\n      'foo' => [\n        'uploadID' => 'uploadID',\n        'id' => 'id',\n        'duration' => 0,\n        'fileName' => 'fileName',\n        'mimeType' => 'mimeType',\n        'size' => ['height' => 0, 'width' => 0],\n        'type' => 'image',\n      ],\n    ],\n  ],\n  imgURL: 'imgURL',\n  isArchived: true,\n  isLowPriority: true,\n  isMuted: true,\n  isPinned: true,\n  messageExpirySeconds: 0,\n  title: 'title',\n);\n\nvar_dump($chat);",
      },
      http: {
        example:
          'curl http://localhost:23373/v1/chats/$CHAT_ID \\\n    -X PATCH \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
    },
  },
  {
    name: 'mark_read',
    endpoint: '/v1/chats/{chatID}/read',
    httpMethod: 'post',
    summary: 'Mark a chat as read',
    description: 'Mark a chat as read, optionally through a specific message ID.',
    stainlessPath: '(resource) chats > (method) mark_read',
    qualified: 'client.chats.markRead',
    params: ['chatID: string;', 'messageID?: string;'],
    response:
      "{ id: string; accountID: string; network: string; participants: object; title: string; type: 'single' | 'group'; unreadCount: number; capabilities?: object; description?: string; draft?: object; imgURL?: string; isArchived?: boolean; isLowPriority?: boolean; isMarkedUnread?: boolean; isMuted?: boolean; isPinned?: boolean; isReadOnly?: boolean; lastActivity?: string; lastReadMessageSortKey?: string; localChatID?: string; messageExpirySeconds?: number; reminder?: object; snooze?: object; unreadMentionsCount?: number; }",
    markdown:
      "## mark_read\n\n`client.chats.markRead(chatID: string, messageID?: string): { id: string; accountID: string; network: string; participants: object; title: string; type: 'single' | 'group'; unreadCount: number; capabilities?: object; description?: string; draft?: object; imgURL?: string; isArchived?: boolean; isLowPriority?: boolean; isMarkedUnread?: boolean; isMuted?: boolean; isPinned?: boolean; isReadOnly?: boolean; lastActivity?: string; lastReadMessageSortKey?: string; localChatID?: string; messageExpirySeconds?: number; reminder?: object; snooze?: object; unreadMentionsCount?: number; }`\n\n**post** `/v1/chats/{chatID}/read`\n\nMark a chat as read, optionally through a specific message ID.\n\n### Parameters\n\n- `chatID: string`\n  Chat ID. Input routes also accept the local chat ID from this Beeper Desktop installation when available.\n\n- `messageID?: string`\n  Optional message ID to mark read through.\n\n### Returns\n\n- `{ id: string; accountID: string; network: string; participants: { hasMore: boolean; items: object[]; total: number; }; title: string; type: 'single' | 'group'; unreadCount: number; capabilities?: { allowedReactions?: string[]; archive?: boolean; attachments?: object; customEmojiReactions?: boolean; delete?: -2 | -1 | 0 | 1 | 2; deleteChat?: boolean; deleteChatForEveryone?: boolean; deleteForMe?: boolean; deleteMaxAge?: number; disappearingTimer?: { omitEmptyTimer?: boolean; timers?: number[]; types?: 'afterRead' | 'afterSend'[]; }; edit?: -2 | -1 | 0 | 1 | 2; editMaxAge?: number; editMaxCount?: number; formatting?: object; locationMessage?: -2 | -1 | 0 | 1 | 2; markAsUnread?: boolean; maxTextLength?: number; messageRequest?: { acceptWithButton?: -2 | -1 | 0 | 1 | 2; acceptWithMessage?: -2 | -1 | 0 | 1 | 2; }; participantActions?: { ban?: -2 | -1 | 0 | 1 | 2; invite?: -2 | -1 | 0 | 1 | 2; kick?: -2 | -1 | 0 | 1 | 2; leave?: -2 | -1 | 0 | 1 | 2; revokeInvite?: -2 | -1 | 0 | 1 | 2; }; poll?: -2 | -1 | 0 | 1 | 2; reaction?: -2 | -1 | 0 | 1 | 2; reactionCount?: number; readReceipts?: boolean; reply?: -2 | -1 | 0 | 1 | 2; state?: { avatar?: object; description?: object; disappearingTimer?: object; title?: object; }; thread?: -2 | -1 | 0 | 1 | 2; typingNotifications?: boolean; }; description?: string; draft?: { text: string; attachments?: object; }; imgURL?: string; isArchived?: boolean; isLowPriority?: boolean; isMarkedUnread?: boolean; isMuted?: boolean; isPinned?: boolean; isReadOnly?: boolean; lastActivity?: string; lastReadMessageSortKey?: string; localChatID?: string; messageExpirySeconds?: number; reminder?: { dismissOnIncomingMessage?: boolean; remindAt?: string; }; snooze?: { snoozeUntil?: string; userSnoozedAt?: string; }; unreadMentionsCount?: number; }`\n\n  - `id: string`\n  - `accountID: string`\n  - `network: string`\n  - `participants: { hasMore: boolean; items: { id: string; cannotMessage?: boolean; email?: string; fullName?: string; imgURL?: string; isSelf?: boolean; phoneNumber?: string; username?: string; }[]; total: number; }`\n  - `title: string`\n  - `type: 'single' | 'group'`\n  - `unreadCount: number`\n  - `capabilities?: { allowedReactions?: string[]; archive?: boolean; attachments?: object; customEmojiReactions?: boolean; delete?: -2 | -1 | 0 | 1 | 2; deleteChat?: boolean; deleteChatForEveryone?: boolean; deleteForMe?: boolean; deleteMaxAge?: number; disappearingTimer?: { omitEmptyTimer?: boolean; timers?: number[]; types?: 'afterRead' | 'afterSend'[]; }; edit?: -2 | -1 | 0 | 1 | 2; editMaxAge?: number; editMaxCount?: number; formatting?: object; locationMessage?: -2 | -1 | 0 | 1 | 2; markAsUnread?: boolean; maxTextLength?: number; messageRequest?: { acceptWithButton?: -2 | -1 | 0 | 1 | 2; acceptWithMessage?: -2 | -1 | 0 | 1 | 2; }; participantActions?: { ban?: -2 | -1 | 0 | 1 | 2; invite?: -2 | -1 | 0 | 1 | 2; kick?: -2 | -1 | 0 | 1 | 2; leave?: -2 | -1 | 0 | 1 | 2; revokeInvite?: -2 | -1 | 0 | 1 | 2; }; poll?: -2 | -1 | 0 | 1 | 2; reaction?: -2 | -1 | 0 | 1 | 2; reactionCount?: number; readReceipts?: boolean; reply?: -2 | -1 | 0 | 1 | 2; state?: { avatar?: { level: -2 | -1 | 0 | 1 | 2; }; description?: { level: -2 | -1 | 0 | 1 | 2; }; disappearingTimer?: { level: -2 | -1 | 0 | 1 | 2; }; title?: { level: -2 | -1 | 0 | 1 | 2; }; }; thread?: -2 | -1 | 0 | 1 | 2; typingNotifications?: boolean; }`\n  - `description?: string`\n  - `draft?: { text: string; attachments?: object; }`\n  - `imgURL?: string`\n  - `isArchived?: boolean`\n  - `isLowPriority?: boolean`\n  - `isMarkedUnread?: boolean`\n  - `isMuted?: boolean`\n  - `isPinned?: boolean`\n  - `isReadOnly?: boolean`\n  - `lastActivity?: string`\n  - `lastReadMessageSortKey?: string`\n  - `localChatID?: string`\n  - `messageExpirySeconds?: number`\n  - `reminder?: { dismissOnIncomingMessage?: boolean; remindAt?: string; }`\n  - `snooze?: { snoozeUntil?: string; userSnoozedAt?: string; }`\n  - `unreadMentionsCount?: number`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst chat = await client.chats.markRead('!NCdzlIaMjZUmvmvyHU:beeper.com');\n\nconsole.log(chat);\n```",
    perLanguage: {
      typescript: {
        method: 'client.chats.markRead',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst chat = await client.chats.markRead('!NCdzlIaMjZUmvmvyHU:beeper.com');\n\nconsole.log(chat.id);",
      },
      python: {
        method: 'chats.mark_read',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nchat = client.chats.mark_read(\n    chat_id="!NCdzlIaMjZUmvmvyHU:beeper.com",\n)\nprint(chat.id)',
      },
      go: {
        method: 'client.Chats.MarkRead',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tchat, err := client.Chats.MarkRead(\n\t\tcontext.TODO(),\n\t\t"!NCdzlIaMjZUmvmvyHU:beeper.com",\n\t\tbeeperdesktopapi.ChatMarkReadParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", chat.ID)\n}\n',
      },
      cli: {
        method: 'chats mark_read',
        example:
          "beeper-desktop-cli chats mark-read \\\n  --access-token 'My Access Token' \\\n  --chat-id '!NCdzlIaMjZUmvmvyHU:beeper.com'",
      },
      php: {
        method: 'chats->markRead',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$chat = $client->chats->markRead(\n  '!NCdzlIaMjZUmvmvyHU:beeper.com', messageID: '1343993'\n);\n\nvar_dump($chat);",
      },
      http: {
        example:
          'curl http://localhost:23373/v1/chats/$CHAT_ID/read \\\n    -X POST \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
    },
  },
  {
    name: 'mark_unread',
    endpoint: '/v1/chats/{chatID}/unread',
    httpMethod: 'post',
    summary: 'Mark a chat as unread',
    description: 'Mark a chat as unread, optionally from a specific message ID.',
    stainlessPath: '(resource) chats > (method) mark_unread',
    qualified: 'client.chats.markUnread',
    params: ['chatID: string;', 'messageID?: string;'],
    response:
      "{ id: string; accountID: string; network: string; participants: object; title: string; type: 'single' | 'group'; unreadCount: number; capabilities?: object; description?: string; draft?: object; imgURL?: string; isArchived?: boolean; isLowPriority?: boolean; isMarkedUnread?: boolean; isMuted?: boolean; isPinned?: boolean; isReadOnly?: boolean; lastActivity?: string; lastReadMessageSortKey?: string; localChatID?: string; messageExpirySeconds?: number; reminder?: object; snooze?: object; unreadMentionsCount?: number; }",
    markdown:
      "## mark_unread\n\n`client.chats.markUnread(chatID: string, messageID?: string): { id: string; accountID: string; network: string; participants: object; title: string; type: 'single' | 'group'; unreadCount: number; capabilities?: object; description?: string; draft?: object; imgURL?: string; isArchived?: boolean; isLowPriority?: boolean; isMarkedUnread?: boolean; isMuted?: boolean; isPinned?: boolean; isReadOnly?: boolean; lastActivity?: string; lastReadMessageSortKey?: string; localChatID?: string; messageExpirySeconds?: number; reminder?: object; snooze?: object; unreadMentionsCount?: number; }`\n\n**post** `/v1/chats/{chatID}/unread`\n\nMark a chat as unread, optionally from a specific message ID.\n\n### Parameters\n\n- `chatID: string`\n  Chat ID. Input routes also accept the local chat ID from this Beeper Desktop installation when available.\n\n- `messageID?: string`\n  Optional message ID to mark unread from.\n\n### Returns\n\n- `{ id: string; accountID: string; network: string; participants: { hasMore: boolean; items: object[]; total: number; }; title: string; type: 'single' | 'group'; unreadCount: number; capabilities?: { allowedReactions?: string[]; archive?: boolean; attachments?: object; customEmojiReactions?: boolean; delete?: -2 | -1 | 0 | 1 | 2; deleteChat?: boolean; deleteChatForEveryone?: boolean; deleteForMe?: boolean; deleteMaxAge?: number; disappearingTimer?: { omitEmptyTimer?: boolean; timers?: number[]; types?: 'afterRead' | 'afterSend'[]; }; edit?: -2 | -1 | 0 | 1 | 2; editMaxAge?: number; editMaxCount?: number; formatting?: object; locationMessage?: -2 | -1 | 0 | 1 | 2; markAsUnread?: boolean; maxTextLength?: number; messageRequest?: { acceptWithButton?: -2 | -1 | 0 | 1 | 2; acceptWithMessage?: -2 | -1 | 0 | 1 | 2; }; participantActions?: { ban?: -2 | -1 | 0 | 1 | 2; invite?: -2 | -1 | 0 | 1 | 2; kick?: -2 | -1 | 0 | 1 | 2; leave?: -2 | -1 | 0 | 1 | 2; revokeInvite?: -2 | -1 | 0 | 1 | 2; }; poll?: -2 | -1 | 0 | 1 | 2; reaction?: -2 | -1 | 0 | 1 | 2; reactionCount?: number; readReceipts?: boolean; reply?: -2 | -1 | 0 | 1 | 2; state?: { avatar?: object; description?: object; disappearingTimer?: object; title?: object; }; thread?: -2 | -1 | 0 | 1 | 2; typingNotifications?: boolean; }; description?: string; draft?: { text: string; attachments?: object; }; imgURL?: string; isArchived?: boolean; isLowPriority?: boolean; isMarkedUnread?: boolean; isMuted?: boolean; isPinned?: boolean; isReadOnly?: boolean; lastActivity?: string; lastReadMessageSortKey?: string; localChatID?: string; messageExpirySeconds?: number; reminder?: { dismissOnIncomingMessage?: boolean; remindAt?: string; }; snooze?: { snoozeUntil?: string; userSnoozedAt?: string; }; unreadMentionsCount?: number; }`\n\n  - `id: string`\n  - `accountID: string`\n  - `network: string`\n  - `participants: { hasMore: boolean; items: { id: string; cannotMessage?: boolean; email?: string; fullName?: string; imgURL?: string; isSelf?: boolean; phoneNumber?: string; username?: string; }[]; total: number; }`\n  - `title: string`\n  - `type: 'single' | 'group'`\n  - `unreadCount: number`\n  - `capabilities?: { allowedReactions?: string[]; archive?: boolean; attachments?: object; customEmojiReactions?: boolean; delete?: -2 | -1 | 0 | 1 | 2; deleteChat?: boolean; deleteChatForEveryone?: boolean; deleteForMe?: boolean; deleteMaxAge?: number; disappearingTimer?: { omitEmptyTimer?: boolean; timers?: number[]; types?: 'afterRead' | 'afterSend'[]; }; edit?: -2 | -1 | 0 | 1 | 2; editMaxAge?: number; editMaxCount?: number; formatting?: object; locationMessage?: -2 | -1 | 0 | 1 | 2; markAsUnread?: boolean; maxTextLength?: number; messageRequest?: { acceptWithButton?: -2 | -1 | 0 | 1 | 2; acceptWithMessage?: -2 | -1 | 0 | 1 | 2; }; participantActions?: { ban?: -2 | -1 | 0 | 1 | 2; invite?: -2 | -1 | 0 | 1 | 2; kick?: -2 | -1 | 0 | 1 | 2; leave?: -2 | -1 | 0 | 1 | 2; revokeInvite?: -2 | -1 | 0 | 1 | 2; }; poll?: -2 | -1 | 0 | 1 | 2; reaction?: -2 | -1 | 0 | 1 | 2; reactionCount?: number; readReceipts?: boolean; reply?: -2 | -1 | 0 | 1 | 2; state?: { avatar?: { level: -2 | -1 | 0 | 1 | 2; }; description?: { level: -2 | -1 | 0 | 1 | 2; }; disappearingTimer?: { level: -2 | -1 | 0 | 1 | 2; }; title?: { level: -2 | -1 | 0 | 1 | 2; }; }; thread?: -2 | -1 | 0 | 1 | 2; typingNotifications?: boolean; }`\n  - `description?: string`\n  - `draft?: { text: string; attachments?: object; }`\n  - `imgURL?: string`\n  - `isArchived?: boolean`\n  - `isLowPriority?: boolean`\n  - `isMarkedUnread?: boolean`\n  - `isMuted?: boolean`\n  - `isPinned?: boolean`\n  - `isReadOnly?: boolean`\n  - `lastActivity?: string`\n  - `lastReadMessageSortKey?: string`\n  - `localChatID?: string`\n  - `messageExpirySeconds?: number`\n  - `reminder?: { dismissOnIncomingMessage?: boolean; remindAt?: string; }`\n  - `snooze?: { snoozeUntil?: string; userSnoozedAt?: string; }`\n  - `unreadMentionsCount?: number`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst chat = await client.chats.markUnread('!NCdzlIaMjZUmvmvyHU:beeper.com');\n\nconsole.log(chat);\n```",
    perLanguage: {
      typescript: {
        method: 'client.chats.markUnread',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst chat = await client.chats.markUnread('!NCdzlIaMjZUmvmvyHU:beeper.com');\n\nconsole.log(chat.id);",
      },
      python: {
        method: 'chats.mark_unread',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nchat = client.chats.mark_unread(\n    chat_id="!NCdzlIaMjZUmvmvyHU:beeper.com",\n)\nprint(chat.id)',
      },
      go: {
        method: 'client.Chats.MarkUnread',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tchat, err := client.Chats.MarkUnread(\n\t\tcontext.TODO(),\n\t\t"!NCdzlIaMjZUmvmvyHU:beeper.com",\n\t\tbeeperdesktopapi.ChatMarkUnreadParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", chat.ID)\n}\n',
      },
      cli: {
        method: 'chats mark_unread',
        example:
          "beeper-desktop-cli chats mark-unread \\\n  --access-token 'My Access Token' \\\n  --chat-id '!NCdzlIaMjZUmvmvyHU:beeper.com'",
      },
      php: {
        method: 'chats->markUnread',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$chat = $client->chats->markUnread(\n  '!NCdzlIaMjZUmvmvyHU:beeper.com', messageID: '1343993'\n);\n\nvar_dump($chat);",
      },
      http: {
        example:
          'curl http://localhost:23373/v1/chats/$CHAT_ID/unread \\\n    -X POST \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
    },
  },
  {
    name: 'notify_anyway',
    endpoint: '/v1/chats/{chatID}/notify-anyway',
    httpMethod: 'post',
    summary: 'Notify anyway',
    description:
      'Force a delivery notification when supported by the underlying network. Currently intended for iMessage on macOS; unsupported networks return an error.',
    stainlessPath: '(resource) chats > (method) notify_anyway',
    qualified: 'client.chats.notifyAnyway',
    params: ['chatID: string;'],
    response:
      "{ id: string; accountID: string; network: string; participants: object; title: string; type: 'single' | 'group'; unreadCount: number; capabilities?: object; description?: string; draft?: object; imgURL?: string; isArchived?: boolean; isLowPriority?: boolean; isMarkedUnread?: boolean; isMuted?: boolean; isPinned?: boolean; isReadOnly?: boolean; lastActivity?: string; lastReadMessageSortKey?: string; localChatID?: string; messageExpirySeconds?: number; reminder?: object; snooze?: object; unreadMentionsCount?: number; }",
    markdown:
      "## notify_anyway\n\n`client.chats.notifyAnyway(chatID: string): { id: string; accountID: string; network: string; participants: object; title: string; type: 'single' | 'group'; unreadCount: number; capabilities?: object; description?: string; draft?: object; imgURL?: string; isArchived?: boolean; isLowPriority?: boolean; isMarkedUnread?: boolean; isMuted?: boolean; isPinned?: boolean; isReadOnly?: boolean; lastActivity?: string; lastReadMessageSortKey?: string; localChatID?: string; messageExpirySeconds?: number; reminder?: object; snooze?: object; unreadMentionsCount?: number; }`\n\n**post** `/v1/chats/{chatID}/notify-anyway`\n\nForce a delivery notification when supported by the underlying network. Currently intended for iMessage on macOS; unsupported networks return an error.\n\n### Parameters\n\n- `chatID: string`\n  Chat ID. Input routes also accept the local chat ID from this Beeper Desktop installation when available.\n\n### Returns\n\n- `{ id: string; accountID: string; network: string; participants: { hasMore: boolean; items: object[]; total: number; }; title: string; type: 'single' | 'group'; unreadCount: number; capabilities?: { allowedReactions?: string[]; archive?: boolean; attachments?: object; customEmojiReactions?: boolean; delete?: -2 | -1 | 0 | 1 | 2; deleteChat?: boolean; deleteChatForEveryone?: boolean; deleteForMe?: boolean; deleteMaxAge?: number; disappearingTimer?: { omitEmptyTimer?: boolean; timers?: number[]; types?: 'afterRead' | 'afterSend'[]; }; edit?: -2 | -1 | 0 | 1 | 2; editMaxAge?: number; editMaxCount?: number; formatting?: object; locationMessage?: -2 | -1 | 0 | 1 | 2; markAsUnread?: boolean; maxTextLength?: number; messageRequest?: { acceptWithButton?: -2 | -1 | 0 | 1 | 2; acceptWithMessage?: -2 | -1 | 0 | 1 | 2; }; participantActions?: { ban?: -2 | -1 | 0 | 1 | 2; invite?: -2 | -1 | 0 | 1 | 2; kick?: -2 | -1 | 0 | 1 | 2; leave?: -2 | -1 | 0 | 1 | 2; revokeInvite?: -2 | -1 | 0 | 1 | 2; }; poll?: -2 | -1 | 0 | 1 | 2; reaction?: -2 | -1 | 0 | 1 | 2; reactionCount?: number; readReceipts?: boolean; reply?: -2 | -1 | 0 | 1 | 2; state?: { avatar?: object; description?: object; disappearingTimer?: object; title?: object; }; thread?: -2 | -1 | 0 | 1 | 2; typingNotifications?: boolean; }; description?: string; draft?: { text: string; attachments?: object; }; imgURL?: string; isArchived?: boolean; isLowPriority?: boolean; isMarkedUnread?: boolean; isMuted?: boolean; isPinned?: boolean; isReadOnly?: boolean; lastActivity?: string; lastReadMessageSortKey?: string; localChatID?: string; messageExpirySeconds?: number; reminder?: { dismissOnIncomingMessage?: boolean; remindAt?: string; }; snooze?: { snoozeUntil?: string; userSnoozedAt?: string; }; unreadMentionsCount?: number; }`\n\n  - `id: string`\n  - `accountID: string`\n  - `network: string`\n  - `participants: { hasMore: boolean; items: { id: string; cannotMessage?: boolean; email?: string; fullName?: string; imgURL?: string; isSelf?: boolean; phoneNumber?: string; username?: string; }[]; total: number; }`\n  - `title: string`\n  - `type: 'single' | 'group'`\n  - `unreadCount: number`\n  - `capabilities?: { allowedReactions?: string[]; archive?: boolean; attachments?: object; customEmojiReactions?: boolean; delete?: -2 | -1 | 0 | 1 | 2; deleteChat?: boolean; deleteChatForEveryone?: boolean; deleteForMe?: boolean; deleteMaxAge?: number; disappearingTimer?: { omitEmptyTimer?: boolean; timers?: number[]; types?: 'afterRead' | 'afterSend'[]; }; edit?: -2 | -1 | 0 | 1 | 2; editMaxAge?: number; editMaxCount?: number; formatting?: object; locationMessage?: -2 | -1 | 0 | 1 | 2; markAsUnread?: boolean; maxTextLength?: number; messageRequest?: { acceptWithButton?: -2 | -1 | 0 | 1 | 2; acceptWithMessage?: -2 | -1 | 0 | 1 | 2; }; participantActions?: { ban?: -2 | -1 | 0 | 1 | 2; invite?: -2 | -1 | 0 | 1 | 2; kick?: -2 | -1 | 0 | 1 | 2; leave?: -2 | -1 | 0 | 1 | 2; revokeInvite?: -2 | -1 | 0 | 1 | 2; }; poll?: -2 | -1 | 0 | 1 | 2; reaction?: -2 | -1 | 0 | 1 | 2; reactionCount?: number; readReceipts?: boolean; reply?: -2 | -1 | 0 | 1 | 2; state?: { avatar?: { level: -2 | -1 | 0 | 1 | 2; }; description?: { level: -2 | -1 | 0 | 1 | 2; }; disappearingTimer?: { level: -2 | -1 | 0 | 1 | 2; }; title?: { level: -2 | -1 | 0 | 1 | 2; }; }; thread?: -2 | -1 | 0 | 1 | 2; typingNotifications?: boolean; }`\n  - `description?: string`\n  - `draft?: { text: string; attachments?: object; }`\n  - `imgURL?: string`\n  - `isArchived?: boolean`\n  - `isLowPriority?: boolean`\n  - `isMarkedUnread?: boolean`\n  - `isMuted?: boolean`\n  - `isPinned?: boolean`\n  - `isReadOnly?: boolean`\n  - `lastActivity?: string`\n  - `lastReadMessageSortKey?: string`\n  - `localChatID?: string`\n  - `messageExpirySeconds?: number`\n  - `reminder?: { dismissOnIncomingMessage?: boolean; remindAt?: string; }`\n  - `snooze?: { snoozeUntil?: string; userSnoozedAt?: string; }`\n  - `unreadMentionsCount?: number`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst chat = await client.chats.notifyAnyway('!NCdzlIaMjZUmvmvyHU:beeper.com');\n\nconsole.log(chat);\n```",
    perLanguage: {
      typescript: {
        method: 'client.chats.notifyAnyway',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst chat = await client.chats.notifyAnyway('!NCdzlIaMjZUmvmvyHU:beeper.com');\n\nconsole.log(chat.id);",
      },
      python: {
        method: 'chats.notify_anyway',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nchat = client.chats.notify_anyway(\n    "!NCdzlIaMjZUmvmvyHU:beeper.com",\n)\nprint(chat.id)',
      },
      go: {
        method: 'client.Chats.NotifyAnyway',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tchat, err := client.Chats.NotifyAnyway(\n\t\tcontext.TODO(),\n\t\t"!NCdzlIaMjZUmvmvyHU:beeper.com",\n\t\tbeeperdesktopapi.ChatNotifyAnywayParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", chat.ID)\n}\n',
      },
      cli: {
        method: 'chats notify_anyway',
        example:
          "beeper-desktop-cli chats notify-anyway \\\n  --access-token 'My Access Token' \\\n  --chat-id '!NCdzlIaMjZUmvmvyHU:beeper.com'",
      },
      php: {
        method: 'chats->notifyAnyway',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$chat = $client->chats->notifyAnyway('!NCdzlIaMjZUmvmvyHU:beeper.com');\n\nvar_dump($chat);",
      },
      http: {
        example:
          'curl http://localhost:23373/v1/chats/$CHAT_ID/notify-anyway \\\n    -X POST \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v1/chats/{chatID}/reminders',
    httpMethod: 'post',
    summary: 'Create a chat reminder',
    description: 'Set a reminder for a chat at a specific time',
    stainlessPath: '(resource) chats.reminders > (method) create',
    qualified: 'client.chats.reminders.create',
    params: ['chatID: string;', 'reminder: { remindAt: string; dismissOnIncomingMessage?: boolean; };'],
    markdown:
      "## create\n\n`client.chats.reminders.create(chatID: string, reminder: { remindAt: string; dismissOnIncomingMessage?: boolean; }): void`\n\n**post** `/v1/chats/{chatID}/reminders`\n\nSet a reminder for a chat at a specific time\n\n### Parameters\n\n- `chatID: string`\n  Chat ID. Input routes also accept the local chat ID from this Beeper Desktop installation when available.\n\n- `reminder: { remindAt: string; dismissOnIncomingMessage?: boolean; }`\n  Reminder configuration\n  - `remindAt: string`\n    Timestamp when the reminder should trigger.\n  - `dismissOnIncomingMessage?: boolean`\n    Cancel reminder if someone messages in the chat\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nawait client.chats.reminders.create('!NCdzlIaMjZUmvmvyHU:beeper.com', { reminder: { remindAt: '2025-08-31T23:30:12.520Z' } })\n```",
    perLanguage: {
      typescript: {
        method: 'client.chats.reminders.create',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nawait client.chats.reminders.create('!NCdzlIaMjZUmvmvyHU:beeper.com', {\n  reminder: { remindAt: '2025-08-31T23:30:12.520Z' },\n});",
      },
      python: {
        method: 'chats.reminders.create',
        example:
          'import os\nfrom datetime import datetime\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nclient.chats.reminders.create(\n    chat_id="!NCdzlIaMjZUmvmvyHU:beeper.com",\n    reminder={\n        "remind_at": datetime.fromisoformat("2025-08-31T23:30:12.520")\n    },\n)',
      },
      go: {
        method: 'client.Chats.Reminders.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"time"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\terr := client.Chats.Reminders.New(\n\t\tcontext.TODO(),\n\t\t"!NCdzlIaMjZUmvmvyHU:beeper.com",\n\t\tbeeperdesktopapi.ChatReminderNewParams{\n\t\t\tReminder: beeperdesktopapi.ChatReminderNewParamsReminder{\n\t\t\t\tRemindAt: time.Now(),\n\t\t\t},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      cli: {
        method: 'reminders create',
        example:
          "beeper-desktop-cli chats:reminders create \\\n  --access-token 'My Access Token' \\\n  --chat-id '!NCdzlIaMjZUmvmvyHU:beeper.com' \\\n  --reminder \"{remindAt: '2025-08-31T23:30:12.520Z'}\"",
      },
      php: {
        method: 'chats->reminders->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$result = $client->chats->reminders->create(\n  '!NCdzlIaMjZUmvmvyHU:beeper.com',\n  reminder: [\n    'remindAt' => new \\DateTimeImmutable('2025-08-31T23:30:12.520Z'),\n    'dismissOnIncomingMessage' => true,\n  ],\n);\n\nvar_dump($result);",
      },
      http: {
        example:
          'curl http://localhost:23373/v1/chats/$CHAT_ID/reminders \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN" \\\n    -d \'{\n          "reminder": {\n            "remindAt": "2025-08-31T23:30:12.520Z"\n          }\n        }\'',
      },
    },
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
      "## delete\n\n`client.chats.reminders.delete(chatID: string): void`\n\n**delete** `/v1/chats/{chatID}/reminders`\n\nClear an existing reminder from a chat\n\n### Parameters\n\n- `chatID: string`\n  Chat ID. Input routes also accept the local chat ID from this Beeper Desktop installation when available.\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nawait client.chats.reminders.delete('!NCdzlIaMjZUmvmvyHU:beeper.com')\n```",
    perLanguage: {
      typescript: {
        method: 'client.chats.reminders.delete',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nawait client.chats.reminders.delete('!NCdzlIaMjZUmvmvyHU:beeper.com');",
      },
      python: {
        method: 'chats.reminders.delete',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nclient.chats.reminders.delete(\n    "!NCdzlIaMjZUmvmvyHU:beeper.com",\n)',
      },
      go: {
        method: 'client.Chats.Reminders.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\terr := client.Chats.Reminders.Delete(context.TODO(), "!NCdzlIaMjZUmvmvyHU:beeper.com")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      cli: {
        method: 'reminders delete',
        example:
          "beeper-desktop-cli chats:reminders delete \\\n  --access-token 'My Access Token' \\\n  --chat-id '!NCdzlIaMjZUmvmvyHU:beeper.com'",
      },
      php: {
        method: 'chats->reminders->delete',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$result = $client->chats->reminders->delete('!NCdzlIaMjZUmvmvyHU:beeper.com');\n\nvar_dump($result);",
      },
      http: {
        example:
          'curl http://localhost:23373/v1/chats/$CHAT_ID/reminders \\\n    -X DELETE \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
    },
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
      "## add\n\n`client.chats.messages.reactions.add(chatID: string, messageID: string, reactionKey: string, transactionID?: string): { chatID: string; messageID: string; reactionKey: string; success: true; transactionID: string; }`\n\n**post** `/v1/chats/{chatID}/messages/{messageID}/reactions`\n\nAdd a reaction to an existing message.\n\n### Parameters\n\n- `chatID: string`\n  Chat ID. Input routes also accept the local chat ID from this Beeper Desktop installation when available.\n\n- `messageID: string`\n  Message ID.\n\n- `reactionKey: string`\n  Reaction key to add (emoji, shortcode, or custom emoji key)\n\n- `transactionID?: string`\n  Optional transaction ID for deduplication and send tracking\n\n### Returns\n\n- `{ chatID: string; messageID: string; reactionKey: string; success: true; transactionID: string; }`\n\n  - `chatID: string`\n  - `messageID: string`\n  - `reactionKey: string`\n  - `success: true`\n  - `transactionID: string`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst response = await client.chats.messages.reactions.add('1343993', { chatID: '!NCdzlIaMjZUmvmvyHU:beeper.com', reactionKey: 'x' });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.chats.messages.reactions.add',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.chats.messages.reactions.add('1343993', {\n  chatID: '!NCdzlIaMjZUmvmvyHU:beeper.com',\n  reactionKey: 'x',\n});\n\nconsole.log(response.chatID);",
      },
      python: {
        method: 'chats.messages.reactions.add',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.chats.messages.reactions.add(\n    message_id="1343993",\n    chat_id="!NCdzlIaMjZUmvmvyHU:beeper.com",\n    reaction_key="x",\n)\nprint(response.chat_id)',
      },
      go: {
        method: 'client.Chats.Messages.Reactions.Add',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.Chats.Messages.Reactions.Add(\n\t\tcontext.TODO(),\n\t\t"1343993",\n\t\tbeeperdesktopapi.ChatMessageReactionAddParams{\n\t\t\tChatID:      "!NCdzlIaMjZUmvmvyHU:beeper.com",\n\t\t\tReactionKey: "x",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ChatID)\n}\n',
      },
      cli: {
        method: 'reactions add',
        example:
          "beeper-desktop-cli chats:messages:reactions add \\\n  --access-token 'My Access Token' \\\n  --chat-id '!NCdzlIaMjZUmvmvyHU:beeper.com' \\\n  --message-id 1343993 \\\n  --reaction-key x",
      },
      php: {
        method: 'chats->messages->reactions->add',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->chats->messages->reactions->add(\n  '1343993',\n  chatID: '!NCdzlIaMjZUmvmvyHU:beeper.com',\n  reactionKey: 'x',\n  transactionID: 'transactionID',\n);\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl http://localhost:23373/v1/chats/$CHAT_ID/messages/$MESSAGE_ID/reactions \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN" \\\n    -d \'{\n          "reactionKey": "x"\n        }\'',
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v1/chats/{chatID}/messages/{messageID}/reactions/{reactionKey}',
    httpMethod: 'delete',
    summary: 'Remove a reaction',
    description: 'Remove the reaction added by the authenticated user from an existing message.',
    stainlessPath: '(resource) chats.messages.reactions > (method) delete',
    qualified: 'client.chats.messages.reactions.delete',
    params: ['chatID: string;', 'messageID: string;', 'reactionKey: string;'],
    response: '{ chatID: string; messageID: string; reactionKey: string; success: true; }',
    markdown:
      "## delete\n\n`client.chats.messages.reactions.delete(chatID: string, messageID: string, reactionKey: string): { chatID: string; messageID: string; reactionKey: string; success: true; }`\n\n**delete** `/v1/chats/{chatID}/messages/{messageID}/reactions/{reactionKey}`\n\nRemove the reaction added by the authenticated user from an existing message.\n\n### Parameters\n\n- `chatID: string`\n  Chat ID. Input routes also accept the local chat ID from this Beeper Desktop installation when available.\n\n- `messageID: string`\n  Message ID.\n\n- `reactionKey: string`\n  Reaction key to remove (emoji, shortcode, or custom emoji key)\n\n### Returns\n\n- `{ chatID: string; messageID: string; reactionKey: string; success: true; }`\n\n  - `chatID: string`\n  - `messageID: string`\n  - `reactionKey: string`\n  - `success: true`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst reaction = await client.chats.messages.reactions.delete('x', { chatID: '!NCdzlIaMjZUmvmvyHU:beeper.com', messageID: '1343993' });\n\nconsole.log(reaction);\n```",
    perLanguage: {
      typescript: {
        method: 'client.chats.messages.reactions.delete',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst reaction = await client.chats.messages.reactions.delete('x', {\n  chatID: '!NCdzlIaMjZUmvmvyHU:beeper.com',\n  messageID: '1343993',\n});\n\nconsole.log(reaction.chatID);",
      },
      python: {
        method: 'chats.messages.reactions.delete',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nreaction = client.chats.messages.reactions.delete(\n    reaction_key="x",\n    chat_id="!NCdzlIaMjZUmvmvyHU:beeper.com",\n    message_id="1343993",\n)\nprint(reaction.chat_id)',
      },
      go: {
        method: 'client.Chats.Messages.Reactions.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\treaction, err := client.Chats.Messages.Reactions.Delete(\n\t\tcontext.TODO(),\n\t\t"x",\n\t\tbeeperdesktopapi.ChatMessageReactionDeleteParams{\n\t\t\tChatID:    "!NCdzlIaMjZUmvmvyHU:beeper.com",\n\t\t\tMessageID: "1343993",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", reaction.ChatID)\n}\n',
      },
      cli: {
        method: 'reactions delete',
        example:
          "beeper-desktop-cli chats:messages:reactions delete \\\n  --access-token 'My Access Token' \\\n  --chat-id '!NCdzlIaMjZUmvmvyHU:beeper.com' \\\n  --message-id 1343993 \\\n  --reaction-key x",
      },
      php: {
        method: 'chats->messages->reactions->delete',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$reaction = $client->chats->messages->reactions->delete(\n  'x', chatID: '!NCdzlIaMjZUmvmvyHU:beeper.com', messageID: '1343993'\n);\n\nvar_dump($reaction);",
      },
      http: {
        example:
          'curl http://localhost:23373/v1/chats/$CHAT_ID/messages/$MESSAGE_ID/reactions/$REACTION_KEY \\\n    -X DELETE \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
    },
  },
  {
    name: 'search',
    endpoint: '/v1/messages/search',
    httpMethod: 'get',
    summary: 'Search messages',
    description: 'Search messages across chats.',
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
      "{ id: string; accountID: string; chatID: string; senderID: string; sortKey: string; timestamp: string; attachments?: { type: 'unknown' | 'img' | 'video' | 'audio'; id?: string; duration?: number; fileName?: string; fileSize?: number; isGif?: boolean; isSticker?: boolean; isVoiceNote?: boolean; mimeType?: string; posterImg?: string; size?: object; srcURL?: string; transcription?: object; }[]; editedTimestamp?: string; isDeleted?: boolean; isHidden?: boolean; isSender?: boolean; isUnread?: boolean; linkedMessageID?: string; links?: { title: string; url: string; favicon?: string; img?: string; imgSize?: { height?: number; width?: number; }; originalURL?: string; summary?: string; }[]; mentions?: string[]; reactions?: { id: string; participantID: string; reactionKey: string; emoji?: boolean; imgURL?: string; }[]; seen?: boolean | string | object; senderName?: string; sendStatus?: { status: 'SUCCESS' | 'PENDING' | 'FAIL_RETRIABLE' | 'FAIL_PERMANENT'; timestamp: string; deliveredToUsers?: string[]; internalError?: string; message?: string; reason?: string; }; text?: string; type?: string; }",
    markdown:
      "## search\n\n`client.messages.search(accountIDs?: string[], chatIDs?: string[], chatType?: 'group' | 'single', cursor?: string, dateAfter?: string, dateBefore?: string, direction?: 'after' | 'before', excludeLowPriority?: boolean, includeMuted?: boolean, limit?: number, mediaTypes?: 'any' | 'video' | 'image' | 'link' | 'file'[], query?: string, sender?: string): { id: string; accountID: string; chatID: string; senderID: string; sortKey: string; timestamp: string; attachments?: attachment[]; editedTimestamp?: string; isDeleted?: boolean; isHidden?: boolean; isSender?: boolean; isUnread?: boolean; linkedMessageID?: string; links?: object[]; mentions?: string[]; reactions?: reaction[]; seen?: boolean | string | object; senderName?: string; sendStatus?: object; text?: string; type?: string; }`\n\n**get** `/v1/messages/search`\n\nSearch messages across chats.\n\n### Parameters\n\n- `accountIDs?: string[]`\n  Limit search to specific account IDs.\n\n- `chatIDs?: string[]`\n  Limit search to specific chat IDs.\n\n- `chatType?: 'group' | 'single'`\n  Filter by chat type: 'group' for group chats, 'single' for 1:1 chats.\n\n- `cursor?: string`\n  Opaque pagination cursor; do not inspect. Use together with 'direction'.\n\n- `dateAfter?: string`\n  Only include messages with timestamp strictly after this ISO 8601 datetime (e.g., '2024-07-01T00:00:00Z' or '2024-07-01T00:00:00+02:00').\n\n- `dateBefore?: string`\n  Only include messages with timestamp strictly before this ISO 8601 datetime (e.g., '2024-07-31T23:59:59Z' or '2024-07-31T23:59:59+02:00').\n\n- `direction?: 'after' | 'before'`\n  Pagination direction used with 'cursor': 'before' fetches older results, 'after' fetches newer results. Defaults to 'before' when only 'cursor' is provided.\n\n- `excludeLowPriority?: boolean`\n  Exclude messages marked Low Priority by the user. Default: true. Set to false to include all.\n\n- `includeMuted?: boolean`\n  Include messages in chats marked as Muted by the user, which are usually less important. Default: true. Set to false if the user wants a more refined search.\n\n- `limit?: number`\n  Maximum number of messages to return.\n\n- `mediaTypes?: 'any' | 'video' | 'image' | 'link' | 'file'[]`\n  Filter messages by media types. Use ['any'] for any media type, or specify exact types like ['video', 'image']. Omit for no media filtering.\n\n- `query?: string`\n  Literal word search (non-semantic). Finds messages containing these EXACT words in any order. Use single words users actually type, not concepts or phrases. Example: use \"dinner\" not \"dinner plans\", use \"sick\" not \"health issues\". If omitted, returns results filtered only by other parameters.\n\n- `sender?: string`\n  Filter by sender: 'me' (messages sent by the authenticated user), 'others' (messages sent by others), or a specific user ID string (user.id).\n\n### Returns\n\n- `{ id: string; accountID: string; chatID: string; senderID: string; sortKey: string; timestamp: string; attachments?: { type: 'unknown' | 'img' | 'video' | 'audio'; id?: string; duration?: number; fileName?: string; fileSize?: number; isGif?: boolean; isSticker?: boolean; isVoiceNote?: boolean; mimeType?: string; posterImg?: string; size?: object; srcURL?: string; transcription?: object; }[]; editedTimestamp?: string; isDeleted?: boolean; isHidden?: boolean; isSender?: boolean; isUnread?: boolean; linkedMessageID?: string; links?: { title: string; url: string; favicon?: string; img?: string; imgSize?: { height?: number; width?: number; }; originalURL?: string; summary?: string; }[]; mentions?: string[]; reactions?: { id: string; participantID: string; reactionKey: string; emoji?: boolean; imgURL?: string; }[]; seen?: boolean | string | object; senderName?: string; sendStatus?: { status: 'SUCCESS' | 'PENDING' | 'FAIL_RETRIABLE' | 'FAIL_PERMANENT'; timestamp: string; deliveredToUsers?: string[]; internalError?: string; message?: string; reason?: string; }; text?: string; type?: string; }`\n\n  - `id: string`\n  - `accountID: string`\n  - `chatID: string`\n  - `senderID: string`\n  - `sortKey: string`\n  - `timestamp: string`\n  - `attachments?: { type: 'unknown' | 'img' | 'video' | 'audio'; id?: string; duration?: number; fileName?: string; fileSize?: number; isGif?: boolean; isSticker?: boolean; isVoiceNote?: boolean; mimeType?: string; posterImg?: string; size?: { height?: number; width?: number; }; srcURL?: string; transcription?: { engine: string; transcription: string; language?: string; }; }[]`\n  - `editedTimestamp?: string`\n  - `isDeleted?: boolean`\n  - `isHidden?: boolean`\n  - `isSender?: boolean`\n  - `isUnread?: boolean`\n  - `linkedMessageID?: string`\n  - `links?: { title: string; url: string; favicon?: string; img?: string; imgSize?: { height?: number; width?: number; }; originalURL?: string; summary?: string; }[]`\n  - `mentions?: string[]`\n  - `reactions?: { id: string; participantID: string; reactionKey: string; emoji?: boolean; imgURL?: string; }[]`\n  - `seen?: boolean | string | object`\n  - `senderName?: string`\n  - `sendStatus?: { status: 'SUCCESS' | 'PENDING' | 'FAIL_RETRIABLE' | 'FAIL_PERMANENT'; timestamp: string; deliveredToUsers?: string[]; internalError?: string; message?: string; reason?: string; }`\n  - `text?: string`\n  - `type?: string`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\n// Automatically fetches more pages as needed.\nfor await (const message of client.messages.search()) {\n  console.log(message);\n}\n```",
    perLanguage: {
      typescript: {
        method: 'client.messages.search',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const message of client.messages.search()) {\n  console.log(message.id);\n}",
      },
      python: {
        method: 'messages.search',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\npage = client.messages.search()\npage = page.items[0]\nprint(page.id)',
      },
      go: {
        method: 'client.Messages.Search',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tpage, err := client.Messages.Search(context.TODO(), beeperdesktopapi.MessageSearchParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      cli: {
        method: 'messages search',
        example: "beeper-desktop-cli messages search \\\n  --access-token 'My Access Token'",
      },
      php: {
        method: 'messages->search',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$page = $client->messages->search(\n  accountIDs: [\n    'matrix', 'discordgo', 'local-whatsapp_ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc'\n  ],\n  chatIDs: ['!NCdzlIaMjZUmvmvyHU:beeper.com', '1231073'],\n  chatType: 'group',\n  cursor: '1725489123456|c29tZUltc2dQYWdl',\n  dateAfter: new \\DateTimeImmutable('2025-08-01T00:00:00Z'),\n  dateBefore: new \\DateTimeImmutable('2025-08-31T23:59:59Z'),\n  direction: 'before',\n  excludeLowPriority: true,\n  includeMuted: true,\n  limit: 20,\n  mediaTypes: ['any'],\n  query: 'dinner',\n  sender: 'sender',\n);\n\nvar_dump($page);",
      },
      http: {
        example:
          'curl http://localhost:23373/v1/messages/search \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
    },
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
      "{ id: string; accountID: string; chatID: string; senderID: string; sortKey: string; timestamp: string; attachments?: { type: 'unknown' | 'img' | 'video' | 'audio'; id?: string; duration?: number; fileName?: string; fileSize?: number; isGif?: boolean; isSticker?: boolean; isVoiceNote?: boolean; mimeType?: string; posterImg?: string; size?: object; srcURL?: string; transcription?: object; }[]; editedTimestamp?: string; isDeleted?: boolean; isHidden?: boolean; isSender?: boolean; isUnread?: boolean; linkedMessageID?: string; links?: { title: string; url: string; favicon?: string; img?: string; imgSize?: { height?: number; width?: number; }; originalURL?: string; summary?: string; }[]; mentions?: string[]; reactions?: { id: string; participantID: string; reactionKey: string; emoji?: boolean; imgURL?: string; }[]; seen?: boolean | string | object; senderName?: string; sendStatus?: { status: 'SUCCESS' | 'PENDING' | 'FAIL_RETRIABLE' | 'FAIL_PERMANENT'; timestamp: string; deliveredToUsers?: string[]; internalError?: string; message?: string; reason?: string; }; text?: string; type?: string; }",
    markdown:
      "## list\n\n`client.messages.list(chatID: string, cursor?: string, direction?: 'after' | 'before'): { id: string; accountID: string; chatID: string; senderID: string; sortKey: string; timestamp: string; attachments?: attachment[]; editedTimestamp?: string; isDeleted?: boolean; isHidden?: boolean; isSender?: boolean; isUnread?: boolean; linkedMessageID?: string; links?: object[]; mentions?: string[]; reactions?: reaction[]; seen?: boolean | string | object; senderName?: string; sendStatus?: object; text?: string; type?: string; }`\n\n**get** `/v1/chats/{chatID}/messages`\n\nList all messages in a chat with cursor-based pagination. Sorted by timestamp.\n\n### Parameters\n\n- `chatID: string`\n  Chat ID. Input routes also accept the local chat ID from this Beeper Desktop installation when available.\n\n- `cursor?: string`\n  Opaque pagination cursor; do not inspect. Use together with 'direction'.\n\n- `direction?: 'after' | 'before'`\n  Pagination direction used with 'cursor': 'before' fetches older results, 'after' fetches newer results. Defaults to 'before' when only 'cursor' is provided.\n\n### Returns\n\n- `{ id: string; accountID: string; chatID: string; senderID: string; sortKey: string; timestamp: string; attachments?: { type: 'unknown' | 'img' | 'video' | 'audio'; id?: string; duration?: number; fileName?: string; fileSize?: number; isGif?: boolean; isSticker?: boolean; isVoiceNote?: boolean; mimeType?: string; posterImg?: string; size?: object; srcURL?: string; transcription?: object; }[]; editedTimestamp?: string; isDeleted?: boolean; isHidden?: boolean; isSender?: boolean; isUnread?: boolean; linkedMessageID?: string; links?: { title: string; url: string; favicon?: string; img?: string; imgSize?: { height?: number; width?: number; }; originalURL?: string; summary?: string; }[]; mentions?: string[]; reactions?: { id: string; participantID: string; reactionKey: string; emoji?: boolean; imgURL?: string; }[]; seen?: boolean | string | object; senderName?: string; sendStatus?: { status: 'SUCCESS' | 'PENDING' | 'FAIL_RETRIABLE' | 'FAIL_PERMANENT'; timestamp: string; deliveredToUsers?: string[]; internalError?: string; message?: string; reason?: string; }; text?: string; type?: string; }`\n\n  - `id: string`\n  - `accountID: string`\n  - `chatID: string`\n  - `senderID: string`\n  - `sortKey: string`\n  - `timestamp: string`\n  - `attachments?: { type: 'unknown' | 'img' | 'video' | 'audio'; id?: string; duration?: number; fileName?: string; fileSize?: number; isGif?: boolean; isSticker?: boolean; isVoiceNote?: boolean; mimeType?: string; posterImg?: string; size?: { height?: number; width?: number; }; srcURL?: string; transcription?: { engine: string; transcription: string; language?: string; }; }[]`\n  - `editedTimestamp?: string`\n  - `isDeleted?: boolean`\n  - `isHidden?: boolean`\n  - `isSender?: boolean`\n  - `isUnread?: boolean`\n  - `linkedMessageID?: string`\n  - `links?: { title: string; url: string; favicon?: string; img?: string; imgSize?: { height?: number; width?: number; }; originalURL?: string; summary?: string; }[]`\n  - `mentions?: string[]`\n  - `reactions?: { id: string; participantID: string; reactionKey: string; emoji?: boolean; imgURL?: string; }[]`\n  - `seen?: boolean | string | object`\n  - `senderName?: string`\n  - `sendStatus?: { status: 'SUCCESS' | 'PENDING' | 'FAIL_RETRIABLE' | 'FAIL_PERMANENT'; timestamp: string; deliveredToUsers?: string[]; internalError?: string; message?: string; reason?: string; }`\n  - `text?: string`\n  - `type?: string`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\n// Automatically fetches more pages as needed.\nfor await (const message of client.messages.list('!NCdzlIaMjZUmvmvyHU:beeper.com')) {\n  console.log(message);\n}\n```",
    perLanguage: {
      typescript: {
        method: 'client.messages.list',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const message of client.messages.list('!NCdzlIaMjZUmvmvyHU:beeper.com')) {\n  console.log(message.id);\n}",
      },
      python: {
        method: 'messages.list',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\npage = client.messages.list(\n    chat_id="!NCdzlIaMjZUmvmvyHU:beeper.com",\n)\npage = page.items[0]\nprint(page.id)',
      },
      go: {
        method: 'client.Messages.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tpage, err := client.Messages.List(\n\t\tcontext.TODO(),\n\t\t"!NCdzlIaMjZUmvmvyHU:beeper.com",\n\t\tbeeperdesktopapi.MessageListParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      cli: {
        method: 'messages list',
        example:
          "beeper-desktop-cli messages list \\\n  --access-token 'My Access Token' \\\n  --chat-id '!NCdzlIaMjZUmvmvyHU:beeper.com'",
      },
      php: {
        method: 'messages->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$page = $client->messages->list(\n  '!NCdzlIaMjZUmvmvyHU:beeper.com',\n  cursor: '1725489123456|c29tZUltc2dQYWdl',\n  direction: 'before',\n);\n\nvar_dump($page);",
      },
      http: {
        example:
          'curl http://localhost:23373/v1/chats/$CHAT_ID/messages \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
    },
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
      "attachment?: { uploadID: string; duration?: number; fileName?: string; mimeType?: string; size?: { height: number; width: number; }; type?: 'image' | 'video' | 'audio' | 'file' | 'gif' | 'voice-note' | 'sticker'; };",
      'replyToMessageID?: string;',
      'text?: string;',
    ],
    response: '{ chatID: string; pendingMessageID: string; }',
    markdown:
      "## send\n\n`client.messages.send(chatID: string, attachment?: { uploadID: string; duration?: number; fileName?: string; mimeType?: string; size?: { height: number; width: number; }; type?: 'image' | 'video' | 'audio' | 'file' | 'gif' | 'voice-note' | 'sticker'; }, replyToMessageID?: string, text?: string): { chatID: string; pendingMessageID: string; }`\n\n**post** `/v1/chats/{chatID}/messages`\n\nSend a text message to a specific chat. Supports replying to existing messages. Returns a pending message ID.\n\n### Parameters\n\n- `chatID: string`\n  Chat ID. Input routes also accept the local chat ID from this Beeper Desktop installation when available.\n\n- `attachment?: { uploadID: string; duration?: number; fileName?: string; mimeType?: string; size?: { height: number; width: number; }; type?: 'image' | 'video' | 'audio' | 'file' | 'gif' | 'voice-note' | 'sticker'; }`\n  Single attachment to send with the message\n  - `uploadID: string`\n    Upload ID from uploadAsset endpoint. Required to reference uploaded files.\n  - `duration?: number`\n    Duration in seconds (optional override of cached value)\n  - `fileName?: string`\n    Filename (optional override of cached value)\n  - `mimeType?: string`\n    MIME type (optional override of cached value)\n  - `size?: { height: number; width: number; }`\n    Dimensions (optional override of cached value)\n  - `type?: 'image' | 'video' | 'audio' | 'file' | 'gif' | 'voice-note' | 'sticker'`\n    Attachment type hint (image, video, audio, file, gif, voice-note, sticker). If omitted, auto-detected from mimeType\n\n- `replyToMessageID?: string`\n  Provide a message ID to send this as a reply to an existing message\n\n- `text?: string`\n  Draft text. Plain text and Markdown are converted to Matrix HTML with the same rules used by send and edit.\n\n### Returns\n\n- `{ chatID: string; pendingMessageID: string; }`\n\n  - `chatID: string`\n  - `pendingMessageID: string`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst response = await client.messages.send('!NCdzlIaMjZUmvmvyHU:beeper.com');\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.messages.send',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.messages.send('!NCdzlIaMjZUmvmvyHU:beeper.com');\n\nconsole.log(response.pendingMessageID);",
      },
      python: {
        method: 'messages.send',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.messages.send(\n    chat_id="!NCdzlIaMjZUmvmvyHU:beeper.com",\n)\nprint(response.pending_message_id)',
      },
      go: {
        method: 'client.Messages.Send',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.Messages.Send(\n\t\tcontext.TODO(),\n\t\t"!NCdzlIaMjZUmvmvyHU:beeper.com",\n\t\tbeeperdesktopapi.MessageSendParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.PendingMessageID)\n}\n',
      },
      cli: {
        method: 'messages send',
        example:
          "beeper-desktop-cli messages send \\\n  --access-token 'My Access Token' \\\n  --chat-id '!NCdzlIaMjZUmvmvyHU:beeper.com'",
      },
      php: {
        method: 'messages->send',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->messages->send(\n  '!NCdzlIaMjZUmvmvyHU:beeper.com',\n  attachment: [\n    'uploadID' => 'uploadID',\n    'duration' => 0,\n    'fileName' => 'fileName',\n    'mimeType' => 'mimeType',\n    'size' => ['height' => 0, 'width' => 0],\n    'type' => 'image',\n  ],\n  replyToMessageID: 'replyToMessageID',\n  text: 'text',\n);\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl http://localhost:23373/v1/chats/$CHAT_ID/messages \\\n    -X POST \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/v1/chats/{chatID}/messages/{messageID}',
    httpMethod: 'get',
    summary: 'Retrieve a message',
    description:
      'Retrieve a message by final message ID, pendingMessageID, or Matrix event ID. Chat ID may be a Beeper chat ID or local chat ID.',
    stainlessPath: '(resource) messages > (method) retrieve',
    qualified: 'client.messages.retrieve',
    params: ['chatID: string;', 'messageID: string;'],
    response:
      "{ id: string; accountID: string; chatID: string; senderID: string; sortKey: string; timestamp: string; attachments?: { type: 'unknown' | 'img' | 'video' | 'audio'; id?: string; duration?: number; fileName?: string; fileSize?: number; isGif?: boolean; isSticker?: boolean; isVoiceNote?: boolean; mimeType?: string; posterImg?: string; size?: object; srcURL?: string; transcription?: object; }[]; editedTimestamp?: string; isDeleted?: boolean; isHidden?: boolean; isSender?: boolean; isUnread?: boolean; linkedMessageID?: string; links?: { title: string; url: string; favicon?: string; img?: string; imgSize?: { height?: number; width?: number; }; originalURL?: string; summary?: string; }[]; mentions?: string[]; reactions?: { id: string; participantID: string; reactionKey: string; emoji?: boolean; imgURL?: string; }[]; seen?: boolean | string | object; senderName?: string; sendStatus?: { status: 'SUCCESS' | 'PENDING' | 'FAIL_RETRIABLE' | 'FAIL_PERMANENT'; timestamp: string; deliveredToUsers?: string[]; internalError?: string; message?: string; reason?: string; }; text?: string; type?: string; }",
    markdown:
      "## retrieve\n\n`client.messages.retrieve(chatID: string, messageID: string): { id: string; accountID: string; chatID: string; senderID: string; sortKey: string; timestamp: string; attachments?: attachment[]; editedTimestamp?: string; isDeleted?: boolean; isHidden?: boolean; isSender?: boolean; isUnread?: boolean; linkedMessageID?: string; links?: object[]; mentions?: string[]; reactions?: reaction[]; seen?: boolean | string | object; senderName?: string; sendStatus?: object; text?: string; type?: string; }`\n\n**get** `/v1/chats/{chatID}/messages/{messageID}`\n\nRetrieve a message by final message ID, pendingMessageID, or Matrix event ID. Chat ID may be a Beeper chat ID or local chat ID.\n\n### Parameters\n\n- `chatID: string`\n  Chat ID. Input routes also accept the local chat ID from this Beeper Desktop installation when available.\n\n- `messageID: string`\n  Message ID.\n\n### Returns\n\n- `{ id: string; accountID: string; chatID: string; senderID: string; sortKey: string; timestamp: string; attachments?: { type: 'unknown' | 'img' | 'video' | 'audio'; id?: string; duration?: number; fileName?: string; fileSize?: number; isGif?: boolean; isSticker?: boolean; isVoiceNote?: boolean; mimeType?: string; posterImg?: string; size?: object; srcURL?: string; transcription?: object; }[]; editedTimestamp?: string; isDeleted?: boolean; isHidden?: boolean; isSender?: boolean; isUnread?: boolean; linkedMessageID?: string; links?: { title: string; url: string; favicon?: string; img?: string; imgSize?: { height?: number; width?: number; }; originalURL?: string; summary?: string; }[]; mentions?: string[]; reactions?: { id: string; participantID: string; reactionKey: string; emoji?: boolean; imgURL?: string; }[]; seen?: boolean | string | object; senderName?: string; sendStatus?: { status: 'SUCCESS' | 'PENDING' | 'FAIL_RETRIABLE' | 'FAIL_PERMANENT'; timestamp: string; deliveredToUsers?: string[]; internalError?: string; message?: string; reason?: string; }; text?: string; type?: string; }`\n\n  - `id: string`\n  - `accountID: string`\n  - `chatID: string`\n  - `senderID: string`\n  - `sortKey: string`\n  - `timestamp: string`\n  - `attachments?: { type: 'unknown' | 'img' | 'video' | 'audio'; id?: string; duration?: number; fileName?: string; fileSize?: number; isGif?: boolean; isSticker?: boolean; isVoiceNote?: boolean; mimeType?: string; posterImg?: string; size?: { height?: number; width?: number; }; srcURL?: string; transcription?: { engine: string; transcription: string; language?: string; }; }[]`\n  - `editedTimestamp?: string`\n  - `isDeleted?: boolean`\n  - `isHidden?: boolean`\n  - `isSender?: boolean`\n  - `isUnread?: boolean`\n  - `linkedMessageID?: string`\n  - `links?: { title: string; url: string; favicon?: string; img?: string; imgSize?: { height?: number; width?: number; }; originalURL?: string; summary?: string; }[]`\n  - `mentions?: string[]`\n  - `reactions?: { id: string; participantID: string; reactionKey: string; emoji?: boolean; imgURL?: string; }[]`\n  - `seen?: boolean | string | object`\n  - `senderName?: string`\n  - `sendStatus?: { status: 'SUCCESS' | 'PENDING' | 'FAIL_RETRIABLE' | 'FAIL_PERMANENT'; timestamp: string; deliveredToUsers?: string[]; internalError?: string; message?: string; reason?: string; }`\n  - `text?: string`\n  - `type?: string`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst message = await client.messages.retrieve('1343993', { chatID: '!NCdzlIaMjZUmvmvyHU:beeper.com' });\n\nconsole.log(message);\n```",
    perLanguage: {
      typescript: {
        method: 'client.messages.retrieve',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst message = await client.messages.retrieve('1343993', {\n  chatID: '!NCdzlIaMjZUmvmvyHU:beeper.com',\n});\n\nconsole.log(message.id);",
      },
      python: {
        method: 'messages.retrieve',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nmessage = client.messages.retrieve(\n    message_id="1343993",\n    chat_id="!NCdzlIaMjZUmvmvyHU:beeper.com",\n)\nprint(message.id)',
      },
      go: {
        method: 'client.Messages.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tmessage, err := client.Messages.Get(\n\t\tcontext.TODO(),\n\t\t"1343993",\n\t\tbeeperdesktopapi.MessageGetParams{\n\t\t\tChatID: "!NCdzlIaMjZUmvmvyHU:beeper.com",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", message.ID)\n}\n',
      },
      cli: {
        method: 'messages retrieve',
        example:
          "beeper-desktop-cli messages retrieve \\\n  --access-token 'My Access Token' \\\n  --chat-id '!NCdzlIaMjZUmvmvyHU:beeper.com' \\\n  --message-id 1343993",
      },
      php: {
        method: 'messages->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$message = $client->messages->retrieve(\n  '1343993', chatID: '!NCdzlIaMjZUmvmvyHU:beeper.com'\n);\n\nvar_dump($message);",
      },
      http: {
        example:
          'curl http://localhost:23373/v1/chats/$CHAT_ID/messages/$MESSAGE_ID \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
    },
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
    response:
      "{ id: string; accountID: string; chatID: string; senderID: string; sortKey: string; timestamp: string; attachments?: object[]; editedTimestamp?: string; isDeleted?: boolean; isHidden?: boolean; isSender?: boolean; isUnread?: boolean; linkedMessageID?: string; links?: { title: string; url: string; favicon?: string; img?: string; imgSize?: object; originalURL?: string; summary?: string; }[]; mentions?: string[]; reactions?: object[]; seen?: boolean | string | object; senderName?: string; sendStatus?: { status: 'SUCCESS' | 'PENDING' | 'FAIL_RETRIABLE' | 'FAIL_PERMANENT'; timestamp: string; deliveredToUsers?: string[]; internalError?: string; message?: string; reason?: string; }; text?: string; type?: string; }",
    markdown:
      "## update\n\n`client.messages.update(chatID: string, messageID: string, text: string): object`\n\n**put** `/v1/chats/{chatID}/messages/{messageID}`\n\nEdit the text content of an existing message. Messages with attachments cannot be edited.\n\n### Parameters\n\n- `chatID: string`\n  Chat ID. Input routes also accept the local chat ID from this Beeper Desktop installation when available.\n\n- `messageID: string`\n  Message ID.\n\n- `text: string`\n  New text content for the message\n\n### Returns\n\n- `{ id: string; accountID: string; chatID: string; senderID: string; sortKey: string; timestamp: string; attachments?: object[]; editedTimestamp?: string; isDeleted?: boolean; isHidden?: boolean; isSender?: boolean; isUnread?: boolean; linkedMessageID?: string; links?: { title: string; url: string; favicon?: string; img?: string; imgSize?: object; originalURL?: string; summary?: string; }[]; mentions?: string[]; reactions?: object[]; seen?: boolean | string | object; senderName?: string; sendStatus?: { status: 'SUCCESS' | 'PENDING' | 'FAIL_RETRIABLE' | 'FAIL_PERMANENT'; timestamp: string; deliveredToUsers?: string[]; internalError?: string; message?: string; reason?: string; }; text?: string; type?: string; }`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst message = await client.messages.update('1343993', { chatID: '!NCdzlIaMjZUmvmvyHU:beeper.com', text: 'x' });\n\nconsole.log(message);\n```",
    perLanguage: {
      typescript: {
        method: 'client.messages.update',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst message = await client.messages.update('1343993', {\n  chatID: '!NCdzlIaMjZUmvmvyHU:beeper.com',\n  text: 'x',\n});\n\nconsole.log(message);",
      },
      python: {
        method: 'messages.update',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nmessage = client.messages.update(\n    message_id="1343993",\n    chat_id="!NCdzlIaMjZUmvmvyHU:beeper.com",\n    text="x",\n)\nprint(message)',
      },
      go: {
        method: 'client.Messages.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tmessage, err := client.Messages.Update(\n\t\tcontext.TODO(),\n\t\t"1343993",\n\t\tbeeperdesktopapi.MessageUpdateParams{\n\t\t\tChatID: "!NCdzlIaMjZUmvmvyHU:beeper.com",\n\t\t\tText:   "x",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", message)\n}\n',
      },
      cli: {
        method: 'messages update',
        example:
          "beeper-desktop-cli messages update \\\n  --access-token 'My Access Token' \\\n  --chat-id '!NCdzlIaMjZUmvmvyHU:beeper.com' \\\n  --message-id 1343993 \\\n  --text x",
      },
      php: {
        method: 'messages->update',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$message = $client->messages->update(\n  '1343993', chatID: '!NCdzlIaMjZUmvmvyHU:beeper.com', text: 'x'\n);\n\nvar_dump($message);",
      },
      http: {
        example:
          'curl http://localhost:23373/v1/chats/$CHAT_ID/messages/$MESSAGE_ID \\\n    -X PUT \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN" \\\n    -d \'{\n          "text": "x"\n        }\'',
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v1/chats/{chatID}/messages/{messageID}',
    httpMethod: 'delete',
    summary: 'Delete a message',
    description:
      'Delete a message by final message ID. Pending message IDs are not accepted because messages cannot be deleted while sending.',
    stainlessPath: '(resource) messages > (method) delete',
    qualified: 'client.messages.delete',
    params: ['chatID: string;', 'messageID: string;', 'forEveryone?: boolean;'],
    markdown:
      "## delete\n\n`client.messages.delete(chatID: string, messageID: string, forEveryone?: boolean): void`\n\n**delete** `/v1/chats/{chatID}/messages/{messageID}`\n\nDelete a message by final message ID. Pending message IDs are not accepted because messages cannot be deleted while sending.\n\n### Parameters\n\n- `chatID: string`\n  Chat ID. Input routes also accept the local chat ID from this Beeper Desktop installation when available.\n\n- `messageID: string`\n  Message ID.\n\n- `forEveryone?: boolean`\n  True to request deletion for everyone when the network supports it; false to delete only for the authenticated user when supported.\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nawait client.messages.delete('1343993', { chatID: '!NCdzlIaMjZUmvmvyHU:beeper.com' })\n```",
    perLanguage: {
      typescript: {
        method: 'client.messages.delete',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nawait client.messages.delete('1343993', { chatID: '!NCdzlIaMjZUmvmvyHU:beeper.com' });",
      },
      python: {
        method: 'messages.delete',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nclient.messages.delete(\n    message_id="1343993",\n    chat_id="!NCdzlIaMjZUmvmvyHU:beeper.com",\n)',
      },
      go: {
        method: 'client.Messages.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\terr := client.Messages.Delete(\n\t\tcontext.TODO(),\n\t\t"1343993",\n\t\tbeeperdesktopapi.MessageDeleteParams{\n\t\t\tChatID: "!NCdzlIaMjZUmvmvyHU:beeper.com",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      cli: {
        method: 'messages delete',
        example:
          "beeper-desktop-cli messages delete \\\n  --access-token 'My Access Token' \\\n  --chat-id '!NCdzlIaMjZUmvmvyHU:beeper.com' \\\n  --message-id 1343993",
      },
      php: {
        method: 'messages->delete',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$result = $client->messages->delete(\n  '1343993', chatID: '!NCdzlIaMjZUmvmvyHU:beeper.com', forEveryone: true\n);\n\nvar_dump($result);",
      },
      http: {
        example:
          'curl http://localhost:23373/v1/chats/$CHAT_ID/messages/$MESSAGE_ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
    },
  },
  {
    name: 'download',
    endpoint: '/v1/assets/download',
    httpMethod: 'post',
    summary: 'Download a file',
    description:
      'Download a Matrix file using its mxc:// or localmxc:// URL to the device running Beeper Desktop and return the local file URL.',
    stainlessPath: '(resource) assets > (method) download',
    qualified: 'client.assets.download',
    params: ['url: string;'],
    response: '{ error?: string; srcURL?: string; }',
    markdown:
      "## download\n\n`client.assets.download(url: string): { error?: string; srcURL?: string; }`\n\n**post** `/v1/assets/download`\n\nDownload a Matrix file using its mxc:// or localmxc:// URL to the device running Beeper Desktop and return the local file URL.\n\n### Parameters\n\n- `url: string`\n  Matrix content URL (mxc:// or localmxc://) for the file to download.\n\n### Returns\n\n- `{ error?: string; srcURL?: string; }`\n\n  - `error?: string`\n  - `srcURL?: string`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst response = await client.assets.download({ url: 'mxc://example.org/Q4x9CqGz1pB3Oa6XgJ' });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.assets.download',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.assets.download({ url: 'mxc://example.org/Q4x9CqGz1pB3Oa6XgJ' });\n\nconsole.log(response.error);",
      },
      python: {
        method: 'assets.download',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.assets.download(\n    url="mxc://example.org/Q4x9CqGz1pB3Oa6XgJ",\n)\nprint(response.error)',
      },
      go: {
        method: 'client.Assets.Download',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.Assets.Download(context.TODO(), beeperdesktopapi.AssetDownloadParams{\n\t\tURL: "mxc://example.org/Q4x9CqGz1pB3Oa6XgJ",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Error)\n}\n',
      },
      cli: {
        method: 'assets download',
        example:
          "beeper-desktop-cli assets download \\\n  --access-token 'My Access Token' \\\n  --url mxc://example.org/Q4x9CqGz1pB3Oa6XgJ",
      },
      php: {
        method: 'assets->download',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->assets->download(\n  url: 'mxc://example.org/Q4x9CqGz1pB3Oa6XgJ'\n);\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl http://localhost:23373/v1/assets/download \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN" \\\n    -d \'{\n          "url": "mxc://example.org/Q4x9CqGz1pB3Oa6XgJ"\n        }\'',
      },
    },
  },
  {
    name: 'upload',
    endpoint: '/v1/assets/upload',
    httpMethod: 'post',
    summary: 'Upload a file',
    description:
      'Upload a file to a temporary location using multipart/form-data. Returns an uploadID that can be referenced when sending a message or materializing a draft attachment.',
    stainlessPath: '(resource) assets > (method) upload',
    qualified: 'client.assets.upload',
    params: ['file: string;', 'fileName?: string;', 'mimeType?: string;'],
    response:
      '{ duration?: number; error?: string; fileName?: string; fileSize?: number; height?: number; mimeType?: string; srcURL?: string; uploadID?: string; width?: number; }',
    markdown:
      "## upload\n\n`client.assets.upload(file: string, fileName?: string, mimeType?: string): { duration?: number; error?: string; fileName?: string; fileSize?: number; height?: number; mimeType?: string; srcURL?: string; uploadID?: string; width?: number; }`\n\n**post** `/v1/assets/upload`\n\nUpload a file to a temporary location using multipart/form-data. Returns an uploadID that can be referenced when sending a message or materializing a draft attachment.\n\n### Parameters\n\n- `file: string`\n  The file to upload (max 500 MB).\n\n- `fileName?: string`\n  Original filename. Defaults to the uploaded file name if omitted\n\n- `mimeType?: string`\n  MIME type. Auto-detected from magic bytes if omitted\n\n### Returns\n\n- `{ duration?: number; error?: string; fileName?: string; fileSize?: number; height?: number; mimeType?: string; srcURL?: string; uploadID?: string; width?: number; }`\n\n  - `duration?: number`\n  - `error?: string`\n  - `fileName?: string`\n  - `fileSize?: number`\n  - `height?: number`\n  - `mimeType?: string`\n  - `srcURL?: string`\n  - `uploadID?: string`\n  - `width?: number`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst response = await client.assets.upload({ file: fs.createReadStream('path/to/file') });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.assets.upload',
        example:
          "import fs from 'fs';\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.assets.upload({ file: fs.createReadStream('path/to/file') });\n\nconsole.log(response.width);",
      },
      python: {
        method: 'assets.upload',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.assets.upload(\n    file=b"Example data",\n)\nprint(response.width)',
      },
      go: {
        method: 'client.Assets.Upload',
        example:
          'package main\n\nimport (\n\t"bytes"\n\t"context"\n\t"fmt"\n\t"io"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.Assets.Upload(context.TODO(), beeperdesktopapi.AssetUploadParams{\n\t\tFile: io.Reader(bytes.NewBuffer([]byte("Example data"))),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Width)\n}\n',
      },
      cli: {
        method: 'assets upload',
        example:
          "beeper-desktop-cli assets upload \\\n  --access-token 'My Access Token' \\\n  --file 'Example data'",
      },
      php: {
        method: 'assets->upload',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->assets->upload(\n  file: FileParam::fromString('Example data', filename: uniqid('file-upload-', true)),\n  fileName: 'fileName',\n  mimeType: 'mimeType',\n);\n\nvar_dump($response);",
      },
      http: {
        example:
          "curl http://localhost:23373/v1/assets/upload \\\n    -H 'Content-Type: multipart/form-data' \\\n    -H \"Authorization: Bearer $BEEPER_ACCESS_TOKEN\" \\\n    -F 'file=@/path/to/file'",
      },
    },
  },
  {
    name: 'upload_base64',
    endpoint: '/v1/assets/upload/base64',
    httpMethod: 'post',
    summary: 'Upload a file (base64)',
    description:
      'Upload a file using a JSON body with base64-encoded content. Returns an uploadID that can be referenced when sending a message or materializing a draft attachment. Alternative to the multipart upload endpoint.',
    stainlessPath: '(resource) assets > (method) upload_base64',
    qualified: 'client.assets.uploadBase64',
    params: ['content: string;', 'fileName?: string;', 'mimeType?: string;'],
    response:
      '{ duration?: number; error?: string; fileName?: string; fileSize?: number; height?: number; mimeType?: string; srcURL?: string; uploadID?: string; width?: number; }',
    markdown:
      "## upload_base64\n\n`client.assets.uploadBase64(content: string, fileName?: string, mimeType?: string): { duration?: number; error?: string; fileName?: string; fileSize?: number; height?: number; mimeType?: string; srcURL?: string; uploadID?: string; width?: number; }`\n\n**post** `/v1/assets/upload/base64`\n\nUpload a file using a JSON body with base64-encoded content. Returns an uploadID that can be referenced when sending a message or materializing a draft attachment. Alternative to the multipart upload endpoint.\n\n### Parameters\n\n- `content: string`\n  Base64-encoded file content (max ~500MB decoded)\n\n- `fileName?: string`\n  Original filename. Generated if omitted\n\n- `mimeType?: string`\n  MIME type. Auto-detected from magic bytes if omitted\n\n### Returns\n\n- `{ duration?: number; error?: string; fileName?: string; fileSize?: number; height?: number; mimeType?: string; srcURL?: string; uploadID?: string; width?: number; }`\n\n  - `duration?: number`\n  - `error?: string`\n  - `fileName?: string`\n  - `fileSize?: number`\n  - `height?: number`\n  - `mimeType?: string`\n  - `srcURL?: string`\n  - `uploadID?: string`\n  - `width?: number`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst response = await client.assets.uploadBase64({ content: 'x' });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.assets.uploadBase64',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.assets.uploadBase64({ content: 'x' });\n\nconsole.log(response.width);",
      },
      python: {
        method: 'assets.upload_base64',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.assets.upload_base64(\n    content="x",\n)\nprint(response.width)',
      },
      go: {
        method: 'client.Assets.UploadBase64',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.Assets.UploadBase64(context.TODO(), beeperdesktopapi.AssetUploadBase64Params{\n\t\tContent: "x",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Width)\n}\n',
      },
      cli: {
        method: 'assets upload_base64',
        example:
          "beeper-desktop-cli assets upload-base64 \\\n  --access-token 'My Access Token' \\\n  --content x",
      },
      php: {
        method: 'assets->uploadBase64',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->assets->uploadBase64(\n  content: 'x', fileName: 'fileName', mimeType: 'mimeType'\n);\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl http://localhost:23373/v1/assets/upload/base64 \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN" \\\n    -d \'{\n          "content": "x"\n        }\'',
      },
    },
  },
  {
    name: 'serve',
    endpoint: '/v1/assets/serve',
    httpMethod: 'get',
    summary: 'Serve a file',
    description:
      'Stream a file given an mxc://, localmxc://, or file:// URL. Downloads first if not cached. Supports Range requests for seeking in large files.',
    stainlessPath: '(resource) assets > (method) serve',
    qualified: 'client.assets.serve',
    params: ['url: string;'],
    response: 'string',
    markdown:
      "## serve\n\n`client.assets.serve(url: string): string`\n\n**get** `/v1/assets/serve`\n\nStream a file given an mxc://, localmxc://, or file:// URL. Downloads first if not cached. Supports Range requests for seeking in large files.\n\n### Parameters\n\n- `url: string`\n  File URL to serve. Accepts mxc://, localmxc://, or file:// URLs.\n\n### Returns\n\n- `string`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst response = await client.assets.serve({ url: 'x' });\n\nconsole.log(response);\n\nconst content = await response.blob()\nconsole.log(content)\n```",
    perLanguage: {
      typescript: {
        method: 'client.assets.serve',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.assets.serve({ url: 'x' });\n\nconsole.log(response);\n\nconst content = await response.blob();\nconsole.log(content);",
      },
      python: {
        method: 'assets.serve',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.assets.serve(\n    url="x",\n)\nprint(response)\ncontent = response.read()\nprint(content)',
      },
      go: {
        method: 'client.Assets.Serve',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.Assets.Serve(context.TODO(), beeperdesktopapi.AssetServeParams{\n\t\tURL: "x",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response)\n}\n',
      },
      cli: {
        method: 'assets serve',
        example: "beeper-desktop-cli assets serve \\\n  --access-token 'My Access Token' \\\n  --url x",
      },
      php: {
        method: 'assets->serve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->assets->serve(url: 'x');\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl http://localhost:23373/v1/assets/serve \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/v1/info',
    httpMethod: 'get',
    summary: 'Retrieve server info',
    description:
      'Returns app, platform, server, endpoint discovery, OAuth, and WebSocket metadata for this Beeper Desktop instance.',
    stainlessPath: '(resource) info > (method) retrieve',
    qualified: 'client.info.retrieve',
    response:
      '{ app: { bundle_id: string; name: string; version: string; }; endpoints: { mcp: string; oauth: { authorization_endpoint: string; introspection_endpoint: string; registration_endpoint: string; revocation_endpoint: string; token_endpoint: string; userinfo_endpoint: string; }; spec: string; ws_events: string; }; platform: { arch: string; os: string; release?: string; }; server: { base_url: string; hostname: string; mcp_enabled: boolean; port: number; remote_access: boolean; status: string; }; }',
    markdown:
      "## retrieve\n\n`client.info.retrieve(): { app: object; endpoints: object; platform: object; server: object; }`\n\n**get** `/v1/info`\n\nReturns app, platform, server, endpoint discovery, OAuth, and WebSocket metadata for this Beeper Desktop instance.\n\n### Returns\n\n- `{ app: { bundle_id: string; name: string; version: string; }; endpoints: { mcp: string; oauth: { authorization_endpoint: string; introspection_endpoint: string; registration_endpoint: string; revocation_endpoint: string; token_endpoint: string; userinfo_endpoint: string; }; spec: string; ws_events: string; }; platform: { arch: string; os: string; release?: string; }; server: { base_url: string; hostname: string; mcp_enabled: boolean; port: number; remote_access: boolean; status: string; }; }`\n\n  - `app: { bundle_id: string; name: string; version: string; }`\n  - `endpoints: { mcp: string; oauth: { authorization_endpoint: string; introspection_endpoint: string; registration_endpoint: string; revocation_endpoint: string; token_endpoint: string; userinfo_endpoint: string; }; spec: string; ws_events: string; }`\n  - `platform: { arch: string; os: string; release?: string; }`\n  - `server: { base_url: string; hostname: string; mcp_enabled: boolean; port: number; remote_access: boolean; status: string; }`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst info = await client.info.retrieve();\n\nconsole.log(info);\n```",
    perLanguage: {
      typescript: {
        method: 'client.info.retrieve',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst info = await client.info.retrieve();\n\nconsole.log(info.app);",
      },
      python: {
        method: 'info.retrieve',
        example:
          'from beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop()\ninfo = client.info.retrieve()\nprint(info.app)',
      },
      go: {
        method: 'client.Info.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tinfo, err := client.Info.Get(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", info.App)\n}\n',
      },
      cli: {
        method: 'info retrieve',
        example: "beeper-desktop-cli info retrieve \\\n  --access-token 'My Access Token'",
      },
      php: {
        method: 'info->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$info = $client->info->retrieve();\n\nvar_dump($info);",
      },
      http: {
        example:
          'curl http://localhost:23373/v1/info \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
    },
  },
  {
    name: 'status',
    endpoint: '/v1/app/status',
    httpMethod: 'get',
    summary: 'Get app onboarding status',
    description:
      'Return the current Beeper Desktop sign-in and encrypted messaging setup state. This endpoint is public before sign-in so apps can discover that login is needed; after sign-in, pass a read token.',
    stainlessPath: '(resource) app > (method) status',
    qualified: 'client.app.status',
    response:
      "{ e2ee: { crossSigning: boolean; firstSyncDone: boolean; hasBackedUpCode: boolean; initialized: boolean; keyBackup: boolean; secrets: { masterKey: boolean; megolmBackupKey: boolean; recoveryCode: boolean; selfSigningKey: boolean; userSigningKey: boolean; }; secretStorage: boolean; verified: boolean; recoveryCodeGeneratedAt?: number; }; state: string; matrix?: { deviceID: string; homeserver: string; userID: string; }; verification?: { availableActions: 'create' | 'qr.scan' | 'accept' | 'cancel' | 'qr.confirmScanned' | 'sas.start' | 'sas.confirm'[]; state: 'idle' | 'requested' | 'ready' | 'sas_ready' | 'qr_scanned' | 'done' | 'cancelled' | 'error'; error?: { code: string; reason: string; }; from?: string; fromDevice?: string; otherDevice?: string; qrData?: string; sas?: { decimals: string; emojis: string; }; supportsSAS?: boolean; supportsScanQRCode?: boolean; verificationID?: string; }; }",
    markdown:
      "## status\n\n`client.app.status(): { e2ee: object; state: string; matrix?: object; verification?: object; }`\n\n**get** `/v1/app/status`\n\nReturn the current Beeper Desktop sign-in and encrypted messaging setup state. This endpoint is public before sign-in so apps can discover that login is needed; after sign-in, pass a read token.\n\n### Returns\n\n- `{ e2ee: { crossSigning: boolean; firstSyncDone: boolean; hasBackedUpCode: boolean; initialized: boolean; keyBackup: boolean; secrets: { masterKey: boolean; megolmBackupKey: boolean; recoveryCode: boolean; selfSigningKey: boolean; userSigningKey: boolean; }; secretStorage: boolean; verified: boolean; recoveryCodeGeneratedAt?: number; }; state: string; matrix?: { deviceID: string; homeserver: string; userID: string; }; verification?: { availableActions: 'create' | 'qr.scan' | 'accept' | 'cancel' | 'qr.confirmScanned' | 'sas.start' | 'sas.confirm'[]; state: 'idle' | 'requested' | 'ready' | 'sas_ready' | 'qr_scanned' | 'done' | 'cancelled' | 'error'; error?: { code: string; reason: string; }; from?: string; fromDevice?: string; otherDevice?: string; qrData?: string; sas?: { decimals: string; emojis: string; }; supportsSAS?: boolean; supportsScanQRCode?: boolean; verificationID?: string; }; }`\n\n  - `e2ee: { crossSigning: boolean; firstSyncDone: boolean; hasBackedUpCode: boolean; initialized: boolean; keyBackup: boolean; secrets: { masterKey: boolean; megolmBackupKey: boolean; recoveryCode: boolean; selfSigningKey: boolean; userSigningKey: boolean; }; secretStorage: boolean; verified: boolean; recoveryCodeGeneratedAt?: number; }`\n  - `state: string`\n  - `matrix?: { deviceID: string; homeserver: string; userID: string; }`\n  - `verification?: { availableActions: 'create' | 'qr.scan' | 'accept' | 'cancel' | 'qr.confirmScanned' | 'sas.start' | 'sas.confirm'[]; state: 'idle' | 'requested' | 'ready' | 'sas_ready' | 'qr_scanned' | 'done' | 'cancelled' | 'error'; error?: { code: string; reason: string; }; from?: string; fromDevice?: string; otherDevice?: string; qrData?: string; sas?: { decimals: string; emojis: string; }; supportsSAS?: boolean; supportsScanQRCode?: boolean; verificationID?: string; }`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst response = await client.app.status();\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.app.status',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.app.status();\n\nconsole.log(response.e2ee);",
      },
      python: {
        method: 'app.status',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.app.status()\nprint(response.e2ee)',
      },
      go: {
        method: 'client.App.Status',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.App.Status(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.E2ee)\n}\n',
      },
      cli: {
        method: 'app status',
        example: "beeper-desktop-cli app status \\\n  --access-token 'My Access Token'",
      },
      php: {
        method: 'app->status',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->app->status();\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl http://localhost:23373/v1/app/status \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
    },
  },
  {
    name: 'start',
    endpoint: '/v1/app/login/start',
    httpMethod: 'post',
    summary: 'Start app login',
    description: 'Start a first-party Beeper Desktop sign-in session.',
    stainlessPath: '(resource) app.login > (method) start',
    qualified: 'client.app.login.start',
    response: '{ request: string; type: string[]; }',
    markdown:
      "## start\n\n`client.app.login.start(): { request: string; type: string[]; }`\n\n**post** `/v1/app/login/start`\n\nStart a first-party Beeper Desktop sign-in session.\n\n### Returns\n\n- `{ request: string; type: string[]; }`\n\n  - `request: string`\n  - `type: string[]`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst response = await client.app.login.start();\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.app.login.start',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst response = await client.app.login.start();\n\nconsole.log(response.request);",
      },
      python: {
        method: 'app.login.start',
        example:
          'from beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop()\nresponse = client.app.login.start()\nprint(response.request)',
      },
      go: {
        method: 'client.App.Login.Start',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.App.Login.Start(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Request)\n}\n',
      },
      cli: {
        method: 'login start',
        example: "beeper-desktop-cli app:login start \\\n  --access-token 'My Access Token'",
      },
      php: {
        method: 'app->login->start',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->app->login->start();\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl http://localhost:23373/v1/app/login/start \\\n    -X POST \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
    },
  },
  {
    name: 'email',
    endpoint: '/v1/app/login/email',
    httpMethod: 'post',
    summary: 'Send login code',
    description: 'Send a sign-in code to the user email address.',
    stainlessPath: '(resource) app.login > (method) email',
    qualified: 'client.app.login.email',
    params: ['email: string;', 'request: string;'],
    response: 'object',
    markdown:
      "## email\n\n`client.app.login.email(email: string, request: string): object`\n\n**post** `/v1/app/login/email`\n\nSend a sign-in code to the user email address.\n\n### Parameters\n\n- `email: string`\n  Email address to send the sign-in code to.\n\n- `request: string`\n  Login request ID returned by the start step.\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst response = await client.app.login.email({ email: 'dev@stainless.com', request: 'request' });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.app.login.email',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst response = await client.app.login.email({ email: 'dev@stainless.com', request: 'request' });\n\nconsole.log(response);",
      },
      python: {
        method: 'app.login.email',
        example:
          'from beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop()\nresponse = client.app.login.email(\n    email="dev@stainless.com",\n    request="request",\n)\nprint(response)',
      },
      go: {
        method: 'client.App.Login.Email',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.App.Login.Email(context.TODO(), beeperdesktopapi.AppLoginEmailParams{\n\t\tEmail:   "dev@stainless.com",\n\t\tRequest: "request",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response)\n}\n',
      },
      cli: {
        method: 'login email',
        example:
          "beeper-desktop-cli app:login email \\\n  --access-token 'My Access Token' \\\n  --email dev@stainless.com \\\n  --request request",
      },
      php: {
        method: 'app->login->email',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->app->login->email(\n  email: 'dev@stainless.com', request: 'request'\n);\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl http://localhost:23373/v1/app/login/email \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN" \\\n    -d \'{\n          "email": "dev@stainless.com",\n          "request": "request"\n        }\'',
      },
    },
  },
  {
    name: 'response',
    endpoint: '/v1/app/login/response',
    httpMethod: 'post',
    summary: 'Complete login with code',
    description:
      'Finish sign-in with the code sent to the user email address. If the user needs a new account, the response includes account creation copy and username suggestions.',
    stainlessPath: '(resource) app.login > (method) response',
    qualified: 'client.app.login.response',
    params: ['request: string;', 'response: string;'],
    response:
      "{ appState: { e2ee: { crossSigning: boolean; firstSyncDone: boolean; hasBackedUpCode: boolean; initialized: boolean; keyBackup: boolean; secrets: object; secretStorage: boolean; verified: boolean; recoveryCodeGeneratedAt?: number; }; state: string; matrix?: { deviceID: string; homeserver: string; userID: string; }; verification?: { availableActions: 'create' | 'qr.scan' | 'accept' | 'cancel' | 'qr.confirmScanned' | 'sas.start' | 'sas.confirm'[]; state: 'idle' | 'requested' | 'ready' | 'sas_ready' | 'qr_scanned' | 'done' | 'cancelled' | 'error'; error?: object; from?: string; fromDevice?: string; otherDevice?: string; qrData?: string; sas?: object; supportsSAS?: boolean; supportsScanQRCode?: boolean; verificationID?: string; }; }; desktopAPI: { accessToken: string; scope: 'read write'; tokenType: 'Bearer'; }; matrix: { accessToken: string; deviceID: string; homeserver: string; userID: string; }; } | { copy: { submit: 'Continue'; terms: 'By continuing, you agree to the Terms of Use and acknowledge the Privacy Policy.'; title: 'Choose your username'; usernamePlaceholder: 'Username'; }; leadToken: string; registrationRequired: true; request: string; usernameSuggestions?: string[]; }",
    markdown:
      "## response\n\n`client.app.login.response(request: string, response: string): { appState: object; desktopAPI: object; matrix: object; } | { copy: object; leadToken: string; registrationRequired: true; request: string; usernameSuggestions?: string[]; }`\n\n**post** `/v1/app/login/response`\n\nFinish sign-in with the code sent to the user email address. If the user needs a new account, the response includes account creation copy and username suggestions.\n\n### Parameters\n\n- `request: string`\n  Login request ID returned by the start step.\n\n- `response: string`\n  Sign-in code from the user email.\n\n### Returns\n\n- `{ appState: { e2ee: { crossSigning: boolean; firstSyncDone: boolean; hasBackedUpCode: boolean; initialized: boolean; keyBackup: boolean; secrets: object; secretStorage: boolean; verified: boolean; recoveryCodeGeneratedAt?: number; }; state: string; matrix?: { deviceID: string; homeserver: string; userID: string; }; verification?: { availableActions: 'create' | 'qr.scan' | 'accept' | 'cancel' | 'qr.confirmScanned' | 'sas.start' | 'sas.confirm'[]; state: 'idle' | 'requested' | 'ready' | 'sas_ready' | 'qr_scanned' | 'done' | 'cancelled' | 'error'; error?: object; from?: string; fromDevice?: string; otherDevice?: string; qrData?: string; sas?: object; supportsSAS?: boolean; supportsScanQRCode?: boolean; verificationID?: string; }; }; desktopAPI: { accessToken: string; scope: 'read write'; tokenType: 'Bearer'; }; matrix: { accessToken: string; deviceID: string; homeserver: string; userID: string; }; } | { copy: { submit: 'Continue'; terms: 'By continuing, you agree to the Terms of Use and acknowledge the Privacy Policy.'; title: 'Choose your username'; usernamePlaceholder: 'Username'; }; leadToken: string; registrationRequired: true; request: string; usernameSuggestions?: string[]; }`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst response = await client.app.login.response({ request: 'request', response: 'response' });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.app.login.response',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst response = await client.app.login.response({ request: 'request', response: 'response' });\n\nconsole.log(response);",
      },
      python: {
        method: 'app.login.response',
        example:
          'from beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop()\nresponse = client.app.login.response(\n    request="request",\n    response="response",\n)\nprint(response)',
      },
      go: {
        method: 'client.App.Login.Response',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.App.Login.Response(context.TODO(), beeperdesktopapi.AppLoginResponseParams{\n\t\tRequest:  "request",\n\t\tResponse: "response",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response)\n}\n',
      },
      cli: {
        method: 'login response',
        example:
          "beeper-desktop-cli app:login response \\\n  --access-token 'My Access Token' \\\n  --request request \\\n  --response response",
      },
      php: {
        method: 'app->login->response',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->app->login->response(\n  request: 'request', response: 'response'\n);\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl http://localhost:23373/v1/app/login/response \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN" \\\n    -d \'{\n          "request": "request",\n          "response": "response"\n        }\'',
      },
    },
  },
  {
    name: 'register',
    endpoint: '/v1/app/login/register',
    httpMethod: 'post',
    summary: 'Create account',
    description: 'Create a Beeper account after the user chooses a username and accepts the Terms of Use.',
    stainlessPath: '(resource) app.login > (method) register',
    qualified: 'client.app.login.register',
    params: ['acceptTerms: true;', 'leadToken: string;', 'request: string;', 'username: string;'],
    response:
      "{ appState: { e2ee: { crossSigning: boolean; firstSyncDone: boolean; hasBackedUpCode: boolean; initialized: boolean; keyBackup: boolean; secrets: object; secretStorage: boolean; verified: boolean; recoveryCodeGeneratedAt?: number; }; state: string; matrix?: { deviceID: string; homeserver: string; userID: string; }; verification?: { availableActions: 'create' | 'qr.scan' | 'accept' | 'cancel' | 'qr.confirmScanned' | 'sas.start' | 'sas.confirm'[]; state: 'idle' | 'requested' | 'ready' | 'sas_ready' | 'qr_scanned' | 'done' | 'cancelled' | 'error'; error?: object; from?: string; fromDevice?: string; otherDevice?: string; qrData?: string; sas?: object; supportsSAS?: boolean; supportsScanQRCode?: boolean; verificationID?: string; }; }; desktopAPI: { accessToken: string; scope: 'read write'; tokenType: 'Bearer'; }; matrix: { accessToken: string; deviceID: string; homeserver: string; userID: string; }; }",
    markdown:
      "## register\n\n`client.app.login.register(acceptTerms: true, leadToken: string, request: string, username: string): { appState: object; desktopAPI: object; matrix: object; }`\n\n**post** `/v1/app/login/register`\n\nCreate a Beeper account after the user chooses a username and accepts the Terms of Use.\n\n### Parameters\n\n- `acceptTerms: true`\n  Confirms that the user accepted the Terms of Use and acknowledged the Privacy Policy.\n\n- `leadToken: string`\n  Registration token returned by Beeper.\n\n- `request: string`\n  Login request ID returned by the start step.\n\n- `username: string`\n  Username selected by the user.\n\n### Returns\n\n- `{ appState: { e2ee: { crossSigning: boolean; firstSyncDone: boolean; hasBackedUpCode: boolean; initialized: boolean; keyBackup: boolean; secrets: object; secretStorage: boolean; verified: boolean; recoveryCodeGeneratedAt?: number; }; state: string; matrix?: { deviceID: string; homeserver: string; userID: string; }; verification?: { availableActions: 'create' | 'qr.scan' | 'accept' | 'cancel' | 'qr.confirmScanned' | 'sas.start' | 'sas.confirm'[]; state: 'idle' | 'requested' | 'ready' | 'sas_ready' | 'qr_scanned' | 'done' | 'cancelled' | 'error'; error?: object; from?: string; fromDevice?: string; otherDevice?: string; qrData?: string; sas?: object; supportsSAS?: boolean; supportsScanQRCode?: boolean; verificationID?: string; }; }; desktopAPI: { accessToken: string; scope: 'read write'; tokenType: 'Bearer'; }; matrix: { accessToken: string; deviceID: string; homeserver: string; userID: string; }; }`\n\n  - `appState: { e2ee: { crossSigning: boolean; firstSyncDone: boolean; hasBackedUpCode: boolean; initialized: boolean; keyBackup: boolean; secrets: { masterKey: boolean; megolmBackupKey: boolean; recoveryCode: boolean; selfSigningKey: boolean; userSigningKey: boolean; }; secretStorage: boolean; verified: boolean; recoveryCodeGeneratedAt?: number; }; state: string; matrix?: { deviceID: string; homeserver: string; userID: string; }; verification?: { availableActions: 'create' | 'qr.scan' | 'accept' | 'cancel' | 'qr.confirmScanned' | 'sas.start' | 'sas.confirm'[]; state: 'idle' | 'requested' | 'ready' | 'sas_ready' | 'qr_scanned' | 'done' | 'cancelled' | 'error'; error?: { code: string; reason: string; }; from?: string; fromDevice?: string; otherDevice?: string; qrData?: string; sas?: { decimals: string; emojis: string; }; supportsSAS?: boolean; supportsScanQRCode?: boolean; verificationID?: string; }; }`\n  - `desktopAPI: { accessToken: string; scope: 'read write'; tokenType: 'Bearer'; }`\n  - `matrix: { accessToken: string; deviceID: string; homeserver: string; userID: string; }`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst response = await client.app.login.register({\n  acceptTerms: true,\n  leadToken: 'leadToken',\n  request: 'request',\n  username: 'x',\n});\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.app.login.register',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst response = await client.app.login.register({\n  acceptTerms: true,\n  leadToken: 'leadToken',\n  request: 'request',\n  username: 'x',\n});\n\nconsole.log(response.appState);",
      },
      python: {
        method: 'app.login.register',
        example:
          'from beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop()\nresponse = client.app.login.register(\n    accept_terms=True,\n    lead_token="leadToken",\n    request="request",\n    username="x",\n)\nprint(response.app_state)',
      },
      go: {
        method: 'client.App.Login.Register',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.App.Login.Register(context.TODO(), beeperdesktopapi.AppLoginRegisterParams{\n\t\tAcceptTerms: true,\n\t\tLeadToken:   "leadToken",\n\t\tRequest:     "request",\n\t\tUsername:    "x",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.AppState)\n}\n',
      },
      cli: {
        method: 'login register',
        example:
          "beeper-desktop-cli app:login register \\\n  --access-token 'My Access Token' \\\n  --accept-terms true \\\n  --lead-token leadToken \\\n  --request request \\\n  --username x",
      },
      php: {
        method: 'app->login->register',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->app->login->register(\n  acceptTerms: true, leadToken: 'leadToken', request: 'request', username: 'x'\n);\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl http://localhost:23373/v1/app/login/register \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN" \\\n    -d \'{\n          "acceptTerms": true,\n          "leadToken": "leadToken",\n          "request": "request",\n          "username": "x"\n        }\'',
      },
    },
  },
  {
    name: 'verify',
    endpoint: '/v1/app/e2ee/recovery-code/verify',
    httpMethod: 'post',
    summary: 'Verify with recovery key',
    description: 'Unlock encrypted messages with the user recovery key.',
    stainlessPath: '(resource) app.e2ee.recovery_code > (method) verify',
    qualified: 'client.app.e2ee.recoveryCode.verify',
    params: ['recoveryCode: string;'],
    response:
      "{ appState: { e2ee: { crossSigning: boolean; firstSyncDone: boolean; hasBackedUpCode: boolean; initialized: boolean; keyBackup: boolean; secrets: object; secretStorage: boolean; verified: boolean; recoveryCodeGeneratedAt?: number; }; state: string; matrix?: { deviceID: string; homeserver: string; userID: string; }; verification?: { availableActions: 'create' | 'qr.scan' | 'accept' | 'cancel' | 'qr.confirmScanned' | 'sas.start' | 'sas.confirm'[]; state: 'idle' | 'requested' | 'ready' | 'sas_ready' | 'qr_scanned' | 'done' | 'cancelled' | 'error'; error?: object; from?: string; fromDevice?: string; otherDevice?: string; qrData?: string; sas?: object; supportsSAS?: boolean; supportsScanQRCode?: boolean; verificationID?: string; }; }; }",
    markdown:
      "## verify\n\n`client.app.e2ee.recoveryCode.verify(recoveryCode: string): { appState: object; }`\n\n**post** `/v1/app/e2ee/recovery-code/verify`\n\nUnlock encrypted messages with the user recovery key.\n\n### Parameters\n\n- `recoveryCode: string`\n  Recovery key saved by the user.\n\n### Returns\n\n- `{ appState: { e2ee: { crossSigning: boolean; firstSyncDone: boolean; hasBackedUpCode: boolean; initialized: boolean; keyBackup: boolean; secrets: object; secretStorage: boolean; verified: boolean; recoveryCodeGeneratedAt?: number; }; state: string; matrix?: { deviceID: string; homeserver: string; userID: string; }; verification?: { availableActions: 'create' | 'qr.scan' | 'accept' | 'cancel' | 'qr.confirmScanned' | 'sas.start' | 'sas.confirm'[]; state: 'idle' | 'requested' | 'ready' | 'sas_ready' | 'qr_scanned' | 'done' | 'cancelled' | 'error'; error?: object; from?: string; fromDevice?: string; otherDevice?: string; qrData?: string; sas?: object; supportsSAS?: boolean; supportsScanQRCode?: boolean; verificationID?: string; }; }; }`\n\n  - `appState: { e2ee: { crossSigning: boolean; firstSyncDone: boolean; hasBackedUpCode: boolean; initialized: boolean; keyBackup: boolean; secrets: { masterKey: boolean; megolmBackupKey: boolean; recoveryCode: boolean; selfSigningKey: boolean; userSigningKey: boolean; }; secretStorage: boolean; verified: boolean; recoveryCodeGeneratedAt?: number; }; state: string; matrix?: { deviceID: string; homeserver: string; userID: string; }; verification?: { availableActions: 'create' | 'qr.scan' | 'accept' | 'cancel' | 'qr.confirmScanned' | 'sas.start' | 'sas.confirm'[]; state: 'idle' | 'requested' | 'ready' | 'sas_ready' | 'qr_scanned' | 'done' | 'cancelled' | 'error'; error?: { code: string; reason: string; }; from?: string; fromDevice?: string; otherDevice?: string; qrData?: string; sas?: { decimals: string; emojis: string; }; supportsSAS?: boolean; supportsScanQRCode?: boolean; verificationID?: string; }; }`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst response = await client.app.e2ee.recoveryCode.verify({ recoveryCode: 'x' });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.app.e2ee.recoveryCode.verify',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.app.e2ee.recoveryCode.verify({ recoveryCode: 'x' });\n\nconsole.log(response.appState);",
      },
      python: {
        method: 'app.e2ee.recovery_code.verify',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.app.e2ee.recovery_code.verify(\n    recovery_code="x",\n)\nprint(response.app_state)',
      },
      go: {
        method: 'client.App.E2ee.RecoveryCode.Verify',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.App.E2ee.RecoveryCode.Verify(context.TODO(), beeperdesktopapi.AppE2eeRecoveryCodeVerifyParams{\n\t\tRecoveryCode: "x",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.AppState)\n}\n',
      },
      cli: {
        method: 'recovery_code verify',
        example:
          "beeper-desktop-cli app:e2ee:recovery-code verify \\\n  --access-token 'My Access Token' \\\n  --recovery-code x",
      },
      php: {
        method: 'app->e2ee->recoveryCode->verify',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->app->e2ee->recoveryCode->verify(recoveryCode: 'x');\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl http://localhost:23373/v1/app/e2ee/recovery-code/verify \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN" \\\n    -d \'{\n          "recoveryCode": "x"\n        }\'',
      },
    },
  },
  {
    name: 'mark_backed_up',
    endpoint: '/v1/app/e2ee/recovery-code/mark-backed-up',
    httpMethod: 'post',
    summary: 'Mark recovery key as saved',
    description: 'Record that the user saved their recovery key.',
    stainlessPath: '(resource) app.e2ee.recovery_code > (method) mark_backed_up',
    qualified: 'client.app.e2ee.recoveryCode.markBackedUp',
    response:
      "{ appState: { e2ee: { crossSigning: boolean; firstSyncDone: boolean; hasBackedUpCode: boolean; initialized: boolean; keyBackup: boolean; secrets: object; secretStorage: boolean; verified: boolean; recoveryCodeGeneratedAt?: number; }; state: string; matrix?: { deviceID: string; homeserver: string; userID: string; }; verification?: { availableActions: 'create' | 'qr.scan' | 'accept' | 'cancel' | 'qr.confirmScanned' | 'sas.start' | 'sas.confirm'[]; state: 'idle' | 'requested' | 'ready' | 'sas_ready' | 'qr_scanned' | 'done' | 'cancelled' | 'error'; error?: object; from?: string; fromDevice?: string; otherDevice?: string; qrData?: string; sas?: object; supportsSAS?: boolean; supportsScanQRCode?: boolean; verificationID?: string; }; }; }",
    markdown:
      "## mark_backed_up\n\n`client.app.e2ee.recoveryCode.markBackedUp(): { appState: object; }`\n\n**post** `/v1/app/e2ee/recovery-code/mark-backed-up`\n\nRecord that the user saved their recovery key.\n\n### Returns\n\n- `{ appState: { e2ee: { crossSigning: boolean; firstSyncDone: boolean; hasBackedUpCode: boolean; initialized: boolean; keyBackup: boolean; secrets: object; secretStorage: boolean; verified: boolean; recoveryCodeGeneratedAt?: number; }; state: string; matrix?: { deviceID: string; homeserver: string; userID: string; }; verification?: { availableActions: 'create' | 'qr.scan' | 'accept' | 'cancel' | 'qr.confirmScanned' | 'sas.start' | 'sas.confirm'[]; state: 'idle' | 'requested' | 'ready' | 'sas_ready' | 'qr_scanned' | 'done' | 'cancelled' | 'error'; error?: object; from?: string; fromDevice?: string; otherDevice?: string; qrData?: string; sas?: object; supportsSAS?: boolean; supportsScanQRCode?: boolean; verificationID?: string; }; }; }`\n\n  - `appState: { e2ee: { crossSigning: boolean; firstSyncDone: boolean; hasBackedUpCode: boolean; initialized: boolean; keyBackup: boolean; secrets: { masterKey: boolean; megolmBackupKey: boolean; recoveryCode: boolean; selfSigningKey: boolean; userSigningKey: boolean; }; secretStorage: boolean; verified: boolean; recoveryCodeGeneratedAt?: number; }; state: string; matrix?: { deviceID: string; homeserver: string; userID: string; }; verification?: { availableActions: 'create' | 'qr.scan' | 'accept' | 'cancel' | 'qr.confirmScanned' | 'sas.start' | 'sas.confirm'[]; state: 'idle' | 'requested' | 'ready' | 'sas_ready' | 'qr_scanned' | 'done' | 'cancelled' | 'error'; error?: { code: string; reason: string; }; from?: string; fromDevice?: string; otherDevice?: string; qrData?: string; sas?: { decimals: string; emojis: string; }; supportsSAS?: boolean; supportsScanQRCode?: boolean; verificationID?: string; }; }`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst response = await client.app.e2ee.recoveryCode.markBackedUp();\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.app.e2ee.recoveryCode.markBackedUp',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.app.e2ee.recoveryCode.markBackedUp();\n\nconsole.log(response.appState);",
      },
      python: {
        method: 'app.e2ee.recovery_code.mark_backed_up',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.app.e2ee.recovery_code.mark_backed_up()\nprint(response.app_state)',
      },
      go: {
        method: 'client.App.E2ee.RecoveryCode.MarkBackedUp',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.App.E2ee.RecoveryCode.MarkBackedUp(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.AppState)\n}\n',
      },
      cli: {
        method: 'recovery_code mark_backed_up',
        example:
          "beeper-desktop-cli app:e2ee:recovery-code mark-backed-up \\\n  --access-token 'My Access Token'",
      },
      php: {
        method: 'app->e2ee->recoveryCode->markBackedUp',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->app->e2ee->recoveryCode->markBackedUp();\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl http://localhost:23373/v1/app/e2ee/recovery-code/mark-backed-up \\\n    -X POST \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v1/app/e2ee/recovery-code/reset',
    httpMethod: 'post',
    summary: 'Create new recovery key',
    description: 'Create a new recovery key when the user cannot use the existing one.',
    stainlessPath: '(resource) app.e2ee.recovery_code.reset > (method) create',
    qualified: 'client.app.e2ee.recoveryCode.reset.create',
    params: ['recoveryCode?: string;'],
    response:
      "{ appState: { e2ee: { crossSigning: boolean; firstSyncDone: boolean; hasBackedUpCode: boolean; initialized: boolean; keyBackup: boolean; secrets: object; secretStorage: boolean; verified: boolean; recoveryCodeGeneratedAt?: number; }; state: string; matrix?: { deviceID: string; homeserver: string; userID: string; }; verification?: { availableActions: 'create' | 'qr.scan' | 'accept' | 'cancel' | 'qr.confirmScanned' | 'sas.start' | 'sas.confirm'[]; state: 'idle' | 'requested' | 'ready' | 'sas_ready' | 'qr_scanned' | 'done' | 'cancelled' | 'error'; error?: object; from?: string; fromDevice?: string; otherDevice?: string; qrData?: string; sas?: object; supportsSAS?: boolean; supportsScanQRCode?: boolean; verificationID?: string; }; }; recoveryCode: string; }",
    markdown:
      "## create\n\n`client.app.e2ee.recoveryCode.reset.create(recoveryCode?: string): { appState: object; recoveryCode: string; }`\n\n**post** `/v1/app/e2ee/recovery-code/reset`\n\nCreate a new recovery key when the user cannot use the existing one.\n\n### Parameters\n\n- `recoveryCode?: string`\n  Existing recovery key, if the user has it.\n\n### Returns\n\n- `{ appState: { e2ee: { crossSigning: boolean; firstSyncDone: boolean; hasBackedUpCode: boolean; initialized: boolean; keyBackup: boolean; secrets: object; secretStorage: boolean; verified: boolean; recoveryCodeGeneratedAt?: number; }; state: string; matrix?: { deviceID: string; homeserver: string; userID: string; }; verification?: { availableActions: 'create' | 'qr.scan' | 'accept' | 'cancel' | 'qr.confirmScanned' | 'sas.start' | 'sas.confirm'[]; state: 'idle' | 'requested' | 'ready' | 'sas_ready' | 'qr_scanned' | 'done' | 'cancelled' | 'error'; error?: object; from?: string; fromDevice?: string; otherDevice?: string; qrData?: string; sas?: object; supportsSAS?: boolean; supportsScanQRCode?: boolean; verificationID?: string; }; }; recoveryCode: string; }`\n\n  - `appState: { e2ee: { crossSigning: boolean; firstSyncDone: boolean; hasBackedUpCode: boolean; initialized: boolean; keyBackup: boolean; secrets: { masterKey: boolean; megolmBackupKey: boolean; recoveryCode: boolean; selfSigningKey: boolean; userSigningKey: boolean; }; secretStorage: boolean; verified: boolean; recoveryCodeGeneratedAt?: number; }; state: string; matrix?: { deviceID: string; homeserver: string; userID: string; }; verification?: { availableActions: 'create' | 'qr.scan' | 'accept' | 'cancel' | 'qr.confirmScanned' | 'sas.start' | 'sas.confirm'[]; state: 'idle' | 'requested' | 'ready' | 'sas_ready' | 'qr_scanned' | 'done' | 'cancelled' | 'error'; error?: { code: string; reason: string; }; from?: string; fromDevice?: string; otherDevice?: string; qrData?: string; sas?: { decimals: string; emojis: string; }; supportsSAS?: boolean; supportsScanQRCode?: boolean; verificationID?: string; }; }`\n  - `recoveryCode: string`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst reset = await client.app.e2ee.recoveryCode.reset.create();\n\nconsole.log(reset);\n```",
    perLanguage: {
      typescript: {
        method: 'client.app.e2ee.recoveryCode.reset.create',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst reset = await client.app.e2ee.recoveryCode.reset.create();\n\nconsole.log(reset.appState);",
      },
      python: {
        method: 'app.e2ee.recovery_code.reset.create',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nreset = client.app.e2ee.recovery_code.reset.create()\nprint(reset.app_state)',
      },
      go: {
        method: 'client.App.E2ee.RecoveryCode.Reset.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\treset, err := client.App.E2ee.RecoveryCode.Reset.New(context.TODO(), beeperdesktopapi.AppE2eeRecoveryCodeResetNewParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", reset.AppState)\n}\n',
      },
      cli: {
        method: 'reset create',
        example:
          "beeper-desktop-cli app:e2ee:recovery-code:reset create \\\n  --access-token 'My Access Token'",
      },
      php: {
        method: 'app->e2ee->recoveryCode->reset->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$reset = $client->app->e2ee->recoveryCode->reset->create(\n  recoveryCode: 'recoveryCode'\n);\n\nvar_dump($reset);",
      },
      http: {
        example:
          'curl http://localhost:23373/v1/app/e2ee/recovery-code/reset \\\n    -X POST \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
    },
  },
  {
    name: 'confirm',
    endpoint: '/v1/app/e2ee/recovery-code/reset/confirm',
    httpMethod: 'post',
    summary: 'Confirm new recovery key',
    description: 'Confirm that the new recovery key should be used for this account.',
    stainlessPath: '(resource) app.e2ee.recovery_code.reset > (method) confirm',
    qualified: 'client.app.e2ee.recoveryCode.reset.confirm',
    params: ['recoveryCode: string;'],
    response:
      "{ appState: { e2ee: { crossSigning: boolean; firstSyncDone: boolean; hasBackedUpCode: boolean; initialized: boolean; keyBackup: boolean; secrets: object; secretStorage: boolean; verified: boolean; recoveryCodeGeneratedAt?: number; }; state: string; matrix?: { deviceID: string; homeserver: string; userID: string; }; verification?: { availableActions: 'create' | 'qr.scan' | 'accept' | 'cancel' | 'qr.confirmScanned' | 'sas.start' | 'sas.confirm'[]; state: 'idle' | 'requested' | 'ready' | 'sas_ready' | 'qr_scanned' | 'done' | 'cancelled' | 'error'; error?: object; from?: string; fromDevice?: string; otherDevice?: string; qrData?: string; sas?: object; supportsSAS?: boolean; supportsScanQRCode?: boolean; verificationID?: string; }; }; }",
    markdown:
      "## confirm\n\n`client.app.e2ee.recoveryCode.reset.confirm(recoveryCode: string): { appState: object; }`\n\n**post** `/v1/app/e2ee/recovery-code/reset/confirm`\n\nConfirm that the new recovery key should be used for this account.\n\n### Parameters\n\n- `recoveryCode: string`\n  New recovery key returned by the reset step.\n\n### Returns\n\n- `{ appState: { e2ee: { crossSigning: boolean; firstSyncDone: boolean; hasBackedUpCode: boolean; initialized: boolean; keyBackup: boolean; secrets: object; secretStorage: boolean; verified: boolean; recoveryCodeGeneratedAt?: number; }; state: string; matrix?: { deviceID: string; homeserver: string; userID: string; }; verification?: { availableActions: 'create' | 'qr.scan' | 'accept' | 'cancel' | 'qr.confirmScanned' | 'sas.start' | 'sas.confirm'[]; state: 'idle' | 'requested' | 'ready' | 'sas_ready' | 'qr_scanned' | 'done' | 'cancelled' | 'error'; error?: object; from?: string; fromDevice?: string; otherDevice?: string; qrData?: string; sas?: object; supportsSAS?: boolean; supportsScanQRCode?: boolean; verificationID?: string; }; }; }`\n\n  - `appState: { e2ee: { crossSigning: boolean; firstSyncDone: boolean; hasBackedUpCode: boolean; initialized: boolean; keyBackup: boolean; secrets: { masterKey: boolean; megolmBackupKey: boolean; recoveryCode: boolean; selfSigningKey: boolean; userSigningKey: boolean; }; secretStorage: boolean; verified: boolean; recoveryCodeGeneratedAt?: number; }; state: string; matrix?: { deviceID: string; homeserver: string; userID: string; }; verification?: { availableActions: 'create' | 'qr.scan' | 'accept' | 'cancel' | 'qr.confirmScanned' | 'sas.start' | 'sas.confirm'[]; state: 'idle' | 'requested' | 'ready' | 'sas_ready' | 'qr_scanned' | 'done' | 'cancelled' | 'error'; error?: { code: string; reason: string; }; from?: string; fromDevice?: string; otherDevice?: string; qrData?: string; sas?: { decimals: string; emojis: string; }; supportsSAS?: boolean; supportsScanQRCode?: boolean; verificationID?: string; }; }`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst response = await client.app.e2ee.recoveryCode.reset.confirm({ recoveryCode: 'x' });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.app.e2ee.recoveryCode.reset.confirm',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.app.e2ee.recoveryCode.reset.confirm({ recoveryCode: 'x' });\n\nconsole.log(response.appState);",
      },
      python: {
        method: 'app.e2ee.recovery_code.reset.confirm',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.app.e2ee.recovery_code.reset.confirm(\n    recovery_code="x",\n)\nprint(response.app_state)',
      },
      go: {
        method: 'client.App.E2ee.RecoveryCode.Reset.Confirm',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.App.E2ee.RecoveryCode.Reset.Confirm(context.TODO(), beeperdesktopapi.AppE2eeRecoveryCodeResetConfirmParams{\n\t\tRecoveryCode: "x",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.AppState)\n}\n',
      },
      cli: {
        method: 'reset confirm',
        example:
          "beeper-desktop-cli app:e2ee:recovery-code:reset confirm \\\n  --access-token 'My Access Token' \\\n  --recovery-code x",
      },
      php: {
        method: 'app->e2ee->recoveryCode->reset->confirm',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->app->e2ee->recoveryCode->reset->confirm(recoveryCode: 'x');\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl http://localhost:23373/v1/app/e2ee/recovery-code/reset/confirm \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN" \\\n    -d \'{\n          "recoveryCode": "x"\n        }\'',
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v1/app/e2ee/verification',
    httpMethod: 'post',
    summary: 'Start device verification',
    description: 'Start verifying this device from another signed-in device.',
    stainlessPath: '(resource) app.e2ee.verification > (method) create',
    qualified: 'client.app.e2ee.verification.create',
    params: ['userID?: string;'],
    response:
      "{ appState: { e2ee: { crossSigning: boolean; firstSyncDone: boolean; hasBackedUpCode: boolean; initialized: boolean; keyBackup: boolean; secrets: object; secretStorage: boolean; verified: boolean; recoveryCodeGeneratedAt?: number; }; state: string; matrix?: { deviceID: string; homeserver: string; userID: string; }; verification?: { availableActions: 'create' | 'qr.scan' | 'accept' | 'cancel' | 'qr.confirmScanned' | 'sas.start' | 'sas.confirm'[]; state: 'idle' | 'requested' | 'ready' | 'sas_ready' | 'qr_scanned' | 'done' | 'cancelled' | 'error'; error?: object; from?: string; fromDevice?: string; otherDevice?: string; qrData?: string; sas?: object; supportsSAS?: boolean; supportsScanQRCode?: boolean; verificationID?: string; }; }; verificationID: string; }",
    markdown:
      "## create\n\n`client.app.e2ee.verification.create(userID?: string): { appState: object; verificationID: string; }`\n\n**post** `/v1/app/e2ee/verification`\n\nStart verifying this device from another signed-in device.\n\n### Parameters\n\n- `userID?: string`\n  User ID to verify. Defaults to the signed-in user.\n\n### Returns\n\n- `{ appState: { e2ee: { crossSigning: boolean; firstSyncDone: boolean; hasBackedUpCode: boolean; initialized: boolean; keyBackup: boolean; secrets: object; secretStorage: boolean; verified: boolean; recoveryCodeGeneratedAt?: number; }; state: string; matrix?: { deviceID: string; homeserver: string; userID: string; }; verification?: { availableActions: 'create' | 'qr.scan' | 'accept' | 'cancel' | 'qr.confirmScanned' | 'sas.start' | 'sas.confirm'[]; state: 'idle' | 'requested' | 'ready' | 'sas_ready' | 'qr_scanned' | 'done' | 'cancelled' | 'error'; error?: object; from?: string; fromDevice?: string; otherDevice?: string; qrData?: string; sas?: object; supportsSAS?: boolean; supportsScanQRCode?: boolean; verificationID?: string; }; }; verificationID: string; }`\n\n  - `appState: { e2ee: { crossSigning: boolean; firstSyncDone: boolean; hasBackedUpCode: boolean; initialized: boolean; keyBackup: boolean; secrets: { masterKey: boolean; megolmBackupKey: boolean; recoveryCode: boolean; selfSigningKey: boolean; userSigningKey: boolean; }; secretStorage: boolean; verified: boolean; recoveryCodeGeneratedAt?: number; }; state: string; matrix?: { deviceID: string; homeserver: string; userID: string; }; verification?: { availableActions: 'create' | 'qr.scan' | 'accept' | 'cancel' | 'qr.confirmScanned' | 'sas.start' | 'sas.confirm'[]; state: 'idle' | 'requested' | 'ready' | 'sas_ready' | 'qr_scanned' | 'done' | 'cancelled' | 'error'; error?: { code: string; reason: string; }; from?: string; fromDevice?: string; otherDevice?: string; qrData?: string; sas?: { decimals: string; emojis: string; }; supportsSAS?: boolean; supportsScanQRCode?: boolean; verificationID?: string; }; }`\n  - `verificationID: string`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst verification = await client.app.e2ee.verification.create();\n\nconsole.log(verification);\n```",
    perLanguage: {
      typescript: {
        method: 'client.app.e2ee.verification.create',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst verification = await client.app.e2ee.verification.create();\n\nconsole.log(verification.appState);",
      },
      python: {
        method: 'app.e2ee.verification.create',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nverification = client.app.e2ee.verification.create()\nprint(verification.app_state)',
      },
      go: {
        method: 'client.App.E2ee.Verification.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tverification, err := client.App.E2ee.Verification.New(context.TODO(), beeperdesktopapi.AppE2eeVerificationNewParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", verification.AppState)\n}\n',
      },
      cli: {
        method: 'verification create',
        example: "beeper-desktop-cli app:e2ee:verification create \\\n  --access-token 'My Access Token'",
      },
      php: {
        method: 'app->e2ee->verification->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$verification = $client->app->e2ee->verification->create(userID: 'userID');\n\nvar_dump($verification);",
      },
      http: {
        example:
          'curl http://localhost:23373/v1/app/e2ee/verification \\\n    -X POST \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
    },
  },
  {
    name: 'accept',
    endpoint: '/v1/app/e2ee/verification/{verificationID}/accept',
    httpMethod: 'post',
    summary: 'Accept device verification',
    description: 'Accept an incoming device verification request.',
    stainlessPath: '(resource) app.e2ee.verification > (method) accept',
    qualified: 'client.app.e2ee.verification.accept',
    params: ['verificationID: string;'],
    response:
      "{ appState: { e2ee: { crossSigning: boolean; firstSyncDone: boolean; hasBackedUpCode: boolean; initialized: boolean; keyBackup: boolean; secrets: object; secretStorage: boolean; verified: boolean; recoveryCodeGeneratedAt?: number; }; state: string; matrix?: { deviceID: string; homeserver: string; userID: string; }; verification?: { availableActions: 'create' | 'qr.scan' | 'accept' | 'cancel' | 'qr.confirmScanned' | 'sas.start' | 'sas.confirm'[]; state: 'idle' | 'requested' | 'ready' | 'sas_ready' | 'qr_scanned' | 'done' | 'cancelled' | 'error'; error?: object; from?: string; fromDevice?: string; otherDevice?: string; qrData?: string; sas?: object; supportsSAS?: boolean; supportsScanQRCode?: boolean; verificationID?: string; }; }; }",
    markdown:
      "## accept\n\n`client.app.e2ee.verification.accept(verificationID: string): { appState: object; }`\n\n**post** `/v1/app/e2ee/verification/{verificationID}/accept`\n\nAccept an incoming device verification request.\n\n### Parameters\n\n- `verificationID: string`\n  Verification ID.\n\n### Returns\n\n- `{ appState: { e2ee: { crossSigning: boolean; firstSyncDone: boolean; hasBackedUpCode: boolean; initialized: boolean; keyBackup: boolean; secrets: object; secretStorage: boolean; verified: boolean; recoveryCodeGeneratedAt?: number; }; state: string; matrix?: { deviceID: string; homeserver: string; userID: string; }; verification?: { availableActions: 'create' | 'qr.scan' | 'accept' | 'cancel' | 'qr.confirmScanned' | 'sas.start' | 'sas.confirm'[]; state: 'idle' | 'requested' | 'ready' | 'sas_ready' | 'qr_scanned' | 'done' | 'cancelled' | 'error'; error?: object; from?: string; fromDevice?: string; otherDevice?: string; qrData?: string; sas?: object; supportsSAS?: boolean; supportsScanQRCode?: boolean; verificationID?: string; }; }; }`\n\n  - `appState: { e2ee: { crossSigning: boolean; firstSyncDone: boolean; hasBackedUpCode: boolean; initialized: boolean; keyBackup: boolean; secrets: { masterKey: boolean; megolmBackupKey: boolean; recoveryCode: boolean; selfSigningKey: boolean; userSigningKey: boolean; }; secretStorage: boolean; verified: boolean; recoveryCodeGeneratedAt?: number; }; state: string; matrix?: { deviceID: string; homeserver: string; userID: string; }; verification?: { availableActions: 'create' | 'qr.scan' | 'accept' | 'cancel' | 'qr.confirmScanned' | 'sas.start' | 'sas.confirm'[]; state: 'idle' | 'requested' | 'ready' | 'sas_ready' | 'qr_scanned' | 'done' | 'cancelled' | 'error'; error?: { code: string; reason: string; }; from?: string; fromDevice?: string; otherDevice?: string; qrData?: string; sas?: { decimals: string; emojis: string; }; supportsSAS?: boolean; supportsScanQRCode?: boolean; verificationID?: string; }; }`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst response = await client.app.e2ee.verification.accept('x');\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.app.e2ee.verification.accept',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.app.e2ee.verification.accept('x');\n\nconsole.log(response.appState);",
      },
      python: {
        method: 'app.e2ee.verification.accept',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.app.e2ee.verification.accept(\n    "x",\n)\nprint(response.app_state)',
      },
      go: {
        method: 'client.App.E2ee.Verification.Accept',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.App.E2ee.Verification.Accept(context.TODO(), "x")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.AppState)\n}\n',
      },
      cli: {
        method: 'verification accept',
        example:
          "beeper-desktop-cli app:e2ee:verification accept \\\n  --access-token 'My Access Token' \\\n  --verification-id x",
      },
      php: {
        method: 'app->e2ee->verification->accept',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->app->e2ee->verification->accept('x');\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl http://localhost:23373/v1/app/e2ee/verification/$VERIFICATION_ID/accept \\\n    -X POST \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
    },
  },
  {
    name: 'cancel',
    endpoint: '/v1/app/e2ee/verification/{verificationID}/cancel',
    httpMethod: 'post',
    summary: 'Cancel device verification',
    description: 'Cancel an active device verification request.',
    stainlessPath: '(resource) app.e2ee.verification > (method) cancel',
    qualified: 'client.app.e2ee.verification.cancel',
    params: ['verificationID: string;', 'code?: string;', 'reason?: string;'],
    response:
      "{ appState: { e2ee: { crossSigning: boolean; firstSyncDone: boolean; hasBackedUpCode: boolean; initialized: boolean; keyBackup: boolean; secrets: object; secretStorage: boolean; verified: boolean; recoveryCodeGeneratedAt?: number; }; state: string; matrix?: { deviceID: string; homeserver: string; userID: string; }; verification?: { availableActions: 'create' | 'qr.scan' | 'accept' | 'cancel' | 'qr.confirmScanned' | 'sas.start' | 'sas.confirm'[]; state: 'idle' | 'requested' | 'ready' | 'sas_ready' | 'qr_scanned' | 'done' | 'cancelled' | 'error'; error?: object; from?: string; fromDevice?: string; otherDevice?: string; qrData?: string; sas?: object; supportsSAS?: boolean; supportsScanQRCode?: boolean; verificationID?: string; }; }; }",
    markdown:
      "## cancel\n\n`client.app.e2ee.verification.cancel(verificationID: string, code?: string, reason?: string): { appState: object; }`\n\n**post** `/v1/app/e2ee/verification/{verificationID}/cancel`\n\nCancel an active device verification request.\n\n### Parameters\n\n- `verificationID: string`\n  Verification ID.\n\n- `code?: string`\n  Optional cancellation code.\n\n- `reason?: string`\n  Optional user-facing cancellation reason.\n\n### Returns\n\n- `{ appState: { e2ee: { crossSigning: boolean; firstSyncDone: boolean; hasBackedUpCode: boolean; initialized: boolean; keyBackup: boolean; secrets: object; secretStorage: boolean; verified: boolean; recoveryCodeGeneratedAt?: number; }; state: string; matrix?: { deviceID: string; homeserver: string; userID: string; }; verification?: { availableActions: 'create' | 'qr.scan' | 'accept' | 'cancel' | 'qr.confirmScanned' | 'sas.start' | 'sas.confirm'[]; state: 'idle' | 'requested' | 'ready' | 'sas_ready' | 'qr_scanned' | 'done' | 'cancelled' | 'error'; error?: object; from?: string; fromDevice?: string; otherDevice?: string; qrData?: string; sas?: object; supportsSAS?: boolean; supportsScanQRCode?: boolean; verificationID?: string; }; }; }`\n\n  - `appState: { e2ee: { crossSigning: boolean; firstSyncDone: boolean; hasBackedUpCode: boolean; initialized: boolean; keyBackup: boolean; secrets: { masterKey: boolean; megolmBackupKey: boolean; recoveryCode: boolean; selfSigningKey: boolean; userSigningKey: boolean; }; secretStorage: boolean; verified: boolean; recoveryCodeGeneratedAt?: number; }; state: string; matrix?: { deviceID: string; homeserver: string; userID: string; }; verification?: { availableActions: 'create' | 'qr.scan' | 'accept' | 'cancel' | 'qr.confirmScanned' | 'sas.start' | 'sas.confirm'[]; state: 'idle' | 'requested' | 'ready' | 'sas_ready' | 'qr_scanned' | 'done' | 'cancelled' | 'error'; error?: { code: string; reason: string; }; from?: string; fromDevice?: string; otherDevice?: string; qrData?: string; sas?: { decimals: string; emojis: string; }; supportsSAS?: boolean; supportsScanQRCode?: boolean; verificationID?: string; }; }`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst response = await client.app.e2ee.verification.cancel('x');\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.app.e2ee.verification.cancel',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.app.e2ee.verification.cancel('x');\n\nconsole.log(response.appState);",
      },
      python: {
        method: 'app.e2ee.verification.cancel',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.app.e2ee.verification.cancel(\n    verification_id="x",\n)\nprint(response.app_state)',
      },
      go: {
        method: 'client.App.E2ee.Verification.Cancel',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.App.E2ee.Verification.Cancel(\n\t\tcontext.TODO(),\n\t\t"x",\n\t\tbeeperdesktopapi.AppE2eeVerificationCancelParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.AppState)\n}\n',
      },
      cli: {
        method: 'verification cancel',
        example:
          "beeper-desktop-cli app:e2ee:verification cancel \\\n  --access-token 'My Access Token' \\\n  --verification-id x",
      },
      php: {
        method: 'app->e2ee->verification->cancel',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->app->e2ee->verification->cancel(\n  'x', code: 'code', reason: 'reason'\n);\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl http://localhost:23373/v1/app/e2ee/verification/$VERIFICATION_ID/cancel \\\n    -X POST \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
    },
  },
  {
    name: 'scan',
    endpoint: '/v1/app/e2ee/verification/qr/scan',
    httpMethod: 'post',
    summary: 'Scan verification QR code',
    description: 'Submit the QR code scanned from another signed-in device.',
    stainlessPath: '(resource) app.e2ee.verification.qr > (method) scan',
    qualified: 'client.app.e2ee.verification.qr.scan',
    params: ['data: string;'],
    response:
      "{ appState: { e2ee: { crossSigning: boolean; firstSyncDone: boolean; hasBackedUpCode: boolean; initialized: boolean; keyBackup: boolean; secrets: object; secretStorage: boolean; verified: boolean; recoveryCodeGeneratedAt?: number; }; state: string; matrix?: { deviceID: string; homeserver: string; userID: string; }; verification?: { availableActions: 'create' | 'qr.scan' | 'accept' | 'cancel' | 'qr.confirmScanned' | 'sas.start' | 'sas.confirm'[]; state: 'idle' | 'requested' | 'ready' | 'sas_ready' | 'qr_scanned' | 'done' | 'cancelled' | 'error'; error?: object; from?: string; fromDevice?: string; otherDevice?: string; qrData?: string; sas?: object; supportsSAS?: boolean; supportsScanQRCode?: boolean; verificationID?: string; }; }; }",
    markdown:
      "## scan\n\n`client.app.e2ee.verification.qr.scan(data: string): { appState: object; }`\n\n**post** `/v1/app/e2ee/verification/qr/scan`\n\nSubmit the QR code scanned from another signed-in device.\n\n### Parameters\n\n- `data: string`\n  QR code payload scanned from the other device.\n\n### Returns\n\n- `{ appState: { e2ee: { crossSigning: boolean; firstSyncDone: boolean; hasBackedUpCode: boolean; initialized: boolean; keyBackup: boolean; secrets: object; secretStorage: boolean; verified: boolean; recoveryCodeGeneratedAt?: number; }; state: string; matrix?: { deviceID: string; homeserver: string; userID: string; }; verification?: { availableActions: 'create' | 'qr.scan' | 'accept' | 'cancel' | 'qr.confirmScanned' | 'sas.start' | 'sas.confirm'[]; state: 'idle' | 'requested' | 'ready' | 'sas_ready' | 'qr_scanned' | 'done' | 'cancelled' | 'error'; error?: object; from?: string; fromDevice?: string; otherDevice?: string; qrData?: string; sas?: object; supportsSAS?: boolean; supportsScanQRCode?: boolean; verificationID?: string; }; }; }`\n\n  - `appState: { e2ee: { crossSigning: boolean; firstSyncDone: boolean; hasBackedUpCode: boolean; initialized: boolean; keyBackup: boolean; secrets: { masterKey: boolean; megolmBackupKey: boolean; recoveryCode: boolean; selfSigningKey: boolean; userSigningKey: boolean; }; secretStorage: boolean; verified: boolean; recoveryCodeGeneratedAt?: number; }; state: string; matrix?: { deviceID: string; homeserver: string; userID: string; }; verification?: { availableActions: 'create' | 'qr.scan' | 'accept' | 'cancel' | 'qr.confirmScanned' | 'sas.start' | 'sas.confirm'[]; state: 'idle' | 'requested' | 'ready' | 'sas_ready' | 'qr_scanned' | 'done' | 'cancelled' | 'error'; error?: { code: string; reason: string; }; from?: string; fromDevice?: string; otherDevice?: string; qrData?: string; sas?: { decimals: string; emojis: string; }; supportsSAS?: boolean; supportsScanQRCode?: boolean; verificationID?: string; }; }`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst response = await client.app.e2ee.verification.qr.scan({ data: 'x' });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.app.e2ee.verification.qr.scan',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.app.e2ee.verification.qr.scan({ data: 'x' });\n\nconsole.log(response.appState);",
      },
      python: {
        method: 'app.e2ee.verification.qr.scan',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.app.e2ee.verification.qr.scan(\n    data="x",\n)\nprint(response.app_state)',
      },
      go: {
        method: 'client.App.E2ee.Verification.Qr.Scan',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.App.E2ee.Verification.Qr.Scan(context.TODO(), beeperdesktopapi.AppE2eeVerificationQrScanParams{\n\t\tData: "x",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.AppState)\n}\n',
      },
      cli: {
        method: 'qr scan',
        example:
          "beeper-desktop-cli app:e2ee:verification:qr scan \\\n  --access-token 'My Access Token' \\\n  --data x",
      },
      php: {
        method: 'app->e2ee->verification->qr->scan',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->app->e2ee->verification->qr->scan(data: 'x');\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl http://localhost:23373/v1/app/e2ee/verification/qr/scan \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN" \\\n    -d \'{\n          "data": "x"\n        }\'',
      },
    },
  },
  {
    name: 'confirm_scanned',
    endpoint: '/v1/app/e2ee/verification/{verificationID}/qr/confirm-scanned',
    httpMethod: 'post',
    summary: 'Confirm QR code scan',
    description: 'Confirm that another device scanned this device QR code.',
    stainlessPath: '(resource) app.e2ee.verification.qr > (method) confirm_scanned',
    qualified: 'client.app.e2ee.verification.qr.confirmScanned',
    params: ['verificationID: string;'],
    response:
      "{ appState: { e2ee: { crossSigning: boolean; firstSyncDone: boolean; hasBackedUpCode: boolean; initialized: boolean; keyBackup: boolean; secrets: object; secretStorage: boolean; verified: boolean; recoveryCodeGeneratedAt?: number; }; state: string; matrix?: { deviceID: string; homeserver: string; userID: string; }; verification?: { availableActions: 'create' | 'qr.scan' | 'accept' | 'cancel' | 'qr.confirmScanned' | 'sas.start' | 'sas.confirm'[]; state: 'idle' | 'requested' | 'ready' | 'sas_ready' | 'qr_scanned' | 'done' | 'cancelled' | 'error'; error?: object; from?: string; fromDevice?: string; otherDevice?: string; qrData?: string; sas?: object; supportsSAS?: boolean; supportsScanQRCode?: boolean; verificationID?: string; }; }; }",
    markdown:
      "## confirm_scanned\n\n`client.app.e2ee.verification.qr.confirmScanned(verificationID: string): { appState: object; }`\n\n**post** `/v1/app/e2ee/verification/{verificationID}/qr/confirm-scanned`\n\nConfirm that another device scanned this device QR code.\n\n### Parameters\n\n- `verificationID: string`\n  Verification ID.\n\n### Returns\n\n- `{ appState: { e2ee: { crossSigning: boolean; firstSyncDone: boolean; hasBackedUpCode: boolean; initialized: boolean; keyBackup: boolean; secrets: object; secretStorage: boolean; verified: boolean; recoveryCodeGeneratedAt?: number; }; state: string; matrix?: { deviceID: string; homeserver: string; userID: string; }; verification?: { availableActions: 'create' | 'qr.scan' | 'accept' | 'cancel' | 'qr.confirmScanned' | 'sas.start' | 'sas.confirm'[]; state: 'idle' | 'requested' | 'ready' | 'sas_ready' | 'qr_scanned' | 'done' | 'cancelled' | 'error'; error?: object; from?: string; fromDevice?: string; otherDevice?: string; qrData?: string; sas?: object; supportsSAS?: boolean; supportsScanQRCode?: boolean; verificationID?: string; }; }; }`\n\n  - `appState: { e2ee: { crossSigning: boolean; firstSyncDone: boolean; hasBackedUpCode: boolean; initialized: boolean; keyBackup: boolean; secrets: { masterKey: boolean; megolmBackupKey: boolean; recoveryCode: boolean; selfSigningKey: boolean; userSigningKey: boolean; }; secretStorage: boolean; verified: boolean; recoveryCodeGeneratedAt?: number; }; state: string; matrix?: { deviceID: string; homeserver: string; userID: string; }; verification?: { availableActions: 'create' | 'qr.scan' | 'accept' | 'cancel' | 'qr.confirmScanned' | 'sas.start' | 'sas.confirm'[]; state: 'idle' | 'requested' | 'ready' | 'sas_ready' | 'qr_scanned' | 'done' | 'cancelled' | 'error'; error?: { code: string; reason: string; }; from?: string; fromDevice?: string; otherDevice?: string; qrData?: string; sas?: { decimals: string; emojis: string; }; supportsSAS?: boolean; supportsScanQRCode?: boolean; verificationID?: string; }; }`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst response = await client.app.e2ee.verification.qr.confirmScanned('x');\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.app.e2ee.verification.qr.confirmScanned',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.app.e2ee.verification.qr.confirmScanned('x');\n\nconsole.log(response.appState);",
      },
      python: {
        method: 'app.e2ee.verification.qr.confirm_scanned',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.app.e2ee.verification.qr.confirm_scanned(\n    "x",\n)\nprint(response.app_state)',
      },
      go: {
        method: 'client.App.E2ee.Verification.Qr.ConfirmScanned',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.App.E2ee.Verification.Qr.ConfirmScanned(context.TODO(), "x")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.AppState)\n}\n',
      },
      cli: {
        method: 'qr confirm_scanned',
        example:
          "beeper-desktop-cli app:e2ee:verification:qr confirm-scanned \\\n  --access-token 'My Access Token' \\\n  --verification-id x",
      },
      php: {
        method: 'app->e2ee->verification->qr->confirmScanned',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->app->e2ee->verification->qr->confirmScanned('x');\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl http://localhost:23373/v1/app/e2ee/verification/$VERIFICATION_ID/qr/confirm-scanned \\\n    -X POST \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
    },
  },
  {
    name: 'start',
    endpoint: '/v1/app/e2ee/verification/{verificationID}/sas/start',
    httpMethod: 'post',
    summary: 'Start emoji verification',
    description: 'Start emoji comparison for device verification.',
    stainlessPath: '(resource) app.e2ee.verification.sas > (method) start',
    qualified: 'client.app.e2ee.verification.sas.start',
    params: ['verificationID: string;'],
    response:
      "{ appState: { e2ee: { crossSigning: boolean; firstSyncDone: boolean; hasBackedUpCode: boolean; initialized: boolean; keyBackup: boolean; secrets: object; secretStorage: boolean; verified: boolean; recoveryCodeGeneratedAt?: number; }; state: string; matrix?: { deviceID: string; homeserver: string; userID: string; }; verification?: { availableActions: 'create' | 'qr.scan' | 'accept' | 'cancel' | 'qr.confirmScanned' | 'sas.start' | 'sas.confirm'[]; state: 'idle' | 'requested' | 'ready' | 'sas_ready' | 'qr_scanned' | 'done' | 'cancelled' | 'error'; error?: object; from?: string; fromDevice?: string; otherDevice?: string; qrData?: string; sas?: object; supportsSAS?: boolean; supportsScanQRCode?: boolean; verificationID?: string; }; }; }",
    markdown:
      "## start\n\n`client.app.e2ee.verification.sas.start(verificationID: string): { appState: object; }`\n\n**post** `/v1/app/e2ee/verification/{verificationID}/sas/start`\n\nStart emoji comparison for device verification.\n\n### Parameters\n\n- `verificationID: string`\n  Verification ID.\n\n### Returns\n\n- `{ appState: { e2ee: { crossSigning: boolean; firstSyncDone: boolean; hasBackedUpCode: boolean; initialized: boolean; keyBackup: boolean; secrets: object; secretStorage: boolean; verified: boolean; recoveryCodeGeneratedAt?: number; }; state: string; matrix?: { deviceID: string; homeserver: string; userID: string; }; verification?: { availableActions: 'create' | 'qr.scan' | 'accept' | 'cancel' | 'qr.confirmScanned' | 'sas.start' | 'sas.confirm'[]; state: 'idle' | 'requested' | 'ready' | 'sas_ready' | 'qr_scanned' | 'done' | 'cancelled' | 'error'; error?: object; from?: string; fromDevice?: string; otherDevice?: string; qrData?: string; sas?: object; supportsSAS?: boolean; supportsScanQRCode?: boolean; verificationID?: string; }; }; }`\n\n  - `appState: { e2ee: { crossSigning: boolean; firstSyncDone: boolean; hasBackedUpCode: boolean; initialized: boolean; keyBackup: boolean; secrets: { masterKey: boolean; megolmBackupKey: boolean; recoveryCode: boolean; selfSigningKey: boolean; userSigningKey: boolean; }; secretStorage: boolean; verified: boolean; recoveryCodeGeneratedAt?: number; }; state: string; matrix?: { deviceID: string; homeserver: string; userID: string; }; verification?: { availableActions: 'create' | 'qr.scan' | 'accept' | 'cancel' | 'qr.confirmScanned' | 'sas.start' | 'sas.confirm'[]; state: 'idle' | 'requested' | 'ready' | 'sas_ready' | 'qr_scanned' | 'done' | 'cancelled' | 'error'; error?: { code: string; reason: string; }; from?: string; fromDevice?: string; otherDevice?: string; qrData?: string; sas?: { decimals: string; emojis: string; }; supportsSAS?: boolean; supportsScanQRCode?: boolean; verificationID?: string; }; }`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst response = await client.app.e2ee.verification.sas.start('x');\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.app.e2ee.verification.sas.start',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.app.e2ee.verification.sas.start('x');\n\nconsole.log(response.appState);",
      },
      python: {
        method: 'app.e2ee.verification.sas.start',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.app.e2ee.verification.sas.start(\n    "x",\n)\nprint(response.app_state)',
      },
      go: {
        method: 'client.App.E2ee.Verification.Sas.Start',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.App.E2ee.Verification.Sas.Start(context.TODO(), "x")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.AppState)\n}\n',
      },
      cli: {
        method: 'sas start',
        example:
          "beeper-desktop-cli app:e2ee:verification:sas start \\\n  --access-token 'My Access Token' \\\n  --verification-id x",
      },
      php: {
        method: 'app->e2ee->verification->sas->start',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->app->e2ee->verification->sas->start('x');\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl http://localhost:23373/v1/app/e2ee/verification/$VERIFICATION_ID/sas/start \\\n    -X POST \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
    },
  },
  {
    name: 'confirm',
    endpoint: '/v1/app/e2ee/verification/{verificationID}/sas/confirm',
    httpMethod: 'post',
    summary: 'Confirm emoji verification',
    description: 'Confirm that the emoji or number sequence matches on both devices.',
    stainlessPath: '(resource) app.e2ee.verification.sas > (method) confirm',
    qualified: 'client.app.e2ee.verification.sas.confirm',
    params: ['verificationID: string;'],
    response:
      "{ appState: { e2ee: { crossSigning: boolean; firstSyncDone: boolean; hasBackedUpCode: boolean; initialized: boolean; keyBackup: boolean; secrets: object; secretStorage: boolean; verified: boolean; recoveryCodeGeneratedAt?: number; }; state: string; matrix?: { deviceID: string; homeserver: string; userID: string; }; verification?: { availableActions: 'create' | 'qr.scan' | 'accept' | 'cancel' | 'qr.confirmScanned' | 'sas.start' | 'sas.confirm'[]; state: 'idle' | 'requested' | 'ready' | 'sas_ready' | 'qr_scanned' | 'done' | 'cancelled' | 'error'; error?: object; from?: string; fromDevice?: string; otherDevice?: string; qrData?: string; sas?: object; supportsSAS?: boolean; supportsScanQRCode?: boolean; verificationID?: string; }; }; }",
    markdown:
      "## confirm\n\n`client.app.e2ee.verification.sas.confirm(verificationID: string): { appState: object; }`\n\n**post** `/v1/app/e2ee/verification/{verificationID}/sas/confirm`\n\nConfirm that the emoji or number sequence matches on both devices.\n\n### Parameters\n\n- `verificationID: string`\n  Verification ID.\n\n### Returns\n\n- `{ appState: { e2ee: { crossSigning: boolean; firstSyncDone: boolean; hasBackedUpCode: boolean; initialized: boolean; keyBackup: boolean; secrets: object; secretStorage: boolean; verified: boolean; recoveryCodeGeneratedAt?: number; }; state: string; matrix?: { deviceID: string; homeserver: string; userID: string; }; verification?: { availableActions: 'create' | 'qr.scan' | 'accept' | 'cancel' | 'qr.confirmScanned' | 'sas.start' | 'sas.confirm'[]; state: 'idle' | 'requested' | 'ready' | 'sas_ready' | 'qr_scanned' | 'done' | 'cancelled' | 'error'; error?: object; from?: string; fromDevice?: string; otherDevice?: string; qrData?: string; sas?: object; supportsSAS?: boolean; supportsScanQRCode?: boolean; verificationID?: string; }; }; }`\n\n  - `appState: { e2ee: { crossSigning: boolean; firstSyncDone: boolean; hasBackedUpCode: boolean; initialized: boolean; keyBackup: boolean; secrets: { masterKey: boolean; megolmBackupKey: boolean; recoveryCode: boolean; selfSigningKey: boolean; userSigningKey: boolean; }; secretStorage: boolean; verified: boolean; recoveryCodeGeneratedAt?: number; }; state: string; matrix?: { deviceID: string; homeserver: string; userID: string; }; verification?: { availableActions: 'create' | 'qr.scan' | 'accept' | 'cancel' | 'qr.confirmScanned' | 'sas.start' | 'sas.confirm'[]; state: 'idle' | 'requested' | 'ready' | 'sas_ready' | 'qr_scanned' | 'done' | 'cancelled' | 'error'; error?: { code: string; reason: string; }; from?: string; fromDevice?: string; otherDevice?: string; qrData?: string; sas?: { decimals: string; emojis: string; }; supportsSAS?: boolean; supportsScanQRCode?: boolean; verificationID?: string; }; }`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst response = await client.app.e2ee.verification.sas.confirm('x');\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.app.e2ee.verification.sas.confirm',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.app.e2ee.verification.sas.confirm('x');\n\nconsole.log(response.appState);",
      },
      python: {
        method: 'app.e2ee.verification.sas.confirm',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.app.e2ee.verification.sas.confirm(\n    "x",\n)\nprint(response.app_state)',
      },
      go: {
        method: 'client.App.E2ee.Verification.Sas.Confirm',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.App.E2ee.Verification.Sas.Confirm(context.TODO(), "x")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.AppState)\n}\n',
      },
      cli: {
        method: 'sas confirm',
        example:
          "beeper-desktop-cli app:e2ee:verification:sas confirm \\\n  --access-token 'My Access Token' \\\n  --verification-id x",
      },
      php: {
        method: 'app->e2ee->verification->sas->confirm',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->app->e2ee->verification->sas->confirm('x');\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl http://localhost:23373/v1/app/e2ee/verification/$VERIFICATION_ID/sas/confirm \\\n    -X POST \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
    },
  },
  {
    name: 'retrieve_profile',
    endpoint: '/_matrix/client/v3/profile/{userId}',
    httpMethod: 'get',
    summary: 'Get all profile information for a user.',
    description: 'Get the complete profile for a user.',
    stainlessPath: '(resource) matrix.users > (method) retrieve_profile',
    qualified: 'client.matrix.users.retrieveProfile',
    params: ['userId: string;'],
    response: '{ avatar_url?: string; displayname?: string; m.tz?: string; }',
    markdown:
      "## retrieve_profile\n\n`client.matrix.users.retrieveProfile(userId: string): { avatar_url?: string; displayname?: string; m.tz?: string; }`\n\n**get** `/_matrix/client/v3/profile/{userId}`\n\nGet the complete profile for a user.\n\n### Parameters\n\n- `userId: string`\n\n### Returns\n\n- `{ avatar_url?: string; displayname?: string; m.tz?: string; }`\n\n  - `avatar_url?: string`\n  - `displayname?: string`\n  - `m.tz?: string`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst response = await client.matrix.users.retrieveProfile('@alice:example.com');\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.matrix.users.retrieveProfile',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.matrix.users.retrieveProfile('@alice:example.com');\n\nconsole.log(response.avatar_url);",
      },
      python: {
        method: 'matrix.users.retrieve_profile',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.matrix.users.retrieve_profile(\n    "@alice:example.com",\n)\nprint(response.avatar_url)',
      },
      go: {
        method: 'client.Matrix.Users.GetProfile',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.Matrix.Users.GetProfile(context.TODO(), "@alice:example.com")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.AvatarURL)\n}\n',
      },
      cli: {
        method: 'users retrieve_profile',
        example:
          "beeper-desktop-cli matrix:users retrieve-profile \\\n  --access-token 'My Access Token' \\\n  --user-id @alice:example.com",
      },
      php: {
        method: 'matrix->users->retrieveProfile',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->matrix->users->retrieveProfile('@alice:example.com');\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl http://localhost:23373/_matrix/client/v3/profile/$USER_ID \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/_matrix/client/v3/user/{userId}/account_data/{type}',
    httpMethod: 'get',
    summary: 'Get some account data for the user.',
    description:
      'Get some account data for the client. This config is only visible to the user\nthat set the account data.',
    stainlessPath: '(resource) matrix.users.account_data > (method) retrieve',
    qualified: 'client.matrix.users.accountData.retrieve',
    params: ['userId: string;', 'type: string;'],
    response: 'object',
    markdown:
      "## retrieve\n\n`client.matrix.users.accountData.retrieve(userId: string, type: string): object`\n\n**get** `/_matrix/client/v3/user/{userId}/account_data/{type}`\n\nGet some account data for the client. This config is only visible to the user\nthat set the account data.\n\n### Parameters\n\n- `userId: string`\n\n- `type: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst accountData = await client.matrix.users.accountData.retrieve('org.example.custom.config', { userId: '@alice:example.com' });\n\nconsole.log(accountData);\n```",
    perLanguage: {
      typescript: {
        method: 'client.matrix.users.accountData.retrieve',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst accountData = await client.matrix.users.accountData.retrieve('org.example.custom.config', {\n  userId: '@alice:example.com',\n});\n\nconsole.log(accountData);",
      },
      python: {
        method: 'matrix.users.account_data.retrieve',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\naccount_data = client.matrix.users.account_data.retrieve(\n    type="org.example.custom.config",\n    user_id="@alice:example.com",\n)\nprint(account_data)',
      },
      go: {
        method: 'client.Matrix.Users.AccountData.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\taccountData, err := client.Matrix.Users.AccountData.Get(\n\t\tcontext.TODO(),\n\t\t"org.example.custom.config",\n\t\tbeeperdesktopapi.MatrixUserAccountDataGetParams{\n\t\t\tUserID: "@alice:example.com",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", accountData)\n}\n',
      },
      cli: {
        method: 'account_data retrieve',
        example:
          "beeper-desktop-cli matrix:users:account-data retrieve \\\n  --access-token 'My Access Token' \\\n  --user-id @alice:example.com \\\n  --type org.example.custom.config",
      },
      php: {
        method: 'matrix->users->accountData->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$accountData = $client->matrix->users->accountData->retrieve(\n  'org.example.custom.config', userID: '@alice:example.com'\n);\n\nvar_dump($accountData);",
      },
      http: {
        example:
          'curl http://localhost:23373/_matrix/client/v3/user/$USER_ID/account_data/$TYPE \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
    },
  },
  {
    name: 'update',
    endpoint: '/_matrix/client/v3/user/{userId}/account_data/{type}',
    httpMethod: 'put',
    summary: 'Set some account data for the user.',
    description:
      'Set some account data for the client. This config is only visible to the user\nthat set the account data. The config will be available to clients through the\ntop-level `account_data` field in the homeserver response to\n[/sync](https://spec.matrix.org/v1.18/client-server-api/#get_matrixclientv3sync).',
    stainlessPath: '(resource) matrix.users.account_data > (method) update',
    qualified: 'client.matrix.users.accountData.update',
    params: ['userId: string;', 'type: string;', 'body: object;'],
    response: 'object',
    markdown:
      "## update\n\n`client.matrix.users.accountData.update(userId: string, type: string, body: object): object`\n\n**put** `/_matrix/client/v3/user/{userId}/account_data/{type}`\n\nSet some account data for the client. This config is only visible to the user\nthat set the account data. The config will be available to clients through the\ntop-level `account_data` field in the homeserver response to\n[/sync](https://spec.matrix.org/v1.18/client-server-api/#get_matrixclientv3sync).\n\n### Parameters\n\n- `userId: string`\n\n- `type: string`\n\n- `body: object`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst accountData = await client.matrix.users.accountData.update('org.example.custom.config', {\n  userId: '@alice:example.com',\n  body: { custom_account_data_key: 'custom_config_value' },\n});\n\nconsole.log(accountData);\n```",
    perLanguage: {
      typescript: {
        method: 'client.matrix.users.accountData.update',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst accountData = await client.matrix.users.accountData.update('org.example.custom.config', {\n  userId: '@alice:example.com',\n  body: { custom_account_data_key: 'custom_config_value' },\n});\n\nconsole.log(accountData);",
      },
      python: {
        method: 'matrix.users.account_data.update',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\naccount_data = client.matrix.users.account_data.update(\n    type="org.example.custom.config",\n    user_id="@alice:example.com",\n    body={\n        "custom_account_data_key": "custom_config_value"\n    },\n)\nprint(account_data)',
      },
      go: {
        method: 'client.Matrix.Users.AccountData.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\taccountData, err := client.Matrix.Users.AccountData.Update(\n\t\tcontext.TODO(),\n\t\t"org.example.custom.config",\n\t\tbeeperdesktopapi.MatrixUserAccountDataUpdateParams{\n\t\t\tUserID: "@alice:example.com",\n\t\t\tBody: map[string]any{\n\t\t\t\t"custom_account_data_key": "custom_config_value",\n\t\t\t},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", accountData)\n}\n',
      },
      cli: {
        method: 'account_data update',
        example:
          "beeper-desktop-cli matrix:users:account-data update \\\n  --access-token 'My Access Token' \\\n  --user-id @alice:example.com \\\n  --type org.example.custom.config \\\n  --body '{custom_account_data_key: custom_config_value}'",
      },
      php: {
        method: 'matrix->users->accountData->update',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$accountData = $client->matrix->users->accountData->update(\n  'org.example.custom.config',\n  userID: '@alice:example.com',\n  body: ['custom_account_data_key' => 'custom_config_value'],\n);\n\nvar_dump($accountData);",
      },
      http: {
        example:
          'curl http://localhost:23373/_matrix/client/v3/user/$USER_ID/account_data/$TYPE \\\n    -X PUT \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN" \\\n    -d \'{\n          "custom_account_data_key": "custom_config_value"\n        }\'',
      },
    },
  },
  {
    name: 'create',
    endpoint: '/_matrix/client/v3/createRoom',
    httpMethod: 'post',
    summary: 'Create a new room',
    description:
      "Create a new room with various configuration options.\n\nThe server MUST apply the normal state resolution rules when creating\nthe new room, including checking power levels for each event. It MUST\napply the events implied by the request in the following order:\n\n1. The `m.room.create` event itself. Must be the first event in the\n   room.\n\n2. An `m.room.member` event for the creator to join the room. This is\n   needed so the remaining events can be sent.\n\n3. A default `m.room.power_levels` event. Overridden by the\n   `power_level_content_override` parameter.\n\n   In [room versions](https://spec.matrix.org/v1.18/rooms) 1 through 11, the room creator (and not\n   other members) will be given permission to send state events.\n\n   In room versions 12 and later, the room creator is given infinite\n   power level and cannot be specified in the `users` field of\n   `m.room.power_levels`, so is not listed explicitly.\n\n   **Note**: For `trusted_private_chat`, the users specified in the\n   `invite` parameter SHOULD also be appended to `additional_creators`\n   by the server, per the `creation_content` parameter.\n\n   If the room's version is 12 or higher, the power level for sending\n   `m.room.tombstone` events MUST explicitly be higher than `state_default`.\n   For example, set to 150 instead of 100.\n\n4. An `m.room.canonical_alias` event if `room_alias_name` is given.\n\n5. Events set by the `preset`. Currently these are the `m.room.join_rules`,\n   `m.room.history_visibility`, and `m.room.guest_access` state events.\n\n6. Events listed in `initial_state`, in the order that they are\n   listed.\n\n7. Events implied by `name` and `topic` (`m.room.name` and `m.room.topic`\n   state events).\n\n8. Invite events implied by `invite` and `invite_3pid` (`m.room.member` with\n   `membership: invite` and `m.room.third_party_invite`).\n\nThe available presets do the following with respect to room state:\n\n| Preset                 | `join_rules` | `history_visibility` | `guest_access` | Other |\n|------------------------|--------------|----------------------|----------------|-------|\n| `private_chat`         | `invite`     | `shared`             | `can_join`     |       |\n| `trusted_private_chat` | `invite`     | `shared`             | `can_join`     | All invitees are given the same power level as the room creator. |\n| `public_chat`          | `public`     | `shared`             | `forbidden`    |       |\n\nThe server will create a `m.room.create` event in the room with the\nrequesting user as the creator, alongside other keys provided in the\n`creation_content` or implied by behaviour of `creation_content`.",
    stainlessPath: '(resource) matrix.rooms > (method) create',
    qualified: 'client.matrix.rooms.create',
    params: [
      'creation_content?: object;',
      'initial_state?: { content: object; type: string; state_key?: string; }[];',
      'invite?: string[];',
      'invite_3pid?: { address: string; id_access_token: string; id_server: string; medium: string; }[];',
      'is_direct?: boolean;',
      'name?: string;',
      'power_level_content_override?: object;',
      "preset?: 'private_chat' | 'public_chat' | 'trusted_private_chat';",
      'room_alias_name?: string;',
      'room_version?: string;',
      'topic?: string;',
      "visibility?: 'public' | 'private';",
    ],
    response: '{ room_id: string; }',
    markdown:
      "## create\n\n`client.matrix.rooms.create(creation_content?: object, initial_state?: { content: object; type: string; state_key?: string; }[], invite?: string[], invite_3pid?: { address: string; id_access_token: string; id_server: string; medium: string; }[], is_direct?: boolean, name?: string, power_level_content_override?: object, preset?: 'private_chat' | 'public_chat' | 'trusted_private_chat', room_alias_name?: string, room_version?: string, topic?: string, visibility?: 'public' | 'private'): { room_id: string; }`\n\n**post** `/_matrix/client/v3/createRoom`\n\nCreate a new room with various configuration options.\n\nThe server MUST apply the normal state resolution rules when creating\nthe new room, including checking power levels for each event. It MUST\napply the events implied by the request in the following order:\n\n1. The `m.room.create` event itself. Must be the first event in the\n   room.\n\n2. An `m.room.member` event for the creator to join the room. This is\n   needed so the remaining events can be sent.\n\n3. A default `m.room.power_levels` event. Overridden by the\n   `power_level_content_override` parameter.\n\n   In [room versions](https://spec.matrix.org/v1.18/rooms) 1 through 11, the room creator (and not\n   other members) will be given permission to send state events.\n\n   In room versions 12 and later, the room creator is given infinite\n   power level and cannot be specified in the `users` field of\n   `m.room.power_levels`, so is not listed explicitly.\n\n   **Note**: For `trusted_private_chat`, the users specified in the\n   `invite` parameter SHOULD also be appended to `additional_creators`\n   by the server, per the `creation_content` parameter.\n\n   If the room's version is 12 or higher, the power level for sending\n   `m.room.tombstone` events MUST explicitly be higher than `state_default`.\n   For example, set to 150 instead of 100.\n\n4. An `m.room.canonical_alias` event if `room_alias_name` is given.\n\n5. Events set by the `preset`. Currently these are the `m.room.join_rules`,\n   `m.room.history_visibility`, and `m.room.guest_access` state events.\n\n6. Events listed in `initial_state`, in the order that they are\n   listed.\n\n7. Events implied by `name` and `topic` (`m.room.name` and `m.room.topic`\n   state events).\n\n8. Invite events implied by `invite` and `invite_3pid` (`m.room.member` with\n   `membership: invite` and `m.room.third_party_invite`).\n\nThe available presets do the following with respect to room state:\n\n| Preset                 | `join_rules` | `history_visibility` | `guest_access` | Other |\n|------------------------|--------------|----------------------|----------------|-------|\n| `private_chat`         | `invite`     | `shared`             | `can_join`     |       |\n| `trusted_private_chat` | `invite`     | `shared`             | `can_join`     | All invitees are given the same power level as the room creator. |\n| `public_chat`          | `public`     | `shared`             | `forbidden`    |       |\n\nThe server will create a `m.room.create` event in the room with the\nrequesting user as the creator, alongside other keys provided in the\n`creation_content` or implied by behaviour of `creation_content`.\n\n### Parameters\n\n- `creation_content?: object`\n  Extra keys, such as `m.federate`, to be added to the content\nof the [`m.room.create`](https://spec.matrix.org/v1.18/client-server-api/#mroomcreate) event.\n\nThe server will overwrite the following\nkeys: `creator`, `room_version`. Future versions of the specification\nmay allow the server to overwrite other keys.\n\nWhen using the `trusted_private_chat` preset, the server SHOULD combine\n`additional_creators` specified here and the `invite` array into the\neventual `m.room.create` event's `additional_creators`, deduplicating\nbetween the two parameters.\n\n- `initial_state?: { content: object; type: string; state_key?: string; }[]`\n  A list of state events to set in the new room. This allows\nthe user to override the default state events set in the new\nroom. The expected format of the state events are an object\nwith type, state_key and content keys set.\n\nTakes precedence over events set by `preset`, but gets\noverridden by `name` and `topic` keys.\n\n- `invite?: string[]`\n  A list of user IDs to invite to the room. This will tell the\nserver to invite everyone in the list to the newly created room.\n\n- `invite_3pid?: { address: string; id_access_token: string; id_server: string; medium: string; }[]`\n  A list of objects representing third-party IDs to invite into\nthe room.\n\n- `is_direct?: boolean`\n  This flag makes the server set the `is_direct` flag on the\n`m.room.member` events sent to the users in `invite` and\n`invite_3pid`. See [Direct Messaging](https://spec.matrix.org/v1.18/client-server-api/#direct-messaging) for more information.\n\n- `name?: string`\n  If this is included, an [`m.room.name`](https://spec.matrix.org/v1.18/client-server-api/#mroomname) event\nwill be sent into the room to indicate the name for the room.\nThis overwrites any [`m.room.name`](https://spec.matrix.org/v1.18/client-server-api/#mroomname)\nevent in `initial_state`.\n\n- `power_level_content_override?: object`\n  The power level content to override in the default power level\nevent. This object is applied on top of the generated\n[`m.room.power_levels`](https://spec.matrix.org/v1.18/client-server-api/#mroompower_levels)\nevent content prior to it being sent to the room. Defaults to\noverriding nothing.\n\n- `preset?: 'private_chat' | 'public_chat' | 'trusted_private_chat'`\n  Convenience parameter for setting various default state events\nbased on a preset.\n\nIf unspecified, the server should use the `visibility` to determine\nwhich preset to use. A visibility of `public` equates to a preset of\n`public_chat` and `private` visibility equates to a preset of\n`private_chat`.\n\n- `room_alias_name?: string`\n  The desired room alias **local part**. If this is included, a\nroom alias will be created and mapped to the newly created\nroom. The alias will belong on the *same* homeserver which\ncreated the room. For example, if this was set to \"foo\" and\nsent to the homeserver \"example.com\" the complete room alias\nwould be `#foo:example.com`.\n\nThe complete room alias will become the canonical alias for\nthe room and an `m.room.canonical_alias` event will be sent\ninto the room.\n\n- `room_version?: string`\n  The room version to set for the room. If not provided, the homeserver is\nto use its configured default. If provided, the homeserver will return a\n400 error with the errcode `M_UNSUPPORTED_ROOM_VERSION` if it does not\nsupport the room version.\n\n- `topic?: string`\n  If this is included, an [`m.room.topic`](https://spec.matrix.org/v1.18/client-server-api/#mroomtopic)\nevent with a `text/plain` mimetype will be sent into the room\nto indicate the topic for the room. This overwrites any\n[`m.room.topic`](https://spec.matrix.org/v1.18/client-server-api/#mroomtopic) event in `initial_state`.\n\n- `visibility?: 'public' | 'private'`\n  The room's visibility in the server's\n[published room directory](https://spec.matrix.org/v1.18/client-server-api#published-room-directory).\nDefaults to `private`.\n\n### Returns\n\n- `{ room_id: string; }`\n  Information about the newly created room.\n\n  - `room_id: string`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst room = await client.matrix.rooms.create();\n\nconsole.log(room);\n```",
    perLanguage: {
      typescript: {
        method: 'client.matrix.rooms.create',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst room = await client.matrix.rooms.create();\n\nconsole.log(room.room_id);",
      },
      python: {
        method: 'matrix.rooms.create',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nroom = client.matrix.rooms.create()\nprint(room.room_id)',
      },
      go: {
        method: 'client.Matrix.Rooms.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\troom, err := client.Matrix.Rooms.New(context.TODO(), beeperdesktopapi.MatrixRoomNewParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", room.RoomID)\n}\n',
      },
      cli: {
        method: 'rooms create',
        example: "beeper-desktop-cli matrix:rooms create \\\n  --access-token 'My Access Token'",
      },
      php: {
        method: 'matrix->rooms->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$room = $client->matrix->rooms->create(\n  creationContent: ['m.federate' => false],\n  initialState: [\n    ['content' => (object) [], 'type' => 'type', 'stateKey' => 'state_key']\n  ],\n  invite: ['string'],\n  invite3pid: [\n    [\n      'address' => 'cheeky@monkey.com',\n      'idAccessToken' => 'abc123_OpaqueString',\n      'idServer' => 'matrix.org',\n      'medium' => 'email',\n    ],\n  ],\n  isDirect: true,\n  name: 'The Grand Duke Pub',\n  powerLevelContentOverride: (object) [],\n  preset: 'public_chat',\n  roomAliasName: 'thepub',\n  roomVersion: '1',\n  topic: 'All about happy hour',\n  visibility: 'public',\n);\n\nvar_dump($room);",
      },
      http: {
        example:
          'curl http://localhost:23373/_matrix/client/v3/createRoom \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN" \\\n    -d \'{\n          "creation_content": {\n            "m.federate": false\n          },\n          "name": "The Grand Duke Pub",\n          "preset": "public_chat",\n          "room_alias_name": "thepub",\n          "room_version": "1",\n          "topic": "All about happy hour"\n        }\'',
      },
    },
  },
  {
    name: 'join',
    endpoint: '/_matrix/client/v3/join/{roomIdOrAlias}',
    httpMethod: 'post',
    summary: 'Join the requesting user to a particular room.',
    description:
      "*Note that this API takes either a room ID or alias, unlike* `/rooms/{roomId}/join`.\n\nThis API starts a user's participation in a particular room, if that user\nis allowed to participate in that room. After this call, the client is\nallowed to see all current state events in the room, and all subsequent\nevents associated with the room until the user leaves the room.\n\nAfter a user has joined a room, the room will appear as an entry in the\nresponse of the [`/initialSync`](https://spec.matrix.org/v1.18/client-server-api/#get_matrixclientv3initialsync)\nand [`/sync`](https://spec.matrix.org/v1.18/client-server-api/#get_matrixclientv3sync) APIs.",
    stainlessPath: '(resource) matrix.rooms > (method) join',
    qualified: 'client.matrix.rooms.join',
    params: [
      'roomIdOrAlias: string;',
      'via?: string[];',
      'reason?: string;',
      'third_party_signed?: { token: string; mxid: string; sender: string; signatures: object; };',
    ],
    response: '{ room_id: string; }',
    markdown:
      "## join\n\n`client.matrix.rooms.join(roomIdOrAlias: string, via?: string[], reason?: string, third_party_signed?: { token: string; mxid: string; sender: string; signatures: object; }): { room_id: string; }`\n\n**post** `/_matrix/client/v3/join/{roomIdOrAlias}`\n\n*Note that this API takes either a room ID or alias, unlike* `/rooms/{roomId}/join`.\n\nThis API starts a user's participation in a particular room, if that user\nis allowed to participate in that room. After this call, the client is\nallowed to see all current state events in the room, and all subsequent\nevents associated with the room until the user leaves the room.\n\nAfter a user has joined a room, the room will appear as an entry in the\nresponse of the [`/initialSync`](https://spec.matrix.org/v1.18/client-server-api/#get_matrixclientv3initialsync)\nand [`/sync`](https://spec.matrix.org/v1.18/client-server-api/#get_matrixclientv3sync) APIs.\n\n### Parameters\n\n- `roomIdOrAlias: string`\n\n- `via?: string[]`\n  The servers to attempt to join the room through. One of the servers\nmust be participating in the room.\n\n- `reason?: string`\n  Optional reason to be included as the `reason` on the subsequent\nmembership event.\n\n- `third_party_signed?: { token: string; mxid: string; sender: string; signatures: object; }`\n  A signature of an `m.third_party_invite` token to prove that this user\nowns a third-party identity which has been invited to the room.\n  - `token: string`\n    The state key of the m.third_party_invite event.\n  - `mxid: string`\n    The Matrix ID of the invitee.\n  - `sender: string`\n    The Matrix ID of the user who issued the invite.\n  - `signatures: object`\n    A signatures object containing a signature of the entire signed object.\n\n### Returns\n\n- `{ room_id: string; }`\n\n  - `room_id: string`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst response = await client.matrix.rooms.join('!monkeys:matrix.org');\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.matrix.rooms.join',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.matrix.rooms.join('!monkeys:matrix.org');\n\nconsole.log(response.room_id);",
      },
      python: {
        method: 'matrix.rooms.join',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.matrix.rooms.join(\n    room_id_or_alias="!monkeys:matrix.org",\n)\nprint(response.room_id)',
      },
      go: {
        method: 'client.Matrix.Rooms.Join',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.Matrix.Rooms.Join(\n\t\tcontext.TODO(),\n\t\t"!monkeys:matrix.org",\n\t\tbeeperdesktopapi.MatrixRoomJoinParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.RoomID)\n}\n',
      },
      cli: {
        method: 'rooms join',
        example:
          "beeper-desktop-cli matrix:rooms join \\\n  --access-token 'My Access Token' \\\n  --room-id-or-alias '!monkeys:matrix.org'",
      },
      php: {
        method: 'matrix->rooms->join',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->matrix->rooms->join(\n  '!monkeys:matrix.org',\n  via: ['string'],\n  reason: 'Looking for support',\n  thirdPartySigned: [\n    'token' => 'random8nonce',\n    'mxid' => 'bob',\n    'sender' => 'alice',\n    'signatures' => ['example.org' => ['ed25519:0' => 'some9signature']],\n  ],\n);\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl http://localhost:23373/_matrix/client/v3/join/$ROOM_ID_OR_ALIAS \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN" \\\n    -d \'{\n          "reason": "Looking for support"\n        }\'',
      },
    },
  },
  {
    name: 'leave',
    endpoint: '/_matrix/client/v3/rooms/{roomId}/leave',
    httpMethod: 'post',
    summary: 'Stop the requesting user participating in a particular room.',
    description:
      "This API stops a user participating in a particular room.\n\nIf the user was already in the room, they will no longer be able to see\nnew events in the room. If the room requires an invite to join, they\nwill need to be re-invited before they can re-join.\n\nIf the user was invited to the room, but had not joined, this call\nserves to reject the invite.\n\nServers MAY additionally forget the room when this endpoint is called –\njust as if the user had also invoked [`/forget`](https://spec.matrix.org/v1.18/client-server-api/#post_matrixclientv3roomsroomidforget).\nServers that do this, MUST inform clients about this behavior using the\n[`m.forget_forced_upon_leave`](https://spec.matrix.org/v1.18/client-server-api/#mforget_forced_upon_leave-capability)\ncapability.\n\nIf the server doesn't automatically forget the room, the user will still be\nallowed to retrieve history from the room which they were previously allowed\nto see.",
    stainlessPath: '(resource) matrix.rooms > (method) leave',
    qualified: 'client.matrix.rooms.leave',
    params: ['roomId: string;', 'reason?: string;'],
    response: 'object',
    markdown:
      "## leave\n\n`client.matrix.rooms.leave(roomId: string, reason?: string): object`\n\n**post** `/_matrix/client/v3/rooms/{roomId}/leave`\n\nThis API stops a user participating in a particular room.\n\nIf the user was already in the room, they will no longer be able to see\nnew events in the room. If the room requires an invite to join, they\nwill need to be re-invited before they can re-join.\n\nIf the user was invited to the room, but had not joined, this call\nserves to reject the invite.\n\nServers MAY additionally forget the room when this endpoint is called –\njust as if the user had also invoked [`/forget`](https://spec.matrix.org/v1.18/client-server-api/#post_matrixclientv3roomsroomidforget).\nServers that do this, MUST inform clients about this behavior using the\n[`m.forget_forced_upon_leave`](https://spec.matrix.org/v1.18/client-server-api/#mforget_forced_upon_leave-capability)\ncapability.\n\nIf the server doesn't automatically forget the room, the user will still be\nallowed to retrieve history from the room which they were previously allowed\nto see.\n\n### Parameters\n\n- `roomId: string`\n\n- `reason?: string`\n  Optional reason to be included as the `reason` on the subsequent\nmembership event.\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst response = await client.matrix.rooms.leave('!nkl290a:matrix.org');\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.matrix.rooms.leave',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.matrix.rooms.leave('!nkl290a:matrix.org');\n\nconsole.log(response);",
      },
      python: {
        method: 'matrix.rooms.leave',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.matrix.rooms.leave(\n    room_id="!nkl290a:matrix.org",\n)\nprint(response)',
      },
      go: {
        method: 'client.Matrix.Rooms.Leave',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.Matrix.Rooms.Leave(\n\t\tcontext.TODO(),\n\t\t"!nkl290a:matrix.org",\n\t\tbeeperdesktopapi.MatrixRoomLeaveParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response)\n}\n',
      },
      cli: {
        method: 'rooms leave',
        example:
          "beeper-desktop-cli matrix:rooms leave \\\n  --access-token 'My Access Token' \\\n  --room-id '!nkl290a:matrix.org'",
      },
      php: {
        method: 'matrix->rooms->leave',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->matrix->rooms->leave(\n  '!nkl290a:matrix.org', reason: 'Saying farewell - thanks for the support!'\n);\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl http://localhost:23373/_matrix/client/v3/rooms/$ROOM_ID/leave \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN" \\\n    -d \'{\n          "reason": "Saying farewell - thanks for the support!"\n        }\'',
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/_matrix/client/v3/user/{userId}/rooms/{roomId}/account_data/{type}',
    httpMethod: 'get',
    summary: 'Get some account data for the user that is specific to a room.',
    description:
      'Get some account data for the client on a given room. This config is only\nvisible to the user that set the account data.',
    stainlessPath: '(resource) matrix.rooms.account_data > (method) retrieve',
    qualified: 'client.matrix.rooms.accountData.retrieve',
    params: ['userId: string;', 'roomId: string;', 'type: string;'],
    response: 'object',
    markdown:
      "## retrieve\n\n`client.matrix.rooms.accountData.retrieve(userId: string, roomId: string, type: string): object`\n\n**get** `/_matrix/client/v3/user/{userId}/rooms/{roomId}/account_data/{type}`\n\nGet some account data for the client on a given room. This config is only\nvisible to the user that set the account data.\n\n### Parameters\n\n- `userId: string`\n\n- `roomId: string`\n\n- `type: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst accountData = await client.matrix.rooms.accountData.retrieve('org.example.custom.room.config', { userId: '@alice:example.com', roomId: '!726s6s6q:example.com' });\n\nconsole.log(accountData);\n```",
    perLanguage: {
      typescript: {
        method: 'client.matrix.rooms.accountData.retrieve',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst accountData = await client.matrix.rooms.accountData.retrieve(\n  'org.example.custom.room.config',\n  { userId: '@alice:example.com', roomId: '!726s6s6q:example.com' },\n);\n\nconsole.log(accountData);",
      },
      python: {
        method: 'matrix.rooms.account_data.retrieve',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\naccount_data = client.matrix.rooms.account_data.retrieve(\n    type="org.example.custom.room.config",\n    user_id="@alice:example.com",\n    room_id="!726s6s6q:example.com",\n)\nprint(account_data)',
      },
      go: {
        method: 'client.Matrix.Rooms.AccountData.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\taccountData, err := client.Matrix.Rooms.AccountData.Get(\n\t\tcontext.TODO(),\n\t\t"org.example.custom.room.config",\n\t\tbeeperdesktopapi.MatrixRoomAccountDataGetParams{\n\t\t\tUserID: "@alice:example.com",\n\t\t\tRoomID: "!726s6s6q:example.com",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", accountData)\n}\n',
      },
      cli: {
        method: 'account_data retrieve',
        example:
          "beeper-desktop-cli matrix:rooms:account-data retrieve \\\n  --access-token 'My Access Token' \\\n  --user-id @alice:example.com \\\n  --room-id '!726s6s6q:example.com' \\\n  --type org.example.custom.room.config",
      },
      php: {
        method: 'matrix->rooms->accountData->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$accountData = $client->matrix->rooms->accountData->retrieve(\n  'org.example.custom.room.config',\n  userID: '@alice:example.com',\n  roomID: '!726s6s6q:example.com',\n);\n\nvar_dump($accountData);",
      },
      http: {
        example:
          'curl http://localhost:23373/_matrix/client/v3/user/$USER_ID/rooms/$ROOM_ID/account_data/$TYPE \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
    },
  },
  {
    name: 'update',
    endpoint: '/_matrix/client/v3/user/{userId}/rooms/{roomId}/account_data/{type}',
    httpMethod: 'put',
    summary: 'Set some account data for the user that is specific to a room.',
    description:
      'Set some account data for the client on a given room. This config is only\nvisible to the user that set the account data. The config will be delivered to\nclients in the per-room entries via [/sync](https://spec.matrix.org/v1.18/client-server-api/#get_matrixclientv3sync).',
    stainlessPath: '(resource) matrix.rooms.account_data > (method) update',
    qualified: 'client.matrix.rooms.accountData.update',
    params: ['userId: string;', 'roomId: string;', 'type: string;', 'body: object;'],
    response: 'object',
    markdown:
      "## update\n\n`client.matrix.rooms.accountData.update(userId: string, roomId: string, type: string, body: object): object`\n\n**put** `/_matrix/client/v3/user/{userId}/rooms/{roomId}/account_data/{type}`\n\nSet some account data for the client on a given room. This config is only\nvisible to the user that set the account data. The config will be delivered to\nclients in the per-room entries via [/sync](https://spec.matrix.org/v1.18/client-server-api/#get_matrixclientv3sync).\n\n### Parameters\n\n- `userId: string`\n\n- `roomId: string`\n\n- `type: string`\n\n- `body: object`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst accountData = await client.matrix.rooms.accountData.update('org.example.custom.room.config', {\n  userId: '@alice:example.com',\n  roomId: '!726s6s6q:example.com',\n  body: { custom_account_data_key: 'custom_account_data_value' },\n});\n\nconsole.log(accountData);\n```",
    perLanguage: {
      typescript: {
        method: 'client.matrix.rooms.accountData.update',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst accountData = await client.matrix.rooms.accountData.update('org.example.custom.room.config', {\n  userId: '@alice:example.com',\n  roomId: '!726s6s6q:example.com',\n  body: { custom_account_data_key: 'custom_account_data_value' },\n});\n\nconsole.log(accountData);",
      },
      python: {
        method: 'matrix.rooms.account_data.update',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\naccount_data = client.matrix.rooms.account_data.update(\n    type="org.example.custom.room.config",\n    user_id="@alice:example.com",\n    room_id="!726s6s6q:example.com",\n    body={\n        "custom_account_data_key": "custom_account_data_value"\n    },\n)\nprint(account_data)',
      },
      go: {
        method: 'client.Matrix.Rooms.AccountData.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\taccountData, err := client.Matrix.Rooms.AccountData.Update(\n\t\tcontext.TODO(),\n\t\t"org.example.custom.room.config",\n\t\tbeeperdesktopapi.MatrixRoomAccountDataUpdateParams{\n\t\t\tUserID: "@alice:example.com",\n\t\t\tRoomID: "!726s6s6q:example.com",\n\t\t\tBody: map[string]any{\n\t\t\t\t"custom_account_data_key": "custom_account_data_value",\n\t\t\t},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", accountData)\n}\n',
      },
      cli: {
        method: 'account_data update',
        example:
          "beeper-desktop-cli matrix:rooms:account-data update \\\n  --access-token 'My Access Token' \\\n  --user-id @alice:example.com \\\n  --room-id '!726s6s6q:example.com' \\\n  --type org.example.custom.room.config \\\n  --body '{custom_account_data_key: custom_account_data_value}'",
      },
      php: {
        method: 'matrix->rooms->accountData->update',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$accountData = $client->matrix->rooms->accountData->update(\n  'org.example.custom.room.config',\n  userID: '@alice:example.com',\n  roomID: '!726s6s6q:example.com',\n  body: ['custom_account_data_key' => 'custom_account_data_value'],\n);\n\nvar_dump($accountData);",
      },
      http: {
        example:
          'curl http://localhost:23373/_matrix/client/v3/user/$USER_ID/rooms/$ROOM_ID/account_data/$TYPE \\\n    -X PUT \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN" \\\n    -d \'{\n          "custom_account_data_key": "custom_account_data_value"\n        }\'',
      },
    },
  },
  {
    name: 'list',
    endpoint: '/_matrix/client/v3/rooms/{roomId}/state',
    httpMethod: 'get',
    summary: 'Get all state events in the current state of a room.',
    description: 'Get the state events for the current state of a room.',
    stainlessPath: '(resource) matrix.rooms.state > (method) list',
    qualified: 'client.matrix.rooms.state.list',
    params: ['roomId: string;'],
    response:
      '{ content: object; event_id: string; origin_server_ts: number; room_id: string; sender: string; type: string; state_key?: string; unsigned?: { age?: number; membership?: string; prev_content?: object; redacted_because?: object; transaction_id?: string; }; }[]',
    markdown:
      "## list\n\n`client.matrix.rooms.state.list(roomId: string): { content: object; event_id: string; origin_server_ts: number; room_id: string; sender: string; type: string; state_key?: string; unsigned?: object; }[]`\n\n**get** `/_matrix/client/v3/rooms/{roomId}/state`\n\nGet the state events for the current state of a room.\n\n### Parameters\n\n- `roomId: string`\n\n### Returns\n\n- `{ content: object; event_id: string; origin_server_ts: number; room_id: string; sender: string; type: string; state_key?: string; unsigned?: { age?: number; membership?: string; prev_content?: object; redacted_because?: object; transaction_id?: string; }; }[]`\n  If the user is a member of the room this will be the\ncurrent state of the room as a list of events. If the user\nhas left the room then this will be the state of the room\nwhen they left as a list of events.\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst states = await client.matrix.rooms.state.list('!636q39766251:example.com');\n\nconsole.log(states);\n```",
    perLanguage: {
      typescript: {
        method: 'client.matrix.rooms.state.list',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst states = await client.matrix.rooms.state.list('!636q39766251:example.com');\n\nconsole.log(states);",
      },
      python: {
        method: 'matrix.rooms.state.list',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nstates = client.matrix.rooms.state.list(\n    "!636q39766251:example.com",\n)\nprint(states)',
      },
      go: {
        method: 'client.Matrix.Rooms.State.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tstates, err := client.Matrix.Rooms.State.List(context.TODO(), "!636q39766251:example.com")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", states)\n}\n',
      },
      cli: {
        method: 'state list',
        example:
          "beeper-desktop-cli matrix:rooms:state list \\\n  --access-token 'My Access Token' \\\n  --room-id '!636q39766251:example.com'",
      },
      php: {
        method: 'matrix->rooms->state->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$states = $client->matrix->rooms->state->list('!636q39766251:example.com');\n\nvar_dump($states);",
      },
      http: {
        example:
          'curl http://localhost:23373/_matrix/client/v3/rooms/$ROOM_ID/state \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/_matrix/client/v3/rooms/{roomId}/state/{eventType}/{stateKey}',
    httpMethod: 'get',
    summary: 'Get the state identified by the type and key.',
    description:
      'Looks up the contents of a state event in a room. If the user is\njoined to the room then the state is taken from the current\nstate of the room. If the user has left the room then the state is\ntaken from the state of the room when they left.',
    stainlessPath: '(resource) matrix.rooms.state > (method) retrieve',
    qualified: 'client.matrix.rooms.state.retrieve',
    params: ['roomId: string;', 'eventType: string;', 'stateKey: string;', "format?: 'content' | 'event';"],
    response: 'object',
    markdown:
      "## retrieve\n\n`client.matrix.rooms.state.retrieve(roomId: string, eventType: string, stateKey: string, format?: 'content' | 'event'): object`\n\n**get** `/_matrix/client/v3/rooms/{roomId}/state/{eventType}/{stateKey}`\n\nLooks up the contents of a state event in a room. If the user is\njoined to the room then the state is taken from the current\nstate of the room. If the user has left the room then the state is\ntaken from the state of the room when they left.\n\n### Parameters\n\n- `roomId: string`\n\n- `eventType: string`\n\n- `stateKey: string`\n\n- `format?: 'content' | 'event'`\n  The format to use for the returned data. `content` (the default) will\nreturn only the content of the state event. `event` will return the entire\nevent in the usual format suitable for clients, including fields like event\nID, sender and timestamp.\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst state = await client.matrix.rooms.state.retrieve('state_key', { roomId: '!636q39766251:example.com', eventType: 'm.room.name' });\n\nconsole.log(state);\n```",
    perLanguage: {
      typescript: {
        method: 'client.matrix.rooms.state.retrieve',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst state = await client.matrix.rooms.state.retrieve('state_key', {\n  roomId: '!636q39766251:example.com',\n  eventType: 'm.room.name',\n});\n\nconsole.log(state);",
      },
      python: {
        method: 'matrix.rooms.state.retrieve',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nstate = client.matrix.rooms.state.retrieve(\n    state_key="state_key",\n    room_id="!636q39766251:example.com",\n    event_type="m.room.name",\n)\nprint(state)',
      },
      go: {
        method: 'client.Matrix.Rooms.State.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tstate, err := client.Matrix.Rooms.State.Get(\n\t\tcontext.TODO(),\n\t\t"state_key",\n\t\tbeeperdesktopapi.MatrixRoomStateGetParams{\n\t\t\tRoomID:    "!636q39766251:example.com",\n\t\t\tEventType: "m.room.name",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", state)\n}\n',
      },
      cli: {
        method: 'state retrieve',
        example:
          "beeper-desktop-cli matrix:rooms:state retrieve \\\n  --access-token 'My Access Token' \\\n  --room-id '!636q39766251:example.com' \\\n  --event-type m.room.name \\\n  --state-key state_key",
      },
      php: {
        method: 'matrix->rooms->state->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$state = $client->matrix->rooms->state->retrieve(\n  'state_key',\n  roomID: '!636q39766251:example.com',\n  eventType: 'm.room.name',\n  format: 'content',\n);\n\nvar_dump($state);",
      },
      http: {
        example:
          'curl http://localhost:23373/_matrix/client/v3/rooms/$ROOM_ID/state/$EVENT_TYPE/$STATE_KEY \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/_matrix/client/v3/rooms/{roomId}/event/{eventId}',
    httpMethod: 'get',
    summary: 'Get a single event by event ID.',
    description:
      'Get a single event based on `roomId/eventId`. You must have permission to\nretrieve this event e.g. by being a member in the room for this event.',
    stainlessPath: '(resource) matrix.rooms.events > (method) retrieve',
    qualified: 'client.matrix.rooms.events.retrieve',
    params: ['roomId: string;', 'eventId: string;'],
    response:
      '{ content: object; event_id: string; origin_server_ts: number; room_id: string; sender: string; type: string; state_key?: string; unsigned?: { age?: number; membership?: string; prev_content?: object; redacted_because?: object; transaction_id?: string; }; }',
    markdown:
      "## retrieve\n\n`client.matrix.rooms.events.retrieve(roomId: string, eventId: string): { content: object; event_id: string; origin_server_ts: number; room_id: string; sender: string; type: string; state_key?: string; unsigned?: object; }`\n\n**get** `/_matrix/client/v3/rooms/{roomId}/event/{eventId}`\n\nGet a single event based on `roomId/eventId`. You must have permission to\nretrieve this event e.g. by being a member in the room for this event.\n\n### Parameters\n\n- `roomId: string`\n\n- `eventId: string`\n\n### Returns\n\n- `{ content: object; event_id: string; origin_server_ts: number; room_id: string; sender: string; type: string; state_key?: string; unsigned?: { age?: number; membership?: string; prev_content?: object; redacted_because?: object; transaction_id?: string; }; }`\n  The format used for events when they are returned from a homeserver to a client\nvia the Client-Server API, or sent to an Application Service via the Application Services API.\n\n  - `content: object`\n  - `event_id: string`\n  - `origin_server_ts: number`\n  - `room_id: string`\n  - `sender: string`\n  - `type: string`\n  - `state_key?: string`\n  - `unsigned?: { age?: number; membership?: string; prev_content?: object; redacted_because?: object; transaction_id?: string; }`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst event = await client.matrix.rooms.events.retrieve('$asfDuShaf7Gafaw:matrix.org', { roomId: '!636q39766251:matrix.org' });\n\nconsole.log(event);\n```",
    perLanguage: {
      typescript: {
        method: 'client.matrix.rooms.events.retrieve',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst event = await client.matrix.rooms.events.retrieve('$asfDuShaf7Gafaw:matrix.org', {\n  roomId: '!636q39766251:matrix.org',\n});\n\nconsole.log(event.event_id);",
      },
      python: {
        method: 'matrix.rooms.events.retrieve',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nevent = client.matrix.rooms.events.retrieve(\n    event_id="$asfDuShaf7Gafaw:matrix.org",\n    room_id="!636q39766251:matrix.org",\n)\nprint(event.event_id)',
      },
      go: {
        method: 'client.Matrix.Rooms.Events.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tevent, err := client.Matrix.Rooms.Events.Get(\n\t\tcontext.TODO(),\n\t\t"$asfDuShaf7Gafaw:matrix.org",\n\t\tbeeperdesktopapi.MatrixRoomEventGetParams{\n\t\t\tRoomID: "!636q39766251:matrix.org",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", event.EventID)\n}\n',
      },
      cli: {
        method: 'events retrieve',
        example:
          "beeper-desktop-cli matrix:rooms:events retrieve \\\n  --access-token 'My Access Token' \\\n  --room-id '!636q39766251:matrix.org' \\\n  --event-id '$asfDuShaf7Gafaw:matrix.org'",
      },
      php: {
        method: 'matrix->rooms->events->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$event = $client->matrix->rooms->events->retrieve(\n  '$asfDuShaf7Gafaw:matrix.org', roomID: '!636q39766251:matrix.org'\n);\n\nvar_dump($event);",
      },
      http: {
        example:
          'curl http://localhost:23373/_matrix/client/v3/rooms/$ROOM_ID/event/$EVENT_ID \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
    },
  },
  {
    name: 'whoami',
    endpoint: '/_matrix/client/unstable/com.beeper.bridge/{bridgeID}/_matrix/provision/v3/whoami',
    httpMethod: 'get',
    summary: 'Get info about the bridge and your logins.',
    description:
      'Get all info that is useful for presenting this bridge in a manager interface.\n* Server details: remote network details, available login flows, homeserver name, bridge bot user ID, command prefix\n* User details: management room ID, list of logins with current state and info\n',
    stainlessPath: '(resource) matrix.bridges.auth > (method) whoami',
    qualified: 'client.matrix.bridges.auth.whoami',
    params: ['bridgeID: string;'],
    response:
      "{ bridge_bot: string; command_prefix: string; homeserver: string; login_flows: { id: string; description: string; name: string; }[]; logins: { id: string; name: string; profile: { avatar?: string; email?: string; name?: string; phone?: string; username?: string; }; state: { state_event: 'CONNECTING' | 'CONNECTED' | 'TRANSIENT_DISCONNECT' | 'BAD_CREDENTIALS' | 'UNKNOWN_ERROR'; timestamp: number; error?: string; info?: object; message?: string; reason?: string; }; space_room?: string; }[]; network: { beeper_bridge_type: string; displayname: string; network_icon: string; network_id: string; network_url: string; }; management_room?: string; }",
    markdown:
      "## whoami\n\n`client.matrix.bridges.auth.whoami(bridgeID: string): { bridge_bot: string; command_prefix: string; homeserver: string; login_flows: object[]; logins: object[]; network: object; management_room?: string; }`\n\n**get** `/_matrix/client/unstable/com.beeper.bridge/{bridgeID}/_matrix/provision/v3/whoami`\n\nGet all info that is useful for presenting this bridge in a manager interface.\n* Server details: remote network details, available login flows, homeserver name, bridge bot user ID, command prefix\n* User details: management room ID, list of logins with current state and info\n\n\n### Parameters\n\n- `bridgeID: string`\n\n### Returns\n\n- `{ bridge_bot: string; command_prefix: string; homeserver: string; login_flows: { id: string; description: string; name: string; }[]; logins: { id: string; name: string; profile: { avatar?: string; email?: string; name?: string; phone?: string; username?: string; }; state: { state_event: 'CONNECTING' | 'CONNECTED' | 'TRANSIENT_DISCONNECT' | 'BAD_CREDENTIALS' | 'UNKNOWN_ERROR'; timestamp: number; error?: string; info?: object; message?: string; reason?: string; }; space_room?: string; }[]; network: { beeper_bridge_type: string; displayname: string; network_icon: string; network_id: string; network_url: string; }; management_room?: string; }`\n  Info about the bridge and user\n\n  - `bridge_bot: string`\n  - `command_prefix: string`\n  - `homeserver: string`\n  - `login_flows: { id: string; description: string; name: string; }[]`\n  - `logins: { id: string; name: string; profile: { avatar?: string; email?: string; name?: string; phone?: string; username?: string; }; state: { state_event: 'CONNECTING' | 'CONNECTED' | 'TRANSIENT_DISCONNECT' | 'BAD_CREDENTIALS' | 'UNKNOWN_ERROR'; timestamp: number; error?: string; info?: object; message?: string; reason?: string; }; space_room?: string; }[]`\n  - `network: { beeper_bridge_type: string; displayname: string; network_icon: string; network_id: string; network_url: string; }`\n  - `management_room?: string`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst response = await client.matrix.bridges.auth.whoami('bridgeID');\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.matrix.bridges.auth.whoami',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.matrix.bridges.auth.whoami('bridgeID');\n\nconsole.log(response.bridge_bot);",
      },
      python: {
        method: 'matrix.bridges.auth.whoami',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.matrix.bridges.auth.whoami(\n    "bridgeID",\n)\nprint(response.bridge_bot)',
      },
      go: {
        method: 'client.Matrix.Bridges.Auth.Whoami',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.Matrix.Bridges.Auth.Whoami(context.TODO(), "bridgeID")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.BridgeBot)\n}\n',
      },
      cli: {
        method: 'auth whoami',
        example:
          "beeper-desktop-cli matrix:bridges:auth whoami \\\n  --access-token 'My Access Token' \\\n  --bridge-id bridgeID",
      },
      php: {
        method: 'matrix->bridges->auth->whoami',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->matrix->bridges->auth->whoami('bridgeID');\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl http://localhost:23373/_matrix/client/unstable/com.beeper.bridge/$BRIDGE_ID/_matrix/provision/v3/whoami \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
    },
  },
  {
    name: 'list_flows',
    endpoint: '/_matrix/client/unstable/com.beeper.bridge/{bridgeID}/_matrix/provision/v3/login/flows',
    httpMethod: 'get',
    summary: 'Get the available login flows.',
    description: 'Get the available login flows.',
    stainlessPath: '(resource) matrix.bridges.auth > (method) list_flows',
    qualified: 'client.matrix.bridges.auth.listFlows',
    params: ['bridgeID: string;'],
    response: '{ flows?: { id: string; description: string; name: string; }[]; }',
    markdown:
      "## list_flows\n\n`client.matrix.bridges.auth.listFlows(bridgeID: string): { flows?: object[]; }`\n\n**get** `/_matrix/client/unstable/com.beeper.bridge/{bridgeID}/_matrix/provision/v3/login/flows`\n\nGet the available login flows.\n\n### Parameters\n\n- `bridgeID: string`\n\n### Returns\n\n- `{ flows?: { id: string; description: string; name: string; }[]; }`\n\n  - `flows?: { id: string; description: string; name: string; }[]`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst response = await client.matrix.bridges.auth.listFlows('bridgeID');\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.matrix.bridges.auth.listFlows',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.matrix.bridges.auth.listFlows('bridgeID');\n\nconsole.log(response.flows);",
      },
      python: {
        method: 'matrix.bridges.auth.list_flows',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.matrix.bridges.auth.list_flows(\n    "bridgeID",\n)\nprint(response.flows)',
      },
      go: {
        method: 'client.Matrix.Bridges.Auth.ListFlows',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.Matrix.Bridges.Auth.ListFlows(context.TODO(), "bridgeID")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Flows)\n}\n',
      },
      cli: {
        method: 'auth list_flows',
        example:
          "beeper-desktop-cli matrix:bridges:auth list-flows \\\n  --access-token 'My Access Token' \\\n  --bridge-id bridgeID",
      },
      php: {
        method: 'matrix->bridges->auth->listFlows',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->matrix->bridges->auth->listFlows('bridgeID');\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl http://localhost:23373/_matrix/client/unstable/com.beeper.bridge/$BRIDGE_ID/_matrix/provision/v3/login/flows \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
    },
  },
  {
    name: 'list_logins',
    endpoint: '/_matrix/client/unstable/com.beeper.bridge/{bridgeID}/_matrix/provision/v3/logins',
    httpMethod: 'get',
    summary: 'Get the login IDs of the current user.',
    description: 'Get the login IDs of the current user.',
    stainlessPath: '(resource) matrix.bridges.auth > (method) list_logins',
    qualified: 'client.matrix.bridges.auth.listLogins',
    params: ['bridgeID: string;'],
    response: '{ login_ids?: string[]; }',
    markdown:
      "## list_logins\n\n`client.matrix.bridges.auth.listLogins(bridgeID: string): { login_ids?: string[]; }`\n\n**get** `/_matrix/client/unstable/com.beeper.bridge/{bridgeID}/_matrix/provision/v3/logins`\n\nGet the login IDs of the current user.\n\n### Parameters\n\n- `bridgeID: string`\n\n### Returns\n\n- `{ login_ids?: string[]; }`\n\n  - `login_ids?: string[]`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst response = await client.matrix.bridges.auth.listLogins('bridgeID');\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.matrix.bridges.auth.listLogins',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.matrix.bridges.auth.listLogins('bridgeID');\n\nconsole.log(response.login_ids);",
      },
      python: {
        method: 'matrix.bridges.auth.list_logins',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.matrix.bridges.auth.list_logins(\n    "bridgeID",\n)\nprint(response.login_ids)',
      },
      go: {
        method: 'client.Matrix.Bridges.Auth.ListLogins',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.Matrix.Bridges.Auth.ListLogins(context.TODO(), "bridgeID")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.LoginIDs)\n}\n',
      },
      cli: {
        method: 'auth list_logins',
        example:
          "beeper-desktop-cli matrix:bridges:auth list-logins \\\n  --access-token 'My Access Token' \\\n  --bridge-id bridgeID",
      },
      php: {
        method: 'matrix->bridges->auth->listLogins',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->matrix->bridges->auth->listLogins('bridgeID');\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl http://localhost:23373/_matrix/client/unstable/com.beeper.bridge/$BRIDGE_ID/_matrix/provision/v3/logins \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
    },
  },
  {
    name: 'start_login',
    endpoint:
      '/_matrix/client/unstable/com.beeper.bridge/{bridgeID}/_matrix/provision/v3/login/start/{flowID}',
    httpMethod: 'post',
    summary: 'Start a new login process.',
    description:
      "This endpoint starts a new login process, which is used to log into the bridge.\n\nThe basic flow of the entire login, including calling this endpoint, is:\n1. Call `GET /v3/login/flows` to get the list of available flows.\n   If there's more than one flow, ask the user to pick which one they want to use.\n2. Call this endpoint with the chosen flow ID to start the login.\n   The first login step will be returned.\n3. Render the information provided in the step.\n4. Call the `/login/step/...` endpoint corresponding to the step type:\n   * For `user_input` and `cookies`, acquire the requested fields before calling the endpoint.\n   * For `display_and_wait`, call the endpoint immediately\n     (as there's nothing to acquire on the client side).\n5. Handle the data returned by the login step endpoint:\n   * If an error is returned, the login has failed and must be restarted\n     (from either step 1 or step 2) if the user wants to try again.\n   * If step type `complete` is returned, the login finished successfully.\n   * Otherwise, go to step 3 with the new data.\n",
    stainlessPath: '(resource) matrix.bridges.auth > (method) start_login',
    qualified: 'client.matrix.bridges.auth.startLogin',
    params: ['bridgeID: string;', 'flowID: string;', 'login_id?: string;'],
    response:
      "{ display_and_wait: { type: 'qr' | 'emoji' | 'code' | 'nothing'; data?: string; image_url?: string; }; type: 'display_and_wait'; instructions?: string; login_id?: string; step_id?: string; } | { type: 'user_input'; user_input: { fields: { id: string; name: string; type: string; default_value?: string; description?: string; options?: string[]; pattern?: string; }[]; attachments?: { content: string; filename: string; type: 'm.image' | 'm.audio'; info?: object; }[]; }; instructions?: string; login_id?: string; step_id?: string; } | { cookies: { fields: { name: string; type: 'cookie' | 'local_storage' | 'request_header' | 'request_body' | 'special'; cookie_domain?: string; request_url_regex?: string; }[]; url: string; extract_js?: string; user_agent?: string; wait_for_url_pattern?: string; }; type: 'cookies'; instructions?: string; login_id?: string; step_id?: string; } | { complete: { user_login_id?: string; }; type: 'complete'; instructions?: string; login_id?: string; step_id?: string; }",
    markdown:
      "## start_login\n\n`client.matrix.bridges.auth.startLogin(bridgeID: string, flowID: string, login_id?: string): { display_and_wait: object; type: 'display_and_wait'; instructions?: string; login_id?: string; step_id?: string; } | { type: 'user_input'; user_input: object; instructions?: string; login_id?: string; step_id?: string; } | { cookies: object; type: 'cookies'; instructions?: string; login_id?: string; step_id?: string; } | { complete: object; type: 'complete'; instructions?: string; login_id?: string; step_id?: string; }`\n\n**post** `/_matrix/client/unstable/com.beeper.bridge/{bridgeID}/_matrix/provision/v3/login/start/{flowID}`\n\nThis endpoint starts a new login process, which is used to log into the bridge.\n\nThe basic flow of the entire login, including calling this endpoint, is:\n1. Call `GET /v3/login/flows` to get the list of available flows.\n   If there's more than one flow, ask the user to pick which one they want to use.\n2. Call this endpoint with the chosen flow ID to start the login.\n   The first login step will be returned.\n3. Render the information provided in the step.\n4. Call the `/login/step/...` endpoint corresponding to the step type:\n   * For `user_input` and `cookies`, acquire the requested fields before calling the endpoint.\n   * For `display_and_wait`, call the endpoint immediately\n     (as there's nothing to acquire on the client side).\n5. Handle the data returned by the login step endpoint:\n   * If an error is returned, the login has failed and must be restarted\n     (from either step 1 or step 2) if the user wants to try again.\n   * If step type `complete` is returned, the login finished successfully.\n   * Otherwise, go to step 3 with the new data.\n\n\n### Parameters\n\n- `bridgeID: string`\n\n- `flowID: string`\n\n- `login_id?: string`\n  An existing login ID to re-login as. If this is specified and the user logs into a different account, the provided ID will be logged out.\n\n### Returns\n\n- `{ display_and_wait: { type: 'qr' | 'emoji' | 'code' | 'nothing'; data?: string; image_url?: string; }; type: 'display_and_wait'; instructions?: string; login_id?: string; step_id?: string; } | { type: 'user_input'; user_input: { fields: { id: string; name: string; type: string; default_value?: string; description?: string; options?: string[]; pattern?: string; }[]; attachments?: { content: string; filename: string; type: 'm.image' | 'm.audio'; info?: object; }[]; }; instructions?: string; login_id?: string; step_id?: string; } | { cookies: { fields: { name: string; type: 'cookie' | 'local_storage' | 'request_header' | 'request_body' | 'special'; cookie_domain?: string; request_url_regex?: string; }[]; url: string; extract_js?: string; user_agent?: string; wait_for_url_pattern?: string; }; type: 'cookies'; instructions?: string; login_id?: string; step_id?: string; } | { complete: { user_login_id?: string; }; type: 'complete'; instructions?: string; login_id?: string; step_id?: string; }`\n  A step in a login process.\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst response = await client.matrix.bridges.auth.startLogin('qr', { bridgeID: 'bridgeID' });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.matrix.bridges.auth.startLogin',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.matrix.bridges.auth.startLogin('qr', { bridgeID: 'bridgeID' });\n\nconsole.log(response);",
      },
      python: {
        method: 'matrix.bridges.auth.start_login',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.matrix.bridges.auth.start_login(\n    flow_id="qr",\n    bridge_id="bridgeID",\n)\nprint(response)',
      },
      go: {
        method: 'client.Matrix.Bridges.Auth.StartLogin',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.Matrix.Bridges.Auth.StartLogin(\n\t\tcontext.TODO(),\n\t\t"qr",\n\t\tbeeperdesktopapi.MatrixBridgeAuthStartLoginParams{\n\t\t\tBridgeID: "bridgeID",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response)\n}\n',
      },
      cli: {
        method: 'auth start_login',
        example:
          "beeper-desktop-cli matrix:bridges:auth start-login \\\n  --access-token 'My Access Token' \\\n  --bridge-id bridgeID \\\n  --flow-id qr",
      },
      php: {
        method: 'matrix->bridges->auth->startLogin',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->matrix->bridges->auth->startLogin(\n  'qr', bridgeID: 'bridgeID', loginID: 'bcc68892-b180-414f-9516-b4aadf7d0496'\n);\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl http://localhost:23373/_matrix/client/unstable/com.beeper.bridge/$BRIDGE_ID/_matrix/provision/v3/login/start/$FLOW_ID \\\n    -X POST \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
    },
  },
  {
    name: 'submit_user_input',
    endpoint:
      '/_matrix/client/unstable/com.beeper.bridge/{bridgeID}/_matrix/provision/v3/login/step/{loginProcessID}/{stepID}/user_input',
    httpMethod: 'post',
    summary: 'Submit user input in a login process.',
    description: 'Submit user input in a login process.',
    stainlessPath: '(resource) matrix.bridges.auth > (method) submit_user_input',
    qualified: 'client.matrix.bridges.auth.submitUserInput',
    params: ['bridgeID: string;', 'loginProcessID: string;', 'stepID: string;', 'body: object;'],
    response:
      "{ display_and_wait: { type: 'qr' | 'emoji' | 'code' | 'nothing'; data?: string; image_url?: string; }; type: 'display_and_wait'; instructions?: string; login_id?: string; step_id?: string; } | { type: 'user_input'; user_input: { fields: { id: string; name: string; type: string; default_value?: string; description?: string; options?: string[]; pattern?: string; }[]; attachments?: { content: string; filename: string; type: 'm.image' | 'm.audio'; info?: object; }[]; }; instructions?: string; login_id?: string; step_id?: string; } | { cookies: { fields: { name: string; type: 'cookie' | 'local_storage' | 'request_header' | 'request_body' | 'special'; cookie_domain?: string; request_url_regex?: string; }[]; url: string; extract_js?: string; user_agent?: string; wait_for_url_pattern?: string; }; type: 'cookies'; instructions?: string; login_id?: string; step_id?: string; } | { complete: { user_login_id?: string; }; type: 'complete'; instructions?: string; login_id?: string; step_id?: string; }",
    markdown:
      "## submit_user_input\n\n`client.matrix.bridges.auth.submitUserInput(bridgeID: string, loginProcessID: string, stepID: string, body: object): { display_and_wait: object; type: 'display_and_wait'; instructions?: string; login_id?: string; step_id?: string; } | { type: 'user_input'; user_input: object; instructions?: string; login_id?: string; step_id?: string; } | { cookies: object; type: 'cookies'; instructions?: string; login_id?: string; step_id?: string; } | { complete: object; type: 'complete'; instructions?: string; login_id?: string; step_id?: string; }`\n\n**post** `/_matrix/client/unstable/com.beeper.bridge/{bridgeID}/_matrix/provision/v3/login/step/{loginProcessID}/{stepID}/user_input`\n\nSubmit user input in a login process.\n\n### Parameters\n\n- `bridgeID: string`\n\n- `loginProcessID: string`\n\n- `stepID: string`\n\n- `body: object`\n\n### Returns\n\n- `{ display_and_wait: { type: 'qr' | 'emoji' | 'code' | 'nothing'; data?: string; image_url?: string; }; type: 'display_and_wait'; instructions?: string; login_id?: string; step_id?: string; } | { type: 'user_input'; user_input: { fields: { id: string; name: string; type: string; default_value?: string; description?: string; options?: string[]; pattern?: string; }[]; attachments?: { content: string; filename: string; type: 'm.image' | 'm.audio'; info?: object; }[]; }; instructions?: string; login_id?: string; step_id?: string; } | { cookies: { fields: { name: string; type: 'cookie' | 'local_storage' | 'request_header' | 'request_body' | 'special'; cookie_domain?: string; request_url_regex?: string; }[]; url: string; extract_js?: string; user_agent?: string; wait_for_url_pattern?: string; }; type: 'cookies'; instructions?: string; login_id?: string; step_id?: string; } | { complete: { user_login_id?: string; }; type: 'complete'; instructions?: string; login_id?: string; step_id?: string; }`\n  A step in a login process.\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst response = await client.matrix.bridges.auth.submitUserInput('stepID', {\n  bridgeID: 'bridgeID',\n  loginProcessID: 'loginProcessID',\n  body: { foo: 'string' },\n});\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.matrix.bridges.auth.submitUserInput',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.matrix.bridges.auth.submitUserInput('stepID', {\n  bridgeID: 'bridgeID',\n  loginProcessID: 'loginProcessID',\n  body: { foo: 'string' },\n});\n\nconsole.log(response);",
      },
      python: {
        method: 'matrix.bridges.auth.submit_user_input',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.matrix.bridges.auth.submit_user_input(\n    step_id="stepID",\n    bridge_id="bridgeID",\n    login_process_id="loginProcessID",\n    body={\n        "foo": "string"\n    },\n)\nprint(response)',
      },
      go: {
        method: 'client.Matrix.Bridges.Auth.SubmitUserInput',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.Matrix.Bridges.Auth.SubmitUserInput(\n\t\tcontext.TODO(),\n\t\t"stepID",\n\t\tbeeperdesktopapi.MatrixBridgeAuthSubmitUserInputParams{\n\t\t\tBridgeID:       "bridgeID",\n\t\t\tLoginProcessID: "loginProcessID",\n\t\t\tBody: map[string]string{\n\t\t\t\t"foo": "string",\n\t\t\t},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response)\n}\n',
      },
      cli: {
        method: 'auth submit_user_input',
        example:
          "beeper-desktop-cli matrix:bridges:auth submit-user-input \\\n  --access-token 'My Access Token' \\\n  --bridge-id bridgeID \\\n  --login-process-id loginProcessID \\\n  --step-id stepID \\\n  --body '{foo: string}'",
      },
      php: {
        method: 'matrix->bridges->auth->submitUserInput',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->matrix->bridges->auth->submitUserInput(\n  'stepID',\n  bridgeID: 'bridgeID',\n  loginProcessID: 'loginProcessID',\n  body: ['foo' => 'string'],\n);\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl http://localhost:23373/_matrix/client/unstable/com.beeper.bridge/$BRIDGE_ID/_matrix/provision/v3/login/step/$LOGIN_PROCESS_ID/$STEP_ID/user_input \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN" \\\n    -d \'{\n          "foo": "string"\n        }\'',
      },
    },
  },
  {
    name: 'submit_cookies',
    endpoint:
      '/_matrix/client/unstable/com.beeper.bridge/{bridgeID}/_matrix/provision/v3/login/step/{loginProcessID}/{stepID}/cookies',
    httpMethod: 'post',
    summary: 'Submit extracted cookies in a login process.',
    description: 'Submit extracted cookies in a login process.',
    stainlessPath: '(resource) matrix.bridges.auth > (method) submit_cookies',
    qualified: 'client.matrix.bridges.auth.submitCookies',
    params: ['bridgeID: string;', 'loginProcessID: string;', 'stepID: string;', 'body: object;'],
    response:
      "{ display_and_wait: { type: 'qr' | 'emoji' | 'code' | 'nothing'; data?: string; image_url?: string; }; type: 'display_and_wait'; instructions?: string; login_id?: string; step_id?: string; } | { type: 'user_input'; user_input: { fields: { id: string; name: string; type: string; default_value?: string; description?: string; options?: string[]; pattern?: string; }[]; attachments?: { content: string; filename: string; type: 'm.image' | 'm.audio'; info?: object; }[]; }; instructions?: string; login_id?: string; step_id?: string; } | { cookies: { fields: { name: string; type: 'cookie' | 'local_storage' | 'request_header' | 'request_body' | 'special'; cookie_domain?: string; request_url_regex?: string; }[]; url: string; extract_js?: string; user_agent?: string; wait_for_url_pattern?: string; }; type: 'cookies'; instructions?: string; login_id?: string; step_id?: string; } | { complete: { user_login_id?: string; }; type: 'complete'; instructions?: string; login_id?: string; step_id?: string; }",
    markdown:
      "## submit_cookies\n\n`client.matrix.bridges.auth.submitCookies(bridgeID: string, loginProcessID: string, stepID: string, body: object): { display_and_wait: object; type: 'display_and_wait'; instructions?: string; login_id?: string; step_id?: string; } | { type: 'user_input'; user_input: object; instructions?: string; login_id?: string; step_id?: string; } | { cookies: object; type: 'cookies'; instructions?: string; login_id?: string; step_id?: string; } | { complete: object; type: 'complete'; instructions?: string; login_id?: string; step_id?: string; }`\n\n**post** `/_matrix/client/unstable/com.beeper.bridge/{bridgeID}/_matrix/provision/v3/login/step/{loginProcessID}/{stepID}/cookies`\n\nSubmit extracted cookies in a login process.\n\n### Parameters\n\n- `bridgeID: string`\n\n- `loginProcessID: string`\n\n- `stepID: string`\n\n- `body: object`\n\n### Returns\n\n- `{ display_and_wait: { type: 'qr' | 'emoji' | 'code' | 'nothing'; data?: string; image_url?: string; }; type: 'display_and_wait'; instructions?: string; login_id?: string; step_id?: string; } | { type: 'user_input'; user_input: { fields: { id: string; name: string; type: string; default_value?: string; description?: string; options?: string[]; pattern?: string; }[]; attachments?: { content: string; filename: string; type: 'm.image' | 'm.audio'; info?: object; }[]; }; instructions?: string; login_id?: string; step_id?: string; } | { cookies: { fields: { name: string; type: 'cookie' | 'local_storage' | 'request_header' | 'request_body' | 'special'; cookie_domain?: string; request_url_regex?: string; }[]; url: string; extract_js?: string; user_agent?: string; wait_for_url_pattern?: string; }; type: 'cookies'; instructions?: string; login_id?: string; step_id?: string; } | { complete: { user_login_id?: string; }; type: 'complete'; instructions?: string; login_id?: string; step_id?: string; }`\n  A step in a login process.\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst response = await client.matrix.bridges.auth.submitCookies('stepID', {\n  bridgeID: 'bridgeID',\n  loginProcessID: 'loginProcessID',\n  body: { foo: 'string' },\n});\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.matrix.bridges.auth.submitCookies',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.matrix.bridges.auth.submitCookies('stepID', {\n  bridgeID: 'bridgeID',\n  loginProcessID: 'loginProcessID',\n  body: { foo: 'string' },\n});\n\nconsole.log(response);",
      },
      python: {
        method: 'matrix.bridges.auth.submit_cookies',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.matrix.bridges.auth.submit_cookies(\n    step_id="stepID",\n    bridge_id="bridgeID",\n    login_process_id="loginProcessID",\n    body={\n        "foo": "string"\n    },\n)\nprint(response)',
      },
      go: {
        method: 'client.Matrix.Bridges.Auth.SubmitCookies',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.Matrix.Bridges.Auth.SubmitCookies(\n\t\tcontext.TODO(),\n\t\t"stepID",\n\t\tbeeperdesktopapi.MatrixBridgeAuthSubmitCookiesParams{\n\t\t\tBridgeID:       "bridgeID",\n\t\t\tLoginProcessID: "loginProcessID",\n\t\t\tBody: map[string]string{\n\t\t\t\t"foo": "string",\n\t\t\t},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response)\n}\n',
      },
      cli: {
        method: 'auth submit_cookies',
        example:
          "beeper-desktop-cli matrix:bridges:auth submit-cookies \\\n  --access-token 'My Access Token' \\\n  --bridge-id bridgeID \\\n  --login-process-id loginProcessID \\\n  --step-id stepID \\\n  --body '{foo: string}'",
      },
      php: {
        method: 'matrix->bridges->auth->submitCookies',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->matrix->bridges->auth->submitCookies(\n  'stepID',\n  bridgeID: 'bridgeID',\n  loginProcessID: 'loginProcessID',\n  body: ['foo' => 'string'],\n);\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl http://localhost:23373/_matrix/client/unstable/com.beeper.bridge/$BRIDGE_ID/_matrix/provision/v3/login/step/$LOGIN_PROCESS_ID/$STEP_ID/cookies \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN" \\\n    -d \'{\n          "foo": "string"\n        }\'',
      },
    },
  },
  {
    name: 'wait_for_step',
    endpoint:
      '/_matrix/client/unstable/com.beeper.bridge/{bridgeID}/_matrix/provision/v3/login/step/{loginProcessID}/{stepID}/display_and_wait',
    httpMethod: 'post',
    summary: 'Wait for the next step after displaying data to the user.',
    description: 'Wait for the next step after displaying data to the user.',
    stainlessPath: '(resource) matrix.bridges.auth > (method) wait_for_step',
    qualified: 'client.matrix.bridges.auth.waitForStep',
    params: ['bridgeID: string;', 'loginProcessID: string;', 'stepID: string;'],
    response:
      "{ display_and_wait: { type: 'qr' | 'emoji' | 'code' | 'nothing'; data?: string; image_url?: string; }; type: 'display_and_wait'; instructions?: string; login_id?: string; step_id?: string; } | { type: 'user_input'; user_input: { fields: { id: string; name: string; type: string; default_value?: string; description?: string; options?: string[]; pattern?: string; }[]; attachments?: { content: string; filename: string; type: 'm.image' | 'm.audio'; info?: object; }[]; }; instructions?: string; login_id?: string; step_id?: string; } | { cookies: { fields: { name: string; type: 'cookie' | 'local_storage' | 'request_header' | 'request_body' | 'special'; cookie_domain?: string; request_url_regex?: string; }[]; url: string; extract_js?: string; user_agent?: string; wait_for_url_pattern?: string; }; type: 'cookies'; instructions?: string; login_id?: string; step_id?: string; } | { complete: { user_login_id?: string; }; type: 'complete'; instructions?: string; login_id?: string; step_id?: string; }",
    markdown:
      "## wait_for_step\n\n`client.matrix.bridges.auth.waitForStep(bridgeID: string, loginProcessID: string, stepID: string): { display_and_wait: object; type: 'display_and_wait'; instructions?: string; login_id?: string; step_id?: string; } | { type: 'user_input'; user_input: object; instructions?: string; login_id?: string; step_id?: string; } | { cookies: object; type: 'cookies'; instructions?: string; login_id?: string; step_id?: string; } | { complete: object; type: 'complete'; instructions?: string; login_id?: string; step_id?: string; }`\n\n**post** `/_matrix/client/unstable/com.beeper.bridge/{bridgeID}/_matrix/provision/v3/login/step/{loginProcessID}/{stepID}/display_and_wait`\n\nWait for the next step after displaying data to the user.\n\n### Parameters\n\n- `bridgeID: string`\n\n- `loginProcessID: string`\n\n- `stepID: string`\n\n### Returns\n\n- `{ display_and_wait: { type: 'qr' | 'emoji' | 'code' | 'nothing'; data?: string; image_url?: string; }; type: 'display_and_wait'; instructions?: string; login_id?: string; step_id?: string; } | { type: 'user_input'; user_input: { fields: { id: string; name: string; type: string; default_value?: string; description?: string; options?: string[]; pattern?: string; }[]; attachments?: { content: string; filename: string; type: 'm.image' | 'm.audio'; info?: object; }[]; }; instructions?: string; login_id?: string; step_id?: string; } | { cookies: { fields: { name: string; type: 'cookie' | 'local_storage' | 'request_header' | 'request_body' | 'special'; cookie_domain?: string; request_url_regex?: string; }[]; url: string; extract_js?: string; user_agent?: string; wait_for_url_pattern?: string; }; type: 'cookies'; instructions?: string; login_id?: string; step_id?: string; } | { complete: { user_login_id?: string; }; type: 'complete'; instructions?: string; login_id?: string; step_id?: string; }`\n  A step in a login process.\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst response = await client.matrix.bridges.auth.waitForStep('stepID', { bridgeID: 'bridgeID', loginProcessID: 'loginProcessID' });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.matrix.bridges.auth.waitForStep',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.matrix.bridges.auth.waitForStep('stepID', {\n  bridgeID: 'bridgeID',\n  loginProcessID: 'loginProcessID',\n});\n\nconsole.log(response);",
      },
      python: {
        method: 'matrix.bridges.auth.wait_for_step',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.matrix.bridges.auth.wait_for_step(\n    step_id="stepID",\n    bridge_id="bridgeID",\n    login_process_id="loginProcessID",\n)\nprint(response)',
      },
      go: {
        method: 'client.Matrix.Bridges.Auth.WaitForStep',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.Matrix.Bridges.Auth.WaitForStep(\n\t\tcontext.TODO(),\n\t\t"stepID",\n\t\tbeeperdesktopapi.MatrixBridgeAuthWaitForStepParams{\n\t\t\tBridgeID:       "bridgeID",\n\t\t\tLoginProcessID: "loginProcessID",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response)\n}\n',
      },
      cli: {
        method: 'auth wait_for_step',
        example:
          "beeper-desktop-cli matrix:bridges:auth wait-for-step \\\n  --access-token 'My Access Token' \\\n  --bridge-id bridgeID \\\n  --login-process-id loginProcessID \\\n  --step-id stepID",
      },
      php: {
        method: 'matrix->bridges->auth->waitForStep',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->matrix->bridges->auth->waitForStep(\n  'stepID', bridgeID: 'bridgeID', loginProcessID: 'loginProcessID'\n);\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl http://localhost:23373/_matrix/client/unstable/com.beeper.bridge/$BRIDGE_ID/_matrix/provision/v3/login/step/$LOGIN_PROCESS_ID/$STEP_ID/display_and_wait \\\n    -X POST \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
    },
  },
  {
    name: 'logout',
    endpoint: '/_matrix/client/unstable/com.beeper.bridge/{bridgeID}/_matrix/provision/v3/logout/{loginID}',
    httpMethod: 'post',
    summary: 'Log out of an existing login.',
    description: 'Log out of an existing login.',
    stainlessPath: '(resource) matrix.bridges.auth > (method) logout',
    qualified: 'client.matrix.bridges.auth.logout',
    params: ['bridgeID: string;', 'loginID: string;'],
    response: 'object',
    markdown:
      "## logout\n\n`client.matrix.bridges.auth.logout(bridgeID: string, loginID: string): object`\n\n**post** `/_matrix/client/unstable/com.beeper.bridge/{bridgeID}/_matrix/provision/v3/logout/{loginID}`\n\nLog out of an existing login.\n\n### Parameters\n\n- `bridgeID: string`\n\n- `loginID: string`\n  The unique ID of a login. Defined by the network connector.\n\n### Returns\n\n- `object`\n  Empty object\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst response = await client.matrix.bridges.auth.logout('bcc68892-b180-414f-9516-b4aadf7d0496', { bridgeID: 'bridgeID' });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.matrix.bridges.auth.logout',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.matrix.bridges.auth.logout('bcc68892-b180-414f-9516-b4aadf7d0496', {\n  bridgeID: 'bridgeID',\n});\n\nconsole.log(response);",
      },
      python: {
        method: 'matrix.bridges.auth.logout',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.matrix.bridges.auth.logout(\n    login_id="bcc68892-b180-414f-9516-b4aadf7d0496",\n    bridge_id="bridgeID",\n)\nprint(response)',
      },
      go: {
        method: 'client.Matrix.Bridges.Auth.Logout',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.Matrix.Bridges.Auth.Logout(\n\t\tcontext.TODO(),\n\t\t"bcc68892-b180-414f-9516-b4aadf7d0496",\n\t\tbeeperdesktopapi.MatrixBridgeAuthLogoutParams{\n\t\t\tBridgeID: "bridgeID",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response)\n}\n',
      },
      cli: {
        method: 'auth logout',
        example:
          "beeper-desktop-cli matrix:bridges:auth logout \\\n  --access-token 'My Access Token' \\\n  --bridge-id bridgeID \\\n  --login-id bcc68892-b180-414f-9516-b4aadf7d0496",
      },
      php: {
        method: 'matrix->bridges->auth->logout',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->matrix->bridges->auth->logout(\n  'bcc68892-b180-414f-9516-b4aadf7d0496', bridgeID: 'bridgeID'\n);\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl http://localhost:23373/_matrix/client/unstable/com.beeper.bridge/$BRIDGE_ID/_matrix/provision/v3/logout/$LOGIN_ID \\\n    -X POST \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
    },
  },
  {
    name: 'list',
    endpoint: '/_matrix/client/unstable/com.beeper.bridge/{bridgeID}/_matrix/provision/v3/contacts',
    httpMethod: 'get',
    summary: 'Get a list of contacts.',
    description: 'Get a list of contacts.',
    stainlessPath: '(resource) matrix.bridges.contacts > (method) list',
    qualified: 'client.matrix.bridges.contacts.list',
    params: ['bridgeID: string;', 'login_id?: string;'],
    response:
      '{ contacts?: { id: string; avatar_url?: string; dm_room_mxid?: string; identifiers?: string[]; mxid?: string; name?: string; }[]; }',
    markdown:
      "## list\n\n`client.matrix.bridges.contacts.list(bridgeID: string, login_id?: string): { contacts?: object[]; }`\n\n**get** `/_matrix/client/unstable/com.beeper.bridge/{bridgeID}/_matrix/provision/v3/contacts`\n\nGet a list of contacts.\n\n### Parameters\n\n- `bridgeID: string`\n\n- `login_id?: string`\n  An optional explicit login ID to do the action through.\n\n### Returns\n\n- `{ contacts?: { id: string; avatar_url?: string; dm_room_mxid?: string; identifiers?: string[]; mxid?: string; name?: string; }[]; }`\n\n  - `contacts?: { id: string; avatar_url?: string; dm_room_mxid?: string; identifiers?: string[]; mxid?: string; name?: string; }[]`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst contacts = await client.matrix.bridges.contacts.list('bridgeID');\n\nconsole.log(contacts);\n```",
    perLanguage: {
      typescript: {
        method: 'client.matrix.bridges.contacts.list',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst contacts = await client.matrix.bridges.contacts.list('bridgeID');\n\nconsole.log(contacts.contacts);",
      },
      python: {
        method: 'matrix.bridges.contacts.list',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\ncontacts = client.matrix.bridges.contacts.list(\n    bridge_id="bridgeID",\n)\nprint(contacts.contacts)',
      },
      go: {
        method: 'client.Matrix.Bridges.Contacts.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tcontacts, err := client.Matrix.Bridges.Contacts.List(\n\t\tcontext.TODO(),\n\t\t"bridgeID",\n\t\tbeeperdesktopapi.MatrixBridgeContactListParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", contacts.Contacts)\n}\n',
      },
      cli: {
        method: 'contacts list',
        example:
          "beeper-desktop-cli matrix:bridges:contacts list \\\n  --access-token 'My Access Token' \\\n  --bridge-id bridgeID",
      },
      php: {
        method: 'matrix->bridges->contacts->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$contacts = $client->matrix->bridges->contacts->list(\n  'bridgeID', loginID: 'bcc68892-b180-414f-9516-b4aadf7d0496'\n);\n\nvar_dump($contacts);",
      },
      http: {
        example:
          'curl http://localhost:23373/_matrix/client/unstable/com.beeper.bridge/$BRIDGE_ID/_matrix/provision/v3/contacts \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
    },
  },
  {
    name: 'search',
    endpoint: '/_matrix/client/unstable/com.beeper.bridge/{bridgeID}/_matrix/provision/v3/search_users',
    httpMethod: 'post',
    summary: 'Search for users on the remote network',
    description: 'Search for users on the remote network',
    stainlessPath: '(resource) matrix.bridges.users > (method) search',
    qualified: 'client.matrix.bridges.users.search',
    params: ['bridgeID: string;', 'login_id?: string;', 'query?: string;'],
    response:
      '{ results?: { id: string; avatar_url?: string; dm_room_mxid?: string; identifiers?: string[]; mxid?: string; name?: string; }[]; }',
    markdown:
      "## search\n\n`client.matrix.bridges.users.search(bridgeID: string, login_id?: string, query?: string): { results?: object[]; }`\n\n**post** `/_matrix/client/unstable/com.beeper.bridge/{bridgeID}/_matrix/provision/v3/search_users`\n\nSearch for users on the remote network\n\n### Parameters\n\n- `bridgeID: string`\n\n- `login_id?: string`\n  An optional explicit login ID to do the action through.\n\n- `query?: string`\n  The search query to send to the remote network\n\n### Returns\n\n- `{ results?: { id: string; avatar_url?: string; dm_room_mxid?: string; identifiers?: string[]; mxid?: string; name?: string; }[]; }`\n\n  - `results?: { id: string; avatar_url?: string; dm_room_mxid?: string; identifiers?: string[]; mxid?: string; name?: string; }[]`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst response = await client.matrix.bridges.users.search('bridgeID');\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.matrix.bridges.users.search',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.matrix.bridges.users.search('bridgeID');\n\nconsole.log(response.results);",
      },
      python: {
        method: 'matrix.bridges.users.search',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.matrix.bridges.users.search(\n    bridge_id="bridgeID",\n)\nprint(response.results)',
      },
      go: {
        method: 'client.Matrix.Bridges.Users.Search',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.Matrix.Bridges.Users.Search(\n\t\tcontext.TODO(),\n\t\t"bridgeID",\n\t\tbeeperdesktopapi.MatrixBridgeUserSearchParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Results)\n}\n',
      },
      cli: {
        method: 'users search',
        example:
          "beeper-desktop-cli matrix:bridges:users search \\\n  --access-token 'My Access Token' \\\n  --bridge-id bridgeID",
      },
      php: {
        method: 'matrix->bridges->users->search',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->matrix->bridges->users->search(\n  'bridgeID', loginID: 'bcc68892-b180-414f-9516-b4aadf7d0496', query: 'query'\n);\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl http://localhost:23373/_matrix/client/unstable/com.beeper.bridge/$BRIDGE_ID/_matrix/provision/v3/search_users \\\n    -X POST \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
    },
  },
  {
    name: 'resolve',
    endpoint:
      '/_matrix/client/unstable/com.beeper.bridge/{bridgeID}/_matrix/provision/v3/resolve_identifier/{identifier}',
    httpMethod: 'get',
    summary: 'Resolve an identifier to a user on the remote network.',
    description: 'Resolve an identifier to a user on the remote network.',
    stainlessPath: '(resource) matrix.bridges.users > (method) resolve',
    qualified: 'client.matrix.bridges.users.resolve',
    params: ['bridgeID: string;', 'identifier: string;', 'login_id?: string;'],
    response:
      '{ id: string; avatar_url?: string; dm_room_mxid?: string; identifiers?: string[]; mxid?: string; name?: string; }',
    markdown:
      "## resolve\n\n`client.matrix.bridges.users.resolve(bridgeID: string, identifier: string, login_id?: string): { id: string; avatar_url?: string; dm_room_mxid?: string; identifiers?: string[]; mxid?: string; name?: string; }`\n\n**get** `/_matrix/client/unstable/com.beeper.bridge/{bridgeID}/_matrix/provision/v3/resolve_identifier/{identifier}`\n\nResolve an identifier to a user on the remote network.\n\n### Parameters\n\n- `bridgeID: string`\n\n- `identifier: string`\n\n- `login_id?: string`\n  An optional explicit login ID to do the action through.\n\n### Returns\n\n- `{ id: string; avatar_url?: string; dm_room_mxid?: string; identifiers?: string[]; mxid?: string; name?: string; }`\n  A successfully resolved identifier.\n\n  - `id: string`\n  - `avatar_url?: string`\n  - `dm_room_mxid?: string`\n  - `identifiers?: string[]`\n  - `mxid?: string`\n  - `name?: string`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst response = await client.matrix.bridges.users.resolve('identifier', { bridgeID: 'bridgeID' });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.matrix.bridges.users.resolve',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.matrix.bridges.users.resolve('identifier', { bridgeID: 'bridgeID' });\n\nconsole.log(response.id);",
      },
      python: {
        method: 'matrix.bridges.users.resolve',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.matrix.bridges.users.resolve(\n    identifier="identifier",\n    bridge_id="bridgeID",\n)\nprint(response.id)',
      },
      go: {
        method: 'client.Matrix.Bridges.Users.Resolve',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.Matrix.Bridges.Users.Resolve(\n\t\tcontext.TODO(),\n\t\t"identifier",\n\t\tbeeperdesktopapi.MatrixBridgeUserResolveParams{\n\t\t\tBridgeID: "bridgeID",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ID)\n}\n',
      },
      cli: {
        method: 'users resolve',
        example:
          "beeper-desktop-cli matrix:bridges:users resolve \\\n  --access-token 'My Access Token' \\\n  --bridge-id bridgeID \\\n  --identifier identifier",
      },
      php: {
        method: 'matrix->bridges->users->resolve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->matrix->bridges->users->resolve(\n  'identifier',\n  bridgeID: 'bridgeID',\n  loginID: 'bcc68892-b180-414f-9516-b4aadf7d0496',\n);\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl http://localhost:23373/_matrix/client/unstable/com.beeper.bridge/$BRIDGE_ID/_matrix/provision/v3/resolve_identifier/$IDENTIFIER \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
    },
  },
  {
    name: 'create_dm',
    endpoint:
      '/_matrix/client/unstable/com.beeper.bridge/{bridgeID}/_matrix/provision/v3/create_dm/{identifier}',
    httpMethod: 'post',
    summary: 'Create a direct chat with a user on the remote network.',
    description: 'Create a direct chat with a user on the remote network.',
    stainlessPath: '(resource) matrix.bridges.rooms > (method) create_dm',
    qualified: 'client.matrix.bridges.rooms.createDm',
    params: ['bridgeID: string;', 'identifier: string;', 'login_id?: string;'],
    response:
      '{ id: string; avatar_url?: string; dm_room_mxid?: string; identifiers?: string[]; mxid?: string; name?: string; }',
    markdown:
      "## create_dm\n\n`client.matrix.bridges.rooms.createDm(bridgeID: string, identifier: string, login_id?: string): { id: string; avatar_url?: string; dm_room_mxid?: string; identifiers?: string[]; mxid?: string; name?: string; }`\n\n**post** `/_matrix/client/unstable/com.beeper.bridge/{bridgeID}/_matrix/provision/v3/create_dm/{identifier}`\n\nCreate a direct chat with a user on the remote network.\n\n### Parameters\n\n- `bridgeID: string`\n\n- `identifier: string`\n\n- `login_id?: string`\n  An optional explicit login ID to do the action through.\n\n### Returns\n\n- `{ id: string; avatar_url?: string; dm_room_mxid?: string; identifiers?: string[]; mxid?: string; name?: string; }`\n  A successfully resolved identifier.\n\n  - `id: string`\n  - `avatar_url?: string`\n  - `dm_room_mxid?: string`\n  - `identifiers?: string[]`\n  - `mxid?: string`\n  - `name?: string`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst response = await client.matrix.bridges.rooms.createDm('identifier', { bridgeID: 'bridgeID' });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.matrix.bridges.rooms.createDm',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.matrix.bridges.rooms.createDm('identifier', { bridgeID: 'bridgeID' });\n\nconsole.log(response.id);",
      },
      python: {
        method: 'matrix.bridges.rooms.create_dm',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.matrix.bridges.rooms.create_dm(\n    identifier="identifier",\n    bridge_id="bridgeID",\n)\nprint(response.id)',
      },
      go: {
        method: 'client.Matrix.Bridges.Rooms.NewDm',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.Matrix.Bridges.Rooms.NewDm(\n\t\tcontext.TODO(),\n\t\t"identifier",\n\t\tbeeperdesktopapi.MatrixBridgeRoomNewDmParams{\n\t\t\tBridgeID: "bridgeID",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ID)\n}\n',
      },
      cli: {
        method: 'rooms create_dm',
        example:
          "beeper-desktop-cli matrix:bridges:rooms create-dm \\\n  --access-token 'My Access Token' \\\n  --bridge-id bridgeID \\\n  --identifier identifier",
      },
      php: {
        method: 'matrix->bridges->rooms->createDm',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->matrix->bridges->rooms->createDm(\n  'identifier',\n  bridgeID: 'bridgeID',\n  loginID: 'bcc68892-b180-414f-9516-b4aadf7d0496',\n);\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl http://localhost:23373/_matrix/client/unstable/com.beeper.bridge/$BRIDGE_ID/_matrix/provision/v3/create_dm/$IDENTIFIER \\\n    -X POST \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
    },
  },
  {
    name: 'create_group',
    endpoint:
      '/_matrix/client/unstable/com.beeper.bridge/{bridgeID}/_matrix/provision/v3/create_group/{groupType}',
    httpMethod: 'post',
    summary: 'Create a group chat on the remote network.',
    description: 'Create a group chat on the remote network.',
    stainlessPath: '(resource) matrix.bridges.rooms > (method) create_group',
    qualified: 'client.matrix.bridges.rooms.createGroup',
    params: [
      'bridgeID: string;',
      'groupType: string;',
      'login_id?: string;',
      'avatar?: { url?: string; };',
      'disappear?: { timer?: number; type?: string; };',
      'name?: { name?: string; };',
      'parent?: object;',
      'participants?: string[];',
      'room_id?: string;',
      'topic?: { topic?: string; };',
      'type?: string;',
      'username?: string;',
    ],
    response: '{ id: string; mxid: string; }',
    markdown:
      "## create_group\n\n`client.matrix.bridges.rooms.createGroup(bridgeID: string, groupType: string, login_id?: string, avatar?: { url?: string; }, disappear?: { timer?: number; type?: string; }, name?: { name?: string; }, parent?: object, participants?: string[], room_id?: string, topic?: { topic?: string; }, type?: string, username?: string): { id: string; mxid: string; }`\n\n**post** `/_matrix/client/unstable/com.beeper.bridge/{bridgeID}/_matrix/provision/v3/create_group/{groupType}`\n\nCreate a group chat on the remote network.\n\n### Parameters\n\n- `bridgeID: string`\n\n- `groupType: string`\n\n- `login_id?: string`\n  An optional explicit login ID to do the action through.\n\n- `avatar?: { url?: string; }`\n  The `m.room.avatar` event content for the room.\n  - `url?: string`\n\n- `disappear?: { timer?: number; type?: string; }`\n  The `com.beeper.disappearing_timer` event content for the room.\n  - `timer?: number`\n  - `type?: string`\n\n- `name?: { name?: string; }`\n  The `m.room.name` event content for the room.\n  - `name?: string`\n\n- `parent?: object`\n\n- `participants?: string[]`\n  The users to add to the group initially.\n\n- `room_id?: string`\n  An existing Matrix room ID to bridge to.\nThe other parameters must be already in sync with the room state when using this parameter.\n\n\n- `topic?: { topic?: string; }`\n  The `m.room.topic` event content for the room.\n  - `topic?: string`\n\n- `type?: string`\n  The type of group to create.\n\n- `username?: string`\n  The public username for the created group.\n\n### Returns\n\n- `{ id: string; mxid: string; }`\n  A successfully created group chat.\n\n  - `id: string`\n  - `mxid: string`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst response = await client.matrix.bridges.rooms.createGroup('groupType', { bridgeID: 'bridgeID' });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.matrix.bridges.rooms.createGroup',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.matrix.bridges.rooms.createGroup('groupType', {\n  bridgeID: 'bridgeID',\n});\n\nconsole.log(response.id);",
      },
      python: {
        method: 'matrix.bridges.rooms.create_group',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.matrix.bridges.rooms.create_group(\n    group_type="groupType",\n    bridge_id="bridgeID",\n)\nprint(response.id)',
      },
      go: {
        method: 'client.Matrix.Bridges.Rooms.NewGroup',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.Matrix.Bridges.Rooms.NewGroup(\n\t\tcontext.TODO(),\n\t\t"groupType",\n\t\tbeeperdesktopapi.MatrixBridgeRoomNewGroupParams{\n\t\t\tBridgeID: "bridgeID",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ID)\n}\n',
      },
      cli: {
        method: 'rooms create_group',
        example:
          "beeper-desktop-cli matrix:bridges:rooms create-group \\\n  --access-token 'My Access Token' \\\n  --bridge-id bridgeID \\\n  --group-type groupType",
      },
      php: {
        method: 'matrix->bridges->rooms->createGroup',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->matrix->bridges->rooms->createGroup(\n  'groupType',\n  bridgeID: 'bridgeID',\n  loginID: 'bcc68892-b180-414f-9516-b4aadf7d0496',\n  avatar: ['url' => 'url'],\n  disappear: ['timer' => 0, 'type' => 'type'],\n  name: ['name' => 'name'],\n  parent: (object) [],\n  participants: ['string'],\n  roomID: 'room_id',\n  topic: ['topic' => 'topic'],\n  type: 'channel',\n  username: 'username',\n);\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl http://localhost:23373/_matrix/client/unstable/com.beeper.bridge/$BRIDGE_ID/_matrix/provision/v3/create_group/$GROUP_TYPE \\\n    -X POST \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/_matrix/client/unstable/com.beeper.bridge/{bridgeID}/_matrix/provision/v3/capabilities',
    httpMethod: 'get',
    summary: 'Get bridge capabilities',
    description: 'Get bridge capabilities',
    stainlessPath: '(resource) matrix.bridges.capabilities > (method) retrieve',
    qualified: 'client.matrix.bridges.capabilities.retrieve',
    params: ['bridgeID: string;'],
    response: 'object',
    markdown:
      "## retrieve\n\n`client.matrix.bridges.capabilities.retrieve(bridgeID: string): object`\n\n**get** `/_matrix/client/unstable/com.beeper.bridge/{bridgeID}/_matrix/provision/v3/capabilities`\n\nGet bridge capabilities\n\n### Parameters\n\n- `bridgeID: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst capability = await client.matrix.bridges.capabilities.retrieve('bridgeID');\n\nconsole.log(capability);\n```",
    perLanguage: {
      typescript: {
        method: 'client.matrix.bridges.capabilities.retrieve',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst capability = await client.matrix.bridges.capabilities.retrieve('bridgeID');\n\nconsole.log(capability);",
      },
      python: {
        method: 'matrix.bridges.capabilities.retrieve',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\ncapability = client.matrix.bridges.capabilities.retrieve(\n    "bridgeID",\n)\nprint(capability)',
      },
      go: {
        method: 'client.Matrix.Bridges.Capabilities.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tcapability, err := client.Matrix.Bridges.Capabilities.Get(context.TODO(), "bridgeID")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", capability)\n}\n',
      },
      cli: {
        method: 'capabilities retrieve',
        example:
          "beeper-desktop-cli matrix:bridges:capabilities retrieve \\\n  --access-token 'My Access Token' \\\n  --bridge-id bridgeID",
      },
      php: {
        method: 'matrix->bridges->capabilities->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$capability = $client->matrix->bridges->capabilities->retrieve('bridgeID');\n\nvar_dump($capability);",
      },
      http: {
        example:
          'curl http://localhost:23373/_matrix/client/unstable/com.beeper.bridge/$BRIDGE_ID/_matrix/provision/v3/capabilities \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
    },
  },
];

const EMBEDDED_READMES: { language: string; content: string }[] = [
  {
    language: 'cli',
    content:
      "# Beeper Desktop CLI\n\nThe official CLI for the [Beeper Desktop REST API](https://developers.beeper.com/desktop-api/).\n\n<!-- x-release-please-start-version -->\n\n## Installation\n\n### Installing with Homebrew\n\n~~~sh\nbrew install beeper/tap/beeper-desktop-cli\n~~~\n\n### Installing with Go\n\nTo test or install the CLI locally, you need [Go](https://go.dev/doc/install) version 1.22 or later installed.\n\n~~~sh\ngo install 'github.com/beeper/desktop-api-cli/cmd/beeper-desktop-cli@latest'\n~~~\n\nOnce you have run `go install`, the binary is placed in your Go bin directory:\n\n- **Default location**: `$HOME/go/bin` (or `$GOPATH/bin` if GOPATH is set)\n- **Check your path**: Run `go env GOPATH` to see the base directory\n\nIf commands aren't found after installation, add the Go bin directory to your PATH:\n\n~~~sh\n# Add to your shell profile (.zshrc, .bashrc, etc.)\nexport PATH=\"$PATH:$(go env GOPATH)/bin\"\n~~~\n\n<!-- x-release-please-end -->\n\n### Running Locally\n\nAfter cloning the git repository for this project, you can use the\n`scripts/run` script to run the tool locally:\n\n~~~sh\n./scripts/run args...\n~~~\n\n## Usage\n\nThe CLI follows a resource-based command structure:\n\n~~~sh\nbeeper-desktop-cli [resource] <command> [flags...]\n~~~\n\n~~~sh\nbeeper-desktop-cli chats search \\\n  --access-token 'My Access Token' \\\n  --account-id matrix \\\n  --account-id discordgo \\\n  --account-id local-whatsapp_ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc \\\n  --include-muted \\\n  --limit 3 \\\n  --type single\n~~~\n\nFor details about specific commands, use the `--help` flag.\n\n### Environment variables\n\n| Environment variable  | Description                                                                                                     | Required |\n| --------------------- | --------------------------------------------------------------------------------------------------------------- | -------- |\n| `BEEPER_ACCESS_TOKEN` | Bearer access token obtained via OAuth2 PKCE flow or created in-app. Required for authenticated API operations. | yes      |\n\n### Global flags\n\n- `--access-token` - Bearer access token obtained via OAuth2 PKCE flow or created in-app. Required for authenticated API operations. (can also be set with `BEEPER_ACCESS_TOKEN` env var)\n- `--help` - Show command line usage\n- `--debug` - Enable debug logging (includes HTTP request/response details)\n- `--version`, `-v` - Show the CLI version\n- `--base-url` - Use a custom API backend URL\n- `--format` - Change the output format (`auto`, `explore`, `json`, `jsonl`, `pretty`, `raw`, `yaml`)\n- `--format-error` - Change the output format for errors (`auto`, `explore`, `json`, `jsonl`, `pretty`, `raw`, `yaml`)\n- `--transform` - Transform the data output using [GJSON syntax](https://github.com/tidwall/gjson/blob/master/SYNTAX.md)\n- `--transform-error` - Transform the error output using [GJSON syntax](https://github.com/tidwall/gjson/blob/master/SYNTAX.md)\n\n### Passing files as arguments\n\nTo pass files to your API, you can use the `@myfile.ext` syntax:\n\n~~~bash\nbeeper-desktop-cli <command> --arg @abe.jpg\n~~~\n\nFiles can also be passed inside JSON or YAML blobs:\n\n~~~bash\nbeeper-desktop-cli <command> --arg '{image: \"@abe.jpg\"}'\n# Equivalent:\nbeeper-desktop-cli <command> <<YAML\narg:\n  image: \"@abe.jpg\"\nYAML\n~~~\n\nIf you need to pass a string literal that begins with an `@` sign, you can\nescape the `@` sign to avoid accidentally passing a file.\n\n~~~bash\nbeeper-desktop-cli <command> --username '\\@abe'\n~~~\n\n#### Explicit encoding\n\nFor JSON endpoints, the CLI tool does filetype sniffing to determine whether the\nfile contents should be sent as a string literal (for plain text files) or as a\nbase64-encoded string literal (for binary files). If you need to explicitly send\nthe file as either plain text or base64-encoded data, you can use\n`@file://myfile.txt` (for string encoding) or `@data://myfile.dat` (for\nbase64-encoding). Note that absolute paths will begin with `@file://` or\n`@data://`, followed by a third `/` (for example, `@file:///tmp/file.txt`).\n\n~~~bash\nbeeper-desktop-cli <command> --arg @data://file.txt\n~~~\n\n## Linking different Go SDK versions\n\nYou can link the CLI against a different version of the Beeper Desktop Go SDK\nfor development purposes using the `./scripts/link` script.\n\nTo link to a specific version from a repository (version can be a branch,\ngit tag, or commit hash):\n\n~~~bash\n./scripts/link github.com/org/repo@version\n~~~\n\nTo link to a local copy of the SDK:\n\n~~~bash\n./scripts/link ../path/to/beeperdesktopapi-go\n~~~\n\nIf you run the link script without any arguments, it will default to `../beeperdesktopapi-go`.\n",
  },
  {
    language: 'go',
    content:
      '# Beeper Desktop Go API Library\n\n<a href="https://pkg.go.dev/github.com/beeper/desktop-api-go"><img src="https://pkg.go.dev/badge/github.com/beeper/desktop-api-go.svg" alt="Go Reference"></a>\n\nThe Beeper Desktop Go library provides convenient access to the [Beeper Desktop REST API](https://developers.beeper.com/desktop-api/)\nfrom applications written in Go.\n\n\n\n## MCP Server\n\nUse the Beeper Desktop MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40beeper%2Fdesktop-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBiZWVwZXIvZGVza3RvcC1tY3AiXSwiZW52Ijp7IkJFRVBFUl9BQ0NFU1NfVE9LRU4iOiJNeSBBY2Nlc3MgVG9rZW4ifX0)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40beeper%2Fdesktop-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40beeper%2Fdesktop-mcp%22%5D%2C%22env%22%3A%7B%22BEEPER_ACCESS_TOKEN%22%3A%22My%20Access%20Token%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n<!-- x-release-please-start-version -->\n\n```go\nimport (\n\t"github.com/beeper/desktop-api-go" // imported as SDK_PackageName\n)\n```\n\n<!-- x-release-please-end -->\n\nOr to pin the version:\n\n<!-- x-release-please-start-version -->\n\n```sh\ngo get -u \'github.com/beeper/desktop-api-go@v0.0.1\'\n```\n\n<!-- x-release-please-end -->\n\n## Requirements\n\nThis library requires Go 1.22+.\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```go\npackage main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"), // defaults to os.LookupEnv("BEEPER_ACCESS_TOKEN")\n\t)\n\tpage, err := client.Chats.Search(context.TODO(), beeperdesktopapi.ChatSearchParams{\n\t\tAccountIDs:   []string{"matrix", "discordgo", "local-whatsapp_ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc"},\n\t\tIncludeMuted: beeperdesktopapi.Bool(true),\n\t\tLimit:        beeperdesktopapi.Int(3),\n\t\tType:         beeperdesktopapi.ChatSearchParamsTypeSingle,\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n\n```\n\n### Request fields\n\nAll request parameters are wrapped in a generic `Field` type,\nwhich we use to distinguish zero values from null or omitted fields.\n\nThis prevents accidentally sending a zero value if you forget a required parameter,\nand enables explicitly sending `null`, `false`, `\'\'`, or `0` on optional parameters.\nAny field not specified is not sent.\n\nTo construct fields with values, use the helpers `String()`, `Int()`, `Float()`, or most commonly, the generic `F[T]()`.\nTo send a null, use `Null[T]()`, and to send a nonconforming value, use `Raw[T](any)`. For example:\n\n```go\nparams := FooParams{\n\tName: SDK_PackageName.F("hello"),\n\n\t// Explicitly send `"description": null`\n\tDescription: SDK_PackageName.Null[string](),\n\n\tPoint: SDK_PackageName.F(SDK_PackageName.Point{\n\t\tX: SDK_PackageName.Int(0),\n\t\tY: SDK_PackageName.Int(1),\n\n\t\t// In cases where the API specifies a given type,\n\t\t// but you want to send something else, use `Raw`:\n\t\tZ: SDK_PackageName.Raw[int64](0.01), // sends a float\n\t}),\n}\n```\n\n### Response objects\n\nAll fields in response structs are value types (not pointers or wrappers).\n\nIf a given field is `null`, not present, or invalid, the corresponding field\nwill simply be its zero value.\n\nAll response structs also include a special `JSON` field, containing more detailed\ninformation about each property, which you can use like so:\n\n```go\nif res.Name == "" {\n\t// true if `"name"` is either not present or explicitly null\n\tres.JSON.Name.IsNull()\n\n\t// true if the `"name"` key was not present in the response JSON at all\n\tres.JSON.Name.IsMissing()\n\n\t// When the API returns data that cannot be coerced to the expected type:\n\tif res.JSON.Name.IsInvalid() {\n\t\traw := res.JSON.Name.Raw()\n\n\t\tlegacyName := struct{\n\t\t\tFirst string `json:"first"`\n\t\t\tLast  string `json:"last"`\n\t\t}{}\n\t\tjson.Unmarshal([]byte(raw), &legacyName)\n\t\tname = legacyName.First + " " + legacyName.Last\n\t}\n}\n```\n\nThese `.JSON` structs also include an `Extras` map containing\nany properties in the json response that were not specified\nin the struct. This can be useful for API features not yet\npresent in the SDK.\n\n```go\nbody := res.JSON.ExtraFields["my_unexpected_field"].Raw()\n```\n\n### RequestOptions\n\nThis library uses the functional options pattern. Functions defined in the\n`SDK_PackageOptionName` package return a `RequestOption`, which is a closure that mutates a\n`RequestConfig`. These options can be supplied to the client or at individual\nrequests. For example:\n\n```go\nclient := SDK_PackageName.SDK_ClientInitializerName(\n\t// Adds a header to every request made by the client\n\tSDK_PackageOptionName.WithHeader("X-Some-Header", "custom_header_info"),\n)\n\nclient.Accounts.List(context.TODO(), ...,\n\t// Override the header\n\tSDK_PackageOptionName.WithHeader("X-Some-Header", "some_other_custom_header_info"),\n\t// Add an undocumented field to the request body, using sjson syntax\n\tSDK_PackageOptionName.WithJSONSet("some.json.path", map[string]string{"my": "object"}),\n)\n```\n\nSee the [full list of request options](https://pkg.go.dev/github.com/beeper/desktop-api-go/SDK_PackageOptionName).\n\n### Pagination\n\nThis library provides some conveniences for working with paginated list endpoints.\n\nYou can use `.ListAutoPaging()` methods to iterate through items across all pages:\n\n```go\niter := client.Messages.SearchAutoPaging(context.TODO(), beeperdesktopapi.MessageSearchParams{\n\tAccountIDs: []string{"discordgo", "local-whatsapp_ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc"},\n\tLimit:      beeperdesktopapi.Int(10),\n\tQuery:      beeperdesktopapi.String("oauth"),\n})\n// Automatically fetches more pages as needed.\nfor iter.Next() {\n\tmessage := iter.Current()\n\tfmt.Printf("%+v\\n", message)\n}\nif err := iter.Err(); err != nil {\n\tpanic(err.Error())\n}\n```\n\nOr you can use simple `.List()` methods to fetch a single page and receive a standard response object\nwith additional helper methods like `.GetNextPage()`, e.g.:\n\n```go\npage, err := client.Messages.Search(context.TODO(), beeperdesktopapi.MessageSearchParams{\n\tAccountIDs: []string{"discordgo", "local-whatsapp_ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc"},\n\tLimit:      beeperdesktopapi.Int(10),\n\tQuery:      beeperdesktopapi.String("oauth"),\n})\nfor page != nil {\n\tfor _, message := range page.Items {\n\t\tfmt.Printf("%+v\\n", message)\n\t}\n\tpage, err = page.GetNextPage()\n}\nif err != nil {\n\tpanic(err.Error())\n}\n```\n\n### Errors\n\nWhen the API returns a non-success status code, we return an error with type\n`*SDK_PackageName.Error`. This contains the `StatusCode`, `*http.Request`, and\n`*http.Response` values of the request, as well as the JSON of the error body\n(much like other response objects in the SDK).\n\nTo handle errors, we recommend that you use the `errors.As` pattern:\n\n```go\n_, err := client.Accounts.List(context.TODO())\nif err != nil {\n\tvar apierr *beeperdesktopapi.Error\n\tif errors.As(err, &apierr) {\n\t\tprintln(string(apierr.DumpRequest(true)))  // Prints the serialized HTTP request\n\t\tprintln(string(apierr.DumpResponse(true))) // Prints the serialized HTTP response\n\t}\n\tpanic(err.Error()) // GET "/v1/accounts": 400 Bad Request { ... }\n}\n```\n\nWhen other errors occur, they are returned unwrapped; for example,\nif HTTP transport fails, you might receive `*url.Error` wrapping `*net.OpError`.\n\n### Timeouts\n\nRequests do not time out by default; use context to configure a timeout for a request lifecycle.\n\nNote that if a request is [retried](#retries), the context timeout does not start over.\nTo set a per-retry timeout, use `SDK_PackageOptionName.WithRequestTimeout()`.\n\n```go\n// This sets the timeout for the request, including all the retries.\nctx, cancel := context.WithTimeout(context.Background(), 5*time.Minute)\ndefer cancel()\nclient.Accounts.List(\n\tctx,\n\t// This sets the per-retry timeout\n\toption.WithRequestTimeout(20*time.Second),\n)\n```\n\n### File uploads\n\nRequest parameters that correspond to file uploads in multipart requests are typed as\n`param.Field[io.Reader]`. The contents of the `io.Reader` will by default be sent as a multipart form\npart with the file name of "anonymous_file" and content-type of "application/octet-stream".\n\nThe file name and content-type can be customized by implementing `Name() string` or `ContentType()\nstring` on the run-time type of `io.Reader`. Note that `os.File` implements `Name() string`, so a\nfile returned by `os.Open` will be sent with the file name on disk.\n\nWe also provide a helper `SDK_PackageName.FileParam(reader io.Reader, filename string, contentType string)`\nwhich can be used to wrap any `io.Reader` with the appropriate file name and content type.\n\n```go\n// A file from the file system\nfile, err := os.Open("/path/to/file")\nbeeperdesktopapi.AssetUploadParams{\n\tFile: file,\n}\n\n// A file from a string\nbeeperdesktopapi.AssetUploadParams{\n\tFile: strings.NewReader("my file contents"),\n}\n\n// With a custom filename and contentType\nbeeperdesktopapi.AssetUploadParams{\n\tFile: beeperdesktopapi.File(strings.NewReader(`{"hello": "foo"}`), "file.go", "application/json"),\n}\n```\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nWe retry by default all connection errors, 408 Request Timeout, 409 Conflict, 429 Rate Limit,\nand >=500 Internal errors.\n\nYou can use the `WithMaxRetries` option to configure or disable this:\n\n```go\n// Configure the default for all requests:\nclient := beeperdesktopapi.NewClient(\n\toption.WithMaxRetries(0), // default is 2\n)\n\n// Override per-request:\nclient.Accounts.List(context.TODO(), option.WithMaxRetries(5))\n```\n\n\n### Accessing raw response data (e.g. response headers)\n\nYou can access the raw HTTP response data by using the `option.WithResponseInto()` request option. This is useful when\nyou need to examine response headers, status codes, or other details.\n\n```go\n// Create a variable to store the HTTP response\nvar response *http.Response\naccounts, err := client.Accounts.List(context.TODO(), option.WithResponseInto(&response))\nif err != nil {\n\t// handle error\n}\nfmt.Printf("%+v\\n", accounts)\n\nfmt.Printf("Status Code: %d\\n", response.StatusCode)\nfmt.Printf("Headers: %+#v\\n", response.Header)\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.Get`, `client.Post`, and other HTTP verbs.\n`RequestOptions` on the client, such as retries, will be respected when making these requests.\n\n```go\nvar (\n    // params can be an io.Reader, a []byte, an encoding/json serializable object,\n    // or a "…Params" struct defined in this library.\n    params map[string]interface{}\n\n    // result can be an []byte, *http.Response, a encoding/json deserializable object,\n    // or a model defined in this library.\n    result *http.Response\n)\nerr := client.Post(context.Background(), "/unspecified", params, &result)\nif err != nil {\n    …\n}\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use either the `SDK_PackageOptionName.WithQuerySet()`\nor the `SDK_PackageOptionName.WithJSONSet()` methods.\n\n```go\nparams := FooNewParams{\n    ID:   SDK_PackageName.F("id_xxxx"),\n    Data: SDK_PackageName.F(FooNewParamsData{\n        FirstName: SDK_PackageName.F("John"),\n    }),\n}\nclient.Foo.New(context.Background(), params, SDK_PackageOptionName.WithJSONSet("data.last_name", "Doe"))\n```\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may either access the raw JSON of the response as a string\nwith `result.JSON.RawJSON()`, or get the raw JSON of a particular field on the result with\n`result.JSON.Foo.Raw()`.\n\nAny fields that are not present on the response struct will be saved and can be accessed by `result.JSON.ExtraFields()` which returns the extra fields as a `map[string]Field`.\n\n### Middleware\n\nWe provide `SDK_PackageOptionName.WithMiddleware` which applies the given\nmiddleware to requests.\n\n```go\nfunc Logger(req *http.Request, next SDK_PackageOptionName.MiddlewareNext) (res *http.Response, err error) {\n\t// Before the request\n\tstart := time.Now()\n\tLogReq(req)\n\n\t// Forward the request to the next handler\n\tres, err = next(req)\n\n\t// Handle stuff after the request\n\tend := time.Now()\n\tLogRes(res, err, start - end)\n\n    return res, err\n}\n\nclient := SDK_PackageName.SDK_ClientInitializerName(\n\tSDK_PackageOptionName.WithMiddleware(Logger),\n)\n```\n\nWhen multiple middlewares are provided as variadic arguments, the middlewares\nare applied left to right. If `SDK_PackageOptionName.WithMiddleware` is given\nmultiple times, for example first in the client then the method, the\nmiddleware in the client will run first and the middleware given in the method\nwill run next.\n\nYou may also replace the default `http.Client` with\n`SDK_PackageOptionName.WithHTTPClient(client)`. Only one http client is\naccepted (this overwrites any previous client) and receives requests after any\nmiddleware has been applied.\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n2. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/beeper/desktop-api-go/issues) with questions, bugs, or suggestions.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'php',
    content:
      '# Beeper Desktop PHP API Library\n\nThe Beeper Desktop PHP library provides convenient access to the Beeper Desktop REST API from any PHP 8.1.0+ application.\n\n## Installation\n\nTo use this package, install via Composer by adding the following to your application\'s `composer.json`:\n\n<!-- x-release-please-start-version -->\n```json\n{\n  "repositories": [\n    {\n      "type": "vcs",\n      "url": "git@github.com:beeper/desktop-api-php.git"\n    }\n  ],\n  "require": {\n    "beeper/desktop-api-php": "dev-main"\n  }\n}\n```\n<!-- x-release-please-end -->\n\n## Usage\n\n```php\n<?php\n\n$client = new Client(\n  accessToken: getenv(\'BEEPER_ACCESS_TOKEN\') ?: \'My Access Token\'\n);\n\n$page = $client->chats->search(\n  accountIDs: [\n    \'matrix\', \'discordgo\', \'local-whatsapp_ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc\'\n  ],\n  includeMuted: true,\n  limit: 3,\n  type: \'single\',\n);\n\nvar_dump($page->id);\n```',
  },
  {
    language: 'python',
    content:
      '# Beeper Desktop Python API library\n\n<!-- prettier-ignore -->\n[![PyPI version](https://img.shields.io/pypi/v/beeper_desktop_api.svg?label=pypi%20(stable))](https://pypi.org/project/beeper_desktop_api/)\n\nThe Beeper Desktop Python library provides convenient access to the Beeper Desktop REST API from any Python 3.9+\napplication. The library includes type definitions for all request params and response fields,\nand offers both synchronous and asynchronous clients powered by [httpx](https://github.com/encode/httpx).\n\n\n\n\n\n## MCP Server\n\nUse the Beeper Desktop MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40beeper%2Fdesktop-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBiZWVwZXIvZGVza3RvcC1tY3AiXSwiZW52Ijp7IkJFRVBFUl9BQ0NFU1NfVE9LRU4iOiJNeSBBY2Nlc3MgVG9rZW4ifX0)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40beeper%2Fdesktop-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40beeper%2Fdesktop-mcp%22%5D%2C%22env%22%3A%7B%22BEEPER_ACCESS_TOKEN%22%3A%22My%20Access%20Token%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Documentation\n\nThe REST API documentation can be found on [developers.beeper.com](https://developers.beeper.com/desktop-api/). The full API of this library can be found in [api.md](api.md).\n\n## Installation\n\n```sh\n# install from the production repo\npip install git+ssh://git@github.com/beeper/desktop-api-python.git\n```\n> [!NOTE]\n> Once this package is [published to PyPI](https://www.stainless.com/docs/guides/publish), this will become: `pip install beeper_desktop_api`\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```python\nimport os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\n\npage = client.chats.search(\n    account_ids=["matrix", "discordgo", "local-whatsapp_ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc"],\n    include_muted=True,\n    limit=3,\n    type="single",\n)\nprint(page.items)\n```\n\nWhile you can provide a `access_token` keyword argument,\nwe recommend using [python-dotenv](https://pypi.org/project/python-dotenv/)\nto add `BEEPER_ACCESS_TOKEN="My Access Token"` to your `.env` file\nso that your Access Token is not stored in source control.\n\n## Async usage\n\nSimply import `AsyncBeeperDesktop` instead of `BeeperDesktop` and use `await` with each API call:\n\n```python\nimport os\nimport asyncio\nfrom beeper_desktop_api import AsyncBeeperDesktop\n\nclient = AsyncBeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\n\nasync def main() -> None:\n  page = await client.chats.search(\n      account_ids=["matrix", "discordgo", "local-whatsapp_ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc"],\n      include_muted=True,\n      limit=3,\n      type="single",\n  )\n  print(page.items)\n\nasyncio.run(main())\n```\n\nFunctionality between the synchronous and asynchronous clients is otherwise identical.\n\n### With aiohttp\n\nBy default, the async client uses `httpx` for HTTP requests. However, for improved concurrency performance you may also use `aiohttp` as the HTTP backend.\n\nYou can enable this by installing `aiohttp`:\n\n```sh\n# install from the production repo\npip install \'beeper_desktop_api[aiohttp] @ git+ssh://git@github.com/beeper/desktop-api-python.git\'\n```\n\nThen you can enable it by instantiating the client with `http_client=DefaultAioHttpClient()`:\n\n```python\nimport os\nimport asyncio\nfrom beeper_desktop_api import DefaultAioHttpClient\nfrom beeper_desktop_api import AsyncBeeperDesktop\n\nasync def main() -> None:\n  async with AsyncBeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n    http_client=DefaultAioHttpClient(),\n) as client:\n    page = await client.chats.search(\n        account_ids=["matrix", "discordgo", "local-whatsapp_ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc"],\n        include_muted=True,\n        limit=3,\n        type="single",\n    )\n    print(page.items)\n\nasyncio.run(main())\n```\n\n\n\n## Using types\n\nNested request parameters are [TypedDicts](https://docs.python.org/3/library/typing.html#typing.TypedDict). Responses are [Pydantic models](https://docs.pydantic.dev) which also provide helper methods for things like:\n\n- Serializing back into JSON, `model.to_json()`\n- Converting to a dictionary, `model.to_dict()`\n\nTyped requests and responses provide autocomplete and documentation within your editor. If you would like to see type errors in VS Code to help catch bugs earlier, set `python.analysis.typeCheckingMode` to `basic`.\n\n## Pagination\n\nList methods in the Beeper Desktop API are paginated.\n\nThis library provides auto-paginating iterators with each list response, so you do not have to request successive pages manually:\n\n```python\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop()\n\nall_messages = []\n# Automatically fetches more pages as needed.\nfor message in client.messages.search(\n    account_ids=["discordgo", "local-whatsapp_ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc"],\n    limit=10,\n    query="oauth",\n):\n    # Do something with message here\n    all_messages.append(message)\nprint(all_messages)\n```\n\nOr, asynchronously:\n\n```python\nimport asyncio\nfrom beeper_desktop_api import AsyncBeeperDesktop\n\nclient = AsyncBeeperDesktop()\n\nasync def main() -> None:\n    all_messages = []\n    # Iterate through items across all pages, issuing requests as needed.\n    async for message in client.messages.search(\n    account_ids=["discordgo", "local-whatsapp_ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc"],\n    limit=10,\n    query="oauth",\n):\n        all_messages.append(message)\n    print(all_messages)\n\nasyncio.run(main())\n```\n\nAlternatively, you can use the `.has_next_page()`, `.next_page_info()`, or  `.get_next_page()` methods for more granular control working with pages:\n\n```python\nfirst_page = await client.messages.search(\n    account_ids=["discordgo", "local-whatsapp_ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc"],\n    limit=10,\n    query="oauth",\n)\nif first_page.has_next_page():\n    print(f"will fetch next page using these details: {first_page.next_page_info()}")\n    next_page = await first_page.get_next_page()\n    print(f"number of items we just fetched: {len(next_page.items)}")\n\n# Remove `await` for non-async usage.\n```\n\nOr just work directly with the returned data:\n\n```python\nfirst_page = await client.messages.search(\n    account_ids=["discordgo", "local-whatsapp_ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc"],\n    limit=10,\n    query="oauth",\n)\n\nprint(f"next page cursor: {first_page.oldest_cursor}") # => "next page cursor: ..."\nfor message in first_page.items:\n    print(message.id)\n\n# Remove `await` for non-async usage.\n```\n\n## Nested params\n\nNested parameters are dictionaries, typed using `TypedDict`, for example:\n\n```python\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop()\n\nchat = client.chats.update(\n    chat_id="!NCdzlIaMjZUmvmvyHU:beeper.com",\n    draft={\n        "text": "text"\n    },\n)\nprint(chat.draft)\n```\n\n## File uploads\n\nRequest parameters that correspond to file uploads can be passed as `bytes`, or a [`PathLike`](https://docs.python.org/3/library/os.html#os.PathLike) instance or a tuple of `(filename, contents, media type)`.\n\n```python\nfrom pathlib import Path\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop()\n\nclient.assets.upload(\n    file=Path("/path/to/file"),\n)\n```\n\nThe async client uses the exact same interface. If you pass a [`PathLike`](https://docs.python.org/3/library/os.html#os.PathLike) instance, the file contents will be read asynchronously automatically.\n\n## Handling errors\n\nWhen the library is unable to connect to the API (for example, due to network connection problems or a timeout), a subclass of `beeper_desktop_api.APIConnectionError` is raised.\n\nWhen the API returns a non-success status code (that is, 4xx or 5xx\nresponse), a subclass of `beeper_desktop_api.APIStatusError` is raised, containing `status_code` and `response` properties.\n\nAll errors inherit from `beeper_desktop_api.APIError`.\n\n```python\nimport beeper_desktop_api\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop()\n\ntry:\n    client.accounts.list()\nexcept beeper_desktop_api.APIConnectionError as e:\n    print("The server could not be reached")\n    print(e.__cause__) # an underlying Exception, likely raised within httpx.\nexcept beeper_desktop_api.RateLimitError as e:\n    print("A 429 status code was received; we should back off a bit.")\nexcept beeper_desktop_api.APIStatusError as e:\n    print("Another non-200-range status code was received")\n    print(e.status_code)\n    print(e.response)\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors are automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors are all retried by default.\n\nYou can use the `max_retries` option to configure or disable retry settings:\n\n```python\nfrom beeper_desktop_api import BeeperDesktop\n\n# Configure the default for all requests:\nclient = BeeperDesktop(\n    # default is 2\n    max_retries=0,\n)\n\n# Or, configure per-request:\nclient.with_options(max_retries = 5).accounts.list()\n```\n\n### Timeouts\n\nBy default requests time out after 30 seconds. You can configure this with a `timeout` option,\nwhich accepts a float or an [`httpx.Timeout`](https://www.python-httpx.org/advanced/timeouts/#fine-tuning-the-configuration) object:\n\n```python\nfrom beeper_desktop_api import BeeperDesktop\n\n# Configure the default for all requests:\nclient = BeeperDesktop(\n    # 20 seconds (default is 30 seconds)\n    timeout=20.0,\n)\n\n# More granular control:\nclient = BeeperDesktop(\n    timeout=httpx.Timeout(60.0, read=5.0, write=10.0, connect=2.0),\n)\n\n# Override per-request:\nclient.with_options(timeout = 5.0).accounts.list()\n```\n\nOn timeout, an `APITimeoutError` is thrown.\n\nNote that requests that time out are [retried twice by default](#retries).\n\n\n\n## Advanced\n\n### Logging\n\nWe use the standard library [`logging`](https://docs.python.org/3/library/logging.html) module.\n\nYou can enable logging by setting the environment variable `BEEPER_LOG` to `info`.\n\n```shell\n$ export BEEPER_LOG=info\n```\n\nOr to `debug` for more verbose logging.\n\n### How to tell whether `None` means `null` or missing\n\nIn an API response, a field may be explicitly `null`, or missing entirely; in either case, its value is `None` in this library. You can differentiate the two cases with `.model_fields_set`:\n\n```py\nif response.my_field is None:\n  if \'my_field\' not in response.model_fields_set:\n    print(\'Got json like {}, without a "my_field" key present at all.\')\n  else:\n    print(\'Got json like {"my_field": null}.\')\n```\n\n### Accessing raw response data (e.g. headers)\n\nThe "raw" Response object can be accessed by prefixing `.with_raw_response.` to any HTTP method call, e.g.,\n\n```py\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop()\nresponse = client.accounts.with_raw_response.list()\nprint(response.headers.get(\'X-My-Header\'))\n\naccount = response.parse()  # get the object that `accounts.list()` would have returned\nprint(account)\n```\n\nThese methods return an [`APIResponse`](https://github.com/beeper/desktop-api-python/tree/main/src/beeper_desktop_api/_response.py) object.\n\nThe async client returns an [`AsyncAPIResponse`](https://github.com/beeper/desktop-api-python/tree/main/src/beeper_desktop_api/_response.py) with the same structure, the only difference being `await`able methods for reading the response content.\n\n#### `.with_streaming_response`\n\nThe above interface eagerly reads the full response body when you make the request, which may not always be what you want.\n\nTo stream the response body, use `.with_streaming_response` instead, which requires a context manager and only reads the response body once you call `.read()`, `.text()`, `.json()`, `.iter_bytes()`, `.iter_text()`, `.iter_lines()` or `.parse()`. In the async client, these are async methods.\n\n```python\nwith client.accounts.with_streaming_response.list() as response :\n    print(response.headers.get(\'X-My-Header\'))\n\n    for line in response.iter_lines():\n      print(line)\n```\n\nThe context manager is required so that the response will reliably be closed.\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API.\n\nIf you need to access undocumented endpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can make requests using `client.get`, `client.post`, and other\nhttp verbs. Options on the client will be respected (such as retries) when making this request.\n\n```py\nimport httpx\n\nresponse = client.post(\n    "/foo",\n    cast_to=httpx.Response,\n    body={"my_param": True},\n)\n\nprint(response.headers.get("x-foo"))\n```\n\n#### Undocumented request params\n\nIf you want to explicitly send an extra param, you can do so with the `extra_query`, `extra_body`, and `extra_headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you can access the extra fields like `response.unknown_prop`. You\ncan also get all the extra fields on the Pydantic model as a dict with\n[`response.model_extra`](https://docs.pydantic.dev/latest/api/base_model/#pydantic.BaseModel.model_extra).\n\n### Configuring the HTTP client\n\nYou can directly override the [httpx client](https://www.python-httpx.org/api/#client) to customize it for your use case, including:\n\n- Support for [proxies](https://www.python-httpx.org/advanced/proxies/)\n- Custom [transports](https://www.python-httpx.org/advanced/transports/)\n- Additional [advanced](https://www.python-httpx.org/advanced/clients/) functionality\n\n```python\nimport httpx\nfrom beeper_desktop_api import BeeperDesktop, DefaultHttpxClient\n\nclient = BeeperDesktop(\n    # Or use the `BEEPER_BASE_URL` env var\n    base_url="http://my.test.server.example.com:8083",\n    http_client=DefaultHttpxClient(proxy="http://my.test.proxy.example.com", transport=httpx.HTTPTransport(local_address="0.0.0.0")),\n)\n```\n\nYou can also customize the client on a per-request basis by using `with_options()`:\n\n```python\nclient.with_options(http_client=DefaultHttpxClient(...))\n```\n\n### Managing HTTP resources\n\nBy default the library closes underlying HTTP connections whenever the client is [garbage collected](https://docs.python.org/3/reference/datamodel.html#object.__del__). You can manually close the client using the `.close()` method if desired, or with a context manager that closes when exiting.\n\n```py\nfrom beeper_desktop_api import BeeperDesktop\n\nwith BeeperDesktop() as client:\n  # make requests here\n  ...\n\n# HTTP client is now closed\n```\n\n## Versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/beeper/desktop-api-python/issues) with questions, bugs, or suggestions.\n\n### Determining the installed version\n\nIf you\'ve upgraded to the latest version but aren\'t seeing any new features you were expecting then your python environment is likely still using an older version.\n\nYou can determine the version that is being used at runtime with:\n\n```py\nimport beeper_desktop_api\nprint(beeper_desktop_api.__version__)\n```\n\n## Requirements\n\nPython 3.9 or higher.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'typescript',
    content:
      "# TypeScript SDK for Beeper Desktop API Library\n\n[![NPM version](https://img.shields.io/npm/v/@beeper/desktop-api.svg?label=npm%20(stable))](https://npmjs.org/package/@beeper/desktop-api) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/@beeper/desktop-api)\n\nThis library provides convenient access to the Beeper Desktop REST API from server-side TypeScript or JavaScript.\n\n\n\nThe REST API documentation can be found on [developers.beeper.com](https://developers.beeper.com/desktop-api/). The full API of this library can be found in [api.md](api.md).\n\n\n\n## MCP Server\n\nUse the Beeper Desktop MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40beeper%2Fdesktop-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBiZWVwZXIvZGVza3RvcC1tY3AiXSwiZW52Ijp7IkJFRVBFUl9BQ0NFU1NfVE9LRU4iOiJNeSBBY2Nlc3MgVG9rZW4ifX0)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40beeper%2Fdesktop-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40beeper%2Fdesktop-mcp%22%5D%2C%22env%22%3A%7B%22BEEPER_ACCESS_TOKEN%22%3A%22My%20Access%20Token%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n```sh\nnpm install @beeper/desktop-api\n```\n\n\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n<!-- prettier-ignore -->\n```js\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst page = await client.chats.search({\n  accountIDs: ['matrix', 'discordgo', 'local-whatsapp_ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc'],\n  includeMuted: true,\n  limit: 3,\n  type: 'single',\n});\nconst chat = page.items[0];\n\nconsole.log(chat.id);\n```\n\n\n\n### Request & Response types\n\nThis library includes TypeScript definitions for all request params and response fields. You may import and use them like so:\n\n<!-- prettier-ignore -->\n```ts\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst accounts: BeeperDesktop.AccountListResponse = await client.accounts.list();\n```\n\nDocumentation for each method, request param, and response field are available in docstrings and will appear on hover in most modern editors.\n\n## File uploads\n\nRequest parameters that correspond to file uploads can be passed in many different forms:\n- `File` (or an object with the same structure)\n- a `fetch` `Response` (or an object with the same structure)\n- an `fs.ReadStream`\n- the return value of our `toFile` helper\n\n```ts\nimport fs from 'fs';\nimport BeeperDesktop, { toFile } from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\n// If you have access to Node `fs` we recommend using `fs.createReadStream()`:\nawait client.assets.upload({ file: fs.createReadStream('/path/to/file') });\n\n// Or if you have the web `File` API you can pass a `File` instance:\nawait client.assets.upload({ file: new File(['my bytes'], 'file') });\n\n// You can also pass a `fetch` `Response`:\nawait client.assets.upload({ file: await fetch('https://somesite/file') });\n\n// Finally, if none of the above are convenient, you can use our `toFile` helper:\nawait client.assets.upload({ file: await toFile(Buffer.from('my bytes'), 'file') });\nawait client.assets.upload({ file: await toFile(new Uint8Array([0, 1, 2]), 'file') });\n```\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API,\nor if the API returns a non-success status code (i.e., 4xx or 5xx response),\na subclass of `APIError` will be thrown:\n\n<!-- prettier-ignore -->\n```ts\nconst accounts = await client.accounts.list().catch(async (err) => {\n  if (err instanceof BeeperDesktop.APIError) {\n    console.log(err.status); // 400\n    console.log(err.name); // BadRequestError\n    console.log(err.headers); // {server: 'nginx', ...}\n  } else {\n    throw err;\n  }\n});\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors will all be retried by default.\n\nYou can use the `maxRetries` option to configure or disable this:\n\n<!-- prettier-ignore -->\n```js\n// Configure the default for all requests:\nconst client = new BeeperDesktop({\n  maxRetries: 0, // default is 2\n});\n\n// Or, configure per-request:\nawait client.accounts.list({\n  maxRetries: 5,\n});\n```\n\n### Timeouts\n\nRequests time out after 30 seconds by default. You can configure this with a `timeout` option:\n\n<!-- prettier-ignore -->\n```ts\n// Configure the default for all requests:\nconst client = new BeeperDesktop({\n  timeout: 20 * 1000, // 20 seconds (default is 30 seconds)\n});\n\n// Override per-request:\nawait client.accounts.list({\n  timeout: 5 * 1000,\n});\n```\n\nOn timeout, an `APIConnectionTimeoutError` is thrown.\n\nNote that requests which time out will be [retried twice by default](#retries).\n\n## Auto-pagination\n\nList methods in the BeeperDesktop API are paginated.\nYou can use the `for await … of` syntax to iterate through items across all pages:\n\n```ts\nasync function fetchAllMessages(params) {\n  const allMessages = [];\n  // Automatically fetches more pages as needed.\n  for await (const message of client.messages.search({\n    accountIDs: ['discordgo', 'local-whatsapp_ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc'],\n    limit: 10,\n    query: 'oauth',\n  })) {\n    allMessages.push(message);\n  }\n  return allMessages;\n}\n```\n\nAlternatively, you can request a single page at a time:\n\n```ts\nlet page = await client.messages.search({\n  accountIDs: ['discordgo', 'local-whatsapp_ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc'],\n  limit: 10,\n  query: 'oauth',\n});\nfor (const message of page.items) {\n  console.log(message);\n}\n\n// Convenience methods are provided for manually paginating:\nwhile (page.hasNextPage()) {\n  page = await page.getNextPage();\n  // ...\n}\n```\n\n\n\n## Advanced Usage\n\n### Tree shaking\n\nThis library supports tree shaking to reduce bundle size. Instead of importing the full client, you can create a client only including the API resources you need:\n\n~~~ts\nimport { createClient } from '@beeper/desktop-api/tree-shakable';\nimport { Accounts } from '@beeper/desktop-api/resources/accounts/accounts';\nimport { BaseChats } from '@beeper/desktop-api/resources/chats/chats';\n\nconst client = createClient({\n  // Specify the resources you'd like to use ...\n  resources: [Accounts, BaseChats],\n});\n\n// ... then make API calls as usual.\nconst accounts = await client.accounts.list();\nconst chat = await client.chats.retrieve('!NCdzlIaMjZUmvmvyHU:beeper.com');\n~~~\n\nEach API resource has two versions, the full resource (e.g., `Accounts`) which includes all subresources, and the base resource (e.g., `BaseAccounts`) which does not.\n\nThe tree-shaken client is fully typed, so TypeScript will provide accurate autocomplete and prevent access to resources not included in your configuration.\nThe `createClient` function automatically infers the correct type, but you can also use the `PartialBeeperDesktop` type explicitly:\n\n~~~ts\nimport BeeperDesktop from '@beeper/desktop-api';\nimport { createClient, type PartialBeeperDesktop } from '@beeper/desktop-api/tree-shakable';\nimport { BaseAccounts } from '@beeper/desktop-api/resources/accounts/accounts';\n\n// Explicit variable type\nconst client: PartialBeeperDesktop<{ accounts: BaseAccounts }> = createClient({\n  resources: [BaseAccounts],\n  /* ... */\n});\n\n// Function parameter type\nasync function main(client: PartialBeeperDesktop<{ accounts: BaseAccounts }>) {\n  const accounts = await client.accounts.list();\n}\n\n// Works with any client that has the accounts resource\nconst treeShakableClient = createClient({\n  resources: [BaseAccounts],\n  /* ... */\n});\nconst fullClient = new BeeperDesktop(/* ... */);\n\nmain(treeShakableClient); // Works\nmain(fullClient); // Also works\n~~~\n\n### Accessing raw Response data (e.g., headers)\n\nThe \"raw\" `Response` returned by `fetch()` can be accessed through the `.asResponse()` method on the `APIPromise` type that all methods return.\nThis method returns as soon as the headers for a successful response are received and does not consume the response body, so you are free to write custom parsing or streaming logic.\n\nYou can also use the `.withResponse()` method to get the raw `Response` along with the parsed data.\nUnlike `.asResponse()` this method consumes the body, returning once it is parsed.\n\n<!-- prettier-ignore -->\n```ts\nconst client = new BeeperDesktop();\n\nconst response = await client.accounts.list().asResponse();\nconsole.log(response.headers.get('X-My-Header'));\nconsole.log(response.statusText); // access the underlying Response object\n\nconst { data: accounts, response: raw } = await client.accounts.list().withResponse();\nconsole.log(raw.headers.get('X-My-Header'));\nconsole.log(accounts);\n```\n\n### Logging\n\n> [!IMPORTANT]\n> All log messages are intended for debugging only. The format and content of log messages\n> may change between releases.\n\n#### Log levels\n\nThe log level can be configured in two ways:\n\n1. Via the `BEEPER_LOG` environment variable\n2. Using the `logLevel` client option (overrides the environment variable if set)\n\n```ts\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  logLevel: 'debug', // Show all log messages\n});\n```\n\nAvailable log levels, from most to least verbose:\n\n- `'debug'` - Show debug messages, info, warnings, and errors\n- `'info'` - Show info messages, warnings, and errors\n- `'warn'` - Show warnings and errors (default)\n- `'error'` - Show only errors\n- `'off'` - Disable all logging\n\nAt the `'debug'` level, all HTTP requests and responses are logged, including headers and bodies.\nSome authentication-related headers are redacted, but sensitive data in request and response bodies\nmay still be visible.\n\n#### Custom logger\n\nBy default, this library logs to `globalThis.console`. You can also provide a custom logger.\nMost logging libraries are supported, including [pino](https://www.npmjs.com/package/pino), [winston](https://www.npmjs.com/package/winston), [bunyan](https://www.npmjs.com/package/bunyan), [consola](https://www.npmjs.com/package/consola), [signale](https://www.npmjs.com/package/signale), and [@std/log](https://jsr.io/@std/log). If your logger doesn't work, please open an issue.\n\nWhen providing a custom logger, the `logLevel` option still controls which messages are emitted, messages\nbelow the configured level will not be sent to your logger.\n\n```ts\nimport BeeperDesktop from '@beeper/desktop-api';\nimport pino from 'pino';\n\nconst logger = pino();\n\nconst client = new BeeperDesktop({\n  logger: logger.child({ name: 'BeeperDesktop' }),\n  logLevel: 'debug', // Send all messages to pino, allowing it to filter\n});\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.get`, `client.post`, and other HTTP verbs.\nOptions on the client, such as retries, will be respected when making these requests.\n\n```ts\nawait client.post('/some/path', {\n  body: { some_prop: 'foo' },\n  query: { some_query_arg: 'bar' },\n});\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use `// @ts-expect-error` on the undocumented\nparameter. This library doesn't validate at runtime that the request matches the type, so any extra values you\nsend will be sent as-is.\n\n```ts\nclient.chats.search({\n  // ...\n  // @ts-expect-error baz is not yet public\n  baz: 'undocumented option',\n});\n```\n\nFor requests with the `GET` verb, any extra params will be in the query, all other requests will send the\nextra param in the body.\n\nIf you want to explicitly send an extra argument, you can do so with the `query`, `body`, and `headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may access the response object with `// @ts-expect-error` on\nthe response object, or cast the response object to the requisite type. Like the request params, we do not\nvalidate or strip extra properties from the response from the API.\n\n### Customizing the fetch client\n\nBy default, this library expects a global `fetch` function is defined.\n\nIf you want to use a different `fetch` function, you can either polyfill the global:\n\n```ts\nimport fetch from 'my-fetch';\n\nglobalThis.fetch = fetch;\n```\n\nOr pass it to the client:\n\n```ts\nimport BeeperDesktop from '@beeper/desktop-api';\nimport fetch from 'my-fetch';\n\nconst client = new BeeperDesktop({ fetch });\n```\n\n### Fetch options\n\nIf you want to set custom `fetch` options without overriding the `fetch` function, you can provide a `fetchOptions` object when instantiating the client or making a request. (Request-specific options override client options.)\n\n```ts\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  fetchOptions: {\n    // `RequestInit` options\n  },\n});\n```\n\n#### Configuring proxies\n\nTo modify proxy behavior, you can provide custom `fetchOptions` that add runtime-specific proxy\noptions to requests:\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/node.svg\" align=\"top\" width=\"18\" height=\"21\"> **Node** <sup>[[docs](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md#example---proxyagent-with-fetch)]</sup>\n\n```ts\nimport BeeperDesktop from '@beeper/desktop-api';\nimport * as undici from 'undici';\n\nconst proxyAgent = new undici.ProxyAgent('http://localhost:8888');\nconst client = new BeeperDesktop({\n  fetchOptions: {\n    dispatcher: proxyAgent,\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/bun.svg\" align=\"top\" width=\"18\" height=\"21\"> **Bun** <sup>[[docs](https://bun.sh/guides/http/proxy)]</sup>\n\n```ts\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  fetchOptions: {\n    proxy: 'http://localhost:8888',\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/deno.svg\" align=\"top\" width=\"18\" height=\"21\"> **Deno** <sup>[[docs](https://docs.deno.com/api/deno/~/Deno.createHttpClient)]</sup>\n\n```ts\nimport BeeperDesktop from 'npm:@beeper/desktop-api';\n\nconst httpClient = Deno.createHttpClient({ proxy: { url: 'http://localhost:8888' } });\nconst client = new BeeperDesktop({\n  fetchOptions: {\n    client: httpClient,\n  },\n});\n```\n\n## Frequently Asked Questions\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/beeper/desktop-api-js/issues) with questions, bugs, or suggestions.\n\n## Requirements\n\nTypeScript >= 4.9 is supported.\n\nThe following runtimes are supported:\n\n- Web browsers (Up-to-date Chrome, Firefox, Safari, Edge, and more)\n- Node.js 20 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.\n- Deno v1.28.0 or higher.\n- Bun 1.0 or later.\n- Cloudflare Workers.\n- Vercel Edge Runtime.\n- Jest 28 or greater with the `\"node\"` environment (`\"jsdom\"` is not supported at this time).\n- Nitro v2.6 or greater.\n\nNote that React Native is not supported at this time.\n\nIf you are interested in other runtime environments, please open or upvote an issue on GitHub.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n",
  },
];

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
