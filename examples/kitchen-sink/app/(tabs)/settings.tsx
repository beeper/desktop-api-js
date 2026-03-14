import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Pressable, Text, View } from "react-native";

import { EmptyState } from "@/components/empty-state";
import { ProfileEditor } from "@/components/profile-editor";
import { ScreenShell } from "@/components/screen-shell";
import { SectionCard } from "@/components/section-card";
import { StatusChip } from "@/components/status-chip";
import { useActiveProfile, useProfileStoreSnapshot } from "@/hooks/use-active-profile";
import { probeQueryOptions } from "@/lib/query/queries";
import {
  useDeleteProfileMutation,
  useSaveProfileMutation,
  useSwitchActiveProfileMutation,
} from "@/lib/query/mutations";

export default function SettingsScreen() {
  const { activeProfile } = useActiveProfile();
  const { profiles } = useProfileStoreSnapshot();
  const saveProfile = useSaveProfileMutation();
  const deleteProfile = useDeleteProfileMutation();
  const switchProfile = useSwitchActiveProfileMutation();
  const [editingID, setEditingID] = useState<string | null>(null);

  const probeQuery = useQuery(
    activeProfile
      ? {
          ...probeQueryOptions(activeProfile),
          enabled: false,
        }
      : {
          queryKey: ["profile", "none", "probe"],
          queryFn: async () => {
            throw new Error("No active profile.");
          },
          enabled: false,
        },
  );

  const editingProfile = profiles.find((profile) => profile.id === editingID) ?? null;

  return (
    <ScreenShell
      eyebrow="Settings"
      title="Profiles, tokens, and probes"
      description="Everything here is local-device state. The app never rebuilds `/manage`; it only configures SDK targets."
    >
      {activeProfile ? (
        <SectionCard
          title="Active profile"
          description={activeProfile.baseURL || "Missing base URL"}
          aside={
            <StatusChip
              tone={activeProfile.lastProbeResult?.status === "ready" ? "good" : activeProfile.lastProbeResult ? "warn" : "neutral"}
              value={activeProfile.lastProbeResult?.status ?? "unprobed"}
            />
          }
        >
          <Text selectable style={{ color: "#6a5748", fontSize: 14 }}>
            {activeProfile.kind} · {activeProfile.accessToken ? "token saved" : "token missing"}
          </Text>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Pressable
              onPress={() => void probeQuery.refetch()}
              style={{
                flex: 1,
                alignItems: "center",
                paddingVertical: 14,
                borderRadius: 16,
                backgroundColor: "#13212f",
              }}
            >
              <Text selectable style={{ color: "#fff7ed", fontWeight: "700" }}>
                Probe `/v1/info`
              </Text>
            </Pressable>
          </View>
          {probeQuery.isError ? (
            <EmptyState
              title="Probe failed"
              description={probeQuery.error instanceof Error ? probeQuery.error.message : "Unknown probe error"}
            />
          ) : null}
          {activeProfile.lastProbeResult ? (
            <View style={{ gap: 6 }}>
              <Text selectable style={{ color: "#24160d", fontWeight: "700" }}>
                {activeProfile.lastProbeResult.serverName} {activeProfile.lastProbeResult.info?.app.version}
              </Text>
              <Text selectable style={{ color: "#6b5a4a" }}>
                Status: {activeProfile.lastProbeResult.status} · WS: {activeProfile.lastProbeResult.endpoints.wsEvents || "n/a"}
              </Text>
            </View>
          ) : null}
        </SectionCard>
      ) : (
        <EmptyState title="No active profile" description="Create one below and save a token to start querying the API." />
      )}

      <ProfileEditor
        initialProfile={editingProfile}
        onCancel={editingProfile ? () => setEditingID(null) : undefined}
        onSave={(profile) => {
          saveProfile.mutate(profile, {
            onSuccess(saved) {
              setEditingID(null);
              if (!activeProfile) {
                switchProfile.mutate(saved.id);
              }
            },
          });
        }}
      />

      <SectionCard title="Saved profiles" description="Switch targets here to compare EasyMatrix and real Desktop API behavior.">
        {profiles.map((profile) => (
          <View
            key={profile.id}
            style={{
              padding: 14,
              borderRadius: 18,
              backgroundColor: profile.id === activeProfile?.id ? "#13212f" : "#fff",
              borderWidth: 1,
              borderColor: profile.id === activeProfile?.id ? "#13212f" : "#dfd1bc",
              gap: 10,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
              <View style={{ flex: 1, gap: 4 }}>
                <Text selectable style={{ color: profile.id === activeProfile?.id ? "#fff7ed" : "#24160d", fontWeight: "700", fontSize: 16 }}>
                  {profile.label}
                </Text>
                <Text selectable style={{ color: profile.id === activeProfile?.id ? "#b4c7d9" : "#6d5b4c", fontSize: 13 }}>
                  {profile.baseURL || "Missing URL"} · {profile.kind}
                </Text>
              </View>
              <StatusChip
                tone={profile.id === activeProfile?.id ? "good" : "neutral"}
                value={profile.id === activeProfile?.id ? "active" : "saved"}
              />
            </View>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Pressable
                onPress={() => switchProfile.mutate(profile.id)}
                style={{
                  flex: 1,
                  alignItems: "center",
                  paddingVertical: 12,
                  borderRadius: 14,
                  backgroundColor: "#f0e6d9",
                }}
              >
                <Text selectable style={{ color: "#4e3927", fontWeight: "700" }}>
                  Make Active
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setEditingID(profile.id)}
                style={{
                  flex: 1,
                  alignItems: "center",
                  paddingVertical: 12,
                  borderRadius: 14,
                  backgroundColor: "#e1eef5",
                }}
              >
                <Text selectable style={{ color: "#274d61", fontWeight: "700" }}>
                  Edit
                </Text>
              </Pressable>
              <Pressable
                onPress={() => deleteProfile.mutate(profile.id)}
                style={{
                  flex: 1,
                  alignItems: "center",
                  paddingVertical: 12,
                  borderRadius: 14,
                  backgroundColor: "#ffe4df",
                }}
              >
                <Text selectable style={{ color: "#7f2f22", fontWeight: "700" }}>
                  Delete
                </Text>
              </Pressable>
            </View>
          </View>
        ))}
      </SectionCard>
    </ScreenShell>
  );
}
