// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as AccountDataAPI from './account-data';
import {
  AccountData,
  AccountDataRetrieveParams,
  AccountDataRetrieveResponse,
  AccountDataUpdateParams,
  AccountDataUpdateResponse,
  BaseAccountData,
} from './account-data';
import * as EventsAPI from './events';
import { BaseEvents, EventRetrieveParams, EventRetrieveResponse, Events } from './events';
import * as StateAPI from './state';
import { BaseState, State, StateListResponse, StateRetrieveParams, StateRetrieveResponse } from './state';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class BaseRooms extends APIResource {
  static override readonly _key: readonly ['matrix', 'rooms'] = Object.freeze(['matrix', 'rooms'] as const);

  /**
   * Create a new room with various configuration options.
   *
   * The server MUST apply the normal state resolution rules when creating the new
   * room, including checking power levels for each event. It MUST apply the events
   * implied by the request in the following order:
   *
   * 1. The `m.room.create` event itself. Must be the first event in the room.
   *
   * 2. An `m.room.member` event for the creator to join the room. This is needed so
   *    the remaining events can be sent.
   *
   * 3. A default `m.room.power_levels` event. Overridden by the
   *    `power_level_content_override` parameter.
   *
   *    In [room versions](https://spec.matrix.org/v1.18/rooms) 1 through 11, the
   *    room creator (and not other members) will be given permission to send state
   *    events.
   *
   *    In room versions 12 and later, the room creator is given infinite power level
   *    and cannot be specified in the `users` field of `m.room.power_levels`, so is
   *    not listed explicitly.
   *
   *    **Note**: For `trusted_private_chat`, the users specified in the `invite`
   *    parameter SHOULD also be appended to `additional_creators` by the server, per
   *    the `creation_content` parameter.
   *
   *    If the room's version is 12 or higher, the power level for sending
   *    `m.room.tombstone` events MUST explicitly be higher than `state_default`. For
   *    example, set to 150 instead of 100.
   *
   * 4. An `m.room.canonical_alias` event if `room_alias_name` is given.
   *
   * 5. Events set by the `preset`. Currently these are the `m.room.join_rules`,
   *    `m.room.history_visibility`, and `m.room.guest_access` state events.
   *
   * 6. Events listed in `initial_state`, in the order that they are listed.
   *
   * 7. Events implied by `name` and `topic` (`m.room.name` and `m.room.topic` state
   *    events).
   *
   * 8. Invite events implied by `invite` and `invite_3pid` (`m.room.member` with
   *    `membership: invite` and `m.room.third_party_invite`).
   *
   * The available presets do the following with respect to room state:
   *
   * | Preset                 | `join_rules` | `history_visibility` | `guest_access` | Other                                                            |
   * | ---------------------- | ------------ | -------------------- | -------------- | ---------------------------------------------------------------- |
   * | `private_chat`         | `invite`     | `shared`             | `can_join`     |                                                                  |
   * | `trusted_private_chat` | `invite`     | `shared`             | `can_join`     | All invitees are given the same power level as the room creator. |
   * | `public_chat`          | `public`     | `shared`             | `forbidden`    |                                                                  |
   *
   * The server will create a `m.room.create` event in the room with the requesting
   * user as the creator, alongside other keys provided in the `creation_content` or
   * implied by behaviour of `creation_content`.
   *
   * @example
   * ```ts
   * const room = await client.matrix.rooms.create();
   * ```
   */
  create(body: RoomCreateParams, options?: RequestOptions): APIPromise<RoomCreateResponse> {
    return this._client.post('/_matrix/client/v3/createRoom', { body, ...options });
  }

  /**
   * _Note that this API takes either a room ID or alias, unlike_
   * `/rooms/{roomId}/join`.
   *
   * This API starts a user's participation in a particular room, if that user is
   * allowed to participate in that room. After this call, the client is allowed to
   * see all current state events in the room, and all subsequent events associated
   * with the room until the user leaves the room.
   *
   * After a user has joined a room, the room will appear as an entry in the response
   * of the
   * [`/initialSync`](https://spec.matrix.org/v1.18/client-server-api/#get_matrixclientv3initialsync)
   * and
   * [`/sync`](https://spec.matrix.org/v1.18/client-server-api/#get_matrixclientv3sync)
   * APIs.
   *
   * @example
   * ```ts
   * const response = await client.matrix.rooms.join(
   *   '!monkeys:matrix.org',
   * );
   * ```
   */
  join(
    roomIDOrAlias: string,
    params: RoomJoinParams,
    options?: RequestOptions,
  ): APIPromise<RoomJoinResponse> {
    const { via, ...body } = params;
    return this._client.post(path`/_matrix/client/v3/join/${roomIDOrAlias}`, {
      query: { via },
      body,
      ...options,
    });
  }

  /**
   * This API stops a user participating in a particular room.
   *
   * If the user was already in the room, they will no longer be able to see new
   * events in the room. If the room requires an invite to join, they will need to be
   * re-invited before they can re-join.
   *
   * If the user was invited to the room, but had not joined, this call serves to
   * reject the invite.
   *
   * Servers MAY additionally forget the room when this endpoint is called – just as
   * if the user had also invoked
   * [`/forget`](https://spec.matrix.org/v1.18/client-server-api/#post_matrixclientv3roomsroomidforget).
   * Servers that do this, MUST inform clients about this behavior using the
   * [`m.forget_forced_upon_leave`](https://spec.matrix.org/v1.18/client-server-api/#mforget_forced_upon_leave-capability)
   * capability.
   *
   * If the server doesn't automatically forget the room, the user will still be
   * allowed to retrieve history from the room which they were previously allowed to
   * see.
   *
   * @example
   * ```ts
   * const response = await client.matrix.rooms.leave(
   *   '!nkl290a:matrix.org',
   * );
   * ```
   */
  leave(roomID: string, body: RoomLeaveParams, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post(path`/_matrix/client/v3/rooms/${roomID}/leave`, { body, ...options });
  }
}
export class Rooms extends BaseRooms {
  accountData: AccountDataAPI.AccountData = new AccountDataAPI.AccountData(this._client);
  state: StateAPI.State = new StateAPI.State(this._client);
  events: EventsAPI.Events = new EventsAPI.Events(this._client);
}

