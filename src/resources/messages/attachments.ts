// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

/**
 * Attachments operations
 */
export class Attachments extends APIResource {
  /**
   * Download a Matrix asset using its mxc:// or localmxc:// URL and return the local
   * file URL.
   *
   * @example
   * ```ts
   * const response = await client.messages.attachments.download(
   *   { url: 'x' },
   * );
   * ```
   */
  download(body: AttachmentDownloadParams, options?: RequestOptions): APIPromise<AttachmentDownloadResponse> {
    return this._client.post('/v0/download-asset', { body, ...options });
  }
}

export interface AttachmentDownloadResponse {
  /**
   * Error message if the download failed.
   */
  error?: string;

  /**
   * Local file URL to the downloaded asset.
   */
  srcURL?: string;
}

export interface AttachmentDownloadParams {
  /**
   * Matrix content URL (mxc:// or localmxc://) for the asset to download.
   */
  url: string;
}

export declare namespace Attachments {
  export {
    type AttachmentDownloadResponse as AttachmentDownloadResponse,
    type AttachmentDownloadParams as AttachmentDownloadParams,
  };
}
