'use client';

import { useUmami } from '@/hooks/use-umami';
import { cn } from '@/lib/utils';
import { type Project } from '@/types/project';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { useDeferredValue, useMemo, useState } from 'react';

import { ProjectCard } from './ProjectCard';

interface ProjectsExplorerProps {
  projects: Project[];
}

const ALL = 'All';

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
      <circle cx="11" cy="11" r="7" />
      <path strokeLinecap="round" d="m20 20-3.5-3.5" />
    </svg>
  );
}

export function ProjectsExplorer({ projects }: ProjectsExplorerProps) {
  const { trackEvent } = useUmami();
  const [category, setCategory] = useState<string>(ALL);
  const [tech, setTech] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    projects.forEach((p) => {
      const c = p.category ?? 'Other';
      counts.set(c, (counts.get(c) ?? 0) + 1);
    });
    return [[ALL, projects.length] as const, ...Array.from(counts.entries())];
  }, [projects]);

  const technologies = useMemo(() => {
    const counts = new Map<string, number>();
    projects.forEach((p) => p.technologies.forEach((t) => counts.set(t.name, (counts.get(t.name) ?? 0) + 1)));
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([name]) => name);
  }, [projects]);

  const filtered = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    return projects.filter((p) => {
      if (category !== ALL && (p.category ?? 'Other') !== category) return false;
      if (tech && !p.technologies.some((t) => t.name === tech)) return false;
      if (!q) return true;
      const haystack = [p.title, p.description, p.highlight ?? '', ...p.technologies.map((t) => t.name)]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [projects, category, tech, deferredQuery]);

  const hasFilters = category !== ALL || tech !== null || query.trim() !== '';

  const selectCategory = (c: string) => {
    setCategory(c);
    trackEvent({ name: 'button_click', data: { buttonId: 'project_filter_category', section: 'projects', action: c } });
  };

  const selectTech = (t: string) => {
    const next = tech === t ? null : t;
    setTech(next);
    trackEvent({ name: 'button_click', data: { buttonId: 'project_filter_tech', section: 'projects', action: next ?? 'clear' } });
  };

  const clear = () => {
    setCategory(ALL);
    setTech(null);
    setQuery('');
  };

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <LayoutGroup id="project-categories">
          <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Project categories">
            {categories.map(([name, count]) => {
              const active = category === name;
              return (
                <button
                  key={name}
                  role="tab"
                  aria-selected={active}
                  onClick={() => selectCategory(name)}
                  className={cn(
                    'relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors',
                    active ? 'text-background' : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="category-pill"
                      className="absolute inset-0 rounded-full bg-foreground"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative">
                    {name}
                    <span className={cn('ml-1.5 text-xs', active ? 'text-background/70' : 'text-muted-foreground/70')}>
                      {count}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>

        <label className="relative block sm:w-64">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects or stack"
            className="h-9 w-full rounded-md border border-border bg-background pr-3 pl-9 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-foreground/30 focus:ring-2 focus:ring-foreground/10"
          />
        </label>
      </div>

      {/* Tech chips */}
      <div className="mt-4 flex flex-wrap items-center gap-1.5">
        <span className="mr-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Stack
        </span>
        {technologies.map((name) => {
          const active = tech === name;
          return (
            <button
              key={name}
              onClick={() => selectTech(name)}
              aria-pressed={active}
              className={cn(
                'tag-inner-shadow rounded-md border px-2.5 py-1 text-xs font-medium transition-all',
                active
                  ? 'border-amber-500/50 bg-amber-500/10 text-amber-600 dark:text-amber-400'
                  : 'border-border bg-background text-muted-foreground hover:border-foreground/30 hover:text-foreground',
              )}
            >
              {name}
            </button>
          );
        })}
      </div>

      {/* Result line */}
      <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
        <p aria-live="polite">
          Showing <b className="text-foreground">{filtered.length}</b> of {projects.length}
        </p>
        <AnimatePresence>
          {hasFilters && (
            <motion.button
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              onClick={clear}
              className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              Clear filters
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Grid */}
      <motion.div layout className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.18 } }}
              transition={{ type: 'spring', stiffness: 260, damping: 26, delay: Math.min(i * 0.05, 0.3) }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 rounded-2xl border border-dashed border-border px-6 py-14 text-center"
          >
            <p className="text-base font-semibold">No projects match that filter.</p>
            <p className="mt-1 text-sm text-muted-foreground">Try another category or clear the search.</p>
            <button
              onClick={clear}
              className="mt-4 text-sm font-medium underline-offset-4 hover:underline"
            >
              Clear filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
