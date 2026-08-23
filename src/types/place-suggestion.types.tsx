// Shape of a single autocomplete suggestion from the geocoding endpoint
interface PlaceSuggestion {
  id: number;
  name: string;
  region: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export type { PlaceSuggestion };
