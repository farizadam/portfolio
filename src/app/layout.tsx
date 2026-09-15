import ClarityAnalytics from '@/components/analytics/ClarityAnalytics';
import UmamiAnalytics from '@/components/analytics/UmamiAnalytics';
import Footer from '@/components/common/Footer';
import Navbar from '@/components/common/Navbar';
import { ThemeProvider } from '@/components/common/ThemeProviders';
import JsonLd from '@/components/seo/JsonLd';
import { generateMetadata as getMetadata } from '@/config/Meta';
import ReactLenis from 'lenis/react';
import { ViewTransitions } from 'next-view-transitions';

import './globals.css';

export const metadata = getMetadata('/');

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body className={`font-hanken-grotesk antialiased`}>
          <JsonLd />
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            <ReactLenis root>
              <Navbar />
              {children}
              <Footer />
              <UmamiAnalytics />
              <ClarityAnalytics />
            </ReactLenis>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
