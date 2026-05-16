// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { RecoveryCode } from '@beeper/desktop-api/resources/app/e2ee/recovery-code/recovery-code';
import { BaseReset } from '@beeper/desktop-api/resources/app/e2ee/recovery-code/reset';

import BeeperDesktop from '@beeper/desktop-api';
import { createClient, type PartialBeeperDesktop } from '@beeper/desktop-api/tree-shakable';

const client = new BeeperDesktop({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

const partialClient = createClient({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
  resources: [BaseReset],
});

const parentPartialClient = createClient({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
  resources: [RecoveryCode],
});

const runTests = (
  client: PartialBeeperDesktop<{ app: { e2ee: { recoveryCode: { reset: BaseReset } } } }>,
) => {
  test('create', async () => {
    const responsePromise = client.app.e2ee.recoveryCode.reset.create();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.app.e2ee.recoveryCode.reset.create(
        { recoveryCode: 'recoveryCode' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(BeeperDesktop.NotFoundError);
  });

  test('confirm: only required params', async () => {
    const responsePromise = client.app.e2ee.recoveryCode.reset.confirm({ recoveryCode: 'x' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('confirm: required and optional params', async () => {
    const response = await client.app.e2ee.recoveryCode.reset.confirm({ recoveryCode: 'x' });
  });
};
describe('resource reset', () => runTests(client));
describe('resource reset (tree shakable, base)', () => runTests(partialClient));
describe('resource reset (tree shakable, subresource)', () => runTests(parentPartialClient));
