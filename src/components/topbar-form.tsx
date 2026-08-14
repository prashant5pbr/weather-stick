'use client';

import Link from 'next/link';
import { useFormData } from '@/hooks/use-form-data';
import { minMaxDate } from '@/util/min-max-date';

import weatherStyles from '@/css/weather-topbar.module.css';
import formStyles from '@/css/form.module.css';

// Component to create form in the topbar of the weather page
const TopbarForm = function () {
  // Get the state for the inputs of the form and the handlers to update state
  const { inputDraft, isEmpty, setIsEmpty, handleChange, handleBlur, handleSubmit } = useFormData();

  // Get the minimum and maximum dates for the date input
  const { minDate, maxDate } = minMaxDate();

  return (
    <form className={weatherStyles.search} onSubmit={(e) => handleSubmit(e)}>
      {/* Input to accept place */}
      <div className={`${formStyles.field} ${formStyles.fieldPlace}`}>
        <div className={weatherStyles.inputWrap}>
          <img className={weatherStyles.placeIcon} src="/map-symbol.svg" draggable="false" />
          <input
            id="place"
            name="place"
            type="text"
            className={weatherStyles.input}
            onChange={(e) => {
              e.target.value === '' ? setIsEmpty(true) : setIsEmpty(false);
              handleChange('place', e);
            }}
            onBlur={(e) => handleBlur('place', e)}
            value={inputDraft.place}
            placeholder="Search a place…"
            aria-invalid={isEmpty}
            autoComplete="off"
          />
          <span className={weatherStyles.errorSymbol}>{isEmpty ? '!' : ''}</span>
        </div>

        {/* Link to select place using map */}
        <Link className={weatherStyles.mapLink} href="#">
          <img className={formStyles.mapLogo} src="/map-symbol2.svg" draggable="false" />
          Choose a place on map
        </Link>
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
            onChange={(e) => handleChange('date', e)}
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
