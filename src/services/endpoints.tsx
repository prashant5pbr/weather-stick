// All the open-meteo API end points
const geocodingURL = 'https://geocoding-api.open-meteo.com/v1/search';
const archiveURL = 'https://archive-api.open-meteo.com/v1/archive';
const forecastURL = 'https://api.open-meteo.com/v1/forecast';

// Nominatim (OpenStreetMap) reverse geocoder: coordinates -> place name
const nominatimReverseURL = 'https://nominatim.openstreetmap.org/reverse';

export { geocodingURL, archiveURL, forecastURL, nominatimReverseURL };
