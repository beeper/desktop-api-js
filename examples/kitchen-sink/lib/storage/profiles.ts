import "expo-sqlite/localStorage/install";

import * as SecureStore from "expo-secure-store";

import type { ConnectionProfile, ProbeSummary } from "../../types/profile";

const PROFILES_KEY = "easymatrix-sdk-lab:profiles:v1";
const ACTIVE_PROFILE_KEY = "easymatrix-sdk-lab:active-profile:v1";
const TOKEN_KEY_PREFIX = "easymatrix-sdk-lab:token:";

type StoredProfile = Omit<ConnectionProfile, "accessToken">;

interface ProfileStoreSnapshot {
  ready: boolean;
  profiles: ConnectionProfile[];
  activeProfileId: string | null;
}

type Listener = () => void;

const listeners = new Set<Listener>();

let snapshot: ProfileStoreSnapshot = {
  ready: false,
  profiles: [],
  activeProfileId: null,
};

let initializePromise: Promise<ProfileStoreSnapshot> | null = null;

function isWeb(): boolean {
  return process.env.EXPO_OS === "web";
}

function emit(): void {
  for (const listener of listeners) {
    listener();
  }
}

function tokenStorageKey(profileID: string): string {
  return `${TOKEN_KEY_PREFIX}${profileID}`;
}

