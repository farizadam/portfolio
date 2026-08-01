import { navbarConfig } from '@/config/Navbar';
import React from 'react';

import Container from './Container';
import { ThemeToggleButton } from './ThemeSwitch';
import { TrackedLink } from './TrackedLink';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm">
      <Container className="py-4">
        <div className="flex items-center justify-between">
          <nav className="flex items-center gap-6 text-sm font-medium text-neutral-500 sm:gap-9">
            {navbarConfig.navItems.map((item) => (
              <TrackedLink
                className="transition-colors duration-200 hover:text-foreground"
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
          <ThemeToggleButton className="text-neutral-500 hover:text-foreground" variant="circle" start="top-right" blur />
        </div>
      </Container>
    </header>
  );
}
