'use client';

import { useState } from 'react';
import Image from 'next/image';
import { heroConfig, socialLinks } from '@/config/Hero';
import Container from '../common/Container';
import { TrackedLink } from '../common/TrackedLink';

function CopyIcon({ className = 'size-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
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
  const { name, title, avatar } = heroConfig;
  const [copied, setCopied] = useState(false);
  const email = 'adam.fariz@um5r.ac.ma';

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
    <Container className="pt-12 pb-10 sm:pt-16 sm:pb-14">
      {/* Header section matching reference structure */}
      <div className="flex items-center gap-5 sm:gap-6">
        <Image
          src={avatar}
          alt={`${name} profile photo`}
          width={112}
          height={112}
          className="size-20 rounded-full bg-neutral-800 object-cover sm:size-28 shrink-0"
          priority
        />

        <div className="flex flex-col justify-center min-w-0">
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {name}
          </h1>

          <div className="mt-1 flex flex-wrap items-center gap-x-2 text-base text-neutral-400 sm:text-lg">
            <span>{title}</span>
            <span className="text-neutral-600">·</span>
            <span>Casablanca / Rabat</span>
            <span className="text-neutral-600">·</span>

            <div className="inline-flex items-center gap-1.5">
              <TrackedLink
                href={`mailto:${email}`}
                className="transition-colors hover:text-white"
                track={{ name: 'email_click', data: { location: 'hero' } }}
              >
                {email}
              </TrackedLink>
              <button
                onClick={handleCopyEmail}
                type="button"
                aria-label="Copy email address"
                className="text-neutral-500 hover:text-white transition-colors p-0.5"
              >
                {copied ? <CheckIcon className="size-4 text-emerald-500" /> : <CopyIcon className="size-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Your original Bio */}
      <p className="mt-8 max-w-2xl text-base leading-7 text-secondary sm:mt-9 sm:text-xl">
        Full Stack Developer building secure web and mobile applications, reliable APIs, and AI-powered tools.
      </p>

      {/* Your original Status badge */}
      <div className="mt-6 flex items-center gap-2 text-base text-secondary sm:text-lg">
        <span className="flex size-6 items-center justify-center rounded-full bg-emerald-500 text-xs text-black">●</span>
        <span>Open to freelance and full-time opportunities</span>
      </div>

      {/* Your original Social Links */}
      <div className="mt-7 flex items-center gap-4">
        {socialLinks.map((link) => (
          <TrackedLink
            key={link.name}
            href={link.href}
            className="text-secondary transition-colors hover:text-foreground"
            aria-label={link.name}
            track={{ name: 'external_link_click', data: { url: link.href, location: 'hero_social' } }}
          >
            <span className="block size-6">{link.icon}</span>
          </TrackedLink>
        ))}
      </div>
    </Container>
  );
}