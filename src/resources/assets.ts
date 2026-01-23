// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { maybeMultipartFormRequestOptions } from '../internal/uploads';

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

  /**
   * Upload a file to a temporary location. Supports JSON body with base64 `content`
   * field, or multipart/form-data with `file` field. Returns a local file URL that
   * can be used when sending messages with attachments.
   *
   * @example
   * ```ts
   * const response = await client.assets.upload({
   *   content: 'x',
   * });
   * ```
   */
  upload(body: AssetUploadParams, options?: RequestOptions): APIPromise<AssetUploadResponse> {
    return this._client.post(
      '/v1/assets/upload',
      maybeMultipartFormRequestOptions({ body, ...options }, this._client),
    );
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

export interface AssetUploadResponse {
  /**
   * Duration in seconds (audio/videos)
   */
  duration?: number;

  /**
   * Error message if upload failed
   */
  error?: string;

  /**
   * Resolved filename
   */
  fileName?: string;

  /**
   * File size in bytes
   */
  fileSize?: number;

  /**
   * Height in pixels (images/videos)
   */
  height?: number;

  /**
   * Detected or provided MIME type
   */
  mimeType?: string;

  /**
   * Local file URL (file://) for the uploaded asset
   */
  srcURL?: string;

  /**
   * Unique upload ID for this asset
   */
  uploadID?: string;

  /**
   * Width in pixels (images/videos)
   */
  width?: number;
}

export interface AssetDownloadParams {
  /**
   * Matrix content URL (mxc:// or localmxc://) for the asset to download.
   */
  url: string;
}

export interface AssetUploadParams {
  /**
   * Base64-encoded file content (max ~500MB decoded)
   */
  content: string;

  /**
   * Original filename. Generated if omitted
   */
  fileName?: string;

  /**
   * MIME type. Auto-detected from magic bytes if omitted
   */
  mimeType?: string;
}

export declare namespace Assets {
  export {
    type AssetDownloadResponse as AssetDownloadResponse,
    type AssetUploadResponse as AssetUploadResponse,
    type AssetDownloadParams as AssetDownloadParams,
    type AssetUploadParams as AssetUploadParams,
  };
}
