import { useMemo } from "react";
import { Text, View } from "react-native";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { useQuery } from "@tanstack/react-query";

import { EmptyState } from "@/components/empty-state";
import { StatusChip } from "@/components/status-chip";
import { useSendMessageMutation } from "@/lib/query/mutations";
import { messagesQueryOptions } from "@/lib/query/queries";
import type { ConnectionProfile, TransportMode } from "@/types/profile";
import type { GiftedSDKMessage } from "@/types/view-models";

function BubbleFooter({ currentMessage }: { currentMessage?: GiftedSDKMessage }) {
  if (!currentMessage?.attachmentLabel && !currentMessage?.reactionSummary) {
    return null;
  }

  return (
    <View style={{ gap: 6, marginTop: 6 }}>
      {currentMessage.attachmentLabel ? (
        <Text selectable style={{ color: "#7d6444", fontSize: 12 }}>
          {currentMessage.attachmentLabel}
        </Text>
      ) : null}
      {currentMessage.reactionSummary ? (
        <Text selectable style={{ color: "#7d6444", fontSize: 12 }}>
          {currentMessage.reactionSummary}
        </Text>
      ) : null}
    </View>
  );
}

export function ThreadPanel({
  chatID,
  profile,
  transportMode,
}: {
  chatID: string;
  profile: ConnectionProfile;
  transportMode: TransportMode;
}) {
  const messagesQuery = useQuery({
    ...messagesQueryOptions(profile, chatID),
    enabled: Boolean(profile.accessToken && chatID),
    refetchInterval: transportMode === "polling" ? 8_000 : false,
  });

  const sendMutation = useSendMessageMutation(profile, chatID);

  const giftedProps = useMemo(
    () => ({
      renderBubble: (props: any) => (
        <Bubble
          {...props}
          wrapperStyle={{
            right: { backgroundColor: "#143949" },
            left: { backgroundColor: "#f9ecdb" },
          }}
          textStyle={{
            right: { color: "#f5fbff" },
            left: { color: "#332215" },
          }}
          renderCustomView={() => <BubbleFooter currentMessage={props.currentMessage as GiftedSDKMessage | undefined} />}
        />
      ),
      user: { _id: "__self__" },
      alwaysShowSend: true,
      placeholder: "Send a text message",
      keyboardShouldPersistTaps: "handled",
      listViewProps: {
        contentInsetAdjustmentBehavior: "automatic",
      },
    }),
    [],
  );

  if (!chatID) {
    return <EmptyState title="Pick a thread" description="Select a chat to inspect the SDK-backed message list." />;
  }

  if (messagesQuery.isPending) {
    return <EmptyState title="Loading thread" description="Pulling recent messages through the Desktop API." />;
  }

  if (messagesQuery.isError) {
    return (
      <EmptyState
        title="Thread failed to load"
        description={messagesQuery.error instanceof Error ? messagesQuery.error.message : "Unknown thread error"}
      />
    );
  }

  return (
    <View
      style={{
        flex: 1,
        minHeight: 520,
        borderRadius: 24,
        overflow: "hidden",
        backgroundColor: "#fffdf8",
        borderWidth: 1,
        borderColor: "#eadfce",
      }}
    >
      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 12,
          backgroundColor: "#fcf3e7",
          borderBottomWidth: 1,
          borderBottomColor: "#eadfce",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
        }}
      >
        <View style={{ flex: 1, gap: 4 }}>
          <Text selectable style={{ color: "#21150b", fontSize: 16, fontWeight: "700" }}>
            {chatID}
          </Text>
          <Text selectable style={{ color: "#7b6248", fontSize: 12 }}>
            Text send only · comparison-safe refresh strategy
          </Text>
        </View>
        <StatusChip
          tone={transportMode === "realtime" ? "good" : transportMode === "polling" ? "warn" : "neutral"}
          value={transportMode}
        />
      </View>
      <GiftedChat
        {...giftedProps}
        messages={messagesQuery.data ?? []}
        onSend={(messages) => {
          const next = messages[0];
          if (!next?.text?.trim()) {
            return;
          }
          sendMutation.mutate({ text: next.text.trim() });
        }}
      />
    </View>
  );
}
