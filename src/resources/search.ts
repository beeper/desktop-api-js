// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import * as ChatsAPI from './chats/chats';
import { ChatsCursorSearch } from './chats/chats';
import { APIPromise } from '../core/api-promise';
import { CursorSearch, type CursorSearchParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Search extends APIResource {
  /**
   * Search chats by title/network or participants using Beeper Desktop's renderer
   * algorithm.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const chat of client.search.chats()) {
   *   // ...
   * }
   * ```
   */
  chats(
    query: SearchChatsParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ChatsCursorSearch, ChatsAPI.Chat> {
    return this._client.getAPIList('/v1/search/chats', CursorSearch<ChatsAPI.Chat>, { query, ...options });
  }

  /**
   * Search contacts across on a specific account using the network's search API.
   * Only use for creating new chats.
   *
   * @example
   * ```ts
   * const response = await client.search.contacts(
   *   'local-whatsapp_ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc',
   *   { query: 'x' },
   * );
   * ```
   */
  contacts(
    accountID: string,
    query: SearchContactsParams,
    options?: RequestOptions,
  ): APIPromise<SearchContactsResponse> {
    return this._client.get(path`/v1/search/contacts/${accountID}`, { query, ...options });
  }
}

export interface SearchContactsResponse {
  items: Array<Shared.User>;
}

export interface SearchChatsParams extends CursorSearchParams {
  /**
   * Provide an array of account IDs to filter chats from specific messaging accounts
   * only
   */
  accountIDs?: Array<string>;

  /**
   * Filter by inbox type: "primary" (non-archived, non-low-priority),
   * "low-priority", or "archive". If not specified, shows all chats.
   */
  inbox?: 'primary' | 'low-priority' | 'archive';

  /**
   * Include chats marked as Muted by the user, which are usually less important.
   * Default: true. Set to false if the user wants a more refined search.
   */
  includeMuted?: boolean | null;

  /**
   * Provide an ISO datetime string to only retrieve chats with last activity after
   * this time
   */
  lastActivityAfter?: string;

  /**
   * Provide an ISO datetime string to only retrieve chats with last activity before
   * this time
   */
  lastActivityBefore?: string;

  /**
   * Literal token search (non-semantic). Use single words users type (e.g.,
   * "dinner"). When multiple words provided, ALL must match. Case-insensitive.
   */
  query?: string;

  /**
   * Search scope: 'titles' matches title + network; 'participants' matches
   * participant names.
   */
  scope?: 'titles' | 'participants';

  /**
   * Specify the type of chats to retrieve: use "single" for direct messages, "group"
   * for group chats, or "any" to get all types
   */
  type?: 'single' | 'group' | 'any';

  /**
   * Set to true to only retrieve chats that have unread messages
   */
  unreadOnly?: boolean | null;
}

export interface SearchContactsParams {
  /**
   * Text to search users by. Network-specific behavior.
   */
  query: string;
}

export declare namespace Search {
  export {
    type SearchContactsResponse as SearchContactsResponse,
    type SearchChatsParams as SearchChatsParams,
    type SearchContactsParams as SearchContactsParams,
  };
}

export { type ChatsCursorSearch };
