// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { BeeperDesktop } from '../client';

export abstract class APIResource {
  protected _client: BeeperDesktop;

  constructor(client: BeeperDesktop) {
    this._client = client;
  }
}
