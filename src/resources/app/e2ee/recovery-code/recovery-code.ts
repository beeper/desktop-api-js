// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../../core/resource';
import * as ResetAPI from './reset';
import {
  BaseReset,
  Reset,
  ResetConfirmParams,
  ResetConfirmResponse,
  ResetCreateParams,
  ResetCreateResponse,
} from './reset';
import { APIPromise } from '../../../../core/api-promise';
import { RequestOptions } from '../../../../internal/request-options';

/**
 * First-party sign-in and encrypted messaging setup for Beeper Desktop.
 */
export class BaseRecoveryCode extends APIResource {
  static override readonly _key: readonly ['app', 'e2ee', 'recoveryCode'] = Object.freeze([
    'app',
    'e2ee',
    'recoveryCode',
  ] as const);

  /**
   * Record that the user saved their recovery key.
   */
  markBackedUp(options?: RequestOptions): APIPromise<RecoveryCodeMarkBackedUpResponse> {
    return this._client.post('/v1/app/e2ee/recovery-code/mark-backed-up', options);
  }

  /**
   * Unlock encrypted messages with the user recovery key.
   */
  verify(body: RecoveryCodeVerifyParams, options?: RequestOptions): APIPromise<RecoveryCodeVerifyResponse> {
    return this._client.post('/v1/app/e2ee/recovery-code/verify', { body, ...options });
  }
}
/**
 * First-party sign-in and encrypted messaging setup for Beeper Desktop.
 */
export class RecoveryCode extends BaseRecoveryCode {
  reset: ResetAPI.Reset = new ResetAPI.Reset(this._client);
}

export interface RecoveryCodeMarkBackedUpResponse {
  /**
   * Current onboarding state after the requested step.
   */
  appState: RecoveryCodeMarkBackedUpResponse.AppState;
}

export namespace RecoveryCodeMarkBackedUpResponse {
  /**
   * Current onboarding state after the requested step.
   */
  export interface AppState {
    /**
     * Encrypted messaging setup status.
     */
    e2ee: AppState.E2ee;

    /**
     * Current onboarding state for Beeper Desktop.
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
    matrix?: AppState.Matrix;

    /**
     * Trusted-device verification progress.
     */
    verification?: AppState.Verification;
  }

  export namespace AppState {
    /**
     * Encrypted messaging setup status.
     */
    export interface E2ee {
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
      hasBackedUpCode: boolean;

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
      secrets: E2ee.Secrets;

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
      recoveryCodeGeneratedAt?: number;
    }

    export namespace E2ee {
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
        recoveryCode: boolean;

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
       * Beeper server URL for this account.
       */
      homeserver: string;

      /**
       * Signed-in Beeper user ID.
       */
      userID: string;
    }

    /**
     * Trusted-device verification progress.
     */
    export interface Verification {
      /**
       * Verification actions that are valid for the current state.
       */
      availableActions: Array<
        'create' | 'qr.scan' | 'accept' | 'cancel' | 'qr.confirmScanned' | 'sas.start' | 'sas.confirm'
      >;

      /**
       * Current trusted-device verification state.
       */
      state: 'idle' | 'requested' | 'ready' | 'sas_ready' | 'qr_scanned' | 'done' | 'cancelled' | 'error';

      /**
       * Verification error details, if verification stopped.
       */
      error?: Verification.Error;

      /**
       * User ID that started verification.
       */
      from?: string;

      /**
       * Device that started verification.
       */
      fromDevice?: string;

      /**
       * Other device participating in verification.
       */
      otherDevice?: string;

      /**
       * QR code payload to display for verification.
       */
      qrData?: string;

      /**
       * Emoji or number comparison data for verification.
       */
      sas?: Verification.Sas;

      /**
       * Whether emoji comparison is available.
       */
      supportsSAS?: boolean;

      /**
       * Whether QR code verification is available.
       */
      supportsScanQRCode?: boolean;

