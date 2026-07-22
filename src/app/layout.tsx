import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Weather Stick',
  description: 'App to see the weather of the past, today and the future.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
