import { educationConfig } from '@/config/Education';
import React from 'react';

import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';

export default function Education() {
  return (
    <Container id="education" className="py-10 sm:py-14">
      <SectionHeading subHeading="Academics" heading="Education" />

      <div className="mt-8 divide-y divide-border">
        {educationConfig.map((edu) => (
          <article key={edu.institution} className="py-6 first:pt-0 last:pb-0">
            <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:gap-x-10">
              <div className="flex gap-4">
                {edu.logo && (
                  <img
                    src={edu.logo}
                    alt={`${edu.institution} logo`}
                    className="h-12 w-12 rounded-md object-contain bg-white p-1"
                  />
                )}
                <div>
                  <h3 className="text-lg font-bold">{edu.institution}</h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">{edu.degree}</p>
                </div>
              </div>
              <div className="text-sm text-muted-foreground sm:text-right">
                <p className="whitespace-nowrap">{edu.date}</p>
              </div>
            </div>

            {edu.coursework.length > 0 && (
              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Relevant Coursework
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {edu.coursework.map((course) => (
                    <span
                      key={course}
                      className="rounded-md border border-border bg-card/50 px-2.5 py-1 text-xs text-muted-foreground"
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
