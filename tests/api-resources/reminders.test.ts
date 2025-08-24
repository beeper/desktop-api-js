// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import BeeperDesktop from '@beeper/desktop-api';

const client = new BeeperDesktop({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource reminders', () => {
  test('clearChatReminder: only required params', async () => {
    const responsePromise = client.reminders.clearChatReminder({
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

  test('clearChatReminder: required and optional params', async () => {
    const response = await client.reminders.clearChatReminder({
      chatID: '!-5hI_iHR5vSDCtI8PzSDQT0H_3I:ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc.local-whatsapp.localhost',
    });
  });

  test('setChatReminder: only required params', async () => {
    const responsePromise = client.reminders.setChatReminder({
      chatID: '!-5hI_iHR5vSDCtI8PzSDQT0H_3I:ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc.local-whatsapp.localhost',
      reminder: { remindAtMs: 0 },
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('setChatReminder: required and optional params', async () => {
    const response = await client.reminders.setChatReminder({
      chatID: '!-5hI_iHR5vSDCtI8PzSDQT0H_3I:ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc.local-whatsapp.localhost',
      reminder: { remindAtMs: 0, dismissOnIncomingMessage: true },
    });
  });
});
