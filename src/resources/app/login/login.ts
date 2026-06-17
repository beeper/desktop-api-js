// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as VerificationAPI from './verification/verification';
import { BaseVerification, Verification as VerificationAPIVerification } from './verification/verification';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';

/**
 * Complete first-party Beeper app login
 */
export class BaseLogin extends APIResource {
  static override readonly _key: readonly ['app', 'login'] = Object.freeze(['app', 'login'] as const);

  /**
   * Send a sign-in code to the user email address for app setup.
   */
  email(body: LoginEmailParams, options?: RequestOptions): APIPromise<void> {
    return this._client.post('/v1/app/setup/email', {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
      __security: {},
    });
  }

  /**
   * Create a Beeper account after the user chooses a username and accepts the Terms
   * of Use.
   */
  register(body: LoginRegisterParams, options?: RequestOptions): APIPromise<LoginRegisterResponse> {
    return this._client.post('/v1/app/setup/register', { body, ...options, __security: {} });
  }

  /**
   * Finish setup sign-in with the code sent to the user email address. If the user
   * needs a new account, the response includes account creation copy and username
   * suggestions.
   */
  response(body: LoginResponseParams, options?: RequestOptions): APIPromise<LoginResponseResponse> {
    return this._client.post('/v1/app/setup/response', { body, ...options, __security: {} });
  }

  /**
   * Start setting up Beeper Desktop or Beeper Server. The flow supports existing
   * Beeper accounts and new account creation.
   */
  start(options?: RequestOptions): APIPromise<LoginStartResponse> {
    return this._client.post('/v1/app/setup/start', { ...options, __security: {} });
  }
}
/**
 * Complete first-party Beeper app login
 */
export class Login extends BaseLogin {
  verification: VerificationAPI.Verification = new VerificationAPI.Verification(this._client);
}

export interface LoginRegisterResponse {
  /**
   * Account credentials for first-party app setup.
   */
  matrix: LoginRegisterResponse.Matrix;

  /**
   * Current app sign-in and encrypted messaging setup state after sign-in.
   */
  session: LoginRegisterResponse.Session;
}

export namespace LoginRegisterResponse {
  /**
   * Account credentials for first-party app setup.
   */
  export interface Matrix {
    /**
     * Beeper account access token. Returned once for first-party app setup.
     */
    accessToken: string;

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
   * Current app sign-in and encrypted messaging setup state after sign-in.
   */
  export interface Session {
    /**
     * Encrypted messaging setup status.
     */
    e2ee: Session.E2EE;

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
    matrix?: Session.Matrix;

    /**
     * Trusted device verification progress.
     */
    verification?: Session.Verification;
  }

  export namespace Session {
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
}

export type LoginResponseResponse =
  | LoginResponseResponse.Success
  | LoginResponseResponse.RegistrationRequired;

export namespace LoginResponseResponse {
  export interface Success {
    /**
     * Account credentials for first-party app setup.
     */
    matrix: Success.Matrix;

    /**
     * Current app sign-in and encrypted messaging setup state after sign-in.
     */
    session: Success.Session;
  }

  export namespace Success {
    /**
     * Account credentials for first-party app setup.
     */
    export interface Matrix {
      /**
       * Beeper account access token. Returned once for first-party app setup.
       */
      accessToken: string;

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
     * Current app sign-in and encrypted messaging setup state after sign-in.
     */
    export interface Session {
      /**
       * Encrypted messaging setup status.
       */
      e2ee: Session.E2EE;

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
      matrix?: Session.Matrix;

      /**
       * Trusted device verification progress.
       */
      verification?: Session.Verification;
    }

    export namespace Session {
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
  }

  export interface RegistrationRequired {
    /**
     * Copy to display during account creation.
     */
    copy: RegistrationRequired.Copy;

    /**
     * Registration token returned by Beeper.
     */
    leadToken: string;

    /**
     * Indicates that the user needs to create a Beeper account.
     */
    registrationRequired: true;

    /**
     * Setup request ID to use when creating the account.
     */
    setupRequestID: string;

    /**
     * Suggested usernames for the new account.
     */
    usernameSuggestions?: Array<string>;
  }

  export namespace RegistrationRequired {
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
   * Setup request ID to use in the next sign-in step.
   */
  setupRequestID: string;

  /**
   * Available sign-in methods for this setup request.
   */
  signInMethods: Array<string>;
}

export interface LoginEmailParams {
  /**
   * Email address to send the sign-in code to.
   */
  email: string;

  /**
   * Setup request ID returned by the start step.
   */
  setupRequestID: string;
}

export interface LoginRegisterParams {
  /**
   * Confirms that the user agreed to our
   * [terms of use](https://www.beeper.com/terms-onboarding) and has read our
   * [privacy policy](https://www.beeper.com/privacy).
   */
  acceptTerms: true;

  /**
   * Registration token returned by Beeper.
   */
  leadToken: string;

  /**
   * Setup request ID returned by the start step.
   */
  setupRequestID: string;

  /**
   * Username selected by the user.
   */
  username: string;
}

export interface LoginResponseParams {
  /**
   * Sign-in code from the user email.
   */
  response: string;

  /**
   * Setup request ID returned by the start step.
   */
  setupRequestID: string;
}

Login.Verification = VerificationAPIVerification;
Login.BaseVerification = BaseVerification;

export declare namespace Login {
  export {
    type LoginRegisterResponse as LoginRegisterResponse,
    type LoginResponseResponse as LoginResponseResponse,
    type LoginStartResponse as LoginStartResponse,
    type LoginEmailParams as LoginEmailParams,
    type LoginRegisterParams as LoginRegisterParams,
    type LoginResponseParams as LoginResponseParams,
  };

  export { VerificationAPIVerification as Verification, BaseVerification as BaseVerification };
}
