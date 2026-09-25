// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Setup } from '@beeper/desktop-api/resources/app/setup/setup';
import { BaseVerifications } from '@beeper/desktop-api/resources/app/setup/verifications/verifications';

import BeeperDesktop from '@beeper/desktop-api';
import { createClient, type PartialBeeperDesktop } from '@beeper/desktop-api/tree-shakable';

const client = new BeeperDesktop({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

const partialClient = createClient({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
  resources: [BaseVerifications],
});

const parentPartialClient = createClient({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
  resources: [Setup],
});

const runTests = (client: PartialBeeperDesktop<{ app: { setup: { verifications: BaseVerifications } } }>) => {
  test('create', async () => {
    const responsePromise = client.app.setup.verifications.create();
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
      client.app.setup.verifications.create(
        { purpose: 'login', userID: 'userID' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(BeeperDesktop.NotFoundError);
  });

  test('retrieve', async () => {
    const responsePromise = client.app.setup.verifications.retrieve('x');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list', async () => {
    const responsePromise = client.app.setup.verifications.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('accept', async () => {
    const responsePromise = client.app.setup.verifications.accept('x');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('cancel', async () => {
    const responsePromise = client.app.setup.verifications.cancel('x');
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
      client.app.setup.verifications.cancel(
        'x',
        { code: 'code', reason: 'reason' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(BeeperDesktop.NotFoundError);
  });
};
describe('resource verifications', () => runTests(client));
describe('resource verifications (tree shakable, base)', () => runTests(partialClient));
describe('resource verifications (tree shakable, subresource)', () => runTests(parentPartialClient));
