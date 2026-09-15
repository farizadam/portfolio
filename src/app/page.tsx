import Contact from '@/components/landing/Contact';
import Education from '@/components/landing/Education';
import Experience from '@/components/landing/Experience';
import Github from '@/components/landing/Github';
import Hero from '@/components/landing/Hero';
import Work from '@/components/landing/Projects';
import Skills from '@/components/landing/Skills';
import React from 'react';

export default function Page() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Work />
      <Skills />
      <Experience />
      <Education />
      <Github />
      <Contact />
    </main>
  );
}
