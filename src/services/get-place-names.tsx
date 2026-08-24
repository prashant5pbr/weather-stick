import { geocodingURL } from './endpoints';
import type { PlaceSuggestion } from '@/types/place-suggestion.types';

// Function to fetch up to five place candidates for the autocomplete dropdown
const getPlaceNames = async function (query: string, signal?: AbortSignal): Promise<PlaceSuggestion[]> {
  // Format the url with query parameters (count=5 so the user can disambiguate)
  const url = `${geocodingURL}?name=${encodeURIComponent(query)}&count=5&language=en&format=json`;

  // Send the request to the url
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error('Failed to search places.');
  }

  // Fetch the data from the response
  const data = await response.json();
  const results = data?.results;

  // Return if no match found for the name
  if (!Array.isArray(results)) {
    return [];
  }

  // Shape each match into a suggestion (admin1 is the region used to disambiguate)
  return results.map((item) => ({
    id: item.id,
    name: item.name,
    region: item.admin1 ?? '',
    country: item.country ?? '',
    latitude: item.latitude,
    longitude: item.longitude,
    timezone: item.timezone ?? 'auto',
  }));
};

export { getPlaceNames };
