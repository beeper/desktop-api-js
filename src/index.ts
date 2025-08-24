// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

export { BeeperDesktop as default } from './client';

export { type Uploadable, toFile } from 'beeper/desktop-api-js/core/uploads';
export { APIPromise } from 'beeper/desktop-api-js/core/api-promise';
export { BeeperDesktop, type ClientOptions } from 'beeper/desktop-api-js/client';
export { PagePromise } from 'beeper/desktop-api-js/core/pagination';
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
} from 'beeper/desktop-api-js/core/error';
