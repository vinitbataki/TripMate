import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    Pressable,
    StyleSheet,
    Text,
} from "react-native";

type Props = {
  onPress?: () => void;
};

export default function GoogleButton({
  onPress,
}: Props) {
  return (
    <Pressable
      style={styles.button}
      onPress={onPress}
    >
      <Ionicons
        name="logo-google"
        size={22}
        color="#DB4437"
        style={{ marginRight: 10 }}
      />

      <Text style={styles.text}>
        Continue with Google
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 58,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0F172A",
  },
});