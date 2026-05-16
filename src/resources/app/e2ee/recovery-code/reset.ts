// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../../core/resource';
import { APIPromise } from '../../../../core/api-promise';
import { RequestOptions } from '../../../../internal/request-options';

/**
 * First-party sign-in and encrypted messaging setup for Beeper Desktop.
 */
export class BaseReset extends APIResource {
  static override readonly _key: readonly ['app', 'e2ee', 'recoveryCode', 'reset'] = Object.freeze([
    'app',
    'e2ee',
    'recoveryCode',
    'reset',
  ] as const);

  /**
   * Create a new recovery key when the user cannot use the existing one.
   */
  create(
    body: ResetCreateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ResetCreateResponse> {
    return this._client.post('/v1/app/e2ee/recovery-code/reset', { body, ...options });
  }

  /**
   * Confirm that the new recovery key should be used for this account.
   */
  confirm(body: ResetConfirmParams, options?: RequestOptions): APIPromise<ResetConfirmResponse> {
    return this._client.post('/v1/app/e2ee/recovery-code/reset/confirm', { body, ...options });
  }
}
/**
 * First-party sign-in and encrypted messaging setup for Beeper Desktop.
 */
export class Reset extends BaseReset {}

export interface ResetCreateResponse {
  /**
   * Current onboarding state after creating the new recovery key.
   */
  appState: ResetCreateResponse.AppState;

  /**
   * New recovery key. Show it once and ask the user to save it.
   */
  recoveryCode: string;
}

export namespace ResetCreateResponse {
  /**
   * Current onboarding state after creating the new recovery key.
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

export interface ResetConfirmResponse {
  /**
   * Current onboarding state after the requested step.
   */
  appState: ResetConfirmResponse.AppState;
}

export namespace ResetConfirmResponse {
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

export interface ResetCreateParams {
  /**
   * Existing recovery key, if the user has it.
   */
  recoveryCode?: string;
}

export interface ResetConfirmParams {
  /**
   * New recovery key returned by the reset step.
   */
  recoveryCode: string;
}

export declare namespace Reset {
  export {
    type ResetCreateResponse as ResetCreateResponse,
    type ResetConfirmResponse as ResetConfirmResponse,
    type ResetCreateParams as ResetCreateParams,
    type ResetConfirmParams as ResetConfirmParams,
  };
}
