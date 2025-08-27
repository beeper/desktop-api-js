# Shared

Types:

- <code><a href="./src/resources/shared.ts">Account</a></code>
- <code><a href="./src/resources/shared.ts">Attachment</a></code>
- <code><a href="./src/resources/shared.ts">BaseResponse</a></code>
- <code><a href="./src/resources/shared.ts">Chat</a></code>
- <code><a href="./src/resources/shared.ts">Error</a></code>
- <code><a href="./src/resources/shared.ts">Message</a></code>
- <code><a href="./src/resources/shared.ts">Reaction</a></code>
- <code><a href="./src/resources/shared.ts">User</a></code>

# Accounts

Types:

- <code><a href="./src/resources/accounts.ts">AccountListResponse</a></code>

Methods:

- <code title="get /v0/get-accounts">client.accounts.<a href="./src/resources/accounts.ts">list</a>() -> AccountListResponse</code>

# App

Types:

- <code><a href="./src/resources/app.ts">AppFocusResponse</a></code>

Methods:

- <code title="post /v0/open-app">client.app.<a href="./src/resources/app.ts">focus</a>({ ...params }) -> AppFocusResponse</code>

# Chats

Types:

- <code><a href="./src/resources/chats.ts">ChatGetResponse</a></code>

Methods:

- <code title="post /v0/archive-chat">client.chats.<a href="./src/resources/chats.ts">archive</a>({ ...params }) -> BaseResponse</code>
- <code title="get /v0/get-chat">client.chats.<a href="./src/resources/chats.ts">get</a>({ ...params }) -> ChatGetResponse | null</code>
- <code title="get /v0/search-chats">client.chats.<a href="./src/resources/chats.ts">search</a>({ ...params }) -> ChatsCursorID</code>

# Messages

Types:

- <code><a href="./src/resources/messages.ts">MessageGetAttachmentResponse</a></code>
- <code><a href="./src/resources/messages.ts">MessageSendResponse</a></code>

Methods:

- <code title="post /v0/get-attachment">client.messages.<a href="./src/resources/messages.ts">getAttachment</a>({ ...params }) -> MessageGetAttachmentResponse</code>
- <code title="get /v0/search-messages">client.messages.<a href="./src/resources/messages.ts">search</a>({ ...params }) -> MessagesCursorID</code>
- <code title="post /v0/send-message">client.messages.<a href="./src/resources/messages.ts">send</a>({ ...params }) -> MessageSendResponse</code>

# Reminders

Methods:

- <code title="post /v0/clear-chat-reminder">client.reminders.<a href="./src/resources/reminders.ts">clear</a>({ ...params }) -> BaseResponse</code>
- <code title="post /v0/set-chat-reminder">client.reminders.<a href="./src/resources/reminders.ts">set</a>({ ...params }) -> BaseResponse</code>

# OAuth

Types:

- <code><a href="./src/resources/oauth.ts">RevokeRequest</a></code>
- <code><a href="./src/resources/oauth.ts">UserInfo</a></code>

Methods:

- <code title="get /oauth/userinfo">client.oauth.<a href="./src/resources/oauth.ts">getUserInfo</a>() -> UserInfo</code>
- <code title="post /oauth/revoke">client.oauth.<a href="./src/resources/oauth.ts">revokeToken</a>({ ...params }) -> void</code>
