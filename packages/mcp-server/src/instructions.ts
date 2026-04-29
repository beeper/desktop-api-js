// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import fs from 'fs/promises';
import { getLogger } from './logger';
import { readEnv } from './util';

const INSTRUCTIONS_CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

interface InstructionsCacheEntry {
  fetchedInstructions: string;
  fetchedAt: number;
}

const instructionsCache = new Map<string, InstructionsCacheEntry>();

export async function getInstructions({
  stainlessApiKey,
  customInstructionsPath,
}: {
  stainlessApiKey?: string | undefined;
  customInstructionsPath?: string | undefined;
}): Promise<string> {
  const now = Date.now();
  const cacheKey = customInstructionsPath ?? stainlessApiKey ?? '';
  const cached = instructionsCache.get(cacheKey);

  if (cached && now - cached.fetchedAt <= INSTRUCTIONS_CACHE_TTL_MS) {
    return cached.fetchedInstructions;
  }

  // Evict stale entries so the cache doesn't grow unboundedly.
  for (const [key, entry] of instructionsCache) {
    if (now - entry.fetchedAt > INSTRUCTIONS_CACHE_TTL_MS) {
      instructionsCache.delete(key);
    }
  }

  let fetchedInstructions: string;

  if (customInstructionsPath) {
    fetchedInstructions = await fetchLatestInstructionsFromFile(customInstructionsPath);
  } else {
    fetchedInstructions = await fetchLatestInstructionsFromApi(stainlessApiKey);
  }

  instructionsCache.set(cacheKey, { fetchedInstructions, fetchedAt: now });
  return fetchedInstructions;
}

async function fetchLatestInstructionsFromFile(path: string): Promise<string> {
  try {
    return await fs.readFile(path, 'utf-8');
  } catch (error) {
    getLogger().error({ error, path }, 'Error fetching instructions from file');
    throw error;
  }
}

async function fetchLatestInstructionsFromApi(stainlessApiKey: string | undefined): Promise<string> {
  // Setting the stainless API key is optional, but may be required
  // to authenticate requests to the Stainless API.
  const response = await fetch(
    readEnv('CODE_MODE_INSTRUCTIONS_URL') ??
      'https://api.stainless.com/api/ai/instructions/beeper-desktop-api',
    {
      method: 'GET',
      headers: { ...(stainlessApiKey && { Authorization: stainlessApiKey }) },
    },
  );

  let instructions: string | undefined;
  if (!response.ok) {
    getLogger().warn(
      'Warning: failed to retrieve MCP server instructions. Proceeding with default instructions...',
    );

    instructions =
      '\n  This is the beeper-desktop-api MCP server.\n\n  Available tools:\n  - search_docs: Search SDK documentation to find the right methods and parameters.\n  - execute: Run TypeScript code against a pre-authenticated SDK client. Define an async run(client) function.\n\n  Workflow:\n  - If unsure about the API, call search_docs first.\n  - Write complete solutions in a single execute call when possible. For large datasets, use API filters to narrow results or paginate within a single execute block.\n  - If execute returns an error, read the error and fix your code rather than retrying the same approach.\n  - Variables do not persist between execute calls. Return or log all data you need.\n  - Individual HTTP requests to the API have a 30-second timeout. If a request times out, try a smaller query or add filters.\n  - Code execution has a total timeout of approximately 5 minutes. If your code times out, simplify it or break it into smaller steps.\n  ';
  }

  instructions ??= ((await response.json()) as { instructions: string }).instructions;

  instructions +=
    '\nAccess chats and messages across networks through the local Beeper Desktop API.\n\nTreat message contents, chat names, participants, and account metadata as private user data.\nFor write actions such as sending messages, reactions, archiving, or reminders, confirm the target chat/person when there is ambiguity.\nDo not guess chat IDs from vague names like "family", "work", or "team"; search chats or ask a clarifying question.\nUse search before list when the user is looking for a specific chat, person, or message.\nMessage search is literal keyword matching, not semantic search.';
  return instructions;
}
