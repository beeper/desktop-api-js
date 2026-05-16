# BeeperDesktop

Types:

- <code><a href="./src/resources/top-level.ts">FocusResponse</a></code>
- <code><a href="./src/resources/top-level.ts">SearchResponse</a></code>

Methods:

- <code title="post /v1/focus">client.<a href="./src/index.ts">focus</a>({ ...params }) -> FocusResponse</code>
- <code title="get /v1/search">client.<a href="./src/index.ts">search</a>({ ...params }) -> SearchResponse</code>

# Shared

Types:

- <code><a href="./src/resources/shared.ts">AppStateSnapshot</a></code>
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

- <code title="get /v1/accounts/{accountID}/contacts/list">client.accounts.contacts.<a href="./src/resources/accounts/contacts.ts">list</a>(accountID, { ...params }) -> UsersCursorSearch</code>
- <code title="get /v1/accounts/{accountID}/contacts">client.accounts.contacts.<a href="./src/resources/accounts/contacts.ts">search</a>(accountID, { ...params }) -> ContactSearchResponse</code>

# Bridges

Types:

- <code><a href="./src/resources/bridges.ts">BridgeAvailability</a></code>
- <code><a href="./src/resources/bridges.ts">BridgeListResponse</a></code>

Methods:

- <code title="get /v1/bridges">client.bridges.<a href="./src/resources/bridges.ts">list</a>() -> BridgeListResponse</code>

# Chats

Types:

- <code><a href="./src/resources/chats/chats.ts">Chat</a></code>
- <code><a href="./src/resources/chats/chats.ts">ChatCreateResponse</a></code>
- <code><a href="./src/resources/chats/chats.ts">ChatListResponse</a></code>
- <code><a href="./src/resources/chats/chats.ts">ChatStartResponse</a></code>

Methods:

- <code title="post /v1/chats">client.chats.<a href="./src/resources/chats/chats.ts">create</a>({ ...params }) -> ChatCreateResponse</code>
- <code title="get /v1/chats/{chatID}">client.chats.<a href="./src/resources/chats/chats.ts">retrieve</a>(chatID, { ...params }) -> Chat</code>
- <code title="patch /v1/chats/{chatID}">client.chats.<a href="./src/resources/chats/chats.ts">update</a>(chatID, { ...params }) -> Chat</code>
- <code title="get /v1/chats">client.chats.<a href="./src/resources/chats/chats.ts">list</a>({ ...params }) -> ChatListResponsesCursorNoLimit</code>
- <code title="post /v1/chats/{chatID}/archive">client.chats.<a href="./src/resources/chats/chats.ts">archive</a>(chatID, { ...params }) -> void</code>
- <code title="post /v1/chats/{chatID}/read">client.chats.<a href="./src/resources/chats/chats.ts">markRead</a>(chatID, { ...params }) -> Chat</code>
- <code title="post /v1/chats/{chatID}/unread">client.chats.<a href="./src/resources/chats/chats.ts">markUnread</a>(chatID, { ...params }) -> Chat</code>
- <code title="post /v1/chats/{chatID}/notify-anyway">client.chats.<a href="./src/resources/chats/chats.ts">notifyAnyway</a>(chatID) -> Chat</code>
- <code title="get /v1/chats/search">client.chats.<a href="./src/resources/chats/chats.ts">search</a>({ ...params }) -> ChatsCursorSearch</code>
- <code title="post /v1/chats/start">client.chats.<a href="./src/resources/chats/chats.ts">start</a>({ ...params }) -> ChatStartResponse</code>

## Reminders

Methods:

- <code title="post /v1/chats/{chatID}/reminders">client.chats.reminders.<a href="./src/resources/chats/reminders.ts">create</a>(chatID, { ...params }) -> void</code>
- <code title="delete /v1/chats/{chatID}/reminders">client.chats.reminders.<a href="./src/resources/chats/reminders.ts">delete</a>(chatID) -> void</code>

## Messages

### Reactions

