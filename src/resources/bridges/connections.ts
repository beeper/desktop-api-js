// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';

export class BaseConnections extends APIResource {
  static override readonly _key: readonly ['bridges', 'connections'] = Object.freeze([
    'bridges',
    'connections',
  ] as const);
}
export class Connections extends BaseConnections {}
