import { footerConfig } from '@/config/Footer';
import React from 'react';

import Container from './Container';

export default function Footer() {
  return (
    <Container className="py-16">
      <div className="border-t border-white/5 pt-10 flex flex-col items-center justify-center">
        <p className="text-neutral-500 text-center text-sm">
          {footerConfig.text} <b className="text-neutral-400">{footerConfig.developer}</b> <br /> &copy;{' '}
          {new Date().getFullYear()}. {footerConfig.copyright}
        </p>
      </div>
    </Container>
  );
}
