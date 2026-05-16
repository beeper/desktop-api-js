// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * Matrix-compatible APIs for accounts and connected network bridges.
 */
export class BaseAuth extends APIResource {
  static override readonly _key: readonly ['matrix', 'bridges', 'auth'] = Object.freeze([
    'matrix',
    'bridges',
    'auth',
  ] as const);

  /**
   * Get the available login flows.
   *
   * @example
   * ```ts
   * const response = await client.matrix.bridges.auth.listFlows(
   *   'bridgeID',
   * );
   * ```
   */
  listFlows(bridgeID: string, options?: RequestOptions): APIPromise<AuthListFlowsResponse> {
    return this._client.get(
      path`/_matrix/client/unstable/com.beeper.bridge/${bridgeID}/_matrix/provision/v3/login/flows`,
      options,
    );
  }

  /**
   * Get the login IDs of the current user.
   *
   * @example
   * ```ts
   * const response =
   *   await client.matrix.bridges.auth.listLogins('bridgeID');
   * ```
   */
  listLogins(bridgeID: string, options?: RequestOptions): APIPromise<AuthListLoginsResponse> {
    return this._client.get(
      path`/_matrix/client/unstable/com.beeper.bridge/${bridgeID}/_matrix/provision/v3/logins`,
      options,
    );
  }

  /**
   * Log out of an existing login.
   *
   * @example
   * ```ts
   * const response = await client.matrix.bridges.auth.logout(
   *   'bcc68892-b180-414f-9516-b4aadf7d0496',
   *   { bridgeID: 'bridgeID' },
   * );
   * ```
   */
  logout(loginID: string, params: AuthLogoutParams, options?: RequestOptions): APIPromise<unknown> {
    const { bridgeID } = params;
    return this._client.post(
      path`/_matrix/client/unstable/com.beeper.bridge/${bridgeID}/_matrix/provision/v3/logout/${loginID}`,
      options,
    );
  }

  /**
   * This endpoint starts a new login process, which is used to log into the bridge.
   *
   * The basic flow of the entire login, including calling this endpoint, is:
   *
   * 1. Call `GET /v3/login/flows` to get the list of available flows. If there's
   *    more than one flow, ask the user to pick which one they want to use.
   * 2. Call this endpoint with the chosen flow ID to start the login. The first
   *    login step will be returned.
   * 3. Render the information provided in the step.
   * 4. Call the `/login/step/...` endpoint corresponding to the step type:
   *    - For `user_input` and `cookies`, acquire the requested fields before calling
   *      the endpoint.
   *    - For `display_and_wait`, call the endpoint immediately (as there's nothing
   *      to acquire on the client side).
   * 5. Handle the data returned by the login step endpoint:
   *    - If an error is returned, the login has failed and must be restarted (from
   *      either step 1 or step 2) if the user wants to try again.
   *    - If step type `complete` is returned, the login finished successfully.
   *    - Otherwise, go to step 3 with the new data.
   *
   * @example
   * ```ts
   * const response =
   *   await client.matrix.bridges.auth.startLogin('qr', {
   *     bridgeID: 'bridgeID',
   *   });
   * ```
   */
  startLogin(
    flowID: string,
    params: AuthStartLoginParams,
    options?: RequestOptions,
  ): APIPromise<AuthStartLoginResponse> {
    const { bridgeID, login_id } = params;
    return this._client.post(
      path`/_matrix/client/unstable/com.beeper.bridge/${bridgeID}/_matrix/provision/v3/login/start/${flowID}`,
      { query: { login_id }, ...options },
    );
  }

  /**
   * Submit extracted cookies in a login process.
   *
   * @example
   * ```ts
   * const response =
   *   await client.matrix.bridges.auth.submitCookies('stepID', {
   *     bridgeID: 'bridgeID',
   *     loginProcessID: 'loginProcessID',
   *     body: { foo: 'string' },
   *   });
   * ```
   */
  submitCookies(
    stepID: string,
    params: AuthSubmitCookiesParams,
    options?: RequestOptions,
  ): APIPromise<AuthSubmitCookiesResponse> {
    const { bridgeID, loginProcessID, body } = params;
    return this._client.post(
      path`/_matrix/client/unstable/com.beeper.bridge/${bridgeID}/_matrix/provision/v3/login/step/${loginProcessID}/${stepID}/cookies`,
      { body: body, ...options },
    );
  }

  /**
   * Submit user input in a login process.
   *
   * @example
   * ```ts
   * const response =
   *   await client.matrix.bridges.auth.submitUserInput(
   *     'stepID',
   *     {
   *       bridgeID: 'bridgeID',
   *       loginProcessID: 'loginProcessID',
   *       body: { foo: 'string' },
   *     },
   *   );
   * ```
   */
  submitUserInput(
    stepID: string,
    params: AuthSubmitUserInputParams,
    options?: RequestOptions,
  ): APIPromise<AuthSubmitUserInputResponse> {
    const { bridgeID, loginProcessID, body } = params;
    return this._client.post(
      path`/_matrix/client/unstable/com.beeper.bridge/${bridgeID}/_matrix/provision/v3/login/step/${loginProcessID}/${stepID}/user_input`,
      { body: body, ...options },
    );
  }

