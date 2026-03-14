import { queryOptions } from "@tanstack/react-query";

import { createDesktopClient } from "../api/client";
import {
  deriveCapabilitiesFromInfo,
  mapChatToInboxItem,
  mapMessageToGiftedMessage,
  mapSearchResults,
} from "../mappers";
import { queryKeys } from "./keys";
import { profileStore } from "../storage/profiles";
import type { ConnectionProfile, ProbeSummary } from "../../types/profile";
import type { LabOperation } from "../../types/view-models";

type RecordValues = Record<string, unknown>;

export function probeQueryOptions(profile: ConnectionProfile) {
  return queryOptions({
    queryKey: queryKeys.probe(profile.id),
    queryFn: async (): Promise<ProbeSummary> => {
      const client = createDesktopClient(profile);
      const info = await client.info.retrieve();
      const probe: ProbeSummary = {
        checkedAt: new Date().toISOString(),
        status: info.server.status,
        appVersion: info.app.version,
        endpoints: {
          wsEvents: info.endpoints.ws_events,
          spec: info.endpoints.spec,
          mcp: info.endpoints.mcp,
        },
        info,
        capabilities: deriveCapabilitiesFromInfo(info),
        serverName: info.app.name,
        errorMessage: null,
      };
      await profileStore.updateProbe(profile.id, probe);
      return probe;
    },
  });
}

export function accountsQueryOptions(profile: ConnectionProfile) {
  return queryOptions({
    queryKey: queryKeys.accounts(profile.id),
    queryFn: async () => {
      const client = createDesktopClient(profile);
      return client.accounts.list();
    },
  });
}

export function chatsQueryOptions(
  profile: ConnectionProfile,
  filters: RecordValues = { limit: 75 },
) {
  return queryOptions({
    queryKey: queryKeys.chats(profile.id, filters),
    queryFn: async () => {
      const client = createDesktopClient(profile);
      const page = await client.chats.list(filters);
      return page.items.map((chat) => mapChatToInboxItem(chat));
    },
  });
}

export function messagesQueryOptions(
  profile: ConnectionProfile,
  chatID: string,
  pagingWindow: RecordValues = { limit: 40 },
) {
  return queryOptions({
    queryKey: queryKeys.messages(profile.id, chatID, pagingWindow),
    queryFn: async () => {
      const client = createDesktopClient(profile);
      const page = await client.messages.list(chatID, pagingWindow);
      return page.items
        .map((message) => mapMessageToGiftedMessage(message))
        .sort(
          (left, right) =>
            Number(right.createdAt) - Number(left.createdAt),
        );
    },
  });
}

export function chatsSearchQueryOptions(
  profile: ConnectionProfile,
  params: RecordValues,
) {
  return queryOptions({
    queryKey: queryKeys.chatsSearch(profile.id, params),
    queryFn: async () => {
      const client = createDesktopClient(profile);
      const page = await client.chats.search(params);
      return mapSearchResults(page.items, []);
    },
  });
}

export function messagesSearchQueryOptions(
  profile: ConnectionProfile,
  params: RecordValues,
) {
  return queryOptions({
    queryKey: queryKeys.messagesSearch(profile.id, params),
    queryFn: async () => {
      const client = createDesktopClient(profile);
      const page = await client.messages.search(params);
      return mapSearchResults([], page.items);
    },
  });
}

export function labQueryOptions(
  profile: ConnectionProfile,
  operation: LabOperation,
  params: RecordValues = {},
) {
  return queryOptions({
    queryKey: queryKeys.lab(profile.id, operation, params),
    queryFn: async () => {
      const client = createDesktopClient(profile);

      switch (operation) {
        case "info":
          return client.info.retrieve();
        case "accounts":
          return client.accounts.list();
        case "chats.list": {
          const page = await client.chats.list(params);
          return page.items;
        }
        case "chats.search": {
          const page = await client.chats.search(params);
          return page.items;
        }
        case "messages.search": {
          const page = await client.messages.search(params);
          return page.items;
        }
        case "focus":
          return client.focus(params);
      }
    },
  });
}
