export type DestinationSearchResult = {
  id: string;
  name: string;
  country: string;
  state?: string;
  latitude: number;
  longitude: number;
  formatted: string;
};

export type DestinationDetails = {
  id: string;
  name: string;
  country: string;
  state?: string;
  latitude: number;
  longitude: number;
  formatted: string;
  image?: string;
};

const API_KEY =
  process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY;

const GEOCODING_URL =
  "https://api.geoapify.com/v1/geocode/autocomplete";

const PLACE_DETAILS_URL =
  "https://api.geoapify.com/v2/place-details";

export async function searchCities(
  query: string
): Promise<DestinationSearchResult[]> {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return [];
  }

  if (!API_KEY) {
    throw new Error(
      "Geoapify API key is missing."
    );
  }

  const params = new URLSearchParams({
    text: trimmedQuery,
    type: "city",
    format: "json",
    limit: "8",
    lang: "en",
    apiKey: API_KEY,
  });

  const response = await fetch(
    `${GEOCODING_URL}?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error(
      `Geoapify search failed: ${response.status}`
    );
  }

  const data = await response.json();

  if (!Array.isArray(data.results)) {
    return [];
  }

  return data.results
    .filter(
      (item: any) =>
        item.city || item.name
    )
    .map(
      (
        item: any,
        index: number
      ): DestinationSearchResult => ({
        id:
          item.place_id ??
          `${item.lat}-${item.lon}-${index}`,

        name:
          item.city ??
          item.name ??
          "Unknown city",

        country:
          item.country ??
          "Unknown country",

        state: item.state,

        latitude: Number(item.lat),

        longitude: Number(item.lon),

        formatted:
          item.formatted ??
          `${item.city ?? item.name}, ${
            item.country ?? ""
          }`,
      })
    );
}

export async function getDestinationDetails(
  destinationId: string
): Promise<DestinationDetails | null> {
  if (!API_KEY) {
    throw new Error(
      "Geoapify API key is missing."
    );
  }

  if (!destinationId) {
    return null;
  }

  const params = new URLSearchParams({
    id: destinationId,
    lang: "en",
    apiKey: API_KEY,
  });

  const response = await fetch(
    `${PLACE_DETAILS_URL}?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error(
      `Geoapify details failed: ${response.status}`
    );
  }

  const data = await response.json();

  const result =
    data?.result ?? data?.results?.[0];

  if (!result) {
    return null;
  }

  const image =
    result?.wiki_and_media?.image ??
    result?.datasource?.raw?.image ??
    undefined;

  return {
    id:
      result.place_id ??
      destinationId,

    name:
      result.city ??
      result.name ??
      "Unknown city",

    country:
      result.country ??
      "Unknown country",

    state:
      result.state,

    latitude: Number(result.lat),

    longitude: Number(result.lon),

    formatted:
      result.formatted ??
      `${result.city ?? result.name}, ${
        result.country ?? ""
      }`,

    image,
  };
}