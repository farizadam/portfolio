'use client';

import { type Experience } from '@/config/Experience';
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { useMemo, useRef } from 'react';

import { ExperienceCard } from './ExperienceCard';

interface ExperienceTimelineProps {
  experiences: Experience[];
}

const MONTHS: Record<string, number> = {
  january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
  july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
};

function parseDate(input: string): Date | null {
  const [monthName, year] = input.trim().split(/\s+/);
  const m = MONTHS[monthName?.toLowerCase() ?? ''];
  const y = Number(year);
  if (m === undefined || Number.isNaN(y)) return null;
  return new Date(y, m, 1);
}

function monthsBetween(a: Date, b: Date) {
  return Math.max(1, (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth()) + 1);
}

function formatDuration(months: number) {
  const y = Math.floor(months / 12);
  const m = months % 12;
  if (y === 0) return `${m} mo`;
  if (m === 0) return `${y} yr`;
  return `${y} yr ${m} mo`;
}

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.75', 'end 0.65'],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  // Newest role first, regardless of config order
  const ordered = useMemo(
    () =>
      [...experiences].sort((a, b) => {
        if (a.isCurrent !== b.isCurrent) return a.isCurrent ? -1 : 1;
        const da = parseDate(a.startDate)?.getTime() ?? 0;
        const db = parseDate(b.startDate)?.getTime() ?? 0;
        return db - da;
      }),
    [experiences],
  );

  const stats = useMemo(() => {
    const now = new Date();
    let totalMonths = 0;
    const companies = new Set<string>();
    const stack = new Map<string, number>();
    const durations = new Map<string, number>();

    experiences.forEach((exp) => {
      companies.add(exp.company);
      exp.technologies.forEach((t) => stack.set(t.name, (stack.get(t.name) ?? 0) + 1));
      const start = parseDate(exp.startDate);
      const end = exp.isCurrent ? now : parseDate(exp.endDate);
      if (start && end) {
        const months = monthsBetween(start, end);
        totalMonths += months;
        durations.set(exp.company, months);
      }
    });

    return {
      roles: experiences.length,
      companies: companies.size,
      totalMonths,
      stack: Array.from(stack.entries())
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .slice(0, 8)
        .map(([name]) => name),
      durations,
    };
  }, [experiences]);

  if (experiences.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border py-12 text-center">
        <p className="text-sm text-muted-foreground">No work experiences found.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Summary */}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="rounded-2xl border border-border bg-card/50 p-5 sm:p-6"
      >
        <div className="grid grid-cols-3 gap-4 sm:flex sm:gap-10">
          <Stat value={stats.roles} label="roles" />
          <Stat value={stats.companies} label="companies" />
          <Stat value={formatDuration(stats.totalMonths)} label="hands-on experience" />
        </div>
        <div className="mt-5 flex flex-col gap-2 border-t border-border pt-4 sm:flex-row sm:items-center sm:gap-4">
          <p className="shrink-0 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Most used
          </p>
          <div className="flex flex-wrap gap-1.5">
            {stats.stack.map((name) => (
              <span
                key={name}
                className="rounded-md border border-border bg-background px-2 py-0.5 text-xs font-medium text-foreground/80"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Timeline */}
      <div ref={ref} className="relative mt-10 ml-2 pl-6 sm:ml-4 sm:pl-8">
        {/* Track */}
        <div aria-hidden className="absolute top-0 bottom-0 left-0 w-px bg-border" />
        {/* Progress line that draws on scroll */}
        <motion.div
          aria-hidden
          style={{ scaleY: reduced ? 1 : lineScale }}
          className="absolute top-0 bottom-0 left-0 w-px origin-top bg-gradient-to-b from-emerald-500 via-amber-500 to-amber-500/40"
        />

        <div className="flex flex-col gap-8">
          {ordered.map((experience, index) => (
            <motion.div
              key={experience.company || index}
              initial={reduced ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index === 0 ? 0.1 : 0 }}
            >
              <ExperienceCard
                experience={experience}
                duration={
                  stats.durations.has(experience.company)
                    ? formatDuration(stats.durations.get(experience.company)!)
                    : undefined
                }
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: number | string; label: string }) {
  return (
    <div>
      <p className="text-2xl font-extrabold tracking-tight sm:text-3xl">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
