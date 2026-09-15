'use client';

import { heroConfig, socialLinks } from '@/config/Hero';
import { Link } from 'next-view-transitions';
import React from 'react';

import Container from '../common/Container';
import { TrackedLink } from '../common/TrackedLink';
import ArrowRight from '../svgs/ArrowRight';
import { Button } from '../ui/button';

export default function Contact() {
  const { email, availability } = heroConfig;

  return (
    <Container id="contact" className="py-10 sm:py-14">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card/50 px-6 py-10 sm:px-12 sm:py-14">
        {/* Accent glow */}
        <div className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-amber-500/10 blur-3xl" />

        <div className="relative flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Contact
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Let&apos;s build something together.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground sm:text-lg">
              Have a product to ship, an API to harden, or a team that needs a full stack developer?
              I usually reply within a day.
            </p>
            <div className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3.5 py-1.5 text-sm text-muted-foreground">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              {availability}
            </div>
          </div>

          <div className="flex flex-col items-start gap-3 md:items-end">
            <Button
              asChild
              size="lg"
              track={{ name: 'button_click', data: { buttonId: 'contact_cta', section: 'contact' } }}
            >
              <Link href="/contact">
                Send a message
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <TrackedLink
              href={`mailto:${email}`}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              track={{ name: 'email_click', data: { location: 'contact_section' } }}
            >
              {email}
            </TrackedLink>
            <div className="flex items-center gap-1">
              {socialLinks.map((link) => (
                <TrackedLink
                  key={link.name}
                  href={link.href}
                  aria-label={link.name}
                  className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  track={{
                    name: 'external_link_click',
                    data: { url: link.href, text: link.name, location: 'contact_section' },
                  }}
                >
                  <span className="block size-[18px]">{link.icon}</span>
                </TrackedLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
