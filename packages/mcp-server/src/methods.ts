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
    clientCallName: 'client.bridges.list',
    fullyQualifiedName: 'bridges.list',
    httpMethod: 'get',
    httpPath: '/v1/bridges',
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
    clientCallName: 'client.app.status',
    fullyQualifiedName: 'app.status',
    httpMethod: 'get',
    httpPath: '/v1/app/status',
  },
  {
    clientCallName: 'client.app.login.email',
    fullyQualifiedName: 'app.login.email',
    httpMethod: 'post',
    httpPath: '/v1/app/login/email',
  },
  {
    clientCallName: 'client.app.login.register',
    fullyQualifiedName: 'app.login.register',
    httpMethod: 'post',
    httpPath: '/v1/app/login/register',
  },
  {
    clientCallName: 'client.app.login.response',
    fullyQualifiedName: 'app.login.response',
    httpMethod: 'post',
    httpPath: '/v1/app/login/response',
  },
  {
    clientCallName: 'client.app.login.start',
    fullyQualifiedName: 'app.login.start',
    httpMethod: 'post',
    httpPath: '/v1/app/login/start',
  },
  {
    clientCallName: 'client.app.e2ee.recoveryCode.markBackedUp',
    fullyQualifiedName: 'app.e2ee.recoveryCode.markBackedUp',
    httpMethod: 'post',
    httpPath: '/v1/app/e2ee/recovery-code/mark-backed-up',
  },
  {
    clientCallName: 'client.app.e2ee.recoveryCode.verify',
    fullyQualifiedName: 'app.e2ee.recoveryCode.verify',
    httpMethod: 'post',
    httpPath: '/v1/app/e2ee/recovery-code/verify',
  },
  {
    clientCallName: 'client.app.e2ee.recoveryCode.reset.create',
    fullyQualifiedName: 'app.e2ee.recoveryCode.reset.create',
    httpMethod: 'post',
    httpPath: '/v1/app/e2ee/recovery-code/reset',
  },
  {
    clientCallName: 'client.app.e2ee.recoveryCode.reset.confirm',
    fullyQualifiedName: 'app.e2ee.recoveryCode.reset.confirm',
    httpMethod: 'post',
    httpPath: '/v1/app/e2ee/recovery-code/reset/confirm',
  },
  {
    clientCallName: 'client.app.e2ee.verification.create',
    fullyQualifiedName: 'app.e2ee.verification.create',
    httpMethod: 'post',
    httpPath: '/v1/app/e2ee/verification',
  },
  {
    clientCallName: 'client.app.e2ee.verification.accept',
    fullyQualifiedName: 'app.e2ee.verification.accept',
    httpMethod: 'post',
    httpPath: '/v1/app/e2ee/verification/{verificationID}/accept',
  },
  {
    clientCallName: 'client.app.e2ee.verification.cancel',
    fullyQualifiedName: 'app.e2ee.verification.cancel',
    httpMethod: 'post',
    httpPath: '/v1/app/e2ee/verification/{verificationID}/cancel',
  },
  {
    clientCallName: 'client.app.e2ee.verification.qr.confirmScanned',
    fullyQualifiedName: 'app.e2ee.verification.qr.confirmScanned',
    httpMethod: 'post',
    httpPath: '/v1/app/e2ee/verification/{verificationID}/qr/confirm-scanned',
  },
  {
    clientCallName: 'client.app.e2ee.verification.qr.scan',
    fullyQualifiedName: 'app.e2ee.verification.qr.scan',
    httpMethod: 'post',
    httpPath: '/v1/app/e2ee/verification/qr/scan',
  },
  {
    clientCallName: 'client.app.e2ee.verification.sas.confirm',
    fullyQualifiedName: 'app.e2ee.verification.sas.confirm',
    httpMethod: 'post',
    httpPath: '/v1/app/e2ee/verification/{verificationID}/sas/confirm',
  },
  {
    clientCallName: 'client.app.e2ee.verification.sas.start',
    fullyQualifiedName: 'app.e2ee.verification.sas.start',
    httpMethod: 'post',
    httpPath: '/v1/app/e2ee/verification/{verificationID}/sas/start',
  },
  {
    clientCallName: 'client.matrix.users.retrieveProfile',
    fullyQualifiedName: 'matrix.users.retrieveProfile',
    httpMethod: 'get',
    httpPath: '/_matrix/client/v3/profile/{userId}',
  },
  {
    clientCallName: 'client.matrix.users.accountData.retrieve',
    fullyQualifiedName: 'matrix.users.accountData.retrieve',
    httpMethod: 'get',
    httpPath: '/_matrix/client/v3/user/{userId}/account_data/{type}',
  },
  {
    clientCallName: 'client.matrix.users.accountData.update',
    fullyQualifiedName: 'matrix.users.accountData.update',
    httpMethod: 'put',
    httpPath: '/_matrix/client/v3/user/{userId}/account_data/{type}',
  },
  {
    clientCallName: 'client.matrix.rooms.create',
    fullyQualifiedName: 'matrix.rooms.create',
    httpMethod: 'post',
    httpPath: '/_matrix/client/v3/createRoom',
  },
  {
    clientCallName: 'client.matrix.rooms.join',
    fullyQualifiedName: 'matrix.rooms.join',
    httpMethod: 'post',
    httpPath: '/_matrix/client/v3/join/{roomIdOrAlias}',
  },
  {
    clientCallName: 'client.matrix.rooms.leave',
    fullyQualifiedName: 'matrix.rooms.leave',
    httpMethod: 'post',
    httpPath: '/_matrix/client/v3/rooms/{roomId}/leave',
  },
  {
    clientCallName: 'client.matrix.rooms.accountData.retrieve',
    fullyQualifiedName: 'matrix.rooms.accountData.retrieve',
    httpMethod: 'get',
    httpPath: '/_matrix/client/v3/user/{userId}/rooms/{roomId}/account_data/{type}',
  },
  {
    clientCallName: 'client.matrix.rooms.accountData.update',
    fullyQualifiedName: 'matrix.rooms.accountData.update',
    httpMethod: 'put',
    httpPath: '/_matrix/client/v3/user/{userId}/rooms/{roomId}/account_data/{type}',
  },
  {
    clientCallName: 'client.matrix.rooms.state.retrieve',
    fullyQualifiedName: 'matrix.rooms.state.retrieve',
    httpMethod: 'get',
    httpPath: '/_matrix/client/v3/rooms/{roomId}/state/{eventType}/{stateKey}',
  },
  {
    clientCallName: 'client.matrix.rooms.state.list',
    fullyQualifiedName: 'matrix.rooms.state.list',
    httpMethod: 'get',
    httpPath: '/_matrix/client/v3/rooms/{roomId}/state',
  },
  {
    clientCallName: 'client.matrix.rooms.events.retrieve',
    fullyQualifiedName: 'matrix.rooms.events.retrieve',
    httpMethod: 'get',
    httpPath: '/_matrix/client/v3/rooms/{roomId}/event/{eventId}',
  },
  {
    clientCallName: 'client.matrix.bridges.auth.listFlows',
    fullyQualifiedName: 'matrix.bridges.auth.listFlows',
    httpMethod: 'get',
    httpPath: '/_matrix/client/unstable/com.beeper.bridge/{bridgeID}/_matrix/provision/v3/login/flows',
  },
  {
    clientCallName: 'client.matrix.bridges.auth.listLogins',
    fullyQualifiedName: 'matrix.bridges.auth.listLogins',
    httpMethod: 'get',
    httpPath: '/_matrix/client/unstable/com.beeper.bridge/{bridgeID}/_matrix/provision/v3/logins',
  },
  {
    clientCallName: 'client.matrix.bridges.auth.logout',
    fullyQualifiedName: 'matrix.bridges.auth.logout',
    httpMethod: 'post',
    httpPath: '/_matrix/client/unstable/com.beeper.bridge/{bridgeID}/_matrix/provision/v3/logout/{loginID}',
  },
  {
    clientCallName: 'client.matrix.bridges.auth.startLogin',
    fullyQualifiedName: 'matrix.bridges.auth.startLogin',
    httpMethod: 'post',
    httpPath:
      '/_matrix/client/unstable/com.beeper.bridge/{bridgeID}/_matrix/provision/v3/login/start/{flowID}',
  },
  {
    clientCallName: 'client.matrix.bridges.auth.submitCookies',
    fullyQualifiedName: 'matrix.bridges.auth.submitCookies',
    httpMethod: 'post',
    httpPath:
      '/_matrix/client/unstable/com.beeper.bridge/{bridgeID}/_matrix/provision/v3/login/step/{loginProcessID}/{stepID}/cookies',
  },
  {
    clientCallName: 'client.matrix.bridges.auth.submitUserInput',
    fullyQualifiedName: 'matrix.bridges.auth.submitUserInput',
    httpMethod: 'post',
    httpPath:
      '/_matrix/client/unstable/com.beeper.bridge/{bridgeID}/_matrix/provision/v3/login/step/{loginProcessID}/{stepID}/user_input',
  },
  {
    clientCallName: 'client.matrix.bridges.auth.waitForStep',
    fullyQualifiedName: 'matrix.bridges.auth.waitForStep',
    httpMethod: 'post',
    httpPath:
      '/_matrix/client/unstable/com.beeper.bridge/{bridgeID}/_matrix/provision/v3/login/step/{loginProcessID}/{stepID}/display_and_wait',
  },
  {
    clientCallName: 'client.matrix.bridges.auth.whoami',
    fullyQualifiedName: 'matrix.bridges.auth.whoami',
    httpMethod: 'get',
    httpPath: '/_matrix/client/unstable/com.beeper.bridge/{bridgeID}/_matrix/provision/v3/whoami',
  },
  {
    clientCallName: 'client.matrix.bridges.contacts.list',
    fullyQualifiedName: 'matrix.bridges.contacts.list',
    httpMethod: 'get',
    httpPath: '/_matrix/client/unstable/com.beeper.bridge/{bridgeID}/_matrix/provision/v3/contacts',
  },
  {
    clientCallName: 'client.matrix.bridges.users.resolve',
    fullyQualifiedName: 'matrix.bridges.users.resolve',
    httpMethod: 'get',
    httpPath:
      '/_matrix/client/unstable/com.beeper.bridge/{bridgeID}/_matrix/provision/v3/resolve_identifier/{identifier}',
  },
  {
    clientCallName: 'client.matrix.bridges.users.search',
    fullyQualifiedName: 'matrix.bridges.users.search',
    httpMethod: 'post',
    httpPath: '/_matrix/client/unstable/com.beeper.bridge/{bridgeID}/_matrix/provision/v3/search_users',
  },
  {
    clientCallName: 'client.matrix.bridges.rooms.createDm',
    fullyQualifiedName: 'matrix.bridges.rooms.createDm',
    httpMethod: 'post',
    httpPath:
      '/_matrix/client/unstable/com.beeper.bridge/{bridgeID}/_matrix/provision/v3/create_dm/{identifier}',
  },
  {
    clientCallName: 'client.matrix.bridges.rooms.createGroup',
    fullyQualifiedName: 'matrix.bridges.rooms.createGroup',
    httpMethod: 'post',
    httpPath:
      '/_matrix/client/unstable/com.beeper.bridge/{bridgeID}/_matrix/provision/v3/create_group/{groupType}',
  },
  {
    clientCallName: 'client.matrix.bridges.capabilities.retrieve',
    fullyQualifiedName: 'matrix.bridges.capabilities.retrieve',
    httpMethod: 'get',
    httpPath: '/_matrix/client/unstable/com.beeper.bridge/{bridgeID}/_matrix/provision/v3/capabilities',
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
