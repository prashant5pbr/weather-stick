import { nominatimReverseURL } from './endpoints';
import type { PlaceSuggestion } from '@/types/place-suggestion.types';

// Functiont to get the place name from its coordinates
const getPlaceFromCoords = async function (
  latitude: number,
  longitude: number,
  signal?: AbortSignal,
): Promise<PlaceSuggestion> {
  // URL to ask for the place name corresponding to the given coordinates
  const url = `${nominatimReverseURL}?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`;

  // Send the request to the url
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error('Failed to look up that location.');
  }

  // Fetch the data from the response
  const data = await response.json();
  const address = data?.address ?? {};

  // Take whatever keys nominatim gives as one single locality
  const locality =
    (typeof data?.name === 'string' && data.name.trim()) ||
    address.city ||
    address.town ||
    address.village ||
    address.hamlet ||
    address.suburb ||
    address.municipality ||
    address.county ||
    '';

  // Return coordinates for the place for which name could not be resolved
  if (!locality) {
    return {
      id: data?.place_id ?? Date.now(),
      name: `${latitude.toFixed(3)}, ${longitude.toFixed(3)}`,
      region: '',
      country: '',
      latitude,
      longitude,
      timezone: 'auto',
    };
  }

  // Return the named place in the same form as the auto suggestion
  return {
    id: data?.place_id ?? Date.now(),
    name: locality,
    region: address.state ?? '',
    country: address.country ?? '',
    latitude, // keep the user's exact click, not Nominatim's snapped centre
    longitude,
    timezone: 'auto',
  };
};

export { getPlaceFromCoords };
