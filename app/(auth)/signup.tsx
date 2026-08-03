import { router } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

import AuthHeader from "../../components/auth/AuthHeader";
import CustomInput from "../../components/auth/CustomInput";
import GoogleButton from "../../components/auth/GoogleButton";
import PrimaryButton from "../../components/auth/PrimaryButton";

import { signup } from "../../firebase/auth";

export default function SignupScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        "Error",
        "Password must be at least 6 characters."
      );
      return;
    }

    try {
      setLoading(true);

      await signup(name,email, password);

      Alert.alert(
        "Success",
        "Account created successfully!"
      );

      router.replace("/(auth)/login");

    } catch (error: any) {
      Alert.alert(
        "Signup Failed",
        error.message.replace("Firebase: ", "")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>

        <AuthHeader
          title="Create Account"
          subtitle="Join TripMate and start planning smarter trips"
        />

        <CustomInput
          label="Full Name"
          icon="person-outline"
          placeholder="Enter your full name"
          value={name}
          onChangeText={setName}
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
          placeholder="Create a password"
          value={password}
          onChangeText={setPassword}
          isPassword
        />

        <CustomInput
          label="Confirm Password"
          icon="lock-closed-outline"
          placeholder="Confirm password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          isPassword
        />

        <PrimaryButton
          title={loading ? "Creating Account..." : "Create Account"}
          onPress={handleSignup}
        />

        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.or}>OR</Text>
          <View style={styles.line} />
        </View>

        <GoogleButton />

        <View style={styles.bottomRow}>
          <Text style={styles.bottomText}>
            Already have an account?
          </Text>

          <Pressable
            onPress={() => router.replace("/(auth)/login")}
          >
            <Text style={styles.login}>
              Login
            </Text>
          </Pressable>
        </View>

      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    paddingHorizontal: 24,
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
    fontSize: 15,
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },

  bottomText: {
    color: "#64748B",
    fontSize: 15,
  },

  login: {
    marginLeft: 5,
    color: "#6C63FF",
    fontWeight: "700",
    fontSize: 15,
  },
});