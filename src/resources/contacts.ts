// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * Contacts operations
 */
export class Contacts extends APIResource {
  /**
   * Search users across on a specific account using the network's search API.
   */
  search(query: ContactSearchParams, options?: RequestOptions): APIPromise<ContactSearchResponse> {
    return this._client.get('/v0/search-users', { query, ...options });
  }
}

export interface ContactSearchResponse {
  items: Array<Shared.User>;
}

export interface ContactSearchParams {
  /**
   * Beeper account ID this resource belongs to.
   */
  accountID: string;

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
