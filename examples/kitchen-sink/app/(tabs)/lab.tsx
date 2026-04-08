import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Pressable, Text, TextInput, View } from "react-native";

import { ActiveProfileBanner } from "@/components/active-profile-banner";
import { EmptyState } from "@/components/empty-state";
import { JSONPanel } from "@/components/json-panel";
import { ScreenShell } from "@/components/screen-shell";
import { SectionCard } from "@/components/section-card";
import { useActiveProfile } from "@/hooks/use-active-profile";
import { useProfileStoreSnapshot } from "@/hooks/use-active-profile";
import { useRealtimeTransport } from "@/hooks/use-realtime-transport";
import { labQueryOptions } from "@/lib/query/queries";
import type { LabOperation } from "@/types/view-models";

const operations: LabOperation[] = [
  "info",
  "accounts",
  "chats.list",
  "chats.search",
  "messages.search",
  "focus",
];

function parseParams(raw: string): Record<string, unknown> {
  if (!raw.trim()) {
    return {};
  }
  return JSON.parse(raw) as Record<string, unknown>;
}

export default function LabScreen() {
  const { activeProfile } = useActiveProfile();
  const { profiles } = useProfileStoreSnapshot();
  const transport = useRealtimeTransport(activeProfile, ["*"]);
  const [operation, setOperation] = useState<LabOperation>("info");
  const [paramsText, setParamsText] = useState("{\n  \"query\": \"matrix\"\n}");
  const [runNonce, setRunNonce] = useState(0);
  const [compareProfileID, setCompareProfileID] = useState<string>("");

  const params = useMemo(() => {
    try {
      return parseParams(paramsText);
    } catch {
      return {};
    }
  }, [paramsText]);

  const activeQuery = useQuery(
    activeProfile
      ? {
          ...labQueryOptions(activeProfile, operation, params),
          enabled: runNonce > 0,
        }
      : {
          queryKey: ["profile", "none", "lab", operation, params],
          queryFn: async () => {
            throw new Error("No active profile.");
          },
          enabled: false,
        },
  );

  const compareProfile = profiles.find((profile) => profile.id === compareProfileID) ?? null;
  const compareQuery = useQuery(
    compareProfile
      ? {
          ...labQueryOptions(compareProfile, operation, params),
          enabled: runNonce > 0,
        }
      : {
          queryKey: ["profile", "none-compare", "lab", operation, params],
          queryFn: async () => {
            throw new Error("No comparison profile.");
          },
          enabled: false,
        },
  );

  return (
    <ScreenShell
      eyebrow="Capability Lab"
      title="Run raw SDK operations"
      description="Use the same payload against different targets to compare shape, status, and transport behavior."
    >
      {activeProfile ? <ActiveProfileBanner profile={activeProfile} transportMode={transport.mode} /> : null}

      <SectionCard title="Operation" description="This screen keeps the raw JSON close to the request shape.">
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
          {operations.map((candidate) => (
            <Pressable
              key={candidate}
              onPress={() => setOperation(candidate)}
              style={{
                paddingHorizontal: 12,
                paddingVertical: 10,
                borderRadius: 999,
                backgroundColor: candidate === operation ? "#13212f" : "#fff",
                borderWidth: 1,
                borderColor: candidate === operation ? "#13212f" : "#dfd1bc",
              }}
            >
              <Text selectable style={{ color: candidate === operation ? "#fff7ed" : "#523f30", fontWeight: "700" }}>
                {candidate}
              </Text>
            </Pressable>
          ))}
        </View>
        <TextInput
          value={paramsText}
          onChangeText={setParamsText}
          multiline
          textAlignVertical="top"
          style={{
            minHeight: 150,
            padding: 14,
            borderRadius: 18,
            backgroundColor: "#fff",
            borderWidth: 1,
            borderColor: "#dfd1bc",
            fontFamily: process.env.EXPO_OS === "web" ? "ui-monospace, SFMono-Regular, monospace" : undefined,
          }}
        />
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Pressable
            onPress={() => setRunNonce((value) => value + 1)}
            style={{
              flex: 1,
              alignItems: "center",
              paddingVertical: 14,
              borderRadius: 16,
              backgroundColor: "#13212f",
            }}
          >
            <Text selectable style={{ color: "#fff7ed", fontWeight: "700" }}>
              Run Active Profile
            </Text>
          </Pressable>
        </View>
      </SectionCard>

      <SectionCard title="Compare target" description="Optional second profile for side-by-side JSON.">
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
          {profiles
            .filter((profile) => profile.id !== activeProfile?.id)
            .map((profile) => (
              <Pressable
                key={profile.id}
                onPress={() => setCompareProfileID((current) => (current === profile.id ? "" : profile.id))}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 10,
                  borderRadius: 999,
                  backgroundColor: compareProfileID === profile.id ? "#143949" : "#fff",
                  borderWidth: 1,
                  borderColor: compareProfileID === profile.id ? "#143949" : "#dfd1bc",
                }}
              >
                <Text selectable style={{ color: compareProfileID === profile.id ? "#eef7fb" : "#523f30", fontWeight: "700" }}>
                  {profile.label}
                </Text>
              </Pressable>
            ))}
        </View>
      </SectionCard>

      {runNonce === 0 ? (
        <EmptyState title="Run something" description="Pick an operation, adjust the JSON payload, then execute it." />
      ) : (
        <View style={{ gap: 16 }}>
          <JSONPanel title={`${activeProfile?.label ?? "Active"} result`} value={activeQuery.data ?? activeQuery.error ?? {}} />
          {compareProfile ? <JSONPanel title={`${compareProfile.label} result`} value={compareQuery.data ?? compareQuery.error ?? {}} /> : null}
        </View>
      )}
    </ScreenShell>
  );
}
