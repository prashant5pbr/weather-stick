import { Suspense } from 'react';
import { Weather } from '@/components/weather';

export default function WeatherPage() {
  // Weather reads URL params (useSearchParams), so it must sit inside a
  // Suspense boundary for the static prerender to bail to the client cleanly
  return (
    <Suspense>
      <Weather />
    </Suspense>
  );
}
