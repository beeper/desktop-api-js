// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { BaseLabels } from '@beeper/desktop-api/resources/labels';

import BeeperDesktop from '@beeper/desktop-api';
import { createClient, type PartialBeeperDesktop } from '@beeper/desktop-api/tree-shakable';

const client = new BeeperDesktop({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

const partialClient = createClient({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
  resources: [BaseLabels],
});

const runTests = (client: PartialBeeperDesktop<{ labels: BaseLabels }>) => {
  test('list', async () => {
    const responsePromise = client.labels.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
};
describe('resource labels', () => runTests(client));
describe('resource labels (tree shakable, base)', () => runTests(partialClient));
