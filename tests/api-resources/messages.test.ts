// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import BeeperDesktop from '@beeper/desktop-api';

const client = new BeeperDesktop({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource messages', () => {
  test('draftMessage: only required params', async () => {
    const responsePromise = client.messages.draftMessage({
      chatID: '!-5hI_iHR5vSDCtI8PzSDQT0H_3I:ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc.local-whatsapp.localhost',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('draftMessage: required and optional params', async () => {
    const response = await client.messages.draftMessage({
      chatID: '!-5hI_iHR5vSDCtI8PzSDQT0H_3I:ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc.local-whatsapp.localhost',
      focusApp: true,
      text: 'text',
    });
  });

  test('searchMessages', async () => {
    const responsePromise = client.messages.searchMessages();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('searchMessages: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.messages.searchMessages(
        {
          accountIDs: [
            'local-whatsapp_ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc',
            'local-instagram_ba_eRfQMmnSNy_p7Ih7HL7RduRpKFU',
          ],
          chatIDs: ['!-5hI_iHR5vSDCtI8PzSDQT0H_3I:ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc.local-whatsapp.localhost'],
          chatType: 'group',
          dateAfter: '2024-07-01T00:00:00Z',
          dateBefore: '2024-07-31T23:59:59Z',
          ending_before: '872739',
          excludeLowPriority: true,
          includeMuted: true,
          limit: 50,
          onlyWithFile: true,
          onlyWithImage: true,
          onlyWithLink: true,
          onlyWithMedia: true,
          onlyWithVideo: true,
          query: 'dinner',
          sender: 'me',
          starting_after: '196640',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(BeeperDesktop.NotFoundError);
  });

  test('sendMessage: only required params', async () => {
    const responsePromise = client.messages.sendMessage({
      chatID: '!-5hI_iHR5vSDCtI8PzSDQT0H_3I:ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc.local-whatsapp.localhost',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('sendMessage: required and optional params', async () => {
    const response = await client.messages.sendMessage({
      chatID: '!-5hI_iHR5vSDCtI8PzSDQT0H_3I:ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc.local-whatsapp.localhost',
      replyToMessageID: 'replyToMessageID',
      text: 'text',
    });
  });
});
