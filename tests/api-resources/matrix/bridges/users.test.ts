// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Bridges } from '@beeper/desktop-api/resources/matrix/bridges/bridges';
import { BaseUsers } from '@beeper/desktop-api/resources/matrix/bridges/users';

import BeeperDesktop from '@beeper/desktop-api';
import { createClient, type PartialBeeperDesktop } from '@beeper/desktop-api/tree-shakable';

const client = new BeeperDesktop({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

const partialClient = createClient({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
  resources: [BaseUsers],
});

const parentPartialClient = createClient({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
  resources: [Bridges],
});

const runTests = (client: PartialBeeperDesktop<{ matrix: { bridges: { users: BaseUsers } } }>) => {
  test('resolve: only required params', async () => {
    const responsePromise = client.matrix.bridges.users.resolve('identifier', { bridgeID: 'bridgeID' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('resolve: required and optional params', async () => {
    const response = await client.matrix.bridges.users.resolve('identifier', {
      bridgeID: 'bridgeID',
      login_id: 'bcc68892-b180-414f-9516-b4aadf7d0496',
    });
  });

  test('search', async () => {
    const responsePromise = client.matrix.bridges.users.search('bridgeID');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('search: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.matrix.bridges.users.search(
        'bridgeID',
        { login_id: 'bcc68892-b180-414f-9516-b4aadf7d0496', query: 'query' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(BeeperDesktop.NotFoundError);
  });
};
describe('resource users', () => runTests(client));
describe('resource users (tree shakable, base)', () => runTests(partialClient));
describe('resource users (tree shakable, subresource)', () => runTests(parentPartialClient));
