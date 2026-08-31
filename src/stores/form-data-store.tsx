'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { formatDate } from '@/util/date-format';

// Shape for the data of the form and the actions
interface FormDetails {
  place: string;
  date: string;

  savedPlace: string;
  savedDate: string;

  // Coordinates of the currently selected place (null when free-typed); kept so the
  // map picker can reopen on it even after navigating between the home and weather pages
  lat: number | null;
  lon: number | null;

  // Define the action method to set the place and date in the input fields
  setInput: (field: 'place' | 'date', value: string) => void;
  setSavedInput: (field: 'savedPlace' | 'savedDate', value: string) => void;
  setCoords: (lat: number | null, lon: number | null) => void;
}

// Custom hook (zustand store) to manage and store the form details
const useFormStore = create<FormDetails>()(
  // persist is the zustand provided function to save the data using browser storage
  // It accepts two arguments. The first one is the function defining states and the action methods.
  // The second is one the options object describing how and where to save the state.
  persist(
    (set) => ({
      place: '',
      date: formatDate(new Date()),

      savedPlace: '',
      savedDate: '',

      lat: null,
      lon: null,

      setInput: (field, value) => set((state) => ({ ...state, [field]: value })),
      setSavedInput: (field, value) => set((state) => ({ ...state, [field]: value })),
      setCoords: (lat, lon) => set((state) => ({ ...state, lat, lon })),
    }),

    // name gives unique identifier to the data from the given store
    // storage describes where to save the data
    // createJSONStorage is the zustand provided function to store all sort of data as string...
    // ...as well as convert it back to actual JS objects
    {
      name: 'weather-form-data',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export { useFormStore };
