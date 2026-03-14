import { Pressable, Text, View } from "react-native";

import type { SearchResultItem } from "@/types/view-models";

export function SearchResultCard({
  item,
  onPress,
}: {
  item: SearchResultItem;
  onPress(): void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        padding: 16,
        borderRadius: 20,
        backgroundColor: "#fffdf8",
        borderWidth: 1,
        borderColor: "#eadfce",
        gap: 8,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <Text selectable style={{ color: "#24160d", fontSize: 16, fontWeight: "700", flex: 1 }}>
          {item.title}
        </Text>
        <Text selectable style={{ color: "#8b6b4d", fontSize: 12, fontWeight: "700", textTransform: "uppercase" }}>
          {item.kind}
        </Text>
      </View>
      <Text selectable style={{ color: "#6a5748", fontSize: 14 }}>
        {item.subtitle}
      </Text>
      {item.timestamp ? (
        <Text selectable style={{ color: "#8e755e", fontSize: 12 }}>
          {new Date(item.timestamp).toLocaleString()}
        </Text>
      ) : null}
    </Pressable>
  );
}
