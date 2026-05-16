// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as BridgesAPI from './bridges/bridges';
import { BaseBridges, Bridges } from './bridges/bridges';
import * as RoomsAPI from './rooms/rooms';
import {
  BaseRooms,
  RoomCreateParams,
  RoomCreateResponse,
  RoomJoinParams,
  RoomJoinResponse,
  RoomLeaveParams,
  RoomLeaveResponse,
  Rooms,
} from './rooms/rooms';
import * as UsersAPI from './users/users';
import { BaseUsers, UserRetrieveProfileResponse, Users } from './users/users';

/**
 * Matrix-compatible APIs for accounts, rooms, and connected network bridges.
 */
export class BaseMatrix extends APIResource {
  static override readonly _key: readonly ['matrix'] = Object.freeze(['matrix'] as const);
}
/**
 * Matrix-compatible APIs for accounts, rooms, and connected network bridges.
 */
export class Matrix extends BaseMatrix {
  users: UsersAPI.Users = new UsersAPI.Users(this._client);
  rooms: RoomsAPI.Rooms = new RoomsAPI.Rooms(this._client);
  bridges: BridgesAPI.Bridges = new BridgesAPI.Bridges(this._client);
}

Matrix.Users = Users;
Matrix.BaseUsers = BaseUsers;
Matrix.Rooms = Rooms;
Matrix.BaseRooms = BaseRooms;
Matrix.Bridges = Bridges;
Matrix.BaseBridges = BaseBridges;

export declare namespace Matrix {
  export {
    Users as Users,
    BaseUsers as BaseUsers,
    type UserRetrieveProfileResponse as UserRetrieveProfileResponse,
  };

  export {
    Rooms as Rooms,
    BaseRooms as BaseRooms,
    type RoomCreateResponse as RoomCreateResponse,
    type RoomJoinResponse as RoomJoinResponse,
    type RoomLeaveResponse as RoomLeaveResponse,
    type RoomCreateParams as RoomCreateParams,
    type RoomJoinParams as RoomJoinParams,
    type RoomLeaveParams as RoomLeaveParams,
  };

  export { Bridges as Bridges, BaseBridges as BaseBridges };
}
