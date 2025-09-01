// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

/**
 * Attachments operations
 */
export class Attachments extends APIResource {
  /**
   * Download an attachment from a message and return the local file path
   *
   * @example
   * ```ts
   * const response = await client.messages.attachments.download(
   *   {
   *     chatID: '!NCdzlIaMjZUmvmvyHU:beeper.com',
   *     messageID: 'messageID',
   *   },
   * );
   * ```
   */
  download(body: AttachmentDownloadParams, options?: RequestOptions): APIPromise<AttachmentDownloadResponse> {
    return this._client.post('/v0/download-attachment', { body, ...options });
  }
}

export interface AttachmentDownloadResponse {
  /**
   * Whether the attachment was successfully downloaded.
   */
  success: boolean;

  /**
   * Error message if the download failed.
   */
  error?: string;

  /**
   * Local file system path to the downloaded attachment.
   */
  filePath?: string;
}

export interface AttachmentDownloadParams {
  /**
   * Unique identifier of the chat (supports both chatID and localChatID).
   */
  chatID: string;

  /**
   * The message ID (eventID) containing the attachment.
   */
  messageID: string;
}

export declare namespace Attachments {
  export {
    type AttachmentDownloadResponse as AttachmentDownloadResponse,
    type AttachmentDownloadParams as AttachmentDownloadParams,
  };
}
