// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Contacts operations
 */
export class Contacts extends APIResource {
  /**
   * Search contacts across on a specific account using the network's search API.
   * Only use for creating new chats.
   */
  search(
    accountID: string,
    query: ContactSearchParams,
    options?: RequestOptions,
  ): APIPromise<ContactSearchResponse> {
    return this._client.get(path`/v1/accounts/${accountID}/contacts/search`, { query, ...options });
  }
}

export interface ContactSearchResponse {
  items: Array<Shared.User>;
}

export interface ContactSearchParams {
  /**
   * Text to search users by. Network-specific behavior.
   */
  query: string;
}

export declare namespace Contacts {
  export {
    type ContactSearchResponse as ContactSearchResponse,
    type ContactSearchParams as ContactSearchParams,
  };
}
