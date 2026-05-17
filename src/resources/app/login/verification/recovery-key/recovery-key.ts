// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../../../core/resource';
import * as ResetAPI from './reset';
import { BaseReset, Reset } from './reset';

export class BaseRecoveryKey extends APIResource {
  static override readonly _key: readonly ['app', 'login', 'verification', 'recoveryKey'] = Object.freeze([
    'app',
    'login',
    'verification',
    'recoveryKey',
  ] as const);
}
export class RecoveryKey extends BaseRecoveryKey {
  reset: ResetAPI.Reset = new ResetAPI.Reset(this._client);
}

RecoveryKey.Reset = Reset;
RecoveryKey.BaseReset = BaseReset;

export declare namespace RecoveryKey {
  export { Reset as Reset, BaseReset as BaseReset };
}
