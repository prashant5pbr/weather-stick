'use client';

import Link from 'next/link';

import weatherStyles from '@/css/weather-topbar.module.css';
import formStyles from '@/css/form.module.css';

// Component to create form in the topbar of the weather page
const TopbarForm = function () {
  return (
    <form className={weatherStyles.search}>
      {/* Input to accept place */}
      <div className={`${formStyles.field} ${formStyles.fieldPlace}`}>
        <div className={weatherStyles.inputWrap}>
          <img className={weatherStyles.placeIcon} src="/map-symbol.svg" draggable="false" />
          <input
            id="place"
            name="place"
            type="text"
            className={weatherStyles.input}
            placeholder="Search a place…"
            autoComplete="off"
          />
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
          <input id="date" name="date" type="date" className={weatherStyles.input} />
        </div>
      </div>

      <button type="submit" className={weatherStyles.submit}>
        Enter
      </button>
    </form>
  );
};

export { TopbarForm };
