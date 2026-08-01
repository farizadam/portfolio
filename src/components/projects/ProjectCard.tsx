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
    <Card className="group flex h-full w-full flex-col overflow-hidden rounded-xl border bg-background/50 text-foreground transition-all duration-300 hover:border-neutral-900/30 dark:border-white/5 dark:bg-neutral-950/50 p-0">
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
            <Link
              href={project.projectDetailsPageSlug}
              onClick={() => trackProject('view_details')}
              className="group/title min-w-0"
            >
              <h3 className="text-lg font-bold transition-colors group-hover/title:text-neutral-300 sm:text-xl">
                {project.title}
              </h3>
            </Link>

            {/* Links */}
            <div className="flex items-center gap-1.5 shrink-0">
              {project.link && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      className="p-1 text-neutral-400 transition-colors hover:text-white"
                      href={project.link}
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

              {project.github && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      className="p-1 text-neutral-400 transition-colors hover:text-white"
                      href={project.github}
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
          <p className="line-clamp-3 text-sm leading-relaxed text-neutral-500">
            {project.description}
          </p>

          {/* Technologies Icons Grid */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="mt-auto pt-2">
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-600">
                Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((technology, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <div className="size-6 text-neutral-500 transition-all duration-200 hover:scale-105 hover:text-neutral-300">
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
      {project.details && (
        <CardFooter className="flex items-center justify-between border-t border-white/5 p-5 pt-4">
          {/* Status Indicator */}
          <div className="inline-flex items-center gap-1.5 text-xs font-medium">
            {project.isWorking ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-emerald-400">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                Operational
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-amber-400">
                <span className="size-2 rounded-full bg-amber-400 animate-pulse" />
                Building
              </span>
            )}
          </div>

          {/* View Details Link */}
          <Link
            href={project.projectDetailsPageSlug}
            className="group/btn inline-flex items-center gap-1 text-xs font-semibold text-neutral-400 transition-colors duration-200 hover:text-foreground"
            onClick={() => trackProject('view_details')}
          >
            <span>View Details</span>
            <ArrowRight className="size-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
          </Link>
        </CardFooter>
      )}
    </Card>
  );
}