import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

type Props = {
  isLastSlide: boolean;
  onPress: () => void;
};

export default function NextButton({
  isLastSlide,
  onPress,
}: Props) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>
        {isLastSlide ? "Get Started" : "Next"}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#6C63FF",
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 24,
    marginBottom: 30,
  },

  text: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
});