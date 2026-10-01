import {
    router,
    useLocalSearchParams,
} from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Dimensions,
    Image,
    Linking,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
    DestinationDetails,
    getDestinationDetails,
} from "../../services/geoapify";

import {
    PexelsPhoto,
    searchDestinationPhotos,
    searchRelatedPhotos,
} from "../../services/pexels";

const { width: SCREEN_WIDTH } =
  Dimensions.get("window");

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80";

export default function ApiDestinationScreen() {
  const params = useLocalSearchParams<{
    id: string;
    name?: string;
    country?: string;
    latitude?: string;
    longitude?: string;
  }>();

  const [destination, setDestination] =
    useState<DestinationDetails | null>(null);

  const [photos, setPhotos] =
    useState<PexelsPhoto[]>([]);

  const [relatedPhotos, setRelatedPhotos] =
    useState<PexelsPhoto[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [photosLoading, setPhotosLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [photosError, setPhotosError] =
    useState("");

  useEffect(() => {
    const loadDestination = async () => {
      try {
        setLoading(true);
        setError("");

        const result =
          await getDestinationDetails(
            String(params.id ?? "")
          );

        if (result) {
          setDestination(result);
        } else {
          setDestination({
            id: String(params.id ?? ""),
            name: String(
              params.name ?? "Unknown city"
            ),
            country: String(
              params.country ?? "Unknown country"
            ),
            latitude: Number(
              params.latitude ?? 0
            ),
            longitude: Number(
              params.longitude ?? 0
            ),
            formatted: `${String(
              params.name ?? "Unknown city"
            )}, ${String(
              params.country ?? "Unknown country"
            )}`,
          });
        }
      } catch (err) {
        console.log(
          "Destination details error:",
          err
        );

        setError(
          "Unable to load some destination details."
        );

        setDestination({
          id: String(params.id ?? ""),
          name: String(
            params.name ?? "Unknown city"
          ),
          country: String(
            params.country ?? "Unknown country"
          ),
          latitude: Number(
            params.latitude ?? 0
          ),
          longitude: Number(
            params.longitude ?? 0
          ),
          formatted: `${String(
            params.name ?? "Unknown city"
          )}, ${String(
            params.country ?? "Unknown country"
          )}`,
        });
      } finally {
        setLoading(false);
      }
    };

    loadDestination();
  }, [
    params.id,
    params.name,
    params.country,
    params.latitude,
    params.longitude,
  ]);

  useEffect(() => {
    const loadPhotos = async () => {
      const city = String(
        params.name ?? ""
      );

      const country = String(
        params.country ?? ""
      );

      if (!city) {
        setPhotosLoading(false);
        return;
      }

      try {
        setPhotosLoading(true);
        setPhotosError("");

        const [
          destinationResults,
          relatedResults,
        ] = await Promise.all([
          searchDestinationPhotos(
            city,
            country,
            8
          ),
          searchRelatedPhotos(
            city,
            country,
            8
          ),
        ]);

        setPhotos(destinationResults);
        setRelatedPhotos(relatedResults);
      } catch (err) {
        console.log(
          "Pexels photo error:",
          err
        );

        setPhotosError(
          "Unable to load destination photos."
        );

        setPhotos([]);
        setRelatedPhotos([]);
      } finally {
        setPhotosLoading(false);
      }
    };

    loadPhotos();
  }, [
    params.name,
    params.country,
  ]);

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <ActivityIndicator
            size="large"
            color="#6C63FF"
          />

          <Text style={styles.loadingText}>
            Loading destination...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // ==========================================
  // NOT FOUND
  // ==========================================

  if (!destination) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.errorEmoji}>
            🌍
          </Text>

          <Text style={styles.errorTitle}>
            Destination Not Found
          </Text>

          <Text style={styles.errorText}>
            We couldn't load this destination.
          </Text>

          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>
              Go Back
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const handlePlanTrip = () => {
    router.push({
      pathname: "/create-trip",
      params: {
        destination: destination.name,
        country: destination.country,
      },
    });
  };

  const galleryImages =
    photos.length > 0
      ? photos
      : [
          {
            id: 0,
            width: 1200,
            height: 800,
            photographer: "Unsplash",
            photographerUrl:
              "https://unsplash.com",
            imageUrl: FALLBACK_IMAGE,
            imageLarge: FALLBACK_IMAGE,
            pexelsUrl:
              "https://www.pexels.com",
          },
        ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.scrollContent
        }
      >
        {/* ==================================
            HEADER
        ================================== */}

        <View style={styles.header}>
          <Pressable
            style={styles.backCircle}
            onPress={() => router.back()}
          >
            <Text style={styles.backIcon}>
              ‹
            </Text>
          </Pressable>

          <Text style={styles.headerTitle}>
            Destination
          </Text>

          <View
            style={styles.headerPlaceholder}
          />
        </View>

        {/* ==================================
            PHOTO GALLERY
        ================================== */}

        <View style={styles.gallery}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={
              false
            }
            decelerationRate="fast"
          >
            {galleryImages.map(
              (photo, index) => (
                <View
                  key={`${photo.id}-${index}`}
                  style={styles.gallerySlide}
                >
                  <Image
                    source={{
                      uri:
                        photo.imageLarge ||
                        photo.imageUrl,
                    }}
                    style={styles.galleryImage}
                    resizeMode="cover"
                  />

                  <View
                    style={styles.galleryOverlay}
                  >
                    <Text
                      style={styles.imageTitle}
                    >
                      {destination.name}
                    </Text>

                    <Text
                      style={
                        styles.photoCredit
                      }
                    >
                      Photo by{" "}
                      {photo.photographer}
                    </Text>
                  </View>

                  <View
                    style={styles.photoNumber}
                  >
                    <Text
                      style={
                        styles.photoNumberText
                      }
                    >
                      {index + 1}/
                      {galleryImages.length}
                    </Text>
                  </View>
                </View>
              )
            )}
          </ScrollView>
        </View>

        {/* ==================================
            CONTENT
        ================================== */}

        <View style={styles.content}>
          <Text style={styles.name}>
            {destination.name}
          </Text>

          <Text style={styles.country}>
            📍 {destination.country}
          </Text>

          {error !== "" && (
            <View style={styles.warningBox}>
              <Text style={styles.warningText}>
                {error}
              </Text>
            </View>
          )}

          {photosError !== "" && (
            <View style={styles.warningBox}>
              <Text style={styles.warningText}>
                {photosError}
              </Text>
            </View>
          )}

          {/* ==================================
              PHOTO ATTRIBUTION
          ================================== */}

          {photos.length > 0 && (
            <Pressable
              style={styles.pexelsCredit}
              onPress={() => {
                Linking.openURL(
                  photos[0].pexelsUrl
                );
              }}
            >
              <Text
                style={styles.pexelsCreditText}
              >
                Photos provided by Pexels
              </Text>
            </Pressable>
          )}

          {/* ==================================
              LOCATION
          ================================== */}

          <View style={styles.locationCard}>
            <View style={styles.locationIcon}>
              <Text style={styles.locationEmoji}>
                🌐
              </Text>
            </View>

            <View style={styles.locationInfo}>
              <Text
                style={styles.locationTitle}
              >
                Location
              </Text>

              <Text
                style={styles.coordinates}
              >
                {destination.latitude.toFixed(
                  5
                )}
                {"  "}
                {destination.longitude.toFixed(
                  5
                )}
              </Text>
            </View>
          </View>

          {/* ==================================
              ABOUT
          ================================== */}

          <Text style={styles.sectionTitle}>
            About this destination
          </Text>

          <Text style={styles.description}>
            Explore {destination.name},{" "}
            {destination.country}, and start
            planning your next adventure.
            TripMate found this destination
            using real-time location data.
          </Text>

          {/* ==================================
              RELATED PHOTOS
          ================================== */}

          <View style={styles.relatedHeader}>
            <Text style={styles.sectionTitle}>
              Explore {destination.name}
            </Text>

            {photosLoading && (
              <ActivityIndicator
                size="small"
                color="#6C63FF"
              />
            )}
          </View>

          {relatedPhotos.length > 0 ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={
                false
              }
              contentContainerStyle={
                styles.relatedList
              }
            >
              {relatedPhotos.map(
                (photo) => (
                  <Pressable
                    key={photo.id}
                    style={styles.relatedCard}
                    onPress={() => {
                      Linking.openURL(
                        photo.pexelsUrl
                      );
                    }}
                  >
                    <Image
                      source={{
                        uri:
                          photo.imageUrl,
                      }}
                      style={
                        styles.relatedImage
                      }
                      resizeMode="cover"
                    />

                    <View
                      style={
                        styles.relatedOverlay
                      }
                    >
                      <Text
                        style={
                          styles.relatedText
                        }
                        numberOfLines={1}
                      >
                        {photo.photographer}
                      </Text>
                    </View>
                  </Pressable>
                )
              )}
            </ScrollView>
          ) : (
            !photosLoading && (
              <Text
                style={styles.noPhotosText}
              >
                No related photos available.
              </Text>
            )
          )}

          {/* ==================================
              PLAN TRIP
          ================================== */}

          <Pressable
            style={styles.planButton}
            onPress={handlePlanTrip}
          >
            <Text style={styles.planButtonText}>
              ✈️ Plan a Trip
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// =====================================================
// STYLES
// =====================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  scrollContent: {
    paddingBottom: 40,
  },

  // HEADER

  header: {
    height: 60,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
  },

  backIcon: {
    fontSize: 32,
    lineHeight: 34,
    color: "#111111",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111111",
  },

  headerPlaceholder: {
    width: 42,
  },

  // GALLERY

  gallery: {
    width: "100%",
    height: 300,
    backgroundColor: "#E2E8F0",
  },

  gallerySlide: {
    width: SCREEN_WIDTH,
    height: 300,
    position: "relative",
  },

  galleryImage: {
    width: "100%",
    height: "100%",
  },

  galleryOverlay: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 20,
  },

  imageTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#FFFFFF",
    textShadowColor:
      "rgba(0,0,0,0.5)",
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 4,
  },

  photoCredit: {
    marginTop: 4,
    fontSize: 11,
    color: "#FFFFFF",
  },

  photoNumber: {
    position: "absolute",
    top: 16,
    right: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor:
      "rgba(0,0,0,0.55)",
  },

  photoNumberText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  // CONTENT

  content: {
    padding: 20,
  },

  name: {
    fontSize: 30,
    fontWeight: "800",
    color: "#0F172A",
  },

  country: {
    marginTop: 8,
    fontSize: 16,
    color: "#64748B",
  },

  // WARNING

  warningBox: {
    marginTop: 16,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#FFF7ED",
  },

  warningText: {
    fontSize: 13,
    color: "#C2410C",
  },

  // PEXELS

  pexelsCredit: {
    alignSelf: "flex-start",
    marginTop: 10,
  },

  pexelsCreditText: {
    fontSize: 12,
    color: "#64748B",
    textDecorationLine: "underline",
  },

  // LOCATION

  locationCard: {
    marginTop: 22,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#F8FAFC",
    flexDirection: "row",
    alignItems: "center",
  },

  locationIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#EDE9FE",
    alignItems: "center",
    justifyContent: "center",
  },

  locationEmoji: {
    fontSize: 22,
  },

  locationInfo: {
    marginLeft: 13,
    flex: 1,
  },

  locationTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
  },

  coordinates: {
    marginTop: 4,
    fontSize: 13,
    color: "#64748B",
  },

  // ABOUT

  sectionTitle: {
    marginTop: 28,
    fontSize: 20,
    fontWeight: "700",
    color: "#0F172A",
  },

  description: {
    marginTop: 10,
    fontSize: 15,
    lineHeight: 23,
    color: "#64748B",
  },

  // RELATED

  relatedHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  relatedList: {
    paddingTop: 14,
    paddingRight: 20,
  },

  relatedCard: {
    width: 150,
    height: 110,
    marginRight: 12,
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: "#E2E8F0",
  },

  relatedImage: {
    width: "100%",
    height: "100%",
  },

  relatedOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 8,
    paddingVertical: 7,
    backgroundColor:
      "rgba(0,0,0,0.45)",
  },

  relatedText: {
    fontSize: 11,
    color: "#FFFFFF",
    fontWeight: "600",
  },

  noPhotosText: {
    marginTop: 12,
    fontSize: 14,
    color: "#94A3B8",
  },

  // PLAN BUTTON

  planButton: {
    height: 54,
    marginTop: 28,
    borderRadius: 16,
    backgroundColor: "#6C63FF",
    alignItems: "center",
    justifyContent: "center",
  },

  planButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  // LOADING / ERROR

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },

  loadingText: {
    marginTop: 14,
    fontSize: 15,
    color: "#64748B",
  },

  errorEmoji: {
    fontSize: 60,
  },

  errorTitle: {
    marginTop: 15,
    fontSize: 24,
    fontWeight: "700",
    color: "#111111",
  },

  errorText: {
    marginTop: 8,
    fontSize: 15,
    color: "#64748B",
    textAlign: "center",
  },

  backButton: {
    marginTop: 24,
    paddingHorizontal: 24,
    paddingVertical: 13,
    borderRadius: 12,
    backgroundColor: "#6C63FF",
  },

  backButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});