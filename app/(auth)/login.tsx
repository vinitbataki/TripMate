import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";

import AuthHeader from "../../components/auth/AuthHeader";
import CustomInput from "../../components/auth/CustomInput";
import GoogleButton from "../../components/auth/GoogleButton";
import PrimaryButton from "../../components/auth/PrimaryButton";

import { login } from "../../firebase/auth";
import { auth } from "../../firebase/config";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    console.log("Login button pressed");

    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password.");
      return;
    }

    try {
      console.log("Calling Firebase...");

      const userCredential = await login(email, password);

      console.log("LOGIN SUCCESS");
      console.log("LOGIN USER:", userCredential.user);
      console.log("UID:", userCredential.user.uid);
      console.log("EMAIL:", userCredential.user.email);
      console.log("AUTH CURRENT USER:", auth.currentUser);

      router.replace("/(tabs)");

    } catch (error: any) {
      console.log("LOGIN ERROR:", error);

      Alert.alert(
        "Login Failed",
        error.message
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>

        <AuthHeader
          title="Welcome Back"
          subtitle="Login to continue planning your trips"
        />

        <CustomInput
          label="Email Address"
          icon="mail-outline"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <CustomInput
          label="Password"
          icon="lock-closed-outline"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          isPassword
        />

        <Text
          style={styles.forgot}
          onPress={() =>
            router.push("/(auth)/forgot-password")
          }
        >
          Forgot Password?
        </Text>

        <PrimaryButton
          title="Login"
          onPress={handleLogin}
        />

        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.or}>OR</Text>
          <View style={styles.line} />
        </View>

        <GoogleButton
          onPress={() =>
            console.log("Google Login")
          }
        />

        <View style={styles.bottomRow}>
          <Text style={styles.bottomText}>
            Don't have an account?
          </Text>

          <Text
            style={styles.signup}
            onPress={() =>
              router.replace("/(auth)/signup")
            }
          >
            Sign Up
          </Text>
        </View>

      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
  },

  forgot: {
    alignSelf: "flex-end",
    color: "#6C63FF",
    marginBottom: 24,
    fontWeight: "600",
  },

  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#CBD5E1",
  },

  or: {
    marginHorizontal: 12,
    color: "#94A3B8",
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 28,
  },

  bottomText: {
    color: "#64748B",
  },

  signup: {
    marginLeft: 5,
    color: "#6C63FF",
    fontWeight: "700",
  },
});