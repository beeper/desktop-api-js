// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Shared from './shared';
import * as ChatsAPI from './chats/chats';

export interface DownloadAssetResponse {
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
 * Response indicating successful app focus action.
 */
export interface FocusResponse {
  /**
   * Whether the app was successfully opened/focused.
   */
  success: boolean;
}

export interface SearchResponse {
  results: SearchResponse.Results;
}

export namespace SearchResponse {
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

export interface DownloadAssetParams {
  /**
   * Matrix content URL (mxc:// or localmxc://) for the asset to download.
   */
  url: string;
}

export interface FocusParams {
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

export interface SearchParams {
  /**
   * User-typed search text. Literal word matching (NOT semantic).
   */
  query: string;
}

export declare namespace TopLevel {
  export {
    type DownloadAssetResponse as DownloadAssetResponse,
    type FocusResponse as FocusResponse,
    type SearchResponse as SearchResponse,
    type DownloadAssetParams as DownloadAssetParams,
    type FocusParams as FocusParams,
    type SearchParams as SearchParams,
  };
}