      /**
       * Verification ID to pass in verification action paths.
       */
      verificationID?: string;
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
       * Emoji or number comparison data for verification.
       */
      export interface Sas {
        /**
         * Number sequence to compare on both devices.
         */
        decimals: string;

        /**
         * Emoji sequence to compare on both devices.
         */
        emojis: string;
      }
    }
  }
}

export interface RecoveryCodeVerifyResponse {
  /**
   * Current onboarding state after the requested step.
   */
  appState: RecoveryCodeVerifyResponse.AppState;
}

export namespace RecoveryCodeVerifyResponse {
  /**
   * Current onboarding state after the requested step.
   */
  export interface AppState {
    /**
     * Encrypted messaging setup status.
     */
    e2ee: AppState.E2ee;

    /**
     * Current onboarding state for Beeper Desktop.
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
    matrix?: AppState.Matrix;

    /**
     * Trusted-device verification progress.
     */
    verification?: AppState.Verification;
  }

  export namespace AppState {
    /**
     * Encrypted messaging setup status.
     */
    export interface E2ee {
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
      hasBackedUpCode: boolean;

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
      secrets: E2ee.Secrets;

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
      recoveryCodeGeneratedAt?: number;
    }

    export namespace E2ee {
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
        recoveryCode: boolean;

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
       * Beeper server URL for this account.
       */
      homeserver: string;

      /**
       * Signed-in Beeper user ID.
       */
      userID: string;
    }

    /**
     * Trusted-device verification progress.
     */
    export interface Verification {
      /**
       * Verification actions that are valid for the current state.
       */
      availableActions: Array<
        'create' | 'qr.scan' | 'accept' | 'cancel' | 'qr.confirmScanned' | 'sas.start' | 'sas.confirm'
      >;

      /**
       * Current trusted-device verification state.
       */
      state: 'idle' | 'requested' | 'ready' | 'sas_ready' | 'qr_scanned' | 'done' | 'cancelled' | 'error';

      /**
       * Verification error details, if verification stopped.
       */
      error?: Verification.Error;

      /**
       * User ID that started verification.
       */
      from?: string;

      /**
       * Device that started verification.
       */
      fromDevice?: string;

      /**
       * Other device participating in verification.
       */
      otherDevice?: string;

      /**
       * QR code payload to display for verification.
       */
      qrData?: string;

      /**
       * Emoji or number comparison data for verification.
       */
      sas?: Verification.Sas;

      /**
       * Whether emoji comparison is available.
       */
      supportsSAS?: boolean;

      /**
       * Whether QR code verification is available.
       */
      supportsScanQRCode?: boolean;

      /**
       * Verification ID to pass in verification action paths.
       */
      verificationID?: string;
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
       * Emoji or number comparison data for verification.
       */
      export interface Sas {
        /**
         * Number sequence to compare on both devices.
         */
        decimals: string;

        /**
         * Emoji sequence to compare on both devices.
         */
        emojis: string;
      }
    }
  }
}

export interface RecoveryCodeVerifyParams {
  /**
   * Recovery key saved by the user.
   */
  recoveryCode: string;
}

RecoveryCode.Reset = Reset;
RecoveryCode.BaseReset = BaseReset;

export declare namespace RecoveryCode {
  export {
    type RecoveryCodeMarkBackedUpResponse as RecoveryCodeMarkBackedUpResponse,
    type RecoveryCodeVerifyResponse as RecoveryCodeVerifyResponse,
    type RecoveryCodeVerifyParams as RecoveryCodeVerifyParams,
  };

  export {
    Reset as Reset,
    BaseReset as BaseReset,
    type ResetCreateResponse as ResetCreateResponse,
    type ResetConfirmResponse as ResetConfirmResponse,
    type ResetCreateParams as ResetCreateParams,
    type ResetConfirmParams as ResetConfirmParams,
  };
}
