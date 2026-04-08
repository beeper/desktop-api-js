import { QueryClient } from "@tanstack/react-query";

import { queryKeys } from "../query/keys";
import type { ConnectionProfile, TransportMode } from "../../types/profile";

type Listener = () => void;

interface SessionSnapshot {
  mode: TransportMode;
  chatIDs: string[];
  lastError: string | null;
  connectedAt: string | null;
}

interface ManagedConnection {
  profile: ConnectionProfile;
  socket: WebSocket | null;
  attachments: Map<string, string[]>;
  listeners: Set<Listener>;
  snapshot: SessionSnapshot;
  queryClient: QueryClient | null;
  reconnectToken: string;
  manualClose: boolean;
}

const connections = new Map<string, ManagedConnection>();

function defaultSnapshot(): SessionSnapshot {
  return {
    mode: "idle",
    chatIDs: [],
    lastError: null,
    connectedAt: null,
  };
}

function normalizeChatIDs(chatIDs?: string[]): string[] {
  const next = chatIDs?.map((chatID) => chatID.trim()).filter(Boolean) ?? ["*"];
  if (next.includes("*")) {
    return ["*"];
  }
  return Array.from(new Set(next));
}

function emit(connection: ManagedConnection): void {
  for (const listener of connection.listeners) {
    listener();
  }
}

function getConnection(profileID: string): ManagedConnection {
  let connection = connections.get(profileID);
  if (!connection) {
    connection = {
      profile: {
        id: profileID,
        label: "",
        kind: "unknown",
        baseURL: "",
        accessToken: "",
        allowBrowser: false,
        prefersQueryTokenRealtime: false,
      },
      socket: null,
      attachments: new Map(),
      listeners: new Set(),
      snapshot: defaultSnapshot(),
      queryClient: null,
      reconnectToken: "",
      manualClose: false,
    };
    connections.set(profileID, connection);
  }
  return connection;
}

function setSnapshot(
  connection: ManagedConnection,
  updates: Partial<SessionSnapshot>,
): void {
  connection.snapshot = {
    ...connection.snapshot,
    ...updates,
  };
  emit(connection);
}

function buildWebSocketURL(profile: ConnectionProfile): string {
  const normalizedBaseURL = profile.baseURL.trim().replace(/\/+$/, "");
  const url = new URL(`${normalizedBaseURL}/v1/ws`);

  if (profile.prefersQueryTokenRealtime && profile.accessToken.trim()) {
    url.searchParams.set("dangerouslyUseTokenInQuery", profile.accessToken.trim());
  }

  if (url.protocol === "https:") {
    url.protocol = "wss:";
  } else if (url.protocol === "http:") {
    url.protocol = "ws:";
  }

  return url.toString();
}

function unionChatIDs(connection: ManagedConnection): string[] {
  const flattened = Array.from(connection.attachments.values()).flat();
  return normalizeChatIDs(flattened.length > 0 ? flattened : ["*"]);
}

function invalidateRealtimePayload(
  profileID: string,
  queryClient: QueryClient,
  payload: unknown,
): void {
  if (!payload || typeof payload !== "object") {
    return;
  }

  const typedPayload = payload as {
    type?: string;
    chatID?: string;
  };

  if (typedPayload.type === "chat.upserted") {
    void queryClient.invalidateQueries({
      queryKey: queryKeys.profilePrefix(profileID),
      exact: false,
      predicate: (query) => {
        const key = query.queryKey;
        return Array.isArray(key) && key[2] === "chats";
      },
    });
    return;
  }

  if (
    typedPayload.type === "message.upserted" ||
    typedPayload.type === "message.deleted"
  ) {
    void queryClient.invalidateQueries({
      queryKey: queryKeys.profilePrefix(profileID),
      exact: false,
      predicate: (query) => {
        const key = query.queryKey;
        if (!Array.isArray(key)) {
          return false;
        }
        return key[2] === "chats" || (key[2] === "messages" && key[3] === typedPayload.chatID);
      },
    });
  }
}

function sendSubscriptions(connection: ManagedConnection): void {
  if (!connection.socket || connection.socket.readyState !== WebSocket.OPEN) {
    return;
  }
  const chatIDs = unionChatIDs(connection);
  connection.socket.send(
    JSON.stringify({
      type: "subscriptions.set",
      chatIDs,
    }),
  );
}

function closeSocket(connection: ManagedConnection): void {
  if (!connection.socket) {
    return;
  }
  connection.manualClose = true;
  connection.socket.close();
  connection.socket = null;
}

