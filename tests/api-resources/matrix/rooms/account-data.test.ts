// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { BaseAccountData } from '@beeper/desktop-api/resources/matrix/rooms/account-data';
import { Rooms } from '@beeper/desktop-api/resources/matrix/rooms/rooms';

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
  resources: [Rooms],
});

const runTests = (client: PartialBeeperDesktop<{ matrix: { rooms: { accountData: BaseAccountData } } }>) => {
  test('retrieve: only required params', async () => {
    const responsePromise = client.matrix.rooms.accountData.retrieve('org.example.custom.room.config', {
      userId: '@alice:example.com',
      roomId: '!726s6s6q:example.com',
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
    const response = await client.matrix.rooms.accountData.retrieve('org.example.custom.room.config', {
      userId: '@alice:example.com',
      roomId: '!726s6s6q:example.com',
    });
  });

  test('update: only required params', async () => {
    const responsePromise = client.matrix.rooms.accountData.update('org.example.custom.room.config', {
      userId: '@alice:example.com',
      roomId: '!726s6s6q:example.com',
      body: { custom_account_data_key: 'custom_account_data_value' },
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
    const response = await client.matrix.rooms.accountData.update('org.example.custom.room.config', {
      userId: '@alice:example.com',
      roomId: '!726s6s6q:example.com',
      body: { custom_account_data_key: 'custom_account_data_value' },
    });
  });
};
describe('resource accountData', () => runTests(client));
describe('resource accountData (tree shakable, base)', () => runTests(partialClient));
describe('resource accountData (tree shakable, subresource)', () => runTests(parentPartialClient));