  /**
   * Wait for the next step after displaying data to the user.
   *
   * @example
   * ```ts
   * const response =
   *   await client.matrix.bridges.auth.waitForStep('stepID', {
   *     bridgeID: 'bridgeID',
   *     loginProcessID: 'loginProcessID',
   *   });
   * ```
   */
  waitForStep(
    stepID: string,
    params: AuthWaitForStepParams,
    options?: RequestOptions,
  ): APIPromise<AuthWaitForStepResponse> {
    const { bridgeID, loginProcessID } = params;
    return this._client.post(
      path`/_matrix/client/unstable/com.beeper.bridge/${bridgeID}/_matrix/provision/v3/login/step/${loginProcessID}/${stepID}/display_and_wait`,
      options,
    );
  }

  /**
   * Get all info that is useful for presenting this bridge in a manager interface.
   *
   * - Server details: remote network details, available login flows, homeserver
   *   name, bridge bot user ID, command prefix
   * - User details: management room ID, list of logins with current state and info
   *
   * @example
   * ```ts
   * const response = await client.matrix.bridges.auth.whoami(
   *   'bridgeID',
   * );
   * ```
   */
  whoami(bridgeID: string, options?: RequestOptions): APIPromise<AuthWhoamiResponse> {
    return this._client.get(
      path`/_matrix/client/unstable/com.beeper.bridge/${bridgeID}/_matrix/provision/v3/whoami`,
      options,
    );
  }
}
/**
 * Matrix-compatible APIs for accounts and connected network bridges.
 */
export class Auth extends BaseAuth {}

export interface AuthListFlowsResponse {
  flows?: Array<AuthListFlowsResponse.Flow>;
}

export namespace AuthListFlowsResponse {
  /**
   * An individual login flow which can be used to sign into the remote network.
   */
  export interface Flow {
    /**
     * An internal ID that is passed to the /login/start call to start a login with
     * this flow.
     */
    id: string;

    /**
     * A human-readable description of the login flow.
     */
    description: string;

    /**
     * A human-readable name for the login flow.
     */
    name: string;
  }
}

export interface AuthListLoginsResponse {
  login_ids?: Array<string>;
}

/**
 * Empty object
 */
export type AuthLogoutResponse = unknown;

/**
 * A step in a login process.
 */
export type AuthStartLoginResponse =
  | AuthStartLoginResponse.UnionMember0
  | AuthStartLoginResponse.UnionMember1
  | AuthStartLoginResponse.UnionMember2
  | AuthStartLoginResponse.UnionMember3;

export namespace AuthStartLoginResponse {
  /**
   * Display and wait login step
   */
  export interface UnionMember0 {
    /**
     * Parameters for the display and wait login step
     */
    display_and_wait: UnionMember0.DisplayAndWait;

    type: 'display_and_wait';

    /**
     * Human-readable instructions for completing this login step.
     */
    instructions?: string;

    /**
     * An identifier for the current login process. Must be passed to execute more
     * steps of the login.
     */
    login_id?: string;

    /**
     * An unique ID identifying this step. This can be used to implement special
     * behavior in clients.
     */
    step_id?: string;
  }

  export namespace UnionMember0 {
    /**
     * Parameters for the display and wait login step
     */
    export interface DisplayAndWait {
      /**
       * The type of thing to display
       */
      type: 'qr' | 'emoji' | 'code' | 'nothing';

      /**
       * The thing to display (raw data for QR, unicode emoji for emoji, plain string for
       * code)
       */
      data?: string;

      /**
       * An image containing the thing to display. If present, this is recommended over
       * using data directly. For emojis, the URL to the canonical image representation
       * of the emoji
       */
      image_url?: string;
    }
  }

  /**
   * User input login step
   */
  export interface UnionMember1 {
    type: 'user_input';

    /**
     * Parameters for the user input login step
     */
    user_input: UnionMember1.UserInput;

    /**
     * Human-readable instructions for completing this login step.
     */
    instructions?: string;

    /**
     * An identifier for the current login process. Must be passed to execute more
     * steps of the login.
     */
    login_id?: string;

    /**
     * An unique ID identifying this step. This can be used to implement special
     * behavior in clients.
     */
    step_id?: string;
  }

  export namespace UnionMember1 {
    /**
     * Parameters for the user input login step
     */
    export interface UserInput {
      /**
       * The list of fields that the user is requested to fill.
       */
      fields: Array<UserInput.Field>;

      /**
       * A list of media attachments to show the user alongside the form fields.
       */
      attachments?: Array<UserInput.Attachment>;
    }

    export namespace UserInput {
      /**
       * A field that the user can fill.
       */
      export interface Field {
        /**
         * The internal ID of the field. This must be used as the key in the object when
         * submitting the data back to the bridge.
         */
        id: string;

        /**
         * The name of the field shown to the user.
         */
        name: string;

        /**
         * The type of field.
         */
        type:
          | 'username'
          | 'phone_number'
          | 'email'
          | 'password'
          | '2fa_code'
          | 'token'
          | 'url'
          | 'domain'
          | 'select';

        /**
         * A default value that the client can pre-fill the field with.
         */
        default_value?: string;

