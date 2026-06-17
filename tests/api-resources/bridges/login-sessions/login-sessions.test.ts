// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Bridges } from '@beeper/desktop-api/resources/bridges/bridges';
import { BaseLoginSessions } from '@beeper/desktop-api/resources/bridges/login-sessions/login-sessions';

import BeeperDesktop from '@beeper/desktop-api';
import { createClient, type PartialBeeperDesktop } from '@beeper/desktop-api/tree-shakable';

const client = new BeeperDesktop({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

const partialClient = createClient({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
  resources: [BaseLoginSessions],
});

const parentPartialClient = createClient({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
  resources: [Bridges],
});

const runTests = (client: PartialBeeperDesktop<{ bridges: { loginSessions: BaseLoginSessions } }>) => {
  test('create', async () => {
    const responsePromise = client.bridges.loginSessions.create('local-whatsapp');
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
      client.bridges.loginSessions.create(
        'local-whatsapp',
        {
          accountID: 'x',
          flowID: 'x',
          loginID: 'x',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(BeeperDesktop.NotFoundError);
  });

  test('retrieve: only required params', async () => {
    const responsePromise = client.bridges.loginSessions.retrieve('123', { bridgeID: 'local-whatsapp' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve: required and optional params', async () => {
    const response = await client.bridges.loginSessions.retrieve('123', { bridgeID: 'local-whatsapp' });
  });

  test('cancel: only required params', async () => {
    const responsePromise = client.bridges.loginSessions.cancel('123', { bridgeID: 'local-whatsapp' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('cancel: required and optional params', async () => {
    const response = await client.bridges.loginSessions.cancel('123', { bridgeID: 'local-whatsapp' });
  });
};
describe('resource loginSessions', () => runTests(client));
describe('resource loginSessions (tree shakable, base)', () => runTests(partialClient));
describe('resource loginSessions (tree shakable, subresource)', () => runTests(parentPartialClient));
