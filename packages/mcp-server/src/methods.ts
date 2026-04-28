// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { McpOptions } from './options';

export type SdkMethod = {
  clientCallName: string;
  fullyQualifiedName: string;
  httpMethod?: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'query';
  httpPath?: string;
};

export const sdkMethods: SdkMethod[] = [
  {
    clientCallName: 'client.focus',
    fullyQualifiedName: 'focus',
    httpMethod: 'post',
    httpPath: '/v1/focus',
  },
  {
    clientCallName: 'client.search',
    fullyQualifiedName: 'search',
    httpMethod: 'get',
    httpPath: '/v1/search',
  },
  {
    clientCallName: 'client.accounts.list',
    fullyQualifiedName: 'accounts.list',
    httpMethod: 'get',
    httpPath: '/v1/accounts',
  },
  {
    clientCallName: 'client.accounts.contacts.list',
    fullyQualifiedName: 'accounts.contacts.list',
    httpMethod: 'get',
    httpPath: '/v1/accounts/{accountID}/contacts/list',
  },
  {
    clientCallName: 'client.accounts.contacts.search',
    fullyQualifiedName: 'accounts.contacts.search',
    httpMethod: 'get',
    httpPath: '/v1/accounts/{accountID}/contacts',
  },
  {
    clientCallName: 'client.chats.create',
    fullyQualifiedName: 'chats.create',
    httpMethod: 'post',
    httpPath: '/v1/chats',
  },
  {
    clientCallName: 'client.chats.retrieve',
    fullyQualifiedName: 'chats.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/chats/{chatID}',
  },
  {
    clientCallName: 'client.chats.list',
    fullyQualifiedName: 'chats.list',
    httpMethod: 'get',
    httpPath: '/v1/chats',
  },
  {
    clientCallName: 'client.chats.archive',
    fullyQualifiedName: 'chats.archive',
    httpMethod: 'post',
    httpPath: '/v1/chats/{chatID}/archive',
  },
  {
    clientCallName: 'client.chats.search',
    fullyQualifiedName: 'chats.search',
    httpMethod: 'get',
    httpPath: '/v1/chats/search',
  },
  {
    clientCallName: 'client.chats.reminders.create',
    fullyQualifiedName: 'chats.reminders.create',
    httpMethod: 'post',
    httpPath: '/v1/chats/{chatID}/reminders',
  },
  {
    clientCallName: 'client.chats.reminders.delete',
    fullyQualifiedName: 'chats.reminders.delete',
    httpMethod: 'delete',
    httpPath: '/v1/chats/{chatID}/reminders',
  },
  {
    clientCallName: 'client.chats.messages.reactions.delete',
    fullyQualifiedName: 'chats.messages.reactions.delete',
    httpMethod: 'delete',
    httpPath: '/v1/chats/{chatID}/messages/{messageID}/reactions',
  },
  {
    clientCallName: 'client.chats.messages.reactions.add',
    fullyQualifiedName: 'chats.messages.reactions.add',
    httpMethod: 'post',
    httpPath: '/v1/chats/{chatID}/messages/{messageID}/reactions',
  },
  {
    clientCallName: 'client.messages.update',
    fullyQualifiedName: 'messages.update',
    httpMethod: 'put',
    httpPath: '/v1/chats/{chatID}/messages/{messageID}',
  },
  {
    clientCallName: 'client.messages.list',
    fullyQualifiedName: 'messages.list',
    httpMethod: 'get',
    httpPath: '/v1/chats/{chatID}/messages',
  },
  {
    clientCallName: 'client.messages.search',
    fullyQualifiedName: 'messages.search',
    httpMethod: 'get',
    httpPath: '/v1/messages/search',
  },
  {
    clientCallName: 'client.messages.send',
    fullyQualifiedName: 'messages.send',
    httpMethod: 'post',
    httpPath: '/v1/chats/{chatID}/messages',
  },
  {
    clientCallName: 'client.assets.download',
    fullyQualifiedName: 'assets.download',
    httpMethod: 'post',
    httpPath: '/v1/assets/download',
  },
  {
    clientCallName: 'client.assets.serve',
    fullyQualifiedName: 'assets.serve',
    httpMethod: 'get',
    httpPath: '/v1/assets/serve',
  },
  {
    clientCallName: 'client.assets.upload',
    fullyQualifiedName: 'assets.upload',
    httpMethod: 'post',
    httpPath: '/v1/assets/upload',
  },
  {
    clientCallName: 'client.assets.uploadBase64',
    fullyQualifiedName: 'assets.uploadBase64',
    httpMethod: 'post',
    httpPath: '/v1/assets/upload/base64',
  },
  {
    clientCallName: 'client.info.retrieve',
    fullyQualifiedName: 'info.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/info',
  },
];

function allowedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  if (!options) {
    return undefined;
  }

  let allowedMethods: SdkMethod[];

  if (options.codeAllowHttpGets || options.codeAllowedMethods) {
    // Start with nothing allowed and then add into it from options
    let allowedMethodsSet = new Set<SdkMethod>();

    if (options.codeAllowHttpGets) {
      // Add all methods that map to an HTTP GET
      sdkMethods
        .filter((method) => method.httpMethod === 'get')
        .forEach((method) => allowedMethodsSet.add(method));
    }

    if (options.codeAllowedMethods) {
      // Add all methods that match any of the allowed regexps
      const allowedRegexps = options.codeAllowedMethods.map((pattern) => {
        try {
          return new RegExp(pattern);
        } catch (e) {
          throw new Error(
            `Invalid regex pattern for allowed method: "${pattern}": ${e instanceof Error ? e.message : e}`,
          );
        }
      });

      sdkMethods
        .filter((method) => allowedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)))
        .forEach((method) => allowedMethodsSet.add(method));
    }

    allowedMethods = Array.from(allowedMethodsSet);
  } else {
    // Start with everything allowed
    allowedMethods = [...sdkMethods];
  }

  if (options.codeBlockedMethods) {
    // Filter down based on blocked regexps
    const blockedRegexps = options.codeBlockedMethods.map((pattern) => {
      try {
        return new RegExp(pattern);
      } catch (e) {
        throw new Error(
          `Invalid regex pattern for blocked method: "${pattern}": ${e instanceof Error ? e.message : e}`,
        );
      }
    });

    allowedMethods = allowedMethods.filter(
      (method) => !blockedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)),
    );
  }

  return allowedMethods;
}

export function blockedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  const allowedMethods = allowedMethodsForCodeTool(options);
  if (!allowedMethods) {
    return undefined;
  }

  const allowedSet = new Set(allowedMethods.map((method) => method.fullyQualifiedName));

  // Return any methods that are not explicitly allowed
  return sdkMethods.filter((method) => !allowedSet.has(method.fullyQualifiedName));
}
