'use client';

import Link from 'next/link';

import pageStyles from '@/css/page.module.css';
import brandStyles from '@/css/brand.module.css';
import mainStyles from '@/css/main-section.module.css';
import formStyles from '@/css/form.module.css';

//Component to create homepage
export default function Home() {
  //Function to convert the given date to string
  const iso = (date: Date) => {
    const digits = (num: number) => String(num).padStart(2, '0');
    return `${date.getFullYear()}-${digits(date.getMonth() + 1)}-${digits(date.getDate())}`;
  };

  //Minimum date
  let min = new Date('1940/01/01 GMT');
  let minDate = iso(min);

  //Maximum date
  let max = new Date();
  max.setDate(max.getDate() + 16);
  let maxDate = iso(max);

  return (
    <div className={pageStyles.page}>
      {/* Create the background image */}
      <div className={pageStyles.aurora} aria-hidden="true">
        <span className={`${pageStyles.blob} ${pageStyles.blobOne}`} />
        <span className={`${pageStyles.blob} ${pageStyles.blobTwo}`} />
        <span className={`${pageStyles.blob} ${pageStyles.blobThree}`} />
      </div>

      {/* App logo and title */}
      <header className={brandStyles.container}>
        <Link className={brandStyles.brand} href="#">
          <span className={brandStyles.brandMark} aria-hidden="true">
            <img className={brandStyles.brandLogo} src="/app-logo.svg" />
          </span>
          <div className={brandStyles.brandBox}>
            <span className={brandStyles.brandName}>Weather Stick</span>
            <span className={brandStyles.brandMotto}>Your sky at a glance</span>
          </div>
        </Link>
      </header>

      {/* Main section of the app */}
      <main className={mainStyles.container}>
        <p className={mainStyles.eyebrow}>Live forecasts, anywhere</p>
        <h1 className={mainStyles.title}>
          Check the weather of <span className={mainStyles.accent}>any place</span>
        </h1>

        {/* Description for the app */}
        <p className={mainStyles.description}>
          Type a city or pick a spot on the map, select any date from 01/01/1940 to 16 days in the future, and get a
          clear, beautiful historical weather data or reliable forecast in seconds.
        </p>

        {/* Form to accept input (place and date) */}
        <form className={formStyles.search}>
          <div className={`${formStyles.field} ${formStyles.fieldPlace}`}>
            <label className={formStyles.label} htmlFor="place">
              Place
            </label>

            {/* Input to accept place */}
            <div className={formStyles.inputWrap}>
              <img className={formStyles.placeIcon} src="/map-symbol.svg" />
              <input
                id="place"
                type="text"
                className={formStyles.input}
                placeholder="e.g. Tokyo, London"
                autoComplete="off"
              />
            </div>

            {/* Choice to accept place using map */}
            <Link className={formStyles.mapLink} href="#" onClick={(e) => e.preventDefault()}>
              <img className={formStyles.mapLogo} src="/map-symbol2.svg" />
              Choose a place on map
            </Link>
          </div>

          <div className={`${formStyles.field} ${formStyles.fieldDate}`}>
            <label className={formStyles.label} htmlFor="date">
              Date <span className={formStyles.optional}>(optional)</span>
            </label>

            {/* Input to accept date */}
            <div className={formStyles.inputWrap}>
              <img className={formStyles.dateIcon} src="/calendar-symbol.svg" />
              <input id="date" type="date" className={formStyles.input} min={minDate} max={maxDate} />
            </div>
          </div>

          <button type="submit" className={formStyles.submit}>
            Enter
            <img src="/right-arrow.svg" />
          </button>
        </form>
      </main>
    </div>
  );
}
