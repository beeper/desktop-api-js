import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createDesktopClient } from "../api/client";
import { sessionTransportStore } from "../api/session";
import { queryKeys } from "./keys";
import { profileStore } from "../storage/profiles";
import type { ConnectionProfile } from "../../types/profile";

export function useSaveProfileMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      input: Partial<ConnectionProfile> & Pick<ConnectionProfile, "label" | "baseURL">,
    ) => profileStore.saveProfile(input),
    onSuccess: async (profile) => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.profilePrefix(profile.id),
        exact: false,
      });
    },
  });
}

export function useDeleteProfileMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profileID: string) => {
      await profileStore.deleteProfile(profileID);
      return profileID;
    },
    onSuccess: (profileID) => {
      sessionTransportStore.disconnect(profileID);
      queryClient.removeQueries({
        queryKey: queryKeys.profilePrefix(profileID),
      });
    },
  });
}

export function useSwitchActiveProfileMutation() {
  return useMutation({
    mutationFn: (profileID: string) => profileStore.setActiveProfile(profileID),
  });
}

interface SendMessageInput {
  text: string;
  replyToMessageID?: string;
}

export function useSendMessageMutation(
  profile: ConnectionProfile,
  chatID: string,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: SendMessageInput) => {
      const client = createDesktopClient(profile);
      return client.messages.send(chatID, input);
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeys.profilePrefix(profile.id),
          exact: false,
          predicate: (query) => Array.isArray(query.queryKey) && query.queryKey[2] === "chats",
        }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.profilePrefix(profile.id),
          exact: false,
          predicate: (query) =>
            Array.isArray(query.queryKey) &&
            query.queryKey[2] === "messages" &&
            query.queryKey[3] === chatID,
        }),
      ]);
    },
  });
}
