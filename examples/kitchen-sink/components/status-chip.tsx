import { Text, View } from "react-native";

export function StatusChip({ tone, value }: { tone: "good" | "warn" | "neutral"; value: string }) {
  const palette =
    tone === "good"
      ? { backgroundColor: "#d5f6e8", color: "#0d6b48" }
      : tone === "warn"
        ? { backgroundColor: "#ffe8bf", color: "#9a5b00" }
        : { backgroundColor: "#e7eef5", color: "#44576a" };

  return (
    <View
      style={{
        paddingHorizontal: 12,
        paddingVertical: 7,
        borderRadius: 999,
        backgroundColor: palette.backgroundColor,
      }}
    >
      <Text selectable style={{ color: palette.color, fontWeight: "700", fontSize: 12 }}>
        {value}
      </Text>
    </View>
  );
}

