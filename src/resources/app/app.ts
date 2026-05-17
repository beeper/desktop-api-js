// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as LoginAPI from './login/login';
import {
  BaseLogin,
  Login,
  LoginEmailParams,
  LoginRegisterParams,
  LoginRegisterResponse,
  LoginResponseParams,
  LoginResponseResponse,
  LoginStartResponse,
} from './login/login';
import * as VerificationsAPI from './verifications/verifications';
import {
  BaseVerifications,
  VerificationAcceptResponse,
  VerificationCancelParams,
  VerificationCancelResponse,
  VerificationCreateParams,
  VerificationCreateResponse,
  VerificationListResponse,
  VerificationRetrieveResponse,
  Verifications,
} from './verifications/verifications';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

/**
 * Manage Beeper app login and encrypted messaging setup
 */
export class BaseApp extends APIResource {
  static override readonly _key: readonly ['app'] = Object.freeze(['app'] as const);

  /**
   * Return the current Beeper Desktop or Beeper Server sign-in and encrypted
   * messaging setup state. This endpoint is public before sign-in so apps can
   * discover that sign-in is needed; after sign-in, pass a read token.
   */
  session(options?: RequestOptions): APIPromise<AppSessionResponse> {
    return this._client.get('/v1/app/setup', options);
  }
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

export interface AppSessionResponse {
  /**
   * Encrypted messaging setup status.
   */
  e2ee: AppSessionResponse.E2EE;

  /**
   * Current sign-in and encrypted messaging setup state for Beeper Desktop or Beeper
   * Server.
   */
  state:
    | 'needs-login'
    | 'initializing'
    | 'needs-cross-signing-setup'
    | 'needs-verification'
    | 'needs-secrets'
    | 'needs-first-sync'
    | 'ready';

  /**
   * Signed-in account details. Omitted until sign-in is complete.
   */
  matrix?: AppSessionResponse.Matrix;

  /**
   * Trusted device verification progress.
   */
  verification?: AppSessionResponse.Verification;
}

export namespace AppSessionResponse {
  /**
   * Encrypted messaging setup status.
   */
  export interface E2EE {
    /**
     * Whether this account can verify trusted devices.
     */
    crossSigning: boolean;

    /**
     * Whether the first encrypted message sync is complete.
     */
    firstSyncDone: boolean;

    /**
     * Whether the user confirmed that they saved their recovery key.
     */
    hasBackedUpRecoveryKey: boolean;

    /**
     * Whether encrypted messaging setup has started.
     */
    initialized: boolean;

    /**
     * Whether encrypted message backup is available.
     */
    keyBackup: boolean;

    /**
     * Encrypted messaging keys available on this device.
     */
    secrets: E2EE.Secrets;

    /**
     * Whether secure key storage is available.
     */
    secretStorage: boolean;

    /**
     * Whether this device is trusted for encrypted messages.
     */
    verified: boolean;

    /**
     * Unix timestamp for when the recovery key was created.
     */
    recoveryKeyGeneratedAt?: number;
  }

  export namespace E2EE {
    /**
     * Encrypted messaging keys available on this device.
     */
    export interface Secrets {
      /**
       * Whether the account identity key is available.
       */
      masterKey: boolean;

      /**
       * Whether the encrypted message backup key is available.
       */
      megolmBackupKey: boolean;

      /**
       * Whether a recovery key is available.
       */
      recoveryKey: boolean;

      /**
       * Whether the device trust key is available.
       */
      selfSigningKey: boolean;

      /**
       * Whether the user trust key is available.
       */
      userSigningKey: boolean;
    }
  }

  /**
   * Signed-in account details. Omitted until sign-in is complete.
   */
  export interface Matrix {
    /**
     * Current device ID.
     */
    deviceID: string;

    /**
     * Beeper homeserver URL for this account.
     */
    homeserver: string;

    /**
     * Signed-in Beeper user ID.
     */
    userID: string;
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
}

App.Login = Login;
App.BaseLogin = BaseLogin;
App.Verifications = Verifications;
App.BaseVerifications = BaseVerifications;

export declare namespace App {
  export { type Verification as Verification, type AppSessionResponse as AppSessionResponse };

  export {
    Login as Login,
    BaseLogin as BaseLogin,
    type LoginRegisterResponse as LoginRegisterResponse,
    type LoginResponseResponse as LoginResponseResponse,
    type LoginStartResponse as LoginStartResponse,
    type LoginEmailParams as LoginEmailParams,
    type LoginRegisterParams as LoginRegisterParams,
    type LoginResponseParams as LoginResponseParams,
  };

  export {
    Verifications as Verifications,
    BaseVerifications as BaseVerifications,
    type VerificationCreateResponse as VerificationCreateResponse,
    type VerificationRetrieveResponse as VerificationRetrieveResponse,
    type VerificationListResponse as VerificationListResponse,
    type VerificationAcceptResponse as VerificationAcceptResponse,
    type VerificationCancelResponse as VerificationCancelResponse,
    type VerificationCreateParams as VerificationCreateParams,
    type VerificationCancelParams as VerificationCancelParams,
  };
}
