import type { HandlerFunction } from '../tools/types';
import { asMarkdownContentResult } from './utils';

export const handler: HandlerFunction = async (client) => {
  const accounts = await client.accounts.list();
  if (!accounts || accounts.length === 0)
    throw new Error('No accounts found. This should never happen, please contact help@beeper.com.');
  const lines: string[] = [];
  lines.push('# Accounts');
  for (const acc of accounts) {
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
  return asMarkdownContentResult(lines);
};
