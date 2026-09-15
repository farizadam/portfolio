import { type Experience } from '@/config/Experience';
import { cn } from '@/lib/utils';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import React from 'react';

import Github from '../svgs/Github';
import LinkedIn from '../svgs/LinkedIn';
import Website from '../svgs/Website';
import X from '../svgs/X';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface ExperienceCardProps {
  experience: Experience;
  /** Pre-computed length of the role, e.g. "4 mo" */
  duration?: string;
}

// Safely formats *bold text* without dangerouslySetInnerHTML
function FormattedDescription({ text }: { text: string }) {
  const parts = text.split(/(\*.*?\*)/g);

  return (
    <span>
      {parts.map((part, index) => {
        if (part.startsWith('*') && part.endsWith('*')) {
          return (
            <strong key={index} className="font-semibold text-foreground">
              {part.slice(1, -1)}
            </strong>
          );
        }
        return part;
      })}
    </span>
  );
}

export function ExperienceCard({ experience, duration }: ExperienceCardProps) {
  const socialLinks = [
    { href: experience.website, label: 'Visit Website', icon: <Website /> },
    { href: experience.x, label: 'Follow on X', icon: <X /> },
    { href: experience.linkedin, label: 'Connect on LinkedIn', icon: <LinkedIn /> },
    { href: experience.github, label: 'View GitHub', icon: <Github /> },
  ].filter((link) => Boolean(link.href) && link.href !== '#');

  return (
    <div className="group relative flex flex-col gap-5 rounded-2xl border border-border bg-card/50 p-5 transition-all duration-300 hover:border-foreground/20 hover:shadow-lg hover:shadow-black/5 sm:p-6 dark:hover:shadow-black/30">
      {/* Timeline node */}
      <span
        aria-hidden="true"
        className={cn(
          'absolute top-7 -left-[31px] size-3.5 rounded-full border-2 border-background transition-colors sm:-left-[39px]',
          experience.isCurrent
            ? 'bg-emerald-500'
            : 'bg-muted-foreground/40 group-hover:bg-foreground/60',
        )}
      />

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-4">
          {experience.image && (
            <Image
              src={experience.image}
              alt={`${experience.company} logo`}
              width={48}
              height={48}
              className="size-12 shrink-0 rounded-xl bg-muted object-cover ring-1 ring-border"
            />
          )}

          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-2">
              <h3
                className={cn(
                  'text-lg font-bold sm:text-xl',
                  experience.isBlur ? 'blur-[5px]' : 'blur-none',
                )}
              >
                {experience.company}
              </h3>

              {socialLinks.length > 0 && (
                <div className="ml-1 flex items-center gap-1.5">
                  {socialLinks.map((link) => (
                    <Tooltip key={link.label}>
                      <TooltipTrigger asChild>
                        <Link
                          href={link.href!}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 text-muted-foreground transition-colors hover:text-foreground"
                        >
                          <span className="block size-4">{link.icon}</span>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>{link.label}</TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              )}

              {experience.isCurrent && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                  </span>
                  Current
                </span>
              )}
            </div>

            <p className="mt-0.5 text-base font-medium text-foreground/80">{experience.position}</p>
          </div>
        </div>

        <div className="text-xs text-muted-foreground sm:text-right sm:text-sm">
          <p className="whitespace-nowrap text-foreground/80">
            {experience.startDate} – {experience.isCurrent ? 'Present' : experience.endDate}
            {duration && <span className="ml-1.5 text-muted-foreground">· {duration}</span>}
          </p>
          <p className="mt-0.5">{experience.location}</p>
        </div>
      </div>

      {/* Highlights */}
      {experience.description && experience.description.length > 0 && (
        <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
          {experience.description.map((desc: string, descIndex: number) => (
            <li key={descIndex} className="flex items-start gap-2.5">
              <span
                className="mt-2 size-1.5 shrink-0 rounded-full bg-amber-500/80"
                aria-hidden="true"
              />
              <div>
                <FormattedDescription text={desc} />
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Stack */}
      {experience.technologies && experience.technologies.length > 0 && (
        <div className="border-t border-border pt-4">
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Stack
          </h4>
          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((technology, techIndex: number) => (
              <Link
                key={techIndex}
                href={technology.href}
                target="_blank"
                rel="noopener noreferrer"
                className="tag-inner-shadow inline-flex items-center gap-2 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs font-medium text-foreground/80 transition-colors hover:text-foreground"
              >
                <span className="block size-4">{technology.icon}</span>
                {technology.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
