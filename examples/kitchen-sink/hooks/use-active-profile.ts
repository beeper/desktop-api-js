import { useEffect, useSyncExternalStore } from "react";

import { profileStore } from "../lib/storage/profiles";

export function useProfileStoreSnapshot() {
  const snapshot = useSyncExternalStore(
    profileStore.subscribe,
    profileStore.getSnapshot,
    profileStore.getSnapshot,
  );

  useEffect(() => {
    void profileStore.initialize();
  }, []);

  return snapshot;
}

export function useActiveProfile() {
  const snapshot = useProfileStoreSnapshot();
  const activeProfile =
    snapshot.profiles.find((profile) => profile.id === snapshot.activeProfileId) ?? null;

  return {
    ...snapshot,
    activeProfile,
  };
}
