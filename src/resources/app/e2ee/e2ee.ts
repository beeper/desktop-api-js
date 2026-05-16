// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as RecoveryCodeAPI from './recovery-code/recovery-code';
import {
  BaseRecoveryCode,
  RecoveryCode,
  RecoveryCodeMarkBackedUpResponse,
  RecoveryCodeVerifyParams,
  RecoveryCodeVerifyResponse,
} from './recovery-code/recovery-code';
import * as VerificationAPI from './verification/verification';
import {
  BaseVerification,
  Verification,
  VerificationAcceptResponse,
  VerificationCancelParams,
  VerificationCancelResponse,
  VerificationCreateParams,
  VerificationCreateResponse,
} from './verification/verification';

/**
 * Manage encrypted messaging setup
 */
export class BaseE2ee extends APIResource {
  static override readonly _key: readonly ['app', 'e2ee'] = Object.freeze(['app', 'e2ee'] as const);
}
/**
 * Manage encrypted messaging setup
 */
export class E2ee extends BaseE2ee {
  recoveryCode: RecoveryCodeAPI.RecoveryCode = new RecoveryCodeAPI.RecoveryCode(this._client);
  verification: VerificationAPI.Verification = new VerificationAPI.Verification(this._client);
}

E2ee.RecoveryCode = RecoveryCode;
E2ee.BaseRecoveryCode = BaseRecoveryCode;
E2ee.Verification = Verification;
E2ee.BaseVerification = BaseVerification;

export declare namespace E2ee {
  export {
    RecoveryCode as RecoveryCode,
    BaseRecoveryCode as BaseRecoveryCode,
    type RecoveryCodeMarkBackedUpResponse as RecoveryCodeMarkBackedUpResponse,
    type RecoveryCodeVerifyResponse as RecoveryCodeVerifyResponse,
    type RecoveryCodeVerifyParams as RecoveryCodeVerifyParams,
  };

  export {
    Verification as Verification,
    BaseVerification as BaseVerification,
    type VerificationCreateResponse as VerificationCreateResponse,
    type VerificationAcceptResponse as VerificationAcceptResponse,
    type VerificationCancelResponse as VerificationCancelResponse,
    type VerificationCreateParams as VerificationCreateParams,
    type VerificationCancelParams as VerificationCancelParams,
  };
}
