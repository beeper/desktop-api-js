// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import BeeperDesktop from '@beeper/desktop-api';

const client = new BeeperDesktop({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource messages', () => {
  test('list: only required params', async () => {
    const responsePromise = client.messages.list({ chatID: '!NCdzlIaMjZUmvmvyHU:beeper.com' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: required and optional params', async () => {
    const response = await client.messages.list({
      chatID: '!NCdzlIaMjZUmvmvyHU:beeper.com',
      cursor: '821744079',
      direction: 'before',
    });
  });

  test('search', async () => {
    const responsePromise = client.messages.search();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('search: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.messages.search(
        {
          accountIDs: [
            'whatsapp',
            'local-whatsapp_ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc',
            'local-instagram_ba_eRfQMmnSNy_p7Ih7HL7RduRpKFU',
          ],
          chatIDs: ['!NCdzlIaMjZUmvmvyHU:beeper.com', '1231073'],
          chatType: 'group',
          cursor: '1725489123456|c29tZUltc2dQYWdl',
          dateAfter: '2025-08-01T00:00:00Z',
          dateBefore: '2025-08-31T23:59:59Z',
          direction: 'before',
          excludeLowPriority: true,
          includeMuted: true,
          limit: 20,
          mediaTypes: ['any'],
          query: 'dinner',
          sender: 'me',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(BeeperDesktop.NotFoundError);
  });

  test('send', async () => {
    const responsePromise = client.messages.send();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('send: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.messages.send(
        { chatID: '!NCdzlIaMjZUmvmvyHU:beeper.com', replyToMessageID: 'replyToMessageID', text: 'text' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(BeeperDesktop.NotFoundError);
  });
});
