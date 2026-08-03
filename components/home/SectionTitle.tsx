import React from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

type Props = {
  title: string;
  onSeeAll?: () => void;
};

export default function SectionTitle({
  title,
  onSeeAll,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title}
      </Text>

      <Pressable onPress={onSeeAll}>
        <Text style={styles.seeAll}>
          See All
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginBottom: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0F172A",
  },

  seeAll: {
    color: "#6C63FF",
    fontWeight: "600",
    fontSize: 15,
  },
});