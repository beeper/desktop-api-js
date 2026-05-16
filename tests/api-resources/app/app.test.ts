// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { BaseApp } from '@beeper/desktop-api/resources/app/app';

import BeeperDesktop from '@beeper/desktop-api';
import { createClient, type PartialBeeperDesktop } from '@beeper/desktop-api/tree-shakable';

const client = new BeeperDesktop({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

const partialClient = createClient({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
  resources: [BaseApp],
});

const runTests = (client: PartialBeeperDesktop<{ app: BaseApp }>) => {
  test('status', async () => {
    const responsePromise = client.app.status();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
};
describe('resource app', () => runTests(client));
describe('resource app (tree shakable, base)', () => runTests(partialClient));
