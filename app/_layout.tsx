import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";

import { ItineraryProvider } from "../context/ItineraryContext";
import { TripsProvider } from "../context/TripsContext";
import { AuthProvider } from "../contexts/AuthContext";
import { ExpenseProvider } from "../contexts/ExpenseContext";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <ThemeProvider
        value={
          colorScheme === "dark"
            ? DarkTheme
            : DefaultTheme
        }
      >
        <ItineraryProvider>
          <TripsProvider>
            <ExpenseProvider>
              <Stack
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen
                  name="index"
                />

                <Stack.Screen
                  name="(auth)"
                />

                <Stack.Screen
                  name="(tabs)"
                />

                <Stack.Screen
                  name="modal"
                  options={{
                    presentation: "modal",
                  }}
                />

                <Stack.Screen
                  name="destination/[id]"
                />

                <Stack.Screen
                  name="edit-trip/[id]"
                />
              </Stack>

              <StatusBar style="auto" />
            </ExpenseProvider>
          </TripsProvider>
        </ItineraryProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}