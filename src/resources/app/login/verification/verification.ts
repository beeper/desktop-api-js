// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../../core/resource';
import * as RecoveryKeyAPI from './recovery-key/recovery-key';
import {
  BaseRecoveryKey,
  RecoveryKey,
  RecoveryKeyVerifyParams,
  RecoveryKeyVerifyResponse,
} from './recovery-key/recovery-key';

export class BaseVerification extends APIResource {
  static override readonly _key: readonly ['app', 'login', 'verification'] = Object.freeze([
    'app',
    'login',
    'verification',
  ] as const);
}
export class Verification extends BaseVerification {
  recoveryKey: RecoveryKeyAPI.RecoveryKey = new RecoveryKeyAPI.RecoveryKey(this._client);
}

Verification.RecoveryKey = RecoveryKey;
Verification.BaseRecoveryKey = BaseRecoveryKey;

export declare namespace Verification {
  export {
    RecoveryKey as RecoveryKey,
    BaseRecoveryKey as BaseRecoveryKey,
    type RecoveryKeyVerifyResponse as RecoveryKeyVerifyResponse,
    type RecoveryKeyVerifyParams as RecoveryKeyVerifyParams,
  };
}
