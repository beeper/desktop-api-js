// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import BeeperDesktopAPI from 'beeper-desktop-api';

const client = new BeeperDesktopAPI({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource searchMessages', () => {
  // Prism tests are disabled
  test.skip('search', async () => {
    const responsePromise = client.searchMessages.search();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('search: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.searchMessages.search(
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
    ).rejects.toThrow(BeeperDesktopAPI.NotFoundError);
  });
});
