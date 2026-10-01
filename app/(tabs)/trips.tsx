import { router } from "expo-router";
import React, { useState } from "react";

import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import TripCard from "../../components/ui/molecules/TripCard";

import { useTrips } from "../../context/TripsContext";

import Colors from "../../constants/colors";
import Radius from "../../constants/radius";
import Spacing from "../../constants/spacing";
import Typography from "../../constants/typography";

type FilterType = "All" | "Upcoming" | "Completed";

export default function TripsScreen() {
  // ==========================================
  // TRIPS CONTEXT
  // ==========================================

  const { trips } = useTrips();

  // ==========================================
  // STATE
  // ==========================================

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] =
    useState<FilterType>("All");

  // ==========================================
  // FILTER TRIPS
  // ==========================================

  const filteredTrips = trips.filter((trip) => {
    const searchText =
      search.trim().toLowerCase();

    const title = String(
      trip.title || ""
    ).toLowerCase();

    const destination = String(
      trip.destination || ""
    ).toLowerCase();

    const matchesSearch =
      searchText === "" ||
      title.includes(searchText) ||
      destination.includes(searchText);

    const matchesFilter =
      activeFilter === "All" ||
      (activeFilter === "Upcoming" &&
        trip.progress < 100) ||
      (activeFilter === "Completed" &&
        trip.progress === 100);

    return (
      matchesSearch && matchesFilter
    );
  });

  // ==========================================
  // CLEAR SEARCH
  // ==========================================

  const clearSearch = () => {
    setSearch("");
  };

  // ==========================================
  // GO HOME
  // ==========================================

  const goHome = () => {
    router.replace("/(tabs)");
  };

  // ==========================================
  // OPEN TRIP
  // ==========================================

  const openTrip = (tripId: string) => {
    router.push({
      pathname: "/destination/[id]",
      params: {
        id: tripId,
      },
    });
  };

  // ==========================================
  // SCREEN
  // ==========================================

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredTrips}
        keyExtractor={(item) =>
          String(item.id)
        }
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}

        // ======================================
        // HEADER
        // ======================================

        ListHeaderComponent={
          <View>
            {/* HEADER */}

            <View style={styles.header}>
              <Pressable
                style={styles.backButton}
                onPress={goHome}
              >
                <Text
                  style={
                    styles.backButtonText
                  }
                >
                  ‹
                </Text>
              </Pressable>

              <View
                style={
                  styles.headerTextContainer
                }
              >
                <Text style={styles.title}>
                  My Trips
                </Text>

                <Text
                  style={styles.subtitle}
                >
                  Plan, manage & enjoy your
                  journeys.
                </Text>
              </View>

              <Pressable
                style={styles.addButton}
                onPress={() =>
                  router.push("/create-trip")
                }
              >
                <Text
                  style={styles.addButtonText}
                >
                  +
                </Text>
              </Pressable>
            </View>

            {/* TRIP COUNT */}

            <Text style={styles.tripCount}>
              {trips.length}{" "}
              {trips.length === 1
                ? "trip"
                : "trips"}{" "}
              planned
            </Text>

            {/* SEARCH */}

            <View
              style={
                styles.searchContainer
              }
            >
              <Text
                style={styles.searchIcon}
              >
                ⌕
              </Text>

              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Search your trips..."
                placeholderTextColor={
                  Colors.textSecondary
                }
                style={styles.searchInput}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="search"
              />

              {search.length > 0 && (
                <Pressable
                  onPress={clearSearch}
                  style={styles.clearButton}
                >
                  <Text
                    style={styles.clearText}
                  >
                    ×
                  </Text>
                </Pressable>
              )}
            </View>

            {/* FILTERS */}

            <View
              style={
                styles.filterContainer
              }
            >
              {(
                [
                  "All",
                  "Upcoming",
                  "Completed",
                ] as FilterType[]
              ).map((filter) => {
                const isActive =
                  activeFilter === filter;

                return (
                  <Pressable
                    key={filter}
                    onPress={() =>
                      setActiveFilter(filter)
                    }
                    style={[
                      styles.filterButton,
                      isActive &&
                        styles.filterButtonActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.filterText,
                        isActive &&
                          styles.filterTextActive,
                      ]}
                    >
                      {filter}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {/* SECTION HEADER */}

            <View
              style={styles.sectionHeader}
            >
              <Text
                style={styles.sectionTitle}
              >
                Your Journeys
              </Text>

              <View
                style={styles.resultCount}
              >
                <Text
                  style={
                    styles.resultCountText
                  }
                >
                  {filteredTrips.length}
                </Text>
              </View>
            </View>
          </View>
        }

        // ======================================
        // TRIP CARDS
        // ======================================

        renderItem={({ item }) => (
          <TripCard
            trip={item}
            onPress={() =>
              openTrip(String(item.id))
            }
          />
        )}

        // ======================================
        // EMPTY STATE
        // ======================================

        ListEmptyComponent={
          <View
            style={styles.emptyContainer}
          >
            <Text
              style={styles.emptyIcon}
            >
              🧳
            </Text>

            <Text
              style={styles.emptyTitle}
            >
              No trips found
            </Text>

            <Text
              style={styles.emptySubtitle}
            >
              {search.trim().length > 0
                ? `We couldn't find any trip matching "${search}".`
                : "You don't have any trips in this category yet."}
            </Text>

            {search.length > 0 && (
              <Pressable
                style={
                  styles.clearSearchButton
                }
                onPress={clearSearch}
              >
                <Text
                  style={
                    styles.clearSearchButtonText
                  }
                >
                  Clear Search
                </Text>
              </Pressable>
            )}

            {search.length === 0 &&
              trips.length === 0 && (
                <Pressable
                  style={
                    styles.createTripButton
                  }
                  onPress={() =>
                    router.push(
                      "/create-trip"
                    )
                  }
                >
                  <Text
                    style={
                      styles.createTripButtonText
                    }
                  >
                    Create Your First Trip
                  </Text>
                </Pressable>
              )}
          </View>
        }
      />
    </SafeAreaView>
  );
}

// =====================================================
// STYLES
// =====================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    paddingHorizontal:
      Spacing.screenPadding,
    paddingTop: Spacing.lg,
    paddingBottom: 40,
  },

  // ==========================================
  // HEADER
  // ==========================================

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: Radius.round,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.sm,
  },

  backButtonText: {
    fontSize: 32,
    lineHeight: 34,
    color: Colors.text,
    fontWeight: "400",
  },

  headerTextContainer: {
    flex: 1,
    paddingRight: Spacing.md,
  },

  title: {
    fontSize: Typography.h1,
    fontWeight: "700",
    color: Colors.text,
  },

  subtitle: {
    marginTop: Spacing.xs,
    fontSize: Typography.body,
    color: Colors.textSecondary,
  },

  // ==========================================
  // ADD BUTTON
  // ==========================================

  addButton: {
    width: 46,
    height: 46,
    borderRadius: Radius.round,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  addButtonText: {
    color: Colors.white,
    fontSize: 28,
    fontWeight: "400",
  },

  // ==========================================
  // TRIP COUNT
  // ==========================================

  tripCount: {
    marginTop: Spacing.lg,
    fontSize: Typography.caption,
    fontWeight: "600",
    color: Colors.textSecondary,
  },

  // ==========================================
  // SEARCH
  // ==========================================

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 52,
    marginTop: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.lg,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  searchIcon: {
    fontSize: 24,
    color: Colors.textSecondary,
    marginRight: Spacing.sm,
  },

  searchInput: {
    flex: 1,
    height: "100%",
    fontSize: Typography.body,
    color: Colors.text,
  },

  clearButton: {
    paddingLeft: Spacing.sm,
    paddingVertical: Spacing.sm,
  },

  clearText: {
    fontSize: 24,
    color: Colors.textSecondary,
  },

  // ==========================================
  // FILTERS
  // ==========================================

  filterContainer: {
    flexDirection: "row",
    marginTop: Spacing.lg,
  },

  filterButton: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.round,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    marginRight: Spacing.sm,
  },

  filterButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },

  filterText: {
    fontSize: Typography.caption,
    fontWeight: "600",
    color: Colors.textSecondary,
  },

  filterTextActive: {
    color: Colors.white,
  },

  // ==========================================
  // SECTION
  // ==========================================

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Spacing.xxl,
    marginBottom: Spacing.lg,
  },

  sectionTitle: {
    fontSize: Typography.h3,
    fontWeight: "700",
    color: Colors.text,
  },

  resultCount: {
    marginLeft: Spacing.sm,
    minWidth: 26,
    height: 26,
    paddingHorizontal: 7,
    borderRadius: Radius.round,
    backgroundColor: Colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },

  resultCountText: {
    fontSize: Typography.caption,
    fontWeight: "700",
    color: Colors.textSecondary,
  },

  // ==========================================
  // EMPTY STATE
  // ==========================================

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 70,
    paddingHorizontal: Spacing.xxl,
  },

  emptyIcon: {
    fontSize: 58,
    marginBottom: Spacing.lg,
  },

  emptyTitle: {
    fontSize: Typography.h3,
    fontWeight: "700",
    color: Colors.text,
    textAlign: "center",
  },

  emptySubtitle: {
    marginTop: Spacing.sm,
    fontSize: Typography.body,
    lineHeight: 23,
    color: Colors.textSecondary,
    textAlign: "center",
  },

  clearSearchButton: {
    marginTop: Spacing.lg,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
    backgroundColor: Colors.primary,
  },

  clearSearchButtonText: {
    color: Colors.white,
    fontSize: Typography.caption,
    fontWeight: "700",
  },

  createTripButton: {
    marginTop: Spacing.lg,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
    backgroundColor: Colors.primary,
  },

  createTripButtonText: {
    color: Colors.white,
    fontSize: Typography.caption,
    fontWeight: "700",
  },
});