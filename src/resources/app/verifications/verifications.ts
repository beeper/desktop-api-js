// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as QrAPI from './qr';
import { BaseQr, Qr } from './qr';
import * as SASAPI from './sas';
import { BaseSAS, SAS } from './sas';

/**
 * Manage device verification transactions
 */
export class BaseVerifications extends APIResource {
  static override readonly _key: readonly ['app', 'verifications'] = Object.freeze([
    'app',
    'verifications',
  ] as const);
}
/**
 * Manage device verification transactions
 */
export class Verifications extends BaseVerifications {
  qr: QrAPI.Qr = new QrAPI.Qr(this._client);
  sas: SASAPI.SAS = new SASAPI.SAS(this._client);
}

Verifications.Qr = Qr;
Verifications.BaseQr = BaseQr;
Verifications.SAS = SAS;
Verifications.BaseSAS = BaseSAS;

export declare namespace Verifications {
  export { Qr as Qr, BaseQr as BaseQr };

  export { SAS as SAS, BaseSAS as BaseSAS };
}
