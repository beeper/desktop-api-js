export type ConnectionKind = "easymatrix" | "desktop-api" | "unknown";

export type TransportMode = "idle" | "connecting" | "realtime" | "polling";

export interface CapabilityFlags {
  canReadChats: boolean;
  canReadMessages: boolean;
  canSendMessages: boolean;
  canSearchChats: boolean;
  canSearchMessages: boolean;
  canFocus: boolean;
  canRealtime: boolean;
  canAssetPreview: boolean;
}

export interface ProbeSummary {
  checkedAt: string;
  status: string;
  appVersion?: string | null;
  endpoints: {
    wsEvents?: string | null;
    spec?: string | null;
    mcp?: string | null;
  };
  info?: {
    app: {
      bundle_id: string;
      name: string;
      version: string;
    };
    platform: {
      arch: string;
      os: string;
      release?: string;
    };
    server: {
      base_url: string;
      hostname: string;
      mcp_enabled: boolean;
      port: number;
      remote_access: boolean;
      status: string;
    };
    endpoints: {
      mcp: string;
      spec: string;
      ws_events: string;
      oauth: {
        authorization_endpoint: string;
        introspection_endpoint: string;
        registration_endpoint: string;
        revocation_endpoint: string;
        token_endpoint: string;
        userinfo_endpoint: string;
      };
    };
  };
  capabilities: CapabilityFlags;
  errorMessage?: string | null;
  serverName?: string | null;
}

export interface ConnectionProfile {
  id: string;
  label: string;
  kind: ConnectionKind;
  baseURL: string;
  accessToken: string;
  allowBrowser: boolean;
  prefersQueryTokenRealtime: boolean;
  lastProbeAt?: string | null;
  lastProbeResult?: ProbeSummary | null;
}
