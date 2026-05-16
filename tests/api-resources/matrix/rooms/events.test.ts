// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { BaseEvents } from '@beeper/desktop-api/resources/matrix/rooms/events';
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
  resources: [BaseEvents],
});

const parentPartialClient = createClient({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
  resources: [Rooms],
});

const runTests = (client: PartialBeeperDesktop<{ matrix: { rooms: { events: BaseEvents } } }>) => {
  test('retrieve: only required params', async () => {
    const responsePromise = client.matrix.rooms.events.retrieve('$asfDuShaf7Gafaw:matrix.org', {
      roomId: '!636q39766251:matrix.org',
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
    const response = await client.matrix.rooms.events.retrieve('$asfDuShaf7Gafaw:matrix.org', {
      roomId: '!636q39766251:matrix.org',
    });
  });
};
describe('resource events', () => runTests(client));
describe('resource events (tree shakable, base)', () => runTests(partialClient));
describe('resource events (tree shakable, subresource)', () => runTests(parentPartialClient));
