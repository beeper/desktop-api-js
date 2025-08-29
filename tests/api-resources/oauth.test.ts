// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import BeeperDesktop from '@beeper/desktop-api';

const client = new BeeperDesktop({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource oauth', () => {
  test('authorize: only required params', async () => {
    const responsePromise = client.oauth.authorize({
      client_id: 'client_id',
      code_challenge: 'code_challenge',
      redirect_uri: 'https://example.com',
      response_type: 'code',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('authorize: required and optional params', async () => {
    const response = await client.oauth.authorize({
      client_id: 'client_id',
      code_challenge: 'code_challenge',
      redirect_uri: 'https://example.com',
      response_type: 'code',
      code_challenge_method: 'S256',
      resource: 'resource',
      scope: 'scope',
      state: 'state',
    });
  });

  test('authorizeCallback', async () => {
    const responsePromise = client.oauth.authorizeCallback();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('authorizeCallback: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.oauth.authorizeCallback(
        {
          clientInfo: {
            clientID: 'clientID',
            clientURI: 'clientURI',
            name: 'name',
            remoteAddress: 'remoteAddress',
            userAgent: 'userAgent',
            version: 'version',
          },
          codeChallenge: 'codeChallenge',
          codeChallengeMethod: 'S256',
          resource: 'resource',
          scopes: ['read'],
          state: 'state',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(BeeperDesktop.NotFoundError);
  });

  test('getUserInfo', async () => {
    const responsePromise = client.oauth.getUserInfo();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('registerClient: only required params', async () => {
    const responsePromise = client.oauth.registerClient({
      client_name: 'client_name',
      redirect_uris: ['https://example.com'],
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('registerClient: required and optional params', async () => {
    const response = await client.oauth.registerClient({
      client_name: 'client_name',
      redirect_uris: ['https://example.com'],
      client_uri: 'https://example.com',
      grant_types: ['authorization_code'],
      response_types: ['code'],
      scope: 'scope',
      token_endpoint_auth_method: 'none',
    });
  });

  test('revokeToken: only required params', async () => {
    const responsePromise = client.oauth.revokeToken({ token: 'token' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('revokeToken: required and optional params', async () => {
    const response = await client.oauth.revokeToken({ token: 'token', token_type_hint: 'access_token' });
  });

  test('token: only required params', async () => {
    const responsePromise = client.oauth.token({
      code: 'code',
      code_verifier: 'code_verifier',
      grant_type: 'authorization_code',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('token: required and optional params', async () => {
    const response = await client.oauth.token({
      code: 'code',
      code_verifier: 'code_verifier',
      grant_type: 'authorization_code',
      client_id: 'client_id',
      resource: 'resource',
    });
  });

  test('wellKnownAuthorizationServer', async () => {
    const responsePromise = client.oauth.wellKnownAuthorizationServer();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('wellKnownProtectedResource', async () => {
    const responsePromise = client.oauth.wellKnownProtectedResource();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
