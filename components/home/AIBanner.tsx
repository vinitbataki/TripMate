import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function AIBanner() {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="sparkles" size={30} color="#FFFFFF" />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>AI Travel Planner</Text>

        <Text style={styles.subtitle}>
          Plan your perfect trip in seconds with AI.
        </Text>

        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Plan My Trip</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#6C63FF",
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
  },

  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },

  content: {
    flex: 1,
    marginLeft: 15,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
  },

  subtitle: {
    color: "#EDE9FE",
    marginTop: 6,
    lineHeight: 20,
  },

  button: {
    backgroundColor: "#FFFFFF",
    alignSelf: "flex-start",
    marginTop: 14,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
  },

  buttonText: {
    color: "#6C63FF",
    fontWeight: "700",
  },
});