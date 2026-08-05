'use client';

import Link from 'next/link';

import pageStyles from '@/css/page.module.css';
import weatherStyles from '@/css/weather-topbar.module.css';
import brandStyles from '@/css/brand.module.css';
import formStyles from '@/css/form.module.css';

// Component to create weather page
const Weather = function () {
  return (
    <div className={pageStyles.page}>
      {/* Create the background image */}
      <div className={pageStyles.aurora} aria-hidden="true">
        <span className={`${pageStyles.blob} ${pageStyles.blobOne}`} />
        <span className={`${pageStyles.blob} ${pageStyles.blobTwo}`} />
        <span className={`${pageStyles.blob} ${pageStyles.blobThree}`} />
      </div>

      {/* Top section of the weather page containing logo and form */}
      <header className={weatherStyles.container}>
        {/* Logo of the app */}
        <Link className={brandStyles.brand} href="/">
          <span className={brandStyles.brandMark} aria-hidden="true">
            <img className={brandStyles.brandLogo} src="/app-logo.svg" />
          </span>
        </Link>

        {/* Form to accept input (place and date) */}
        <form className={weatherStyles.search}>
          {/* Input to accept place */}
          <div className={`${formStyles.field} ${formStyles.fieldPlace}`}>
            <div className={weatherStyles.inputWrap}>
              <img className={weatherStyles.placeIcon} src="/map-symbol.svg" />
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
              <img className={formStyles.mapLogo} src="/map-symbol2.svg" />
              Choose a place on map
            </Link>
          </div>

          {/* Input to accept date */}
          <div className={`${formStyles.field} ${formStyles.fieldDate}`}>
            <div className={formStyles.inputWrap}>
              <img className={weatherStyles.dateIcon} src="/calendar-symbol.svg" />
              <input id="date" name="date" type="date" className={weatherStyles.input} />
            </div>
          </div>

          <button type="submit" className={weatherStyles.submit}>
            Enter
          </button>
        </form>
      </header>
    </div>
  );
};

export { Weather };