function canUseRealtime(profile: ConnectionProfile): { ok: boolean; reason?: string } {
  if (!profile.accessToken.trim()) {
    return { ok: false, reason: "Realtime requires an access token." };
  }
  if (process.env.EXPO_OS === "web" && !profile.prefersQueryTokenRealtime) {
    return {
      ok: false,
      reason: "Web realtime requires query-token auth to be enabled for this profile.",
    };
  }
  return { ok: true };
}

function openSocket(connection: ManagedConnection): void {
  const realtimeStatus = canUseRealtime(connection.profile);
  if (!realtimeStatus.ok) {
    closeSocket(connection);
    setSnapshot(connection, {
      mode: "polling",
      chatIDs: unionChatIDs(connection),
      lastError: realtimeStatus.reason ?? null,
      connectedAt: null,
    });
    return;
  }

  const url = buildWebSocketURL(connection.profile);
  const reconnectToken = [
    connection.profile.baseURL,
    connection.profile.accessToken,
    connection.profile.prefersQueryTokenRealtime ? "query" : "header",
  ].join("|");

  if (
    connection.socket &&
    connection.socket.readyState !== WebSocket.CLOSED &&
    connection.reconnectToken === reconnectToken
  ) {
    sendSubscriptions(connection);
    return;
  }

  closeSocket(connection);

  setSnapshot(connection, {
    mode: "connecting",
    chatIDs: unionChatIDs(connection),
    lastError: null,
    connectedAt: null,
  });

  const SocketCtor = WebSocket as unknown as {
    new (
      url: string,
      protocols?: string | string[],
      options?: { headers?: Record<string, string> },
    ): WebSocket;
  };

  const socket =
    process.env.EXPO_OS === "web" || connection.profile.prefersQueryTokenRealtime
      ? new WebSocket(url)
      : new SocketCtor(url, undefined, {
          headers: {
            Authorization: `Bearer ${connection.profile.accessToken.trim()}`,
          },
        });

  connection.manualClose = false;
  connection.socket = socket;
  connection.reconnectToken = reconnectToken;

  socket.onopen = () => {
    sendSubscriptions(connection);
    setSnapshot(connection, {
      mode: "realtime",
      chatIDs: unionChatIDs(connection),
      lastError: null,
      connectedAt: new Date().toISOString(),
    });
  };

  socket.onmessage = (event) => {
    try {
      const payload = JSON.parse(String(event.data)) as {
        type?: string;
        chatIDs?: string[];
      };
      if (payload.type === "subscriptions.updated") {
        setSnapshot(connection, {
          chatIDs: normalizeChatIDs(payload.chatIDs),
        });
        return;
      }
      if (connection.queryClient) {
        invalidateRealtimePayload(connection.profile.id, connection.queryClient, payload);
      }
    } catch (error) {
      setSnapshot(connection, {
        lastError: error instanceof Error ? error.message : String(error),
      });
    }
  };

  socket.onerror = () => {
    setSnapshot(connection, {
      lastError: "Realtime connection failed.",
    });
  };

  socket.onclose = () => {
    connection.socket = null;
    if (connection.manualClose) {
      setSnapshot(connection, {
        mode: connection.attachments.size > 0 ? "polling" : "idle",
        connectedAt: null,
      });
      connection.manualClose = false;
      return;
    }
    setSnapshot(connection, {
      mode: "polling",
      connectedAt: null,
    });
  };
}

export const sessionTransportStore = {
  subscribe(profileID: string | null, listener: Listener): () => void {
    if (!profileID) {
      return () => undefined;
    }
    const connection = getConnection(profileID);
    connection.listeners.add(listener);
    return () => {
      connection.listeners.delete(listener);
    };
  },

  getSnapshot(profileID: string | null): SessionSnapshot {
    if (!profileID) {
      return defaultSnapshot();
    }
    return getConnection(profileID).snapshot;
  },

  disconnect(profileID: string): void {
    const connection = connections.get(profileID);
    if (!connection) {
      return;
    }
    connection.attachments.clear();
    closeSocket(connection);
    connection.snapshot = defaultSnapshot();
    emit(connection);
  },
};

export function ensureProfileRealtime(
  profile: ConnectionProfile,
  queryClient: QueryClient,
  chatIDs?: string[],
): () => void {
  const connection = getConnection(profile.id);
  const attachmentID = `${profile.id}:${Math.random().toString(36).slice(2, 10)}`;

  connection.profile = profile;
  connection.queryClient = queryClient;
  connection.attachments.set(attachmentID, normalizeChatIDs(chatIDs));

  openSocket(connection);

  return () => {
    const current = connections.get(profile.id);
    if (!current) {
      return;
    }
    current.attachments.delete(attachmentID);
    if (current.attachments.size === 0) {
      sessionTransportStore.disconnect(profile.id);
      return;
    }
    sendSubscriptions(current);
    setSnapshot(current, {
      chatIDs: unionChatIDs(current),
    });
  };
}
