'use client';

import dynamic from 'next/dynamic';

// dynamic is a next.js provided function to avoid ssr for client side front-end apps
// {ssr: false} ensures that the component is rendered entirely on the client side (csr)
// With named imports, import() fetches the object containing all the imports from the given file
// then() unpacks the named export object and extracts the desired component
const Home = dynamic(() => import('@/components/home').then((mod) => mod.Home), {
  ssr: false,
});

export default function HomePage() {
  return <Home />;
}
