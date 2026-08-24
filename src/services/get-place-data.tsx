import { geocodingURL } from './endpoints';
import type { PlaceData } from '@/types/place-data.types';

// Function to get data about a place like coordinates, country name, etc.
const getPlaceData = async function (place: string, signal?: AbortSignal): Promise<PlaceData | null> {
  // Extract the first part of the place name as geocoding takes a single place name
  // (a shared "Tokyo, Japan" style label still resolves on "Tokyo")
  const term = place.split(',')[0].trim();

  // Format the url with query parameters
  const url = `${geocodingURL}?name=${encodeURIComponent(term)}&count=1&language=en&format=json`;

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
