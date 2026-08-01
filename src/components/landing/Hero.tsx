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
    <Container className="pt-16 pb-12 sm:pt-24 sm:pb-16">
      {/* Header section */}
      <div className="flex items-center gap-6 sm:gap-8">
        {/* Avatar with animated gradient ring */}
        <div className="group relative shrink-0">
          <div className="absolute -inset-[3px] rounded-full bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500 opacity-80 blur-[1px] transition-opacity duration-500 group-hover:opacity-100" />
          <div className="relative rounded-full bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500 p-[2.5px]">
            <Image
              src={avatar}
              alt={`${name} profile photo`}
              width={120}
              height={120}
              className="size-22 rounded-full bg-neutral-900 object-cover ring-2 ring-neutral-900 sm:size-28"
              priority
            />
          </div>
        </div>

        <div className="flex flex-col justify-center min-w-0">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            {name}
          </h1>

          <div className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-neutral-500 sm:text-[15px]">
            <span className="font-medium text-neutral-400">{title}</span>
            <span className="text-neutral-700">·</span>
            <span>Casablanca / Rabat</span>
            <span className="text-neutral-700">·</span>

            <div className="inline-flex items-center gap-1.5">
              <TrackedLink
                href={`mailto:${email}`}
                className="text-neutral-400 transition-colors duration-200 hover:text-foreground"
                track={{ name: 'email_click', data: { location: 'hero' } }}
              >
                {email}
              </TrackedLink>
              <button
                onClick={handleCopyEmail}
                type="button"
                aria-label="Copy email address"
                className="text-neutral-600 hover:text-foreground transition-all duration-200 p-0.5 hover:scale-110"
              >
                {copied ? <CheckIcon className="size-3.5 text-emerald-400" /> : <CopyIcon className="size-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bio */}
      <p className="mt-9 max-w-2xl text-[15px] leading-relaxed text-neutral-400 sm:mt-11 sm:text-lg sm:leading-relaxed">
        Full Stack Developer building secure web and mobile applications, reliable APIs, and AI-powered tools.
      </p>

      {/* Status badge */}
      <div className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-emerald-500/10 bg-emerald-500/5 px-4 py-2 text-sm text-neutral-400">
        <span className="relative flex size-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
        </span>
        <span>Open to freelance and full-time opportunities</span>
      </div>

      {/* Thin separator */}
      <div className="mt-8 border-t border-white/[0.04]" />

      {/* Social Links */}
      <div className="mt-6 flex items-center gap-1">
        {socialLinks.map((link) => (
          <TrackedLink
            key={link.name}
            href={link.href}
            className="group/social flex items-center gap-2 rounded-lg px-3 py-2 text-neutral-600 transition-all duration-200 hover:bg-white/[0.03] hover:text-neutral-300"
            aria-label={link.name}
            track={{ name: 'external_link_click', data: { url: link.href, text: link.name, location: 'hero_social' } }}
          >
            <span className="block size-[18px] transition-transform duration-200 group-hover/social:scale-110">{link.icon}</span>
            <span className="text-xs font-medium opacity-0 transition-opacity duration-200 group-hover/social:opacity-100 hidden sm:inline">{link.name}</span>
          </TrackedLink>
        ))}
      </div>
    </Container>
  );
}