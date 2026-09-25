// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * User-created labels that organize chats
 */
export class BaseLabels extends APIResource {
  static override readonly _key: readonly ['labels'] = Object.freeze(['labels'] as const);

  /**
   * List the labels the user has created for organizing chats. Filter chats by label
   * via GET /v1/chats/search with labelID.
   */
  list(options?: RequestOptions): APIPromise<LabelListResponse> {
    return this._client.get('/v1/labels', options);
  }
}
/**
 * User-created labels that organize chats
 */
export class Labels extends BaseLabels {}

/**
 * A user-created label that organizes chats across accounts.
 */
export interface Label {
  /**
   * Unique identifier of the label.
   */
  id: string;

  /**
   * Display name of the label.
   */
  name: string;
}

/**
 * Labels the user has created, sorted by name.
 */
export type LabelListResponse = Array<Label>;

export declare namespace Labels {
  export { type Label as Label, type LabelListResponse as LabelListResponse };
}
