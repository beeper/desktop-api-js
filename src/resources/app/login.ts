// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

/**
 * Complete first-party Beeper app login
 */
export class BaseLogin extends APIResource {
  static override readonly _key: readonly ['app', 'login'] = Object.freeze(['app', 'login'] as const);

  /**
   * Send a sign-in code to the user email address.
   */
  email(body: LoginEmailParams, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/v1/app/login/email', { body, ...options, __security: {} });
  }

  /**
   * Create a Beeper account after the user chooses a username and accepts the Terms
   * of Use.
   */
  register(body: LoginRegisterParams, options?: RequestOptions): APIPromise<LoginRegisterResponse> {
    return this._client.post('/v1/app/login/register', { body, ...options, __security: {} });
  }

  /**
   * Finish sign-in with the code sent to the user email address. If the user needs a
   * new account, the response includes account creation copy and username
   * suggestions.
   */
  response(body: LoginResponseParams, options?: RequestOptions): APIPromise<LoginResponseResponse> {
    return this._client.post('/v1/app/login/response', { body, ...options, __security: {} });
  }

  /**
   * Start a first-party Beeper Desktop sign-in session.
   */
  start(options?: RequestOptions): APIPromise<LoginStartResponse> {
    return this._client.post('/v1/app/login/start', { ...options, __security: {} });
  }
}
/**
 * Complete first-party Beeper app login
 */
export class Login extends BaseLogin {}

export type LoginEmailResponse = unknown;

export interface LoginRegisterResponse {
  /**
   * Current onboarding state after sign-in.
   */
  appState: LoginRegisterResponse.AppState;

  /**
   * Desktop API credentials for the signed-in app session.
   */
  desktopAPI: LoginRegisterResponse.DesktopAPI;

  /**
   * Account credentials for first-party app setup.
   */
  matrix: LoginRegisterResponse.Matrix;
}

export namespace LoginRegisterResponse {
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

export type LoginResponseResponse = LoginResponseResponse.UnionMember0 | LoginResponseResponse.UnionMember1;

export namespace LoginResponseResponse {
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

export interface LoginStartResponse {
  /**
   * Login request ID to use in the next sign-in step.
   */
  request: string;

  /**
   * Available sign-in methods for this request.
   */
  type: Array<string>;
}

export interface LoginEmailParams {
  /**
   * Email address to send the sign-in code to.
   */
  email: string;

  /**
   * Login request ID returned by the start step.
   */
  request: string;
}

export interface LoginRegisterParams {
  /**
   * Confirms that the user accepted the Terms of Use and acknowledged the Privacy
   * Policy.
   */
  acceptTerms: true;

  /**
   * Registration token returned by Beeper.
   */
  leadToken: string;

  /**
   * Login request ID returned by the start step.
   */
  request: string;

  /**
   * Username selected by the user.
   */
  username: string;
}

export interface LoginResponseParams {
  /**
   * Login request ID returned by the start step.
   */
  request: string;

  /**
   * Sign-in code from the user email.
   */
  response: string;
}

export declare namespace Login {
  export {
    type LoginEmailResponse as LoginEmailResponse,
    type LoginRegisterResponse as LoginRegisterResponse,
    type LoginResponseResponse as LoginResponseResponse,
    type LoginStartResponse as LoginStartResponse,
    type LoginEmailParams as LoginEmailParams,
    type LoginRegisterParams as LoginRegisterParams,
    type LoginResponseParams as LoginResponseParams,
  };
}
