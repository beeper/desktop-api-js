import { useEffect, useMemo, useSyncExternalStore } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { ensureProfileRealtime, sessionTransportStore } from "../lib/api/session";
import type { ConnectionProfile } from "../types/profile";

export function useRealtimeTransport(
  profile: ConnectionProfile | null,
  chatIDs?: string[],
) {
  const queryClient = useQueryClient();
  const normalizedChatIDs = useMemo(() => {
    const values = chatIDs?.map((chatID) => chatID.trim()).filter(Boolean) ?? ["*"];
    return values.includes("*") ? ["*"] : Array.from(new Set(values));
  }, [chatIDs]);
  const profileID = profile?.id ?? null;

  const snapshot = useSyncExternalStore(
    (listener) => sessionTransportStore.subscribe(profileID, listener),
    () => sessionTransportStore.getSnapshot(profileID),
    () => sessionTransportStore.getSnapshot(profileID),
  );

  useEffect(() => {
    if (!profile) {
      return;
    }
    return ensureProfileRealtime(profile, queryClient, normalizedChatIDs);
  }, [
    normalizedChatIDs,
    profile,
    queryClient,
  ]);

  return snapshot;
}
