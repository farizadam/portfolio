import Container from '@/components/common/Container';
import PageHeader from '@/components/common/PageHeader';
import { TrackedLink } from '@/components/common/TrackedLink';
import ContactForm from '@/components/contact/ContactForm';
import { contactConfig } from '@/config/Contact';
import { heroConfig, socialLinks } from '@/config/Hero';
import { generateMetadata as getMetadata } from '@/config/Meta';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  ...getMetadata('/contact'),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function ContactPage() {
  const { email, location, availability } = heroConfig;

  return (
    <Container className="py-10 sm:py-14">
      <PageHeader
        eyebrow="Contact"
        title={contactConfig.title}
        description={contactConfig.description}
      />

      <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,1fr)_280px]">
        {/* Form */}
        <div className="rounded-2xl border border-border bg-card/50 p-2 sm:p-4">
          <ContactForm />
        </div>

        {/* Sidebar */}
        <aside className="space-y-6 md:pt-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Email
            </p>
            <TrackedLink
              href={`mailto:${email}`}
              className="mt-1.5 block break-all text-sm font-medium transition-colors hover:text-amber-500"
              track={{ name: 'email_click', data: { location: 'contact_page' } }}
            >
              {email}
            </TrackedLink>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Based in
            </p>
            <p className="mt-1.5 text-sm">{location}</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Availability
            </p>
            <p className="mt-1.5 inline-flex items-center gap-2 text-sm">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              {availability}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Elsewhere
            </p>
            <ul className="mt-2 space-y-1.5">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <TrackedLink
                    href={link.href}
                    className="inline-flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    track={{
                      name: 'external_link_click',
                      data: { url: link.href, text: link.name, location: 'contact_page' },
                    }}
                  >
                    <span className="block size-4">{link.icon}</span>
                    {link.name}
                  </TrackedLink>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </Container>
  );
}
