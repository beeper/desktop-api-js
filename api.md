# GetAccounts

Types:

- <code><a href="./src/resources/get-accounts.ts">GetAccountListResponse</a></code>

Methods:

- <code title="get /v0/get-accounts">client.getAccounts.<a href="./src/resources/get-accounts.ts">list</a>() -> GetAccountListResponse</code>

# FocusApp

Types:

- <code><a href="./src/resources/focus-app.ts">BaseResponse</a></code>

Methods:

- <code title="post /v0/focus-app">client.focusApp.<a href="./src/resources/focus-app.ts">open</a>({ ...params }) -> BaseResponse</code>

# DraftMessage

Methods:

- <code title="post /v0/draft-message">client.draftMessage.<a href="./src/resources/draft-message.ts">create</a>({ ...params }) -> BaseResponse</code>

# GetLinkToChat

Types:

- <code><a href="./src/resources/get-link-to-chat.ts">GetLinkToChatCreateResponse</a></code>

Methods:

- <code title="post /v0/get-link-to-chat">client.getLinkToChat.<a href="./src/resources/get-link-to-chat.ts">create</a>({ ...params }) -> GetLinkToChatCreateResponse</code>

# GetChat

Types:

- <code><a href="./src/resources/get-chat.ts">User</a></code>
- <code><a href="./src/resources/get-chat.ts">GetChatRetrieveResponse</a></code>

Methods:

- <code title="get /v0/get-chat">client.getChat.<a href="./src/resources/get-chat.ts">retrieve</a>({ ...params }) -> GetChatRetrieveResponse | null</code>

# FindChats

Types:

- <code><a href="./src/resources/find-chats.ts">FindChatListResponse</a></code>

Methods:

- <code title="get /v0/find-chats">client.findChats.<a href="./src/resources/find-chats.ts">list</a>({ ...params }) -> FindChatListResponse</code>

# SearchMessages

Types:

- <code><a href="./src/resources/search-messages.ts">SearchMessageSearchResponse</a></code>

Methods:

- <code title="get /v0/search-messages">client.searchMessages.<a href="./src/resources/search-messages.ts">search</a>({ ...params }) -> SearchMessageSearchResponse</code>

# SendMessage

Types:

- <code><a href="./src/resources/send-message.ts">SendMessageSendResponse</a></code>

Methods:

- <code title="post /v0/send-message">client.sendMessage.<a href="./src/resources/send-message.ts">send</a>({ ...params }) -> SendMessageSendResponse</code>

# ArchiveChat

Methods:

- <code title="post /v0/archive-chat">client.archiveChat.<a href="./src/resources/archive-chat.ts">archive</a>({ ...params }) -> BaseResponse</code>

# SetChatReminder

Methods:

- <code title="post /v0/set-chat-reminder">client.setChatReminder.<a href="./src/resources/set-chat-reminder.ts">create</a>({ ...params }) -> BaseResponse</code>

# ClearChatReminder

Methods:

- <code title="post /v0/clear-chat-reminder">client.clearChatReminder.<a href="./src/resources/clear-chat-reminder.ts">clear</a>({ ...params }) -> BaseResponse</code>

# OAuth

Types:

- <code><a href="./src/resources/oauth.ts">OAuthRetrieveUserInfoResponse</a></code>

Methods:

- <code title="get /oauth/userinfo">client.oauth.<a href="./src/resources/oauth.ts">retrieveUserInfo</a>() -> OAuthRetrieveUserInfoResponse</code>
- <code title="post /oauth/revoke">client.oauth.<a href="./src/resources/oauth.ts">revokeToken</a>({ ...params }) -> void</code>
