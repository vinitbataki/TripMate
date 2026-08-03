import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");

type Props = {
  item: {
    id: string;
    title: string;
    description: string;
    image: string;
  };
};

export default function OnboardingItem({ item }: Props) {
  return (
    <View style={[styles.container, { width }]}>
      
      {/* Illustration */}
      <View style={styles.imageContainer}>
        <Text style={styles.image}>{item.image}</Text>
      </View>

      {/* Title */}
      <Text style={styles.title}>{item.title}</Text>

      {/* Description */}
      <Text style={styles.description}>
        {item.description}
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },

  imageContainer: {
    marginBottom: 50,
  },

  image: {
    fontSize: 120,
  },

  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#1E293B",
    textAlign: "center",
    lineHeight: 44,
  },

  description: {
    marginTop: 20,
    fontSize: 18,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 28,
    paddingHorizontal: 15,
  },
});