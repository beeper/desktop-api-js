import { useEffect, useMemo, useState } from "react";
import { router } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { Pressable, Text, TextInput, View, useWindowDimensions } from "react-native";

import { ActiveProfileBanner } from "@/components/active-profile-banner";
import { ChatRow } from "@/components/chat-row";
import { EmptyState } from "@/components/empty-state";
import { ScreenShell } from "@/components/screen-shell";
import { SectionCard } from "@/components/section-card";
import { ThreadPanel } from "@/components/thread-panel";
import { useActiveProfile } from "@/hooks/use-active-profile";
import { useRealtimeTransport } from "@/hooks/use-realtime-transport";
import { chatsQueryOptions } from "@/lib/query/queries";

export default function InboxScreen() {
  const { activeProfile } = useActiveProfile();
  const transport = useRealtimeTransport(activeProfile, ["*"]);
  const [filter, setFilter] = useState("");
  const [selectedChatID, setSelectedChatID] = useState<string | null>(null);
  const { width } = useWindowDimensions();
  const wideLayout = width >= 1080;

  const chatsQuery = useQuery(
    activeProfile
      ? {
          ...chatsQueryOptions(activeProfile, { limit: 80 }),
          enabled: Boolean(activeProfile.baseURL && activeProfile.accessToken),
          refetchInterval: transport.mode === "polling" ? 15_000 : false,
        }
      : {
          queryKey: ["profile", "none", "chats", { limit: 80 }],
          queryFn: async () => [],
          enabled: false,
        },
  );

  const filteredChats = useMemo(() => {
    const items = chatsQuery.data ?? [];
    const token = filter.trim().toLowerCase();
    if (!token) {
      return items;
    }
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(token) ||
        item.subtitle.toLowerCase().includes(token) ||
        item.accountID.toLowerCase().includes(token),
    );
  }, [chatsQuery.data, filter]);

  useEffect(() => {
    if (wideLayout && !selectedChatID && filteredChats[0]?.id) {
      setSelectedChatID(filteredChats[0].id);
    }
  }, [filteredChats, selectedChatID, wideLayout]);

  return (
    <ScreenShell
      eyebrow="SDK Inbox"
      title="Chat list and thread state"
      description="This screen exercises `chats.list`, `messages.list`, and `messages.send` against the active Desktop API target."
    >
      {activeProfile ? <ActiveProfileBanner profile={activeProfile} transportMode={transport.mode} /> : null}

      {!activeProfile ? (
        <EmptyState title="No profile selected" description="Create a connection profile in Settings before loading chats." />
      ) : null}

      {activeProfile && !activeProfile.accessToken ? (
        <EmptyState title="Token missing" description="Save an access token in Settings to start querying chats and messages." />
      ) : null}

      {activeProfile ? (
        <SectionCard
          title="Inbox"
          description="The list is cached per profile and invalidated from websocket events or polling."
        >
          <TextInput
            placeholder="Filter loaded chats"
            value={filter}
            onChangeText={setFilter}
            style={{
              padding: 14,
              borderRadius: 16,
              backgroundColor: "#fff",
              borderWidth: 1,
              borderColor: "#dfd1bc",
            }}
          />

          {chatsQuery.isPending ? (
            <EmptyState title="Loading chats" description="Fetching the latest conversation list." />
          ) : null}

          {chatsQuery.isError ? (
            <EmptyState
              title="Inbox failed to load"
              description={chatsQuery.error instanceof Error ? chatsQuery.error.message : "Unknown inbox error"}
            />
          ) : null}

          {!wideLayout && filteredChats.length > 0 ? (
            <View style={{ gap: 10 }}>
              {filteredChats.map((chat) => (
                <ChatRow
                  key={chat.id}
                  chat={chat}
                  selected={false}
                  onPress={() => router.push({ pathname: "/chat/[chatID]", params: { chatID: chat.id } })}
                />
              ))}
            </View>
          ) : null}

          {wideLayout ? (
            <View style={{ flexDirection: "row", gap: 16, alignItems: "stretch" }}>
              <View style={{ flex: 0.95, gap: 10 }}>
                {filteredChats.map((chat) => (
                  <ChatRow
                    key={chat.id}
                    chat={chat}
                    selected={chat.id === selectedChatID}
                    onPress={() => setSelectedChatID(chat.id)}
                  />
                ))}
              </View>
              <View style={{ flex: 1.25 }}>
                {selectedChatID ? (
                  <ThreadPanel chatID={selectedChatID} profile={activeProfile} transportMode={transport.mode} />
                ) : (
                  <EmptyState title="Pick a chat" description="Select one of the loaded chats to render the thread panel." />
                )}
              </View>
            </View>
          ) : null}

          {!chatsQuery.isPending && filteredChats.length === 0 ? (
            <EmptyState title="No chats matched" description="Try another filter or verify the current profile against `/v1/info` in Lab or Settings." />
          ) : null}
        </SectionCard>
      ) : null}

      {wideLayout ? null : (
        <Pressable
          onPress={() => router.push({ pathname: "/settings" })}
          style={{
            paddingVertical: 14,
            paddingHorizontal: 18,
            borderRadius: 18,
            backgroundColor: "#efe4d5",
            alignSelf: "flex-start",
          }}
        >
          <Text selectable style={{ color: "#583d28", fontWeight: "700" }}>
            Open Settings
          </Text>
        </Pressable>
      )}
    </ScreenShell>
  );
}
