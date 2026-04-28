// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * Manage message reactions
 */
export class Reactions extends APIResource {
  /**
   * Remove the authenticated user's reaction from an existing message.
   *
   * @example
   * ```ts
   * const reaction =
   *   await client.chats.messages.reactions.delete(
   *     'messageID',
   *     {
   *       chatID: '!NCdzlIaMjZUmvmvyHU:beeper.com',
   *       reactionKey: 'x',
   *     },
   *   );
   * ```
   */
  delete(
    messageID: string,
    params: ReactionDeleteParams,
    options?: RequestOptions,
  ): APIPromise<ReactionDeleteResponse> {
    const { chatID, reactionKey } = params;
    return this._client.delete(path`/v1/chats/${chatID}/messages/${messageID}/reactions`, {
      query: { reactionKey },
      ...options,
    });
  }

  /**
   * Add a reaction to an existing message.
   *
   * @example
   * ```ts
   * const response = await client.chats.messages.reactions.add(
   *   'messageID',
   *   {
   *     chatID: '!NCdzlIaMjZUmvmvyHU:beeper.com',
   *     reactionKey: 'x',
   *   },
   * );
   * ```
   */
  add(
    messageID: string,
    params: ReactionAddParams,
    options?: RequestOptions,
  ): APIPromise<ReactionAddResponse> {
    const { chatID, ...body } = params;
    return this._client.post(path`/v1/chats/${chatID}/messages/${messageID}/reactions`, { body, ...options });
  }
}

export interface ReactionDeleteResponse {
  /**
   * Unique identifier of the chat.
   */
  chatID: string;

  /**
   * Message ID.
   */
  messageID: string;

  /**
   * Reaction key that was removed
   */
  reactionKey: string;

  /**
   * Whether the reaction was successfully removed
   */
  success: true;
}

export interface ReactionAddResponse {
  /**
   * Unique identifier of the chat.
   */
  chatID: string;

  /**
   * Message ID.
   */
  messageID: string;

  /**
   * Reaction key that was added
   */
  reactionKey: string;

  /**
   * Whether the reaction was successfully added
   */
  success: true;

  /**
   * Transaction ID used for the reaction event
   */
  transactionID: string;
}

export interface ReactionDeleteParams {
  /**
   * Path param: Unique identifier of the chat.
   */
  chatID: string;

  /**
   * Query param: Reaction key to remove
   */
  reactionKey: string;
}

export interface ReactionAddParams {
  /**
   * Path param: Unique identifier of the chat.
   */
  chatID: string;

  /**
   * Body param: Reaction key to add (emoji, shortcode, or custom emoji key)
   */
  reactionKey: string;

  /**
   * Body param: Optional transaction ID for deduplication and local echo tracking
   */
  transactionID?: string;
}

export declare namespace Reactions {
  export {
    type ReactionDeleteResponse as ReactionDeleteResponse,
    type ReactionAddResponse as ReactionAddResponse,
    type ReactionDeleteParams as ReactionDeleteParams,
    type ReactionAddParams as ReactionAddParams,
  };
}