        /**
         * A more detailed description of the field shown to the user.
         */
        description?: string;

        /**
         * For fields of type select, the valid options.
         */
        options?: Array<string>;

        /**
         * A regular expression that the field value must match.
         */
        pattern?: string;
      }

      /**
       * A media attachment to show the user.
       */
      export interface Attachment {
        /**
         * The raw file content for the attachment encoded in base64.
         */
        content: string;

        /**
         * The filename for the media attachment.
         */
        filename: string;

        /**
         * The type of media attachment, using the same media type identifiers as Matrix
         * attachments. Only some are supported.
         */
        type: 'm.image' | 'm.audio';

        /**
         * Optional but recommended metadata for the attachment. Can generally be derived
         * from the raw content if omitted.
         */
        info?: Attachment.Info;
      }

      export namespace Attachment {
        /**
         * Optional but recommended metadata for the attachment. Can generally be derived
         * from the raw content if omitted.
         */
        export interface Info {
          /**
           * The height of the media in pixels. Only applicable for images and videos.
           */
          h?: number;

          /**
           * The MIME type for the media content.
           */
          mimetype?: string;

          /**
           * The size of the media content in number of bytes. Strongly recommended to
           * include.
           */
          size?: number;

          /**
           * The width of the media in pixels. Only applicable for images and videos.
           */
          w?: number;
        }
      }
    }
  }

  /**
   * Cookie login step
   */
  export interface UnionMember2 {
    /**
     * Parameters for the cookie login step
     */
    cookies: UnionMember2.Cookies;

    type: 'cookies';

    /**
     * Human-readable instructions for completing this login step.
     */
    instructions?: string;

    /**
     * An identifier for the current login process. Must be passed to execute more
     * steps of the login.
     */
    login_id?: string;

    /**
     * An unique ID identifying this step. This can be used to implement special
     * behavior in clients.
     */
    step_id?: string;
  }

  export namespace UnionMember2 {
    /**
     * Parameters for the cookie login step
     */
    export interface Cookies {
      /**
       * The list of cookies or other stored data that must be extracted.
       */
      fields: Array<Cookies.Field>;

      /**
       * The URL to open when using a webview to extract cookies.
       */
      url: string;

      /**
       * A JavaScript snippet that can extract some or all of the fields. The snippet
       * will evaluate to a promise that resolves when the relevant fields are found.
       * Fields that are not present in the promise result must be extracted another way.
       */
      extract_js?: string;

      /**
       * An optional user agent that the webview should use.
       */
      user_agent?: string;

      /**
       * A regex pattern that the URL should match before the client closes the webview.
       *
       * The client may submit the login if the user closes the webview after all cookies
       * are collected even if this URL is not reached, but it should only automatically
       * close the webview after both cookies and the URL match.
       */
      wait_for_url_pattern?: string;
    }

    export namespace Cookies {
      /**
       * An individual cookie or other stored data item that must be extracted.
       */
      export interface Field {
        /**
         * The name of the item to extract.
         */
        name: string;

        /**
         * The type of data to extract.
         */
        type: 'cookie' | 'local_storage' | 'request_header' | 'request_body' | 'special';

        /**
         * For the `cookie` type, the domain of the cookie.
         */
        cookie_domain?: string;

        /**
         * For the `request_header` and `request_body` types, a regex that matches the URLs
         * from which the values can be extracted.
         */
        request_url_regex?: string;
      }
    }
  }

  /**
   * Login complete
   */
  export interface UnionMember3 {
    /**
     * Information about the completed login
     */
    complete: UnionMember3.Complete;

    type: 'complete';

    /**
     * Human-readable instructions for completing this login step.
     */
    instructions?: string;

    /**
     * An identifier for the current login process. Must be passed to execute more
     * steps of the login.
     */
    login_id?: string;

    /**
     * An unique ID identifying this step. This can be used to implement special
     * behavior in clients.
     */
    step_id?: string;
  }

  export namespace UnionMember3 {
    /**
     * Information about the completed login
     */
    export interface Complete {
      /**
       * The unique ID of a login. Defined by the network connector.
       */
      user_login_id?: string;
    }
  }
}

/**
 * A step in a login process.
 */
export type AuthSubmitCookiesResponse =
  | AuthSubmitCookiesResponse.UnionMember0
  | AuthSubmitCookiesResponse.UnionMember1
  | AuthSubmitCookiesResponse.UnionMember2
  | AuthSubmitCookiesResponse.UnionMember3;

export namespace AuthSubmitCookiesResponse {
  /**
   * Display and wait login step
   */
  export interface UnionMember0 {
    /**
     * Parameters for the display and wait login step
     */
    display_and_wait: UnionMember0.DisplayAndWait;

    type: 'display_and_wait';

    /**
     * Human-readable instructions for completing this login step.
     */
    instructions?: string;

    /**
     * An identifier for the current login process. Must be passed to execute more
     * steps of the login.
     */
    login_id?: string;

    /**
     * An unique ID identifying this step. This can be used to implement special
     * behavior in clients.
     */
    step_id?: string;
  }

  export namespace UnionMember0 {
    /**
     * Parameters for the display and wait login step
     */
    export interface DisplayAndWait {
      /**
       * The type of thing to display
       */
      type: 'qr' | 'emoji' | 'code' | 'nothing';

