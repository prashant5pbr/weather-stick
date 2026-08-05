'use client';

import Link from 'next/link';
import { TopbarForm } from './topbar-form';

import pageStyles from '@/css/page.module.css';
import weatherStyles from '@/css/weather-topbar.module.css';
import brandStyles from '@/css/brand.module.css';

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
            <img className={brandStyles.brandLogo} src="/app-logo.svg" draggable="false" />
          </span>
        </Link>

        {/* Search button to show in case of smaller viewports */}
        <button className={weatherStyles.mobileSearch}>
          <img src="/search-icon.svg" draggable="false" />
        </button>

        {/* Form to accept input (place and date) */}
        <TopbarForm />
      </header>
    </div>
  );
};

export { Weather };
