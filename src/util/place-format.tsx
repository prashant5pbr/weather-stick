import type { PlaceSuggestion } from '@/types/place-suggestion.types';

// Function to build a readable, disambiguated label for a place
// e.g. "Springfield, Illinois, United States", or "Tokyo, Japan" (region deduped against name)
const placeLabel = function (place: PlaceSuggestion) {
  // Array to store different parts of name as string
  const parts: string[] = [];

  for (const part of [place.name, place.region, place.country]) {
    const value = part.trim();

    // Skip empty parts and any value already present (a city named the same as its region)
    if (value && !parts.some((p) => p.toLowerCase() === value.toLowerCase())) {
      parts.push(value);
    }
  }

  return parts.join(', ');
};

export { placeLabel };