/**
 * Information about the newly created room.
 */
export interface RoomCreateResponse {
  /**
   * The created room's ID.
   */
  room_id: string;
}

export interface RoomJoinResponse {
  /**
   * The joined room ID.
   */
  room_id: string;
}

export type RoomLeaveResponse = unknown;

export interface RoomCreateParams {
  /**
   * Extra keys, such as `m.federate`, to be added to the content of the
   * [`m.room.create`](https://spec.matrix.org/v1.18/client-server-api/#mroomcreate)
   * event.
   *
   * The server will overwrite the following keys: `creator`, `room_version`. Future
   * versions of the specification may allow the server to overwrite other keys.
   *
   * When using the `trusted_private_chat` preset, the server SHOULD combine
   * `additional_creators` specified here and the `invite` array into the eventual
   * `m.room.create` event's `additional_creators`, deduplicating between the two
   * parameters.
   */
  creation_content?: unknown;

  /**
   * A list of state events to set in the new room. This allows the user to override
   * the default state events set in the new room. The expected format of the state
   * events are an object with type, state_key and content keys set.
   *
   * Takes precedence over events set by `preset`, but gets overridden by `name` and
   * `topic` keys.
   */
  initial_state?: Array<RoomCreateParams.InitialState>;

  /**
   * A list of user IDs to invite to the room. This will tell the server to invite
   * everyone in the list to the newly created room.
   */
  invite?: Array<string>;

  /**
   * A list of objects representing third-party IDs to invite into the room.
   */
  invite_3pid?: Array<RoomCreateParams.Invite3pid>;

  /**
   * This flag makes the server set the `is_direct` flag on the `m.room.member`
   * events sent to the users in `invite` and `invite_3pid`. See
   * [Direct Messaging](https://spec.matrix.org/v1.18/client-server-api/#direct-messaging)
   * for more information.
   */
  is_direct?: boolean;

  /**
   * If this is included, an
   * [`m.room.name`](https://spec.matrix.org/v1.18/client-server-api/#mroomname)
   * event will be sent into the room to indicate the name for the room. This
   * overwrites any
   * [`m.room.name`](https://spec.matrix.org/v1.18/client-server-api/#mroomname)
   * event in `initial_state`.
   */
  name?: string;

  /**
   * The power level content to override in the default power level event. This
   * object is applied on top of the generated
   * [`m.room.power_levels`](https://spec.matrix.org/v1.18/client-server-api/#mroompower_levels)
   * event content prior to it being sent to the room. Defaults to overriding
   * nothing.
   */
  power_level_content_override?: unknown;

  /**
   * Convenience parameter for setting various default state events based on a
   * preset.
   *
   * If unspecified, the server should use the `visibility` to determine which preset
   * to use. A visibility of `public` equates to a preset of `public_chat` and
   * `private` visibility equates to a preset of `private_chat`.
   */
  preset?: 'private_chat' | 'public_chat' | 'trusted_private_chat';

