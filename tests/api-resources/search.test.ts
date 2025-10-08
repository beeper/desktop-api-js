// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import BeeperDesktop from '@beeper/desktop-api';

const client = new BeeperDesktop({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource search', () => {
  test('chats', async () => {
    const responsePromise = client.search.chats();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('chats: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.search.chats(
        {
          accountIDs: [
            'local-whatsapp_ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc',
            'local-telegram_ba_QFrb5lrLPhO3OT5MFBeTWv0x4BI',
          ],
          cursor: '1725489123456|c29tZUltc2dQYWdl',
          direction: 'before',
          inbox: 'primary',
          includeMuted: true,
          lastActivityAfter: '2019-12-27T18:11:19.117Z',
          lastActivityBefore: '2019-12-27T18:11:19.117Z',
          limit: 1,
          query: 'x',
          scope: 'titles',
          type: 'single',
          unreadOnly: true,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(BeeperDesktop.NotFoundError);
  });

  test('contacts: only required params', async () => {
    const responsePromise = client.search.contacts('local-whatsapp_ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc', {
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

  test('contacts: required and optional params', async () => {
    const response = await client.search.contacts('local-whatsapp_ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc', {
      query: 'x',
    });
  });
});
