// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import BeeperDesktop from '@beeper/desktop-api';

const client = new BeeperDesktop({ accessToken: 'My Access Token', baseURL: process.env["TEST_API_BASE_URL"] ?? 'http://127.0.0.1:4010' });

describe('resource contacts', () => {
  test('list', async () => {
    const responsePromise = client.accounts.contacts.list('accountID');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.accounts.contacts.list('accountID', {
    cursor: '1725489123456|c29tZUltc2dQYWdl',
    direction: 'before',
    limit: 1,
    query: 'x',
  }, { path: '/_stainless_unknown_path' }))
      .rejects
      .toThrow(BeeperDesktop.NotFoundError);
  });

  test('search: only required params', async () => {
    const responsePromise = client.accounts.contacts.search('accountID', { query: 'x' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('search: required and optional params', async () => {
    const response = await client.accounts.contacts.search('accountID', { query: 'x' });
  });
});
