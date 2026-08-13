'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useFormStore } from '@/stores/form-data-store';
import { formatDate } from '@/util/date-format';

// Custom hook to fetch data from the url parameters and handle state updates
const useFormData = function () {
  // Get the parameters from url
  const searchParams = useSearchParams();

  // Get the given parameters
  let placeParam = searchParams.get('place') || '';
  let dateParam = searchParams.get('date') || formatDate(new Date());

  // Set the state for the inputs of the form
  const [inputDraft, setInputDraft] = useState({
    place: placeParam,
    date: dateParam,
  });

  // Get the method to update the states in zustand store
  const setInput = useFormStore((state) => state.setInput);

  // Event handler for change in input
  const handleChange = function (field: 'place' | 'date', e: React.ChangeEvent<HTMLInputElement>) {
    setInputDraft((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));

    setInput(field, e.target.value);
  };

  return {
    inputDraft,
    handleChange,
  };
};

export { useFormData };
