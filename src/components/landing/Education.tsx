import { educationConfig } from '@/config/Education';
import React from 'react';

import Container from '../common/Container';

export default function Education() {
  return (
    <Container id="education" className="mt-16 sm:mt-24">
      <h2 className="text-2xl font-bold tracking-tight">Education</h2>

      <div className="mt-8 divide-y divide-white/5">
        {educationConfig.map((edu) => (
          <article key={edu.institution} className="py-5 first:pt-0 last:pb-0">
            <div className="grid gap-1 sm:grid-cols-[1fr_auto] sm:gap-x-10">
              <div>
                <h3 className="text-lg font-bold">{edu.institution}</h3>
                <p className="mt-1 text-sm text-neutral-500">{edu.degree}</p>
              </div>
              <div className="text-sm text-neutral-500 sm:text-right">
                <p>{edu.date}</p>
              </div>
            </div>

            {edu.coursework.length > 0 && (
              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
                  Relevant Coursework
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {edu.coursework.map((course) => (
                    <span
                      key={course}
                      className="rounded-md border border-neutral-200 bg-background/50 px-2.5 py-1 text-xs text-neutral-600 dark:border-white/5 dark:bg-neutral-950/50 dark:text-neutral-400"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
    </Container>
  );
}