      /**
       * The thing to display (raw data for QR, unicode emoji for emoji, plain string for
       * code)
       */
      data?: string;

      /**
       * An image containing the thing to display. If present, this is recommended over
       * using data directly. For emojis, the URL to the canonical image representation
       * of the emoji
       */
      image_url?: string;
    }
  }

  /**
   * User input login step
   */
  export interface UnionMember1 {
    type: 'user_input';

    /**
     * Parameters for the user input login step
     */
    user_input: UnionMember1.UserInput;

    /**
     * Human-readable instructions for completing this login step.
     */
    instructions?: string;

    /**
     * An identifier for the current login process. Must be passed to execute more
     * steps of the login.
     */
    login_id?: string;

    /**
     * An unique ID identifying this step. This can be used to implement special
     * behavior in clients.
     */
    step_id?: string;
  }

  export namespace UnionMember1 {
    /**
     * Parameters for the user input login step
     */
    export interface UserInput {
      /**
       * The list of fields that the user is requested to fill.
       */
      fields: Array<UserInput.Field>;

      /**
       * A list of media attachments to show the user alongside the form fields.
       */
      attachments?: Array<UserInput.Attachment>;
    }

    export namespace UserInput {
      /**
       * A field that the user can fill.
       */
      export interface Field {
        /**
         * The internal ID of the field. This must be used as the key in the object when
         * submitting the data back to the bridge.
         */
        id: string;

        /**
         * The name of the field shown to the user.
         */
        name: string;

        /**
         * The type of field.
         */
        type:
          | 'username'
          | 'phone_number'
          | 'email'
          | 'password'
          | '2fa_code'
          | 'token'
          | 'url'
          | 'domain'
          | 'select';

        /**
         * A default value that the client can pre-fill the field with.
         */
        default_value?: string;

        /**
         * A more detailed description of the field shown to the user.
         */
        description?: string;

        /**
         * For fields of type select, the valid options.
         */
        options?: Array<string>;

        /**
         * A regular expression that the field value must match.
         */
        pattern?: string;
      }

      /**
       * A media attachment to show the user.
       */
      export interface Attachment {
        /**
         * The raw file content for the attachment encoded in base64.
         */
        content: string;

        /**
         * The filename for the media attachment.
         */
        filename: string;

        /**
         * The type of media attachment, using the same media type identifiers as Matrix
         * attachments. Only some are supported.
         */
        type: 'm.image' | 'm.audio';

        /**
         * Optional but recommended metadata for the attachment. Can generally be derived
         * from the raw content if omitted.
         */
        info?: Attachment.Info;
      }

      export namespace Attachment {
        /**
         * Optional but recommended metadata for the attachment. Can generally be derived
         * from the raw content if omitted.
         */
        export interface Info {
          /**
           * The height of the media in pixels. Only applicable for images and videos.
           */
          h?: number;

          /**
           * The MIME type for the media content.
           */
          mimetype?: string;

          /**
           * The size of the media content in number of bytes. Strongly recommended to
           * include.
           */
          size?: number;

          /**
           * The width of the media in pixels. Only applicable for images and videos.
           */
          w?: number;
        }
      }
    }
  }

  /**
   * Cookie login step
   */
  export interface UnionMember2 {
    /**
     * Parameters for the cookie login step
     */
    cookies: UnionMember2.Cookies;

    type: 'cookies';

    /**
     * Human-readable instructions for completing this login step.
     */
    instructions?: string;

    /**
     * An identifier for the current login process. Must be passed to execute more
     * steps of the login.
     */
    login_id?: string;

    /**
     * An unique ID identifying this step. This can be used to implement special
     * behavior in clients.
     */
    step_id?: string;
  }

  export namespace UnionMember2 {
    /**
     * Parameters for the cookie login step
     */
    export interface Cookies {
      /**
       * The list of cookies or other stored data that must be extracted.
       */
      fields: Array<Cookies.Field>;

      /**
       * The URL to open when using a webview to extract cookies.
       */
      url: string;

      /**
       * A JavaScript snippet that can extract some or all of the fields. The snippet
       * will evaluate to a promise that resolves when the relevant fields are found.
       * Fields that are not present in the promise result must be extracted another way.
       */
      extract_js?: string;

      /**
       * An optional user agent that the webview should use.
       */
      user_agent?: string;

      /**
       * A regex pattern that the URL should match before the client closes the webview.
       *
       * The client may submit the login if the user closes the webview after all cookies
       * are collected even if this URL is not reached, but it should only automatically
       * close the webview after both cookies and the URL match.
       */
      wait_for_url_pattern?: string;
    }

    export namespace Cookies {
      /**
       * An individual cookie or other stored data item that must be extracted.
       */
      export interface Field {
        /**
         * The name of the item to extract.
         */
        name: string;

        /**
         * The type of data to extract.
         */
        type: 'cookie' | 'local_storage' | 'request_header' | 'request_body' | 'special';

        /**
         * For the `cookie` type, the domain of the cookie.
         */
        cookie_domain?: string;

        /**
         * For the `request_header` and `request_body` types, a regex that matches the URLs
         * from which the values can be extracted.
         */
        request_url_regex?: string;
      }
    }
  }

