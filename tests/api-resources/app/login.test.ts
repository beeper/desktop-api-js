// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { App } from '@beeper/desktop-api/resources/app/app';
import { BaseLogin } from '@beeper/desktop-api/resources/app/login';

import BeeperDesktop from '@beeper/desktop-api';
import { createClient, type PartialBeeperDesktop } from '@beeper/desktop-api/tree-shakable';

const client = new BeeperDesktop({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

const partialClient = createClient({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
  resources: [BaseLogin],
});

const parentPartialClient = createClient({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
  resources: [App],
});

const runTests = (client: PartialBeeperDesktop<{ app: { login: BaseLogin } }>) => {
  test('email: only required params', async () => {
    const responsePromise = client.app.login.email({ email: 'dev@stainless.com', request: 'request' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('email: required and optional params', async () => {
    const response = await client.app.login.email({ email: 'dev@stainless.com', request: 'request' });
  });

  test('register: only required params', async () => {
    const responsePromise = client.app.login.register({
      acceptTerms: true,
      leadToken: 'leadToken',
      request: 'request',
      username: 'x',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('register: required and optional params', async () => {
    const response = await client.app.login.register({
      acceptTerms: true,
      leadToken: 'leadToken',
      request: 'request',
      username: 'x',
    });
  });

  test('response: only required params', async () => {
    const responsePromise = client.app.login.response({ request: 'request', response: 'response' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('response: required and optional params', async () => {
    const response = await client.app.login.response({ request: 'request', response: 'response' });
  });

  test('start', async () => {
    const responsePromise = client.app.login.start();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
};
describe('resource login', () => runTests(client));
describe('resource login (tree shakable, base)', () => runTests(partialClient));
describe('resource login (tree shakable, subresource)', () => runTests(parentPartialClient));
