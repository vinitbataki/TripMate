import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  name: string;
};

export default function Header({ name }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hello Traveller</Text>
      <Text style={styles.name}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 25,
  },

  greeting: {
    fontSize: 18,
    color: "#64748B",
  },

  name: {
    fontSize: 30,
    fontWeight: "700",
    color: "#0F172A",
    marginTop: 5,
  },
});