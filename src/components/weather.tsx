'use client';

import Link from 'next/link';
import { TopbarForm } from './topbar-form';
import { MobileViewForm } from './mobile-view-form';

import pageStyles from '@/css/page.module.css';
import weatherStyles from '@/css/weather-topbar.module.css';

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
        <Link className={weatherStyles.brand} href="/">
          <span className={weatherStyles.brandMark} aria-hidden="true">
            <img className={weatherStyles.brandLogo} src="/app-logo.svg" draggable="false" />
          </span>
        </Link>

        {/* Form to accept input (place and date) in larger viewports */}
        <TopbarForm />

        {/* Form to be displayed in smaller viewports */}
        <MobileViewForm />
      </header>
    </div>
  );
};

export { Weather };
