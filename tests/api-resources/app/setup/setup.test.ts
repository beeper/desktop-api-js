// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { App } from '@beeper/desktop-api/resources/app/app';
import { BaseSetup } from '@beeper/desktop-api/resources/app/setup/setup';

import BeeperDesktop from '@beeper/desktop-api';
import { createClient, type PartialBeeperDesktop } from '@beeper/desktop-api/tree-shakable';

const client = new BeeperDesktop({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

const partialClient = createClient({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
  resources: [BaseSetup],
});

const parentPartialClient = createClient({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
  resources: [App],
});

const runTests = (client: PartialBeeperDesktop<{ app: { setup: BaseSetup } }>) => {
  test('retrieve', async () => {
    const responsePromise = client.app.setup.retrieve();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('email: only required params', async () => {
    const responsePromise = client.app.setup.email({
      email: 'dev@stainless.com',
      setupRequestID: 'setupRequestID',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('email: required and optional params', async () => {
    const response = await client.app.setup.email({
      email: 'dev@stainless.com',
      setupRequestID: 'setupRequestID',
    });
  });

  test('register: only required params', async () => {
    const responsePromise = client.app.setup.register({
      acceptTerms: true,
      leadToken: 'leadToken',
      setupRequestID: 'setupRequestID',
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
    const response = await client.app.setup.register({
      acceptTerms: true,
      leadToken: 'leadToken',
      setupRequestID: 'setupRequestID',
      username: 'x',
    });
  });

  test('response: only required params', async () => {
    const responsePromise = client.app.setup.response({
      response: 'response',
      setupRequestID: 'setupRequestID',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('response: required and optional params', async () => {
    const response = await client.app.setup.response({
      response: 'response',
      setupRequestID: 'setupRequestID',
    });
  });

  test('start', async () => {
    const responsePromise = client.app.setup.start();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
};
describe('resource setup', () => runTests(client));
describe('resource setup (tree shakable, base)', () => runTests(partialClient));
describe('resource setup (tree shakable, subresource)', () => runTests(parentPartialClient));
