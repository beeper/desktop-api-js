import { Stack, useLocalSearchParams } from "expo-router";
import { View } from "react-native";

import { ThreadPanel } from "@/components/thread-panel";
import { useActiveProfile } from "@/hooks/use-active-profile";
import { useRealtimeTransport } from "@/hooks/use-realtime-transport";

export default function ChatRouteScreen() {
  const { chatID } = useLocalSearchParams<{ chatID: string }>();
  const { activeProfile } = useActiveProfile();
  const transport = useRealtimeTransport(activeProfile, chatID ? [chatID] : ["*"]);

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#f8f1e7" }}>
      <Stack.Screen options={{ title: chatID || "Thread", headerShown: true }} />
      {activeProfile && chatID ? (
        <ThreadPanel chatID={chatID} profile={activeProfile} transportMode={transport.mode} />
      ) : null}
    </View>
  );
}

