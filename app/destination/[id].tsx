import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function DestinationDetails() {
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Destination Details
      </Text>

      <Text style={styles.subtitle}>
        Destination ID: {id}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0F172A",
  },

  subtitle: {
    marginTop: 15,
    fontSize: 18,
    color: "#64748B",
  },
});