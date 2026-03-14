import { Text, View } from "react-native";

import { StatusChip } from "@/components/status-chip";
import type { ConnectionProfile, TransportMode } from "@/types/profile";

export function ActiveProfileBanner({
  profile,
  transportMode,
}: {
  profile: ConnectionProfile;
  transportMode: TransportMode;
}) {
  return (
    <View
      style={{
        padding: 16,
        borderRadius: 22,
        backgroundColor: "#f3fbf7",
        borderWidth: 1,
        borderColor: "#d9efe4",
        gap: 8,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <View style={{ flex: 1, gap: 4 }}>
          <Text selectable style={{ color: "#123227", fontSize: 18, fontWeight: "700" }}>
            {profile.label}
          </Text>
          <Text selectable style={{ color: "#416057", fontSize: 14 }}>
            {profile.baseURL || "Missing base URL"}
          </Text>
        </View>
        <StatusChip
          tone={transportMode === "realtime" ? "good" : transportMode === "polling" ? "warn" : "neutral"}
          value={transportMode}
        />
      </View>
      <Text selectable style={{ color: "#567168", fontSize: 13, lineHeight: 18 }}>
        {profile.kind} target · {profile.accessToken ? "token saved" : "token missing"}
      </Text>
    </View>
  );
}

