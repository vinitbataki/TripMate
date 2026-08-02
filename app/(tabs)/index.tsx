import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TripMate</Text>
      <Text style={styles.subtitle}>
        Your Travel Planner ✈️
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  title: {
    fontSize: 66,
    fontWeight: "900",
    color: "#b90683",
  },

  subtitle: {
    marginTop: 17,
    fontSize: 20,
    color: "#7f648b",
  },
});