// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import * as ChatsAPI from './chats/chats';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * App operations
 */
export class App extends APIResource {
  /**
   * Download a Matrix asset using its mxc:// or localmxc:// URL and return the local
   * file URL.
   *
   * @example
   * ```ts
   * const response = await client.app.downloadAsset({
   *   url: 'x',
   * });
   * ```
   */
  downloadAsset(
    body: AppDownloadAssetParams,
    options?: RequestOptions,
  ): APIPromise<AppDownloadAssetResponse> {
    return this._client.post('/v0/download-asset', { body, ...options });
  }

  /**
   * Open Beeper Desktop and optionally navigate to a specific chat, message, or
   * pre-fill draft text and attachment.
   *
   * @example
   * ```ts
   * const response = await client.app.open();
   * ```
   */
  open(body: AppOpenParams | null | undefined = {}, options?: RequestOptions): APIPromise<AppOpenResponse> {
    return this._client.post('/v0/open-app', { body, ...options });
  }

  /**
   * Returns matching chats, participant name matches in groups, and the first page
   * of messages in one call. Paginate messages via search-messages. Paginate chats
   * via search-chats. Uses the same sorting as the chat search in the app.
   *
   * @example
   * ```ts
   * const response = await client.app.search({ query: 'x' });
   * ```
   */
  search(query: AppSearchParams, options?: RequestOptions): APIPromise<AppSearchResponse> {
    return this._client.get('/v0/search', { query, ...options });
  }
}

export interface AppDownloadAssetResponse {
  /**
   * Error message if the download failed.
   */
  error?: string;

  /**
   * Local file URL to the downloaded asset.
   */
  srcURL?: string;
}

/**
 * Response indicating successful app opening.
 */
export interface AppOpenResponse {
  /**
   * Whether the app was successfully opened/focused.
   */
  success: boolean;
}

export interface AppSearchResponse {
  results: AppSearchResponse.Results;
}

export namespace AppSearchResponse {
  export interface Results {
    /**
     * Top chat results.
     */
    chats: Array<ChatsAPI.Chat>;

    /**
     * Top group results by participant matches.
     */
    in_groups: Array<ChatsAPI.Chat>;

    messages: Results.Messages;
  }

  export namespace Results {
    export interface Messages {
      /**
       * Map of chatID -> chat details for chats referenced in items.
       */
      chats: { [key: string]: ChatsAPI.Chat };

      /**
       * True if additional results can be fetched using the provided cursors.
       */
      hasMore: boolean;

      /**
       * Messages matching the query and filters.
       */
      items: Array<Shared.Message>;

      /**
       * Cursor for fetching newer results (use with direction='after'). Opaque string;
       * do not inspect.
       */
      newestCursor: string | null;

      /**
       * Cursor for fetching older results (use with direction='before'). Opaque string;
       * do not inspect.
       */
      oldestCursor: string | null;
    }
  }
}

export interface AppDownloadAssetParams {
  /**
   * Matrix content URL (mxc:// or localmxc://) for the asset to download.
   */
  url: string;
}

export interface AppOpenParams {
  /**
   * Optional Beeper chat ID (or local chat ID) to focus after opening the app. If
   * omitted, only opens/focuses the app.
   */
  chatID?: string;

  /**
   * Optional draft attachment path to populate in the message input field.
   */
  draftAttachmentPath?: string;

  /**
   * Optional draft text to populate in the message input field.
   */
  draftText?: string;

  /**
   * Optional message ID. Jumps to that message in the chat when opening.
   */
  messageID?: string;
}

export interface AppSearchParams {
  /**
   * User-typed search text. Literal word matching (NOT semantic).
   */
  query: string;
}

export declare namespace App {
  export {
    type AppDownloadAssetResponse as AppDownloadAssetResponse,
    type AppOpenResponse as AppOpenResponse,
    type AppSearchResponse as AppSearchResponse,
    type AppDownloadAssetParams as AppDownloadAssetParams,
    type AppOpenParams as AppOpenParams,
    type AppSearchParams as AppSearchParams,
  };
}
