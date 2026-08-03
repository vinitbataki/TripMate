import { router } from "expo-router";
import { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { useAuth } from "../../contexts/AuthContext";
import { hasCompletedOnboarding } from "../../utils/storage";

export default function SplashScreen() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    const timer = setTimeout(async () => {
      const completed = await hasCompletedOnboarding();

      if (!completed) {
        router.replace("/(auth)/onboarding");
        return;
      }

      if (user) {
        router.replace("/(tabs)");
      } else {
        router.replace("/(auth)/login");
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [loading, user]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/logo/tripmate-logo.png")}
        style={styles.logo}
      />

      <Text style={styles.title}>TripMate</Text>

      <Text style={styles.subtitle}>
        Your Travel Partner
      </Text>

      <Text style={styles.quote}>
        Every Journey Begins{"\n"}With A Plan
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  logo: {
    width: 180,
    height: 180,
    resizeMode: "contain",
    marginBottom: 25,
  },

  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#6C63FF",
  },

  subtitle: {
    marginTop: 8,
    fontSize: 18,
    color: "#64748B",
    fontWeight: "500",
  },

  quote: {
    marginTop: 45,
    textAlign: "center",
    color: "#94A3B8",
    fontSize: 16,
    lineHeight: 24,
  },
});