Types:

- <code><a href="./src/resources/chats/messages/reactions.ts">ReactionDeleteResponse</a></code>
- <code><a href="./src/resources/chats/messages/reactions.ts">ReactionAddResponse</a></code>

Methods:

- <code title="delete /v1/chats/{chatID}/messages/{messageID}/reactions/{reactionKey}">client.chats.messages.reactions.<a href="./src/resources/chats/messages/reactions.ts">delete</a>(reactionKey, { ...params }) -> ReactionDeleteResponse</code>
- <code title="post /v1/chats/{chatID}/messages/{messageID}/reactions">client.chats.messages.reactions.<a href="./src/resources/chats/messages/reactions.ts">add</a>(messageID, { ...params }) -> ReactionAddResponse</code>

# Messages

Types:

- <code><a href="./src/resources/messages.ts">MessageUpdateResponse</a></code>
- <code><a href="./src/resources/messages.ts">MessageSendResponse</a></code>

Methods:

- <code title="get /v1/chats/{chatID}/messages/{messageID}">client.messages.<a href="./src/resources/messages.ts">retrieve</a>(messageID, { ...params }) -> Message</code>
- <code title="put /v1/chats/{chatID}/messages/{messageID}">client.messages.<a href="./src/resources/messages.ts">update</a>(messageID, { ...params }) -> MessageUpdateResponse</code>
- <code title="get /v1/chats/{chatID}/messages">client.messages.<a href="./src/resources/messages.ts">list</a>(chatID, { ...params }) -> MessagesCursorNoLimit</code>
- <code title="delete /v1/chats/{chatID}/messages/{messageID}">client.messages.<a href="./src/resources/messages.ts">delete</a>(messageID, { ...params }) -> void</code>
- <code title="get /v1/messages/search">client.messages.<a href="./src/resources/messages.ts">search</a>({ ...params }) -> MessagesCursorSearch</code>
- <code title="post /v1/chats/{chatID}/messages">client.messages.<a href="./src/resources/messages.ts">send</a>(chatID, { ...params }) -> MessageSendResponse</code>

# Assets

Types:

- <code><a href="./src/resources/assets.ts">AssetDownloadResponse</a></code>
- <code><a href="./src/resources/assets.ts">AssetUploadResponse</a></code>
- <code><a href="./src/resources/assets.ts">AssetUploadBase64Response</a></code>

Methods:

- <code title="post /v1/assets/download">client.assets.<a href="./src/resources/assets.ts">download</a>({ ...params }) -> AssetDownloadResponse</code>
- <code title="get /v1/assets/serve">client.assets.<a href="./src/resources/assets.ts">serve</a>({ ...params }) -> Response</code>
- <code title="post /v1/assets/upload">client.assets.<a href="./src/resources/assets.ts">upload</a>({ ...params }) -> AssetUploadResponse</code>
- <code title="post /v1/assets/upload/base64">client.assets.<a href="./src/resources/assets.ts">uploadBase64</a>({ ...params }) -> AssetUploadBase64Response</code>

# Info

Types:

- <code><a href="./src/resources/info.ts">InfoRetrieveResponse</a></code>

Methods:

- <code title="get /v1/info">client.info.<a href="./src/resources/info.ts">retrieve</a>() -> InfoRetrieveResponse</code>

# App

Types:

- <code><a href="./src/resources/app/app.ts">LoginRegistrationRequiredResponse</a></code>
- <code><a href="./src/resources/app/app.ts">LoginResponse</a></code>
- <code><a href="./src/resources/app/app.ts">LoginResponseOutput</a></code>
- <code><a href="./src/resources/app/app.ts">RecoveryCodeResetResponse</a></code>
- <code><a href="./src/resources/app/app.ts">StartVerificationResponse</a></code>
- <code><a href="./src/resources/app/app.ts">StateMutationResponse</a></code>
- <code><a href="./src/resources/app/app.ts">AppStatusResponse</a></code>

Methods:

