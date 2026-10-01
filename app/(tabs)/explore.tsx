import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import Colors from "@/constants/colors";
import Radius from "@/constants/radius";
import Spacing from "@/constants/spacing";
import Typography from "@/constants/typography";

type Destination = {
  id: string;
  name: string;
  location: string;
  category: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const destinations: Destination[] = [
  {
    id: "1",
    name: "Goa",
    location: "India",
    category: "Beach",
    description: "Beaches, nightlife and relaxing coastal escapes.",
    icon: "sunny-outline",
  },
  {
    id: "2",
    name: "Manali",
    location: "Himachal Pradesh, India",
    category: "Mountains",
    description: "Snowy mountains, valleys and adventure.",
    icon: "snow-outline",
  },
  {
    id: "3",
    name: "Jaipur",
    location: "Rajasthan, India",
    category: "Heritage",
    description: "Royal palaces, forts and colourful markets.",
    icon: "business-outline",
  },
  {
    id: "4",
    name: "Udaipur",
    location: "Rajasthan, India",
    category: "Romantic",
    description: "Lakes, palaces and beautiful sunset views.",
    icon: "heart-outline",
  },
  {
    id: "5",
    name: "Rishikesh",
    location: "Uttarakhand, India",
    category: "Adventure",
    description: "Rafting, mountains, yoga and river views.",
    icon: "water-outline",
  },
  {
    id: "6",
    name: "Mumbai",
    location: "Maharashtra, India",
    category: "City",
    description: "Food, beaches, shopping and city experiences.",
    icon: "location-outline",
  },
  {
    id: "7",
    name: "Kerala",
    location: "India",
    category: "Nature",
    description: "Backwaters, greenery and peaceful getaways.",
    icon: "leaf-outline",
  },
  {
    id: "8",
    name: "Ladakh",
    location: "India",
    category: "Adventure",
    description: "High-altitude landscapes and unforgettable roads.",
    icon: "trail-sign-outline",
  },
];

const categories = [
  "All",
  "Beach",
  "Mountains",
  "Heritage",
  "Adventure",
  "Romantic",
  "Nature",
  "City",
];

export default function ExploreScreen() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredDestinations = useMemo(() => {
    const query = search.trim().toLowerCase();

    return destinations.filter((destination) => {
      const matchesCategory =
        selectedCategory === "All" ||
        destination.category === selectedCategory;

      const matchesSearch =
        query.length === 0 ||
        destination.name.toLowerCase().includes(query) ||
        destination.location.toLowerCase().includes(query) ||
        destination.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  const openDestination = (destination: Destination) => {
    router.push({
      pathname: "/destination/[id]",
      params: {
        id: destination.id,
      },
    });
  };

  const renderDestination = ({
    item,
  }: {
    item: Destination;
  }) => {
    return (
      <Pressable
        style={({ pressed }) => [
          styles.destinationCard,
          pressed && styles.pressed,
        ]}
        onPress={() => openDestination(item)}
      >
        <View style={styles.iconContainer}>
          <Ionicons
            name={item.icon}
            size={28}
            color={Colors.primary}
          />
        </View>

        <View style={styles.destinationContent}>
          <View style={styles.titleRow}>
            <Text style={styles.destinationName}>
              {item.name}
            </Text>

            <View style={styles.categoryBadge}>
              <Text style={styles.categoryBadgeText}>
                {item.category}
              </Text>
            </View>
          </View>

          <View style={styles.locationRow}>
            <Ionicons
              name="location-outline"
              size={14}
              color={Colors.textSecondary}
            />

            <Text style={styles.locationText}>
              {item.location}
            </Text>
          </View>

          <Text
            style={styles.description}
            numberOfLines={2}
          >
            {item.description}
          </Text>
        </View>

        <Ionicons
          name="chevron-forward"
          size={20}
          color={Colors.textSecondary}
        />
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Explore</Text>
          <Text style={styles.subtitle}>
            Discover your next destination
          </Text>
        </View>

        <Pressable
          style={styles.profileButton}
          onPress={() => router.push("/(tabs)/profile")}
        >
          <Ionicons
            name="person-outline"
            size={21}
            color={Colors.text}
          />
        </Pressable>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons
          name="search-outline"
          size={21}
          color={Colors.textSecondary}
        />

        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search destinations..."
          placeholderTextColor={Colors.textSecondary}
          style={styles.searchInput}
          returnKeyType="search"
        />

        {search.length > 0 && (
          <Pressable onPress={() => setSearch("")}>
            <Ionicons
              name="close-circle"
              size={20}
              color={Colors.textSecondary}
            />
          </Pressable>
        )}
      </View>

      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
        renderItem={({ item }) => {
          const active = item === selectedCategory;

          return (
            <Pressable
              onPress={() => setSelectedCategory(item)}
              style={[
                styles.categoryChip,
                active && styles.categoryChipActive,
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  active && styles.categoryTextActive,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          );
        }}
      />

      <View style={styles.resultsHeader}>
        <Text style={styles.resultsTitle}>
          Popular destinations
        </Text>

        <Text style={styles.resultCount}>
          {filteredDestinations.length} found
        </Text>
      </View>

      {filteredDestinations.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIcon}>
            <Ionicons
              name="search-outline"
              size={34}
              color={Colors.primary}
            />
          </View>

          <Text style={styles.emptyTitle}>
            No destinations found
          </Text>

          <Text style={styles.emptyText}>
            Try searching for another destination or
            category.
          </Text>

          <Pressable
            style={styles.clearButton}
            onPress={() => {
              setSearch("");
              setSelectedCategory("All");
            }}
          >
            <Text style={styles.clearButtonText}>
              Clear filters
            </Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={filteredDestinations}
          keyExtractor={(item) => item.id}
          renderItem={renderDestination}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.destinationList}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.screenPadding,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
  },

  title: {
    fontSize: Typography.h1,
    fontWeight: "700",
    color: Colors.text,
  },

  subtitle: {
    marginTop: Spacing.xs,
    fontSize: Typography.body,
    color: Colors.textSecondary,
  },

  profileButton: {
    width: 44,
    height: 44,
    borderRadius: Radius.round,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: Spacing.screenPadding,
    marginTop: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    height: 52,
    borderRadius: Radius.lg,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  searchInput: {
    flex: 1,
    marginLeft: Spacing.sm,
    marginRight: Spacing.sm,
    fontSize: Typography.body,
    color: Colors.text,
  },

  categoryList: {
    paddingHorizontal: Spacing.screenPadding,
    paddingVertical: Spacing.lg,
    gap: Spacing.sm,
  },

  categoryChip: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.round,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  categoryChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },

  categoryText: {
    fontSize: Typography.caption,
    fontWeight: "600",
    color: Colors.textSecondary,
  },

  categoryTextActive: {
    color: Colors.white,
  },

  resultsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.screenPadding,
    marginBottom: Spacing.md,
  },

  resultsTitle: {
    fontSize: Typography.title,
    fontWeight: "700",
    color: Colors.text,
  },

  resultCount: {
    fontSize: Typography.bodySmall,
    fontWeight: "700",
    color: Colors.textSecondary,
  },

  destinationList: {
    paddingHorizontal: Spacing.screenPadding,
    paddingBottom: Spacing.xxxl,
  },

  destinationCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md,
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  pressed: {
    opacity: 0.7,
  },

  iconContainer: {
    width: 54,
    height: 54,
    borderRadius: Radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.surface,
    marginRight: Spacing.md,
  },

  destinationContent: {
    flex: 1,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.xs,
  },

  destinationName: {
    flex: 1,
    fontSize: Typography.title,
    fontWeight: "700",
    color: Colors.text,
  },

  categoryBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: Radius.sm,
    backgroundColor: Colors.surface,
  },

  categoryBadgeText: {
    fontSize: Typography.bodySmall,
    fontWeight: "600",
    color: Colors.primary,
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.xs,
  },

  locationText: {
    marginLeft: 4,
    fontSize: Typography.bodySmall,
    color: Colors.textSecondary,
  },

  description: {
    fontSize: Typography.caption,
    lineHeight: 19,
    color: Colors.textSecondary,
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.xxxl,
    paddingBottom: Spacing.xxxl,
  },

  emptyIcon: {
    width: 72,
    height: 72,
    borderRadius: Radius.round,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.surface,
    marginBottom: Spacing.lg,
  },

  emptyTitle: {
    fontSize: Typography.h3,
    fontWeight: "700",
    color: Colors.text,
    textAlign: "center",
  },

  emptyText: {
    marginTop: Spacing.sm,
    fontSize: Typography.body,
    lineHeight: 22,
    color: Colors.textSecondary,
    textAlign: "center",
  },

  clearButton: {
    marginTop: Spacing.xl,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: Radius.lg,
    backgroundColor: Colors.primary,
  },

  clearButtonText: {
    fontSize: Typography.body,
    fontWeight: "700",
    color: Colors.white,
  },
});