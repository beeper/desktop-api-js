import "react-native-reanimated";
import { useEffect } from "react";
import { Stack } from "expo-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { ActivityIndicator, View } from "react-native";

import { useActiveProfile } from "@/hooks/use-active-profile";
import { useRealtimeTransport } from "@/hooks/use-realtime-transport";
import { queryClient } from "@/lib/query/query-client";
import { profileStore } from "@/lib/storage/profiles";

function AppBootstrap() {
  const { activeProfile, ready } = useActiveProfile();
  useRealtimeTransport(activeProfile, ["*"]);

  if (!ready) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#13212f",
        }}
      >
        <ActivityIndicator size="large" color="#92d9c6" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "#f8f1e7" } }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="chat/[chatID]" />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

export default function RootLayout() {
  useEffect(() => {
    void profileStore.initialize();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardProvider>
        <QueryClientProvider client={queryClient}>
          <AppBootstrap />
        </QueryClientProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}
