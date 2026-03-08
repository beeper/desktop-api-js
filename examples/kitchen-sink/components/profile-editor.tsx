import { useEffect, useState } from "react";
import { Pressable, Switch, Text, TextInput, View } from "react-native";

import { SectionCard } from "@/components/section-card";
import type { ConnectionKind, ConnectionProfile } from "@/types/profile";

interface ProfileEditorProps {
  initialProfile?: ConnectionProfile | null;
  onCancel?: () => void;
  onSave(profile: Partial<ConnectionProfile> & Pick<ConnectionProfile, "label" | "baseURL">): void;
}

const kinds: ConnectionKind[] = ["easymatrix", "desktop-api", "unknown"];

export function ProfileEditor({ initialProfile, onCancel, onSave }: ProfileEditorProps) {
  const [label, setLabel] = useState(initialProfile?.label ?? "");
  const [baseURL, setBaseURL] = useState(initialProfile?.baseURL ?? "");
  const [accessToken, setAccessToken] = useState(initialProfile?.accessToken ?? "");
  const [kind, setKind] = useState<ConnectionKind>(initialProfile?.kind ?? "unknown");
  const [prefersQueryTokenRealtime, setPrefersQueryTokenRealtime] = useState(
    initialProfile?.prefersQueryTokenRealtime ?? process.env.EXPO_OS === "web",
  );

  useEffect(() => {
    setLabel(initialProfile?.label ?? "");
    setBaseURL(initialProfile?.baseURL ?? "");
    setAccessToken(initialProfile?.accessToken ?? "");
    setKind(initialProfile?.kind ?? "unknown");
    setPrefersQueryTokenRealtime(initialProfile?.prefersQueryTokenRealtime ?? process.env.EXPO_OS === "web");
  }, [initialProfile]);

  return (
    <SectionCard title={initialProfile ? "Edit profile" : "Add profile"} description="Profiles are local to this device.">
      <View style={{ gap: 12 }}>
        <TextInput
          placeholder="Label"
          value={label}
          onChangeText={setLabel}
          style={{
            padding: 14,
            borderRadius: 16,
            backgroundColor: "#fff",
            borderWidth: 1,
            borderColor: "#dfd1bc",
          }}
        />
        <TextInput
          placeholder="https://desktop-api.example"
          value={baseURL}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={setBaseURL}
          style={{
            padding: 14,
            borderRadius: 16,
            backgroundColor: "#fff",
            borderWidth: 1,
            borderColor: "#dfd1bc",
          }}
        />
        <TextInput
          placeholder="Access token"
          value={accessToken}
          secureTextEntry={process.env.EXPO_OS !== "web"}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={setAccessToken}
          style={{
            padding: 14,
            borderRadius: 16,
            backgroundColor: "#fff",
            borderWidth: 1,
            borderColor: "#dfd1bc",
          }}
        />
      </View>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
        {kinds.map((candidate) => (
          <Pressable
            key={candidate}
            onPress={() => setKind(candidate)}
            style={{
              paddingHorizontal: 12,
              paddingVertical: 10,
              borderRadius: 999,
              backgroundColor: candidate === kind ? "#13212f" : "#fff",
              borderWidth: 1,
              borderColor: candidate === kind ? "#13212f" : "#dfd1bc",
            }}
          >
            <Text selectable style={{ color: candidate === kind ? "#fff6ec" : "#4d3a2d", fontWeight: "700" }}>
              {candidate}
            </Text>
          </Pressable>
        ))}
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <View style={{ flex: 1, gap: 4 }}>
          <Text selectable style={{ color: "#24160d", fontSize: 15, fontWeight: "700" }}>
            Prefer query-token realtime
          </Text>
          <Text selectable style={{ color: "#6b5a4a", fontSize: 13 }}>
            Required for web against EasyMatrix when socket headers are unavailable.
          </Text>
        </View>
        <Switch value={prefersQueryTokenRealtime} onValueChange={setPrefersQueryTokenRealtime} />
      </View>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Pressable
          onPress={() =>
            onSave({
              id: initialProfile?.id,
              label,
              baseURL,
              accessToken,
              kind,
              allowBrowser: process.env.EXPO_OS === "web",
              prefersQueryTokenRealtime,
              lastProbeAt: initialProfile?.lastProbeAt,
              lastProbeResult: initialProfile?.lastProbeResult,
            })
          }
          style={{
            flex: 1,
            alignItems: "center",
            paddingVertical: 14,
            borderRadius: 16,
            backgroundColor: "#13212f",
          }}
        >
          <Text selectable style={{ color: "#fff7ed", fontWeight: "700" }}>
            Save Profile
          </Text>
        </Pressable>
        {onCancel ? (
          <Pressable
            onPress={onCancel}
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 18,
              borderRadius: 16,
              backgroundColor: "#efe4d5",
            }}
          >
            <Text selectable style={{ color: "#573c29", fontWeight: "700" }}>
              Cancel
            </Text>
          </Pressable>
        ) : null}
      </View>
    </SectionCard>
  );
}

