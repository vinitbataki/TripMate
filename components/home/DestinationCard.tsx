import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Props = {
  item: {
    id: string;
    name: string;
    country: string;
    image: any;
    rating: number;
    price: string;
  };
};

export default function DestinationCard({ item }: Props) {
  const handlePress = () => {
    router.push({
      pathname: "/destination/[id]" as any,
      params: {
        id: item.id,
      },
    });
  };

  return (
    <Pressable
      style={styles.card}
      onPress={handlePress}
    >
      <Image
        source={item.image}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.name}>
          {item.name}
        </Text>

        <Text style={styles.country}>
          {item.country}
        </Text>

        <View style={styles.bottomRow}>
          <View style={styles.ratingRow}>
            <Ionicons
              name="star"
              size={16}
              color="#FACC15"
            />

            <Text style={styles.rating}>
              {item.rating}
            </Text>
          </View>

          <Text style={styles.price}>
            {item.price}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 190,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    marginRight: 16,
    overflow: "hidden",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,

    elevation: 5,
  },

  image: {
    width: "100%",
    height: 130,
  },

  content: {
    padding: 12,
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },

  country: {
    color: "#64748B",
    marginTop: 4,
    fontSize: 14,
  },

  bottomRow: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  rating: {
    marginLeft: 4,
    fontWeight: "600",
    color: "#0F172A",
  },

  price: {
    color: "#6C63FF",
    fontWeight: "700",
  },
});