  /**
   * Login complete
   */
  export interface UnionMember3 {
    /**
     * Information about the completed login
     */
    complete: UnionMember3.Complete;

    type: 'complete';

    /**
     * Human-readable instructions for completing this login step.
     */
    instructions?: string;

    /**
     * An identifier for the current login process. Must be passed to execute more
     * steps of the login.
     */
    login_id?: string;

    /**
     * An unique ID identifying this step. This can be used to implement special
     * behavior in clients.
     */
    step_id?: string;
  }

  export namespace UnionMember3 {
    /**
     * Information about the completed login
     */
    export interface Complete {
      /**
       * The unique ID of a login. Defined by the network connector.
       */
      user_login_id?: string;
    }
  }
}

/**
 * A step in a login process.
 */
export type AuthSubmitUserInputResponse =
  | AuthSubmitUserInputResponse.UnionMember0
  | AuthSubmitUserInputResponse.UnionMember1
  | AuthSubmitUserInputResponse.UnionMember2
  | AuthSubmitUserInputResponse.UnionMember3;

export namespace AuthSubmitUserInputResponse {
  /**
   * Display and wait login step
   */
  export interface UnionMember0 {
    /**
     * Parameters for the display and wait login step
     */
    display_and_wait: UnionMember0.DisplayAndWait;

    type: 'display_and_wait';

    /**
     * Human-readable instructions for completing this login step.
     */
    instructions?: string;

    /**
     * An identifier for the current login process. Must be passed to execute more
     * steps of the login.
     */
    login_id?: string;

    /**
     * An unique ID identifying this step. This can be used to implement special
     * behavior in clients.
     */
    step_id?: string;
  }

  export namespace UnionMember0 {
    /**
     * Parameters for the display and wait login step
     */
    export interface DisplayAndWait {
      /**
       * The type of thing to display
       */
      type: 'qr' | 'emoji' | 'code' | 'nothing';

      /**
       * The thing to display (raw data for QR, unicode emoji for emoji, plain string for
       * code)
       */
      data?: string;

      /**
       * An image containing the thing to display. If present, this is recommended over
       * using data directly. For emojis, the URL to the canonical image representation
       * of the emoji
       */
      image_url?: string;
    }
  }

  /**
   * User input login step
   */
  export interface UnionMember1 {
    type: 'user_input';

    /**
     * Parameters for the user input login step
     */
    user_input: UnionMember1.UserInput;

    /**
     * Human-readable instructions for completing this login step.
     */
    instructions?: string;

    /**
     * An identifier for the current login process. Must be passed to execute more
     * steps of the login.
     */
    login_id?: string;

    /**
     * An unique ID identifying this step. This can be used to implement special
     * behavior in clients.
     */
    step_id?: string;
  }

  export namespace UnionMember1 {
    /**
     * Parameters for the user input login step
     */
    export interface UserInput {
      /**
       * The list of fields that the user is requested to fill.
       */
      fields: Array<UserInput.Field>;

      /**
       * A list of media attachments to show the user alongside the form fields.
       */
      attachments?: Array<UserInput.Attachment>;
    }

    export namespace UserInput {
      /**
       * A field that the user can fill.
       */
      export interface Field {
        /**
         * The internal ID of the field. This must be used as the key in the object when
         * submitting the data back to the bridge.
         */
        id: string;

        /**
         * The name of the field shown to the user.
         */
        name: string;

        /**
         * The type of field.
         */
        type:
          | 'username'
          | 'phone_number'
          | 'email'
          | 'password'
          | '2fa_code'
          | 'token'
          | 'url'
          | 'domain'
          | 'select';

        /**
         * A default value that the client can pre-fill the field with.
         */
        default_value?: string;

        /**
         * A more detailed description of the field shown to the user.
         */
        description?: string;

        /**
         * For fields of type select, the valid options.
         */
        options?: Array<string>;

        /**
         * A regular expression that the field value must match.
         */
        pattern?: string;
      }

      /**
       * A media attachment to show the user.
       */
      export interface Attachment {
        /**
         * The raw file content for the attachment encoded in base64.
         */
        content: string;

        /**
         * The filename for the media attachment.
         */
        filename: string;

        /**
         * The type of media attachment, using the same media type identifiers as Matrix
         * attachments. Only some are supported.
         */
        type: 'm.image' | 'm.audio';

        /**
         * Optional but recommended metadata for the attachment. Can generally be derived
         * from the raw content if omitted.
         */
        info?: Attachment.Info;
      }

      export namespace Attachment {
        /**
         * Optional but recommended metadata for the attachment. Can generally be derived
         * from the raw content if omitted.
         */
        export interface Info {
          /**
           * The height of the media in pixels. Only applicable for images and videos.
           */
          h?: number;

          /**
           * The MIME type for the media content.
           */
          mimetype?: string;

          /**
           * The size of the media content in number of bytes. Strongly recommended to
           * include.
           */
          size?: number;

          /**
           * The width of the media in pixels. Only applicable for images and videos.
           */
          w?: number;
        }
      }
    }
  }

  /**
   * Cookie login step
   */
  export interface UnionMember2 {
    /**
     * Parameters for the cookie login step
     */
    cookies: UnionMember2.Cookies;

