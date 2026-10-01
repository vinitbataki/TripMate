import React, { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

import {
    router,
    useLocalSearchParams,
} from "expo-router";

import { SafeAreaView } from "react-native-safe-area-context";

import { useTrips } from "../../context/TripsContext";

import Colors from "../../constants/colors";
import Radius from "../../constants/radius";
import Spacing from "../../constants/spacing";
import Typography from "../../constants/typography";

export default function EditTripScreen() {
  // ==========================================
  // GET TRIP ID
  // ==========================================

  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const tripId = String(id);

  // ==========================================
  // TRIPS CONTEXT
  // ==========================================

  const {
    trips,
    updateTrip,
    deleteTrip,
  } = useTrips();

  // ==========================================
  // FIND TRIP
  // ==========================================

  const trip = trips.find(
    (item) => String(item.id) === tripId
  );

  // ==========================================
  // FORM STATE
  // ==========================================

  const [tripName, setTripName] = useState(
    trip?.title ?? ""
  );

  const [destination, setDestination] =
    useState(trip?.destination ?? "");

  const [startDate, setStartDate] =
    useState(trip?.startDate ?? "");

  const [endDate, setEndDate] =
    useState(trip?.endDate ?? "");

  const [travelers, setTravelers] =
    useState(
      trip ? String(trip.travelers) : "1"
    );

  const [budget, setBudget] =
    useState(
      trip ? String(trip.budget) : ""
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
            We couldn't find this trip.
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
  // SAVE CHANGES
  // ==========================================

  const handleSave = () => {
    if (!tripName.trim()) {
      Alert.alert(
        "Missing information",
        "Please enter a trip name."
      );
      return;
    }

    if (!destination.trim()) {
      Alert.alert(
        "Missing information",
        "Please enter a destination."
      );
      return;
    }

    if (!startDate.trim()) {
      Alert.alert(
        "Missing information",
        "Please enter a start date."
      );
      return;
    }

    if (!endDate.trim()) {
      Alert.alert(
        "Missing information",
        "Please enter an end date."
      );
      return;
    }

    if (!travelers.trim()) {
      Alert.alert(
        "Missing information",
        "Please enter the number of travelers."
      );
      return;
    }

    const travelerNumber =
      Number(travelers);

    const budgetNumber =
      budget.trim() === ""
        ? 0
        : Number(budget);

    if (
      !Number.isFinite(travelerNumber) ||
      travelerNumber < 1
    ) {
      Alert.alert(
        "Invalid travelers",
        "Please enter a valid number of travelers."
      );
      return;
    }

    if (
      !Number.isFinite(budgetNumber) ||
      budgetNumber < 0
    ) {
      Alert.alert(
        "Invalid budget",
        "Please enter a valid budget."
      );
      return;
    }

    updateTrip({
      ...trip,
      title: tripName.trim(),
      destination: destination.trim(),
      startDate: startDate.trim(),
      endDate: endDate.trim(),
      travelers: travelerNumber,
      budget: budgetNumber,
    });

    Alert.alert(
      "Trip Updated 🎉",
      "Your trip has been updated successfully.",
      [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]
    );
  };

  // ==========================================
  // DELETE TRIP
  // ==========================================

  const handleDelete = () => {
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

            Alert.alert(
              "Trip Deleted",
              "Your trip has been deleted.",
              [
                {
                  text: "OK",
                  onPress: () =>
                    router.replace(
                      "/(tabs)/trips"
                    ),
                },
              ]
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
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : undefined
        }
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.content}
        >
          {/* ==================================
              HEADER
          ================================== */}

          <View style={styles.header}>
            <Pressable
              style={styles.backButton}
              onPress={() =>
                router.back()
              }
            >
              <Text style={styles.backText}>
                ‹
              </Text>
            </Pressable>

            <View style={styles.headerText}>
              <Text style={styles.title}>
                Edit Trip
              </Text>

              <Text
                style={styles.subtitle}
              >
                Update your trip details.
              </Text>
            </View>
          </View>

          {/* ==================================
              TRIP NAME
          ================================== */}

          <View
            style={styles.fieldContainer}
          >
            <Text style={styles.label}>
              Trip Name
            </Text>

            <TextInput
              value={tripName}
              onChangeText={setTripName}
              placeholder="e.g. Goa Weekend"
              placeholderTextColor={
                Colors.textSecondary
              }
              style={styles.input}
            />
          </View>

          {/* ==================================
              DESTINATION
          ================================== */}

          <View
            style={styles.fieldContainer}
          >
            <Text style={styles.label}>
              Destination
            </Text>

            <TextInput
              value={destination}
              onChangeText={setDestination}
              placeholder="e.g. Goa"
              placeholderTextColor={
                Colors.textSecondary
              }
              style={styles.input}
            />
          </View>

          {/* ==================================
              DATES
          ================================== */}

          <View style={styles.row}>
            <View style={styles.halfField}>
              <Text style={styles.label}>
                Start Date
              </Text>

              <TextInput
                value={startDate}
                onChangeText={setStartDate}
                placeholder="DD/MM/YYYY"
                placeholderTextColor={
                  Colors.textSecondary
                }
                style={styles.input}
              />
            </View>

            <View style={styles.halfField}>
              <Text style={styles.label}>
                End Date
              </Text>

              <TextInput
                value={endDate}
                onChangeText={setEndDate}
                placeholder="DD/MM/YYYY"
                placeholderTextColor={
                  Colors.textSecondary
                }
                style={styles.input}
              />
            </View>
          </View>

          {/* ==================================
              TRAVELERS
          ================================== */}

          <View
            style={styles.fieldContainer}
          >
            <Text style={styles.label}>
              Number of Travelers
            </Text>

            <TextInput
              value={travelers}
              onChangeText={setTravelers}
              placeholder="e.g. 2"
              placeholderTextColor={
                Colors.textSecondary
              }
              keyboardType="number-pad"
              style={styles.input}
            />
          </View>

          {/* ==================================
              BUDGET
          ================================== */}

          <View
            style={styles.fieldContainer}
          >
            <Text style={styles.label}>
              Budget
            </Text>

            <View
              style={styles.budgetContainer}
            >
              <Text style={styles.currency}>
                ₹
              </Text>

              <TextInput
                value={budget}
                onChangeText={setBudget}
                placeholder="e.g. 25000"
                placeholderTextColor={
                  Colors.textSecondary
                }
                keyboardType="numeric"
                style={styles.budgetInput}
              />
            </View>

            <Text
              style={styles.helperText}
            >
              You can change your budget
              later.
            </Text>
          </View>

          {/* ==================================
              SAVE BUTTON
          ================================== */}

          <Pressable
            style={styles.saveButton}
            onPress={handleSave}
          >
            <Text
              style={styles.saveButtonText}
            >
              Save Changes
            </Text>
          </Pressable>

          {/* ==================================
              DELETE BUTTON
          ================================== */}

          <Pressable
            style={styles.deleteButton}
            onPress={handleDelete}
          >
            <Text
              style={styles.deleteButtonText}
            >
              Delete Trip
            </Text>
          </Pressable>

          {/* ==================================
              CANCEL
          ================================== */}

          <Pressable
            style={styles.cancelButton}
            onPress={() =>
              router.back()
            }
          >
            <Text
              style={styles.cancelButtonText}
            >
              Cancel
            </Text>
          </Pressable>

          <View style={styles.bottomSpace} />
        </ScrollView>
      </KeyboardAvoidingView>
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

  keyboardContainer: {
    flex: 1,
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
    marginBottom: Spacing.xxl,
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
    marginRight: Spacing.md,
  },

  backText: {
    fontSize: 32,
    lineHeight: 34,
    color: Colors.text,
  },

  headerText: {
    flex: 1,
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
  // FORM
  // ==========================================

  fieldContainer: {
    marginBottom: Spacing.lg,
  },

  label: {
    marginBottom: Spacing.sm,
    fontSize: Typography.caption,
    fontWeight: "700",
    color: Colors.text,
  },

  input: {
    height: 52,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    fontSize: Typography.body,
    color: Colors.text,
  },

  row: {
    flexDirection: "row",
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },

  halfField: {
    flex: 1,
  },

  // ==========================================
  // BUDGET
  // ==========================================

  budgetContainer: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.lg,
  },

  currency: {
    fontSize: Typography.title,
    fontWeight: "700",
    color: Colors.text,
    marginRight: Spacing.sm,
  },

  budgetInput: {
    flex: 1,
    height: "100%",
    fontSize: Typography.body,
    color: Colors.text,
  },

  helperText: {
    marginTop: Spacing.xs,
    fontSize: Typography.caption,
    color: Colors.textSecondary,
  },

  // ==========================================
  // SAVE
  // ==========================================

  saveButton: {
    height: 54,
    borderRadius: Radius.md,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: Spacing.md,
  },

  saveButtonText: {
    fontSize: Typography.body,
    fontWeight: "700",
    color: Colors.white,
  },

  // ==========================================
  // DELETE
  // ==========================================

  deleteButton: {
    height: 52,
    borderRadius: Radius.md,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: "#D32F2F",
    alignItems: "center",
    justifyContent: "center",
    marginTop: Spacing.md,
  },

  deleteButtonText: {
    fontSize: Typography.body,
    fontWeight: "700",
    color: "#D32F2F",
  },

  // ==========================================
  // CANCEL
  // ==========================================

  cancelButton: {
    height: 52,
    borderRadius: Radius.md,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
    marginTop: Spacing.md,
  },

  cancelButtonText: {
    fontSize: Typography.body,
    fontWeight: "700",
    color: Colors.textSecondary,
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
    fontSize: 60,
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