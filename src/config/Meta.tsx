import type { Metadata } from 'next';

import { heroConfig } from './Hero';

export interface PageMeta {
  title: string;
  description: string;
  ogImage?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  /** Set to false for pages that should stay out of search results */
  index?: boolean;
}

// Base site configuration
export const siteConfig = {
  name: heroConfig.name,
  title: `${heroConfig.name} | Full Stack Developer in Morocco`,
  description:
    'Adam Fariz is a full stack developer based in Casablanca and Rabat, Morocco, building secure web and mobile apps, REST APIs, and AI-powered tools with Next.js, React Native, Node.js, and PostgreSQL.',
  url: (process.env.NEXT_PUBLIC_URL || 'https://farizadam.vercel.app').replace(/\/$/, ''),
  ogImage: '/meta/opengraph-image.png',
  locale: 'en_US',
  author: {
    name: heroConfig.name,
    twitter: '',
    github: 'adamfariz',
    linkedin: 'adam-fariz-3bba3b2a9',
    email: heroConfig.email,
  },
  location: {
    cities: ['Casablanca', 'Rabat'],
    region: 'Casablanca-Settat',
    country: 'Morocco',
    countryCode: 'MA',
  },
};

export const pageMetadata: Record<string, PageMeta> = {
  '/': {
    title: `${heroConfig.name} | Full Stack Developer in Casablanca, Morocco`,
    description:
      'Full stack developer in Casablanca and Rabat, Morocco. I build secure web and mobile apps with Next.js, React Native, Node.js, and PostgreSQL, plus AI-powered tools. Open to freelance and full-time roles.',
    ogImage: '/meta/hero.png',
    twitterCard: 'summary_large_image',
  },

  '/projects': {
    title: 'Full Stack Projects | Next.js, React Native, Node.js',
    description:
      'Web apps, mobile apps, APIs, and AI tooling built by Adam Fariz, a full stack developer in Morocco. Enterprise ERP, airport carpooling with Stripe Connect, an LMS, and more.',
    ogImage: '/meta/projects.png',
    twitterCard: 'summary_large_image',
  },

  '/work-experience': {
    title: 'Work Experience | Full Stack Developer in Morocco',
    description:
      'Internships, freelance work, and teaching roles across Casablanca and Rabat. What Adam Fariz built at each company and the stack behind it.',
    ogImage: '/meta/work.png',
    twitterCard: 'summary_large_image',
  },

  '/resume': {
    title: 'Resume | Adam Fariz, Full Stack Developer',
    description:
      'Download or read the resume of Adam Fariz, a full stack developer in Casablanca, Morocco. Skills, experience, and education on one page.',
    ogImage: '/meta/resume.png',
    twitterCard: 'summary',
  },

  '/contact': {
    title: 'Contact | Hire a Full Stack Developer in Morocco',
    description:
      'Get in touch with Adam Fariz for freelance projects, full-time roles, or technical advice. Based in Casablanca and Rabat, Morocco. Replies within a day.',
    ogImage: '/meta/contact.png',
    twitterCard: 'summary_large_image',
  },

  '/blog': {
    title: 'Articles | Notes on Building Full Stack Products',
    description:
      'Articles by Adam Fariz on architecture decisions, performance work, and lessons from shipping web and mobile products from Morocco.',
    ogImage: '/meta/blogs.png',
    twitterCard: 'summary_large_image',
  },

  // Template pages kept out of the index until they hold real content
  '/gears': {
    title: 'Gear and Setup',
    description: 'Devices and tools used day to day.',
    ogImage: '/meta/gears.png',
    index: false,
  },
  '/setup': {
    title: 'Editor Setup',
    description: 'VS Code configuration and extensions.',
    ogImage: '/meta/setup.png',
    index: false,
  },
  '/journey': {
    title: 'Journey',
    description: 'Milestones and certificates.',
    index: false,
  },
  '/journey/certificates': {
    title: 'Certificates',
    description: 'Certificates and achievements.',
    index: false,
  },
};

export function getPageMetadata(pathname: string): PageMeta {
  return pageMetadata[pathname] || pageMetadata['/'];
}

/** Builds the full Next.js metadata object for a route. */
export function generateMetadata(pathname: string): Metadata {
  const pageMeta = getPageMetadata(pathname);
  const url = `${siteConfig.url}${pathname === '/' ? '' : pathname}`;
  const index = pageMeta.index ?? true;
  const image = pageMeta.ogImage || siteConfig.ogImage;

  return {
    metadataBase: new URL(siteConfig.url),
    title: pageMeta.title,
    description: pageMeta.description,
    authors: [{ name: siteConfig.author.name, url: siteConfig.url }],
    creator: siteConfig.author.name,
    publisher: siteConfig.author.name,
    applicationName: siteConfig.name,
    category: 'technology',
    openGraph: {
      type: 'website',
      locale: siteConfig.locale,
      url,
      title: pageMeta.title,
      description: pageMeta.description,
      siteName: siteConfig.title,
      images: [{ url: image, width: 1200, height: 630, alt: pageMeta.title }],
    },
    twitter: {
      card: pageMeta.twitterCard || 'summary_large_image',
      title: pageMeta.title,
      description: pageMeta.description,
      images: [image],
    },
    robots: index
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        }
      : { index: false, follow: false },
    alternates: { canonical: url },
    other: {
      'geo.region': `${siteConfig.location.countryCode}-06`,
      'geo.placename': siteConfig.location.cities.join(', '),
    },
  };
}
