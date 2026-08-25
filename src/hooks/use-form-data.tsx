'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useFormStore } from '@/stores/form-data-store';
import { formatDate } from '@/util/date-format';
import { titleCase } from '@/util/string-format';
import { placeLabel } from '@/util/place-format';
import type { PlaceSuggestion } from '@/types/place-suggestion.types';

// Custom hook to fetch data from the URL parameters and handle state updates
const useFormData = function () {
  // Create an object of useRouter() to handle the URLs and views
  const router = useRouter();

  // Get the parameters from URL
  const searchParams = useSearchParams();

  // Get the given parameters
  let placeParam = searchParams.get('place') || '';
  let dateParam = searchParams.get('date') || formatDate(new Date());

  // Set the state for the inputs of the form
  const [inputDraft, setInputDraft] = useState({
    place: placeParam,
    date: dateParam,
  });

  // State to check if the input is empty
  const [isEmpty, setIsEmpty] = useState(false);

  // Seed a picked place from coordinates already in the URL, so re-submitting...
  // ...(e.g. after only changing the date) keeps the exact place instead of re-geocoding
  const latParam = searchParams.get('lat');
  const lonParam = searchParams.get('lon');

  const seededPlace: PlaceSuggestion | null =
    latParam !== null && lonParam !== null && !Number.isNaN(Number(latParam)) && !Number.isNaN(Number(lonParam))
      ? {
          id: 0,
          name: placeParam,
          region: '',
          country: '',
          latitude: Number(latParam),
          longitude: Number(lonParam),
          timezone: 'auto',
        }
      : null;

  // The place chosen from the autocomplete dropdown (carries coordinates); null when free-typed
  const [selectedPlace, setSelectedPlace] = useState<PlaceSuggestion | null>(seededPlace);

  // Get the method to update the states in zustand store
  const setInput = useFormStore((state) => state.setInput);

  // Event handler for change in input
  const handleChange = function (field: 'place' | 'date', e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;

    // Typing in the place field invalidates any previously picked suggestion
    if (field === 'place') {
      setSelectedPlace(null);
    }

    setInputDraft((prevData) => ({
      ...prevData,
      [field]: newValue,
    }));

    setInput(field, newValue);
  };

  // Event handler for choosing a suggestion from the autocomplete dropdown
  const handlePlaceSelect = function (place: PlaceSuggestion) {
    // Show the disambiguated label so the user sees which place was picked
    const label = placeLabel(place);

    setSelectedPlace(place);
    setIsEmpty(false);

    setInputDraft((prevData) => ({
      ...prevData,
      place: label,
    }));

    setInput('place', label);
  };

  // Handle the event when input loses focus
  const handleBlur = function (field: 'place' | 'date', e: React.FocusEvent<HTMLInputElement>) {
    const newValue = titleCase(e.target.value);

    setInputDraft((prevData) => ({
      ...prevData,
      [field]: newValue,
    }));

    setInput(field, newValue);
  };

  // Event handler for form submission
  const handleSubmit = function (e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (inputDraft.place.trim() === '') {
      setIsEmpty(true);
      return;
    }

    setIsEmpty(false);

    // Format the place name
    const formattedPlace = titleCase(inputDraft.place);

    // Encode the values to be safely used in URL as parameters
    let placeParam = encodeURIComponent(formattedPlace);
    let dateParam = encodeURIComponent(inputDraft.date);

    // URL for the weather page
    let url = `/weather?place=${placeParam}&date=${dateParam}`;

    // Carry the exact coordinates when a suggestion was picked, so the weather...
    // ...page uses that precise place instead of re-geocoding the name
    if (selectedPlace) {
      url += `&lat=${selectedPlace.latitude}&lon=${selectedPlace.longitude}`;
    }

    // Display the weather page with the parameters
    router.push(url);
  };

  return {
    inputDraft,
    isEmpty,
    setIsEmpty,
    handleChange,
    handleBlur,
    handlePlaceSelect,
    handleSubmit,
  };
};

export { useFormData };
