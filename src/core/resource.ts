// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { BeeperDesktopAPI } from '../client';

export abstract class APIResource {
  protected _client: BeeperDesktopAPI;

  constructor(client: BeeperDesktopAPI) {
    this._client = client;
  }
}
