// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { IncomingMessage } from 'node:http';
import { ClientOptions } from '@beeper/desktop-api-js';

export const parseAuthHeaders = (req: IncomingMessage): Partial<ClientOptions> => {
  if (req.headers.authorization) {
    const scheme = req.headers.authorization.split(' ')[0]!;
    const value = req.headers.authorization.slice(scheme.length + 1);
    switch (scheme) {
      case 'Bearer':
        return { accessToken: req.headers.authorization.slice('Bearer '.length) };
      default:
        throw new Error(`Unsupported authorization scheme`);
    }
  }

  const accessToken =
    Array.isArray(req.headers['x-beeper-access-token']) ?
      req.headers['x-beeper-access-token'][0]
    : req.headers['x-beeper-access-token'];
  return { accessToken };
};
