// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import BeeperDesktop from '@beeper/desktop-api';

const client = new BeeperDesktop({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource contacts', () => {
  test('search: only required params', async () => {
    const responsePromise = client.contacts.search({
      accountID: 'local-whatsapp_ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc',
      query: 'x',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('search: required and optional params', async () => {
    const response = await client.contacts.search({
      accountID: 'local-whatsapp_ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc',
      query: 'x',
    });
  });
});
