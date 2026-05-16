// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as LoginAPI from './login';
import {
  BaseLogin,
  Login,
  LoginEmailParams,
  LoginEmailResponse,
  LoginRegisterParams,
  LoginRegisterResponse,
  LoginResponseParams,
  LoginResponseResponse,
  LoginStartResponse,
} from './login';
import * as E2eeAPI from './e2ee/e2ee';
import { BaseE2ee, E2ee as E2eeAPIE2ee } from './e2ee/e2ee';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

/**
 * Manage Beeper app login and encrypted messaging setup
 */
export class BaseApp extends APIResource {
  static override readonly _key: readonly ['app'] = Object.freeze(['app'] as const);

  /**
   * Return the current Beeper Desktop sign-in and encrypted messaging setup state.
   * This endpoint is public before sign-in so apps can discover that login is
   * needed; after sign-in, pass a read token.
   */
  status(options?: RequestOptions): APIPromise<AppStatusResponse> {
    return this._client.get('/v1/app/status', options);
  }
}
/**
 * Manage Beeper app login and encrypted messaging setup
 */
export class App extends BaseApp {
  login: LoginAPI.Login = new LoginAPI.Login(this._client);
  e2ee: E2eeAPI.E2ee = new E2eeAPI.E2ee(this._client);
}

export interface LoginRegistrationRequiredResponse {
  /**
   * Copy to display during account creation.
   */
  copy: LoginRegistrationRequiredResponse.Copy;

  /**
   * Registration token returned by Beeper.
   */
  leadToken: string;

  /**
   * Indicates that the user needs to create a Beeper account.
   */
  registrationRequired: true;

  /**
   * Login request ID to use when creating the account.
   */
  request: string;

  /**
   * Suggested usernames for the new account.
   */
  usernameSuggestions?: Array<string>;
}

export namespace LoginRegistrationRequiredResponse {
  /**
   * Copy to display during account creation.
   */
  export interface Copy {
    /**
     * Submit button label.
     */
    submit: 'Continue';

    /**
     * Terms and privacy notice to show before account creation.
     */
    terms: 'By continuing, you agree to the Terms of Use and acknowledge the Privacy Policy.';

    /**
     * Title for the username step.
     */
    title: 'Choose your username';

    /**
     * Placeholder for the username field.
     */
    usernamePlaceholder: 'Username';
  }
}

export interface LoginResponse {
  /**
   * Current onboarding state after sign-in.
   */
  appState: LoginResponse.AppState;

  /**
   * Desktop API credentials for the signed-in app session.
   */
  desktopAPI: LoginResponse.DesktopAPI;

  /**
   * Account credentials for first-party app setup.
   */
  matrix: LoginResponse.Matrix;
}

export namespace LoginResponse {
  /**
   * Current onboarding state after sign-in.
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

  /**
   * Desktop API credentials for the signed-in app session.
   */
  export interface DesktopAPI {
    /**
     * Desktop API access token for this app session.
     */
    accessToken: string;

    /**
     * Granted Desktop API scopes.
     */
    scope: 'read write';

    /**
     * Access token type.
     */
    tokenType: 'Bearer';
  }

  /**
   * Account credentials for first-party app setup.
   */
  export interface Matrix {
    /**
     * Account access token. Returned once for first-party app setup.
     */
    accessToken: string;

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
}

export type LoginResponseOutput = LoginResponseOutput.UnionMember0 | LoginResponseOutput.UnionMember1;

export namespace LoginResponseOutput {
  export interface UnionMember0 {
    /**
     * Current onboarding state after sign-in.
     */
    appState: UnionMember0.AppState;

    /**
     * Desktop API credentials for the signed-in app session.
     */
    desktopAPI: UnionMember0.DesktopAPI;

    /**
     * Account credentials for first-party app setup.
     */
    matrix: UnionMember0.Matrix;
  }

