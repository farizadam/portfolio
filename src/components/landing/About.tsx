'use client';

import React from 'react';
import Image from 'next/image';
import { about, mySkills } from '@/config/About';

import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

export default function About() {
  return (
    <Container className="mt-16 sm:mt-24">
      <SectionHeading subHeading="About" heading="About" />

      {/* About Section Wrapper */}
      <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-start lg:gap-12">
        {/* Profile / About Image Container */}
        <div className="relative shrink-0 self-center md:self-start">
          <Image
            src="/assets/logo.png"
            alt={`${about.name} about illustration`}
            width={240}
            height={240}
            className="size-48 rounded-2xl border border-white/5 bg-neutral-950 object-cover sm:size-56 md:size-60"
            priority
          />
        </div>

        {/* Info Column */}
        <div className="flex flex-1 flex-col">
          <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {about.name}
          </h3>

          <p className="mt-4 text-base leading-relaxed text-neutral-400 sm:text-lg">
            {about.description}
          </p>

          {/* Skills Section */}
          <div className="mt-8">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
              Tech &amp; Skills
            </h4>
            
            <div className="mt-4 flex flex-wrap gap-3">
              {mySkills.map((skill, index) => {
                const skillName = skill.name || `skill-${index}`;

                return (
                  <Tooltip key={skillName}>
                    <TooltipTrigger asChild>
                      <div className="flex size-10 items-center justify-center rounded-xl border border-white/5 bg-neutral-950/50 p-2 text-neutral-500 transition-all duration-200 hover:scale-105 hover:border-white/10 hover:text-neutral-300">
                        {skill.icon}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="border-white/5 bg-neutral-950 text-xs font-medium text-neutral-300">
                      {skillName}
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}