// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';

export class BaseSAS extends APIResource {
  static override readonly _key: readonly ['app', 'verifications', 'sas'] = Object.freeze([
    'app',
    'verifications',
    'sas',
  ] as const);
}
export class SAS extends BaseSAS {}
