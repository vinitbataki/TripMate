import React from "react";
import {
    ImageBackground,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

type Props = {
  item: {
    id: string;
    name: string;
    image: any;
    rating: number;
    travelers: string;
  };
};

export default function TrendingCard({ item }: Props) {
  return (
    <Pressable style={styles.card}>
      <ImageBackground
        source={item.image}
        style={styles.image}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.overlay}>

          <Text style={styles.name}>
            {item.name}
          </Text>

          <View style={styles.bottomRow}>

            <View style={styles.ratingContainer}>
              <Ionicons
                name="star"
                size={16}
                color="#FFD700"
              />

              <Text style={styles.rating}>
                {item.rating}
              </Text>
            </View>

            <Text style={styles.travelers}>
              {item.travelers} Travelers
            </Text>

          </View>

          <Text style={styles.explore}>
            Explore Now →
          </Text>

        </View>
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 320,
    height: 190,
    marginRight: 18,
    borderRadius: 22,
    overflow: "hidden",
  },

  image: {
    flex: 1,
    justifyContent: "flex-end",
  },

  imageStyle: {
    borderRadius: 22,
  },

  overlay: {
    backgroundColor: "rgba(0,0,0,0.35)",
    padding: 18,
  },

  name: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "700",
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },

  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  rating: {
    color: "#FFFFFF",
    marginLeft: 5,
    fontWeight: "600",
  },

  travelers: {
    color: "#FFFFFF",
    fontSize: 13,
  },

  explore: {
    color: "#FFFFFF",
    fontWeight: "700",
    marginTop: 15,
  },
});