import type { PropsWithChildren, ReactNode } from "react";
import { Text, View } from "react-native";

interface SectionCardProps extends PropsWithChildren {
  title: string;
  description?: string;
  aside?: ReactNode;
}

export function SectionCard({ aside, children, description, title }: SectionCardProps) {
  return (
    <View
      style={{
        padding: 18,
        borderRadius: 24,
        backgroundColor: "#fffaf4",
        borderWidth: 1,
        borderColor: "#eadfce",
        borderCurve: "continuous",
        gap: 14,
        boxShadow: "0 10px 24px rgba(58, 38, 10, 0.08)",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <View style={{ flex: 1, gap: 4 }}>
          <Text selectable style={{ color: "#24160d", fontSize: 18, fontWeight: "700" }}>
            {title}
          </Text>
          {description ? (
            <Text selectable style={{ color: "#6b5a4a", fontSize: 14, lineHeight: 20 }}>
              {description}
            </Text>
          ) : null}
        </View>
        {aside}
      </View>
      {children}
    </View>
  );
}

