# Shared

Types:

- <code><a href="./src/resources/shared.ts">Attachment</a></code>
- <code><a href="./src/resources/shared.ts">BaseResponse</a></code>
- <code><a href="./src/resources/shared.ts">Chat</a></code>
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

- <code><a href="./src/resources/app.ts">AppOpenResponse</a></code>

Methods:

- <code title="post /v0/open-app">client.app.<a href="./src/resources/app.ts">open</a>({ ...params }) -> AppOpenResponse</code>

# Chats

Methods:

- <code title="get /v0/get-chat">client.chats.<a href="./src/resources/chats/chats.ts">retrieve</a>({ ...params }) -> Chat</code>
- <code title="post /v0/archive-chat">client.chats.<a href="./src/resources/chats/chats.ts">archive</a>({ ...params }) -> BaseResponse</code>
- <code title="get /v0/search-chats">client.chats.<a href="./src/resources/chats/chats.ts">search</a>({ ...params }) -> ChatsCursor</code>

## Reminders

Methods:

- <code title="post /v0/set-chat-reminder">client.chats.reminders.<a href="./src/resources/chats/reminders.ts">create</a>({ ...params }) -> BaseResponse</code>
- <code title="post /v0/clear-chat-reminder">client.chats.reminders.<a href="./src/resources/chats/reminders.ts">delete</a>({ ...params }) -> BaseResponse</code>

# Messages

Types:

- <code><a href="./src/resources/messages/messages.ts">MessageSendResponse</a></code>

Methods:

- <code title="get /v0/search-messages">client.messages.<a href="./src/resources/messages/messages.ts">search</a>({ ...params }) -> MessagesCursor</code>
- <code title="post /v0/send-message">client.messages.<a href="./src/resources/messages/messages.ts">send</a>({ ...params }) -> MessageSendResponse</code>

## Attachments

Types:

- <code><a href="./src/resources/messages/attachments.ts">AttachmentRetrieveResponse</a></code>

Methods:

- <code title="post /v0/get-attachment">client.messages.attachments.<a href="./src/resources/messages/attachments.ts">retrieve</a>({ ...params }) -> AttachmentRetrieveResponse</code>

# Token

Types:

- <code><a href="./src/resources/token.ts">RevokeRequest</a></code>
- <code><a href="./src/resources/token.ts">UserInfo</a></code>

Methods:

- <code title="get /oauth/userinfo">client.token.<a href="./src/resources/token.ts">info</a>() -> UserInfo</code>
