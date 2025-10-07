// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import BeeperDesktop from '@beeper/desktop-api';

const client = new BeeperDesktop({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource chats', () => {
  test('create: only required params', async () => {
    const responsePromise = client.chats.create({
      accountID: 'local-whatsapp_ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc',
      participantIDs: ['string'],
      type: 'single',
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
    const response = await client.chats.create({
      accountID: 'local-whatsapp_ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc',
      participantIDs: ['string'],
      type: 'single',
      messageText: 'messageText',
      title: 'title',
    });
  });

  test('retrieve', async () => {
    const responsePromise = client.chats.retrieve('!NCdzlIaMjZUmvmvyHU:beeper.com');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.chats.retrieve(
        '!NCdzlIaMjZUmvmvyHU:beeper.com',
        { maxParticipantCount: 50 },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(BeeperDesktop.NotFoundError);
  });

  test('list', async () => {
    const responsePromise = client.chats.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.chats.list(
        {
          accountIDs: [
            'whatsapp',
            'local-whatsapp_ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc',
            'local-instagram_ba_eRfQMmnSNy_p7Ih7HL7RduRpKFU',
          ],
          cursor: '1725489123456',
          direction: 'before',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(BeeperDesktop.NotFoundError);
  });

  test('archive', async () => {
    const responsePromise = client.chats.archive('!NCdzlIaMjZUmvmvyHU:beeper.com');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('archive: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.chats.archive(
        '!NCdzlIaMjZUmvmvyHU:beeper.com',
        { archived: true },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(BeeperDesktop.NotFoundError);
  });

  test('search', async () => {
    const responsePromise = client.chats.search();
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
      client.chats.search(
        {
          accountIDs: [
            'local-whatsapp_ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc',
            'local-telegram_ba_QFrb5lrLPhO3OT5MFBeTWv0x4BI',
          ],
          cursor: 'eyJvZmZzZXQiOjE3MTk5OTk5OTl9',
          direction: 'after',
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
});
