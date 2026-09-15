'use client';

import { heroConfig, socialLinks } from '@/config/Hero';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import { useState } from 'react';

import Container from '../common/Container';
import { TrackedLink } from '../common/TrackedLink';
import ArrowRight from '../svgs/ArrowRight';
import CV from '../svgs/CV';
import HeroVisual from '../three/HeroVisual';
import { Button } from '../ui/button';

function CopyIcon({ className = 'size-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
      />
    </svg>
  );
}

function CheckIcon({ className = 'size-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function Hero() {
  const { name, title, avatar, headline, intro, introFr, location, email, availability, now } = heroConfig;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  return (
    <Container className="animate-fade-in-blur relative pt-6 pb-12 sm:pt-12 sm:pb-16">
      <div className="grid items-center gap-10 md:grid-cols-[1fr_auto]">
        <div className="min-w-0">
          {/* Identity row */}
          <div className="flex items-center gap-5 sm:gap-6">
            <div className="group relative shrink-0">
              <div className="absolute -inset-[3px] rounded-full bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500 opacity-80 blur-[1px] transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative rounded-full bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500 p-[2.5px]">
                <Image
                  src={avatar}
                  alt={`${name} profile photo`}
                  width={120}
                  height={120}
                  className="size-20 rounded-full bg-background object-cover ring-2 ring-background sm:size-24"
                  priority
                />
              </div>
            </div>

            <div className="flex min-w-0 flex-col justify-center">
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{name}</h1>
              <div className="mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-muted-foreground sm:text-[15px]">
                <span className="font-medium text-foreground/80">{title}</span>
                <span className="text-border">·</span>
                <span>{location}</span>
              </div>
            </div>
          </div>

          {/* Headline and intro */}
          <h2 className="mt-8 max-w-xl text-2xl font-bold leading-snug tracking-tight sm:mt-10 sm:text-[2rem]">
            {headline}
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-lg sm:leading-relaxed">
            {intro}
          </p>
          {introFr && (
            <p lang="fr" className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground/80">
              {introFr}
            </p>
          )}

          {/* CTAs */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button
              asChild
              size="lg"
              track={{ name: 'button_click', data: { buttonId: 'hero_contact', section: 'hero' } }}
            >
              <Link href="/contact">
                Get in touch
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              track={{ name: 'button_click', data: { buttonId: 'hero_resume', section: 'hero' } }}
            >
              <Link href="/resume">
                <CV className="size-4" />
                Resume
              </Link>
            </Button>

            <div className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <TrackedLink
                href={`mailto:${email}`}
                className="transition-colors duration-200 hover:text-foreground"
                track={{ name: 'email_click', data: { location: 'hero' } }}
              >
                {email}
              </TrackedLink>
              <button
                onClick={handleCopyEmail}
                type="button"
                aria-label="Copy email address"
                className="p-0.5 text-muted-foreground transition-all duration-200 hover:scale-110 hover:text-foreground"
              >
                {copied ? (
                  <CheckIcon className="size-3.5 text-emerald-500" />
                ) : (
                  <CopyIcon className="size-3.5" />
                )}
              </button>
            </div>
          </div>

          {/* Status and "now" */}
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3.5 py-1.5">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              {availability}
            </span>
            {now && (
              <span>
                <span className="font-medium text-foreground/70">Now:</span> {now}
              </span>
            )}
          </div>
        </div>

        {/* 3D visual */}
        <HeroVisual className="mx-auto size-56 sm:size-72 md:size-80" />
      </div>

      {/* Social links */}
      <div className="mt-10 flex items-center gap-1 border-t border-border pt-6">
        {socialLinks.map((link) => (
          <TrackedLink
            key={link.name}
            href={link.href}
            className="group/social flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-all duration-200 hover:bg-accent hover:text-foreground"
            aria-label={link.name}
            track={{
              name: 'external_link_click',
              data: { url: link.href, text: link.name, location: 'hero_social' },
            }}
          >
            <span className="block size-[18px] transition-transform duration-200 group-hover/social:scale-110">
              {link.icon}
            </span>
            <span className="hidden text-xs font-medium sm:inline">{link.name}</span>
          </TrackedLink>
        ))}
      </div>
    </Container>
  );
}
