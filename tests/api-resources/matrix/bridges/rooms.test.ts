// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Bridges } from '@beeper/desktop-api/resources/matrix/bridges/bridges';
import { BaseRooms } from '@beeper/desktop-api/resources/matrix/bridges/rooms';

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
  resources: [Bridges],
});

const runTests = (client: PartialBeeperDesktop<{ matrix: { bridges: { rooms: BaseRooms } } }>) => {
  test('createDm: only required params', async () => {
    const responsePromise = client.matrix.bridges.rooms.createDm('identifier', { bridgeID: 'bridgeID' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('createDm: required and optional params', async () => {
    const response = await client.matrix.bridges.rooms.createDm('identifier', {
      bridgeID: 'bridgeID',
      login_id: 'bcc68892-b180-414f-9516-b4aadf7d0496',
    });
  });

  test('createGroup: only required params', async () => {
    const responsePromise = client.matrix.bridges.rooms.createGroup('groupType', { bridgeID: 'bridgeID' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('createGroup: required and optional params', async () => {
    const response = await client.matrix.bridges.rooms.createGroup('groupType', {
      bridgeID: 'bridgeID',
      login_id: 'bcc68892-b180-414f-9516-b4aadf7d0496',
      avatar: { url: 'url' },
      disappear: { timer: 0, type: 'type' },
      name: { name: 'name' },
      parent: {},
      participants: ['string'],
      room_id: 'room_id',
      topic: { topic: 'topic' },
      type: 'channel',
      username: 'username',
    });
  });
};
describe('resource rooms', () => runTests(client));
describe('resource rooms (tree shakable, base)', () => runTests(partialClient));
describe('resource rooms (tree shakable, subresource)', () => runTests(parentPartialClient));
