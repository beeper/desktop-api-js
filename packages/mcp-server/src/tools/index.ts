// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, Endpoint, HandlerFunction } from './types';

export { Metadata, Endpoint, HandlerFunction };

import get_accounts from './accounts/get-accounts';
import open_app from './app/open-app';
import archive_chat from './chats/archive-chat';
import get_chat from './chats/get-chat';
import search_chats from './chats/search-chats';
import get_attachment from './messages/get-attachment';
import search_messages from './messages/search-messages';
import send_message from './messages/send-message';
import clear_chat_reminder from './reminders/clear-chat-reminder';
import set_chat_reminder from './reminders/set-chat-reminder';
import get_user_info_oauth from './oauth/get-user-info-oauth';
import revoke_token_oauth from './oauth/revoke-token-oauth';

export const endpoints: Endpoint[] = [];

function addEndpoint(endpoint: Endpoint) {
  endpoints.push(endpoint);
}

addEndpoint(get_accounts);
addEndpoint(open_app);
addEndpoint(archive_chat);
addEndpoint(get_chat);
addEndpoint(search_chats);
addEndpoint(get_attachment);
addEndpoint(search_messages);
addEndpoint(send_message);
addEndpoint(clear_chat_reminder);
addEndpoint(set_chat_reminder);
addEndpoint(get_user_info_oauth);
addEndpoint(revoke_token_oauth);

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
