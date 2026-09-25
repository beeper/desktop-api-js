import { IncomingMessage } from 'node:http';
import { parseClientAuthHeaders } from '../src/auth';

const reqWithHeaders = (headers: IncomingMessage['headers']) => ({ headers }) as IncomingMessage;

describe('parseClientAuthHeaders', () => {
  it('returns bearer access token from Authorization header', () => {
    expect(parseClientAuthHeaders(reqWithHeaders({ authorization: 'Bearer token' }), true)).toEqual({
      accessToken: 'token',
    });
  });

  it('returns x-beeper-access-token when auth is required', () => {
    expect(parseClientAuthHeaders(reqWithHeaders({ 'x-beeper-access-token': 'token' }), true)).toEqual({
      accessToken: 'token',
    });
  });

  it('throws when auth is required and no token is present', () => {
    expect(() => parseClientAuthHeaders(reqWithHeaders({}), true)).toThrow(
      'Missing required Authorization header',
    );
  });
});
