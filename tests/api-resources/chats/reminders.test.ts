// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import BeeperDesktop from '@beeper/desktop-api';

const client = new BeeperDesktop({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource reminders', () => {
  test('create: only required params', async () => {
    const responsePromise = client.chats.reminders.create({
      chatID: '!NCdzlIaMjZUmvmvyHU:beeper.com',
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

  test('create: required and optional params', async () => {
    const response = await client.chats.reminders.create({
      chatID: '!NCdzlIaMjZUmvmvyHU:beeper.com',
      reminder: { remindAtMs: 0, dismissOnIncomingMessage: true },
    });
  });

  test('delete: only required params', async () => {
    const responsePromise = client.chats.reminders.delete({ chatID: '!NCdzlIaMjZUmvmvyHU:beeper.com' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('delete: required and optional params', async () => {
    const response = await client.chats.reminders.delete({ chatID: '!NCdzlIaMjZUmvmvyHU:beeper.com' });
  });
});
