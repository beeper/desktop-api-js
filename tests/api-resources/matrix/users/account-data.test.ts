// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { BaseAccountData } from '@beeper/desktop-api/resources/matrix/users/account-data';
import { Users } from '@beeper/desktop-api/resources/matrix/users/users';

import BeeperDesktop from '@beeper/desktop-api';
import { createClient, type PartialBeeperDesktop } from '@beeper/desktop-api/tree-shakable';

const client = new BeeperDesktop({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

const partialClient = createClient({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
  resources: [BaseAccountData],
});

const parentPartialClient = createClient({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
  resources: [Users],
});

const runTests = (client: PartialBeeperDesktop<{ matrix: { users: { accountData: BaseAccountData } } }>) => {
  test('retrieve: only required params', async () => {
    const responsePromise = client.matrix.users.accountData.retrieve('org.example.custom.config', {
      userId: '@alice:example.com',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve: required and optional params', async () => {
    const response = await client.matrix.users.accountData.retrieve('org.example.custom.config', {
      userId: '@alice:example.com',
    });
  });

  test('update: only required params', async () => {
    const responsePromise = client.matrix.users.accountData.update('org.example.custom.config', {
      userId: '@alice:example.com',
      body: { custom_account_data_key: 'custom_config_value' },
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update: required and optional params', async () => {
    const response = await client.matrix.users.accountData.update('org.example.custom.config', {
      userId: '@alice:example.com',
      body: { custom_account_data_key: 'custom_config_value' },
    });
  });
};
describe('resource accountData', () => runTests(client));
describe('resource accountData (tree shakable, base)', () => runTests(partialClient));
describe('resource accountData (tree shakable, subresource)', () => runTests(parentPartialClient));
