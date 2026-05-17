// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../../../core/resource';

export class BaseReset extends APIResource {
  static override readonly _key: readonly ['app', 'login', 'verification', 'recoveryKey', 'reset'] =
    Object.freeze(['app', 'login', 'verification', 'recoveryKey', 'reset'] as const);
}
export class Reset extends BaseReset {}
