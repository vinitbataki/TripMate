import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Animated,
  FlatList,
  Pressable,
  StyleSheet,
  Text
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NextButton from "../../components/onboarding/NextButton";
import OnboardingItem from "../../components/onboarding/OnboardingItem";
import Paginator from "../../components/onboarding/Paginator";
import { onboardingData } from "../../constants/onboardingData";
import { completeOnboarding } from "../../utils/storage";

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slidesRef = useRef<FlatList>(null);

  const scrollX = useRef(new Animated.Value(0)).current;

  const viewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  const handleNext = async () => {
    if (currentIndex < onboardingData.length - 1) {
      slidesRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      await completeOnboarding();
      router.replace("/(auth)/login");
    }
  };

  const handleSkip = async () => {
    await completeOnboarding();
    router.replace("/(auth)/login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </Pressable>

      <FlatList
        ref={slidesRef}
        data={onboardingData}
        renderItem={({ item }) => <OnboardingItem item={item} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={32}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
      />

      <Paginator
        data={onboardingData}
        currentIndex={currentIndex}
      />

      <NextButton
        isLastSlide={currentIndex === onboardingData.length - 1}
        onPress={handleNext}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  skipButton: {
    alignSelf: "flex-end",
    marginTop: 10,
    marginRight: 24,
  },

  skipText: {
    color: "#6C63FF",
    fontSize: 16,
    fontWeight: "700",
  },
});