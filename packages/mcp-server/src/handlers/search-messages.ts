import { asTextContentResult, type HandlerFunction } from '../tools/types';
import { mapMessagesToText } from './utils';

export const handler: HandlerFunction = async (client, args) => {
  const body = args as any;
  const output = await client.messages.search(body);
  return asTextContentResult(mapMessagesToText(output, body, undefined));
};
