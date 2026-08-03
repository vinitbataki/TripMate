import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    View,
} from "react-native";

type Props = TextInputProps & {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  isPassword?: boolean;
};

export default function CustomInput({
  label,
  icon,
  isPassword = false,
  ...props
}: Props) {
  const [hidePassword, setHidePassword] = useState(isPassword);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.inputContainer}>
        <Ionicons
          name={icon}
          size={22}
          color="#94A3B8"
          style={styles.leftIcon}
        />

        <TextInput
          style={styles.input}
          placeholderTextColor="#94A3B8"
          secureTextEntry={hidePassword}
          {...props}
        />

        {isPassword && (
          <Pressable
            onPress={() => setHidePassword(!hidePassword)}
          >
            <Ionicons
              name={
                hidePassword ? "eye-off-outline" : "eye-outline"
              }
              size={22}
              color="#94A3B8"
            />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
    color: "#334155",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    height: 56,
    paddingHorizontal: 16,
  },

  leftIcon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: "#0F172A",
  },
});