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

import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTrips } from "../context/TripsContext";

import Colors from "../constants/colors";
import Radius from "../constants/radius";
import Spacing from "../constants/spacing";
import Typography from "../constants/typography";

export default function CreateTripScreen() {
  const { addTrip } = useTrips();

  const [tripName, setTripName] = useState("");
  const [destination, setDestination] =
    useState("");
  const [startDate, setStartDate] =
    useState("");
  const [endDate, setEndDate] =
    useState("");
  const [travelers, setTravelers] =
    useState("1");
  const [budget, setBudget] = useState("");

  const handleCreateTrip = () => {
    // ==========================================
    // VALIDATION
    // ==========================================

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

    // ==========================================
    // CREATE NEW TRIP
    // ==========================================

    const newTrip = {
      id: Date.now().toString(),

      title: tripName.trim(),

      destination:
        destination.trim(),

      startDate:
        startDate.trim(),

      endDate:
        endDate.trim(),

      travelers:
        Number(travelers) || 1,

      budget:
        Number(budget) || 0,

      progress: 0,

      // Default image
      image:
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
    };

    // ==========================================
    // SAVE TO CONTEXT
    // ==========================================

    addTrip(newTrip);

    // ==========================================
    // SUCCESS
    // ==========================================

    Alert.alert(
      "Trip Created 🎉",
      `${newTrip.title} has been added to My Trips.`,
      [
        {
          text: "View Trip",
          onPress: () =>
            router.replace("/(tabs)/trips"),
        },
      ]
    );
  };

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
          contentContainerStyle={
            styles.content
          }
          keyboardShouldPersistTaps="handled"
        >
          {/* ======================================
              HEADER
          ====================================== */}

          <View style={styles.header}>
            <Pressable
              style={styles.backButton}
              onPress={() =>
                router.replace(
                  "/(tabs)/trips"
                )
              }
            >
              <Text style={styles.backText}>
                ‹
              </Text>
            </Pressable>

            <View style={styles.headerText}>
              <Text style={styles.title}>
                Create Trip
              </Text>

              <Text style={styles.subtitle}>
                Plan your next adventure.
              </Text>
            </View>
          </View>

          {/* ======================================
              TRIP NAME
          ====================================== */}

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

          {/* ======================================
              DESTINATION
          ====================================== */}

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

          {/* ======================================
              DATES
          ====================================== */}

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

          {/* ======================================
              TRAVELERS
          ====================================== */}

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

          {/* ======================================
              BUDGET
          ====================================== */}

          <View
            style={styles.fieldContainer}
          >
            <Text style={styles.label}>
              Budget
            </Text>

            <View
              style={
                styles.budgetContainer
              }
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
                style={
                  styles.budgetInput
                }
              />
            </View>

            <Text style={styles.helperText}>
              You can change your budget later.
            </Text>
          </View>

          {/* ======================================
              CREATE BUTTON
          ====================================== */}

          <Pressable
            style={styles.createButton}
            onPress={handleCreateTrip}
          >
            <Text
              style={
                styles.createButtonText
              }
            >
              Create Trip
            </Text>
          </Pressable>
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
    backgroundColor:
      Colors.background,
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

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.xxl,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: Radius.round,
    backgroundColor:
      Colors.surface,
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
    backgroundColor:
      Colors.surface,
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

  budgetContainer: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor:
      Colors.surface,
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

  createButton: {
    height: 54,
    borderRadius: Radius.md,
    backgroundColor:
      Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: Spacing.md,
  },

  createButtonText: {
    fontSize: Typography.body,
    fontWeight: "700",
    color: Colors.white,
  },
});