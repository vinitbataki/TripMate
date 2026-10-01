import React from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { router } from "expo-router";

import AIBanner from "../../components/home/AIBanner";
import CategoryCard from "../../components/home/CategoryCard";
import DestinationCard from "../../components/home/DestinationCard";
import Header from "../../components/home/Header";
import SearchBar from "../../components/home/SearchBar";
import SectionTitle from "../../components/home/SectionTitle";
import TrendingCard from "../../components/home/TrendingCard";

import { categories } from "../../constants/categories";
import { destinations } from "../../constants/destinations";
import { trending } from "../../constants/trending";

import { useTrips } from "../../context/TripsContext";
import { useAuth } from "../../contexts/AuthContext";

export default function HomeScreen() {
  const { user } = useAuth();

  const { trips } = useTrips();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* ==========================================
            HEADER
        ========================================== */}

        <Header
          name={user?.displayName ?? "Traveler"}
        />

        {/* ==========================================
            SEARCH
        ========================================== */}

        <SearchBar />

        {/* ==========================================
            AI BANNER
        ========================================== */}

        <AIBanner />

        {/* ==========================================
            MY TRIPS
        ========================================== */}

        <View style={styles.myTripsHeader}>
          <SectionTitle title="My Trips" />

          {trips.length > 0 && (
            <Pressable
              onPress={() =>
                router.push("/(tabs)/trips")
              }
            >
              <Text style={styles.viewAllText}>
                View All
              </Text>
            </Pressable>
          )}
        </View>

        {trips.length === 0 ? (
          <View style={styles.emptyTrips}>
            <Text style={styles.emptyTripsIcon}>
              🧳
            </Text>

            <Text style={styles.emptyTripsTitle}>
              No trips yet
            </Text>

            <Text style={styles.emptyTripsText}>
              Create your first trip and start
              planning your journey.
            </Text>

            <Pressable
              style={styles.createTripButton}
              onPress={() =>
                router.push("/create-trip")
              }
            >
              <Text
                style={styles.createTripButtonText}
              >
                + Create Trip
              </Text>
            </Pressable>
          </View>
        ) : (
          <FlatList
            horizontal
            data={trips.slice(0, 5)}
            keyExtractor={(item) =>
              String(item.id)
            }
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled
            contentContainerStyle={
              styles.myTripsList
            }
            renderItem={({ item }) => (
              <Pressable
                style={styles.tripCard}
                onPress={() =>
                  router.push({
                    pathname:
                      "/destination/[id]",
                    params: {
                      id: String(item.id),
                    },
                  })
                }
              >
                {item.image ? (
                  <View
                    style={
                      styles.tripImageContainer
                    }
                  >
                    {/* Image is intentionally
                        handled by the card
                        background below */}
                  </View>
                ) : (
                  <View
                    style={
                      styles.tripImagePlaceholder
                    }
                  >
                    <Text
                      style={
                        styles.tripPlaceholderIcon
                      }
                    >
                      🏞️
                    </Text>
                  </View>
                )}

                <View style={styles.tripInfo}>
                  <Text
                    style={styles.tripTitle}
                    numberOfLines={1}
                  >
                    {item.title}
                  </Text>

                  <Text
                    style={styles.tripDestination}
                    numberOfLines={1}
                  >
                    📍 {item.destination}
                  </Text>

                  <View
                    style={styles.tripProgressRow}
                  >
                    <View
                      style={
                        styles.tripProgressBackground
                      }
                    >
                      <View
                        style={[
                          styles.tripProgressFill,
                          {
                            width: `${Math.min(
                              Math.max(
                                item.progress,
                                0
                              ),
                              100
                            )}%`,
                          },
                        ]}
                      />
                    </View>

                    <Text
                      style={
                        styles.tripProgressText
                      }
                    >
                      {item.progress}%
                    </Text>
                  </View>
                </View>
              </Pressable>
            )}
          />
        )}

        {/* ==========================================
            POPULAR DESTINATIONS
        ========================================== */}

        <SectionTitle
          title="Popular Destinations"
        />

        <FlatList
          horizontal
          data={destinations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DestinationCard item={item} />
          )}
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled
          contentContainerStyle={
            styles.destinationList
          }
        />

        {/* ==========================================
            CATEGORIES
        ========================================== */}

        <SectionTitle title="Categories" />

        <FlatList
          horizontal
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CategoryCard item={item} />
          )}
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled
          contentContainerStyle={
            styles.categoryList
          }
        />

        {/* ==========================================
            TRENDING
        ========================================== */}

        <SectionTitle
          title="Trending This Week"
        />

        <FlatList
          horizontal
          data={trending}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TrendingCard item={item} />
          )}
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled
          contentContainerStyle={
            styles.trendingList
          }
        />
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

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  // ==========================================
  // MY TRIPS
  // ==========================================

  myTripsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },

  viewAllText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#007AFF",
  },

  myTripsList: {
    paddingRight: 20,
    paddingBottom: 10,
  },

  tripCard: {
    width: 240,
    marginRight: 14,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    overflow: "hidden",
  },

  tripImageContainer: {
    height: 120,
    backgroundColor: "#E8F0FE",
  },

  tripImagePlaceholder: {
    height: 120,
    backgroundColor: "#E8F0FE",
    alignItems: "center",
    justifyContent: "center",
  },

  tripPlaceholderIcon: {
    fontSize: 42,
  },

  tripInfo: {
    padding: 14,
  },

  tripTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111111",
  },

  tripDestination: {
    marginTop: 5,
    fontSize: 13,
    color: "#666666",
  },

  tripProgressRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
  },

  tripProgressBackground: {
    flex: 1,
    height: 7,
    borderRadius: 20,
    backgroundColor: "#E5E5E5",
    overflow: "hidden",
  },

  tripProgressFill: {
    height: "100%",
    borderRadius: 20,
    backgroundColor: "#007AFF",
  },

  tripProgressText: {
    marginLeft: 8,
    fontSize: 11,
    fontWeight: "700",
    color: "#666666",
  },

  // ==========================================
  // EMPTY TRIPS
  // ==========================================

  emptyTrips: {
    marginTop: 10,
    paddingVertical: 28,
    paddingHorizontal: 20,
    borderRadius: 18,
    backgroundColor: "#F7F7F7",
    alignItems: "center",
  },

  emptyTripsIcon: {
    fontSize: 42,
  },

  emptyTripsTitle: {
    marginTop: 8,
    fontSize: 17,
    fontWeight: "700",
    color: "#111111",
  },

  emptyTripsText: {
    marginTop: 6,
    fontSize: 13,
    lineHeight: 19,
    color: "#666666",
    textAlign: "center",
  },

  createTripButton: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 11,
    borderRadius: 12,
    backgroundColor: "#007AFF",
  },

  createTripButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  // ==========================================
  // EXISTING SECTIONS
  // ==========================================

  destinationList: {
    paddingRight: 20,
  },

  categoryList: {
    paddingRight: 20,
    paddingBottom: 10,
  },

  trendingList: {
    paddingRight: 20,
    paddingBottom: 20,
  },
});