  export namespace UnionMember0 {
    /**
     * Current onboarding state after sign-in.
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

    /**
     * Desktop API credentials for the signed-in app session.
     */
    export interface DesktopAPI {
      /**
       * Desktop API access token for this app session.
       */
      accessToken: string;

      /**
       * Granted Desktop API scopes.
       */
      scope: 'read write';

      /**
       * Access token type.
       */
      tokenType: 'Bearer';
    }

    /**
     * Account credentials for first-party app setup.
     */
    export interface Matrix {
      /**
       * Account access token. Returned once for first-party app setup.
       */
      accessToken: string;

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
  }

  export interface UnionMember1 {
    /**
     * Copy to display during account creation.
     */
    copy: UnionMember1.Copy;

    /**
     * Registration token returned by Beeper.
     */
    leadToken: string;

    /**
     * Indicates that the user needs to create a Beeper account.
     */
    registrationRequired: true;

    /**
     * Login request ID to use when creating the account.
     */
    request: string;

    /**
     * Suggested usernames for the new account.
     */
    usernameSuggestions?: Array<string>;
  }

  export namespace UnionMember1 {
    /**
     * Copy to display during account creation.
     */
    export interface Copy {
      /**
       * Submit button label.
       */
      submit: 'Continue';

      /**
       * Terms and privacy notice to show before account creation.
       */
      terms: 'By continuing, you agree to the Terms of Use and acknowledge the Privacy Policy.';

      /**
       * Title for the username step.
       */
      title: 'Choose your username';

      /**
       * Placeholder for the username field.
       */
      usernamePlaceholder: 'Username';
    }
  }
}

export interface RecoveryCodeResetResponse {
  /**
   * Current onboarding state after creating the new recovery key.
   */
  appState: RecoveryCodeResetResponse.AppState;

  /**
   * New recovery key. Show it once and ask the user to save it.
   */
  recoveryCode: string;
}

export namespace RecoveryCodeResetResponse {
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

export interface StartVerificationResponse {
  /**
   * Current onboarding state after starting verification.
   */
  appState: StartVerificationResponse.AppState;

  /**
   * Verification ID to pass in verification action paths.
   */
  verificationID: string;
}

export namespace StartVerificationResponse {
  /**
   * Current onboarding state after starting verification.
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

export interface StateMutationResponse {
  /**
   * Current onboarding state after the requested step.
   */
  appState: StateMutationResponse.AppState;
}

export namespace StateMutationResponse {
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

export interface AppStatusResponse {
  /**
   * Encrypted messaging setup status.
   */
  e2ee: AppStatusResponse.E2ee;

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
  matrix?: AppStatusResponse.Matrix;

  /**
   * Trusted-device verification progress.
   */
  verification?: AppStatusResponse.Verification;
}

export namespace AppStatusResponse {
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

App.Login = Login;
App.BaseLogin = BaseLogin;
App.E2ee = E2eeAPIE2ee;
App.BaseE2ee = BaseE2ee;

export declare namespace App {
  export {
    type LoginRegistrationRequiredResponse as LoginRegistrationRequiredResponse,
    type LoginResponse as LoginResponse,
    type LoginResponseOutput as LoginResponseOutput,
    type RecoveryCodeResetResponse as RecoveryCodeResetResponse,
    type StartVerificationResponse as StartVerificationResponse,
    type StateMutationResponse as StateMutationResponse,
    type AppStatusResponse as AppStatusResponse,
  };

  export {
    Login as Login,
    BaseLogin as BaseLogin,
    type LoginEmailResponse as LoginEmailResponse,
    type LoginRegisterResponse as LoginRegisterResponse,
    type LoginResponseResponse as LoginResponseResponse,
    type LoginStartResponse as LoginStartResponse,
    type LoginEmailParams as LoginEmailParams,
    type LoginRegisterParams as LoginRegisterParams,
    type LoginResponseParams as LoginResponseParams,
  };

  export { E2eeAPIE2ee as E2ee, BaseE2ee as BaseE2ee };
}
