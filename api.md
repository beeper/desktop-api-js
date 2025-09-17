# Shared

Types:

- <code><a href="./src/resources/shared.ts">Attachment</a></code>
- <code><a href="./src/resources/shared.ts">BaseResponse</a></code>
- <code><a href="./src/resources/shared.ts">Error</a></code>
- <code><a href="./src/resources/shared.ts">Message</a></code>
- <code><a href="./src/resources/shared.ts">Reaction</a></code>
- <code><a href="./src/resources/shared.ts">User</a></code>

# Accounts

Types:

- <code><a href="./src/resources/accounts.ts">Account</a></code>
- <code><a href="./src/resources/accounts.ts">AccountListResponse</a></code>

Methods:

- <code title="get /v0/get-accounts">client.accounts.<a href="./src/resources/accounts.ts">list</a>() -> AccountListResponse</code>

# App

Types:

- <code><a href="./src/resources/app.ts">AppDownloadAssetResponse</a></code>
- <code><a href="./src/resources/app.ts">AppOpenResponse</a></code>
- <code><a href="./src/resources/app.ts">AppSearchResponse</a></code>

Methods:

- <code title="post /v0/download-asset">client.app.<a href="./src/resources/app.ts">downloadAsset</a>({ ...params }) -> AppDownloadAssetResponse</code>
- <code title="post /v0/open-app">client.app.<a href="./src/resources/app.ts">open</a>({ ...params }) -> AppOpenResponse</code>
- <code title="get /v0/search">client.app.<a href="./src/resources/app.ts">search</a>({ ...params }) -> AppSearchResponse</code>

# Contacts

Types:

- <code><a href="./src/resources/contacts.ts">ContactSearchResponse</a></code>

Methods:

- <code title="get /v0/search-users">client.contacts.<a href="./src/resources/contacts.ts">search</a>({ ...params }) -> ContactSearchResponse</code>

# Chats

Types:

- <code><a href="./src/resources/chats/chats.ts">Chat</a></code>
- <code><a href="./src/resources/chats/chats.ts">ChatCreateResponse</a></code>

Methods:

- <code title="post /v0/create-chat">client.chats.<a href="./src/resources/chats/chats.ts">create</a>({ ...params }) -> ChatCreateResponse</code>
- <code title="get /v0/get-chat">client.chats.<a href="./src/resources/chats/chats.ts">retrieve</a>({ ...params }) -> Chat</code>
- <code title="post /v0/archive-chat">client.chats.<a href="./src/resources/chats/chats.ts">archive</a>({ ...params }) -> BaseResponse</code>
- <code title="get /v0/search-chats">client.chats.<a href="./src/resources/chats/chats.ts">search</a>({ ...params }) -> ChatsCursor</code>

## Reminders

Methods:

- <code title="post /v0/set-chat-reminder">client.chats.reminders.<a href="./src/resources/chats/reminders.ts">create</a>({ ...params }) -> BaseResponse</code>
- <code title="post /v0/clear-chat-reminder">client.chats.reminders.<a href="./src/resources/chats/reminders.ts">delete</a>({ ...params }) -> BaseResponse</code>

# Messages

Types:

- <code><a href="./src/resources/messages.ts">MessageSendResponse</a></code>

Methods:

- <code title="get /v0/search-messages">client.messages.<a href="./src/resources/messages.ts">search</a>({ ...params }) -> MessagesCursor</code>
- <code title="post /v0/send-message">client.messages.<a href="./src/resources/messages.ts">send</a>({ ...params }) -> MessageSendResponse</code>

# Token

Types:

- <code><a href="./src/resources/token.ts">RevokeRequest</a></code>
- <code><a href="./src/resources/token.ts">UserInfo</a></code>

Methods:

- <code title="get /oauth/userinfo">client.token.<a href="./src/resources/token.ts">info</a>() -> UserInfo</code>
