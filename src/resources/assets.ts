// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * Manage assets in Beeper Desktop, like message attachments
 */
export class Assets extends APIResource {
  /**
   * Download a Matrix asset using its mxc:// or localmxc:// URL to the device
   * running Beeper Desktop and return the local file URL.
   *
   * @example
   * ```ts
   * const response = await client.assets.download({
   *   url: 'mxc://example.org/Q4x9CqGz1pB3Oa6XgJ',
   * });
   * ```
   */
  download(body: AssetDownloadParams, options?: RequestOptions): APIPromise<AssetDownloadResponse> {
    return this._client.post('/v1/assets/download', { body, ...options });
  }
}

export interface AssetDownloadResponse {
  /**
   * Error message if the download failed.
   */
  error?: string;

  /**
   * Local file URL to the downloaded asset.
   */
  srcURL?: string;
}

export interface AssetDownloadParams {
  /**
   * Matrix content URL (mxc:// or localmxc://) for the asset to download.
   */
  url: string;
}

export declare namespace Assets {
  export {
    type AssetDownloadResponse as AssetDownloadResponse,
    type AssetDownloadParams as AssetDownloadParams,
  };
}
