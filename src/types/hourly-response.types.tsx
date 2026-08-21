// Shape of the hourly block data returned by api for both archive and forecast
interface HourlyResponse {
  time: string[];
  temperature_2m: (number | null)[];
  relative_humidity_2m: (number | null)[];
  wind_speed_10m: (number | null)[];
  precipitation: (number | null)[];
}

export type { HourlyResponse };
