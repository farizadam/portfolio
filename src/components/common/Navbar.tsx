import { navbarConfig } from '@/config/Navbar';
import React from 'react';

import Container from './Container';
import { ThemeToggleButton } from './ThemeSwitch';
import { TrackedLink } from './TrackedLink';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/5 bg-background/85 backdrop-blur">
      <Container className="py-3">
        <div className="flex items-center justify-between">
          <nav className="flex items-center gap-5 text-sm font-medium text-secondary sm:gap-8 sm:text-base">
            {navbarConfig.navItems.map((item) => (
              <TrackedLink
                className="transition-colors hover:text-foreground"
                key={item.label}
                href={item.href}
                track={{
                  name: 'button_click',
                  data: { buttonId: item.label, section: 'navbar' },
                }}
              >
                {item.label}
              </TrackedLink>
            ))}
          </nav>
          <ThemeToggleButton className="text-secondary hover:text-foreground" variant="circle" start="top-right" blur />
        </div>
      </Container>
    </header>
  );
}
