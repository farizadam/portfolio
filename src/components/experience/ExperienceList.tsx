import React from 'react';
import { type Experience } from '@/config/Experience';
import { ExperienceCard } from './ExperienceCard';

interface ExperienceListProps {
  experiences: Experience[];
}

export function ExperienceList({ experiences }: ExperienceListProps) {
  if (experiences.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-neutral-500">No work experiences found.</p>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col gap-8 border-l border-neutral-800 ml-4 pl-6 sm:ml-6 sm:pl-8">
      {experiences.map((experience: Experience, index: number) => (
        <ExperienceCard key={experience.company || index} experience={experience} />
      ))}
    </div>
  );
}