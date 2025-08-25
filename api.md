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

# V0

Types:

- <code><a href="./src/resources/v0.ts">AccountsResponse</a></code>
- <code><a href="./src/resources/v0.ts">ArchiveRequest</a></code>
- <code><a href="./src/resources/v0.ts">ClearReminderRequest</a></code>
- <code><a href="./src/resources/v0.ts">DraftRequest</a></code>
- <code><a href="./src/resources/v0.ts">FindChatsRequest</a></code>
- <code><a href="./src/resources/v0.ts">FindChatsResponse</a></code>
- <code><a href="./src/resources/v0.ts">FocusRequest</a></code>
- <code><a href="./src/resources/v0.ts">GetChatRequest</a></code>
- <code><a href="./src/resources/v0.ts">GetChatResponse</a></code>
- <code><a href="./src/resources/v0.ts">LinkRequest</a></code>
- <code><a href="./src/resources/v0.ts">LinkResponse</a></code>
- <code><a href="./src/resources/v0.ts">SearchRequest</a></code>
- <code><a href="./src/resources/v0.ts">SearchResponse</a></code>
- <code><a href="./src/resources/v0.ts">SendRequest</a></code>
- <code><a href="./src/resources/v0.ts">SendResponse</a></code>
- <code><a href="./src/resources/v0.ts">SetReminderRequest</a></code>

Methods:

- <code title="post /v0/archive-chat">client.v0.<a href="./src/resources/v0.ts">archiveChat</a>({ ...params }) -> BaseResponse</code>
- <code title="post /v0/clear-chat-reminder">client.v0.<a href="./src/resources/v0.ts">clearChatReminder</a>({ ...params }) -> BaseResponse</code>
- <code title="post /v0/draft-message">client.v0.<a href="./src/resources/v0.ts">draftMessage</a>({ ...params }) -> BaseResponse</code>
- <code title="get /v0/find-chats">client.v0.<a href="./src/resources/v0.ts">findChats</a>({ ...params }) -> ChatsCursorID</code>
- <code title="post /v0/focus-app">client.v0.<a href="./src/resources/v0.ts">focusApp</a>({ ...params }) -> BaseResponse</code>
- <code title="get /v0/get-accounts">client.v0.<a href="./src/resources/v0.ts">getAccounts</a>() -> AccountsResponse</code>
- <code title="get /v0/get-chat">client.v0.<a href="./src/resources/v0.ts">getChat</a>({ ...params }) -> GetChatResponse | null</code>
- <code title="post /v0/get-link-to-chat">client.v0.<a href="./src/resources/v0.ts">getLinkToChat</a>({ ...params }) -> LinkResponse</code>
- <code title="get /v0/search-messages">client.v0.<a href="./src/resources/v0.ts">searchMessages</a>({ ...params }) -> MessagesCursorID</code>
- <code title="post /v0/send-message">client.v0.<a href="./src/resources/v0.ts">sendMessage</a>({ ...params }) -> SendResponse</code>
- <code title="post /v0/set-chat-reminder">client.v0.<a href="./src/resources/v0.ts">setChatReminder</a>({ ...params }) -> BaseResponse</code>

# OAuth

Types:

- <code><a href="./src/resources/oauth.ts">RevokeRequest</a></code>
- <code><a href="./src/resources/oauth.ts">UserInfo</a></code>

Methods:

- <code title="get /oauth/userinfo">client.oauth.<a href="./src/resources/oauth.ts">getUserInfo</a>() -> UserInfo</code>
- <code title="post /oauth/revoke">client.oauth.<a href="./src/resources/oauth.ts">revokeToken</a>({ ...params }) -> void</code>
