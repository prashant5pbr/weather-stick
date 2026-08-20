// Shape for the data received from the geocoding endpoint
interface PlaceData {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export type { PlaceData };
