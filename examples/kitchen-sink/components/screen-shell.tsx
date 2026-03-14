import type { PropsWithChildren, ReactNode } from "react";
import { ScrollView, Text, View } from "react-native";

interface ScreenShellProps extends PropsWithChildren {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function ScreenShell({ action, children, description, eyebrow, title }: ScreenShellProps) {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{
        padding: 20,
        gap: 18,
        backgroundColor: "#f8f1e7",
      }}
    >
      <View
        style={{
          padding: 18,
          borderRadius: 28,
          backgroundColor: "#13212f",
          borderCurve: "continuous",
          gap: 10,
          boxShadow: "0 18px 48px rgba(14, 25, 38, 0.18)",
        }}
      >
        {eyebrow ? (
          <Text
            selectable
            style={{
              color: "#87d8c2",
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: 1.2,
              fontWeight: "700",
            }}
          >
            {eyebrow}
          </Text>
        ) : null}
        <Text selectable style={{ color: "#fff7ed", fontSize: 28, fontWeight: "800" }}>
          {title}
        </Text>
        {description ? (
          <Text selectable style={{ color: "#c2d4e6", fontSize: 15, lineHeight: 22 }}>
            {description}
          </Text>
        ) : null}
        {action}
      </View>
      {children}
    </ScrollView>
  );
}

