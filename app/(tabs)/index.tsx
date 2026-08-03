import React from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import AIBanner from "../../components/home/AIBanner";
import CategoryCard from "../../components/home/CategoryCard";
import DestinationCard from "../../components/home/DestinationCard";
import Header from "../../components/home/Header";
import SearchBar from "../../components/home/SearchBar";
import SectionTitle from "../../components/home/SectionTitle";
import TrendingCard from "../../components/home/TrendingCard";

import { categories } from "../../constants/categories";
import { destinations } from "../../constants/destinations";
import { trending } from "../../constants/trending";

import { useAuth } from "../../contexts/AuthContext";

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <Header
          name={user?.displayName ?? "Traveler"}
        />

        {/* Search */}
        <SearchBar />

        {/* AI Banner */}
        <AIBanner />

        {/* Popular Destinations */}
        <SectionTitle title="Popular Destinations" />

        <FlatList
          horizontal
          data={destinations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DestinationCard item={item} />
          )}
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled
          contentContainerStyle={styles.destinationList}
        />

        {/* Categories */}
        <SectionTitle title="Categories" />

        <FlatList
          horizontal
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CategoryCard item={item} />
          )}
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled
          contentContainerStyle={styles.categoryList}
        />

        {/* Trending */}
        <SectionTitle title="Trending This Week" />

        <FlatList
          horizontal
          data={trending}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TrendingCard item={item} />
          )}
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled
          contentContainerStyle={styles.trendingList}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  destinationList: {
    paddingRight: 20,
  },

  categoryList: {
    paddingRight: 20,
    paddingBottom: 10,
  },

  trendingList: {
    paddingRight: 20,
    paddingBottom: 20,
  },
});