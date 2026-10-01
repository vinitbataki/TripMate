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

export default function EditItineraryScreen() {
  // ==========================================
  // GET ACTIVITY ID
  // ==========================================

  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  // ==========================================
  // ITINERARY CONTEXT
  // ==========================================

  const {
    items,
    updateItem,
    deleteItem,
  } = useItinerary();

  // ==========================================
  // FIND ACTIVITY
  // ==========================================

  const activity = items.find(
    (item) => String(item.id) === String(id)
  );

  // ==========================================
  // FORM STATE
  // ==========================================

  const [day, setDay] = useState(
    activity ? String(activity.day) : ""
  );

  const [title, setTitle] = useState(
    activity?.title ?? ""
  );

  const [time, setTime] = useState(
    activity?.time ?? ""
  );

  const [location, setLocation] = useState(
    activity?.location ?? ""
  );

  const [notes, setNotes] = useState(
    activity?.notes ?? ""
  );

  // ==========================================
  // ACTIVITY NOT FOUND
  // ==========================================

  if (!activity) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundIcon}>
            📋
          </Text>

          <Text style={styles.notFoundTitle}>
            Activity Not Found
          </Text>

          <Text style={styles.notFoundText}>
            This itinerary activity could not be
            found.
          </Text>

          <Pressable
            style={styles.backButtonLarge}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonLargeText}>
              Go Back
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

    const updatedActivity = {
      ...activity,
      day: Number(day),
      title: title.trim(),
      time: time.trim(),
      location: location.trim(),
      notes: notes.trim(),
    };

    updateItem(updatedActivity);

    Alert.alert(
      "Activity Updated",
      "Your activity has been updated successfully.",
      [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]
    );
  };

  // ==========================================
  // DELETE ACTIVITY
  // ==========================================

  const handleDelete = () => {
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
            deleteItem(String(activity.id));

            router.back();
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
                Edit Activity
              </Text>

              <Text style={styles.subtitle}>
                Update your itinerary activity.
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
              ACTIVITY
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
              placeholder="Add additional notes..."
              placeholderTextColor={
                Colors.textSecondary
              }
              multiline
              textAlignVertical="top"
              style={styles.notesInput}
            />
          </View>

          {/* ==================================
              SAVE
          ================================== */}

          <Pressable
            style={styles.saveButton}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>
              Save Changes
            </Text>
          </Pressable>

          {/* ==================================
              DELETE
          ================================== */}

          <Pressable
            style={styles.deleteButton}
            onPress={handleDelete}
          >
            <Text style={styles.deleteButtonText}>
              Delete Activity
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
    borderColor: Colors.border,
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
    fontSize: 56,
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