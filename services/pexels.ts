export type PexelsPhoto = {
  id: number;
  width: number;
  height: number;
  photographer: string;
  photographerUrl: string;
  imageUrl: string;
  imageLarge: string;
  pexelsUrl: string;
};

type PexelsApiPhoto = {
  id: number;
  width: number;
  height: number;
  photographer: string;
  photographer_url: string;
  url: string;
  src: {
    medium: string;
    large: string;
    large2x?: string;
    original: string;
  };
};

const API_KEY =
  process.env.EXPO_PUBLIC_PEXELS_API_KEY;

const BASE_URL =
  "https://api.pexels.com/v1/search";

export async function searchDestinationPhotos(
  city: string,
  country: string,
  perPage: number = 10
): Promise<PexelsPhoto[]> {
  const trimmedCity = city.trim();
  const trimmedCountry = country.trim();

  if (!trimmedCity) {
    return [];
  }

  if (!API_KEY) {
    throw new Error(
      "Pexels API key is missing."
    );
  }

  const query = [
    trimmedCity,
    trimmedCountry,
  ]
    .filter(Boolean)
    .join(" ");

  const params = new URLSearchParams({
    query,
    per_page: String(perPage),
    orientation: "landscape",
  });

  const response = await fetch(
    `${BASE_URL}?${params.toString()}`,
    {
      headers: {
        Authorization: API_KEY,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `Pexels request failed: ${response.status}`
    );
  }

  const data = await response.json();

  if (!Array.isArray(data.photos)) {
    return [];
  }

  return data.photos.map(
    (photo: PexelsApiPhoto) => ({
      id: photo.id,
      width: photo.width,
      height: photo.height,
      photographer: photo.photographer,
      photographerUrl:
        photo.photographer_url,
      imageUrl: photo.src.medium,
      imageLarge:
        photo.src.large2x ??
        photo.src.large ??
        photo.src.original,
      pexelsUrl: photo.url,
    })
  );
}

export async function searchRelatedPhotos(
  city: string,
  country: string,
  perPage: number = 10
): Promise<PexelsPhoto[]> {
  const trimmedCity = city.trim();
  const trimmedCountry = country.trim();

  if (!trimmedCity) {
    return [];
  }

  if (!API_KEY) {
    throw new Error(
      "Pexels API key is missing."
    );
  }

  const query = [
    trimmedCity,
    trimmedCountry,
    "landmarks attractions",
  ]
    .filter(Boolean)
    .join(" ");

  const params = new URLSearchParams({
    query,
    per_page: String(perPage),
    orientation: "landscape",
  });

  const response = await fetch(
    `${BASE_URL}?${params.toString()}`,
    {
      headers: {
        Authorization: API_KEY,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `Pexels related photos failed: ${response.status}`
    );
  }

  const data = await response.json();

  if (!Array.isArray(data.photos)) {
    return [];
  }

  return data.photos.map(
    (photo: PexelsApiPhoto) => ({
      id: photo.id,
      width: photo.width,
      height: photo.height,
      photographer: photo.photographer,
      photographerUrl:
        photo.photographer_url,
      imageUrl: photo.src.medium,
      imageLarge:
        photo.src.large2x ??
        photo.src.large ??
        photo.src.original,
      pexelsUrl: photo.url,
    })
  );
}