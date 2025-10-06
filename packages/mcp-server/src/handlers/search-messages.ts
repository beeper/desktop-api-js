import type { HandlerFunction } from '../tools/types';
import { mapMessagesToText } from './utils';

export const handler: HandlerFunction = async (client, args) => {
  const body = args as any;
  const output = await client.messages.search(body);

  return {
    content: [
      {
        type: 'text' as const,
        text: mapMessagesToText(output as any, body, undefined),
      },
    ],
  };
};
