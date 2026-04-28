// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as ReactionsAPI from './reactions';
import {
  ReactionAddParams,
  ReactionAddResponse,
  ReactionDeleteParams,
  ReactionDeleteResponse,
  Reactions,
} from './reactions';

/**
 * Manage chat messages
 */
export class Messages extends APIResource {
  reactions: ReactionsAPI.Reactions = new ReactionsAPI.Reactions(this._client);
}

Messages.Reactions = Reactions;

export declare namespace Messages {
  export {
    Reactions as Reactions,
    type ReactionDeleteResponse as ReactionDeleteResponse,
    type ReactionAddResponse as ReactionAddResponse,
    type ReactionDeleteParams as ReactionDeleteParams,
    type ReactionAddParams as ReactionAddParams,
  };
}
