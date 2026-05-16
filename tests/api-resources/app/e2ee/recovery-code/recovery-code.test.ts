// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { E2ee } from '@beeper/desktop-api/resources/app/e2ee/e2ee';
import { BaseRecoveryCode } from '@beeper/desktop-api/resources/app/e2ee/recovery-code/recovery-code';

import BeeperDesktop from '@beeper/desktop-api';
import { createClient, type PartialBeeperDesktop } from '@beeper/desktop-api/tree-shakable';

const client = new BeeperDesktop({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

const partialClient = createClient({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
  resources: [BaseRecoveryCode],
});

const parentPartialClient = createClient({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
  resources: [E2ee],
});

const runTests = (client: PartialBeeperDesktop<{ app: { e2ee: { recoveryCode: BaseRecoveryCode } } }>) => {
  test('markBackedUp', async () => {
    const responsePromise = client.app.e2ee.recoveryCode.markBackedUp();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('verify: only required params', async () => {
    const responsePromise = client.app.e2ee.recoveryCode.verify({ recoveryCode: 'x' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('verify: required and optional params', async () => {
    const response = await client.app.e2ee.recoveryCode.verify({ recoveryCode: 'x' });
  });
};
describe('resource recoveryCode', () => runTests(client));
describe('resource recoveryCode (tree shakable, base)', () => runTests(partialClient));
describe('resource recoveryCode (tree shakable, subresource)', () => runTests(parentPartialClient));
