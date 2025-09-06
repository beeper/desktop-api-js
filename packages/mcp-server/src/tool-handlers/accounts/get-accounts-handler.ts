import { CustomHandlerFunction, asFormattedMCPContentResult } from '../types';

const CONTACT_SUPPORT =
  'Something unexpected happened. User might need to contact support at mailto:help@beeper.com?subject=Something%20wrong%20in%20the%20Beeper%20Desktop%20API';

export const getAccountsHandler: CustomHandlerFunction = async (client, args) => {
  const output = await client.accounts.list();

  if (!output || output.length === 0) {
    return asFormattedMCPContentResult(`No accounts found. ${CONTACT_SUPPORT}`);
  }

  const lines: string[] = [];
  lines.push('# Accounts');
  for (const acc of output) {
    if (!acc.user) {
      lines.push(`\n## ${acc.network}`);
      lines.push(`**Account ID**: \`${acc.accountID}\``);
      lines.push('**User**: Unknown');
      continue;
    }

    const name = acc.user.fullName || acc.user.username || acc.user.id;
    lines.push(`\n## ${acc.network}`);
    lines.push(`**Account ID**: \`${acc.accountID}\``);
    lines.push(`**User**: ${name}`);
    if (acc.user.email) lines.push(`**Email**: ${acc.user.email}`);
    if (acc.user.phoneNumber) lines.push(`**Phone**: ${acc.user.phoneNumber}`);
  }
  lines.push('\n# Using this information\n');
  lines.push('- Pass accountIDs to narrow chat/message queries when known.');

  return asFormattedMCPContentResult(lines.join('\n'));
};
