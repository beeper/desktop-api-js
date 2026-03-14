import { Pressable, Text, View } from "react-native";

import { StatusChip } from "@/components/status-chip";
import type { InboxChatItem } from "@/types/view-models";

export function ChatRow({
  chat,
  onPress,
  selected,
}: {
  chat: InboxChatItem;
  onPress(): void;
  selected: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        padding: 16,
        borderRadius: 20,
        backgroundColor: selected ? "#13212f" : "#fffdf8",
        borderWidth: 1,
        borderColor: selected ? "#13212f" : "#eadfce",
        gap: 10,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <View style={{ flex: 1, gap: 4 }}>
          <Text selectable style={{ color: selected ? "#fff8ee" : "#24160d", fontSize: 16, fontWeight: "700" }}>
            {chat.title}
          </Text>
          <Text selectable style={{ color: selected ? "#a9bed1" : "#7a6859", fontSize: 13 }}>
            {chat.accountID} · {chat.lastActivity ? new Date(chat.lastActivity).toLocaleString() : "No activity yet"}
          </Text>
        </View>
        {chat.unreadCount > 0 ? <StatusChip tone="good" value={`${chat.unreadCount} new`} /> : null}
      </View>
      <Text
        numberOfLines={2}
        selectable
        style={{ color: selected ? "#d3dfeb" : "#5f4e40", fontSize: 14, lineHeight: 20 }}
      >
        {chat.subtitle}
      </Text>
    </Pressable>
  );
}
