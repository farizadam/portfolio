import { footerConfig } from '@/config/Footer';
import { socialLinks } from '@/config/Hero';
import { navbarConfig } from '@/config/Navbar';
import React from 'react';

import Container from './Container';
import { TrackedLink } from './TrackedLink';

export default function Footer() {
  return (
    <Container className="py-12">
      <div className="flex flex-col gap-6 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          {footerConfig.text} <b className="text-foreground/80">{footerConfig.developer}</b>
          <br />
          &copy; {new Date().getFullYear()}. {footerConfig.copyright}
        </p>

        <div className="flex flex-col gap-4 sm:items-end">
          <nav className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium text-muted-foreground">
            {navbarConfig.navItems.map((item) => (
              <TrackedLink
                key={item.label}
                href={item.href}
                className="transition-colors hover:text-foreground"
                track={{ name: 'button_click', data: { buttonId: item.label, section: 'footer' } }}
              >
                {item.label}
              </TrackedLink>
            ))}
          </nav>
          <div className="flex items-center gap-1">
            {socialLinks.map((link) => (
              <TrackedLink
                key={link.name}
                href={link.href}
                aria-label={link.name}
                className="rounded-md p-1.5 text-muted-foreground transition-colors hover:text-foreground"
                track={{
                  name: 'external_link_click',
                  data: { url: link.href, text: link.name, location: 'footer' },
                }}
              >
                <span className="block size-4">{link.icon}</span>
              </TrackedLink>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
