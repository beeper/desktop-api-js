// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Bridges } from '@beeper/desktop-api/resources/bridges/bridges';
import { BaseConnections } from '@beeper/desktop-api/resources/bridges/connections';

import BeeperDesktop from '@beeper/desktop-api';
import { createClient, type PartialBeeperDesktop } from '@beeper/desktop-api/tree-shakable';

const client = new BeeperDesktop({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

const partialClient = createClient({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
  resources: [BaseConnections],
});

const parentPartialClient = createClient({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
  resources: [Bridges],
});

const runTests = (client: PartialBeeperDesktop<{ bridges: { connections: BaseConnections } }>) => {
  test('retrieve: only required params', async () => {
    const responsePromise = client.bridges.connections.retrieve('ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc', {
      bridgeID: 'local-whatsapp',
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
    const response = await client.bridges.connections.retrieve('ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc', {
      bridgeID: 'local-whatsapp',
    });
  });

  test('list', async () => {
    const responsePromise = client.bridges.connections.list('local-whatsapp');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('remove: only required params', async () => {
    const responsePromise = client.bridges.connections.remove('ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc', {
      bridgeID: 'local-whatsapp',
      scope: 'current-device',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('remove: required and optional params', async () => {
    const response = await client.bridges.connections.remove('ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc', {
      bridgeID: 'local-whatsapp',
      scope: 'current-device',
    });
  });
};
describe('resource connections', () => runTests(client));
describe('resource connections (tree shakable, base)', () => runTests(partialClient));
describe('resource connections (tree shakable, subresource)', () => runTests(parentPartialClient));
