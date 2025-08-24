// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as FocusAppAPI from './focus-app';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class ArchiveChat extends APIResource {
  /**
   * Archive or unarchive a chat. Set archived=true to move to archive,
   * archived=false to move back to inbox
   *
   * @example
   * ```ts
   * const baseResponse = await client.archiveChat.archive({
   *   chatID:
   *     '!-5hI_iHR5vSDCtI8PzSDQT0H_3I:ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc.local-whatsapp.localhost',
   * });
   * ```
   */
  archive(body: ArchiveChatArchiveParams, options?: RequestOptions): APIPromise<FocusAppAPI.BaseResponse> {
    return this._client.post('/v0/archive-chat', { body, ...options });
  }
}

export interface ArchiveChatArchiveParams {
  /**
   * The identifier of the chat to archive or unarchive
   */
  chatID: string;

  /**
   * True to archive, false to unarchive
   */
  archived?: boolean;
}

export declare namespace ArchiveChat {
  export { type ArchiveChatArchiveParams as ArchiveChatArchiveParams };
}
