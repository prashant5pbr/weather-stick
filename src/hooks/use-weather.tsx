'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { getPlaceData } from '@/services/get-place-data';
import { getWeather } from '@/services/get-weather';
import type { PlaceData } from '@/types/place-data.types';
import type { Row } from '@/types/row-data.types';
import { formatDate } from '@/util/date-format';

// Custom hook to manage the weather page
// Read url, fetch the weather, shape the data, manage loading/error state and handle multiple requests
const useWeather = function () {
  // Get the parameters from url
  const searchParams = useSearchParams();

  // Get the given parameters
  const place = searchParams.get('place') || '';
  const date = searchParams.get('date') || formatDate(new Date());

  // States for managing rows and location
  const [rows, setRows] = useState<Row[]>([]);
  const [location, setLocation] = useState<PlaceData | null>(null);

  // Manage loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch the place data and the weather when the page loads
  useEffect(() => {
    if (place.trim() === '') {
      setRows([]);
      setLocation(null);
      setError(null);
      setLoading(false);
      return;
    }

    // Guards so a superseded request never updates state (latest-wins)
    let active = true;

    // Create a controller object to abort aysnchronous operations
    const controller = new AbortController();

    // Function to fetch place data and weather
    const getData = async function () {
      setLoading(true);
      setError(null);

      try {
        // Fetch place data
        const found = await getPlaceData(place, controller.signal);
        if (!active) return;

        if (!found) {
          setRows([]);
          setLocation(null);
          setError(`Couldn't find "${place}".`);
          return;
        }

        // Fetch weather for the given place
        const nextRows = await getWeather(found, date, controller.signal);
        if (!active) return;

        setLocation(found);
        setRows(nextRows);
      } catch (err) {
        // Ignore the abort thrown when this run is superseded
        if (!active || (err instanceof DOMException && err.name === 'AbortError')) {
          return;
        }
        setError(err instanceof Error ? err.message : 'Something went wrong.');
        setRows([]);
      } finally {
        if (active) setLoading(false);
      }
    };

    getData();

    // Invalidate this funcion and results when place/date change or the component unmounts
    return function () {
      active = false;
      controller.abort();
    };
  }, [place, date]);

  return { rows, location, loading, error, place, date };
};

export { useWeather };
