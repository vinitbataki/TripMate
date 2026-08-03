import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
} from "react-native";

import {
  Colors,
  Radius,
  Typography
} from "../../constants/theme";

type Props = {
  title: string;
  onPress: () => void;
};

export default function PrimaryButton({
  title,
  onPress,
}: Props) {
  return (
    <Pressable onPress={onPress}>
      <LinearGradient
        colors={[Colors.primary, Colors.primaryDark]}
        style={styles.button}
      >
        <Text style={styles.text}>
          {title}
        </Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 58,
    borderRadius: Radius.lg,
    justifyContent: "center",
    alignItems: "center",

    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,

    elevation: 8,
  },

  text: {
    color: Colors.white,
    fontSize: Typography.title,
    fontWeight: "700",
  },
});