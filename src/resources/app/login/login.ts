// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as VerificationAPI from './verification/verification';
import { BaseVerification, Verification } from './verification/verification';

/**
 * Complete first-party Beeper app login
 */
export class BaseLogin extends APIResource {
  static override readonly _key: readonly ['app', 'login'] = Object.freeze(['app', 'login'] as const);
}
/**
 * Complete first-party Beeper app login
 */
export class Login extends BaseLogin {
  verification: VerificationAPI.Verification = new VerificationAPI.Verification(this._client);
}

Login.Verification = Verification;
Login.BaseVerification = BaseVerification;

export declare namespace Login {
  export { Verification as Verification, BaseVerification as BaseVerification };
}
