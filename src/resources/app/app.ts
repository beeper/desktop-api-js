// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as LoginAPI from './login/login';
import { BaseLogin, Login } from './login/login';
import * as VerificationsAPI from './verifications/verifications';
import { BaseVerifications, Verifications } from './verifications/verifications';

/**
 * Manage Beeper app login and encrypted messaging setup
 */
export class BaseApp extends APIResource {
  static override readonly _key: readonly ['app'] = Object.freeze(['app'] as const);
}
/**
 * Manage Beeper app login and encrypted messaging setup
 */
export class App extends BaseApp {
  login: LoginAPI.Login = new LoginAPI.Login(this._client);
  verifications: VerificationsAPI.Verifications = new VerificationsAPI.Verifications(this._client);
}

/**
 * Trusted device verification progress.
 */
export interface Verification {
  /**
   * Verification ID to pass in verification action paths.
   */
  id: string;

  /**
   * Verification actions that are valid for the current state.
   */
  availableActions: Array<'accept' | 'cancel' | 'qr.confirmScanned' | 'sas.start' | 'sas.confirm'>;

  /**
   * Whether this device started or received the verification.
   */
  direction: 'incoming' | 'outgoing';

  /**
   * Verification methods supported for this transaction.
   */
  methods: Array<'qr' | 'sas'>;

  /**
   * Why this verification exists.
   */
  purpose: 'login' | 'device';

  /**
   * Current trusted-device verification state.
   */
  state: 'requested' | 'ready' | 'sas_ready' | 'qr_scanned' | 'done' | 'cancelled' | 'error';

  /**
   * Verification error details, if verification stopped.
   */
  error?: Verification.Error;

  /**
   * Other device participating in verification.
   */
  otherDevice?: Verification.OtherDevice;

  /**
   * Other Beeper user participating in verification.
   */
  otherUserID?: string;

  /**
   * QR verification data.
   */
  qr?: Verification.Qr;

  /**
   * Emoji or number comparison data for verification.
   */
  sas?: Verification.SAS;
}

export namespace Verification {
  /**
   * Verification error details, if verification stopped.
   */
  export interface Error {
    /**
     * Verification error code.
     */
    code: string;

    /**
     * User-facing verification error message.
     */
    reason: string;
  }

  /**
   * Other device participating in verification.
   */
  export interface OtherDevice {
    /**
     * Other device ID.
     */
    id: string;

    /**
     * Other device display name, if known.
     */
    name?: string;
  }

  /**
   * QR verification data.
   */
  export interface Qr {
    /**
     * QR code payload to display for verification.
     */
    data: string;
  }

  /**
   * Emoji or number comparison data for verification.
   */
  export interface SAS {
    /**
     * Emoji sequence to compare on both devices.
     */
    emojis: string;

    /**
     * Number sequence to compare on both devices.
     */
    decimals?: string;
  }
}

App.Login = Login;
App.BaseLogin = BaseLogin;
App.Verifications = Verifications;
App.BaseVerifications = BaseVerifications;

export declare namespace App {
  export { type Verification as Verification };

  export { Login as Login, BaseLogin as BaseLogin };

  export { Verifications as Verifications, BaseVerifications as BaseVerifications };
}
