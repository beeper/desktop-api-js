// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Bridges } from '@beeper/desktop-api/resources/bridges/bridges';
import { BaseLoginFlows } from '@beeper/desktop-api/resources/bridges/login-flows';

import BeeperDesktop from '@beeper/desktop-api';
import { createClient, type PartialBeeperDesktop } from '@beeper/desktop-api/tree-shakable';

const client = new BeeperDesktop({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

const partialClient = createClient({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
  resources: [BaseLoginFlows],
});

const parentPartialClient = createClient({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
  resources: [Bridges],
});

const runTests = (client: PartialBeeperDesktop<{ bridges: { loginFlows: BaseLoginFlows } }>) => {
  test('list', async () => {
    const responsePromise = client.bridges.loginFlows.list('local-whatsapp');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
};
describe('resource loginFlows', () => runTests(client));
describe('resource loginFlows (tree shakable, base)', () => runTests(partialClient));
describe('resource loginFlows (tree shakable, subresource)', () => runTests(parentPartialClient));