- <code title="get /v1/app/status">client.app.<a href="./src/resources/app/app.ts">status</a>() -> AppStatusResponse</code>

## Login

Types:

- <code><a href="./src/resources/app/login.ts">LoginEmailResponse</a></code>
- <code><a href="./src/resources/app/login.ts">LoginRegisterResponse</a></code>
- <code><a href="./src/resources/app/login.ts">LoginResponseResponse</a></code>
- <code><a href="./src/resources/app/login.ts">LoginStartResponse</a></code>

Methods:

- <code title="post /v1/app/login/email">client.app.login.<a href="./src/resources/app/login.ts">email</a>({ ...params }) -> unknown</code>
- <code title="post /v1/app/login/register">client.app.login.<a href="./src/resources/app/login.ts">register</a>({ ...params }) -> LoginRegisterResponse</code>
- <code title="post /v1/app/login/response">client.app.login.<a href="./src/resources/app/login.ts">response</a>({ ...params }) -> LoginResponseResponse</code>
- <code title="post /v1/app/login/start">client.app.login.<a href="./src/resources/app/login.ts">start</a>() -> LoginStartResponse</code>

## E2ee

### RecoveryCode

Types:

- <code><a href="./src/resources/app/e2ee/recovery-code/recovery-code.ts">RecoveryCodeMarkBackedUpResponse</a></code>
- <code><a href="./src/resources/app/e2ee/recovery-code/recovery-code.ts">RecoveryCodeVerifyResponse</a></code>

Methods:

- <code title="post /v1/app/e2ee/recovery-code/mark-backed-up">client.app.e2ee.recoveryCode.<a href="./src/resources/app/e2ee/recovery-code/recovery-code.ts">markBackedUp</a>() -> RecoveryCodeMarkBackedUpResponse</code>
- <code title="post /v1/app/e2ee/recovery-code/verify">client.app.e2ee.recoveryCode.<a href="./src/resources/app/e2ee/recovery-code/recovery-code.ts">verify</a>({ ...params }) -> RecoveryCodeVerifyResponse</code>

#### Reset

Types:

- <code><a href="./src/resources/app/e2ee/recovery-code/reset.ts">ResetCreateResponse</a></code>
- <code><a href="./src/resources/app/e2ee/recovery-code/reset.ts">ResetConfirmResponse</a></code>

Methods:

- <code title="post /v1/app/e2ee/recovery-code/reset">client.app.e2ee.recoveryCode.reset.<a href="./src/resources/app/e2ee/recovery-code/reset.ts">create</a>({ ...params }) -> ResetCreateResponse</code>
- <code title="post /v1/app/e2ee/recovery-code/reset/confirm">client.app.e2ee.recoveryCode.reset.<a href="./src/resources/app/e2ee/recovery-code/reset.ts">confirm</a>({ ...params }) -> ResetConfirmResponse</code>

### Verification

Types:

- <code><a href="./src/resources/app/e2ee/verification/verification.ts">VerificationCreateResponse</a></code>
- <code><a href="./src/resources/app/e2ee/verification/verification.ts">VerificationAcceptResponse</a></code>
- <code><a href="./src/resources/app/e2ee/verification/verification.ts">VerificationCancelResponse</a></code>

Methods:

- <code title="post /v1/app/e2ee/verification">client.app.e2ee.verification.<a href="./src/resources/app/e2ee/verification/verification.ts">create</a>({ ...params }) -> VerificationCreateResponse</code>
- <code title="post /v1/app/e2ee/verification/{verificationID}/accept">client.app.e2ee.verification.<a href="./src/resources/app/e2ee/verification/verification.ts">accept</a>(verificationID) -> VerificationAcceptResponse</code>
- <code title="post /v1/app/e2ee/verification/{verificationID}/cancel">client.app.e2ee.verification.<a href="./src/resources/app/e2ee/verification/verification.ts">cancel</a>(verificationID, { ...params }) -> VerificationCancelResponse</code>

#### Qr

Types:

