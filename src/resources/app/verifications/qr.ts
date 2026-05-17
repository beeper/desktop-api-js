// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';

export class BaseQr extends APIResource {
  static override readonly _key: readonly ['app', 'verifications', 'qr'] = Object.freeze([
    'app',
    'verifications',
    'qr',
  ] as const);
}
export class Qr extends BaseQr {}
