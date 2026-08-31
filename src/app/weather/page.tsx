import { Suspense } from 'react';
import { Weather } from '@/components/weather';

// Reading searchParams opts this route out of static prerendering, so each navigation
// renders fresh instead of reusing a cached static shell (which froze results on the
// first place in production). Weather itself reads the params via useSearchParams.
export default async function WeatherPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;

  // Key the results on the query string so Weather fully remounts (fresh state + fetch)
  // whenever the place or date changes, instead of a stale instance being reused.
  const key = new URLSearchParams(sp as Record<string, string>).toString();

  return (
    <Suspense>
      <Weather key={key} />
    </Suspense>
  );
}
