import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  DestinationSearchResult,
  searchCities,
} from "../../services/geoapify";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<
    DestinationSearchResult[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (trimmedQuery.length < 2) {
      setResults([]);
      setError("");
      setLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        setError("");

        const data = await searchCities(
          trimmedQuery
        );

        setResults(data);
      } catch (err) {
        console.log(
          "Destination search error:",
          err
        );

        setResults([]);
        setError(
          "Unable to search destinations."
        );
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  const handleSelect = (
    destination: DestinationSearchResult
  ) => {
    setQuery(destination.name);
    setResults([]);

    router.push({
      pathname: "/api-destination/[id]",
      params: {
        id: destination.id,
        name: destination.name,
        country: destination.country,
        latitude: String(
          destination.latitude
        ),
        longitude: String(
          destination.longitude
        ),
      },
    });
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Ionicons
          name="search"
          size={21}
          color="#64748B"
        />

        <TextInput
          placeholder="Search destination..."
          style={styles.input}
          placeholderTextColor="#94A3B8"
          value={query}
          onChangeText={setQuery}
          autoCorrect={false}
          autoCapitalize="words"
        />

        {loading && (
          <ActivityIndicator
            size="small"
            color="#6C63FF"
          />
        )}
      </View>

      {error !== "" && (
        <View style={styles.messageContainer}>
          <Text style={styles.errorText}>
            {error}
          </Text>
        </View>
      )}

      {results.length > 0 && (
        <View style={styles.resultsContainer}>
          <FlatList
            data={results}
            keyExtractor={(item) =>
              String(item.id)
            }
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <Pressable
                style={styles.resultItem}
                onPress={() =>
                  handleSelect(item)
                }
              >
                <View
                  style={styles.locationIcon}
                >
                  <Ionicons
                    name="location-outline"
                    size={20}
                    color="#6C63FF"
                  />
                </View>

                <View
                  style={styles.resultTextContainer}
                >
                  <Text
                    style={styles.cityName}
                    numberOfLines={1}
                  >
                    {item.name}
                  </Text>

                  <Text
                    style={styles.countryName}
                    numberOfLines={1}
                  >
                    {item.state
                      ? `${item.state}, ${item.country}`
                      : item.country}
                  </Text>
                </View>
              </Pressable>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    zIndex: 100,
    marginBottom: 10,
  },

  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 55,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#0F172A",
  },

  resultsContainer: {
    position: "absolute",
    top: 62,
    left: 0,
    right: 0,
    maxHeight: 300,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    overflow: "hidden",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,

    elevation: 6,
  },

  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },

  locationIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#F1F0FF",
    alignItems: "center",
    justifyContent: "center",
  },

  resultTextContainer: {
    flex: 1,
    marginLeft: 12,
  },

  cityName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
  },

  countryName: {
    marginTop: 3,
    fontSize: 13,
    color: "#64748B",
  },

  messageContainer: {
    position: "absolute",
    top: 62,
    left: 0,
    right: 0,
    padding: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    zIndex: 100,
  },

  errorText: {
    fontSize: 13,
    color: "#DC2626",
  },
});