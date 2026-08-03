import React from "react";
import {
    Image,
    Pressable,
    StyleSheet,
    View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

type Props = {
  image: any;
};

export default function HeroImage({
  image,
}: Props) {
  return (
    <View style={styles.container}>
      <Image
        source={image}
        style={styles.image}
      />

      <Pressable style={styles.backButton}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="#FFFFFF"
        />
      </Pressable>

      <Pressable style={styles.favoriteButton}>
        <Ionicons
          name="heart-outline"
          size={24}
          color="#FFFFFF"
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },

  image: {
    width: "100%",
    height: 320,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  favoriteButton: {
    position: "absolute",
    top: 50,
    right: 20,
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
});