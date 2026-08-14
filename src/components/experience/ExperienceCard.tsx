import React from 'react';
import Image from 'next/image';
import { Link } from 'next-view-transitions';
import { type Experience } from '@/config/Experience';
import { cn } from '@/lib/utils';

import Skill from '../common/Skill';
import Github from '../svgs/Github';
import LinkedIn from '../svgs/LinkedIn';
import Website from '../svgs/Website';
import X from '../svgs/X';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface ExperienceCardProps {
  experience: Experience;
}

// Safely formats *bold text* without dangerouslySetInnerHTML
function FormattedDescription({ text }: { text: string }) {
  const parts = text.split(/(\*.*?\*)/g);

  return (
    <span>
      {parts.map((part, index) => {
        if (part.startsWith('*') && part.endsWith('*')) {
          return (
            <strong key={index} className="font-semibold text-neutral-900 dark:text-neutral-200">
              {part.slice(1, -1)}
            </strong>
          );
        }
        return part;
      })}
    </span>
  );
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  const socialLinks = [
    { href: experience.website, label: 'Visit Website', icon: <Website /> },
    { href: experience.x, label: 'Follow on X', icon: <X /> },
    { href: experience.linkedin, label: 'Connect on LinkedIn', icon: <LinkedIn /> },
    { href: experience.github, label: 'View GitHub', icon: <Github /> },
  ].filter((link) => Boolean(link.href));

  return (
    <div className="group relative flex flex-col gap-5 rounded-2xl border border-neutral-200 bg-white p-5 transition-all duration-200 hover:border-neutral-300 hover:bg-neutral-50 dark:border-neutral-800/80 dark:bg-neutral-900/40 dark:hover:border-neutral-700 dark:hover:bg-neutral-900/80 sm:p-6">
      {/* Timeline Bullet Node */}
      <span 
        aria-hidden="true" 
        className="absolute -left-[31px] sm:-left-[39px] top-7 size-3.5 rounded-full border-2 border-white bg-neutral-300 transition-colors group-hover:bg-emerald-500 dark:border-neutral-950 dark:bg-neutral-600 dark:group-hover:bg-emerald-400" 
      />

      {/* Card Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-4">
          {experience.image && (
            <Image
              src={experience.image}
              alt={`${experience.company} logo`}
              width={48}
              height={48}
              className="size-12 rounded-xl bg-neutral-100 object-cover ring-1 ring-black/5 dark:bg-neutral-800 dark:ring-white/10 shrink-0"
            />
          )}

          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-2">
              <h3
                className={cn(
                  'text-lg font-bold text-neutral-900 dark:text-white sm:text-xl',
                  experience.isBlur ? 'blur-[5px]' : 'blur-none'
                )}
              >
                {experience.company}
              </h3>

              {/* Social Links */}
              <div className="flex items-center gap-1.5 ml-1">
                {socialLinks.map((link) => (
                  <Tooltip key={link.label}>
                    <TooltipTrigger asChild>
                      <Link
                        href={link.href!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 text-neutral-400 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                      >
                        <span className="block size-4">{link.icon}</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>{link.label}</TooltipContent>
                  </Tooltip>
                ))}
              </div>

              {/* Active Working Indicator */}
              {experience.isCurrent && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                  </span>
                  Working
                </span>
              )}
            </div>

            <p className="mt-0.5 text-base font-medium text-neutral-600 dark:text-neutral-300">
              {experience.position}
            </p>
          </div>
        </div>

        {/* Date & Location */}
        <div className="text-xs text-neutral-500 dark:text-neutral-400 sm:text-right sm:text-sm">
          <p className="font-mono text-neutral-600 dark:text-neutral-300">
            {experience.startDate} – {experience.isCurrent ? 'Present' : experience.endDate}
          </p>
          <p className="mt-0.5 text-neutral-500">{experience.location}</p>
        </div>
      </div>

      {/* Description List */}
      {experience.description && experience.description.length > 0 && (
        <ul className="space-y-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-base">
          {experience.description.map((desc: string, descIndex: number) => (
            <li key={descIndex} className="flex items-start gap-2">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-neutral-300 dark:bg-neutral-500" aria-hidden="true" />
              <div>
                <FormattedDescription text={desc} />
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Tech Stack Skills */}
      {experience.technologies && experience.technologies.length > 0 && (
        <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800/60">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
            Technologies
          </h4>
          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((technology, techIndex: number) => (
              <Skill
                key={techIndex}
                name={technology.name}
                href={technology.href}
              >
                {technology.icon}
              </Skill>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}