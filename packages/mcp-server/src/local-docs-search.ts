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
    perLanguage: {
      cli: {
        method: '$client focus',
        example: "beeper-desktop-cli focus \\\n  --access-token 'My Access Token'",
      },
      go: {
        method: 'client.Focus',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.Focus(context.TODO(), beeperdesktopapi.FocusParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Success)\n}\n',
      },
      http: {
        example:
          'curl http://localhost:23373/v1/focus \\\n    -X POST \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
      php: {
        method: 'focus',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->focus(\n  chatID: '!NCdzlIaMjZUmvmvyHU:beeper.com',\n  draftAttachmentPath: 'draftAttachmentPath',\n  draftText: 'draftText',\n  messageID: 'messageID',\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'focus',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.focus()\nprint(response.success)',
      },
      typescript: {
        method: 'client.focus',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.focus();\n\nconsole.log(response.success);",
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
      "## search\n\n`client.search(query: string): { results: object; }`\n\n**get** `/v1/search`\n\nReturns matching chats, participant name matches in groups, and the first page of messages in one call. Paginate messages via search-messages. Paginate chats via search-chats.\n\n### Parameters\n\n- `query: string`\n  User-typed search text. Literal word matching (non-semantic).\n\n### Returns\n\n- `{ results: { chats: object[]; in_groups: object[]; messages: { chats: object; hasMore: boolean; items: message[]; newestCursor: string; oldestCursor: string; }; }; }`\n\n  - `results: { chats: { id: string; accountID: string; participants: { hasMore: boolean; items: user[]; total: number; }; title: string; type: 'single' | 'group'; unreadCount: number; isArchived?: boolean; isMuted?: boolean; isPinned?: boolean; lastActivity?: string; lastReadMessageSortKey?: string; localChatID?: string; }[]; in_groups: { id: string; accountID: string; participants: { hasMore: boolean; items: user[]; total: number; }; title: string; type: 'single' | 'group'; unreadCount: number; isArchived?: boolean; isMuted?: boolean; isPinned?: boolean; lastActivity?: string; lastReadMessageSortKey?: string; localChatID?: string; }[]; messages: { chats: object; hasMore: boolean; items: { id: string; accountID: string; chatID: string; senderID: string; sortKey: string; timestamp: string; attachments?: attachment[]; isSender?: boolean; isUnread?: boolean; linkedMessageID?: string; reactions?: reaction[]; senderName?: string; text?: string; type?: string; }[]; newestCursor: string; oldestCursor: string; }; }`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst response = await client.search({ query: 'x' });\n\nconsole.log(response);\n```",
    perLanguage: {
      cli: {
        method: '$client search',
        example: "beeper-desktop-cli search \\\n  --access-token 'My Access Token' \\\n  --query x",
      },
      go: {
        method: 'client.Search',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.Search(context.TODO(), beeperdesktopapi.SearchParams{\n\t\tQuery: "x",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Results)\n}\n',
      },
      http: {
        example:
          'curl http://localhost:23373/v1/search \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
      php: {
        method: 'search',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->search(query: 'x');\n\nvar_dump($response);",
      },
      python: {
        method: 'search',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.search(\n    query="x",\n)\nprint(response.results)',
      },
      typescript: {
        method: 'client.search',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.search({ query: 'x' });\n\nconsole.log(response.results);",
      },
    },
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
    response:
      "{ accountID: string; bridge: { id: string; provider: 'cloud' | 'self-hosted' | 'local' | 'platform-sdk'; type: string; }; network: string; user: object; }[]",
    markdown:
      "## list\n\n`client.accounts.list(): object[]`\n\n**get** `/v1/accounts`\n\nLists chat accounts across networks (WhatsApp, Telegram, Twitter/X, etc.) actively connected to this Beeper Desktop instance\n\n### Returns\n\n- `{ accountID: string; bridge: { id: string; provider: 'cloud' | 'self-hosted' | 'local' | 'platform-sdk'; type: string; }; network: string; user: object; }[]`\n  Connected accounts the user can act through. Includes accountID and user identity.\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst accounts = await client.accounts.list();\n\nconsole.log(accounts);\n```",
    perLanguage: {
      cli: {
        method: 'accounts list',
        example: "beeper-desktop-cli accounts list \\\n  --access-token 'My Access Token'",
      },
      go: {
        method: 'client.Accounts.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\taccounts, err := client.Accounts.List(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", accounts)\n}\n',
      },
      http: {
        example:
          'curl http://localhost:23373/v1/accounts \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
      php: {
        method: 'accounts->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$accounts = $client->accounts->list();\n\nvar_dump($accounts);",
      },
      python: {
        method: 'accounts.list',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\naccounts = client.accounts.list()\nprint(accounts)',
      },
      typescript: {
        method: 'client.accounts.list',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst accounts = await client.accounts.list();\n\nconsole.log(accounts);",
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
      cli: {
        method: 'contacts search',
        example:
          "beeper-desktop-cli accounts:contacts search \\\n  --access-token 'My Access Token' \\\n  --account-id accountID \\\n  --query x",
      },
      go: {
        method: 'client.Accounts.Contacts.Search',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.Accounts.Contacts.Search(\n\t\tcontext.TODO(),\n\t\t"accountID",\n\t\tbeeperdesktopapi.AccountContactSearchParams{\n\t\t\tQuery: "x",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Items)\n}\n',
      },
      http: {
        example:
          'curl http://localhost:23373/v1/accounts/$ACCOUNT_ID/contacts \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
      php: {
        method: 'accounts->contacts->search',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->accounts->contacts->search('accountID', query: 'x');\n\nvar_dump($response);",
      },
      python: {
        method: 'accounts.contacts.search',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.accounts.contacts.search(\n    account_id="accountID",\n    query="x",\n)\nprint(response.items)',
      },
      typescript: {
        method: 'client.accounts.contacts.search',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.accounts.contacts.search('accountID', { query: 'x' });\n\nconsole.log(response.items);",
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
      cli: {
        method: 'contacts list',
        example:
          "beeper-desktop-cli accounts:contacts list \\\n  --access-token 'My Access Token' \\\n  --account-id accountID",
      },
      go: {
        method: 'client.Accounts.Contacts.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tpage, err := client.Accounts.Contacts.List(\n\t\tcontext.TODO(),\n\t\t"accountID",\n\t\tbeeperdesktopapi.AccountContactListParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl http://localhost:23373/v1/accounts/$ACCOUNT_ID/contacts/list \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
      php: {
        method: 'accounts->contacts->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$page = $client->accounts->contacts->list(\n  'accountID',\n  cursor: '1725489123456|c29tZUltc2dQYWdl',\n  direction: 'before',\n  limit: 1,\n  query: 'x',\n);\n\nvar_dump($page);",
      },
      python: {
        method: 'accounts.contacts.list',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\npage = client.accounts.contacts.list(\n    account_id="accountID",\n)\npage = page.items[0]\nprint(page.id)',
      },
      typescript: {
        method: 'client.accounts.contacts.list',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const user of client.accounts.contacts.list('accountID')) {\n  console.log(user.id);\n}",
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
      "{ id: string; accountID: string; participants: { hasMore: boolean; items: object[]; total: number; }; title: string; type: 'single' | 'group'; unreadCount: number; isArchived?: boolean; isMuted?: boolean; isPinned?: boolean; lastActivity?: string; lastReadMessageSortKey?: string; localChatID?: string; }",
    markdown:
      "## retrieve\n\n`client.chats.retrieve(chatID: string, maxParticipantCount?: number): { id: string; accountID: string; participants: object; title: string; type: 'single' | 'group'; unreadCount: number; isArchived?: boolean; isMuted?: boolean; isPinned?: boolean; lastActivity?: string; lastReadMessageSortKey?: string; localChatID?: string; }`\n\n**get** `/v1/chats/{chatID}`\n\nRetrieve chat details including metadata, participants, and latest message\n\n### Parameters\n\n- `chatID: string`\n  Unique identifier of the chat.\n\n- `maxParticipantCount?: number`\n  Maximum number of participants to return. Use -1 for all; otherwise 0–500. Defaults to all (-1).\n\n### Returns\n\n- `{ id: string; accountID: string; participants: { hasMore: boolean; items: object[]; total: number; }; title: string; type: 'single' | 'group'; unreadCount: number; isArchived?: boolean; isMuted?: boolean; isPinned?: boolean; lastActivity?: string; lastReadMessageSortKey?: string; localChatID?: string; }`\n\n  - `id: string`\n  - `accountID: string`\n  - `participants: { hasMore: boolean; items: { id: string; cannotMessage?: boolean; email?: string; fullName?: string; imgURL?: string; isSelf?: boolean; phoneNumber?: string; username?: string; }[]; total: number; }`\n  - `title: string`\n  - `type: 'single' | 'group'`\n  - `unreadCount: number`\n  - `isArchived?: boolean`\n  - `isMuted?: boolean`\n  - `isPinned?: boolean`\n  - `lastActivity?: string`\n  - `lastReadMessageSortKey?: string`\n  - `localChatID?: string`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst chat = await client.chats.retrieve('!NCdzlIaMjZUmvmvyHU:beeper.com');\n\nconsole.log(chat);\n```",
    perLanguage: {
      cli: {
        method: 'chats retrieve',
        example:
          "beeper-desktop-cli chats retrieve \\\n  --access-token 'My Access Token' \\\n  --chat-id '!NCdzlIaMjZUmvmvyHU:beeper.com'",
      },
      go: {
        method: 'client.Chats.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tchat, err := client.Chats.Get(\n\t\tcontext.TODO(),\n\t\t"!NCdzlIaMjZUmvmvyHU:beeper.com",\n\t\tbeeperdesktopapi.ChatGetParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", chat.ID)\n}\n',
      },
      http: {
        example:
          'curl http://localhost:23373/v1/chats/$CHAT_ID \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
      php: {
        method: 'chats->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$chat = $client->chats->retrieve(\n  '!NCdzlIaMjZUmvmvyHU:beeper.com', maxParticipantCount: 50\n);\n\nvar_dump($chat);",
      },
      python: {
        method: 'chats.retrieve',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nchat = client.chats.retrieve(\n    chat_id="!NCdzlIaMjZUmvmvyHU:beeper.com",\n)\nprint(chat.id)',
      },
      typescript: {
        method: 'client.chats.retrieve',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst chat = await client.chats.retrieve('!NCdzlIaMjZUmvmvyHU:beeper.com');\n\nconsole.log(chat.id);",
      },
    },
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
      "params?: { accountID: string; mode: 'start'; user: { id?: string; email?: string; fullName?: string; phoneNumber?: string; username?: string; }; allowInvite?: boolean; messageText?: string; } | { accountID: string; participantIDs: string[]; type: 'single' | 'group'; messageText?: string; mode?: 'create'; title?: string; };",
    ],
    response: "{ chatID: string; status?: 'existing' | 'created'; }",
    markdown:
      "## create\n\n`client.chats.create(params?: { accountID: string; mode: 'start'; user: { id?: string; email?: string; fullName?: string; phoneNumber?: string; username?: string; }; allowInvite?: boolean; messageText?: string; } | { accountID: string; participantIDs: string[]; type: 'single' | 'group'; messageText?: string; mode?: 'create'; title?: string; }): { chatID: string; status?: 'existing' | 'created'; }`\n\n**post** `/v1/chats`\n\nCreate a single/group chat (mode='create') or start a direct chat from merged user data (mode='start').\n\n### Parameters\n\n- `params?: { accountID: string; mode: 'start'; user: { id?: string; email?: string; fullName?: string; phoneNumber?: string; username?: string; }; allowInvite?: boolean; messageText?: string; } | { accountID: string; participantIDs: string[]; type: 'single' | 'group'; messageText?: string; mode?: 'create'; title?: string; }`\n\n### Returns\n\n- `{ chatID: string; status?: 'existing' | 'created'; }`\n\n  - `chatID: string`\n  - `status?: 'existing' | 'created'`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst chat = await client.chats.create();\n\nconsole.log(chat);\n```",
    perLanguage: {
      cli: {
        method: 'chats create',
        example: "beeper-desktop-cli chats create \\\n  --access-token 'My Access Token'",
      },
      go: {
        method: 'client.Chats.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tchat, err := client.Chats.New(context.TODO(), beeperdesktopapi.ChatNewParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", chat.ChatID)\n}\n',
      },
      http: {
        example:
          'curl http://localhost:23373/v1/chats \\\n    -X POST \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
      php: {
        method: 'chats->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$chat = $client->chats->create(\n  params: [\n    'accountID' => 'accountID',\n    'mode' => 'start',\n    'user' => [\n      'id' => 'id',\n      'email' => 'email',\n      'fullName' => 'fullName',\n      'phoneNumber' => 'phoneNumber',\n      'username' => 'username',\n    ],\n    'allowInvite' => true,\n    'messageText' => 'messageText',\n  ],\n);\n\nvar_dump($chat);",
      },
      python: {
        method: 'chats.create',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nchat = client.chats.create()\nprint(chat.chat_id)',
      },
      typescript: {
        method: 'client.chats.create',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst chat = await client.chats.create();\n\nconsole.log(chat.chatID);",
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
      "{ id: string; accountID: string; participants: { hasMore: boolean; items: user[]; total: number; }; title: string; type: 'single' | 'group'; unreadCount: number; isArchived?: boolean; isMuted?: boolean; isPinned?: boolean; lastActivity?: string; lastReadMessageSortKey?: string; localChatID?: string; }",
    markdown:
      "## list\n\n`client.chats.list(accountIDs?: string[], cursor?: string, direction?: 'after' | 'before'): object`\n\n**get** `/v1/chats`\n\nList all chats sorted by last activity (most recent first). Combines all accounts into a single paginated list.\n\n### Parameters\n\n- `accountIDs?: string[]`\n  Limit to specific account IDs. If omitted, fetches from all accounts.\n\n- `cursor?: string`\n  Opaque pagination cursor; do not inspect. Use together with 'direction'.\n\n- `direction?: 'after' | 'before'`\n  Pagination direction used with 'cursor': 'before' fetches older results, 'after' fetches newer results. Defaults to 'before' when only 'cursor' is provided.\n\n### Returns\n\n- `{ id: string; accountID: string; participants: { hasMore: boolean; items: user[]; total: number; }; title: string; type: 'single' | 'group'; unreadCount: number; isArchived?: boolean; isMuted?: boolean; isPinned?: boolean; lastActivity?: string; lastReadMessageSortKey?: string; localChatID?: string; }`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\n// Automatically fetches more pages as needed.\nfor await (const chatListResponse of client.chats.list()) {\n  console.log(chatListResponse);\n}\n```",
    perLanguage: {
      cli: {
        method: 'chats list',
        example: "beeper-desktop-cli chats list \\\n  --access-token 'My Access Token'",
      },
      go: {
        method: 'client.Chats.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tpage, err := client.Chats.List(context.TODO(), beeperdesktopapi.ChatListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl http://localhost:23373/v1/chats \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
      php: {
        method: 'chats->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$page = $client->chats->list(\n  accountIDs: [\n    'local-whatsapp_ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc',\n    'local-instagram_ba_eRfQMmnSNy_p7Ih7HL7RduRpKFU',\n  ],\n  cursor: '1725489123456|c29tZUltc2dQYWdl',\n  direction: 'before',\n);\n\nvar_dump($page);",
      },
      python: {
        method: 'chats.list',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\npage = client.chats.list()\npage = page.items[0]\nprint(page)',
      },
      typescript: {
        method: 'client.chats.list',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const chatListResponse of client.chats.list()) {\n  console.log(chatListResponse);\n}",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'chats search',
        example: "beeper-desktop-cli chats search \\\n  --access-token 'My Access Token'",
      },
      go: {
        method: 'client.Chats.Search',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tpage, err := client.Chats.Search(context.TODO(), beeperdesktopapi.ChatSearchParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl http://localhost:23373/v1/chats/search \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
      php: {
        method: 'chats->search',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$page = $client->chats->search(\n  accountIDs: [\n    'local-whatsapp_ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc',\n    'local-telegram_ba_QFrb5lrLPhO3OT5MFBeTWv0x4BI',\n  ],\n  cursor: '1725489123456|c29tZUltc2dQYWdl',\n  direction: 'before',\n  inbox: 'primary',\n  includeMuted: true,\n  lastActivityAfter: new \\DateTimeImmutable('2019-12-27T18:11:19.117Z'),\n  lastActivityBefore: new \\DateTimeImmutable('2019-12-27T18:11:19.117Z'),\n  limit: 1,\n  query: 'x',\n  scope: 'titles',\n  type: 'single',\n  unreadOnly: true,\n);\n\nvar_dump($page);",
      },
      python: {
        method: 'chats.search',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\npage = client.chats.search()\npage = page.items[0]\nprint(page.id)',
      },
      typescript: {
        method: 'client.chats.search',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const chat of client.chats.search()) {\n  console.log(chat.id);\n}",
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
      "## archive\n\n`client.chats.archive(chatID: string, archived?: boolean): void`\n\n**post** `/v1/chats/{chatID}/archive`\n\nArchive or unarchive a chat. Set archived=true to move to archive, archived=false to move back to inbox\n\n### Parameters\n\n- `chatID: string`\n  Unique identifier of the chat.\n\n- `archived?: boolean`\n  True to archive, false to unarchive\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nawait client.chats.archive('!NCdzlIaMjZUmvmvyHU:beeper.com')\n```",
    perLanguage: {
      cli: {
        method: 'chats archive',
        example:
          "beeper-desktop-cli chats archive \\\n  --access-token 'My Access Token' \\\n  --chat-id '!NCdzlIaMjZUmvmvyHU:beeper.com'",
      },
      go: {
        method: 'client.Chats.Archive',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\terr := client.Chats.Archive(\n\t\tcontext.TODO(),\n\t\t"!NCdzlIaMjZUmvmvyHU:beeper.com",\n\t\tbeeperdesktopapi.ChatArchiveParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl http://localhost:23373/v1/chats/$CHAT_ID/archive \\\n    -X POST \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
      php: {
        method: 'chats->archive',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$result = $client->chats->archive(\n  '!NCdzlIaMjZUmvmvyHU:beeper.com', archived: true\n);\n\nvar_dump($result);",
      },
      python: {
        method: 'chats.archive',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nclient.chats.archive(\n    chat_id="!NCdzlIaMjZUmvmvyHU:beeper.com",\n)',
      },
      typescript: {
        method: 'client.chats.archive',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nawait client.chats.archive('!NCdzlIaMjZUmvmvyHU:beeper.com');",
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
    params: ['chatID: string;', 'reminder: { remindAtMs: number; dismissOnIncomingMessage?: boolean; };'],
    markdown:
      "## create\n\n`client.chats.reminders.create(chatID: string, reminder: { remindAtMs: number; dismissOnIncomingMessage?: boolean; }): void`\n\n**post** `/v1/chats/{chatID}/reminders`\n\nSet a reminder for a chat at a specific time\n\n### Parameters\n\n- `chatID: string`\n  Unique identifier of the chat.\n\n- `reminder: { remindAtMs: number; dismissOnIncomingMessage?: boolean; }`\n  Reminder configuration\n  - `remindAtMs: number`\n    Unix timestamp in milliseconds when reminder should trigger\n  - `dismissOnIncomingMessage?: boolean`\n    Cancel reminder if someone messages in the chat\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nawait client.chats.reminders.create('!NCdzlIaMjZUmvmvyHU:beeper.com', { reminder: { remindAtMs: 0 } })\n```",
    perLanguage: {
      cli: {
        method: 'reminders create',
        example:
          "beeper-desktop-cli chats:reminders create \\\n  --access-token 'My Access Token' \\\n  --chat-id '!NCdzlIaMjZUmvmvyHU:beeper.com' \\\n  --reminder '{remindAtMs: 0}'",
      },
      go: {
        method: 'client.Chats.Reminders.New',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\terr := client.Chats.Reminders.New(\n\t\tcontext.TODO(),\n\t\t"!NCdzlIaMjZUmvmvyHU:beeper.com",\n\t\tbeeperdesktopapi.ChatReminderNewParams{\n\t\t\tReminder: beeperdesktopapi.ChatReminderNewParamsReminder{\n\t\t\t\tRemindAtMs: 0,\n\t\t\t},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl http://localhost:23373/v1/chats/$CHAT_ID/reminders \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN" \\\n    -d \'{\n          "reminder": {\n            "remindAtMs": 0\n          }\n        }\'',
      },
      php: {
        method: 'chats->reminders->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$result = $client->chats->reminders->create(\n  '!NCdzlIaMjZUmvmvyHU:beeper.com',\n  reminder: ['remindAtMs' => 0, 'dismissOnIncomingMessage' => true],\n);\n\nvar_dump($result);",
      },
      python: {
        method: 'chats.reminders.create',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nclient.chats.reminders.create(\n    chat_id="!NCdzlIaMjZUmvmvyHU:beeper.com",\n    reminder={\n        "remind_at_ms": 0\n    },\n)',
      },
      typescript: {
        method: 'client.chats.reminders.create',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nawait client.chats.reminders.create('!NCdzlIaMjZUmvmvyHU:beeper.com', {\n  reminder: { remindAtMs: 0 },\n});",
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
      "## delete\n\n`client.chats.reminders.delete(chatID: string): void`\n\n**delete** `/v1/chats/{chatID}/reminders`\n\nClear an existing reminder from a chat\n\n### Parameters\n\n- `chatID: string`\n  Unique identifier of the chat.\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nawait client.chats.reminders.delete('!NCdzlIaMjZUmvmvyHU:beeper.com')\n```",
    perLanguage: {
      cli: {
        method: 'reminders delete',
        example:
          "beeper-desktop-cli chats:reminders delete \\\n  --access-token 'My Access Token' \\\n  --chat-id '!NCdzlIaMjZUmvmvyHU:beeper.com'",
      },
      go: {
        method: 'client.Chats.Reminders.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\terr := client.Chats.Reminders.Delete(context.TODO(), "!NCdzlIaMjZUmvmvyHU:beeper.com")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl http://localhost:23373/v1/chats/$CHAT_ID/reminders \\\n    -X DELETE \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
      php: {
        method: 'chats->reminders->delete',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$result = $client->chats->reminders->delete('!NCdzlIaMjZUmvmvyHU:beeper.com');\n\nvar_dump($result);",
      },
      python: {
        method: 'chats.reminders.delete',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nclient.chats.reminders.delete(\n    "!NCdzlIaMjZUmvmvyHU:beeper.com",\n)',
      },
      typescript: {
        method: 'client.chats.reminders.delete',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nawait client.chats.reminders.delete('!NCdzlIaMjZUmvmvyHU:beeper.com');",
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
      "## add\n\n`client.chats.messages.reactions.add(chatID: string, messageID: string, reactionKey: string, transactionID?: string): { chatID: string; messageID: string; reactionKey: string; success: true; transactionID: string; }`\n\n**post** `/v1/chats/{chatID}/messages/{messageID}/reactions`\n\nAdd a reaction to an existing message.\n\n### Parameters\n\n- `chatID: string`\n  Unique identifier of the chat.\n\n- `messageID: string`\n\n- `reactionKey: string`\n  Reaction key to add (emoji, shortcode, or custom emoji key)\n\n- `transactionID?: string`\n  Optional transaction ID for deduplication and local echo tracking\n\n### Returns\n\n- `{ chatID: string; messageID: string; reactionKey: string; success: true; transactionID: string; }`\n\n  - `chatID: string`\n  - `messageID: string`\n  - `reactionKey: string`\n  - `success: true`\n  - `transactionID: string`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst response = await client.chats.messages.reactions.add('messageID', { chatID: '!NCdzlIaMjZUmvmvyHU:beeper.com', reactionKey: 'x' });\n\nconsole.log(response);\n```",
    perLanguage: {
      cli: {
        method: 'reactions add',
        example:
          "beeper-desktop-cli chats:messages:reactions add \\\n  --access-token 'My Access Token' \\\n  --chat-id '!NCdzlIaMjZUmvmvyHU:beeper.com' \\\n  --message-id messageID \\\n  --reaction-key x",
      },
      go: {
        method: 'client.Chats.Messages.Reactions.Add',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.Chats.Messages.Reactions.Add(\n\t\tcontext.TODO(),\n\t\t"messageID",\n\t\tbeeperdesktopapi.ChatMessageReactionAddParams{\n\t\t\tChatID:      "!NCdzlIaMjZUmvmvyHU:beeper.com",\n\t\t\tReactionKey: "x",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ChatID)\n}\n',
      },
      http: {
        example:
          'curl http://localhost:23373/v1/chats/$CHAT_ID/messages/$MESSAGE_ID/reactions \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN" \\\n    -d \'{\n          "reactionKey": "x"\n        }\'',
      },
      php: {
        method: 'chats->messages->reactions->add',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->chats->messages->reactions->add(\n  'messageID',\n  chatID: '!NCdzlIaMjZUmvmvyHU:beeper.com',\n  reactionKey: 'x',\n  transactionID: 'transactionID',\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'chats.messages.reactions.add',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.chats.messages.reactions.add(\n    message_id="messageID",\n    chat_id="!NCdzlIaMjZUmvmvyHU:beeper.com",\n    reaction_key="x",\n)\nprint(response.chat_id)',
      },
      typescript: {
        method: 'client.chats.messages.reactions.add',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.chats.messages.reactions.add('messageID', {\n  chatID: '!NCdzlIaMjZUmvmvyHU:beeper.com',\n  reactionKey: 'x',\n});\n\nconsole.log(response.chatID);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'reactions delete',
        example:
          "beeper-desktop-cli chats:messages:reactions delete \\\n  --access-token 'My Access Token' \\\n  --chat-id '!NCdzlIaMjZUmvmvyHU:beeper.com' \\\n  --message-id messageID \\\n  --reaction-key x",
      },
      go: {
        method: 'client.Chats.Messages.Reactions.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\treaction, err := client.Chats.Messages.Reactions.Delete(\n\t\tcontext.TODO(),\n\t\t"messageID",\n\t\tbeeperdesktopapi.ChatMessageReactionDeleteParams{\n\t\t\tChatID:      "!NCdzlIaMjZUmvmvyHU:beeper.com",\n\t\t\tReactionKey: "x",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", reaction.ChatID)\n}\n',
      },
      http: {
        example:
          'curl http://localhost:23373/v1/chats/$CHAT_ID/messages/$MESSAGE_ID/reactions \\\n    -X DELETE \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
      php: {
        method: 'chats->messages->reactions->delete',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$reaction = $client->chats->messages->reactions->delete(\n  'messageID', chatID: '!NCdzlIaMjZUmvmvyHU:beeper.com', reactionKey: 'x'\n);\n\nvar_dump($reaction);",
      },
      python: {
        method: 'chats.messages.reactions.delete',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nreaction = client.chats.messages.reactions.delete(\n    message_id="messageID",\n    chat_id="!NCdzlIaMjZUmvmvyHU:beeper.com",\n    reaction_key="x",\n)\nprint(reaction.chat_id)',
      },
      typescript: {
        method: 'client.chats.messages.reactions.delete',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst reaction = await client.chats.messages.reactions.delete('messageID', {\n  chatID: '!NCdzlIaMjZUmvmvyHU:beeper.com',\n  reactionKey: 'x',\n});\n\nconsole.log(reaction.chatID);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'messages search',
        example: "beeper-desktop-cli messages search \\\n  --access-token 'My Access Token'",
      },
      go: {
        method: 'client.Messages.Search',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tpage, err := client.Messages.Search(context.TODO(), beeperdesktopapi.MessageSearchParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl http://localhost:23373/v1/messages/search \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
      php: {
        method: 'messages->search',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$page = $client->messages->search(\n  accountIDs: [\n    'local-whatsapp_ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc',\n    'local-instagram_ba_eRfQMmnSNy_p7Ih7HL7RduRpKFU',\n  ],\n  chatIDs: ['!NCdzlIaMjZUmvmvyHU:beeper.com', '1231073'],\n  chatType: 'group',\n  cursor: '1725489123456|c29tZUltc2dQYWdl',\n  dateAfter: new \\DateTimeImmutable('2025-08-01T00:00:00Z'),\n  dateBefore: new \\DateTimeImmutable('2025-08-31T23:59:59Z'),\n  direction: 'before',\n  excludeLowPriority: true,\n  includeMuted: true,\n  limit: 20,\n  mediaTypes: ['any'],\n  query: 'dinner',\n  sender: 'sender',\n);\n\nvar_dump($page);",
      },
      python: {
        method: 'messages.search',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\npage = client.messages.search()\npage = page.items[0]\nprint(page.id)',
      },
      typescript: {
        method: 'client.messages.search',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const message of client.messages.search()) {\n  console.log(message.id);\n}",
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
      "{ id: string; accountID: string; chatID: string; senderID: string; sortKey: string; timestamp: string; attachments?: { type: 'unknown' | 'img' | 'video' | 'audio'; id?: string; duration?: number; fileName?: string; fileSize?: number; isGif?: boolean; isSticker?: boolean; isVoiceNote?: boolean; mimeType?: string; posterImg?: string; size?: object; srcURL?: string; }[]; isSender?: boolean; isUnread?: boolean; linkedMessageID?: string; reactions?: { id: string; participantID: string; reactionKey: string; emoji?: boolean; imgURL?: string; }[]; senderName?: string; text?: string; type?: string; }",
    markdown:
      "## list\n\n`client.messages.list(chatID: string, cursor?: string, direction?: 'after' | 'before'): { id: string; accountID: string; chatID: string; senderID: string; sortKey: string; timestamp: string; attachments?: attachment[]; isSender?: boolean; isUnread?: boolean; linkedMessageID?: string; reactions?: reaction[]; senderName?: string; text?: string; type?: string; }`\n\n**get** `/v1/chats/{chatID}/messages`\n\nList all messages in a chat with cursor-based pagination. Sorted by timestamp.\n\n### Parameters\n\n- `chatID: string`\n  Unique identifier of the chat.\n\n- `cursor?: string`\n  Opaque pagination cursor; do not inspect. Use together with 'direction'.\n\n- `direction?: 'after' | 'before'`\n  Pagination direction used with 'cursor': 'before' fetches older results, 'after' fetches newer results. Defaults to 'before' when only 'cursor' is provided.\n\n### Returns\n\n- `{ id: string; accountID: string; chatID: string; senderID: string; sortKey: string; timestamp: string; attachments?: { type: 'unknown' | 'img' | 'video' | 'audio'; id?: string; duration?: number; fileName?: string; fileSize?: number; isGif?: boolean; isSticker?: boolean; isVoiceNote?: boolean; mimeType?: string; posterImg?: string; size?: object; srcURL?: string; }[]; isSender?: boolean; isUnread?: boolean; linkedMessageID?: string; reactions?: { id: string; participantID: string; reactionKey: string; emoji?: boolean; imgURL?: string; }[]; senderName?: string; text?: string; type?: string; }`\n\n  - `id: string`\n  - `accountID: string`\n  - `chatID: string`\n  - `senderID: string`\n  - `sortKey: string`\n  - `timestamp: string`\n  - `attachments?: { type: 'unknown' | 'img' | 'video' | 'audio'; id?: string; duration?: number; fileName?: string; fileSize?: number; isGif?: boolean; isSticker?: boolean; isVoiceNote?: boolean; mimeType?: string; posterImg?: string; size?: { height?: number; width?: number; }; srcURL?: string; }[]`\n  - `isSender?: boolean`\n  - `isUnread?: boolean`\n  - `linkedMessageID?: string`\n  - `reactions?: { id: string; participantID: string; reactionKey: string; emoji?: boolean; imgURL?: string; }[]`\n  - `senderName?: string`\n  - `text?: string`\n  - `type?: string`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\n// Automatically fetches more pages as needed.\nfor await (const message of client.messages.list('!NCdzlIaMjZUmvmvyHU:beeper.com')) {\n  console.log(message);\n}\n```",
    perLanguage: {
      cli: {
        method: 'messages list',
        example:
          "beeper-desktop-cli messages list \\\n  --access-token 'My Access Token' \\\n  --chat-id '!NCdzlIaMjZUmvmvyHU:beeper.com'",
      },
      go: {
        method: 'client.Messages.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tpage, err := client.Messages.List(\n\t\tcontext.TODO(),\n\t\t"!NCdzlIaMjZUmvmvyHU:beeper.com",\n\t\tbeeperdesktopapi.MessageListParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl http://localhost:23373/v1/chats/$CHAT_ID/messages \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
      php: {
        method: 'messages->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$page = $client->messages->list(\n  '!NCdzlIaMjZUmvmvyHU:beeper.com',\n  cursor: '1725489123456|c29tZUltc2dQYWdl',\n  direction: 'before',\n);\n\nvar_dump($page);",
      },
      python: {
        method: 'messages.list',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\npage = client.messages.list(\n    chat_id="!NCdzlIaMjZUmvmvyHU:beeper.com",\n)\npage = page.items[0]\nprint(page.id)',
      },
      typescript: {
        method: 'client.messages.list',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const message of client.messages.list('!NCdzlIaMjZUmvmvyHU:beeper.com')) {\n  console.log(message.id);\n}",
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
      "attachment?: { uploadID: string; duration?: number; fileName?: string; mimeType?: string; size?: { height: number; width: number; }; type?: 'gif' | 'voiceNote' | 'sticker'; };",
      'replyToMessageID?: string;',
      'text?: string;',
    ],
    response: '{ chatID: string; pendingMessageID: string; }',
    markdown:
      "## send\n\n`client.messages.send(chatID: string, attachment?: { uploadID: string; duration?: number; fileName?: string; mimeType?: string; size?: { height: number; width: number; }; type?: 'gif' | 'voiceNote' | 'sticker'; }, replyToMessageID?: string, text?: string): { chatID: string; pendingMessageID: string; }`\n\n**post** `/v1/chats/{chatID}/messages`\n\nSend a text message to a specific chat. Supports replying to existing messages. Returns a pending message ID.\n\n### Parameters\n\n- `chatID: string`\n  Unique identifier of the chat.\n\n- `attachment?: { uploadID: string; duration?: number; fileName?: string; mimeType?: string; size?: { height: number; width: number; }; type?: 'gif' | 'voiceNote' | 'sticker'; }`\n  Single attachment to send with the message\n  - `uploadID: string`\n    Upload ID from uploadAsset endpoint. Required to reference uploaded files.\n  - `duration?: number`\n    Duration in seconds (optional override of cached value)\n  - `fileName?: string`\n    Filename (optional override of cached value)\n  - `mimeType?: string`\n    MIME type (optional override of cached value)\n  - `size?: { height: number; width: number; }`\n    Dimensions (optional override of cached value)\n  - `type?: 'gif' | 'voiceNote' | 'sticker'`\n    Special attachment type (gif, voiceNote, sticker). If omitted, auto-detected from mimeType\n\n- `replyToMessageID?: string`\n  Provide a message ID to send this as a reply to an existing message\n\n- `text?: string`\n  Text content of the message you want to send. You may use markdown.\n\n### Returns\n\n- `{ chatID: string; pendingMessageID: string; }`\n\n  - `chatID: string`\n  - `pendingMessageID: string`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst response = await client.messages.send('!NCdzlIaMjZUmvmvyHU:beeper.com');\n\nconsole.log(response);\n```",
    perLanguage: {
      cli: {
        method: 'messages send',
        example:
          "beeper-desktop-cli messages send \\\n  --access-token 'My Access Token' \\\n  --chat-id '!NCdzlIaMjZUmvmvyHU:beeper.com'",
      },
      go: {
        method: 'client.Messages.Send',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.Messages.Send(\n\t\tcontext.TODO(),\n\t\t"!NCdzlIaMjZUmvmvyHU:beeper.com",\n\t\tbeeperdesktopapi.MessageSendParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.PendingMessageID)\n}\n',
      },
      http: {
        example:
          'curl http://localhost:23373/v1/chats/$CHAT_ID/messages \\\n    -X POST \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
      php: {
        method: 'messages->send',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->messages->send(\n  '!NCdzlIaMjZUmvmvyHU:beeper.com',\n  attachment: [\n    'uploadID' => 'uploadID',\n    'duration' => 0,\n    'fileName' => 'fileName',\n    'mimeType' => 'mimeType',\n    'size' => ['height' => 0, 'width' => 0],\n    'type' => 'gif',\n  ],\n  replyToMessageID: 'replyToMessageID',\n  text: 'text',\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'messages.send',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.messages.send(\n    chat_id="!NCdzlIaMjZUmvmvyHU:beeper.com",\n)\nprint(response.pending_message_id)',
      },
      typescript: {
        method: 'client.messages.send',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.messages.send('!NCdzlIaMjZUmvmvyHU:beeper.com');\n\nconsole.log(response.pendingMessageID);",
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
    response: '{ chatID: string; messageID: string; success: boolean; }',
    markdown:
      "## update\n\n`client.messages.update(chatID: string, messageID: string, text: string): { chatID: string; messageID: string; success: boolean; }`\n\n**put** `/v1/chats/{chatID}/messages/{messageID}`\n\nEdit the text content of an existing message. Messages with attachments cannot be edited.\n\n### Parameters\n\n- `chatID: string`\n  Unique identifier of the chat.\n\n- `messageID: string`\n\n- `text: string`\n  New text content for the message\n\n### Returns\n\n- `{ chatID: string; messageID: string; success: boolean; }`\n\n  - `chatID: string`\n  - `messageID: string`\n  - `success: boolean`\n\n### Example\n\n```typescript\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst message = await client.messages.update('messageID', { chatID: '!NCdzlIaMjZUmvmvyHU:beeper.com', text: 'x' });\n\nconsole.log(message);\n```",
    perLanguage: {
      cli: {
        method: 'messages update',
        example:
          "beeper-desktop-cli messages update \\\n  --access-token 'My Access Token' \\\n  --chat-id '!NCdzlIaMjZUmvmvyHU:beeper.com' \\\n  --message-id messageID \\\n  --text x",
      },
      go: {
        method: 'client.Messages.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tmessage, err := client.Messages.Update(\n\t\tcontext.TODO(),\n\t\t"messageID",\n\t\tbeeperdesktopapi.MessageUpdateParams{\n\t\t\tChatID: "!NCdzlIaMjZUmvmvyHU:beeper.com",\n\t\t\tText:   "x",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", message.ChatID)\n}\n',
      },
      http: {
        example:
          'curl http://localhost:23373/v1/chats/$CHAT_ID/messages/$MESSAGE_ID \\\n    -X PUT \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN" \\\n    -d \'{\n          "text": "x"\n        }\'',
      },
      php: {
        method: 'messages->update',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$message = $client->messages->update(\n  'messageID', chatID: '!NCdzlIaMjZUmvmvyHU:beeper.com', text: 'x'\n);\n\nvar_dump($message);",
      },
      python: {
        method: 'messages.update',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nmessage = client.messages.update(\n    message_id="messageID",\n    chat_id="!NCdzlIaMjZUmvmvyHU:beeper.com",\n    text="x",\n)\nprint(message.chat_id)',
      },
      typescript: {
        method: 'client.messages.update',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst message = await client.messages.update('messageID', {\n  chatID: '!NCdzlIaMjZUmvmvyHU:beeper.com',\n  text: 'x',\n});\n\nconsole.log(message.chatID);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'assets download',
        example:
          "beeper-desktop-cli assets download \\\n  --access-token 'My Access Token' \\\n  --url mxc://example.org/Q4x9CqGz1pB3Oa6XgJ",
      },
      go: {
        method: 'client.Assets.Download',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.Assets.Download(context.TODO(), beeperdesktopapi.AssetDownloadParams{\n\t\tURL: "mxc://example.org/Q4x9CqGz1pB3Oa6XgJ",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Error)\n}\n',
      },
      http: {
        example:
          'curl http://localhost:23373/v1/assets/download \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN" \\\n    -d \'{\n          "url": "mxc://example.org/Q4x9CqGz1pB3Oa6XgJ"\n        }\'',
      },
      php: {
        method: 'assets->download',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->assets->download(\n  url: 'mxc://example.org/Q4x9CqGz1pB3Oa6XgJ'\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'assets.download',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.assets.download(\n    url="mxc://example.org/Q4x9CqGz1pB3Oa6XgJ",\n)\nprint(response.error)',
      },
      typescript: {
        method: 'client.assets.download',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.assets.download({ url: 'mxc://example.org/Q4x9CqGz1pB3Oa6XgJ' });\n\nconsole.log(response.error);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'assets upload',
        example:
          "beeper-desktop-cli assets upload \\\n  --access-token 'My Access Token' \\\n  --file 'Example data'",
      },
      go: {
        method: 'client.Assets.Upload',
        example:
          'package main\n\nimport (\n\t"bytes"\n\t"context"\n\t"fmt"\n\t"io"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.Assets.Upload(context.TODO(), beeperdesktopapi.AssetUploadParams{\n\t\tFile: io.Reader(bytes.NewBuffer([]byte("Example data"))),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Width)\n}\n',
      },
      http: {
        example:
          "curl http://localhost:23373/v1/assets/upload \\\n    -H 'Content-Type: multipart/form-data' \\\n    -H \"Authorization: Bearer $BEEPER_ACCESS_TOKEN\" \\\n    -F 'file=@/path/to/file'",
      },
      php: {
        method: 'assets->upload',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->assets->upload(\n  file: FileParam::fromString('Example data', filename: uniqid('file-upload-', true)),\n  fileName: 'fileName',\n  mimeType: 'mimeType',\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'assets.upload',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.assets.upload(\n    file=b"Example data",\n)\nprint(response.width)',
      },
      typescript: {
        method: 'client.assets.upload',
        example:
          "import fs from 'fs';\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.assets.upload({ file: fs.createReadStream('path/to/file') });\n\nconsole.log(response.width);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'assets upload_base64',
        example:
          "beeper-desktop-cli assets upload-base64 \\\n  --access-token 'My Access Token' \\\n  --content x",
      },
      go: {
        method: 'client.Assets.UploadBase64',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tresponse, err := client.Assets.UploadBase64(context.TODO(), beeperdesktopapi.AssetUploadBase64Params{\n\t\tContent: "x",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Width)\n}\n',
      },
      http: {
        example:
          'curl http://localhost:23373/v1/assets/upload/base64 \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN" \\\n    -d \'{\n          "content": "x"\n        }\'',
      },
      php: {
        method: 'assets->uploadBase64',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$response = $client->assets->uploadBase64(\n  content: 'x', fileName: 'fileName', mimeType: 'mimeType'\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'assets.upload_base64',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.assets.upload_base64(\n    content="x",\n)\nprint(response.width)',
      },
      typescript: {
        method: 'client.assets.uploadBase64',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.assets.uploadBase64({ content: 'x' });\n\nconsole.log(response.width);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'assets serve',
        example: "beeper-desktop-cli assets serve \\\n  --access-token 'My Access Token' \\\n  --url x",
      },
      go: {
        method: 'client.Assets.Serve',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\terr := client.Assets.Serve(context.TODO(), beeperdesktopapi.AssetServeParams{\n\t\tURL: "x",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl http://localhost:23373/v1/assets/serve \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
      php: {
        method: 'assets->serve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$result = $client->assets->serve(url: 'x');\n\nvar_dump($result);",
      },
      python: {
        method: 'assets.serve',
        example:
          'import os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\nclient.assets.serve(\n    url="x",\n)',
      },
      typescript: {
        method: 'client.assets.serve',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nawait client.assets.serve({ url: 'x' });",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'info retrieve',
        example: "beeper-desktop-cli info retrieve \\\n  --access-token 'My Access Token'",
      },
      go: {
        method: 'client.Info.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"),\n\t)\n\tinfo, err := client.Info.Get(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", info.App)\n}\n',
      },
      http: {
        example:
          'curl http://localhost:23373/v1/info \\\n    -H "Authorization: Bearer $BEEPER_ACCESS_TOKEN"',
      },
      php: {
        method: 'info->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(accessToken: 'My Access Token');\n\n$info = $client->info->retrieve();\n\nvar_dump($info);",
      },
      python: {
        method: 'info.retrieve',
        example:
          'from beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop()\ninfo = client.info.retrieve()\nprint(info.app)',
      },
      typescript: {
        method: 'client.info.retrieve',
        example:
          "import BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\nconst info = await client.info.retrieve();\n\nconsole.log(info.app);",
      },
    },
  },
];

const EMBEDDED_READMES: { language: string; content: string }[] = [
  {
    language: 'python',
    content:
      '# Beeper Desktop Python API library\n\n<!-- prettier-ignore -->\n[![PyPI version](https://img.shields.io/pypi/v/beeper_desktop_api.svg?label=pypi%20(stable))](https://pypi.org/project/beeper_desktop_api/)\n\nThe Beeper Desktop Python library provides convenient access to the Beeper Desktop REST API from any Python 3.9+\napplication. The library includes type definitions for all request params and response fields,\nand offers both synchronous and asynchronous clients powered by [httpx](https://github.com/encode/httpx).\n\n\n\n\n\n## MCP Server\n\nUse the Beeper Desktop MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40beeper%2Fdesktop-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBiZWVwZXIvZGVza3RvcC1tY3AiXSwiZW52Ijp7IkJFRVBFUl9BQ0NFU1NfVE9LRU4iOiJNeSBBY2Nlc3MgVG9rZW4ifX0)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40beeper%2Fdesktop-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40beeper%2Fdesktop-mcp%22%5D%2C%22env%22%3A%7B%22BEEPER_ACCESS_TOKEN%22%3A%22My%20Access%20Token%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Documentation\n\nThe REST API documentation can be found on [developers.beeper.com](https://developers.beeper.com/desktop-api/). The full API of this library can be found in [api.md](api.md).\n\n## Installation\n\n```sh\n# install from the production repo\npip install git+ssh://git@github.com/beeper/desktop-api-python.git\n```\n> [!NOTE]\n> Once this package is [published to PyPI](https://www.stainless.com/docs/guides/publish), this will become: `pip install beeper_desktop_api`\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```python\nimport os\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\n\npage = client.chats.search(\n    include_muted=True,\n    limit=3,\n    type="single",\n)\nprint(page.items)\n```\n\nWhile you can provide a `access_token` keyword argument,\nwe recommend using [python-dotenv](https://pypi.org/project/python-dotenv/)\nto add `BEEPER_ACCESS_TOKEN="My Access Token"` to your `.env` file\nso that your Access Token is not stored in source control.\n\n## Async usage\n\nSimply import `AsyncBeeperDesktop` instead of `BeeperDesktop` and use `await` with each API call:\n\n```python\nimport os\nimport asyncio\nfrom beeper_desktop_api import AsyncBeeperDesktop\n\nclient = AsyncBeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n)\n\nasync def main() -> None:\n  page = await client.chats.search(\n      include_muted=True,\n      limit=3,\n      type="single",\n  )\n  print(page.items)\n\nasyncio.run(main())\n```\n\nFunctionality between the synchronous and asynchronous clients is otherwise identical.\n\n### With aiohttp\n\nBy default, the async client uses `httpx` for HTTP requests. However, for improved concurrency performance you may also use `aiohttp` as the HTTP backend.\n\nYou can enable this by installing `aiohttp`:\n\n```sh\n# install from the production repo\npip install \'beeper_desktop_api[aiohttp] @ git+ssh://git@github.com/beeper/desktop-api-python.git\'\n```\n\nThen you can enable it by instantiating the client with `http_client=DefaultAioHttpClient()`:\n\n```python\nimport os\nimport asyncio\nfrom beeper_desktop_api import DefaultAioHttpClient\nfrom beeper_desktop_api import AsyncBeeperDesktop\n\nasync def main() -> None:\n  async with AsyncBeeperDesktop(\n    access_token=os.environ.get("BEEPER_ACCESS_TOKEN"),  # This is the default and can be omitted\n    http_client=DefaultAioHttpClient(),\n) as client:\n    page = await client.chats.search(\n        include_muted=True,\n        limit=3,\n        type="single",\n    )\n    print(page.items)\n\nasyncio.run(main())\n```\n\n\n\n## Using types\n\nNested request parameters are [TypedDicts](https://docs.python.org/3/library/typing.html#typing.TypedDict). Responses are [Pydantic models](https://docs.pydantic.dev) which also provide helper methods for things like:\n\n- Serializing back into JSON, `model.to_json()`\n- Converting to a dictionary, `model.to_dict()`\n\nTyped requests and responses provide autocomplete and documentation within your editor. If you would like to see type errors in VS Code to help catch bugs earlier, set `python.analysis.typeCheckingMode` to `basic`.\n\n## Pagination\n\nList methods in the Beeper Desktop API are paginated.\n\nThis library provides auto-paginating iterators with each list response, so you do not have to request successive pages manually:\n\n```python\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop()\n\nall_messages = []\n# Automatically fetches more pages as needed.\nfor message in client.messages.search(\n    account_ids=["local-telegram_ba_QFrb5lrLPhO3OT5MFBeTWv0x4BI"],\n    limit=10,\n    query="deployment",\n):\n    # Do something with message here\n    all_messages.append(message)\nprint(all_messages)\n```\n\nOr, asynchronously:\n\n```python\nimport asyncio\nfrom beeper_desktop_api import AsyncBeeperDesktop\n\nclient = AsyncBeeperDesktop()\n\nasync def main() -> None:\n    all_messages = []\n    # Iterate through items across all pages, issuing requests as needed.\n    async for message in client.messages.search(\n    account_ids=["local-telegram_ba_QFrb5lrLPhO3OT5MFBeTWv0x4BI"],\n    limit=10,\n    query="deployment",\n):\n        all_messages.append(message)\n    print(all_messages)\n\nasyncio.run(main())\n```\n\nAlternatively, you can use the `.has_next_page()`, `.next_page_info()`, or  `.get_next_page()` methods for more granular control working with pages:\n\n```python\nfirst_page = await client.messages.search(\n    account_ids=["local-telegram_ba_QFrb5lrLPhO3OT5MFBeTWv0x4BI"],\n    limit=10,\n    query="deployment",\n)\nif first_page.has_next_page():\n    print(f"will fetch next page using these details: {first_page.next_page_info()}")\n    next_page = await first_page.get_next_page()\n    print(f"number of items we just fetched: {len(next_page.items)}")\n\n# Remove `await` for non-async usage.\n```\n\nOr just work directly with the returned data:\n\n```python\nfirst_page = await client.messages.search(\n    account_ids=["local-telegram_ba_QFrb5lrLPhO3OT5MFBeTWv0x4BI"],\n    limit=10,\n    query="deployment",\n)\n\nprint(f"next page cursor: {first_page.oldest_cursor}") # => "next page cursor: ..."\nfor message in first_page.items:\n    print(message.id)\n\n# Remove `await` for non-async usage.\n```\n\n## Nested params\n\nNested parameters are dictionaries, typed using `TypedDict`, for example:\n\n```python\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop()\n\nclient.chats.reminders.create(\n    chat_id="!NCdzlIaMjZUmvmvyHU:beeper.com",\n    reminder={\n        "remind_at_ms": 0\n    },\n)\n```\n\n## File uploads\n\nRequest parameters that correspond to file uploads can be passed as `bytes`, or a [`PathLike`](https://docs.python.org/3/library/os.html#os.PathLike) instance or a tuple of `(filename, contents, media type)`.\n\n```python\nfrom pathlib import Path\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop()\n\nclient.assets.upload(\n    file=Path("/path/to/file"),\n)\n```\n\nThe async client uses the exact same interface. If you pass a [`PathLike`](https://docs.python.org/3/library/os.html#os.PathLike) instance, the file contents will be read asynchronously automatically.\n\n## Handling errors\n\nWhen the library is unable to connect to the API (for example, due to network connection problems or a timeout), a subclass of `beeper_desktop_api.APIConnectionError` is raised.\n\nWhen the API returns a non-success status code (that is, 4xx or 5xx\nresponse), a subclass of `beeper_desktop_api.APIStatusError` is raised, containing `status_code` and `response` properties.\n\nAll errors inherit from `beeper_desktop_api.APIError`.\n\n```python\nimport beeper_desktop_api\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop()\n\ntry:\n    client.accounts.list()\nexcept beeper_desktop_api.APIConnectionError as e:\n    print("The server could not be reached")\n    print(e.__cause__) # an underlying Exception, likely raised within httpx.\nexcept beeper_desktop_api.RateLimitError as e:\n    print("A 429 status code was received; we should back off a bit.")\nexcept beeper_desktop_api.APIStatusError as e:\n    print("Another non-200-range status code was received")\n    print(e.status_code)\n    print(e.response)\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors are automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors are all retried by default.\n\nYou can use the `max_retries` option to configure or disable retry settings:\n\n```python\nfrom beeper_desktop_api import BeeperDesktop\n\n# Configure the default for all requests:\nclient = BeeperDesktop(\n    # default is 2\n    max_retries=0,\n)\n\n# Or, configure per-request:\nclient.with_options(max_retries = 5).accounts.list()\n```\n\n### Timeouts\n\nBy default requests time out after 30 seconds. You can configure this with a `timeout` option,\nwhich accepts a float or an [`httpx.Timeout`](https://www.python-httpx.org/advanced/timeouts/#fine-tuning-the-configuration) object:\n\n```python\nfrom beeper_desktop_api import BeeperDesktop\n\n# Configure the default for all requests:\nclient = BeeperDesktop(\n    # 20 seconds (default is 30 seconds)\n    timeout=20.0,\n)\n\n# More granular control:\nclient = BeeperDesktop(\n    timeout=httpx.Timeout(60.0, read=5.0, write=10.0, connect=2.0),\n)\n\n# Override per-request:\nclient.with_options(timeout = 5.0).accounts.list()\n```\n\nOn timeout, an `APITimeoutError` is thrown.\n\nNote that requests that time out are [retried twice by default](#retries).\n\n\n\n## Advanced\n\n### Logging\n\nWe use the standard library [`logging`](https://docs.python.org/3/library/logging.html) module.\n\nYou can enable logging by setting the environment variable `BEEPER_DESKTOP_LOG` to `info`.\n\n```shell\n$ export BEEPER_DESKTOP_LOG=info\n```\n\nOr to `debug` for more verbose logging.\n\n### How to tell whether `None` means `null` or missing\n\nIn an API response, a field may be explicitly `null`, or missing entirely; in either case, its value is `None` in this library. You can differentiate the two cases with `.model_fields_set`:\n\n```py\nif response.my_field is None:\n  if \'my_field\' not in response.model_fields_set:\n    print(\'Got json like {}, without a "my_field" key present at all.\')\n  else:\n    print(\'Got json like {"my_field": null}.\')\n```\n\n### Accessing raw response data (e.g. headers)\n\nThe "raw" Response object can be accessed by prefixing `.with_raw_response.` to any HTTP method call, e.g.,\n\n```py\nfrom beeper_desktop_api import BeeperDesktop\n\nclient = BeeperDesktop()\nresponse = client.accounts.with_raw_response.list()\nprint(response.headers.get(\'X-My-Header\'))\n\naccount = response.parse()  # get the object that `accounts.list()` would have returned\nprint(account)\n```\n\nThese methods return an [`APIResponse`](https://github.com/beeper/desktop-api-python/tree/main/src/beeper_desktop_api/_response.py) object.\n\nThe async client returns an [`AsyncAPIResponse`](https://github.com/beeper/desktop-api-python/tree/main/src/beeper_desktop_api/_response.py) with the same structure, the only difference being `await`able methods for reading the response content.\n\n#### `.with_streaming_response`\n\nThe above interface eagerly reads the full response body when you make the request, which may not always be what you want.\n\nTo stream the response body, use `.with_streaming_response` instead, which requires a context manager and only reads the response body once you call `.read()`, `.text()`, `.json()`, `.iter_bytes()`, `.iter_text()`, `.iter_lines()` or `.parse()`. In the async client, these are async methods.\n\n```python\nwith client.accounts.with_streaming_response.list() as response :\n    print(response.headers.get(\'X-My-Header\'))\n\n    for line in response.iter_lines():\n      print(line)\n```\n\nThe context manager is required so that the response will reliably be closed.\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API.\n\nIf you need to access undocumented endpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can make requests using `client.get`, `client.post`, and other\nhttp verbs. Options on the client will be respected (such as retries) when making this request.\n\n```py\nimport httpx\n\nresponse = client.post(\n    "/foo",\n    cast_to=httpx.Response,\n    body={"my_param": True},\n)\n\nprint(response.headers.get("x-foo"))\n```\n\n#### Undocumented request params\n\nIf you want to explicitly send an extra param, you can do so with the `extra_query`, `extra_body`, and `extra_headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you can access the extra fields like `response.unknown_prop`. You\ncan also get all the extra fields on the Pydantic model as a dict with\n[`response.model_extra`](https://docs.pydantic.dev/latest/api/base_model/#pydantic.BaseModel.model_extra).\n\n### Configuring the HTTP client\n\nYou can directly override the [httpx client](https://www.python-httpx.org/api/#client) to customize it for your use case, including:\n\n- Support for [proxies](https://www.python-httpx.org/advanced/proxies/)\n- Custom [transports](https://www.python-httpx.org/advanced/transports/)\n- Additional [advanced](https://www.python-httpx.org/advanced/clients/) functionality\n\n```python\nimport httpx\nfrom beeper_desktop_api import BeeperDesktop, DefaultHttpxClient\n\nclient = BeeperDesktop(\n    # Or use the `BEEPER_DESKTOP_BASE_URL` env var\n    base_url="http://my.test.server.example.com:8083",\n    http_client=DefaultHttpxClient(proxy="http://my.test.proxy.example.com", transport=httpx.HTTPTransport(local_address="0.0.0.0")),\n)\n```\n\nYou can also customize the client on a per-request basis by using `with_options()`:\n\n```python\nclient.with_options(http_client=DefaultHttpxClient(...))\n```\n\n### Managing HTTP resources\n\nBy default the library closes underlying HTTP connections whenever the client is [garbage collected](https://docs.python.org/3/reference/datamodel.html#object.__del__). You can manually close the client using the `.close()` method if desired, or with a context manager that closes when exiting.\n\n```py\nfrom beeper_desktop_api import BeeperDesktop\n\nwith BeeperDesktop() as client:\n  # make requests here\n  ...\n\n# HTTP client is now closed\n```\n\n## Versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/beeper/desktop-api-python/issues) with questions, bugs, or suggestions.\n\n### Determining the installed version\n\nIf you\'ve upgraded to the latest version but aren\'t seeing any new features you were expecting then your python environment is likely still using an older version.\n\nYou can determine the version that is being used at runtime with:\n\n```py\nimport beeper_desktop_api\nprint(beeper_desktop_api.__version__)\n```\n\n## Requirements\n\nPython 3.9 or higher.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'go',
    content:
      '# Beeper Desktop Go API Library\n\n<a href="https://pkg.go.dev/github.com/beeper/desktop-api-go"><img src="https://pkg.go.dev/badge/github.com/beeper/desktop-api-go.svg" alt="Go Reference"></a>\n\nThe Beeper Desktop Go library provides convenient access to the [Beeper Desktop REST API](https://developers.beeper.com/desktop-api/)\nfrom applications written in Go.\n\n\n\n## MCP Server\n\nUse the Beeper Desktop MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40beeper%2Fdesktop-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBiZWVwZXIvZGVza3RvcC1tY3AiXSwiZW52Ijp7IkJFRVBFUl9BQ0NFU1NfVE9LRU4iOiJNeSBBY2Nlc3MgVG9rZW4ifX0)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40beeper%2Fdesktop-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40beeper%2Fdesktop-mcp%22%5D%2C%22env%22%3A%7B%22BEEPER_ACCESS_TOKEN%22%3A%22My%20Access%20Token%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n<!-- x-release-please-start-version -->\n\n```go\nimport (\n\t"github.com/beeper/desktop-api-go" // imported as SDK_PackageName\n)\n```\n\n<!-- x-release-please-end -->\n\nOr to pin the version:\n\n<!-- x-release-please-start-version -->\n\n```sh\ngo get -u \'github.com/beeper/desktop-api-go@v0.0.1\'\n```\n\n<!-- x-release-please-end -->\n\n## Requirements\n\nThis library requires Go 1.22+.\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```go\npackage main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/beeper/desktop-api-go"\n\t"github.com/beeper/desktop-api-go/option"\n)\n\nfunc main() {\n\tclient := beeperdesktopapi.NewClient(\n\t\toption.WithAccessToken("My Access Token"), // defaults to os.LookupEnv("BEEPER_ACCESS_TOKEN")\n\t)\n\tpage, err := client.Chats.Search(context.TODO(), beeperdesktopapi.ChatSearchParams{\n\t\tIncludeMuted: beeperdesktopapi.Bool(true),\n\t\tLimit:        beeperdesktopapi.Int(3),\n\t\tType:         beeperdesktopapi.ChatSearchParamsTypeSingle,\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n\n```\n\n### Request fields\n\nAll request parameters are wrapped in a generic `Field` type,\nwhich we use to distinguish zero values from null or omitted fields.\n\nThis prevents accidentally sending a zero value if you forget a required parameter,\nand enables explicitly sending `null`, `false`, `\'\'`, or `0` on optional parameters.\nAny field not specified is not sent.\n\nTo construct fields with values, use the helpers `String()`, `Int()`, `Float()`, or most commonly, the generic `F[T]()`.\nTo send a null, use `Null[T]()`, and to send a nonconforming value, use `Raw[T](any)`. For example:\n\n```go\nparams := FooParams{\n\tName: SDK_PackageName.F("hello"),\n\n\t// Explicitly send `"description": null`\n\tDescription: SDK_PackageName.Null[string](),\n\n\tPoint: SDK_PackageName.F(SDK_PackageName.Point{\n\t\tX: SDK_PackageName.Int(0),\n\t\tY: SDK_PackageName.Int(1),\n\n\t\t// In cases where the API specifies a given type,\n\t\t// but you want to send something else, use `Raw`:\n\t\tZ: SDK_PackageName.Raw[int64](0.01), // sends a float\n\t}),\n}\n```\n\n### Response objects\n\nAll fields in response structs are value types (not pointers or wrappers).\n\nIf a given field is `null`, not present, or invalid, the corresponding field\nwill simply be its zero value.\n\nAll response structs also include a special `JSON` field, containing more detailed\ninformation about each property, which you can use like so:\n\n```go\nif res.Name == "" {\n\t// true if `"name"` is either not present or explicitly null\n\tres.JSON.Name.IsNull()\n\n\t// true if the `"name"` key was not present in the response JSON at all\n\tres.JSON.Name.IsMissing()\n\n\t// When the API returns data that cannot be coerced to the expected type:\n\tif res.JSON.Name.IsInvalid() {\n\t\traw := res.JSON.Name.Raw()\n\n\t\tlegacyName := struct{\n\t\t\tFirst string `json:"first"`\n\t\t\tLast  string `json:"last"`\n\t\t}{}\n\t\tjson.Unmarshal([]byte(raw), &legacyName)\n\t\tname = legacyName.First + " " + legacyName.Last\n\t}\n}\n```\n\nThese `.JSON` structs also include an `Extras` map containing\nany properties in the json response that were not specified\nin the struct. This can be useful for API features not yet\npresent in the SDK.\n\n```go\nbody := res.JSON.ExtraFields["my_unexpected_field"].Raw()\n```\n\n### RequestOptions\n\nThis library uses the functional options pattern. Functions defined in the\n`SDK_PackageOptionName` package return a `RequestOption`, which is a closure that mutates a\n`RequestConfig`. These options can be supplied to the client or at individual\nrequests. For example:\n\n```go\nclient := SDK_PackageName.SDK_ClientInitializerName(\n\t// Adds a header to every request made by the client\n\tSDK_PackageOptionName.WithHeader("X-Some-Header", "custom_header_info"),\n)\n\nclient.Accounts.List(context.TODO(), ...,\n\t// Override the header\n\tSDK_PackageOptionName.WithHeader("X-Some-Header", "some_other_custom_header_info"),\n\t// Add an undocumented field to the request body, using sjson syntax\n\tSDK_PackageOptionName.WithJSONSet("some.json.path", map[string]string{"my": "object"}),\n)\n```\n\nSee the [full list of request options](https://pkg.go.dev/github.com/beeper/desktop-api-go/SDK_PackageOptionName).\n\n### Pagination\n\nThis library provides some conveniences for working with paginated list endpoints.\n\nYou can use `.ListAutoPaging()` methods to iterate through items across all pages:\n\n```go\niter := client.Messages.SearchAutoPaging(context.TODO(), beeperdesktopapi.MessageSearchParams{\n\tAccountIDs: []string{"local-telegram_ba_QFrb5lrLPhO3OT5MFBeTWv0x4BI"},\n\tLimit:      beeperdesktopapi.Int(10),\n\tQuery:      beeperdesktopapi.String("deployment"),\n})\n// Automatically fetches more pages as needed.\nfor iter.Next() {\n\tmessage := iter.Current()\n\tfmt.Printf("%+v\\n", message)\n}\nif err := iter.Err(); err != nil {\n\tpanic(err.Error())\n}\n```\n\nOr you can use simple `.List()` methods to fetch a single page and receive a standard response object\nwith additional helper methods like `.GetNextPage()`, e.g.:\n\n```go\npage, err := client.Messages.Search(context.TODO(), beeperdesktopapi.MessageSearchParams{\n\tAccountIDs: []string{"local-telegram_ba_QFrb5lrLPhO3OT5MFBeTWv0x4BI"},\n\tLimit:      beeperdesktopapi.Int(10),\n\tQuery:      beeperdesktopapi.String("deployment"),\n})\nfor page != nil {\n\tfor _, message := range page.Items {\n\t\tfmt.Printf("%+v\\n", message)\n\t}\n\tpage, err = page.GetNextPage()\n}\nif err != nil {\n\tpanic(err.Error())\n}\n```\n\n### Errors\n\nWhen the API returns a non-success status code, we return an error with type\n`*SDK_PackageName.Error`. This contains the `StatusCode`, `*http.Request`, and\n`*http.Response` values of the request, as well as the JSON of the error body\n(much like other response objects in the SDK).\n\nTo handle errors, we recommend that you use the `errors.As` pattern:\n\n```go\n_, err := client.Accounts.List(context.TODO())\nif err != nil {\n\tvar apierr *beeperdesktopapi.Error\n\tif errors.As(err, &apierr) {\n\t\tprintln(string(apierr.DumpRequest(true)))  // Prints the serialized HTTP request\n\t\tprintln(string(apierr.DumpResponse(true))) // Prints the serialized HTTP response\n\t}\n\tpanic(err.Error()) // GET "/v1/accounts": 400 Bad Request { ... }\n}\n```\n\nWhen other errors occur, they are returned unwrapped; for example,\nif HTTP transport fails, you might receive `*url.Error` wrapping `*net.OpError`.\n\n### Timeouts\n\nRequests do not time out by default; use context to configure a timeout for a request lifecycle.\n\nNote that if a request is [retried](#retries), the context timeout does not start over.\nTo set a per-retry timeout, use `SDK_PackageOptionName.WithRequestTimeout()`.\n\n```go\n// This sets the timeout for the request, including all the retries.\nctx, cancel := context.WithTimeout(context.Background(), 5*time.Minute)\ndefer cancel()\nclient.Accounts.List(\n\tctx,\n\t// This sets the per-retry timeout\n\toption.WithRequestTimeout(20*time.Second),\n)\n```\n\n### File uploads\n\nRequest parameters that correspond to file uploads in multipart requests are typed as\n`param.Field[io.Reader]`. The contents of the `io.Reader` will by default be sent as a multipart form\npart with the file name of "anonymous_file" and content-type of "application/octet-stream".\n\nThe file name and content-type can be customized by implementing `Name() string` or `ContentType()\nstring` on the run-time type of `io.Reader`. Note that `os.File` implements `Name() string`, so a\nfile returned by `os.Open` will be sent with the file name on disk.\n\nWe also provide a helper `SDK_PackageName.FileParam(reader io.Reader, filename string, contentType string)`\nwhich can be used to wrap any `io.Reader` with the appropriate file name and content type.\n\n```go\n// A file from the file system\nfile, err := os.Open("/path/to/file")\nbeeperdesktopapi.AssetUploadParams{\n\tFile: file,\n}\n\n// A file from a string\nbeeperdesktopapi.AssetUploadParams{\n\tFile: strings.NewReader("my file contents"),\n}\n\n// With a custom filename and contentType\nbeeperdesktopapi.AssetUploadParams{\n\tFile: beeperdesktopapi.File(strings.NewReader(`{"hello": "foo"}`), "file.go", "application/json"),\n}\n```\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nWe retry by default all connection errors, 408 Request Timeout, 409 Conflict, 429 Rate Limit,\nand >=500 Internal errors.\n\nYou can use the `WithMaxRetries` option to configure or disable this:\n\n```go\n// Configure the default for all requests:\nclient := beeperdesktopapi.NewClient(\n\toption.WithMaxRetries(0), // default is 2\n)\n\n// Override per-request:\nclient.Accounts.List(context.TODO(), option.WithMaxRetries(5))\n```\n\n\n### Accessing raw response data (e.g. response headers)\n\nYou can access the raw HTTP response data by using the `option.WithResponseInto()` request option. This is useful when\nyou need to examine response headers, status codes, or other details.\n\n```go\n// Create a variable to store the HTTP response\nvar response *http.Response\naccounts, err := client.Accounts.List(context.TODO(), option.WithResponseInto(&response))\nif err != nil {\n\t// handle error\n}\nfmt.Printf("%+v\\n", accounts)\n\nfmt.Printf("Status Code: %d\\n", response.StatusCode)\nfmt.Printf("Headers: %+#v\\n", response.Header)\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.Get`, `client.Post`, and other HTTP verbs.\n`RequestOptions` on the client, such as retries, will be respected when making these requests.\n\n```go\nvar (\n    // params can be an io.Reader, a []byte, an encoding/json serializable object,\n    // or a "…Params" struct defined in this library.\n    params map[string]interface{}\n\n    // result can be an []byte, *http.Response, a encoding/json deserializable object,\n    // or a model defined in this library.\n    result *http.Response\n)\nerr := client.Post(context.Background(), "/unspecified", params, &result)\nif err != nil {\n    …\n}\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use either the `SDK_PackageOptionName.WithQuerySet()`\nor the `SDK_PackageOptionName.WithJSONSet()` methods.\n\n```go\nparams := FooNewParams{\n    ID:   SDK_PackageName.F("id_xxxx"),\n    Data: SDK_PackageName.F(FooNewParamsData{\n        FirstName: SDK_PackageName.F("John"),\n    }),\n}\nclient.Foo.New(context.Background(), params, SDK_PackageOptionName.WithJSONSet("data.last_name", "Doe"))\n```\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may either access the raw JSON of the response as a string\nwith `result.JSON.RawJSON()`, or get the raw JSON of a particular field on the result with\n`result.JSON.Foo.Raw()`.\n\nAny fields that are not present on the response struct will be saved and can be accessed by `result.JSON.ExtraFields()` which returns the extra fields as a `map[string]Field`.\n\n### Middleware\n\nWe provide `SDK_PackageOptionName.WithMiddleware` which applies the given\nmiddleware to requests.\n\n```go\nfunc Logger(req *http.Request, next SDK_PackageOptionName.MiddlewareNext) (res *http.Response, err error) {\n\t// Before the request\n\tstart := time.Now()\n\tLogReq(req)\n\n\t// Forward the request to the next handler\n\tres, err = next(req)\n\n\t// Handle stuff after the request\n\tend := time.Now()\n\tLogRes(res, err, start - end)\n\n    return res, err\n}\n\nclient := SDK_PackageName.SDK_ClientInitializerName(\n\tSDK_PackageOptionName.WithMiddleware(Logger),\n)\n```\n\nWhen multiple middlewares are provided as variadic arguments, the middlewares\nare applied left to right. If `SDK_PackageOptionName.WithMiddleware` is given\nmultiple times, for example first in the client then the method, the\nmiddleware in the client will run first and the middleware given in the method\nwill run next.\n\nYou may also replace the default `http.Client` with\n`SDK_PackageOptionName.WithHTTPClient(client)`. Only one http client is\naccepted (this overwrites any previous client) and receives requests after any\nmiddleware has been applied.\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n2. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/beeper/desktop-api-go/issues) with questions, bugs, or suggestions.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'typescript',
    content:
      "# TypeScript SDK for Beeper Desktop API Library\n\n[![NPM version](https://img.shields.io/npm/v/@beeper/desktop-api.svg?label=npm%20(stable))](https://npmjs.org/package/@beeper/desktop-api) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/@beeper/desktop-api)\n\nThis library provides convenient access to the Beeper Desktop REST API from server-side TypeScript or JavaScript.\n\n\n\nThe REST API documentation can be found on [developers.beeper.com](https://developers.beeper.com/desktop-api/). The full API of this library can be found in [api.md](api.md).\n\n\n\n## MCP Server\n\nUse the Beeper Desktop MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40beeper%2Fdesktop-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBiZWVwZXIvZGVza3RvcC1tY3AiXSwiZW52Ijp7IkJFRVBFUl9BQ0NFU1NfVE9LRU4iOiJNeSBBY2Nlc3MgVG9rZW4ifX0)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40beeper%2Fdesktop-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40beeper%2Fdesktop-mcp%22%5D%2C%22env%22%3A%7B%22BEEPER_ACCESS_TOKEN%22%3A%22My%20Access%20Token%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n```sh\nnpm install @beeper/desktop-api\n```\n\n\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n<!-- prettier-ignore -->\n```js\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst page = await client.chats.search({\n  includeMuted: true,\n  limit: 3,\n  type: 'single',\n});\nconst chat = page.items[0];\n\nconsole.log(chat.id);\n```\n\n\n\n### Request & Response types\n\nThis library includes TypeScript definitions for all request params and response fields. You may import and use them like so:\n\n<!-- prettier-ignore -->\n```ts\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  accessToken: process.env['BEEPER_ACCESS_TOKEN'], // This is the default and can be omitted\n});\n\nconst accounts: BeeperDesktop.AccountListResponse = await client.accounts.list();\n```\n\nDocumentation for each method, request param, and response field are available in docstrings and will appear on hover in most modern editors.\n\n## File uploads\n\nRequest parameters that correspond to file uploads can be passed in many different forms:\n- `File` (or an object with the same structure)\n- a `fetch` `Response` (or an object with the same structure)\n- an `fs.ReadStream`\n- the return value of our `toFile` helper\n\n```ts\nimport fs from 'fs';\nimport BeeperDesktop, { toFile } from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop();\n\n// If you have access to Node `fs` we recommend using `fs.createReadStream()`:\nawait client.assets.upload({ file: fs.createReadStream('/path/to/file') });\n\n// Or if you have the web `File` API you can pass a `File` instance:\nawait client.assets.upload({ file: new File(['my bytes'], 'file') });\n\n// You can also pass a `fetch` `Response`:\nawait client.assets.upload({ file: await fetch('https://somesite/file') });\n\n// Finally, if none of the above are convenient, you can use our `toFile` helper:\nawait client.assets.upload({ file: await toFile(Buffer.from('my bytes'), 'file') });\nawait client.assets.upload({ file: await toFile(new Uint8Array([0, 1, 2]), 'file') });\n```\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API,\nor if the API returns a non-success status code (i.e., 4xx or 5xx response),\na subclass of `APIError` will be thrown:\n\n<!-- prettier-ignore -->\n```ts\nconst accounts = await client.accounts.list().catch(async (err) => {\n  if (err instanceof BeeperDesktop.APIError) {\n    console.log(err.status); // 400\n    console.log(err.name); // BadRequestError\n    console.log(err.headers); // {server: 'nginx', ...}\n  } else {\n    throw err;\n  }\n});\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors will all be retried by default.\n\nYou can use the `maxRetries` option to configure or disable this:\n\n<!-- prettier-ignore -->\n```js\n// Configure the default for all requests:\nconst client = new BeeperDesktop({\n  maxRetries: 0, // default is 2\n});\n\n// Or, configure per-request:\nawait client.accounts.list({\n  maxRetries: 5,\n});\n```\n\n### Timeouts\n\nRequests time out after 30 seconds by default. You can configure this with a `timeout` option:\n\n<!-- prettier-ignore -->\n```ts\n// Configure the default for all requests:\nconst client = new BeeperDesktop({\n  timeout: 20 * 1000, // 20 seconds (default is 30 seconds)\n});\n\n// Override per-request:\nawait client.accounts.list({\n  timeout: 5 * 1000,\n});\n```\n\nOn timeout, an `APIConnectionTimeoutError` is thrown.\n\nNote that requests which time out will be [retried twice by default](#retries).\n\n## Auto-pagination\n\nList methods in the BeeperDesktop API are paginated.\nYou can use the `for await … of` syntax to iterate through items across all pages:\n\n```ts\nasync function fetchAllMessages(params) {\n  const allMessages = [];\n  // Automatically fetches more pages as needed.\n  for await (const message of client.messages.search({\n    accountIDs: ['local-telegram_ba_QFrb5lrLPhO3OT5MFBeTWv0x4BI'],\n    limit: 10,\n    query: 'deployment',\n  })) {\n    allMessages.push(message);\n  }\n  return allMessages;\n}\n```\n\nAlternatively, you can request a single page at a time:\n\n```ts\nlet page = await client.messages.search({\n  accountIDs: ['local-telegram_ba_QFrb5lrLPhO3OT5MFBeTWv0x4BI'],\n  limit: 10,\n  query: 'deployment',\n});\nfor (const message of page.items) {\n  console.log(message);\n}\n\n// Convenience methods are provided for manually paginating:\nwhile (page.hasNextPage()) {\n  page = await page.getNextPage();\n  // ...\n}\n```\n\n\n\n## Advanced Usage\n\n### Accessing raw Response data (e.g., headers)\n\nThe \"raw\" `Response` returned by `fetch()` can be accessed through the `.asResponse()` method on the `APIPromise` type that all methods return.\nThis method returns as soon as the headers for a successful response are received and does not consume the response body, so you are free to write custom parsing or streaming logic.\n\nYou can also use the `.withResponse()` method to get the raw `Response` along with the parsed data.\nUnlike `.asResponse()` this method consumes the body, returning once it is parsed.\n\n<!-- prettier-ignore -->\n```ts\nconst client = new BeeperDesktop();\n\nconst response = await client.accounts.list().asResponse();\nconsole.log(response.headers.get('X-My-Header'));\nconsole.log(response.statusText); // access the underlying Response object\n\nconst { data: accounts, response: raw } = await client.accounts.list().withResponse();\nconsole.log(raw.headers.get('X-My-Header'));\nconsole.log(accounts);\n```\n\n### Logging\n\n> [!IMPORTANT]\n> All log messages are intended for debugging only. The format and content of log messages\n> may change between releases.\n\n#### Log levels\n\nThe log level can be configured in two ways:\n\n1. Via the `BEEPER_DESKTOP_LOG` environment variable\n2. Using the `logLevel` client option (overrides the environment variable if set)\n\n```ts\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  logLevel: 'debug', // Show all log messages\n});\n```\n\nAvailable log levels, from most to least verbose:\n\n- `'debug'` - Show debug messages, info, warnings, and errors\n- `'info'` - Show info messages, warnings, and errors\n- `'warn'` - Show warnings and errors (default)\n- `'error'` - Show only errors\n- `'off'` - Disable all logging\n\nAt the `'debug'` level, all HTTP requests and responses are logged, including headers and bodies.\nSome authentication-related headers are redacted, but sensitive data in request and response bodies\nmay still be visible.\n\n#### Custom logger\n\nBy default, this library logs to `globalThis.console`. You can also provide a custom logger.\nMost logging libraries are supported, including [pino](https://www.npmjs.com/package/pino), [winston](https://www.npmjs.com/package/winston), [bunyan](https://www.npmjs.com/package/bunyan), [consola](https://www.npmjs.com/package/consola), [signale](https://www.npmjs.com/package/signale), and [@std/log](https://jsr.io/@std/log). If your logger doesn't work, please open an issue.\n\nWhen providing a custom logger, the `logLevel` option still controls which messages are emitted, messages\nbelow the configured level will not be sent to your logger.\n\n```ts\nimport BeeperDesktop from '@beeper/desktop-api';\nimport pino from 'pino';\n\nconst logger = pino();\n\nconst client = new BeeperDesktop({\n  logger: logger.child({ name: 'BeeperDesktop' }),\n  logLevel: 'debug', // Send all messages to pino, allowing it to filter\n});\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.get`, `client.post`, and other HTTP verbs.\nOptions on the client, such as retries, will be respected when making these requests.\n\n```ts\nawait client.post('/some/path', {\n  body: { some_prop: 'foo' },\n  query: { some_query_arg: 'bar' },\n});\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use `// @ts-expect-error` on the undocumented\nparameter. This library doesn't validate at runtime that the request matches the type, so any extra values you\nsend will be sent as-is.\n\n```ts\nclient.chats.search({\n  // ...\n  // @ts-expect-error baz is not yet public\n  baz: 'undocumented option',\n});\n```\n\nFor requests with the `GET` verb, any extra params will be in the query, all other requests will send the\nextra param in the body.\n\nIf you want to explicitly send an extra argument, you can do so with the `query`, `body`, and `headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may access the response object with `// @ts-expect-error` on\nthe response object, or cast the response object to the requisite type. Like the request params, we do not\nvalidate or strip extra properties from the response from the API.\n\n### Customizing the fetch client\n\nBy default, this library expects a global `fetch` function is defined.\n\nIf you want to use a different `fetch` function, you can either polyfill the global:\n\n```ts\nimport fetch from 'my-fetch';\n\nglobalThis.fetch = fetch;\n```\n\nOr pass it to the client:\n\n```ts\nimport BeeperDesktop from '@beeper/desktop-api';\nimport fetch from 'my-fetch';\n\nconst client = new BeeperDesktop({ fetch });\n```\n\n### Fetch options\n\nIf you want to set custom `fetch` options without overriding the `fetch` function, you can provide a `fetchOptions` object when instantiating the client or making a request. (Request-specific options override client options.)\n\n```ts\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  fetchOptions: {\n    // `RequestInit` options\n  },\n});\n```\n\n#### Configuring proxies\n\nTo modify proxy behavior, you can provide custom `fetchOptions` that add runtime-specific proxy\noptions to requests:\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/node.svg\" align=\"top\" width=\"18\" height=\"21\"> **Node** <sup>[[docs](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md#example---proxyagent-with-fetch)]</sup>\n\n```ts\nimport BeeperDesktop from '@beeper/desktop-api';\nimport * as undici from 'undici';\n\nconst proxyAgent = new undici.ProxyAgent('http://localhost:8888');\nconst client = new BeeperDesktop({\n  fetchOptions: {\n    dispatcher: proxyAgent,\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/bun.svg\" align=\"top\" width=\"18\" height=\"21\"> **Bun** <sup>[[docs](https://bun.sh/guides/http/proxy)]</sup>\n\n```ts\nimport BeeperDesktop from '@beeper/desktop-api';\n\nconst client = new BeeperDesktop({\n  fetchOptions: {\n    proxy: 'http://localhost:8888',\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/deno.svg\" align=\"top\" width=\"18\" height=\"21\"> **Deno** <sup>[[docs](https://docs.deno.com/api/deno/~/Deno.createHttpClient)]</sup>\n\n```ts\nimport BeeperDesktop from 'npm:@beeper/desktop-api';\n\nconst httpClient = Deno.createHttpClient({ proxy: { url: 'http://localhost:8888' } });\nconst client = new BeeperDesktop({\n  fetchOptions: {\n    client: httpClient,\n  },\n});\n```\n\n## Frequently Asked Questions\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/beeper/desktop-api-js/issues) with questions, bugs, or suggestions.\n\n## Requirements\n\nTypeScript >= 4.9 is supported.\n\nThe following runtimes are supported:\n\n- Node.js 20 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.\n- Deno v1.28.0 or higher.\n- Bun 1.0 or later.\n- Cloudflare Workers.\n- Vercel Edge Runtime.\n- Jest 28 or greater with the `\"node\"` environment (`\"jsdom\"` is not supported at this time).\n- Nitro v2.6 or greater.\n- Web browsers: disabled by default to avoid exposing your secret API credentials. Enable browser support by explicitly setting `dangerouslyAllowBrowser` to true'.\n<details>\n  <summary>More explanation</summary>\n\n  ### Why is this dangerous?\n  Enabling the `dangerouslyAllowBrowser` option can be dangerous because it exposes your secret API credentials in the client-side code. Web browsers are inherently less secure than server environments,\n  any user with access to the browser can potentially inspect, extract, and misuse these credentials. This could lead to unauthorized access using your credentials and potentially compromise sensitive data or functionality.\n  ### When might this not be dangerous?\n  In certain scenarios where enabling browser support might not pose significant risks:\n  - Internal Tools: If the application is used solely within a controlled internal environment where the users are trusted, the risk of credential exposure can be mitigated.\n  - Public APIs with Limited Scope: If your API has very limited scope and the exposed credentials do not grant access to sensitive data or critical operations, the potential impact of exposure is reduced.\n  - Development or debugging purpose: Enabling this feature temporarily might be acceptable, provided the credentials are short-lived, aren't also used in production environments, or are frequently rotated.\n\n</details>\n\nNote that React Native is not supported at this time.\n\nIf you are interested in other runtime environments, please open or upvote an issue on GitHub.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n",
  },
  {
    language: 'cli',
    content:
      "# Beeper Desktop CLI\n\nThe official CLI for the [Beeper Desktop REST API](https://developers.beeper.com/desktop-api/).\n\n<!-- x-release-please-start-version -->\n\n## Installation\n\n### Installing with Homebrew\n\n~~~sh\nbrew install beeper/tap/beeper-desktop-cli\n~~~\n\n### Installing with Go\n\nTo test or install the CLI locally, you need [Go](https://go.dev/doc/install) version 1.22 or later installed.\n\n~~~sh\ngo install 'github.com/beeper/desktop-api-cli/cmd/beeper-desktop-cli@latest'\n~~~\n\nOnce you have run `go install`, the binary is placed in your Go bin directory:\n\n- **Default location**: `$HOME/go/bin` (or `$GOPATH/bin` if GOPATH is set)\n- **Check your path**: Run `go env GOPATH` to see the base directory\n\nIf commands aren't found after installation, add the Go bin directory to your PATH:\n\n~~~sh\n# Add to your shell profile (.zshrc, .bashrc, etc.)\nexport PATH=\"$PATH:$(go env GOPATH)/bin\"\n~~~\n\n<!-- x-release-please-end -->\n\n### Running Locally\n\nAfter cloning the git repository for this project, you can use the\n`scripts/run` script to run the tool locally:\n\n~~~sh\n./scripts/run args...\n~~~\n\n## Usage\n\nThe CLI follows a resource-based command structure:\n\n~~~sh\nbeeper-desktop-cli [resource] <command> [flags...]\n~~~\n\n~~~sh\nbeeper-desktop-cli chats search \\\n  --access-token 'My Access Token' \\\n  --include-muted \\\n  --limit 3 \\\n  --type single\n~~~\n\nFor details about specific commands, use the `--help` flag.\n\n### Environment variables\n\n| Environment variable  | Description                                                                                           | Required |\n| --------------------- | ----------------------------------------------------------------------------------------------------- | -------- |\n| `BEEPER_ACCESS_TOKEN` | Bearer access token obtained via OAuth2 PKCE flow or created in-app. Required for all API operations. | yes      |\n\n### Global flags\n\n- `--access-token` - Bearer access token obtained via OAuth2 PKCE flow or created in-app. Required for all API operations. (can also be set with `BEEPER_ACCESS_TOKEN` env var)\n- `--help` - Show command line usage\n- `--debug` - Enable debug logging (includes HTTP request/response details)\n- `--version`, `-v` - Show the CLI version\n- `--base-url` - Use a custom API backend URL\n- `--format` - Change the output format (`auto`, `explore`, `json`, `jsonl`, `pretty`, `raw`, `yaml`)\n- `--format-error` - Change the output format for errors (`auto`, `explore`, `json`, `jsonl`, `pretty`, `raw`, `yaml`)\n- `--transform` - Transform the data output using [GJSON syntax](https://github.com/tidwall/gjson/blob/master/SYNTAX.md)\n- `--transform-error` - Transform the error output using [GJSON syntax](https://github.com/tidwall/gjson/blob/master/SYNTAX.md)\n\n### Passing files as arguments\n\nTo pass files to your API, you can use the `@myfile.ext` syntax:\n\n~~~bash\nbeeper-desktop-cli <command> --arg @abe.jpg\n~~~\n\nFiles can also be passed inside JSON or YAML blobs:\n\n~~~bash\nbeeper-desktop-cli <command> --arg '{image: \"@abe.jpg\"}'\n# Equivalent:\nbeeper-desktop-cli <command> <<YAML\narg:\n  image: \"@abe.jpg\"\nYAML\n~~~\n\nIf you need to pass a string literal that begins with an `@` sign, you can\nescape the `@` sign to avoid accidentally passing a file.\n\n~~~bash\nbeeper-desktop-cli <command> --username '\\@abe'\n~~~\n\n#### Explicit encoding\n\nFor JSON endpoints, the CLI tool does filetype sniffing to determine whether the\nfile contents should be sent as a string literal (for plain text files) or as a\nbase64-encoded string literal (for binary files). If you need to explicitly send\nthe file as either plain text or base64-encoded data, you can use\n`@file://myfile.txt` (for string encoding) or `@data://myfile.dat` (for\nbase64-encoding). Note that absolute paths will begin with `@file://` or\n`@data://`, followed by a third `/` (for example, `@file:///tmp/file.txt`).\n\n~~~bash\nbeeper-desktop-cli <command> --arg @data://file.txt\n~~~\n",
  },
  {
    language: 'php',
    content:
      '# Beeper Desktop PHP API Library\n\nThe Beeper Desktop PHP library provides convenient access to the Beeper Desktop REST API from any PHP 8.1.0+ application.\n\n## Installation\n\nTo use this package, install via Composer by adding the following to your application\'s `composer.json`:\n\n<!-- x-release-please-start-version -->\n```json\n{\n  "repositories": [\n    {\n      "type": "vcs",\n      "url": "git@github.com:beeper/desktop-api-php.git"\n    }\n  ],\n  "require": {\n    "beeper/desktop-api-php": "dev-main"\n  }\n}\n```\n<!-- x-release-please-end -->\n\n## Usage\n\n```php\n<?php\n\n$client = new Client(\n  accessToken: getenv(\'BEEPER_ACCESS_TOKEN\') ?: \'My Access Token\'\n);\n\n$page = $client->chats->search(includeMuted: true, limit: 3, type: \'single\');\n\nvar_dump($page->id);\n```',
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
