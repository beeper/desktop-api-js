// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { BaseAssets } from '@beeper/desktop-api/resources/assets';

import BeeperDesktop, { toFile } from '@beeper/desktop-api';
import { createClient, type PartialBeeperDesktop } from '@beeper/desktop-api/tree-shakable';

const client = new BeeperDesktop({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

const partialClient = createClient({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
  resources: [BaseAssets],
});

const runTests = (client: PartialBeeperDesktop<{ assets: BaseAssets }>) => {
  test('download: only required params', async () => {
    const responsePromise = client.assets.download({ url: 'mxc://example.org/Q4x9CqGz1pB3Oa6XgJ' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('download: required and optional params', async () => {
    const response = await client.assets.download({ url: 'mxc://example.org/Q4x9CqGz1pB3Oa6XgJ' });
  });

  test('serve: only required params', async () => {
    const responsePromise = client.assets.serve({ url: 'x' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('serve: required and optional params', async () => {
    const response = await client.assets.serve({ url: 'x' });
  });

  test('upload: only required params', async () => {
    const responsePromise = client.assets.upload({
      file: await toFile(Buffer.from('Example data'), 'README.md'),
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('upload: required and optional params', async () => {
    const response = await client.assets.upload({
      file: await toFile(Buffer.from('Example data'), 'README.md'),
      fileName: 'fileName',
      mimeType: 'mimeType',
    });
  });

  test('uploadBase64: only required params', async () => {
    const responsePromise = client.assets.uploadBase64({ content: 'x' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('uploadBase64: required and optional params', async () => {
    const response = await client.assets.uploadBase64({
      content: 'x',
      fileName: 'fileName',
      mimeType: 'mimeType',
    });
  });
};
describe('resource assets', () => runTests(client));
describe('resource assets (tree shakable, base)', () => runTests(partialClient));
