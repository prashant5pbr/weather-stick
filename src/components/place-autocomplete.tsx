'use client';

import { useState } from 'react';
import { usePlaceSearch } from '@/hooks/use-place-search';
import type { PlaceSuggestion } from '@/types/place-suggestion.types';

import styles from '@/css/place-autocomplete.module.css';

// Props for the reusable place input with an autocomplete dropdown
interface PlaceAutocompleteProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelect: (place: PlaceSuggestion) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  inputClassName: string;
  id?: string;
  name?: string;
  placeholder?: string;
  ariaInvalid?: boolean;
  openAbove?: boolean;
}

// Component to render input to type place name and get suggestions
const PlaceAutocomplete = function ({
  value,
  onChange,
  onSelect,
  onBlur,
  inputClassName,
  id,
  name,
  placeholder,
  ariaInvalid,
  openAbove,
}: PlaceAutocompleteProps) {
  // Whether the dropdown is open and which option is keyboard-highlighted
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  // Fetch suggestions only while the dropdown is open (pauses after a pick)
  const { suggestions, loading } = usePlaceSearch(value, open);

  // Only surface the dropdown once the query is long enough to be meaningful
  const showDropdown = open && value.trim().length >= 2;

  // Handle typing: reopen the dropdown and let the parent update the value
  const handleInputChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    setOpen(true);
    setActiveIndex(-1);
    onChange(e);
  };

  // Commit a suggestion (from click or keyboard) and close the dropdown
  const handleSelect = function (place: PlaceSuggestion) {
    onSelect(place);
    setOpen(false);
    setActiveIndex(-1);
  };

  // Keyboard navigation within the dropdown
  const handleKeyDown = function (e: React.KeyboardEvent<HTMLInputElement>) {
    if (!showDropdown || suggestions.length === 0) {
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
    } else if (e.key === 'Enter') {
      // Only intercept Enter when an option is highlighted; otherwise let the form submit
      if (activeIndex >= 0) {
        e.preventDefault();
        handleSelect(suggestions[activeIndex]);
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
      setActiveIndex(-1);
    }
  };

  return (
    <>
      <input
        id={id}
        name={name}
        type="text"
        className={inputClassName}
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          if (value.trim().length >= 2) setOpen(true);
        }}
        onBlur={(e) => {
          setOpen(false);
          onBlur?.(e);
        }}
        placeholder={placeholder}
        aria-invalid={ariaInvalid}
        autoComplete="off"
        role="combobox"
        aria-expanded={showDropdown}
        aria-autocomplete="list"
      />

      {showDropdown && (
        <ul className={`${styles.dropdown} ${openAbove ? styles.dropUp : ''}`} role="listbox">
          {loading && <li className={styles.status}>Searching…</li>}

          {!loading && suggestions.length === 0 && <li className={styles.status}>No matches</li>}

          {!loading &&
            suggestions.map((place, index) => (
              <li
                key={place.id}
                role="option"
                aria-selected={index === activeIndex}
                className={`${styles.option} ${index === activeIndex ? styles.optionActive : ''}`}
                // onMouseDown (not onClick) so selecting fires before the input blurs
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSelect(place);
                }}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <span className={styles.optionName}>{place.name}</span>
                <span className={styles.optionMeta}>{[place.region, place.country].filter(Boolean).join(', ')}</span>
              </li>
            ))}
        </ul>
      )}
    </>
  );
};

export { PlaceAutocomplete };
