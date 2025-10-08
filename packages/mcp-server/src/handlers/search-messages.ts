import type { HandlerFunction } from '../tools/types';
import { mapMessagesToText, asMarkdownContentResult } from './utils';

export const handler: HandlerFunction = async (client, args) => {
  const body = args as any;
  const output = await client.messages.search(body);
  return asMarkdownContentResult(mapMessagesToText(output, body, undefined));
};
