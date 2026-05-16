// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { E2ee } from '@beeper/desktop-api/resources/app/e2ee/e2ee';
import { BaseVerification } from '@beeper/desktop-api/resources/app/e2ee/verification/verification';

import BeeperDesktop from '@beeper/desktop-api';
import { createClient, type PartialBeeperDesktop } from '@beeper/desktop-api/tree-shakable';

const client = new BeeperDesktop({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

const partialClient = createClient({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
  resources: [BaseVerification],
});

const parentPartialClient = createClient({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
  resources: [E2ee],
});

const runTests = (client: PartialBeeperDesktop<{ app: { e2ee: { verification: BaseVerification } } }>) => {
  test('create', async () => {
    const responsePromise = client.app.e2ee.verification.create();
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
      client.app.e2ee.verification.create({ userID: 'userID' }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(BeeperDesktop.NotFoundError);
  });

  test('accept', async () => {
    const responsePromise = client.app.e2ee.verification.accept('x');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('cancel', async () => {
    const responsePromise = client.app.e2ee.verification.cancel('x');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('cancel: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.app.e2ee.verification.cancel(
        'x',
        { code: 'code', reason: 'reason' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(BeeperDesktop.NotFoundError);
  });
};
describe('resource verification', () => runTests(client));
describe('resource verification (tree shakable, base)', () => runTests(partialClient));
describe('resource verification (tree shakable, subresource)', () => runTests(parentPartialClient));
