// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

export { BeeperDesktop as default } from './client';

export { type Uploadable, toFile } from 'beeper/desktop-api/core/uploads';
export { APIPromise } from 'beeper/desktop-api/core/api-promise';
export { BeeperDesktop, type ClientOptions } from 'beeper/desktop-api/client';
export { PagePromise } from 'beeper/desktop-api/core/pagination';
export {
  BeeperDesktopError,
  APIError,
  APIConnectionError,
  APIConnectionTimeoutError,
  APIUserAbortError,
  NotFoundError,
  ConflictError,
  RateLimitError,
  BadRequestError,
  AuthenticationError,
  InternalServerError,
  PermissionDeniedError,
  UnprocessableEntityError,
} from 'beeper/desktop-api/core/error';
