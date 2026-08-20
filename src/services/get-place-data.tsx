import type { PlaceData } from '@/types/place-data.types';

// Open-Meteo geocoding endpoint
const geocodingURL = 'https://geocoding-api.open-meteo.com/v1/search';

// Function to get data about a place like coordinates, country name, etc.
const getPlaceData = async function (place: string, signal?: AbortSignal): Promise<PlaceData | null> {
  // Format the url with query parameters
  const url = `${geocodingURL}?name=${encodeURIComponent(place)}&count=1&language=en&format=json`;

  // Send the request to the url
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error('Failed to look up that place.');
  }

  // Fetch the data from the response
  const data = await response.json();
  const match = data?.results?.[0];

  if (!match) {
    return null;
  }

  return {
    name: match.name,
    country: match.country ?? '',
    latitude: match.latitude,
    longitude: match.longitude,
    timezone: match.timezone ?? 'auto',
  };
};

export { getPlaceData };