    type: 'cookies';

    /**
     * Human-readable instructions for completing this login step.
     */
    instructions?: string;

    /**
     * An identifier for the current login process. Must be passed to execute more
     * steps of the login.
     */
    login_id?: string;

    /**
     * An unique ID identifying this step. This can be used to implement special
     * behavior in clients.
     */
    step_id?: string;
  }

  export namespace UnionMember2 {
    /**
     * Parameters for the cookie login step
     */
    export interface Cookies {
      /**
       * The list of cookies or other stored data that must be extracted.
       */
      fields: Array<Cookies.Field>;

      /**
       * The URL to open when using a webview to extract cookies.
       */
      url: string;

      /**
       * A JavaScript snippet that can extract some or all of the fields. The snippet
       * will evaluate to a promise that resolves when the relevant fields are found.
       * Fields that are not present in the promise result must be extracted another way.
       */
      extract_js?: string;

      /**
       * An optional user agent that the webview should use.
       */
      user_agent?: string;

      /**
       * A regex pattern that the URL should match before the client closes the webview.
       *
       * The client may submit the login if the user closes the webview after all cookies
       * are collected even if this URL is not reached, but it should only automatically
       * close the webview after both cookies and the URL match.
       */
      wait_for_url_pattern?: string;
    }

    export namespace Cookies {
      /**
       * An individual cookie or other stored data item that must be extracted.
       */
      export interface Field {
        /**
         * The name of the item to extract.
         */
        name: string;

        /**
         * The type of data to extract.
         */
        type: 'cookie' | 'local_storage' | 'request_header' | 'request_body' | 'special';

        /**
         * For the `cookie` type, the domain of the cookie.
         */
        cookie_domain?: string;

        /**
         * For the `request_header` and `request_body` types, a regex that matches the URLs
         * from which the values can be extracted.
         */
        request_url_regex?: string;
      }
    }
  }

  /**
   * Login complete
   */
  export interface UnionMember3 {
    /**
     * Information about the completed login
     */
    complete: UnionMember3.Complete;

    type: 'complete';

    /**
     * Human-readable instructions for completing this login step.
     */
    instructions?: string;

    /**
     * An identifier for the current login process. Must be passed to execute more
     * steps of the login.
     */
    login_id?: string;

    /**
     * An unique ID identifying this step. This can be used to implement special
     * behavior in clients.
     */
    step_id?: string;
  }

  export namespace UnionMember3 {
    /**
     * Information about the completed login
     */
    export interface Complete {
      /**
       * The unique ID of a login. Defined by the network connector.
       */
      user_login_id?: string;
    }
  }
}

/**
 * A step in a login process.
 */
export type AuthWaitForStepResponse =
  | AuthWaitForStepResponse.UnionMember0
  | AuthWaitForStepResponse.UnionMember1
  | AuthWaitForStepResponse.UnionMember2
  | AuthWaitForStepResponse.UnionMember3;

export namespace AuthWaitForStepResponse {
  /**
   * Display and wait login step
   */
  export interface UnionMember0 {
    /**
     * Parameters for the display and wait login step
     */
    display_and_wait: UnionMember0.DisplayAndWait;

    type: 'display_and_wait';

    /**
     * Human-readable instructions for completing this login step.
     */
    instructions?: string;

    /**
     * An identifier for the current login process. Must be passed to execute more
     * steps of the login.
     */
    login_id?: string;

    /**
     * An unique ID identifying this step. This can be used to implement special
     * behavior in clients.
     */
    step_id?: string;
  }

  export namespace UnionMember0 {
    /**
     * Parameters for the display and wait login step
     */
    export interface DisplayAndWait {
      /**
       * The type of thing to display
       */
      type: 'qr' | 'emoji' | 'code' | 'nothing';

      /**
       * The thing to display (raw data for QR, unicode emoji for emoji, plain string for
       * code)
       */
      data?: string;

      /**
       * An image containing the thing to display. If present, this is recommended over
       * using data directly. For emojis, the URL to the canonical image representation
       * of the emoji
       */
      image_url?: string;
    }
  }

  /**
   * User input login step
   */
  export interface UnionMember1 {
    type: 'user_input';

    /**
     * Parameters for the user input login step
     */
    user_input: UnionMember1.UserInput;

    /**
     * Human-readable instructions for completing this login step.
     */
    instructions?: string;

    /**
     * An identifier for the current login process. Must be passed to execute more
     * steps of the login.
     */
    login_id?: string;

    /**
     * An unique ID identifying this step. This can be used to implement special
     * behavior in clients.
     */
    step_id?: string;
  }

  export namespace UnionMember1 {
    /**
     * Parameters for the user input login step
     */
    export interface UserInput {
      /**
       * The list of fields that the user is requested to fill.
       */
      fields: Array<UserInput.Field>;

      /**
       * A list of media attachments to show the user alongside the form fields.
       */
      attachments?: Array<UserInput.Attachment>;
    }

    export namespace UserInput {
      /**
       * A field that the user can fill.
       */
      export interface Field {
        /**
         * The internal ID of the field. This must be used as the key in the object when
         * submitting the data back to the bridge.
         */
        id: string;

