import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { destinations } from "../../constants/destinations";

export default function PopularDestinationScreen() {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const destination = destinations.find(
    (item) => String(item.id) === String(id)
  );

  // ==========================================
  // DESTINATION NOT FOUND
  // ==========================================

  if (!destination) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundEmoji}>🌍</Text>

          <Text style={styles.notFoundTitle}>
            Destination Not Found
          </Text>

          <Text style={styles.notFoundText}>
            We couldn't find this destination.
          </Text>

          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>
              Go Back
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  // ==========================================
  // PLAN TRIP
  // ==========================================

  const handlePlanTrip = () => {
    router.push("/create-trip");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ==========================================
            HEADER
        ========================================== */}

        <View style={styles.header}>
          <Pressable
            style={styles.backCircle}
            onPress={() => router.back()}
          >
            <Text style={styles.backIcon}>‹</Text>
          </Pressable>

          <Text style={styles.headerTitle}>
            Destination
          </Text>

          <View style={styles.headerPlaceholder} />
        </View>

        {/* ==========================================
            DESTINATION IMAGE
        ========================================== */}

        <Image
          source={destination.image}
          style={styles.destinationImage}
        />

        {/* ==========================================
            DESTINATION INFORMATION
        ========================================== */}

        <View style={styles.content}>
          <Text style={styles.destinationName}>
            {destination.name}
          </Text>

          <Text style={styles.destinationCountry}>
            📍 {destination.country}
          </Text>

          {/* ==========================================
              STATS
          ========================================== */}

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statIcon}>⭐</Text>

              <Text style={styles.statValue}>
                {destination.rating}
              </Text>

              <Text style={styles.statLabel}>
                Rating
              </Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statItem}>
              <Text style={styles.statIcon}>💰</Text>

              <Text style={styles.statValue}>
                {destination.price}
              </Text>

              <Text style={styles.statLabel}>
                Price
              </Text>
            </View>
          </View>

          {/* ==========================================
              ABOUT
          ========================================== */}

          <Text style={styles.sectionTitle}>
            About this destination
          </Text>

          <Text style={styles.description}>
            Discover the beauty of{" "}
            {destination.name}, {destination.country}.
            Plan your trip, explore new places and
            create unforgettable memories.
          </Text>

          {/* ==========================================
              PLAN TRIP BUTTON
          ========================================== */}

          <Pressable
            style={styles.planButton}
            onPress={handlePlanTrip}
          >
            <Text style={styles.planButtonText}>
              ✈️ Plan a Trip
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// =====================================================
// STYLES
// =====================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  scrollContent: {
    paddingBottom: 40,
  },

  // ==========================================
  // HEADER
  // ==========================================

  header: {
    height: 60,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
  },

  backIcon: {
    fontSize: 32,
    lineHeight: 34,
    color: "#111111",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111111",
  },

  headerPlaceholder: {
    width: 42,
  },

  // ==========================================
  // IMAGE
  // ==========================================

  destinationImage: {
    width: "100%",
    height: 280,
  },

  // ==========================================
  // CONTENT
  // ==========================================

  content: {
    padding: 20,
  },

  destinationName: {
    fontSize: 30,
    fontWeight: "800",
    color: "#0F172A",
  },

  destinationCountry: {
    marginTop: 8,
    fontSize: 16,
    color: "#64748B",
  },

  // ==========================================
  // STATS
  // ==========================================

  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
    paddingVertical: 18,
    borderRadius: 16,
    backgroundColor: "#F8FAFC",
  },

  statItem: {
    flex: 1,
    alignItems: "center",
  },

  statIcon: {
    fontSize: 20,
  },

  statValue: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },

  statLabel: {
    marginTop: 3,
    fontSize: 12,
    color: "#64748B",
  },

  statDivider: {
    width: 1,
    height: 45,
    backgroundColor: "#E2E8F0",
  },

  // ==========================================
  // ABOUT
  // ==========================================

  sectionTitle: {
    marginTop: 28,
    fontSize: 20,
    fontWeight: "700",
    color: "#0F172A",
  },

  description: {
    marginTop: 10,
    fontSize: 15,
    lineHeight: 23,
    color: "#64748B",
  },

  // ==========================================
  // PLAN BUTTON
  // ==========================================

  planButton: {
    height: 54,
    marginTop: 28,
    borderRadius: 16,
    backgroundColor: "#6C63FF",
    alignItems: "center",
    justifyContent: "center",
  },

  planButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  // ==========================================
  // NOT FOUND
  // ==========================================

  notFoundContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },

  notFoundEmoji: {
    fontSize: 60,
  },

  notFoundTitle: {
    marginTop: 15,
    fontSize: 24,
    fontWeight: "700",
    color: "#111111",
  },

  notFoundText: {
    marginTop: 8,
    fontSize: 15,
    color: "#64748B",
    textAlign: "center",
  },

  backButton: {
    marginTop: 24,
    paddingHorizontal: 24,
    paddingVertical: 13,
    borderRadius: 12,
    backgroundColor: "#6C63FF",
  },

  backButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});