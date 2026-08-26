'use client';

import Link from 'next/link';
import { Background } from './background';
import { useFormData } from '@/hooks/use-form-data';
import { TopbarForm } from './topbar-form';
import { MobileViewForm } from './mobile-view-form';
import { WeatherTable } from './weather-table';

import pageStyles from '@/css/page.module.css';
import weatherStyles from '@/css/weather-topbar.module.css';

// Component to create weather page
const Weather = function () {
  // Get the state for the inputs of the form and the handlers to update state
  const { inputDraft, isEmpty, setIsEmpty, handleChange, handleBlur, handlePlaceSelect, handleSubmit } = useFormData();

  // Object for the props
  let propsObject = {
    inputDraft: inputDraft,
    isEmpty: isEmpty,
    setIsEmpty: setIsEmpty,
    onChange: handleChange,
    onBlur: handleBlur,
    onPlaceSelect: handlePlaceSelect,
    onSubmit: handleSubmit,
  };

  return (
    <div className={pageStyles.page}>
      {/* Create the background image */}
      <Background />

      {/* Top section of the weather page containing logo and form */}
      <header className={weatherStyles.container}>
        {/* Logo of the app */}
        <Link className={weatherStyles.brand} href="/">
          <span className={weatherStyles.brandMark} aria-hidden="true">
            <img className={weatherStyles.brandLogo} src="/app-logo.svg" draggable="false" />
          </span>
        </Link>

        {/* Form to accept input (place and date) in larger viewports */}
        <TopbarForm {...propsObject} />

        {/* Form to be displayed in smaller viewports */}
        <MobileViewForm {...propsObject} />
      </header>

      {/* Display the table containing weather data */}
      <WeatherTable />
    </div>
  );
};

export { Weather };
