'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Link } from 'next-view-transitions';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

import { useUmami } from '@/hooks/use-umami';
import type { AnalyticsEventData } from '@/types/analytics';
import { type Project } from '@/types/project';

import ArrowRight from '../svgs/ArrowRight';
import Github from '../svgs/Github';
import PlayCircle from '../svgs/PlayCircle';
import Website from '../svgs/Website';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const { trackEvent } = useUmami();

  // Stable, human-readable id derived from the project's details route
  const projectId =
    project.projectDetailsPageSlug?.split('/').filter(Boolean).pop() ??
    project.title;

  const isRealUrl = (url?: string) => Boolean(url && url !== '#');
  const isGithubUrl = (url?: string) => /github\.com/i.test(url ?? '');
  // A `link` that points at GitHub is treated as the repo, not a live site
  const githubHref = isRealUrl(project.github)
    ? project.github
    : isGithubUrl(project.link)
      ? project.link
      : undefined;
  const websiteHref =
    isRealUrl(project.link) && !isGithubUrl(project.link) ? project.link : undefined;
  const hasDetails = project.details && Boolean(project.projectDetailsPageSlug);

  const trackProject = (
    action: AnalyticsEventData['project_click']['action'],
  ) =>
    trackEvent({
      name: 'project_click',
      data: {
        projectId,
        projectTitle: project.title,
        action,
        location: 'project_card',
      },
    });

  return (
    <Card className="group flex h-full w-full flex-col overflow-hidden rounded-xl border border-border bg-card/50 p-0 text-foreground transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/40">
      {/* Card Header: Media Banner */}
      <CardHeader className="p-0">
        <div className="relative aspect-video w-full overflow-hidden bg-background dark:bg-black">
          <Image
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            src={project.image}
            alt={project.title}
            width={1200}
            height={675}
          />

          {/* Video Play Overlay */}
          {project.video && (
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <div 
                  className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/10 dark:bg-black/40 opacity-0 backdrop-blur-xs transition-opacity duration-300 group-hover:opacity-100"
                  onClick={() => trackProject('play_video')}
                >
                  <div className="flex size-14 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-transform duration-200 hover:scale-110 hover:bg-white/30">
                    <PlayCircle className="size-8 fill-white/80" />
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="w-full max-w-4xl border-neutral-800 bg-neutral-950 p-0 overflow-hidden">
                <div className="aspect-video w-full">
                  <video
                    className="h-full w-full object-cover"
                    src={project.video}
                    autoPlay
                    loop
                    controls
                  />
                </div>
                <DialogTitle className="sr-only">{project.title}</DialogTitle>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardHeader>

      {/* Card Body */}
      <CardContent className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-1 flex-col space-y-4">
          {/* Header Row: Title & Action Icons */}
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              {project.category && (
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  {project.category}
                </p>
              )}
              {hasDetails ? (
                <Link
                  href={project.projectDetailsPageSlug}
                  onClick={() => trackProject('view_details')}
                  className="group/title block"
                >
                  <h3 className="text-lg font-bold transition-colors group-hover/title:text-muted-foreground sm:text-xl">
                    {project.title}
                  </h3>
                </Link>
              ) : (
                <h3 className="text-lg font-bold sm:text-xl">{project.title}</h3>
              )}
            </div>

            {/* Links */}
            <div className="flex items-center gap-1.5 shrink-0">
              {websiteHref && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      className="p-1 text-muted-foreground transition-colors hover:text-foreground"
                      href={websiteHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackProject('visit_website')}
                    >
                      <Website className="size-4" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>View Website</TooltipContent>
                </Tooltip>
              )}

              {githubHref && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      className="p-1 text-muted-foreground transition-colors hover:text-foreground"
                      href={githubHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackProject('visit_github')}
                    >
                      <Github className="size-4" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>View GitHub</TooltipContent>
                </Tooltip>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
          {project.highlight && (
            <p className="flex items-start gap-2 text-sm text-foreground/80">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-amber-500" aria-hidden />
              {project.highlight}
            </p>
          )}

          {/* Technologies Icons Grid */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="mt-auto pt-2">
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((technology, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <div className="size-6 text-muted-foreground transition-all duration-200 hover:scale-110 hover:text-foreground">
                        {technology.icon}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{technology.name}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>

      {/* Card Footer */}
      <CardFooter className="flex items-center justify-between border-t border-border p-5 pt-4">
          {/* Status Indicator */}
          <div className="inline-flex items-center gap-1.5 text-xs font-medium">
            {project.isWorking ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-emerald-600 dark:text-emerald-400">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                Operational
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-amber-600 dark:text-amber-400">
                <span className="size-2 rounded-full bg-amber-400 animate-pulse" />
                Building
              </span>
            )}
          </div>

          {/* Primary action */}
          {hasDetails ? (
            <Link
              href={project.projectDetailsPageSlug}
              className="group/btn inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground transition-colors duration-200 hover:text-foreground"
              onClick={() => trackProject('view_details')}
            >
              <span>Case study</span>
              <ArrowRight className="size-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
            </Link>
          ) : githubHref ? (
            <Link
              href={githubHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground transition-colors duration-200 hover:text-foreground"
              onClick={() => trackProject('visit_github')}
            >
              <span>View code</span>
              <ArrowRight className="size-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
            </Link>
          ) : websiteHref ? (
            <Link
              href={websiteHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground transition-colors duration-200 hover:text-foreground"
              onClick={() => trackProject('visit_website')}
            >
              <span>Visit site</span>
              <ArrowRight className="size-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
            </Link>
          ) : (
            <span className="text-xs font-medium text-muted-foreground">Private codebase</span>
          )}
        </CardFooter>
    </Card>
  );
}