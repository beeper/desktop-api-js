# BeeperDesktop

Types:

- <code><a href="./src/resources/top-level.ts">FocusResponse</a></code>
- <code><a href="./src/resources/top-level.ts">SearchResponse</a></code>

Methods:

- <code title="post /v1/focus">client.<a href="./src/index.ts">focus</a>({ ...params }) -> FocusResponse</code>
- <code title="get /v1/search">client.<a href="./src/index.ts">search</a>({ ...params }) -> SearchResponse</code>

# Shared

Types:

- <code><a href="./src/resources/shared.ts">Attachment</a></code>
- <code><a href="./src/resources/shared.ts">Error</a></code>
- <code><a href="./src/resources/shared.ts">Message</a></code>
- <code><a href="./src/resources/shared.ts">Reaction</a></code>
- <code><a href="./src/resources/shared.ts">User</a></code>

# Accounts

Types:

- <code><a href="./src/resources/accounts/accounts.ts">Account</a></code>
- <code><a href="./src/resources/accounts/accounts.ts">AccountListResponse</a></code>

Methods:

- <code title="get /v1/accounts">client.accounts.<a href="./src/resources/accounts/accounts.ts">list</a>() -> AccountListResponse</code>

## Contacts

Types:

- <code><a href="./src/resources/accounts/contacts.ts">ContactSearchResponse</a></code>

Methods:

- <code title="get /v1/accounts/{accountID}/contacts">client.accounts.contacts.<a href="./src/resources/accounts/contacts.ts">search</a>(accountID, { ...params }) -> ContactSearchResponse</code>

# Chats

Types:

- <code><a href="./src/resources/chats/chats.ts">Chat</a></code>
- <code><a href="./src/resources/chats/chats.ts">ChatCreateResponse</a></code>
- <code><a href="./src/resources/chats/chats.ts">ChatListResponse</a></code>

Methods:

- <code title="post /v1/chats">client.chats.<a href="./src/resources/chats/chats.ts">create</a>({ ...params }) -> ChatCreateResponse</code>
- <code title="get /v1/chats/{chatID}">client.chats.<a href="./src/resources/chats/chats.ts">retrieve</a>(chatID, { ...params }) -> Chat</code>
- <code title="get /v1/chats">client.chats.<a href="./src/resources/chats/chats.ts">list</a>({ ...params }) -> ChatListResponsesCursorNoLimit</code>
- <code title="post /v1/chats/{chatID}/archive">client.chats.<a href="./src/resources/chats/chats.ts">archive</a>(chatID, { ...params }) -> void</code>
- <code title="get /v1/chats/search">client.chats.<a href="./src/resources/chats/chats.ts">search</a>({ ...params }) -> ChatsCursorSearch</code>

## Reminders

Methods:

- <code title="post /v1/chats/{chatID}/reminders">client.chats.reminders.<a href="./src/resources/chats/reminders.ts">create</a>(chatID, { ...params }) -> void</code>
- <code title="delete /v1/chats/{chatID}/reminders">client.chats.reminders.<a href="./src/resources/chats/reminders.ts">delete</a>(chatID) -> void</code>

# Messages

Types:

- <code><a href="./src/resources/messages.ts">MessageSendResponse</a></code>

Methods:

- <code title="get /v1/chats/{chatID}/messages">client.messages.<a href="./src/resources/messages.ts">list</a>(chatID, { ...params }) -> MessagesCursorSortKey</code>
- <code title="get /v1/messages/search">client.messages.<a href="./src/resources/messages.ts">search</a>({ ...params }) -> MessagesCursorSearch</code>
- <code title="post /v1/chats/{chatID}/messages">client.messages.<a href="./src/resources/messages.ts">send</a>(chatID, { ...params }) -> MessageSendResponse</code>

# Assets

Types:

- <code><a href="./src/resources/assets.ts">AssetDownloadResponse</a></code>

Methods:

- <code title="post /v1/assets/download">client.assets.<a href="./src/resources/assets.ts">download</a>({ ...params }) -> AssetDownloadResponse</code>