- <code><a href="./src/resources/app/e2ee/verification/qr.ts">QrConfirmScannedResponse</a></code>
- <code><a href="./src/resources/app/e2ee/verification/qr.ts">QrScanResponse</a></code>

Methods:

- <code title="post /v1/app/e2ee/verification/{verificationID}/qr/confirm-scanned">client.app.e2ee.verification.qr.<a href="./src/resources/app/e2ee/verification/qr.ts">confirmScanned</a>(verificationID) -> QrConfirmScannedResponse</code>
- <code title="post /v1/app/e2ee/verification/qr/scan">client.app.e2ee.verification.qr.<a href="./src/resources/app/e2ee/verification/qr.ts">scan</a>({ ...params }) -> QrScanResponse</code>

#### Sas

Types:

- <code><a href="./src/resources/app/e2ee/verification/sas.ts">SaConfirmResponse</a></code>
- <code><a href="./src/resources/app/e2ee/verification/sas.ts">SaStartResponse</a></code>

Methods:

- <code title="post /v1/app/e2ee/verification/{verificationID}/sas/confirm">client.app.e2ee.verification.sas.<a href="./src/resources/app/e2ee/verification/sas.ts">confirm</a>(verificationID) -> SaConfirmResponse</code>
- <code title="post /v1/app/e2ee/verification/{verificationID}/sas/start">client.app.e2ee.verification.sas.<a href="./src/resources/app/e2ee/verification/sas.ts">start</a>(verificationID) -> SaStartResponse</code>

# Matrix

## Users

Types:

- <code><a href="./src/resources/matrix/users/users.ts">UserRetrieveProfileResponse</a></code>

Methods:

- <code title="get /_matrix/client/v3/profile/{userId}">client.matrix.users.<a href="./src/resources/matrix/users/users.ts">retrieveProfile</a>(userID) -> UserRetrieveProfileResponse</code>

### AccountData

Types:

- <code><a href="./src/resources/matrix/users/account-data.ts">AccountDataRetrieveResponse</a></code>
- <code><a href="./src/resources/matrix/users/account-data.ts">AccountDataUpdateResponse</a></code>

Methods:

- <code title="get /_matrix/client/v3/user/{userId}/account_data/{type}">client.matrix.users.accountData.<a href="./src/resources/matrix/users/account-data.ts">retrieve</a>(type, { ...params }) -> unknown</code>
- <code title="put /_matrix/client/v3/user/{userId}/account_data/{type}">client.matrix.users.accountData.<a href="./src/resources/matrix/users/account-data.ts">update</a>(type, { ...params }) -> unknown</code>

## Rooms

Types:

- <code><a href="./src/resources/matrix/rooms/rooms.ts">RoomCreateResponse</a></code>
- <code><a href="./src/resources/matrix/rooms/rooms.ts">RoomJoinResponse</a></code>
- <code><a href="./src/resources/matrix/rooms/rooms.ts">RoomLeaveResponse</a></code>

Methods:

- <code title="post /_matrix/client/v3/createRoom">client.matrix.rooms.<a href="./src/resources/matrix/rooms/rooms.ts">create</a>({ ...params }) -> RoomCreateResponse</code>
- <code title="post /_matrix/client/v3/join/{roomIdOrAlias}">client.matrix.rooms.<a href="./src/resources/matrix/rooms/rooms.ts">join</a>(roomIDOrAlias, { ...params }) -> RoomJoinResponse</code>
- <code title="post /_matrix/client/v3/rooms/{roomId}/leave">client.matrix.rooms.<a href="./src/resources/matrix/rooms/rooms.ts">leave</a>(roomID, { ...params }) -> unknown</code>

### AccountData

Types:

- <code><a href="./src/resources/matrix/rooms/account-data.ts">AccountDataRetrieveResponse</a></code>
- <code><a href="./src/resources/matrix/rooms/account-data.ts">AccountDataUpdateResponse</a></code>

Methods:

