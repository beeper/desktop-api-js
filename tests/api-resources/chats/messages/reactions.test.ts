// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Messages } from '@beeper/desktop-api/resources/chats/messages/messages';
import { BaseReactions } from '@beeper/desktop-api/resources/chats/messages/reactions';

import BeeperDesktop from '@beeper/desktop-api';
import { createClient, type PartialBeeperDesktop } from '@beeper/desktop-api/tree-shakable';

const client = new BeeperDesktop({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

const partialClient = createClient({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
  resources: [BaseReactions],
});

const parentPartialClient = createClient({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
  resources: [Messages],
});

const runTests = (client: PartialBeeperDesktop<{ chats: { messages: { reactions: BaseReactions } } }>) => {
  test('delete: only required params', async () => {
    const responsePromise = client.chats.messages.reactions.delete('x', {
      chatID: '!NCdzlIaMjZUmvmvyHU:beeper.com',
      messageID: '1343993',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('delete: required and optional params', async () => {
    const response = await client.chats.messages.reactions.delete('x', {
      chatID: '!NCdzlIaMjZUmvmvyHU:beeper.com',
      messageID: '1343993',
    });
  });

  test('add: only required params', async () => {
    const responsePromise = client.chats.messages.reactions.add('1343993', {
      chatID: '!NCdzlIaMjZUmvmvyHU:beeper.com',
      reactionKey: 'x',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('add: required and optional params', async () => {
    const response = await client.chats.messages.reactions.add('1343993', {
      chatID: '!NCdzlIaMjZUmvmvyHU:beeper.com',
      reactionKey: 'x',
      transactionID: 'transactionID',
    });
  });
};
describe('resource reactions', () => runTests(client));
describe('resource reactions (tree shakable, base)', () => runTests(partialClient));
describe('resource reactions (tree shakable, subresource)', () => runTests(parentPartialClient));