        /**
         * The name of the field shown to the user.
         */
        name: string;

        /**
         * The type of field.
         */
        type:
          | 'username'
          | 'phone_number'
          | 'email'
          | 'password'
          | '2fa_code'
          | 'token'
          | 'url'
          | 'domain'
          | 'select';

        /**
         * A default value that the client can pre-fill the field with.
         */
        default_value?: string;

        /**
         * A more detailed description of the field shown to the user.
         */
        description?: string;

        /**
         * For fields of type select, the valid options.
         */
        options?: Array<string>;

        /**
         * A regular expression that the field value must match.
         */
        pattern?: string;
      }

      /**
       * A media attachment to show the user.
       */
      export interface Attachment {
        /**
         * The raw file content for the attachment encoded in base64.
         */
        content: string;

        /**
         * The filename for the media attachment.
         */
        filename: string;

        /**
         * The type of media attachment, using the same media type identifiers as Matrix
         * attachments. Only some are supported.
         */
        type: 'm.image' | 'm.audio';

        /**
         * Optional but recommended metadata for the attachment. Can generally be derived
         * from the raw content if omitted.
         */
        info?: Attachment.Info;
      }

      export namespace Attachment {
        /**
         * Optional but recommended metadata for the attachment. Can generally be derived
         * from the raw content if omitted.
         */
        export interface Info {
          /**
           * The height of the media in pixels. Only applicable for images and videos.
           */
          h?: number;

          /**
           * The MIME type for the media content.
           */
          mimetype?: string;

          /**
           * The size of the media content in number of bytes. Strongly recommended to
           * include.
           */
          size?: number;

          /**
           * The width of the media in pixels. Only applicable for images and videos.
           */
          w?: number;
        }
      }
    }
  }

  /**
   * Cookie login step
   */
  export interface UnionMember2 {
    /**
     * Parameters for the cookie login step
     */
    cookies: UnionMember2.Cookies;

    type: 'cookies';

    /**
     * Human-readable instructions for completing this login step.
     */
    instructions?: string;

    /**
     * An identifier for the current login process. Must be passed to execute more
     * steps of the login.
     */
    login_id?: string;

    /**
     * An unique ID identifying this step. This can be used to implement special
     * behavior in clients.
     */
    step_id?: string;
  }

  export namespace UnionMember2 {
    /**
     * Parameters for the cookie login step
     */
    export interface Cookies {
      /**
       * The list of cookies or other stored data that must be extracted.
       */
      fields: Array<Cookies.Field>;

      /**
       * The URL to open when using a webview to extract cookies.
       */
      url: string;

      /**
       * A JavaScript snippet that can extract some or all of the fields. The snippet
       * will evaluate to a promise that resolves when the relevant fields are found.
       * Fields that are not present in the promise result must be extracted another way.
       */
      extract_js?: string;

      /**
       * An optional user agent that the webview should use.
       */
      user_agent?: string;

      /**
       * A regex pattern that the URL should match before the client closes the webview.
       *
       * The client may submit the login if the user closes the webview after all cookies
       * are collected even if this URL is not reached, but it should only automatically
       * close the webview after both cookies and the URL match.
       */
      wait_for_url_pattern?: string;
    }

    export namespace Cookies {
      /**
       * An individual cookie or other stored data item that must be extracted.
       */
      export interface Field {
        /**
         * The name of the item to extract.
         */
        name: string;

        /**
         * The type of data to extract.
         */
        type: 'cookie' | 'local_storage' | 'request_header' | 'request_body' | 'special';

        /**
         * For the `cookie` type, the domain of the cookie.
         */
        cookie_domain?: string;

        /**
         * For the `request_header` and `request_body` types, a regex that matches the URLs
         * from which the values can be extracted.
         */
        request_url_regex?: string;
      }
    }
  }

  /**
   * Login complete
   */
  export interface UnionMember3 {
    /**
     * Information about the completed login
     */
    complete: UnionMember3.Complete;

    type: 'complete';

    /**
     * Human-readable instructions for completing this login step.
     */
    instructions?: string;

    /**
     * An identifier for the current login process. Must be passed to execute more
     * steps of the login.
     */
    login_id?: string;

    /**
     * An unique ID identifying this step. This can be used to implement special
     * behavior in clients.
     */
    step_id?: string;
  }

  export namespace UnionMember3 {
    /**
     * Information about the completed login
     */
    export interface Complete {
      /**
       * The unique ID of a login. Defined by the network connector.
       */
      user_login_id?: string;
    }
  }
}

/**
 * Info about the bridge and user
 */
export interface AuthWhoamiResponse {
  /**
   * The Matrix user ID of the bridge bot.
   */
  bridge_bot: string;

  /**
   * The command prefix used by this bridge.
   */
  command_prefix: string;

  /**
   * The server name the bridge is running on.
   */
  homeserver: string;

  /**
   * The login flows that the bridge supports.
   */
  login_flows: Array<AuthWhoamiResponse.LoginFlow>;

  /**
   * The logins of the user who made the /whoami call
   */
  logins: Array<AuthWhoamiResponse.Login>;

  /**
   * Info about the network that the bridge is bridging to.
   */
  network: AuthWhoamiResponse.Network;

