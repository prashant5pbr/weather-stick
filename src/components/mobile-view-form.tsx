'use client';

import Link from 'next/link';
import { minMaxDate } from '@/util/min-max-date';
import { type DataProps } from '@/types/form-data.types';

import weatherStyles from '@/css/weather-topbar.module.css';
import mobileStyles from '@/css/mobile-form.module.css';

// Component to create form in the topbar of the weather page for the smaller viewports
const MobileViewForm = function ({ inputDraft, isEmpty, setIsEmpty, onChange, onBlur, onSubmit }: DataProps) {
  // Get the minimum and maximum dates for the date input
  const { minDate, maxDate } = minMaxDate();

  return (
    <form className={mobileStyles.mobileForm} onSubmit={(e) => onSubmit(e)}>
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
              onChange('place', e);
            }}
            onBlur={(e) => onBlur('place', e)}
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
            onChange={(e) => onChange('date', e)}
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
