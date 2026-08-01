import { experiences } from '@/config/Experience';
import { Link } from 'next-view-transitions';
import React from 'react';

import Container from '../common/Container';

export default function Experience() {
  return (
    <Container className="py-10 sm:py-14">
      <div className="mb-8 flex items-baseline justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Experience</h2>
        <Link href="/work-experience" className="text-sm text-neutral-500 transition-colors duration-200 hover:text-foreground">
          View all
        </Link>
      </div>
      <div className="divide-y divide-white/5">
        {experiences.map((experience) => (
          <article key={experience.company} className="grid gap-1 py-5 first:pt-0 last:pb-0 sm:grid-cols-[1fr_auto] sm:gap-x-10">
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-lg font-bold">{experience.company}</h3>
                {experience.isCurrent && (
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400">
                    <span className="size-1.5 rounded-full bg-emerald-400" /> Working
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-neutral-500">{experience.position}</p>
            </div>
            <div className="text-sm text-neutral-500 sm:text-right">
              <p>{experience.startDate} – {experience.isCurrent ? 'Present' : experience.endDate}</p>
              <p>{experience.location}</p>
            </div>
          </article>
        ))}
      </div>
    </Container>
  );
}
