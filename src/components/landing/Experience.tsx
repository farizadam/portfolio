import { experiences } from '@/config/Experience';
import { Link } from 'next-view-transitions';
import React from 'react';

import Container from '../common/Container';

export default function Experience() {
  return (
    <Container className="py-10 sm:py-14">
      <div className="mb-6 flex items-baseline justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Experience</h2>
        <Link href="/work-experience" className="text-sm text-secondary transition-colors hover:text-foreground">
          View all
        </Link>
      </div>
      <div className="space-y-7">
        {experiences.map((experience) => (
          <article key={experience.company} className="grid gap-1 sm:grid-cols-[1fr_auto] sm:gap-x-10">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold">{experience.company}</h3>
                {experience.isCurrent && (
                  <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/15 px-2 py-1 text-xs font-semibold text-emerald-300">
                    <span className="size-2 rounded-full bg-emerald-400" /> Working
                  </span>
                )}
              </div>
              <p className="mt-1 text-base text-secondary">{experience.position}</p>
            </div>
            <div className="text-sm text-secondary sm:text-right sm:text-base">
              <p>{experience.startDate} – {experience.isCurrent ? 'Present' : experience.endDate}</p>
              <p>{experience.location}</p>
            </div>
          </article>
        ))}
      </div>
    </Container>
  );
}
