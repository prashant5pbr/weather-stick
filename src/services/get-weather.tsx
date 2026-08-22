import { getWeatherRequest } from '@/util/weather-endpoint';
import { buildRows } from '@/util/weather-window';
import type { PlaceData } from '@/types/place-data.types';
import type { HourlyResponse } from '@/types/hourly-response.types';
import type { Row } from '@/types/row-data.types';

// Base URLs for the two Open-Meteo weather endpoints
const archiveURL = 'https://archive-api.open-meteo.com/v1/archive';
const forecastURL = 'https://api.open-meteo.com/v1/forecast';

// Hourly variables requested from the weather endpoints
const hourlyVars = 'temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation';

// Function to fetch the weather data for the given place and shape it into format to show in the table
const getWeather = async function (place: PlaceData, anchorDateStr: string, signal?: AbortSignal): Promise<Row[]> {
  // Extract the url and the dates
  const { baseURL, startDate, endDate, dateArray } = getWeatherRequest(anchorDateStr, archiveURL, forecastURL);

  // Construct the query parameters for the endpoint
  const params = new URLSearchParams({
    latitude: String(place.latitude),
    longitude: String(place.longitude),
    start_date: startDate,
    end_date: endDate,
    hourly: hourlyVars,
    timezone: 'auto',
  });

  // Format the url with query parameters
  const url = `${baseURL}?${params.toString()}`;

  // Send the request to the url
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error('Failed to fetch the weather data.');
  }

  // Fetch the data from the response
  const data = await response.json();

  // Get the hourly data for each day
  const hourlyData = data?.hourly as HourlyResponse | undefined;

  if (!hourlyData) {
    throw new Error('No weather data was returned.');
  }

  // Build the rows with the given days and the hours
  return buildRows(hourlyData, dateArray);
};

export { getWeather };
