# Shared

Types:

- <code><a href="./src/resources/shared.ts">Attachment</a></code>
- <code><a href="./src/resources/shared.ts">BaseResponse</a></code>
- <code><a href="./src/resources/shared.ts">Error</a></code>
- <code><a href="./src/resources/shared.ts">Reaction</a></code>
- <code><a href="./src/resources/shared.ts">User</a></code>

# Accounts

Types:

- <code><a href="./src/resources/accounts.ts">Account</a></code>
- <code><a href="./src/resources/accounts.ts">AccountsResponse</a></code>

Methods:

- <code title="get /v0/get-accounts">client.accounts.<a href="./src/resources/accounts.ts">getAccounts</a>() -> AccountsResponse</code>

# App

Types:

- <code><a href="./src/resources/app.ts">FocusRequest</a></code>

Methods:

- <code title="post /v0/focus-app">client.app.<a href="./src/resources/app.ts">focusApp</a>({ ...params }) -> BaseResponse</code>

# Messages

Types:

- <code><a href="./src/resources/messages.ts">DraftRequest</a></code>
- <code><a href="./src/resources/messages.ts">Message</a></code>
- <code><a href="./src/resources/messages.ts">SearchRequest</a></code>
- <code><a href="./src/resources/messages.ts">SearchResponse</a></code>
- <code><a href="./src/resources/messages.ts">SendRequest</a></code>
- <code><a href="./src/resources/messages.ts">SendResponse</a></code>

Methods:

- <code title="post /v0/draft-message">client.messages.<a href="./src/resources/messages.ts">draftMessage</a>({ ...params }) -> BaseResponse</code>
- <code title="get /v0/search-messages">client.messages.<a href="./src/resources/messages.ts">searchMessages</a>({ ...params }) -> MessagesCursorID</code>
- <code title="post /v0/send-message">client.messages.<a href="./src/resources/messages.ts">sendMessage</a>({ ...params }) -> SendResponse</code>

# Chats

Types:

- <code><a href="./src/resources/chats.ts">ArchiveRequest</a></code>
- <code><a href="./src/resources/chats.ts">Chat</a></code>
- <code><a href="./src/resources/chats.ts">FindChatsRequest</a></code>
- <code><a href="./src/resources/chats.ts">FindChatsResponse</a></code>
- <code><a href="./src/resources/chats.ts">GetChatRequest</a></code>
- <code><a href="./src/resources/chats.ts">GetChatResponse</a></code>
- <code><a href="./src/resources/chats.ts">LinkRequest</a></code>
- <code><a href="./src/resources/chats.ts">LinkResponse</a></code>

Methods:

- <code title="post /v0/archive-chat">client.chats.<a href="./src/resources/chats.ts">archiveChat</a>({ ...params }) -> BaseResponse</code>
- <code title="get /v0/find-chats">client.chats.<a href="./src/resources/chats.ts">findChats</a>({ ...params }) -> ChatsCursorID</code>
- <code title="get /v0/get-chat">client.chats.<a href="./src/resources/chats.ts">getChat</a>({ ...params }) -> GetChatResponse | null</code>
- <code title="post /v0/get-link-to-chat">client.chats.<a href="./src/resources/chats.ts">getLinkToChat</a>({ ...params }) -> LinkResponse</code>

# Reminders

Types:

- <code><a href="./src/resources/reminders.ts">ClearReminderRequest</a></code>
- <code><a href="./src/resources/reminders.ts">SetReminderRequest</a></code>

Methods:

- <code title="post /v0/clear-chat-reminder">client.reminders.<a href="./src/resources/reminders.ts">clearChatReminder</a>({ ...params }) -> BaseResponse</code>
- <code title="post /v0/set-chat-reminder">client.reminders.<a href="./src/resources/reminders.ts">setChatReminder</a>({ ...params }) -> BaseResponse</code>

# OAuth

Types:

- <code><a href="./src/resources/oauth.ts">RevokeRequest</a></code>
- <code><a href="./src/resources/oauth.ts">UserInfo</a></code>