  /**
   * The Matrix management room ID of the user who made the /whoami call.
   */
  management_room?: string;
}

export namespace AuthWhoamiResponse {
  /**
   * An individual login flow which can be used to sign into the remote network.
   */
  export interface LoginFlow {
    /**
     * An internal ID that is passed to the /login/start call to start a login with
     * this flow.
     */
    id: string;

    /**
     * A human-readable description of the login flow.
     */
    description: string;

    /**
     * A human-readable name for the login flow.
     */
    name: string;
  }

  /**
   * The info of an individual login
   */
  export interface Login {
    /**
     * The unique ID of a login. Defined by the network connector.
     */
    id: string;

    /**
     * A human-readable name for the login. Defined by the network connector.
     */
    name: string;

    /**
     * The profile info of the logged-in user on the remote network.
     */
    profile: Login.Profile;

    /**
     * The connection status of an individual login
     */
    state: Login.State;

    /**
     * The personal filtering space room ID for this login.
     */
    space_room?: string;
  }

  export namespace Login {
    /**
     * The profile info of the logged-in user on the remote network.
     */
    export interface Profile {
      /**
       * The user's avatar
       */
      avatar?: string;

      /**
       * The user's email address
       */
      email?: string;

      /**
       * The user's displayname
       */
      name?: string;

      /**
       * The user's phone number
       */
      phone?: string;

      /**
       * The user's username
       */
      username?: string;
    }

    /**
     * The connection status of an individual login
     */
    export interface State {
      /**
       * The current state of this login.
       */
      state_event: 'CONNECTING' | 'CONNECTED' | 'TRANSIENT_DISCONNECT' | 'BAD_CREDENTIALS' | 'UNKNOWN_ERROR';

      /**
       * The time when the state was last updated.
       */
      timestamp: number;

      /**
       * An error code defined by the network connector.
       */
      error?: string;

      /**
       * Additional arbitrary info provided by the network connector.
       */
      info?: unknown;

      /**
       * A human-readable error message defined by the network connector.
       */
      message?: string;

      /**
       * A reason code for non-error states that aren't exactly successes either.
       */
      reason?: string;
    }
  }

  /**
   * Info about the network that the bridge is bridging to.
   */
  export interface Network {
    /**
     * An identifier uniquely identifying the bridge software.
     */
    beeper_bridge_type: string;

    /**
     * The displayname of the network.
     */
    displayname: string;

    /**
     * The icon of the network as a `mxc://` URI.
     */
    network_icon: string;

    /**
     * An identifier uniquely identifying the network.
     */
    network_id: string;

    /**
     * The URL to the website of the network.
     */
    network_url: string;
  }
}

export interface AuthLogoutParams {
  /**
   * Bridge ID for the connected network account, for example discordgo or
   * local-whatsapp.
   */
  bridgeID: string;
}

export interface AuthStartLoginParams {
  /**
   * Path param: Bridge ID for the connected network account, for example discordgo
   * or local-whatsapp.
   */
  bridgeID: string;

  /**
   * Query param: An existing login ID to re-login as. If this is specified and the
   * user logs into a different account, the provided ID will be logged out.
   */
  login_id?: string;
}

export interface AuthSubmitCookiesParams {
  /**
   * Path param: Bridge ID for the connected network account, for example discordgo
   * or local-whatsapp.
   */
  bridgeID: string;

  /**
   * Path param: The ID of the login process, as returned in the `login_id` field of
   * the start call.
   */
  loginProcessID: string;

  /**
   * Body param
   */
  body: { [key: string]: string };
}

export interface AuthSubmitUserInputParams {
  /**
   * Path param: Bridge ID for the connected network account, for example discordgo
   * or local-whatsapp.
   */
  bridgeID: string;

  /**
   * Path param: The ID of the login process, as returned in the `login_id` field of
   * the start call.
   */
  loginProcessID: string;

  /**
   * Body param
   */
  body: { [key: string]: string };
}

export interface AuthWaitForStepParams {
  /**
   * Bridge ID for the connected network account, for example discordgo or
   * local-whatsapp.
   */
  bridgeID: string;

  /**
   * The ID of the login process, as returned in the `login_id` field of the start
   * call.
   */
  loginProcessID: string;
}

export declare namespace Auth {
  export {
    type AuthListFlowsResponse as AuthListFlowsResponse,
    type AuthListLoginsResponse as AuthListLoginsResponse,
    type AuthLogoutResponse as AuthLogoutResponse,
    type AuthStartLoginResponse as AuthStartLoginResponse,
    type AuthSubmitCookiesResponse as AuthSubmitCookiesResponse,
    type AuthSubmitUserInputResponse as AuthSubmitUserInputResponse,
    type AuthWaitForStepResponse as AuthWaitForStepResponse,
    type AuthWhoamiResponse as AuthWhoamiResponse,
    type AuthLogoutParams as AuthLogoutParams,
    type AuthStartLoginParams as AuthStartLoginParams,
    type AuthSubmitCookiesParams as AuthSubmitCookiesParams,
    type AuthSubmitUserInputParams as AuthSubmitUserInputParams,
    type AuthWaitForStepParams as AuthWaitForStepParams,
  };
}
