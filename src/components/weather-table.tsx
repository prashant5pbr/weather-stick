'use client';

import { useWeather } from '@/hooks/use-weather';
import type { Cell } from '@/types/row-data.types';

import styles from '@/css/weather-table.module.css';

// The time slots shown across the table: every 2nd hour -> 12 columns
const hours = ['00', '02', '04', '06', '08', '10', '12', '14', '16', '18', '20', '22'];

// Metric rows stacked inside every header and data cell, in display order
const metrics = [
  { key: 'temp', label: 'Temp', unit: '°C' },
  { key: 'humidity', label: 'Humidity', unit: ' %' },
  { key: 'wind', label: 'Wind', unit: ' km/h' },
  { key: 'precip', label: 'Precip', unit: ' mm' },
];

// Format a single metric value with its unit (or a dash when missing)
const formatValue = function (value: number | null, unit: string) {
  return value === null || value === undefined ? '—' : `${value}${unit}`;
};

// Component to render the weather results as a scrollable day x time table
const WeatherTable = function () {
  // Get the states for the custom hook
  const { rows, loading, error, place } = useWeather();

  // Pick a single message when there is no table to show
  let message: string | null = null;

  if (place.trim() === '') {
    message = 'Search a place to see its weather.';
  } else if (loading) {
    message = 'Loading weather…';
  } else if (error) {
    message = error;
  } else if (rows.length === 0) {
    message = 'No weather data to show.';
  }

  return (
    <section className={styles.section}>
      {message ? (
        <div className={styles.state}>{message}</div>
      ) : (
        <>
          <h1 className={styles.resultTitle}>Results for {place}</h1>

          <div className={styles.scroll}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.corner} scope="col">
                    Date/Time
                  </th>
                  {hours.map((hour) => (
                    <th key={hour} className={styles.timeHead} scope="col">
                      <span className={styles.timeLabel}>{hour}:00</span>
                      {metrics.map((metric) => (
                        <span key={metric.key} className={styles.metricLabel}>
                          {metric.label}
                        </span>
                      ))}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.date}>
                    <th className={styles.dateCell} scope="row">
                      {row.date}
                    </th>
                    {row.cells.map((cell) => (
                      <td key={cell.hour} className={styles.dataCell}>
                        {metrics.map((metric) => (
                          <span key={metric.key} className={styles.value}>
                            {formatValue(cell[metric.key as keyof Cell] as number | null, metric.unit)}
                          </span>
                        ))}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
};

export { WeatherTable };
