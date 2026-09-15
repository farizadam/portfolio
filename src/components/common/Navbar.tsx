'use client';

import { heroConfig } from '@/config/Hero';
import { navbarConfig } from '@/config/Navbar';
import { cn } from '@/lib/utils';
import { Link } from 'next-view-transitions';
import { usePathname } from 'next/navigation';
import React from 'react';

import Container from './Container';
import { ThemeToggleButton } from './ThemeSwitch';
import { TrackedLink } from './TrackedLink';

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-20 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <Container className="py-3.5">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="shrink-0 text-sm font-bold tracking-tight transition-opacity hover:opacity-70"
            aria-label="Home"
          >
            {heroConfig.name}
            <span className="text-amber-500">.</span>
          </Link>

          <nav className="hidden items-center gap-1 text-sm font-medium sm:flex">
            {navbarConfig.navItems
              .filter((item) => item.href !== '/')
              .map((item) => {
                const active = isActive(item.href);
                return (
                  <TrackedLink
                    key={item.label}
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'rounded-md px-3 py-1.5 transition-colors duration-200',
                      active
                        ? 'bg-accent text-foreground'
                        : 'text-muted-foreground hover:bg-accent/60 hover:text-foreground',
                    )}
                    track={{
                      name: 'button_click',
                      data: { buttonId: item.label, section: 'navbar' },
                    }}
                  >
                    {item.label}
                  </TrackedLink>
                );
              })}
          </nav>

          <div className="flex items-center gap-2">
            {/* Compact mobile nav */}
            <nav className="flex items-center gap-3 text-xs font-medium sm:hidden">
              {navbarConfig.navItems
                .filter((item) => ['Projects', 'Resume', 'Contact'].includes(item.label))
                .map((item) => (
                  <TrackedLink
                    key={item.label}
                    href={item.href}
                    className={cn(
                      'transition-colors',
                      isActive(item.href) ? 'text-foreground' : 'text-muted-foreground',
                    )}
                    track={{
                      name: 'button_click',
                      data: { buttonId: item.label, section: 'navbar' },
                    }}
                  >
                    {item.label}
                  </TrackedLink>
                ))}
            </nav>
            <ThemeToggleButton
              className="text-muted-foreground hover:text-foreground"
              variant="circle"
              start="top-right"
              blur
            />
          </div>
        </div>
      </Container>
    </header>
  );
}
