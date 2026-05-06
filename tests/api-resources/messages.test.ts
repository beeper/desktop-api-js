// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { BaseMessages } from '@beeper/desktop-api/resources/messages';

import BeeperDesktop from '@beeper/desktop-api';
import { createClient, type PartialBeeperDesktop } from '@beeper/desktop-api/tree-shakable';

const client = new BeeperDesktop({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

const partialClient = createClient({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
  resources: [BaseMessages],
});

const runTests = (client: PartialBeeperDesktop<{ messages: BaseMessages }>) => {
  test('retrieve: only required params', async () => {
    const responsePromise = client.messages.retrieve('1343993', { chatID: '!NCdzlIaMjZUmvmvyHU:beeper.com' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve: required and optional params', async () => {
    const response = await client.messages.retrieve('1343993', { chatID: '!NCdzlIaMjZUmvmvyHU:beeper.com' });
  });

  test('update: only required params', async () => {
    const responsePromise = client.messages.update('1343993', {
      chatID: '!NCdzlIaMjZUmvmvyHU:beeper.com',
      text: 'x',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update: required and optional params', async () => {
    const response = await client.messages.update('1343993', {
      chatID: '!NCdzlIaMjZUmvmvyHU:beeper.com',
      text: 'x',
    });
  });

  test('list', async () => {
    const responsePromise = client.messages.list('!NCdzlIaMjZUmvmvyHU:beeper.com');
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
      client.messages.list(
        '!NCdzlIaMjZUmvmvyHU:beeper.com',
        { cursor: '1725489123456|c29tZUltc2dQYWdl', direction: 'before' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(BeeperDesktop.NotFoundError);
  });

  test('delete: only required params', async () => {
    const responsePromise = client.messages.delete('1343993', { chatID: '!NCdzlIaMjZUmvmvyHU:beeper.com' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('delete: required and optional params', async () => {
    const response = await client.messages.delete('1343993', {
      chatID: '!NCdzlIaMjZUmvmvyHU:beeper.com',
      forEveryone: true,
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
          accountIDs: ['matrix', 'discordgo', 'local-whatsapp_ba_EvYDBBsZbRQAy3UOSWqG0LuTVkc'],
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
          sender: 'sender',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(BeeperDesktop.NotFoundError);
  });

  test('send', async () => {
    const responsePromise = client.messages.send('!NCdzlIaMjZUmvmvyHU:beeper.com');
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
        '!NCdzlIaMjZUmvmvyHU:beeper.com',
        {
          attachment: {
            uploadID: 'uploadID',
            duration: 0,
            fileName: 'fileName',
            mimeType: 'mimeType',
            size: { height: 0, width: 0 },
            type: 'image',
          },
          replyToMessageID: 'replyToMessageID',
          text: 'text',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(BeeperDesktop.NotFoundError);
  });
};
describe('resource messages', () => runTests(client));
describe('resource messages (tree shakable, base)', () => runTests(partialClient));
