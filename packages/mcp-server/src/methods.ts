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
    clientCallName: 'client.accounts.retrieve',
    fullyQualifiedName: 'accounts.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/accounts/{accountID}',
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
    clientCallName: 'client.bridges.retrieve',
    fullyQualifiedName: 'bridges.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/bridges/{bridgeID}',
  },
  {
    clientCallName: 'client.bridges.list',
    fullyQualifiedName: 'bridges.list',
    httpMethod: 'get',
    httpPath: '/v1/bridges',
  },
  {
    clientCallName: 'client.bridges.retrieveCapabilities',
    fullyQualifiedName: 'bridges.retrieveCapabilities',
    httpMethod: 'get',
    httpPath: '/v1/bridges/{bridgeID}/capabilities',
  },
  {
    clientCallName: 'client.bridges.loginFlows.list',
    fullyQualifiedName: 'bridges.loginFlows.list',
    httpMethod: 'get',
    httpPath: '/v1/bridges/{bridgeID}/login-flows',
  },
  {
    clientCallName: 'client.bridges.loginSessions.create',
    fullyQualifiedName: 'bridges.loginSessions.create',
    httpMethod: 'post',
    httpPath: '/v1/bridges/{bridgeID}/login-sessions',
  },
  {
    clientCallName: 'client.bridges.loginSessions.retrieve',
    fullyQualifiedName: 'bridges.loginSessions.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/bridges/{bridgeID}/login-sessions/{loginSessionID}',
  },
  {
    clientCallName: 'client.bridges.loginSessions.cancel',
    fullyQualifiedName: 'bridges.loginSessions.cancel',
    httpMethod: 'delete',
    httpPath: '/v1/bridges/{bridgeID}/login-sessions/{loginSessionID}',
  },
  {
    clientCallName: 'client.bridges.loginSessions.steps.submit',
    fullyQualifiedName: 'bridges.loginSessions.steps.submit',
    httpMethod: 'post',
    httpPath: '/v1/bridges/{bridgeID}/login-sessions/{loginSessionID}/steps/{stepID}',
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
    clientCallName: 'client.chats.update',
    fullyQualifiedName: 'chats.update',
    httpMethod: 'patch',
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
    clientCallName: 'client.chats.markRead',
    fullyQualifiedName: 'chats.markRead',
    httpMethod: 'post',
    httpPath: '/v1/chats/{chatID}/read',
  },
  {
    clientCallName: 'client.chats.markUnread',
    fullyQualifiedName: 'chats.markUnread',
    httpMethod: 'post',
    httpPath: '/v1/chats/{chatID}/unread',
  },
  {
    clientCallName: 'client.chats.notifyAnyway',
    fullyQualifiedName: 'chats.notifyAnyway',
    httpMethod: 'post',
    httpPath: '/v1/chats/{chatID}/notify-anyway',
  },
  {
    clientCallName: 'client.chats.search',
    fullyQualifiedName: 'chats.search',
    httpMethod: 'get',
    httpPath: '/v1/chats/search',
  },
  {
    clientCallName: 'client.chats.start',
    fullyQualifiedName: 'chats.start',
    httpMethod: 'post',
    httpPath: '/v1/chats/start',
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
    httpPath: '/v1/chats/{chatID}/messages/{messageID}/reactions/{reactionKey}',
  },
  {
    clientCallName: 'client.chats.messages.reactions.add',
    fullyQualifiedName: 'chats.messages.reactions.add',
    httpMethod: 'post',
    httpPath: '/v1/chats/{chatID}/messages/{messageID}/reactions',
  },
  {
    clientCallName: 'client.messages.retrieve',
    fullyQualifiedName: 'messages.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/chats/{chatID}/messages/{messageID}',
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
    clientCallName: 'client.messages.delete',
    fullyQualifiedName: 'messages.delete',
    httpMethod: 'delete',
    httpPath: '/v1/chats/{chatID}/messages/{messageID}',
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
  {
    clientCallName: 'client.app.session',
    fullyQualifiedName: 'app.session',
    httpMethod: 'get',
    httpPath: '/v1/app/setup',
  },
  {
    clientCallName: 'client.app.login.email',
    fullyQualifiedName: 'app.login.email',
    httpMethod: 'post',
    httpPath: '/v1/app/setup/email',
  },
  {
    clientCallName: 'client.app.login.register',
    fullyQualifiedName: 'app.login.register',
    httpMethod: 'post',
    httpPath: '/v1/app/setup/register',
  },
  {
    clientCallName: 'client.app.login.response',
    fullyQualifiedName: 'app.login.response',
    httpMethod: 'post',
    httpPath: '/v1/app/setup/response',
  },
  {
    clientCallName: 'client.app.login.start',
    fullyQualifiedName: 'app.login.start',
    httpMethod: 'post',
    httpPath: '/v1/app/setup/start',
  },
  {
    clientCallName: 'client.app.login.verification.recoveryKey.verify',
    fullyQualifiedName: 'app.login.verification.recoveryKey.verify',
    httpMethod: 'post',
    httpPath: '/v1/app/setup/verification/recovery-key',
  },
  {
    clientCallName: 'client.app.login.verification.recoveryKey.reset.create',
    fullyQualifiedName: 'app.login.verification.recoveryKey.reset.create',
    httpMethod: 'post',
    httpPath: '/v1/app/setup/verification/recovery-key/reset',
  },
  {
    clientCallName: 'client.app.login.verification.recoveryKey.reset.confirm',
    fullyQualifiedName: 'app.login.verification.recoveryKey.reset.confirm',
    httpMethod: 'post',
    httpPath: '/v1/app/setup/verification/recovery-key/reset/confirm',
  },
  {
    clientCallName: 'client.app.verifications.create',
    fullyQualifiedName: 'app.verifications.create',
    httpMethod: 'post',
    httpPath: '/v1/app/setup/verifications',
  },
  {
    clientCallName: 'client.app.verifications.retrieve',
    fullyQualifiedName: 'app.verifications.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/app/setup/verifications/{verificationID}',
  },
  {
    clientCallName: 'client.app.verifications.list',
    fullyQualifiedName: 'app.verifications.list',
    httpMethod: 'get',
    httpPath: '/v1/app/setup/verifications',
  },
  {
    clientCallName: 'client.app.verifications.accept',
    fullyQualifiedName: 'app.verifications.accept',
    httpMethod: 'post',
    httpPath: '/v1/app/setup/verifications/{verificationID}/accept',
  },
  {
    clientCallName: 'client.app.verifications.cancel',
    fullyQualifiedName: 'app.verifications.cancel',
    httpMethod: 'post',
    httpPath: '/v1/app/setup/verifications/{verificationID}/cancel',
  },
  {
    clientCallName: 'client.app.verifications.qr.confirmScanned',
    fullyQualifiedName: 'app.verifications.qr.confirmScanned',
    httpMethod: 'post',
    httpPath: '/v1/app/setup/verifications/{verificationID}/qr/confirm-scanned',
  },
  {
    clientCallName: 'client.app.verifications.qr.scan',
    fullyQualifiedName: 'app.verifications.qr.scan',
    httpMethod: 'post',
    httpPath: '/v1/app/setup/verifications/qr/scan',
  },
  {
    clientCallName: 'client.app.verifications.sas.confirm',
    fullyQualifiedName: 'app.verifications.sas.confirm',
    httpMethod: 'post',
    httpPath: '/v1/app/setup/verifications/{verificationID}/sas/confirm',
  },
  {
    clientCallName: 'client.app.verifications.sas.start',
    fullyQualifiedName: 'app.verifications.sas.start',
    httpMethod: 'post',
    httpPath: '/v1/app/setup/verifications/{verificationID}/sas/start',
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
