import type { HourlyResponse } from '@/types/hourly-response.types';
import type { Row } from '@/types/row-data.types';

// The time slots shown across the table: every 2nd hour -> 12 columns
const hours = ['00', '02', '04', '06', '08', '10', '12', '14', '16', '18', '20', '22'];

// Function to create the rows of data for the weather table
const buildRows = function (hourlyData: HourlyResponse, dateArray: string[]): Row[] {
  // Map each hourly timestamp to its array index for quick lookup
  const indexByTime = new Map<string, number>();
  hourlyData.time.forEach((time, i) => indexByTime.set(time, i));

  return dateArray.map((date) => {
    const cells = hours.map((hour) => {
      // Build the key (Open-Meteo timestamps look like "2026-08-19T00:00") and fetch its index
      const key = `${date}T${hour}:00`;
      const index = indexByTime.get(key);

      return {
        hour,
        label: `${hour}:00`,
        temp: index === undefined ? null : hourlyData.temperature_2m[index],
        humidity: index === undefined ? null : hourlyData.relative_humidity_2m[index],
        wind: index === undefined ? null : hourlyData.wind_speed_10m[index],
        precip: index === undefined ? null : hourlyData.precipitation[index],
      };
    });

    return { date, cells };
  });
};

export { buildRows };
