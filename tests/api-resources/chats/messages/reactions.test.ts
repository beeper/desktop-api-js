// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import BeeperDesktop from '@beeper/desktop-api';

const client = new BeeperDesktop({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource reactions', () => {
  test('delete: only required params', async () => {
    const responsePromise = client.chats.messages.reactions.delete('messageID', {
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

  test('delete: required and optional params', async () => {
    const response = await client.chats.messages.reactions.delete('messageID', {
      chatID: '!NCdzlIaMjZUmvmvyHU:beeper.com',
      reactionKey: 'x',
    });
  });

  test('add: only required params', async () => {
    const responsePromise = client.chats.messages.reactions.add('messageID', {
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
    const response = await client.chats.messages.reactions.add('messageID', {
      chatID: '!NCdzlIaMjZUmvmvyHU:beeper.com',
      reactionKey: 'x',
      transactionID: 'transactionID',
    });
  });
});
