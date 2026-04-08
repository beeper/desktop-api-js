import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#13212f",
        tabBarInactiveTintColor: "#8c7c6d",
        tabBarStyle: {
          backgroundColor: "#fff8ef",
          borderTopColor: "#ebdcc9",
        },
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Inbox" }} />
      <Tabs.Screen name="search" options={{ title: "Search" }} />
      <Tabs.Screen name="lab" options={{ title: "Lab" }} />
      <Tabs.Screen name="settings" options={{ title: "Settings" }} />
    </Tabs>
  );
}

