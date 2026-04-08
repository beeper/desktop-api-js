import { useMemo, useState } from "react";
import { router } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { Pressable, Text, TextInput, View } from "react-native";

import { ActiveProfileBanner } from "@/components/active-profile-banner";
import { EmptyState } from "@/components/empty-state";
import { ScreenShell } from "@/components/screen-shell";
import { SearchResultCard } from "@/components/search-result-card";
import { SectionCard } from "@/components/section-card";
import { useActiveProfile } from "@/hooks/use-active-profile";
import { useRealtimeTransport } from "@/hooks/use-realtime-transport";
import { chatsSearchQueryOptions, messagesSearchQueryOptions } from "@/lib/query/queries";

export default function SearchScreen() {
  const { activeProfile } = useActiveProfile();
  const transport = useRealtimeTransport(activeProfile, ["*"]);
  const [draftQuery, setDraftQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");

  const chatsQuery = useQuery(
    activeProfile
      ? {
          ...chatsSearchQueryOptions(activeProfile, { query: submittedQuery, limit: 12 }),
          enabled: Boolean(submittedQuery.trim()),
        }
      : {
          queryKey: ["profile", "none", "chats-search", { query: submittedQuery, limit: 12 }],
          queryFn: async () => [],
          enabled: false,
        },
  );
  const messagesQuery = useQuery(
    activeProfile
      ? {
          ...messagesSearchQueryOptions(activeProfile, { query: submittedQuery, limit: 12 }),
          enabled: Boolean(submittedQuery.trim()),
        }
      : {
          queryKey: ["profile", "none", "messages-search", { query: submittedQuery, limit: 12 }],
          queryFn: async () => [],
          enabled: false,
        },
  );

  const combined = useMemo(() => [...(chatsQuery.data ?? []), ...(messagesQuery.data ?? [])], [chatsQuery.data, messagesQuery.data]);

  return (
    <ScreenShell
      eyebrow="Search"
      title="Cross-target chat and message lookup"
      description="Search only runs on submit so results stay attributable to a single request payload."
    >
      {activeProfile ? <ActiveProfileBanner profile={activeProfile} transportMode={transport.mode} /> : null}
      <SectionCard title="Query" description="Run both `chats.search` and `messages.search` with the same literal search string.">
        <TextInput
          placeholder="deployment, launch, matrix"
          value={draftQuery}
          onChangeText={setDraftQuery}
          style={{
            padding: 14,
            borderRadius: 16,
            backgroundColor: "#fff",
            borderWidth: 1,
            borderColor: "#dfd1bc",
          }}
        />
        <Pressable
          onPress={() => setSubmittedQuery(draftQuery.trim())}
          style={{
            alignItems: "center",
            paddingVertical: 14,
            borderRadius: 16,
            backgroundColor: "#13212f",
          }}
        >
          <Text selectable style={{ color: "#fff7ed", fontWeight: "700" }}>
            Search Active Profile
          </Text>
        </Pressable>
      </SectionCard>

      {!submittedQuery ? (
        <EmptyState title="Waiting for query" description="Enter a literal search string, then submit to execute both search endpoints." />
      ) : null}

      {submittedQuery ? (
        <SectionCard title="Results" description={`Submitted query: ${submittedQuery}`}>
          {(chatsQuery.isPending || messagesQuery.isPending) ? (
            <EmptyState title="Searching" description="Dispatching both search requests." />
          ) : null}
          {combined.map((item) => (
            <SearchResultCard
              key={item.id}
              item={item}
              onPress={() => router.push({ pathname: "/chat/[chatID]", params: { chatID: item.chatID } })}
            />
          ))}
          {!chatsQuery.isPending && !messagesQuery.isPending && combined.length === 0 ? (
            <EmptyState title="No results" description="Try a different literal term or verify the target is fully indexed." />
          ) : null}
        </SectionCard>
      ) : null}
    </ScreenShell>
  );
}
