import React from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  router,
  useLocalSearchParams,
} from "expo-router";

import { SafeAreaView } from "react-native-safe-area-context";

import { useItinerary } from "../../context/ItineraryContext";
import { useTrips } from "../../context/TripsContext";

import Colors from "../../constants/colors";
import Radius from "../../constants/radius";
import Spacing from "../../constants/spacing";
import Typography from "../../constants/typography";

export default function DestinationDetailsScreen() {
  // ==========================================
  // GET TRIP ID
  // ==========================================

  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const tripId = String(id);

  // ==========================================
  // TRIPS
  // ==========================================

  const { trips, deleteTrip } = useTrips();

  // ==========================================
  // ITINERARY
  // ==========================================

  const {
    items,
    deleteItem,
  } = useItinerary();

  // ==========================================
  // FIND TRIP
  // ==========================================

  const trip = trips.find(
    (item) => String(item.id) === tripId
  );

  // ==========================================
  // FIND ITINERARY ITEMS
  // ==========================================

  const tripItems = items.filter(
    (item: any) =>
      String(item.tripId) === tripId
  );

  // ==========================================
  // TRIP NOT FOUND
  // ==========================================

  if (!trip) {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={styles.notFoundContainer}
        >
          <Text style={styles.notFoundIcon}>
            🧳
          </Text>

          <Text
            style={styles.notFoundTitle}
          >
            Trip Not Found
          </Text>

          <Text style={styles.notFoundText}>
            This trip may have been deleted
            or is no longer available.
          </Text>

          <Pressable
            style={styles.backButtonLarge}
            onPress={() =>
              router.replace(
                "/(tabs)/trips"
              )
            }
          >
            <Text
              style={
                styles.backButtonLargeText
              }
            >
              Back to My Trips
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  // ==========================================
  // EDIT TRIP
  // ==========================================

  const handleEditTrip = () => {
    router.push({
      pathname: "/edit-trip/[id]",
      params: {
        id: tripId,
      },
    });
  };

  // ==========================================
  // ADD ACTIVITY
  // ==========================================

  const handleAddActivity = () => {
    router.push({
      pathname: "/add-itinerary/[tripID]",
      params: {
        tripID: tripId,
      },
    });
  };

  // ==========================================
  // EDIT ACTIVITY
  // ==========================================

  const handleEditActivity = (
    activityId: string
  ) => {
    router.push({
      pathname: "/edit-itinerary/[id]",
      params: {
        id: activityId,
      },
    });
  };

  // ==========================================
  // DELETE ACTIVITY
  // ==========================================

  const handleDeleteActivity = (
    activityId: string
  ) => {
    Alert.alert(
      "Delete Activity",
      "Are you sure you want to delete this activity?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteItem(activityId);
          },
        },
      ]
    );
  };

  // ==========================================
  // DELETE TRIP
  // ==========================================

  const handleDeleteTrip = () => {
    Alert.alert(
      "Delete Trip",
      "Are you sure you want to delete this trip? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteTrip(tripId);

            router.replace(
              "/(tabs)/trips"
            );
          },
        },
      ]
    );
  };

  // ==========================================
  // SCREEN
  // ==========================================

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* ==================================
            HEADER
        ================================== */}

        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backText}>
              ‹
            </Text>
          </Pressable>

          <Text style={styles.headerTitle}>
            Trip Details
          </Text>

          <Pressable
            style={styles.headerEditButton}
            onPress={handleEditTrip}
          >
            <Text
              style={
                styles.headerEditText
              }
            >
              Edit
            </Text>
          </Pressable>
        </View>

        {/* ==================================
            TRIP IMAGE
        ================================== */}

        {trip.image ? (
          <Image
            source={{
              uri: trip.image,
            }}
            style={styles.tripImage}
          />
        ) : (
          <View
            style={styles.imagePlaceholder}
          >
            <Text
              style={
                styles.imagePlaceholderText
              }
            >
              🏞️
            </Text>
          </View>
        )}

        {/* ==================================
            TRIP INFORMATION
        ================================== */}

        <View style={styles.tripCard}>
          <Text style={styles.tripTitle}>
            {trip.title}
          </Text>

          <Text
            style={styles.destination}
          >
            📍 {trip.destination}
          </Text>

          {/* DATES */}

          <View style={styles.infoRow}>
            <View
              style={styles.infoBlock}
            >
              <Text style={styles.infoLabel}>
                Start Date
              </Text>

              <Text style={styles.infoValue}>
                📅 {trip.startDate}
              </Text>
            </View>

            <View
              style={styles.infoBlock}
            >
              <Text style={styles.infoLabel}>
                End Date
              </Text>

              <Text style={styles.infoValue}>
                📅 {trip.endDate}
              </Text>
            </View>
          </View>

          {/* TRAVELERS + BUDGET */}

          <View style={styles.infoRow}>
            <View
              style={styles.infoBlock}
            >
              <Text style={styles.infoLabel}>
                Travelers
              </Text>

              <Text style={styles.infoValue}>
                👥 {trip.travelers}
              </Text>
            </View>

            <View
              style={styles.infoBlock}
            >
              <Text style={styles.infoLabel}>
                Budget
              </Text>

              <Text style={styles.infoValue}>
                ₹
                {trip.budget.toLocaleString()}
              </Text>
            </View>
          </View>

          {/* PROGRESS */}

          <View
            style={styles.progressSection}
          >
            <View
              style={styles.progressHeader}
            >
              <Text
                style={styles.progressLabel}
              >
                Trip Progress
              </Text>

              <Text
                style={styles.progressPercent}
              >
                {trip.progress}%
              </Text>
            </View>

            <View
              style={
                styles.progressBackground
              }
            >
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${Math.min(
                      Math.max(
                        trip.progress,
                        0
                      ),
                      100
                    )}%`,
                  },
                ]}
              />
            </View>
          </View>

          {/* EDIT TRIP */}

          <Pressable
            style={styles.editTripButton}
            onPress={handleEditTrip}
          >
            <Text
              style={
                styles.editTripButtonText
              }
            >
              ✏️ Edit Trip
            </Text>
          </Pressable>
        </View>

        {/* ==================================
            ITINERARY HEADER
        ================================== */}

        <View style={styles.sectionHeader}>
          <View>
            <Text
              style={styles.sectionTitle}
            >
              Itinerary
            </Text>

            <Text
              style={styles.sectionSubtitle}
            >
              Plan your activities and
              experiences.
            </Text>
          </View>

          <View
            style={styles.activityCount}
          >
            <Text
              style={
                styles.activityCountText
              }
            >
              {tripItems.length}
            </Text>
          </View>
        </View>

        {/* ==================================
            ADD ACTIVITY
        ================================== */}

        <Pressable
          style={styles.addActivityButton}
          onPress={handleAddActivity}
        >
          <Text
            style={styles.addActivityIcon}
          >
            +
          </Text>

          <Text
            style={
              styles.addActivityButtonText
            }
          >
            Add Activity
          </Text>
        </Pressable>

        {/* ==================================
            EMPTY ITINERARY
        ================================== */}

        {tripItems.length === 0 && (
          <View
            style={styles.emptyItinerary}
          >
            <Text
              style={styles.emptyIcon}
            >
              🗓️
            </Text>

            <Text
              style={styles.emptyTitle}
            >
              No activities yet
            </Text>

            <Text
              style={styles.emptyText}
            >
              Start planning your journey
              by adding your first activity.
            </Text>
          </View>
        )}

        {/* ==================================
            ITINERARY ITEMS
        ================================== */}

        {tripItems.map(
          (item: any, index: number) => (
            <View
              key={String(
                item.id ?? index
              )}
              style={styles.activityCard}
            >
              {/* ACTIVITY TOP */}

              <View
                style={
                  styles.activityTop
                }
              >
                <View
                  style={
                    styles.activityNumber
                  }
                >
                  <Text
                    style={
                      styles.activityNumberText
                    }
                  >
                    {index + 1}
                  </Text>
                </View>

                <View
                  style={
                    styles.activityMain
                  }
                >
                  <Text
                    style={
                      styles.activityTitle
                    }
                  >
                    {item.title ||
                      item.name ||
                      "Activity"}
                  </Text>

                  {item.location && (
                    <Text
                      style={
                        styles.activityLocation
                      }
                    >
                      📍 {item.location}
                    </Text>
                  )}
                </View>
              </View>

              {/* ACTIVITY DETAILS */}

              {(item.date ||
                item.time ||
                item.description) && (
                <View
                  style={
                    styles.activityDetails
                  }
                >
                  {item.date && (
                    <Text
                      style={
                        styles.activityInfo
                      }
                    >
                      📅 {item.date}
                    </Text>
                  )}

                  {item.time && (
                    <Text
                      style={
                        styles.activityInfo
                      }
                    >
                      ⏰ {item.time}
                    </Text>
                  )}

                  {item.description && (
                    <Text
                      style={
                        styles.activityDescription
                      }
                    >
                      {item.description}
                    </Text>
                  )}
                </View>
              )}

              {/* ACTIVITY ACTIONS */}

              <View
                style={
                  styles.activityActions
                }
              >
                <Pressable
                  style={
                    styles.editActivityButton
                  }
                  onPress={() =>
                    handleEditActivity(
                      String(item.id)
                    )
                  }
                >
                  <Text
                    style={
                      styles.editActivityText
                    }
                  >
                    ✏️ Edit
                  </Text>
                </Pressable>

                <Pressable
                  style={
                    styles.deleteActivityButton
                  }
                  onPress={() =>
                    handleDeleteActivity(
                      String(item.id)
                    )
                  }
                >
                  <Text
                    style={
                      styles.deleteActivityText
                    }
                  >
                    Delete
                  </Text>
                </Pressable>
              </View>
            </View>
          )
        )}

        {/* ==================================
            DELETE TRIP
        ================================== */}

        <Pressable
          style={styles.deleteTripButton}
          onPress={handleDeleteTrip}
        >
          <Text
            style={
              styles.deleteTripButtonText
            }
          >
            Delete Trip
          </Text>
        </Pressable>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
}

// =====================================================
// STYLES
// =====================================================

const styles = StyleSheet.create({
  // ==========================================
  // SCREEN
  // ==========================================

  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    paddingHorizontal:
      Spacing.screenPadding,
    paddingTop: Spacing.md,
    paddingBottom: 40,
  },

  // ==========================================
  // HEADER
  // ==========================================

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.lg,
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
  },

  backText: {
    fontSize: 32,
    lineHeight: 34,
    color: Colors.text,
  },

  headerTitle: {
    flex: 1,
    marginLeft: Spacing.md,
    fontSize: Typography.h2,
    fontWeight: "700",
    color: Colors.text,
  },

  headerEditButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.round,
    backgroundColor: Colors.primary,
  },

  headerEditText: {
    fontSize: Typography.caption,
    fontWeight: "700",
    color: Colors.white,
  },

  // ==========================================
  // IMAGE
  // ==========================================

  tripImage: {
    width: "100%",
    height: 220,
    borderRadius: Radius.xxl,
    backgroundColor: Colors.surface,
  },

  imagePlaceholder: {
    width: "100%",
    height: 220,
    borderRadius: Radius.xxl,
    backgroundColor: Colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },

  imagePlaceholderText: {
    fontSize: 64,
  },

  // ==========================================
  // TRIP CARD
  // ==========================================

  tripCard: {
    marginTop: Spacing.lg,
    padding: Spacing.cardPadding,
    backgroundColor: Colors.card,
    borderRadius: Radius.xxl,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  tripTitle: {
    fontSize: Typography.h2,
    fontWeight: "700",
    color: Colors.text,
  },

  destination: {
    marginTop: Spacing.sm,
    fontSize: Typography.body,
    color: Colors.textSecondary,
  },

  // ==========================================
  // INFO
  // ==========================================

  infoRow: {
    flexDirection: "row",
    marginTop: Spacing.lg,
  },

  infoBlock: {
    flex: 1,
  },

  infoLabel: {
    fontSize: Typography.caption,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },

  infoValue: {
    fontSize: Typography.body,
    fontWeight: "600",
    color: Colors.text,
  },

  // ==========================================
  // PROGRESS
  // ==========================================

  progressSection: {
    marginTop: Spacing.xl,
  },

  progressHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.sm,
  },

  progressLabel: {
    fontSize: Typography.caption,
    fontWeight: "600",
    color: Colors.textSecondary,
  },

  progressPercent: {
    fontSize: Typography.caption,
    fontWeight: "700",
    color: Colors.primary,
  },

  progressBackground: {
    height: 8,
    borderRadius: Radius.round,
    backgroundColor: Colors.divider,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    borderRadius: Radius.round,
    backgroundColor: Colors.primary,
  },

  // ==========================================
  // EDIT TRIP
  // ==========================================

  editTripButton: {
    height: 48,
    marginTop: Spacing.lg,
    borderRadius: Radius.md,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  editTripButtonText: {
    fontSize: Typography.body,
    fontWeight: "700",
    color: Colors.primary,
  },

  // ==========================================
  // SECTION
  // ==========================================

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Spacing.xxl,
    marginBottom: Spacing.md,
  },

  sectionTitle: {
    fontSize: Typography.h2,
    fontWeight: "700",
    color: Colors.text,
  },

  sectionSubtitle: {
    marginTop: Spacing.xs,
    fontSize: Typography.caption,
    color: Colors.textSecondary,
  },

  activityCount: {
    minWidth: 30,
    height: 30,
    marginLeft: Spacing.sm,
    paddingHorizontal: 8,
    borderRadius: Radius.round,
    backgroundColor: Colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },

  activityCountText: {
    fontSize: Typography.caption,
    fontWeight: "700",
    color: Colors.textSecondary,
  },

  // ==========================================
  // ADD ACTIVITY
  // ==========================================

  addActivityButton: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Radius.md,
    backgroundColor: Colors.primary,
  },

  addActivityIcon: {
    fontSize: 24,
    fontWeight: "400",
    color: Colors.white,
    marginRight: Spacing.sm,
  },

  addActivityButtonText: {
    fontSize: Typography.body,
    fontWeight: "700",
    color: Colors.white,
  },

  // ==========================================
  // EMPTY
  // ==========================================

  emptyItinerary: {
    marginTop: Spacing.lg,
    paddingVertical: 40,
    paddingHorizontal: Spacing.xl,
    borderRadius: Radius.xxl,
    backgroundColor: Colors.surface,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },

  emptyIcon: {
    fontSize: 48,
    marginBottom: Spacing.md,
  },

  emptyTitle: {
    fontSize: Typography.h3,
    fontWeight: "700",
    color: Colors.text,
    textAlign: "center",
  },

  emptyText: {
    marginTop: Spacing.sm,
    fontSize: Typography.body,
    lineHeight: 22,
    color: Colors.textSecondary,
    textAlign: "center",
  },

  // ==========================================
  // ACTIVITY CARD
  // ==========================================

  activityCard: {
    marginTop: Spacing.md,
    padding: Spacing.cardPadding,
    backgroundColor: Colors.card,
    borderRadius: Radius.xxl,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  activityTop: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  activityNumber: {
    width: 34,
    height: 34,
    borderRadius: Radius.round,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },

  activityNumberText: {
    fontSize: Typography.caption,
    fontWeight: "700",
    color: Colors.white,
  },

  activityMain: {
    flex: 1,
  },

  activityTitle: {
    fontSize: Typography.body,
    fontWeight: "700",
    color: Colors.text,
  },

  activityLocation: {
    marginTop: Spacing.xs,
    fontSize: Typography.caption,
    color: Colors.textSecondary,
  },

  // ==========================================
  // ACTIVITY DETAILS
  // ==========================================

  activityDetails: {
    marginTop: Spacing.md,
  },

  activityInfo: {
    marginTop: Spacing.xs,
    fontSize: Typography.caption,
    color: Colors.textSecondary,
  },

  activityDescription: {
    marginTop: Spacing.sm,
    fontSize: Typography.bodySmall,
    lineHeight: 21,
    color: Colors.textSecondary,
  },

  // ==========================================
  // ACTIVITY ACTIONS
  // ==========================================

  activityActions: {
    flexDirection: "row",
    marginTop: Spacing.lg,
    gap: Spacing.sm,
  },

  editActivityButton: {
    flex: 1,
    height: 42,
    borderRadius: Radius.md,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  editActivityText: {
    fontSize: Typography.caption,
    fontWeight: "700",
    color: Colors.primary,
  },

  deleteActivityButton: {
    flex: 1,
    height: 42,
    borderRadius: Radius.md,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: "#D32F2F",
    alignItems: "center",
    justifyContent: "center",
  },

  deleteActivityText: {
    fontSize: Typography.caption,
    fontWeight: "700",
    color: "#D32F2F",
  },

  // ==========================================
  // DELETE TRIP
  // ==========================================

  deleteTripButton: {
    height: 52,
    marginTop: Spacing.xxl,
    borderRadius: Radius.md,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: "#D32F2F",
    alignItems: "center",
    justifyContent: "center",
  },

  deleteTripButtonText: {
    fontSize: Typography.body,
    fontWeight: "700",
    color: "#D32F2F",
  },

  // ==========================================
  // NOT FOUND
  // ==========================================

  notFoundContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.xxl,
  },

  notFoundIcon: {
    fontSize: 64,
    marginBottom: Spacing.lg,
  },

  notFoundTitle: {
    fontSize: Typography.h2,
    fontWeight: "700",
    color: Colors.text,
    textAlign: "center",
  },

  notFoundText: {
    marginTop: Spacing.sm,
    fontSize: Typography.body,
    lineHeight: 22,
    color: Colors.textSecondary,
    textAlign: "center",
  },

  backButtonLarge: {
    marginTop: Spacing.xl,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
    backgroundColor: Colors.primary,
  },

  backButtonLargeText: {
    fontSize: Typography.body,
    fontWeight: "700",
    color: Colors.white,
  },

  bottomSpace: {
    height: 30,
  },
});