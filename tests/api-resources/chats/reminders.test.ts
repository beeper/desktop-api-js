// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Chats } from '@beeper/desktop-api/resources/chats/chats';
import { BaseReminders } from '@beeper/desktop-api/resources/chats/reminders';

import BeeperDesktop from '@beeper/desktop-api';
import { createClient, type PartialBeeperDesktop } from '@beeper/desktop-api/tree-shakable';

const client = new BeeperDesktop({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

const partialClient = createClient({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
  resources: [BaseReminders],
});

const parentPartialClient = createClient({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
  resources: [Chats],
});

const runTests = (client: PartialBeeperDesktop<{ chats: { reminders: BaseReminders } }>) => {
  test('create: only required params', async () => {
    const responsePromise = client.chats.reminders.create('!NCdzlIaMjZUmvmvyHU:beeper.com', {
      reminder: { remindAt: '2025-08-31T23:30:12.520Z' },
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
    const response = await client.chats.reminders.create('!NCdzlIaMjZUmvmvyHU:beeper.com', {
      reminder: { remindAt: '2025-08-31T23:30:12.520Z', dismissOnIncomingMessage: true },
    });
  });

  test('delete', async () => {
    const responsePromise = client.chats.reminders.delete('!NCdzlIaMjZUmvmvyHU:beeper.com');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
};
describe('resource reminders', () => runTests(client));
describe('resource reminders (tree shakable, base)', () => runTests(partialClient));
describe('resource reminders (tree shakable, subresource)', () => runTests(parentPartialClient));
