import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Colors from "../../../constants/colors";
import Radius from "../../../constants/radius";
import Spacing from "../../../constants/spacing";
import Typography from "../../../constants/typography";

import { Trip } from "../../../types/trip";

interface TripCardProps {
  trip: Trip;
  onPress?: () => void;
}

export default function TripCard({
  trip,
  onPress,
}: TripCardProps) {
  return (
    <Pressable
      style={styles.card}
      onPress={onPress}
    >
      {trip.image ? (
        <Image
          source={{ uri: trip.image }}
          style={styles.image}
        />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderText}>
            🏝️
          </Text>
        </View>
      )}

      <View style={styles.content}>
        <Text style={styles.title}>
          {trip.title}
        </Text>

        <Text style={styles.destination}>
          📍 {trip.destination}
        </Text>

        <View style={styles.row}>
          <Text style={styles.info}>
            📅 {trip.startDate} -{" "}
            {trip.endDate}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.info}>
            👥 {trip.travelers}{" "}
            {trip.travelers === 1
              ? "Traveler"
              : "Travelers"}
          </Text>

          <Text style={styles.info}>
            💰 ₹
            {Number(
              trip.budget || 0
            ).toLocaleString()}
          </Text>
        </View>

        <View
          style={styles.progressBackground}
        >
          <View
            style={[
              styles.progressFill,
              {
                width: `${Math.min(
                  Math.max(
                    trip.progress || 0,
                    0
                  ),
                  100
                )}%`,
              },
            ]}
          />
        </View>

        <Text style={styles.progressText}>
          {trip.progress || 0}% Completed
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: Radius.xxl,
    overflow: "hidden",
    marginBottom: Spacing.xl,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 4,
  },

  image: {
    width: "100%",
    height: 180,
  },

  imagePlaceholder: {
    width: "100%",
    height: 180,
    backgroundColor: Colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },

  placeholderText: {
    fontSize: 55,
  },

  content: {
    padding: Spacing.cardPadding,
  },

  title: {
    fontSize: Typography.h4,
    fontWeight: "700",
    color: Colors.text,
  },

  destination: {
    marginTop: Spacing.sm,
    fontSize: Typography.body,
    color: Colors.textSecondary,
  },

  row: {
    marginTop: Spacing.md,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  info: {
    fontSize: Typography.bodySmall,
    color: Colors.textSecondary,
  },

  progressBackground: {
    marginTop: Spacing.lg,
    height: 8,
    backgroundColor: Colors.divider,
    borderRadius: Radius.round,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: Colors.primary,
    borderRadius: Radius.round,
  },

  progressText: {
    marginTop: Spacing.sm,
    fontSize: Typography.caption,
    color: Colors.textSecondary,
    fontWeight: "600",
  },
});