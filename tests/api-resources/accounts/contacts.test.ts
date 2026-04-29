// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Accounts } from '@beeper/desktop-api/resources/accounts/accounts';
import { BaseContacts } from '@beeper/desktop-api/resources/accounts/contacts';

import BeeperDesktop from '@beeper/desktop-api';
import { createClient, type PartialBeeperDesktop } from '@beeper/desktop-api/tree-shakable';

const client = new BeeperDesktop({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

const partialClient = createClient({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
  resources: [BaseContacts],
});

const parentPartialClient = createClient({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
  resources: [Accounts],
});

const runTests = (client: PartialBeeperDesktop<{ accounts: { contacts: BaseContacts } }>) => {
  test('list', async () => {
    const responsePromise = client.accounts.contacts.list('accountID');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.accounts.contacts.list(
        'accountID',
        {
          cursor: '1725489123456|c29tZUltc2dQYWdl',
          direction: 'before',
          limit: 1,
          query: 'x',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(BeeperDesktop.NotFoundError);
  });

  test('search: only required params', async () => {
    const responsePromise = client.accounts.contacts.search('accountID', { query: 'x' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('search: required and optional params', async () => {
    const response = await client.accounts.contacts.search('accountID', { query: 'x' });
  });
};
describe('resource contacts', () => runTests(client));
describe('resource contacts (tree shakable, base)', () => runTests(partialClient));
describe('resource contacts (tree shakable, subresource)', () => runTests(parentPartialClient));
