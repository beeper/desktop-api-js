// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Matrix } from '@beeper/desktop-api/resources/matrix/matrix';
import { BaseRooms } from '@beeper/desktop-api/resources/matrix/rooms/rooms';

import BeeperDesktop from '@beeper/desktop-api';
import { createClient, type PartialBeeperDesktop } from '@beeper/desktop-api/tree-shakable';

const client = new BeeperDesktop({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

const partialClient = createClient({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
  resources: [BaseRooms],
});

const parentPartialClient = createClient({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
  resources: [Matrix],
});

const runTests = (client: PartialBeeperDesktop<{ matrix: { rooms: BaseRooms } }>) => {
  test('create', async () => {
    const responsePromise = client.matrix.rooms.create({});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('join', async () => {
    const responsePromise = client.matrix.rooms.join('!monkeys:matrix.org', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('leave', async () => {
    const responsePromise = client.matrix.rooms.leave('!nkl290a:matrix.org', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
};
describe('resource rooms', () => runTests(client));
describe('resource rooms (tree shakable, base)', () => runTests(partialClient));
describe('resource rooms (tree shakable, subresource)', () => runTests(parentPartialClient));
