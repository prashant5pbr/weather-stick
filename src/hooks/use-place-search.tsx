'use client';

import { useState, useEffect } from 'react';
import { getPlaceNames } from '@/services/get-place-names';
import type { PlaceSuggestion } from '@/types/place-suggestion.types';

// Custom hook to fetch place suggestions for a query, debounced and latest-wins
const usePlaceSearch = function (query: string, enabled: boolean) {
  // Debounced copy of the query so we search only after typing pauses
  const [debounced, setDebounced] = useState(query);

  // Suggestions and loading state for the dropdown
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [loading, setLoading] = useState(false);

  // Update the debounced query 300ms after the last keystroke
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Fetch suggestions for the debounced query
  useEffect(() => {
    // Geocoding takes a single place name, so search only the part before any comma
    // (lets a value like "Tokyo, Japan" still match on "Tokyo")
    const term = debounced.split(',')[0].trim();

    // Skip searching while disabled or below the minimum length
    if (!enabled || term.length < 2) {
      setSuggestions([]);
      setLoading(false);
      return;
    }

    // Guards so a superseded request never updates state (latest-wins)
    let active = true;
    const controller = new AbortController();

    // Function to get place names
    const run = async function () {
      setLoading(true);

      try {
        const results = await getPlaceNames(term, controller.signal);
        if (!active) return;
        setSuggestions(results);
      } catch (err) {
        // Ignore the abort thrown when this run is superseded
        if (!active || (err instanceof DOMException && err.name === 'AbortError')) {
          return;
        }
        setSuggestions([]);
      } finally {
        if (active) setLoading(false);
      }
    };

    run();

    // Invalidate this run when the query changes or the input unmounts
    return function () {
      active = false;
      controller.abort();
    };
  }, [debounced, enabled]);

  return { suggestions, loading };
};

export { usePlaceSearch };
