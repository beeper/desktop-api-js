// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { BaseChats } from '@beeper/desktop-api/resources/chats/chats';

import BeeperDesktop from '@beeper/desktop-api';
import { createClient, type PartialBeeperDesktop } from '@beeper/desktop-api/tree-shakable';

const client = new BeeperDesktop({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

const partialClient = createClient({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
  resources: [BaseChats],
});

const runTests = (client: PartialBeeperDesktop<{ chats: BaseChats }>) => {
  test('create: only required params', async () => {
    const responsePromise = client.chats.create({
      accountID: 'accountID',
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
      accountID: 'accountID',
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
        { maxParticipantCount: 100 },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(BeeperDesktop.NotFoundError);
  });

  test('update', async () => {
    const responsePromise = client.chats.update('!NCdzlIaMjZUmvmvyHU:beeper.com');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.chats.update(
        '!NCdzlIaMjZUmvmvyHU:beeper.com',
        {
          description: 'description',
          draft: {
            text: 'text',
            attachments: {
              foo: {
                uploadID: 'uploadID',
                id: 'id',
                duration: 0,
                fileName: 'fileName',
                mimeType: 'mimeType',
                size: { height: 0, width: 0 },
                type: 'image',
              },
            },
          },
          imgURL: 'imgURL',
          isArchived: true,
          isLowPriority: true,
          isMuted: true,
          isPinned: true,
          messageExpirySeconds: 0,
          title: 'title',
        },
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
          accountIDs: ['matrix', 'discordgo', 'local-whatsapp_ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc'],
          cursor: '1725489123456|c29tZUltc2dQYWdl',
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

  test('markRead', async () => {
    const responsePromise = client.chats.markRead('!NCdzlIaMjZUmvmvyHU:beeper.com');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('markRead: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.chats.markRead(
        '!NCdzlIaMjZUmvmvyHU:beeper.com',
        { messageID: '1343993' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(BeeperDesktop.NotFoundError);
  });

  test('markUnread', async () => {
    const responsePromise = client.chats.markUnread('!NCdzlIaMjZUmvmvyHU:beeper.com');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('markUnread: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.chats.markUnread(
        '!NCdzlIaMjZUmvmvyHU:beeper.com',
        { messageID: '1343993' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(BeeperDesktop.NotFoundError);
  });

  test('notifyAnyway', async () => {
    const responsePromise = client.chats.notifyAnyway('!NCdzlIaMjZUmvmvyHU:beeper.com');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('notifyAnyway: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.chats.notifyAnyway('!NCdzlIaMjZUmvmvyHU:beeper.com', {}, { path: '/_stainless_unknown_path' }),
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
          accountIDs: ['matrix', 'discordgo', 'local-whatsapp_ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc'],
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

  test('start: only required params', async () => {
    const responsePromise = client.chats.start({
      accountID: 'accountID',
      user: {},
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('start: required and optional params', async () => {
    const response = await client.chats.start({
      accountID: 'accountID',
      user: {
        id: 'id',
        email: 'email',
        fullName: 'fullName',
        phoneNumber: 'phoneNumber',
        username: 'username',
      },
      allowInvite: true,
      messageText: 'messageText',
    });
  });
};
describe('resource chats', () => runTests(client));
describe('resource chats (tree shakable, base)', () => runTests(partialClient));
