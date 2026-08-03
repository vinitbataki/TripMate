import React from "react";
import {
    StyleSheet,
    Text,
    View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

type Props = {
  rating: number;
  location: string;
};

export default function RatingCard({
  rating,
  location,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Ionicons
          name="star"
          size={18}
          color="#FACC15"
        />

        <Text style={styles.rating}>
          {rating}
        </Text>
      </View>

      <View style={styles.row}>
        <Ionicons
          name="location"
          size={18}
          color="#6C63FF"
        />

        <Text style={styles.location}>
          {location}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  rating: {
    marginLeft: 5,
    fontWeight: "700",
    fontSize: 16,
  },

  location: {
    marginLeft: 5,
    color: "#64748B",
    fontSize: 15,
  },
});