import type { Endpoint, HandlerFunction } from "../tools";

import { handler as get_accounts } from './get-accounts';
import { handler as open_in_app } from './open-app';
import { handler as search } from './search';
import { handler as get_chat } from './get-chat';
import { handler as archive_chat } from './archive-chat';
import { handler as search_chats } from './search-chats';
import { handler as set_chat_reminder } from './set-chat-reminder';
import { handler as clear_chat_reminder } from './clear-chat-reminder';
import { handler as search_messages } from './search-messages';
import { handler as send_message } from './send-message';

const HANDLER_OVERRIDES: Record<string, HandlerFunction> = {
  get_accounts,
  open_in_app,
  search,
  get_chat,
  archive_chat,
  search_chats,
  set_chat_reminder,
  clear_chat_reminder,
  search_messages,
  send_message,
}

export function mapEndpoint(endpoint: Endpoint): Endpoint {
  if (!HANDLER_OVERRIDES[endpoint.tool.name]) {
    return endpoint
  }
  return {
    ...endpoint,
    handler: HANDLER_OVERRIDES[endpoint.tool.name]!,
  };
}