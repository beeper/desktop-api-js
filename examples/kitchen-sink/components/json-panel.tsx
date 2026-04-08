import { Text, View } from "react-native";

export function JSONPanel({ title, value }: { title: string; value: unknown }) {
  return (
    <View
      style={{
        padding: 14,
        borderRadius: 18,
        backgroundColor: "#0f1b28",
        gap: 8,
      }}
    >
      <Text selectable style={{ color: "#92d9c6", fontSize: 12, fontWeight: "700", textTransform: "uppercase" }}>
        {title}
      </Text>
      <Text
        selectable
        style={{
          color: "#e0ecf7",
          fontFamily: process.env.EXPO_OS === "web" ? "ui-monospace, SFMono-Regular, monospace" : undefined,
          fontSize: 12,
          lineHeight: 18,
        }}
      >
        {JSON.stringify(value, null, 2)}
      </Text>
    </View>
  );
}