function makeProfileID(): string {
  return `profile_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function normalizeBaseURL(baseURL: string): string {
  return baseURL.trim().replace(/\/+$/, "");
}

function makeDefaultProfiles(): ConnectionProfile[] {
  return [
    {
      id: "easymatrix-local",
      label: "EasyMatrix Local",
      kind: "easymatrix",
      baseURL: "http://127.0.0.1:23373",
      accessToken: "",
      allowBrowser: isWeb(),
      prefersQueryTokenRealtime: isWeb(),
      lastProbeAt: null,
      lastProbeResult: null,
    },
    {
      id: "desktop-api-custom",
      label: "Custom Desktop API",
      kind: "desktop-api",
      baseURL: "",
      accessToken: "",
      allowBrowser: isWeb(),
      prefersQueryTokenRealtime: false,
      lastProbeAt: null,
      lastProbeResult: null,
    },
  ];
}

function parseStoredProfiles(raw: string | null): StoredProfile[] | null {
  if (!raw) {
    return null;
  }
  try {
    const parsed = JSON.parse(raw) as StoredProfile[];
    if (!Array.isArray(parsed)) {
      return null;
    }
    return parsed.filter((item) => item && typeof item.id === "string");
  } catch {
    return null;
  }
}

async function getStoredToken(profileID: string): Promise<string> {
  const key = tokenStorageKey(profileID);
  if (isWeb()) {
    return localStorage.getItem(key) ?? "";
  }
  return (await SecureStore.getItemAsync(key)) ?? "";
}

async function setStoredToken(profileID: string, token: string): Promise<void> {
  const key = tokenStorageKey(profileID);
  if (isWeb()) {
    if (token) {
      localStorage.setItem(key, token);
    } else {
      localStorage.removeItem(key);
    }
    return;
  }
  if (token) {
    await SecureStore.setItemAsync(key, token);
  } else {
    await SecureStore.deleteItemAsync(key);
  }
}

async function deleteStoredToken(profileID: string): Promise<void> {
  await setStoredToken(profileID, "");
}

async function hydrateProfiles(storedProfiles: StoredProfile[]): Promise<ConnectionProfile[]> {
  return Promise.all(
    storedProfiles.map(async (profile) => ({
      ...profile,
      accessToken: await getStoredToken(profile.id),
    })),
  );
}

async function persistProfiles(
  profiles: ConnectionProfile[],
  activeProfileId: string | null,
): Promise<void> {
  const previousStored = parseStoredProfiles(localStorage.getItem(PROFILES_KEY)) ?? [];
  const storedProfiles: StoredProfile[] = profiles.map(({ accessToken, ...profile }) => profile);
  localStorage.setItem(PROFILES_KEY, JSON.stringify(storedProfiles));

  if (activeProfileId) {
    localStorage.setItem(ACTIVE_PROFILE_KEY, activeProfileId);
  } else {
    localStorage.removeItem(ACTIVE_PROFILE_KEY);
  }

  const currentStored = new Set(storedProfiles.map((profile) => profile.id));
  const previousIDs = new Set(previousStored.map((profile) => profile.id));

  await Promise.all(
    profiles.map((profile) => setStoredToken(profile.id, profile.accessToken.trim())),
  );

  await Promise.all(
    Array.from(previousIDs)
      .filter((profileID) => !currentStored.has(profileID))
      .map((profileID) => deleteStoredToken(profileID)),
  );
}

async function commit(nextSnapshot: ProfileStoreSnapshot): Promise<ProfileStoreSnapshot> {
  await persistProfiles(nextSnapshot.profiles, nextSnapshot.activeProfileId);
  snapshot = nextSnapshot;
  emit();
  return snapshot;
}

async function loadInitialSnapshot(): Promise<ProfileStoreSnapshot> {
  const storedProfiles = parseStoredProfiles(localStorage.getItem(PROFILES_KEY));
  const profiles = storedProfiles
    ? await hydrateProfiles(storedProfiles)
    : makeDefaultProfiles();
  const activeProfileID =
    localStorage.getItem(ACTIVE_PROFILE_KEY) ??
    profiles[0]?.id ??
    null;

  const nextSnapshot: ProfileStoreSnapshot = {
    ready: true,
    profiles,
    activeProfileId: profiles.some((profile) => profile.id === activeProfileID)
      ? activeProfileID
      : (profiles[0]?.id ?? null),
  };

  await persistProfiles(nextSnapshot.profiles, nextSnapshot.activeProfileId);
  snapshot = nextSnapshot;
  emit();
  return snapshot;
}

export const profileStore = {
  subscribe(listener: Listener): () => void {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },

  getSnapshot(): ProfileStoreSnapshot {
    return snapshot;
  },

  async initialize(): Promise<ProfileStoreSnapshot> {
    if (snapshot.ready) {
      return snapshot;
    }
    if (!initializePromise) {
      initializePromise = loadInitialSnapshot().finally(() => {
        initializePromise = null;
      });
    }
    return initializePromise;
  },

  async saveProfile(
    input: Partial<ConnectionProfile> & Pick<ConnectionProfile, "label" | "baseURL">,
  ): Promise<ConnectionProfile> {
    await this.initialize();

    const profiles = [...snapshot.profiles];
    const existingIndex = input.id
      ? profiles.findIndex((profile) => profile.id === input.id)
      : -1;
    const existingProfile = existingIndex >= 0 ? profiles[existingIndex] : null;

    const nextProfile: ConnectionProfile = {
      id: existingProfile?.id ?? input.id ?? makeProfileID(),
      label: input.label.trim(),
      kind: input.kind ?? existingProfile?.kind ?? "unknown",
      baseURL: normalizeBaseURL(input.baseURL),
      accessToken: input.accessToken ?? existingProfile?.accessToken ?? "",
      allowBrowser: input.allowBrowser ?? existingProfile?.allowBrowser ?? isWeb(),
      prefersQueryTokenRealtime:
        input.prefersQueryTokenRealtime ??
        existingProfile?.prefersQueryTokenRealtime ??
        false,
      lastProbeAt: input.lastProbeAt ?? existingProfile?.lastProbeAt ?? null,
      lastProbeResult: input.lastProbeResult ?? existingProfile?.lastProbeResult ?? null,
    };

    if (existingIndex >= 0) {
      profiles[existingIndex] = nextProfile;
    } else {
      profiles.push(nextProfile);
    }

    await commit({
      ready: true,
      profiles,
      activeProfileId: snapshot.activeProfileId ?? nextProfile.id,
    });

    return nextProfile;
  },

  async deleteProfile(profileID: string): Promise<void> {
    await this.initialize();

    const profiles = snapshot.profiles.filter((profile) => profile.id !== profileID);
    await deleteStoredToken(profileID);

    await commit({
      ready: true,
      profiles,
      activeProfileId:
        snapshot.activeProfileId === profileID
          ? (profiles[0]?.id ?? null)
          : snapshot.activeProfileId,
    });
  },

  async setActiveProfile(profileID: string): Promise<void> {
    await this.initialize();
    if (!snapshot.profiles.some((profile) => profile.id === profileID)) {
      return;
    }
    await commit({
      ...snapshot,
      ready: true,
      activeProfileId: profileID,
    });
  },

  async updateProbe(profileID: string, probe: ProbeSummary): Promise<void> {
    await this.initialize();

    const profiles = snapshot.profiles.map((profile) =>
      profile.id === profileID
        ? {
            ...profile,
            lastProbeAt: probe.checkedAt,
            lastProbeResult: probe,
          }
        : profile,
    );

    await commit({
      ...snapshot,
      ready: true,
      profiles,
    });
  },
};
