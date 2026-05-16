// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { BaseQr } from '@beeper/desktop-api/resources/app/e2ee/verification/qr';
import { Verification } from '@beeper/desktop-api/resources/app/e2ee/verification/verification';

import BeeperDesktop from '@beeper/desktop-api';
import { createClient, type PartialBeeperDesktop } from '@beeper/desktop-api/tree-shakable';

const client = new BeeperDesktop({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

const partialClient = createClient({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
  resources: [BaseQr],
});

const parentPartialClient = createClient({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
  resources: [Verification],
});

const runTests = (client: PartialBeeperDesktop<{ app: { e2ee: { verification: { qr: BaseQr } } } }>) => {
  test('confirmScanned', async () => {
    const responsePromise = client.app.e2ee.verification.qr.confirmScanned('x');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('scan: only required params', async () => {
    const responsePromise = client.app.e2ee.verification.qr.scan({ data: 'x' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('scan: required and optional params', async () => {
    const response = await client.app.e2ee.verification.qr.scan({ data: 'x' });
  });
};
describe('resource qr', () => runTests(client));
describe('resource qr (tree shakable, base)', () => runTests(partialClient));
describe('resource qr (tree shakable, subresource)', () => runTests(parentPartialClient));
