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

import { useItinerary } from "../../context/ItineraryContext";

import Colors from "../../constants/colors";
import Radius from "../../constants/radius";
import Spacing from "../../constants/spacing";
import Typography from "../../constants/typography";

export default function AddItineraryScreen() {
  // ==========================================
  // GET TRIP ID
  // ==========================================

  const { tripID } = useLocalSearchParams<{
    tripID: string;
  }>();

  // Use the route parameter as tripId internally.
  const tripId = String(tripID);

  // ==========================================
  // ITINERARY CONTEXT
  // ==========================================

  const { addItem } = useItinerary();

  // ==========================================
  // FORM STATE
  // ==========================================

  const [day, setDay] = useState("1");
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");

  // ==========================================
  // ADD ACTIVITY
  // ==========================================

  const handleAddActivity = () => {
    if (!title.trim()) {
      Alert.alert(
        "Missing information",
        "Please enter an activity name."
      );
      return;
    }

    if (!day.trim()) {
      Alert.alert(
        "Missing information",
        "Please enter the day."
      );
      return;
    }

    const newActivity = {
      id: Date.now().toString(),
      tripId: tripId,
      day: Number(day),
      title: title.trim(),
      time: time.trim(),
      location: location.trim(),
      notes: notes.trim(),
    };

    addItem(newActivity);

    Alert.alert(
      "Activity Added",
      "Your activity has been added successfully.",
      [
        {
          text: "OK",
          onPress: () => {
            router.replace({
              pathname: "/destination/[id]",
              params: {
                id: tripId,
              },
            });
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
              onPress={() => router.back()}
            >
              <Text style={styles.backText}>
                ‹
              </Text>
            </Pressable>

            <View style={styles.headerText}>
              <Text style={styles.title}>
                Add Activity
              </Text>

              <Text style={styles.subtitle}>
                Add an activity to your itinerary.
              </Text>
            </View>
          </View>

          {/* ==================================
              DAY
          ================================== */}

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>
              Day
            </Text>

            <TextInput
              value={day}
              onChangeText={setDay}
              placeholder="e.g. 1"
              placeholderTextColor={
                Colors.textSecondary
              }
              keyboardType="number-pad"
              style={styles.input}
            />
          </View>

          {/* ==================================
              ACTIVITY NAME
          ================================== */}

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>
              Activity
            </Text>

            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="e.g. Visit Baga Beach"
              placeholderTextColor={
                Colors.textSecondary
              }
              style={styles.input}
            />
          </View>

          {/* ==================================
              TIME
          ================================== */}

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>
              Time
            </Text>

            <TextInput
              value={time}
              onChangeText={setTime}
              placeholder="e.g. 10:00 AM"
              placeholderTextColor={
                Colors.textSecondary
              }
              style={styles.input}
            />
          </View>

          {/* ==================================
              LOCATION
          ================================== */}

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>
              Location
            </Text>

            <TextInput
              value={location}
              onChangeText={setLocation}
              placeholder="e.g. Baga Beach"
              placeholderTextColor={
                Colors.textSecondary
              }
              style={styles.input}
            />
          </View>

          {/* ==================================
              NOTES
          ================================== */}

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>
              Notes
            </Text>

            <TextInput
              value={notes}
              onChangeText={setNotes}
              placeholder="Add any additional notes..."
              placeholderTextColor={
                Colors.textSecondary
              }
              multiline
              textAlignVertical="top"
              style={styles.notesInput}
            />
          </View>

          {/* ==================================
              ADD BUTTON
          ================================== */}

          <Pressable
            style={styles.addButton}
            onPress={handleAddActivity}
          >
            <Text style={styles.addButtonText}>
              Add Activity
            </Text>
          </Pressable>

          {/* ==================================
              CANCEL
          ================================== */}

          <Pressable
            style={styles.cancelButton}
            onPress={() => router.back()}
          >
            <Text style={styles.cancelButtonText}>
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
  // FIELDS
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

  notesInput: {
    minHeight: 120,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    fontSize: Typography.body,
    color: Colors.text,
  },

  // ==========================================
  // ADD BUTTON
  // ==========================================

  addButton: {
    height: 54,
    borderRadius: Radius.md,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: Spacing.md,
  },

  addButtonText: {
    fontSize: Typography.body,
    fontWeight: "700",
    color: Colors.white,
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

  bottomSpace: {
    height: 30,
  },
});