// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { BaseAuth } from '@beeper/desktop-api/resources/matrix/bridges/auth';
import { Bridges } from '@beeper/desktop-api/resources/matrix/bridges/bridges';

import BeeperDesktop from '@beeper/desktop-api';
import { createClient, type PartialBeeperDesktop } from '@beeper/desktop-api/tree-shakable';

const client = new BeeperDesktop({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

const partialClient = createClient({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
  resources: [BaseAuth],
});

const parentPartialClient = createClient({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
  resources: [Bridges],
});

const runTests = (client: PartialBeeperDesktop<{ matrix: { bridges: { auth: BaseAuth } } }>) => {
  test('listFlows', async () => {
    const responsePromise = client.matrix.bridges.auth.listFlows('bridgeID');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('listLogins', async () => {
    const responsePromise = client.matrix.bridges.auth.listLogins('bridgeID');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('logout: only required params', async () => {
    const responsePromise = client.matrix.bridges.auth.logout('bcc68892-b180-414f-9516-b4aadf7d0496', {
      bridgeID: 'bridgeID',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('logout: required and optional params', async () => {
    const response = await client.matrix.bridges.auth.logout('bcc68892-b180-414f-9516-b4aadf7d0496', {
      bridgeID: 'bridgeID',
    });
  });

  test('startLogin: only required params', async () => {
    const responsePromise = client.matrix.bridges.auth.startLogin('qr', { bridgeID: 'bridgeID' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('startLogin: required and optional params', async () => {
    const response = await client.matrix.bridges.auth.startLogin('qr', {
      bridgeID: 'bridgeID',
      login_id: 'bcc68892-b180-414f-9516-b4aadf7d0496',
    });
  });

  test('submitCookies: only required params', async () => {
    const responsePromise = client.matrix.bridges.auth.submitCookies('stepID', {
      bridgeID: 'bridgeID',
      loginProcessID: 'loginProcessID',
      body: { foo: 'string' },
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('submitCookies: required and optional params', async () => {
    const response = await client.matrix.bridges.auth.submitCookies('stepID', {
      bridgeID: 'bridgeID',
      loginProcessID: 'loginProcessID',
      body: { foo: 'string' },
    });
  });

  test('submitUserInput: only required params', async () => {
    const responsePromise = client.matrix.bridges.auth.submitUserInput('stepID', {
      bridgeID: 'bridgeID',
      loginProcessID: 'loginProcessID',
      body: { foo: 'string' },
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('submitUserInput: required and optional params', async () => {
    const response = await client.matrix.bridges.auth.submitUserInput('stepID', {
      bridgeID: 'bridgeID',
      loginProcessID: 'loginProcessID',
      body: { foo: 'string' },
    });
  });

  test('waitForStep: only required params', async () => {
    const responsePromise = client.matrix.bridges.auth.waitForStep('stepID', {
      bridgeID: 'bridgeID',
      loginProcessID: 'loginProcessID',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('waitForStep: required and optional params', async () => {
    const response = await client.matrix.bridges.auth.waitForStep('stepID', {
      bridgeID: 'bridgeID',
      loginProcessID: 'loginProcessID',
    });
  });

  test('whoami', async () => {
    const responsePromise = client.matrix.bridges.auth.whoami('bridgeID');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
};
describe('resource auth', () => runTests(client));
describe('resource auth (tree shakable, base)', () => runTests(partialClient));
describe('resource auth (tree shakable, subresource)', () => runTests(parentPartialClient));
