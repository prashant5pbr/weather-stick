'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useFormStore } from '@/stores/form-data-store';
import { formatDate } from '@/util/date-format';
import { titleCase } from '@/util/string-format';

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

  // State to check if the input is empty
  const [isEmpty, setIsEmpty] = useState(false);

  // Get the method to update the states in zustand store
  const setInput = useFormStore((state) => state.setInput);

  // Event handler for change in input
  const handleChange = function (field: 'place' | 'date', e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;

    setInputDraft((prevData) => ({
      ...prevData,
      [field]: newValue,
    }));

    setInput(field, newValue);
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
  };

  return {
    inputDraft,
    isEmpty,
    setIsEmpty,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};

export { useFormData };
