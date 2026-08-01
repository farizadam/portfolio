import React from 'react';
import { Link } from 'next-view-transitions';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import ArrowLeft from '../svgs/ArrowLeft';
import ArrowUUpRight from '../svgs/ArrowUUpRight';

interface ProjectNavigationProps {
  previous: { title: string; slug: string } | null;
  next: { title: string; slug: string } | null;
}

export function ProjectNavigation({ previous, next }: ProjectNavigationProps) {
  if (!previous && !next) {
    return null;
  }

  return (
    <div className="mt-12 space-y-6">
      <Separator className="bg-neutral-800/80" />

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Previous Project */}
        <div>
          {previous ? (
            <Button
              variant="outline"
              asChild
              className="group h-auto w-full justify-start border-neutral-800/80 bg-neutral-900/40 p-4 text-left transition-all duration-200 hover:border-neutral-700 hover:bg-neutral-900"
              track={{
                name: 'button_click',
                data: {
                  buttonId: 'project_nav_previous',
                  section: 'project_detail',
                  action: previous.slug,
                },
              }}
            >
              <Link href={`/projects/${previous.slug}`} className="w-full">
                <div className="flex items-center gap-3">
                  <ArrowLeft className="size-4 shrink-0 text-neutral-400 transition-transform group-hover:-translate-x-1 group-hover:text-white" />
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-wider text-neutral-500">
                      Previous Project
                    </div>
                    <div className="truncate text-sm font-semibold text-neutral-200 group-hover:text-white sm:text-base">
                      {previous.title}
                    </div>
                  </div>
                </div>
              </Link>
            </Button>
          ) : null}
        </div>

        {/* Next Project */}
        <div>
          {next ? (
            <Button
              variant="outline"
              asChild
              className="group h-auto w-full justify-end border-neutral-800/80 bg-neutral-900/40 p-4 text-right transition-all duration-200 hover:border-neutral-700 hover:bg-neutral-900"
              track={{
                name: 'button_click',
                data: {
                  buttonId: 'project_nav_next',
                  section: 'project_detail',
                  action: next.slug,
                },
              }}
            >
              <Link href={`/projects/${next.slug}`} className="w-full">
                <div className="flex items-center justify-end gap-3">
                  <div className="min-w-0 text-right">
                    <div className="text-xs uppercase tracking-wider text-neutral-500">
                      Next Project
                    </div>
                    <div className="truncate text-sm font-semibold text-neutral-200 group-hover:text-white sm:text-base">
                      {next.title}
                    </div>
                  </div>
                  <ArrowUUpRight className="size-4 shrink-0 text-neutral-400 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5 group-hover:text-white" />
                </div>
              </Link>
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}