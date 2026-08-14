'use client';

import Link from 'next/link';
import { useFormData } from '@/hooks/use-form-data';
import { minMaxDate } from '@/util/min-max-date';

import weatherStyles from '@/css/weather-topbar.module.css';
import mobileStyles from '@/css/mobile-form.module.css';

// Component to create form in the topbar of the weather page for the smaller viewports
const MobileViewForm = function () {
  // Get the state for the inputs of the form and the handlers to update state
  const { inputDraft, isEmpty, setIsEmpty, handleChange, handleBlur, handleSubmit } = useFormData();

  // Get the minimum and maximum dates for the date input
  const { minDate, maxDate } = minMaxDate();

  return (
    <form className={mobileStyles.mobileForm} onSubmit={(e) => handleSubmit(e)}>
      {/* Input to accept place */}
      <div className={mobileStyles.placeDivision}>
        <div className={mobileStyles.inputWrap}>
          <img className={weatherStyles.placeIcon} src="/map-symbol.svg" draggable="false" />
          <input
            id="place"
            name="place"
            type="text"
            className={mobileStyles.input}
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
        </div>

        {/* Link to accept place using map */}
        <Link href="#">
          <img className={mobileStyles.mapLogo} src="/map-symbol2.svg" draggable="false" />
        </Link>
      </div>

      {/* Input to accept date */}
      <div className={mobileStyles.lowerDivision}>
        <div className={mobileStyles.inputWrap}>
          <img className={weatherStyles.dateIcon} src="/calendar-symbol.svg" draggable="false" />
          <input
            id="date"
            name="date"
            type="date"
            className={mobileStyles.input}
            onChange={(e) => handleChange('date', e)}
            value={inputDraft.date}
            min={minDate}
            max={maxDate}
          />
        </div>

        <button className={weatherStyles.submit}>Enter</button>
      </div>
    </form>
  );
};

export { MobileViewForm };
