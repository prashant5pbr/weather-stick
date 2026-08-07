'use client';

import Link from 'next/link';

import weatherStyles from '@/css/weather-topbar.module.css';
import mobileStyles from '@/css/mobile-form.module.css';

// Component to create form in the topbar of the weather page for the smaller viewports
const MobileViewForm = function () {
  return (
    <form className={mobileStyles.mobileForm}>
      {/* Input to accept place */}
      <div className={mobileStyles.placeDivision}>
        <div className={mobileStyles.inputWrap}>
          <img className={weatherStyles.placeIcon} src="/map-symbol.svg" draggable="false" />
          <input
            id="place"
            name="place"
            type="text"
            className={mobileStyles.input}
            placeholder="Search a place…"
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
          <input id="date" name="date" type="date" className={mobileStyles.input} />
        </div>

        <button className={weatherStyles.submit}>Enter</button>
      </div>
    </form>
  );
};

export { MobileViewForm };
