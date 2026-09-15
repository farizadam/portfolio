import { experiences } from '@/config/Experience';
import { Link } from 'next-view-transitions';
import React from 'react';

import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

export default function Experience() {
  return (
    <Container id="experience" className="py-10 sm:py-14">
      <div className="flex items-end justify-between gap-4">
        <SectionHeading subHeading="Career" heading="Experience" />
        <Link
          href="/work-experience"
          className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
        >
          View all
        </Link>
      </div>

      <div className="mt-8 divide-y divide-border">
        {experiences.map((experience) => (
          <article
            key={experience.company}
            className="grid gap-3 py-6 first:pt-0 last:pb-0 sm:grid-cols-[1fr_auto] sm:gap-x-10"
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2.5">
                <h3 className="text-lg font-bold">{experience.company}</h3>
                {experience.isCurrent && (
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    <span className="size-1.5 rounded-full bg-emerald-500" /> Current
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-sm text-muted-foreground">{experience.position}</p>
              {experience.description[0] && (
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-foreground/80">
                  {experience.description[0]}
                </p>
              )}
              {experience.technologies.length > 0 && (
                <ul className="mt-3 flex flex-wrap items-center gap-2">
                  {experience.technologies.map((tech) => (
                    <li key={tech.name}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="block size-5 text-muted-foreground transition-all duration-200 hover:scale-110 hover:text-foreground">
                            {tech.icon}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>{tech.name}</TooltipContent>
                      </Tooltip>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="text-sm text-muted-foreground sm:text-right">
              <p className="whitespace-nowrap">
                {experience.startDate} – {experience.isCurrent ? 'Present' : experience.endDate}
              </p>
              <p>{experience.location}</p>
            </div>
          </article>
        ))}
      </div>
    </Container>
  );
}
