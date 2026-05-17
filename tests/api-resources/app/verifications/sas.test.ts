// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { BaseSAS } from '@beeper/desktop-api/resources/app/verifications/sas';
import { Verifications } from '@beeper/desktop-api/resources/app/verifications/verifications';

import BeeperDesktop from '@beeper/desktop-api';
import { createClient, type PartialBeeperDesktop } from '@beeper/desktop-api/tree-shakable';

const client = new BeeperDesktop({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

const partialClient = createClient({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
  resources: [BaseSAS],
});

const parentPartialClient = createClient({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
  resources: [Verifications],
});

const runTests = (client: PartialBeeperDesktop<{ app: { verifications: { sas: BaseSAS } } }>) => {
  test('confirm', async () => {
    const responsePromise = client.app.verifications.sas.confirm('x');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('start', async () => {
    const responsePromise = client.app.verifications.sas.start('x');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
};
describe('resource sas', () => runTests(client));
describe('resource sas (tree shakable, base)', () => runTests(partialClient));
describe('resource sas (tree shakable, subresource)', () => runTests(parentPartialClient));
