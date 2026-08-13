'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormStore } from '@/stores/form-data-store';
import { formatDate } from '@/util/date-format';
import { titleCase } from '@/util/string-format';

import pageStyles from '@/css/page.module.css';
import brandStyles from '@/css/brand.module.css';
import mainStyles from '@/css/main-section.module.css';
import formStyles from '@/css/form.module.css';

// Component to create homepage
const Home = function () {
  // State to check if the input is empty
  const [isEmpty, setIsEmpty] = useState(false);

  // Create an object of useRouter() to handle the URLs and views
  const router = useRouter();

  // Fetching data from the form store
  const place = useFormStore((state) => state.place);
  const date = useFormStore((state) => state.date);
  const setInput = useFormStore((state) => state.setInput);

  // Minimum date
  let min = new Date('1940/01/01 GMT');
  let minDate = formatDate(min);

  // Maximum date
  let max = new Date();
  max.setDate(max.getDate() + 16);
  let maxDate = formatDate(max);

  // Event handler to handle form submission
  const handleSubmit = function (e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    // Check if the place input is empty
    if (place.trim() === '') {
      setIsEmpty(true);
      return;
    }

    setIsEmpty(false);
    setInput('place', titleCase(place).trim());

    // Encode the values to be safely used in URL as parameters
    let placeParam = titleCase(place.trim());
    placeParam = encodeURIComponent(placeParam);

    let dateParam = encodeURIComponent(date);

    // Display the weather page with the parameters
    router.push(`/weather?place=${placeParam}&date=${dateParam}`);
  };

  return (
    <div className={pageStyles.page}>
      {/* Create the background style */}
      <div className={pageStyles.aurora} aria-hidden="true">
        <span className={`${pageStyles.blob} ${pageStyles.blobOne}`} />
        <span className={`${pageStyles.blob} ${pageStyles.blobTwo}`} />
        <span className={`${pageStyles.blob} ${pageStyles.blobThree}`} />
      </div>

      {/* App logo and title */}
      <header className={brandStyles.container}>
        <Link className={brandStyles.brand} href="#">
          <span className={brandStyles.brandMark} aria-hidden="true">
            <img className={brandStyles.brandLogo} src="/app-logo.svg" draggable="false" />
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
          Type a city or pick a spot on the map, select any date from 01/01/1940 to 16 days in the future and get a
          clear and beautiful historical weather data or reliable forecast in seconds.
        </p>

        {/* Form to accept input (place and date) */}
        <form className={formStyles.search} onSubmit={(e) => handleSubmit(e)}>
          <div className={`${formStyles.field} ${formStyles.fieldPlace}`}>
            <label className={formStyles.label} htmlFor="place">
              Place {isEmpty ? <span className={formStyles.errorMessage}>can't be empty</span> : ''}
            </label>

            {/* Input to accept place */}
            <div className={formStyles.inputWrap}>
              <img className={formStyles.placeIcon} src="/map-symbol.svg" draggable="false" />
              <input
                id="place"
                type="text"
                className={formStyles.input}
                value={place}
                onChange={(e) => {
                  e.target.value === '' ? setIsEmpty(true) : setIsEmpty(false);
                  setInput('place', e.target.value);
                }}
                placeholder="e.g. Tokyo, London"
                aria-invalid={isEmpty}
                autoComplete="off"
              />
            </div>

            {/* Choice to accept place using map */}
            <Link className={formStyles.mapLink} href="#" onClick={(e) => e.preventDefault()}>
              <img className={formStyles.mapLogo} src="/map-symbol2.svg" draggable="false" />
              Choose a place on map
            </Link>
          </div>

          <div className={`${formStyles.field} ${formStyles.fieldDate}`}>
            <label className={formStyles.label} htmlFor="date">
              Date <span className={formStyles.optional}>(optional)</span>
            </label>

            {/* Input to accept date */}
            <div className={formStyles.inputWrap}>
              <img className={formStyles.dateIcon} src="/calendar-symbol.svg" draggable="false" />
              <input
                id="date"
                type="date"
                className={formStyles.input}
                value={date}
                onChange={(e) => setInput('date', e.target.value)}
                min={minDate}
                max={maxDate}
              />
            </div>
          </div>

          <button type="submit" className={formStyles.submit}>
            Enter
            <img src="/right-arrow.svg" draggable="false" />
          </button>
        </form>
      </main>
    </div>
  );
};

export { Home };
