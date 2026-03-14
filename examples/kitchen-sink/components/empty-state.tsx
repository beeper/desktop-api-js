import { Text, View } from "react-native";

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <View
      style={{
        padding: 20,
        borderRadius: 22,
        backgroundColor: "#fff4e4",
        borderWidth: 1,
        borderColor: "#eed9b7",
        gap: 8,
      }}
    >
      <Text selectable style={{ color: "#53311a", fontSize: 18, fontWeight: "700" }}>
        {title}
      </Text>
      <Text selectable style={{ color: "#7b5a42", fontSize: 14, lineHeight: 20 }}>
        {description}
      </Text>
    </View>
  );
}

