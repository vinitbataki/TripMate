import { StyleSheet, Text, View } from "react-native";

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TripMate</Text>
      <Text style={styles.subtitle}>Your AI Travel Planner ✈️</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#6C63FF",
  },
  subtitle: {
    marginTop: 10,
    fontSize: 18,
    color: "#666",
  },
});