// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, Endpoint, HandlerFunction } from './types';

export { Metadata, Endpoint, HandlerFunction };

import list_accounts from './accounts/list-accounts';
import focus_app from './app/focus-app';
import draft_messages from './messages/draft-messages';
import search_messages from './messages/search-messages';
import send_messages from './messages/send-messages';
import retrieve_chats from './chats/retrieve-chats';
import archive_chats from './chats/archive-chats';
import find_chats from './chats/find-chats';
import get_link_chats from './chats/get-link-chats';
import clear_reminders from './reminders/clear-reminders';
import set_reminders from './reminders/set-reminders';
import get_user_info_oauth from './oauth/get-user-info-oauth';
import revoke_token_oauth from './oauth/revoke-token-oauth';

export const endpoints: Endpoint[] = [];

function addEndpoint(endpoint: Endpoint) {
  endpoints.push(endpoint);
}

addEndpoint(list_accounts);
addEndpoint(focus_app);
addEndpoint(draft_messages);
addEndpoint(search_messages);
addEndpoint(send_messages);
addEndpoint(retrieve_chats);
addEndpoint(archive_chats);
addEndpoint(find_chats);
addEndpoint(get_link_chats);
addEndpoint(clear_reminders);
addEndpoint(set_reminders);
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
