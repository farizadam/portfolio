import Education from '@/components/landing/Education';
import Experience from '@/components/landing/Experience';
import Github from '@/components/landing/Github';
import Hero from '@/components/landing/Hero';
import Work from '@/components/landing/Projects';
import React from 'react';

export default function page() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Experience />
      <Work />
      <Education />
      <Github />
    </main>
  );
}
