// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as AuthAPI from './auth';
import {
  Auth,
  AuthListFlowsResponse,
  AuthListLoginsResponse,
  AuthLogoutParams,
  AuthLogoutResponse,
  AuthStartLoginParams,
  AuthStartLoginResponse,
  AuthSubmitCookiesParams,
  AuthSubmitCookiesResponse,
  AuthSubmitUserInputParams,
  AuthSubmitUserInputResponse,
  AuthWaitForStepParams,
  AuthWaitForStepResponse,
  AuthWhoamiResponse,
  BaseAuth,
} from './auth';
import * as CapabilitiesAPI from './capabilities';
import { BaseCapabilities, Capabilities, CapabilityRetrieveResponse } from './capabilities';
import * as ContactsAPI from './contacts';
import { BaseContacts, ContactListParams, ContactListResponse, Contacts } from './contacts';
import * as RoomsAPI from './rooms';
import {
  BaseRooms,
  RoomCreateDmParams,
  RoomCreateDmResponse,
  RoomCreateGroupParams,
  RoomCreateGroupResponse,
  Rooms,
} from './rooms';
import * as UsersAPI from './users';
import {
  BaseUsers,
  UserResolveParams,
  UserResolveResponse,
  UserSearchParams,
  UserSearchResponse,
  Users,
} from './users';

/**
 * Matrix-compatible APIs for connected network bridges.
 */
export class BaseBridges extends APIResource {
  static override readonly _key: readonly ['matrix', 'bridges'] = Object.freeze([
    'matrix',
    'bridges',
  ] as const);
}
/**
 * Matrix-compatible APIs for connected network bridges.
 */
export class Bridges extends BaseBridges {
  auth: AuthAPI.Auth = new AuthAPI.Auth(this._client);
  contacts: ContactsAPI.Contacts = new ContactsAPI.Contacts(this._client);
  users: UsersAPI.Users = new UsersAPI.Users(this._client);
  rooms: RoomsAPI.Rooms = new RoomsAPI.Rooms(this._client);
  capabilities: CapabilitiesAPI.Capabilities = new CapabilitiesAPI.Capabilities(this._client);
}

Bridges.Auth = Auth;
Bridges.BaseAuth = BaseAuth;
Bridges.Contacts = Contacts;
Bridges.BaseContacts = BaseContacts;
Bridges.Users = Users;
Bridges.BaseUsers = BaseUsers;
Bridges.Rooms = Rooms;
Bridges.BaseRooms = BaseRooms;
Bridges.Capabilities = Capabilities;
Bridges.BaseCapabilities = BaseCapabilities;

export declare namespace Bridges {
  export {
    Auth as Auth,
    BaseAuth as BaseAuth,
    type AuthListFlowsResponse as AuthListFlowsResponse,
    type AuthListLoginsResponse as AuthListLoginsResponse,
    type AuthLogoutResponse as AuthLogoutResponse,
    type AuthStartLoginResponse as AuthStartLoginResponse,
    type AuthSubmitCookiesResponse as AuthSubmitCookiesResponse,
    type AuthSubmitUserInputResponse as AuthSubmitUserInputResponse,
    type AuthWaitForStepResponse as AuthWaitForStepResponse,
    type AuthWhoamiResponse as AuthWhoamiResponse,
    type AuthLogoutParams as AuthLogoutParams,
    type AuthStartLoginParams as AuthStartLoginParams,
    type AuthSubmitCookiesParams as AuthSubmitCookiesParams,
    type AuthSubmitUserInputParams as AuthSubmitUserInputParams,
    type AuthWaitForStepParams as AuthWaitForStepParams,
  };

  export {
    Contacts as Contacts,
    BaseContacts as BaseContacts,
    type ContactListResponse as ContactListResponse,
    type ContactListParams as ContactListParams,
  };

  export {
    Users as Users,
    BaseUsers as BaseUsers,
    type UserResolveResponse as UserResolveResponse,
    type UserSearchResponse as UserSearchResponse,
    type UserResolveParams as UserResolveParams,
    type UserSearchParams as UserSearchParams,
  };

  export {
    Rooms as Rooms,
    BaseRooms as BaseRooms,
    type RoomCreateDmResponse as RoomCreateDmResponse,
    type RoomCreateGroupResponse as RoomCreateGroupResponse,
    type RoomCreateDmParams as RoomCreateDmParams,
    type RoomCreateGroupParams as RoomCreateGroupParams,
  };

  export {
    Capabilities as Capabilities,
    BaseCapabilities as BaseCapabilities,
    type CapabilityRetrieveResponse as CapabilityRetrieveResponse,
  };
}
