import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        backgroundColor: "#13212f",
        gap: 16,
      }}
    >
      <Text selectable style={{ color: "#fff7ed", fontSize: 32, fontWeight: "800" }}>
        Route not found
      </Text>
      <Text selectable style={{ color: "#c8d8e8", fontSize: 16, textAlign: "center", lineHeight: 22 }}>
        The SDK lab does not have a screen at this path.
      </Text>
      <Link href="/" asChild>
        <Pressable
          style={{
            paddingHorizontal: 18,
            paddingVertical: 12,
            borderRadius: 16,
            backgroundColor: "#92d9c6",
          }}
        >
          <Text selectable style={{ color: "#123227", fontWeight: "700" }}>
            Back to Inbox
          </Text>
        </Pressable>
      </Link>
    </View>
  );
}