- <code title="get /_matrix/client/v3/user/{userId}/rooms/{roomId}/account_data/{type}">client.matrix.rooms.accountData.<a href="./src/resources/matrix/rooms/account-data.ts">retrieve</a>(type, { ...params }) -> unknown</code>
- <code title="put /_matrix/client/v3/user/{userId}/rooms/{roomId}/account_data/{type}">client.matrix.rooms.accountData.<a href="./src/resources/matrix/rooms/account-data.ts">update</a>(type, { ...params }) -> unknown</code>

### State

Types:

- <code><a href="./src/resources/matrix/rooms/state.ts">StateRetrieveResponse</a></code>
- <code><a href="./src/resources/matrix/rooms/state.ts">StateListResponse</a></code>

Methods:

- <code title="get /_matrix/client/v3/rooms/{roomId}/state/{eventType}/{stateKey}">client.matrix.rooms.state.<a href="./src/resources/matrix/rooms/state.ts">retrieve</a>(stateKey, { ...params }) -> StateRetrieveResponse</code>
- <code title="get /_matrix/client/v3/rooms/{roomId}/state">client.matrix.rooms.state.<a href="./src/resources/matrix/rooms/state.ts">list</a>(roomID) -> StateListResponse</code>

### Events

Types:

- <code><a href="./src/resources/matrix/rooms/events.ts">EventRetrieveResponse</a></code>

Methods:

- <code title="get /_matrix/client/v3/rooms/{roomId}/event/{eventId}">client.matrix.rooms.events.<a href="./src/resources/matrix/rooms/events.ts">retrieve</a>(eventID, { ...params }) -> EventRetrieveResponse</code>

## Bridges

### Auth

Types:

- <code><a href="./src/resources/matrix/bridges/auth.ts">AuthListFlowsResponse</a></code>
- <code><a href="./src/resources/matrix/bridges/auth.ts">AuthListLoginsResponse</a></code>
- <code><a href="./src/resources/matrix/bridges/auth.ts">AuthLogoutResponse</a></code>
- <code><a href="./src/resources/matrix/bridges/auth.ts">AuthStartLoginResponse</a></code>
- <code><a href="./src/resources/matrix/bridges/auth.ts">AuthSubmitCookiesResponse</a></code>
- <code><a href="./src/resources/matrix/bridges/auth.ts">AuthSubmitUserInputResponse</a></code>
- <code><a href="./src/resources/matrix/bridges/auth.ts">AuthWaitForStepResponse</a></code>
- <code><a href="./src/resources/matrix/bridges/auth.ts">AuthWhoamiResponse</a></code>

Methods:

- <code title="get /_matrix/client/unstable/com.beeper.bridge/{bridgeID}/_matrix/provision/v3/login/flows">client.matrix.bridges.auth.<a href="./src/resources/matrix/bridges/auth.ts">listFlows</a>(bridgeID) -> AuthListFlowsResponse</code>
- <code title="get /_matrix/client/unstable/com.beeper.bridge/{bridgeID}/_matrix/provision/v3/logins">client.matrix.bridges.auth.<a href="./src/resources/matrix/bridges/auth.ts">listLogins</a>(bridgeID) -> AuthListLoginsResponse</code>
- <code title="post /_matrix/client/unstable/com.beeper.bridge/{bridgeID}/_matrix/provision/v3/logout/{loginID}">client.matrix.bridges.auth.<a href="./src/resources/matrix/bridges/auth.ts">logout</a>(loginID, { ...params }) -> unknown</code>
- <code title="post /_matrix/client/unstable/com.beeper.bridge/{bridgeID}/_matrix/provision/v3/login/start/{flowID}">client.matrix.bridges.auth.<a href="./src/resources/matrix/bridges/auth.ts">startLogin</a>(flowID, { ...params }) -> AuthStartLoginResponse</code>
- <code title="post /_matrix/client/unstable/com.beeper.bridge/{bridgeID}/_matrix/provision/v3/login/step/{loginProcessID}/{stepID}/cookies">client.matrix.bridges.auth.<a href="./src/resources/matrix/bridges/auth.ts">submitCookies</a>(stepID, { ...params }) -> AuthSubmitCookiesResponse</code>
- <code title="post /_matrix/client/unstable/com.beeper.bridge/{bridgeID}/_matrix/provision/v3/login/step/{loginProcessID}/{stepID}/user_input">client.matrix.bridges.auth.<a href="./src/resources/matrix/bridges/auth.ts">submitUserInput</a>(stepID, { ...params }) -> AuthSubmitUserInputResponse</code>
- <code title="post /_matrix/client/unstable/com.beeper.bridge/{bridgeID}/_matrix/provision/v3/login/step/{loginProcessID}/{stepID}/display_and_wait">client.matrix.bridges.auth.<a href="./src/resources/matrix/bridges/auth.ts">waitForStep</a>(stepID, { ...params }) -> AuthWaitForStepResponse</code>
- <code title="get /_matrix/client/unstable/com.beeper.bridge/{bridgeID}/_matrix/provision/v3/whoami">client.matrix.bridges.auth.<a href="./src/resources/matrix/bridges/auth.ts">whoami</a>(bridgeID) -> AuthWhoamiResponse</code>

