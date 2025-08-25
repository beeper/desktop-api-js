// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, Endpoint, HandlerFunction } from './types';

export { Metadata, Endpoint, HandlerFunction };

import archive_chat from './v0/archive-chat';
import clear_chat_reminder from './v0/clear-chat-reminder';
import draft_message from './v0/draft-message';
import find_chats from './v0/find-chats';
import focus_app from './v0/focus-app';
import get_accounts from './v0/get-accounts';
import get_chat from './v0/get-chat';
import get_link_to_chat from './v0/get-link-to-chat';
import search_messages from './v0/search-messages';
import send_message from './v0/send-message';
import set_chat_reminder from './v0/set-chat-reminder';
import get_user_info_oauth from './oauth/get-user-info-oauth';
import revoke_token_oauth from './oauth/revoke-token-oauth';

export const endpoints: Endpoint[] = [];

function addEndpoint(endpoint: Endpoint) {
  endpoints.push(endpoint);
}

addEndpoint(archive_chat);
addEndpoint(clear_chat_reminder);
addEndpoint(draft_message);
addEndpoint(find_chats);
addEndpoint(focus_app);
addEndpoint(get_accounts);
addEndpoint(get_chat);
addEndpoint(get_link_to_chat);
addEndpoint(search_messages);
addEndpoint(send_message);
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
