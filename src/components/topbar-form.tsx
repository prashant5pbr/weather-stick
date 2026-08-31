'use client';

import { minMaxDate } from '@/util/min-max-date';
import { PlaceAutocomplete } from './place-autocomplete';
import { MapPickerLink } from './map-picker-link';
import type { DataProps } from '@/types/form-data.types';

import weatherStyles from '@/css/weather-topbar.module.css';
import formStyles from '@/css/form.module.css';

// Component to create form in the topbar of the weather page
const TopbarForm = function ({
  inputDraft,
  isEmpty,
  setIsEmpty,
  onChange,
  onBlur,
  onPlaceSelect,
  onSubmit,
}: DataProps) {
  // Get the minimum and maximum dates for the date input
  const { minDate, maxDate } = minMaxDate();

  return (
    <form className={weatherStyles.search} onSubmit={(e) => onSubmit(e)}>
      {/* Input to accept place */}
      <div className={`${formStyles.field} ${formStyles.fieldPlace}`}>
        <div className={weatherStyles.inputWrap}>
          <img className={weatherStyles.placeIcon} src="/map-symbol.svg" draggable="false" />
          <PlaceAutocomplete
            id="place"
            name="place"
            inputClassName={weatherStyles.input}
            value={inputDraft.place}
            onChange={(e) => {
              e.target.value === '' ? setIsEmpty(true) : setIsEmpty(false);
              onChange('place', e);
            }}
            onSelect={onPlaceSelect}
            onBlur={(e) => onBlur('place', e)}
            placeholder="Search a place…"
            ariaInvalid={isEmpty}
          />

          <span className={weatherStyles.errorMessage}>{isEmpty ? 'Empty\nInput' : ''}</span>
        </div>

        {/* Link to select place using map */}
        <MapPickerLink
          className={weatherStyles.mapLink}
          logoClassName={formStyles.mapLogo}
          label="Choose a place on map"
          onPlaceSelect={onPlaceSelect}
        />
      </div>

      {/* Input to accept date */}
      <div className={`${formStyles.field} ${formStyles.fieldDate}`}>
        <div className={formStyles.inputWrap}>
          <img className={weatherStyles.dateIcon} src="/calendar-symbol.svg" draggable="false" />
          <input
            id="date"
            name="date"
            type="date"
            className={weatherStyles.input}
            onChange={(e) => onChange('date', e)}
            value={inputDraft.date}
            min={minDate}
            max={maxDate}
          />
        </div>
      </div>

      <button type="submit" className={weatherStyles.submit}>
        Enter
      </button>
    </form>
  );
};

export { TopbarForm };
