// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, Endpoint, HandlerFunction } from './types';

export { Metadata, Endpoint, HandlerFunction };

import download_asset_client from './top-level/download-asset-client';
import open_in_app from './top-level/open-in-app';
import search from './top-level/search';
import get_accounts from './accounts/get-accounts';
import search_contacts from './contacts/search-contacts';
import create_chats from './chats/create-chats';
import get_chat from './chats/get-chat';
import list_chats from './chats/list-chats';
import archive_chat from './chats/archive-chat';
import search_chats from './chats/search-chats';
import set_chat_reminder from './chats/reminders/set-chat-reminder';
import clear_chat_reminder from './chats/reminders/clear-chat-reminder';
import list_messages from './messages/list-messages';
import search_messages from './messages/search-messages';
import send_message from './messages/send-message';
import info_token from './token/info-token';

export const endpoints: Endpoint[] = [];

function addEndpoint(endpoint: Endpoint) {
  endpoints.push(endpoint);
}

addEndpoint(download_asset_client);
addEndpoint(open_in_app);
addEndpoint(search);
addEndpoint(get_accounts);
addEndpoint(search_contacts);
addEndpoint(create_chats);
addEndpoint(get_chat);
addEndpoint(list_chats);
addEndpoint(archive_chat);
addEndpoint(search_chats);
addEndpoint(set_chat_reminder);
addEndpoint(clear_chat_reminder);
addEndpoint(list_messages);
addEndpoint(search_messages);
addEndpoint(send_message);
addEndpoint(info_token);

export type Filter = {
  type: 'resource' | 'operation' | 'tag' | 'tool';
  op: 'include' | 'exclude';
  value: string;
};

export function query(filters: Filter[], endpoints: Endpoint[]): Endpoint[] {
  const allExcludes = filters.length > 0 && filters.every((filter) => filter.op === 'exclude');
  const unmatchedFilters = new Set(filters);

  const filtered = endpoints.filter((endpoint: Endpoint) => {
    let included = false || allExcludes;

    for (const filter of filters) {
      if (match(filter, endpoint)) {
        unmatchedFilters.delete(filter);
        included = filter.op === 'include';
      }
    }

    return included;
  });

  // Check if any filters didn't match
  const unmatched = Array.from(unmatchedFilters).filter((f) => f.type === 'tool' || f.type === 'resource');
  if (unmatched.length > 0) {
    throw new Error(
      `The following filters did not match any endpoints: ${unmatched
        .map((f) => `${f.type}=${f.value}`)
        .join(', ')}`,
    );
  }

  return filtered;
}

function match({ type, value }: Filter, endpoint: Endpoint): boolean {
  switch (type) {
    case 'resource': {
      const regexStr = '^' + normalizeResource(value).replace(/\*/g, '.*') + '$';
      const regex = new RegExp(regexStr);
      return regex.test(normalizeResource(endpoint.metadata.resource));
    }
    case 'operation':
      return endpoint.metadata.operation === value;
    case 'tag':
      return endpoint.metadata.tags.includes(value);
    case 'tool':
      return endpoint.tool.name === value;
  }
}

function normalizeResource(resource: string): string {
  return resource.toLowerCase().replace(/[^a-z.*\-_]*/g, '');
}
