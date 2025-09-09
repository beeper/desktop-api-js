// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import BeeperDesktop from '@beeper/desktop-api';

const client = new BeeperDesktop({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource messages', () => {
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
            'local-whatsapp_ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc',
            'local-instagram_ba_eRfQMmnSNy_p7Ih7HL7RduRpKFU',
          ],
          chatIDs: ['!NCdzlIaMjZUmvmvyHU:beeper.com', '1231073'],
          chatType: 'group',
          cursor: 'eyJvZmZzZXQiOjE3MTk5OTk5OTl9',
          dateAfter: '2025-08-01T00:00:00Z',
          dateBefore: '2025-08-31T23:59:59Z',
          direction: 'before',
          excludeLowPriority: true,
          includeMuted: true,
          limit: 50,
          mediaTypes: ['any'],
          query: 'dinner',
          sender: 'me',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(BeeperDesktop.NotFoundError);
  });

  test('send: only required params', async () => {
    const responsePromise = client.messages.send({ chatID: '!NCdzlIaMjZUmvmvyHU:beeper.com' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('send: required and optional params', async () => {
    const response = await client.messages.send({
      chatID: '!NCdzlIaMjZUmvmvyHU:beeper.com',
      replyToMessageID: 'replyToMessageID',
      text: 'text',
    });
  });
});
