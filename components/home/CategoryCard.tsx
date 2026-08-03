import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    StyleSheet,
    Text,
    View,
} from "react-native";

type Props = {
  item: {
    title: string;
    icon: keyof typeof Ionicons.glyphMap;
    color: string;
  };
};

export default function CategoryCard({ item }: Props) {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: item.color },
        ]}
      >
        <Ionicons
          name={item.icon}
          size={28}
          color="#FFFFFF"
        />
      </View>

      <Text style={styles.title}>
        {item.title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginRight: 20,
    width: 90,
  },

  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
    textAlign: "center",
  },
});