### Contacts

Types:

- <code><a href="./src/resources/matrix/bridges/contacts.ts">ContactListResponse</a></code>

Methods:

- <code title="get /_matrix/client/unstable/com.beeper.bridge/{bridgeID}/_matrix/provision/v3/contacts">client.matrix.bridges.contacts.<a href="./src/resources/matrix/bridges/contacts.ts">list</a>(bridgeID, { ...params }) -> ContactListResponse</code>

### Users

Types:

- <code><a href="./src/resources/matrix/bridges/users.ts">UserResolveResponse</a></code>
- <code><a href="./src/resources/matrix/bridges/users.ts">UserSearchResponse</a></code>

Methods:

- <code title="get /_matrix/client/unstable/com.beeper.bridge/{bridgeID}/_matrix/provision/v3/resolve_identifier/{identifier}">client.matrix.bridges.users.<a href="./src/resources/matrix/bridges/users.ts">resolve</a>(identifier, { ...params }) -> UserResolveResponse</code>
- <code title="post /_matrix/client/unstable/com.beeper.bridge/{bridgeID}/_matrix/provision/v3/search_users">client.matrix.bridges.users.<a href="./src/resources/matrix/bridges/users.ts">search</a>(bridgeID, { ...params }) -> UserSearchResponse</code>

### Rooms

Types:

- <code><a href="./src/resources/matrix/bridges/rooms.ts">RoomCreateDmResponse</a></code>
- <code><a href="./src/resources/matrix/bridges/rooms.ts">RoomCreateGroupResponse</a></code>

Methods:

- <code title="post /_matrix/client/unstable/com.beeper.bridge/{bridgeID}/_matrix/provision/v3/create_dm/{identifier}">client.matrix.bridges.rooms.<a href="./src/resources/matrix/bridges/rooms.ts">createDm</a>(identifier, { ...params }) -> RoomCreateDmResponse</code>
- <code title="post /_matrix/client/unstable/com.beeper.bridge/{bridgeID}/_matrix/provision/v3/create_group/{groupType}">client.matrix.bridges.rooms.<a href="./src/resources/matrix/bridges/rooms.ts">createGroup</a>(groupType, { ...params }) -> RoomCreateGroupResponse</code>

### Capabilities

Types:

- <code><a href="./src/resources/matrix/bridges/capabilities.ts">CapabilityRetrieveResponse</a></code>

Methods:

- <code title="get /_matrix/client/unstable/com.beeper.bridge/{bridgeID}/_matrix/provision/v3/capabilities">client.matrix.bridges.capabilities.<a href="./src/resources/matrix/bridges/capabilities.ts">retrieve</a>(bridgeID) -> CapabilityRetrieveResponse</code>
