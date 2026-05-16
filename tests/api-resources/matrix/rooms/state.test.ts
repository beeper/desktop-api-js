// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Rooms } from '@beeper/desktop-api/resources/matrix/rooms/rooms';
import { BaseState } from '@beeper/desktop-api/resources/matrix/rooms/state';

import BeeperDesktop from '@beeper/desktop-api';
import { createClient, type PartialBeeperDesktop } from '@beeper/desktop-api/tree-shakable';

const client = new BeeperDesktop({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

const partialClient = createClient({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
  resources: [BaseState],
});

const parentPartialClient = createClient({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
  resources: [Rooms],
});

const runTests = (client: PartialBeeperDesktop<{ matrix: { rooms: { state: BaseState } } }>) => {
  test('retrieve: only required params', async () => {
    const responsePromise = client.matrix.rooms.state.retrieve('state_key', {
      roomId: '!636q39766251:example.com',
      eventType: 'm.room.name',
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
    const response = await client.matrix.rooms.state.retrieve('state_key', {
      roomId: '!636q39766251:example.com',
      eventType: 'm.room.name',
      format: 'content',
    });
  });

  test('list', async () => {
    const responsePromise = client.matrix.rooms.state.list('!636q39766251:example.com');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
};
describe('resource state', () => runTests(client));
describe('resource state (tree shakable, base)', () => runTests(partialClient));
describe('resource state (tree shakable, subresource)', () => runTests(parentPartialClient));
