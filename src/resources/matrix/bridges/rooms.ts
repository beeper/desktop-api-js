// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * Matrix-compatible APIs for accounts and connected network bridges.
 */
export class BaseRooms extends APIResource {
  static override readonly _key: readonly ['matrix', 'bridges', 'rooms'] = Object.freeze([
    'matrix',
    'bridges',
    'rooms',
  ] as const);

  /**
   * Create a direct chat with a user on the remote network.
   *
   * @example
   * ```ts
   * const response = await client.matrix.bridges.rooms.createDm(
   *   'identifier',
   *   { bridgeID: 'bridgeID' },
   * );
   * ```
   */
  createDm(
    identifier: string,
    params: RoomCreateDmParams,
    options?: RequestOptions,
  ): APIPromise<RoomCreateDmResponse> {
    const { bridgeID, login_id } = params;
    return this._client.post(
      path`/_matrix/client/unstable/com.beeper.bridge/${bridgeID}/_matrix/provision/v3/create_dm/${identifier}`,
      { query: { login_id }, ...options },
    );
  }

  /**
   * Create a group chat on the remote network.
   *
   * @example
   * ```ts
   * const response =
   *   await client.matrix.bridges.rooms.createGroup(
   *     'groupType',
   *     { bridgeID: 'bridgeID' },
   *   );
   * ```
   */
  createGroup(
    groupType: string,
    params: RoomCreateGroupParams,
    options?: RequestOptions,
  ): APIPromise<RoomCreateGroupResponse> {
    const { bridgeID, login_id, ...body } = params;
    return this._client.post(
      path`/_matrix/client/unstable/com.beeper.bridge/${bridgeID}/_matrix/provision/v3/create_group/${groupType}`,
      { query: { login_id }, body, ...options },
    );
  }
}
/**
 * Matrix-compatible APIs for accounts and connected network bridges.
 */
export class Rooms extends BaseRooms {}

/**
 * A successfully resolved identifier.
 */
export interface RoomCreateDmResponse {
  /**
   * The internal user ID of the resolved user.
   */
  id: string;

  /**
   * The avatar of the user on the remote network.
   */
  avatar_url?: string;

  /**
   * The Matrix room ID of the direct chat with the user.
   */
  dm_room_mxid?: string;

  /**
   * A list of identifiers for the user on the remote network.
   */
  identifiers?: Array<string>;

  /**
   * The Matrix user ID of the ghost representing the user.
   */
  mxid?: string;

  /**
   * The name of the user on the remote network.
   */
  name?: string;
}

/**
 * A successfully created group chat.
 */
export interface RoomCreateGroupResponse {
  /**
   * The internal chat ID of the created group.
   */
  id: string;

  /**
   * The Matrix room ID of the portal.
   */
  mxid: string;
}

export interface RoomCreateDmParams {
  /**
   * Path param: Bridge ID for the connected network account, for example discordgo
   * or local-whatsapp.
   */
  bridgeID: string;

  /**
   * Query param: An optional explicit login ID to do the action through.
   */
  login_id?: string;
}

export interface RoomCreateGroupParams {
  /**
   * Path param: Bridge ID for the connected network account, for example discordgo
   * or local-whatsapp.
   */
  bridgeID: string;

  /**
   * Query param: An optional explicit login ID to do the action through.
   */
  login_id?: string;

  /**
   * Body param: The `m.room.avatar` event content for the room.
   */
  avatar?: RoomCreateGroupParams.Avatar;

  /**
   * Body param: The `com.beeper.disappearing_timer` event content for the room.
   */
  disappear?: RoomCreateGroupParams.Disappear;

  /**
   * Body param: The `m.room.name` event content for the room.
   */
  name?: RoomCreateGroupParams.Name;

  /**
   * Body param
   */
  parent?: unknown;

  /**
   * Body param: The users to add to the group initially.
   */
  participants?: Array<string>;

  /**
   * Body param: An existing Matrix room ID to bridge to. The other parameters must
   * be already in sync with the room state when using this parameter.
   */
  room_id?: string;

  /**
   * Body param: The `m.room.topic` event content for the room.
   */
  topic?: RoomCreateGroupParams.Topic;

  /**
   * Body param: The type of group to create.
   */
  type?: string;

  /**
   * Body param: The public username for the created group.
   */
  username?: string;
}

export namespace RoomCreateGroupParams {
  /**
   * The `m.room.avatar` event content for the room.
   */
  export interface Avatar {
    url?: string;
  }

  /**
   * The `com.beeper.disappearing_timer` event content for the room.
   */
  export interface Disappear {
    timer?: number;

    type?: string;
  }

  /**
   * The `m.room.name` event content for the room.
   */
  export interface Name {
    name?: string;
  }

  /**
   * The `m.room.topic` event content for the room.
   */
  export interface Topic {
    topic?: string;
  }
}

export declare namespace Rooms {
  export {
    type RoomCreateDmResponse as RoomCreateDmResponse,
    type RoomCreateGroupResponse as RoomCreateGroupResponse,
    type RoomCreateDmParams as RoomCreateDmParams,
    type RoomCreateGroupParams as RoomCreateGroupParams,
  };
}
