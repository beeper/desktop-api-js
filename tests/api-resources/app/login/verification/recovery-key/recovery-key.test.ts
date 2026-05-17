// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Verification } from '@beeper/desktop-api/resources/app/login/verification/verification';
import { BaseRecoveryKey } from '@beeper/desktop-api/resources/app/login/verification/recovery-key/recovery-key';

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
  resources: [Verification],
});

const runTests = (
  client: PartialBeeperDesktop<{ app: { login: { verification: { recoveryKey: BaseRecoveryKey } } } }>,
) => {
  test('verify: only required params', async () => {
    const responsePromise = client.app.login.verification.recoveryKey.verify({ recoveryKey: 'x' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('verify: required and optional params', async () => {
    const response = await client.app.login.verification.recoveryKey.verify({ recoveryKey: 'x' });
  });
};
describe('resource recoveryKey', () => runTests(client));
describe('resource recoveryKey (tree shakable, base)', () => runTests(partialClient));
describe('resource recoveryKey (tree shakable, subresource)', () => runTests(parentPartialClient));
