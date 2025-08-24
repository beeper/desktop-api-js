// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import BeeperDesktopAPI from 'beeper-desktop-api';

const client = new BeeperDesktopAPI({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource findChats', () => {
  // Prism tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.findChats.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.findChats.list(
        {
          accountIDs: ['local-whatsapp_ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc', 'slackgo.T031TC83W'],
          ending_before: '872739',
          inbox: 'primary',
          includeMuted: true,
          lastActivityAfter: '2019-12-27T18:11:19.117Z',
          lastActivityBefore: '2019-12-27T18:11:19.117Z',
          limit: 1,
          participantQuery: 'participantQuery',
          query: 'query',
          starting_after: '196640',
          type: 'single',
          unreadOnly: true,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(BeeperDesktopAPI.NotFoundError);
  });
});