  /**
   * The desired room alias **local part**. If this is included, a room alias will be
   * created and mapped to the newly created room. The alias will belong on the
   * _same_ homeserver which created the room. For example, if this was set to "foo"
   * and sent to the homeserver "example.com" the complete room alias would be
   * `#foo:example.com`.
   *
   * The complete room alias will become the canonical alias for the room and an
   * `m.room.canonical_alias` event will be sent into the room.
   */
  room_alias_name?: string;

  /**
   * The room version to set for the room. If not provided, the homeserver is to use
   * its configured default. If provided, the homeserver will return a 400 error with
   * the errcode `M_UNSUPPORTED_ROOM_VERSION` if it does not support the room
   * version.
   */
  room_version?: string;

  /**
   * If this is included, an
   * [`m.room.topic`](https://spec.matrix.org/v1.18/client-server-api/#mroomtopic)
   * event with a `text/plain` mimetype will be sent into the room to indicate the
   * topic for the room. This overwrites any
   * [`m.room.topic`](https://spec.matrix.org/v1.18/client-server-api/#mroomtopic)
   * event in `initial_state`.
   */
  topic?: string;

  /**
   * The room's visibility in the server's
   * [published room directory](https://spec.matrix.org/v1.18/client-server-api#published-room-directory).
   * Defaults to `private`.
   */
  visibility?: 'public' | 'private';
}

export namespace RoomCreateParams {
  export interface InitialState {
    /**
     * The content of the event.
     */
    content: unknown;

    /**
     * The type of event to send.
     */
    type: string;

    /**
     * The state_key of the state event. Defaults to an empty string.
     */
    state_key?: string;
  }

  export interface Invite3pid {
    /**
     * The invitee's third-party identifier.
     */
    address: string;

    /**
     * An access token previously registered with the identity server. Servers can
     * treat this as optional to distinguish between r0.5-compatible clients and this
     * specification version.
     */
    id_access_token: string;

    /**
     * The hostname+port of the identity server which should be used for third-party
     * identifier lookups.
     */
    id_server: string;

    /**
     * The kind of address being passed in the address field, for example `email` (see
     * [the list of recognised values](https://spec.matrix.org/v1.18/appendices/#3pid-types)).
     */
    medium: string;
  }
}

export interface RoomJoinParams {
  /**
   * Query param: The servers to attempt to join the room through. One of the servers
   * must be participating in the room.
   */
  via?: Array<string>;

  /**
   * Body param: Optional reason to be included as the `reason` on the subsequent
   * membership event.
   */
  reason?: string;

  /**
   * Body param: A signature of an `m.third_party_invite` token to prove that this
   * user owns a third-party identity which has been invited to the room.
   */
  third_party_signed?: RoomJoinParams.ThirdPartySigned;
}

export namespace RoomJoinParams {
  /**
   * A signature of an `m.third_party_invite` token to prove that this user owns a
   * third-party identity which has been invited to the room.
   */
  export interface ThirdPartySigned {
    /**
     * The state key of the m.third_party_invite event.
     */
    token: string;

    /**
     * The Matrix ID of the invitee.
     */
    mxid: string;

    /**
     * The Matrix ID of the user who issued the invite.
     */
    sender: string;

    /**
     * A signatures object containing a signature of the entire signed object.
     */
    signatures: { [key: string]: { [key: string]: string } };
  }
}

export interface RoomLeaveParams {
  /**
   * Optional reason to be included as the `reason` on the subsequent membership
   * event.
   */
  reason?: string;
}

Rooms.AccountData = AccountData;
Rooms.BaseAccountData = BaseAccountData;
Rooms.State = State;
Rooms.BaseState = BaseState;
Rooms.Events = Events;
Rooms.BaseEvents = BaseEvents;

export declare namespace Rooms {
  export {
    type RoomCreateResponse as RoomCreateResponse,
    type RoomJoinResponse as RoomJoinResponse,
    type RoomLeaveResponse as RoomLeaveResponse,
    type RoomCreateParams as RoomCreateParams,
    type RoomJoinParams as RoomJoinParams,
    type RoomLeaveParams as RoomLeaveParams,
  };

  export {
    AccountData as AccountData,
    BaseAccountData as BaseAccountData,
    type AccountDataRetrieveResponse as AccountDataRetrieveResponse,
    type AccountDataUpdateResponse as AccountDataUpdateResponse,
    type AccountDataRetrieveParams as AccountDataRetrieveParams,
    type AccountDataUpdateParams as AccountDataUpdateParams,
  };

  export {
    State as State,
    BaseState as BaseState,
    type StateRetrieveResponse as StateRetrieveResponse,
    type StateListResponse as StateListResponse,
    type StateRetrieveParams as StateRetrieveParams,
  };

  export {
    Events as Events,
    BaseEvents as BaseEvents,
    type EventRetrieveResponse as EventRetrieveResponse,
    type EventRetrieveParams as EventRetrieveParams,
  };
}
