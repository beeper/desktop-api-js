// File modified to swap in custom MCP response handlers
import { Endpoint } from './tools/types';
import { endpoints as originalEndpoints } from './tools/index';
import { getAccountsHandler } from './tool-handlers/accounts/get-accounts-handler';
import { openInAppHandler } from './tool-handlers/app/open-in-app-handler';
import { archiveChatHandler } from './tool-handlers/chats/archive-chat-handler';
import { getChatHandler } from './tool-handlers/chats/get-chat-handler';
import { clearChatReminderHandler } from './tool-handlers/chats/reminders/clear-chat-reminder-handler';
import { setChatReminderHandler } from './tool-handlers/chats/reminders/set-chat-reminder-handler';
import { searchChatsHandler } from './tool-handlers/chats/search-chats-handler';
import { downloadAttachmentHandler } from './tool-handlers/messages/attachments/download-attachment-handler';
import { searchMessagesHandler } from './tool-handlers/messages/search-messages-handler';
import { sendMessageHandler } from './tool-handlers/messages/send-message-handler';
import { CustomHandlerFunction } from './tool-handlers/types';

const customHandlers: Record<string, CustomHandlerFunction> = {
  get_accounts: getAccountsHandler,
  open_in_app: openInAppHandler,
  get_chat: getChatHandler,
  search_chats: searchChatsHandler,
  archive_chat: archiveChatHandler,
  set_chat_reminder: setChatReminderHandler,
  clear_chat_reminder: clearChatReminderHandler,
  search_messages: searchMessagesHandler,
  send_message: sendMessageHandler,
  download_attachment: downloadAttachmentHandler,
};

const endpoints: Endpoint[] = originalEndpoints.map((endpoint) => {
  const customHandler = customHandlers[endpoint.tool.name];

  if (customHandler) {
    return {
      ...endpoint,
      handler: customHandler,
    };
  }

  return endpoint;
});

export { Metadata, Endpoint, HandlerFunction } from './tools/types';
export { query, type Filter } from './tools/index';
export { endpoints };
