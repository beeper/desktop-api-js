// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import BeeperDesktop from '@beeper/desktop-api';

const client = new BeeperDesktop({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource app', () => {
  test('focusApp', async () => {
    const responsePromise = client.app.focusApp();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('focusApp: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.app.focusApp(
        {
          chatID: '!-5hI_iHR5vSDCtI8PzSDQT0H_3I:ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc.local-whatsapp.localhost',
          messageSortKey: 'messageSortKey',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(BeeperDesktop.NotFoundError);
  });
});
