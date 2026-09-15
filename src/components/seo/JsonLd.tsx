import { experiences } from '@/config/Experience';
import { heroConfig, socialLinks } from '@/config/Hero';
import { siteConfig } from '@/config/Meta';
import { skillGroups } from '@/config/Skills';
import React from 'react';

/**
 * Structured data for the whole site. Rendered once in the root layout so
 * every page carries the Person, WebSite, and ProfilePage graph.
 */
export default function JsonLd() {
  const { url, location } = siteConfig;
  const personId = `${url}/#person`;
  const websiteId = `${url}/#website`;

  const sameAs = socialLinks
    .map((l) => l.href)
    .filter((href) => href.startsWith('http'));

  const knowsAbout = Array.from(
    new Set(skillGroups.flatMap((g) => g.items.map((i) => i.name))),
  );

  const currentRole = experiences.find((e) => e.isCurrent);

  const person = {
    '@type': 'Person',
    '@id': personId,
    name: heroConfig.name,
    url,
    image: `${url}${heroConfig.avatar}`,
    jobTitle: heroConfig.title,
    description: siteConfig.description,
    email: `mailto:${heroConfig.email}`,
    sameAs,
    knowsAbout,
    nationality: { '@type': 'Country', name: location.country },
    address: {
      '@type': 'PostalAddress',
      addressLocality: location.cities.join(' / '),
      addressRegion: location.region,
      addressCountry: location.countryCode,
    },
    homeLocation: location.cities.map((city) => ({
      '@type': 'City',
      name: city,
      containedInPlace: { '@type': 'Country', name: location.country },
    })),
    ...(currentRole && currentRole.website !== '#'
      ? {
          worksFor: {
            '@type': 'Organization',
            name: currentRole.company,
            url: currentRole.website,
          },
        }
      : {}),
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Mohammed V University, Rabat',
    },
  };

  const website = {
    '@type': 'WebSite',
    '@id': websiteId,
    url,
    name: siteConfig.title,
    description: siteConfig.description,
    inLanguage: 'en',
    author: { '@id': personId },
    publisher: { '@id': personId },
  };

  const profilePage = {
    '@type': 'ProfilePage',
    '@id': `${url}/#profile`,
    url,
    name: siteConfig.title,
    isPartOf: { '@id': websiteId },
    about: { '@id': personId },
    mainEntity: { '@id': personId },
  };

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [person, website, profilePage],
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe to inline; escape "<" to be strict
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, '\\u003c') }}
    />
  );
}
