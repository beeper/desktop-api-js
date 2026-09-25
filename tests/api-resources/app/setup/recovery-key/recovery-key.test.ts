// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Setup } from '@beeper/desktop-api/resources/app/setup/setup';
import { BaseRecoveryKey } from '@beeper/desktop-api/resources/app/setup/recovery-key/recovery-key';

import BeeperDesktop from '@beeper/desktop-api';
import { createClient, type PartialBeeperDesktop } from '@beeper/desktop-api/tree-shakable';

const client = new BeeperDesktop({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

const partialClient = createClient({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
  resources: [BaseRecoveryKey],
});

const parentPartialClient = createClient({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
  resources: [Setup],
});

const runTests = (client: PartialBeeperDesktop<{ app: { setup: { recoveryKey: BaseRecoveryKey } } }>) => {
  test('verify: only required params', async () => {
    const responsePromise = client.app.setup.recoveryKey.verify({ recoveryKey: 'x' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('verify: required and optional params', async () => {
    const response = await client.app.setup.recoveryKey.verify({ recoveryKey: 'x' });
  });
};
describe('resource recoveryKey', () => runTests(client));
describe('resource recoveryKey (tree shakable, base)', () => runTests(partialClient));
describe('resource recoveryKey (tree shakable, subresource)', () => runTests(parentPartialClient));
