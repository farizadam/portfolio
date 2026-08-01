import React from 'react';
import Image from 'next/image';
import { Link } from 'next-view-transitions';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeHighlight from '@shikijs/rehype';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ProjectCaseStudyFrontmatter } from '@/types/project';

import Github from '../svgs/Github';
import Website from '../svgs/Website';
import { ProjectComponents } from './ProjectComponents';

interface ProjectContentProps {
  frontmatter: ProjectCaseStudyFrontmatter;
  content: string;
}

export function ProjectContent({ frontmatter, content }: ProjectContentProps) {
  const {
    title,
    description,
    image,
    technologies,
    github,
    live,
    timeline,
    role,
    team,
    status,
    challenges,
    learnings,
  } = frontmatter;

  const isCompleted = status === 'completed';
  const isInProgress = status === 'in-progress';

  return (
    <article className="mx-auto max-w-4xl py-6 sm:py-10">
      {/* Header & Meta Section */}
      <header className="mb-10 space-y-8">
        {/* Banner Image */}
        {image && (
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 shadow-xl">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              priority
            />
          </div>
        )}

        <div className="space-y-5">
          {/* Status & Quick Tags */}
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold capitalize tracking-wide ${
                isCompleted
                  ? 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                  : isInProgress
                  ? 'border border-amber-500/30 bg-amber-500/10 text-amber-400'
                  : 'border border-neutral-700 bg-neutral-800 text-neutral-300'
              }`}
            >
              <span
                className={`size-1.5 rounded-full ${
                  isCompleted
                    ? 'bg-emerald-400'
                    : isInProgress
                    ? 'bg-amber-400 animate-pulse'
                    : 'bg-neutral-400'
                }`}
              />
              {status}
            </span>

            {technologies.slice(0, 4).map((tech) => (
              <Badge
                key={tech}
                variant="outline"
                className="border-neutral-800 bg-neutral-900/60 text-xs font-normal text-neutral-300"
              >
                {tech}
              </Badge>
            ))}

            {technologies.length > 4 && (
              <Badge
                variant="outline"
                className="border-neutral-800 bg-neutral-900/60 text-xs font-normal text-neutral-500"
              >
                +{technologies.length - 4} more
              </Badge>
            )}
          </div>

          {/* Title & Description */}
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl lg:leading-tight">
            {title}
          </h1>

          <p className="text-lg leading-relaxed text-neutral-400 sm:text-xl">
            {description}
          </p>

          {/* Metadata Grid */}
          <div className="grid gap-4 rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-5 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h5 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Timeline
              </h5>
              <p className="mt-1 text-sm font-medium text-neutral-200">{timeline}</p>
            </div>
            <div>
              <h5 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Role
              </h5>
              <p className="mt-1 text-sm font-medium text-neutral-200">{role}</p>
            </div>
            {team && (
              <div>
                <h5 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  Team
                </h5>
                <p className="mt-1 text-sm font-medium text-neutral-200">{team}</p>
              </div>
            )}
            <div>
              <h5 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Status
              </h5>
              <p className="mt-1 text-sm font-medium capitalize text-neutral-200">{status}</p>
            </div>
          </div>

          {/* External Links / CTAs */}
          <div className="flex flex-wrap gap-3 pt-2">
            {live && (
              <Button
                asChild
                className="bg-white text-black hover:bg-neutral-200 font-medium"
                track={{
                  name: 'external_link_click',
                  data: {
                    url: live,
                    text: 'Live Demo',
                    location: 'project_detail',
                  },
                }}
              >
                <Link
                  href={live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Website className="size-4" />
                  <span>Live Demo</span>
                </Link>
              </Button>
            )}

            {github && (
              <Button
                variant="outline"
                asChild
                className="border-neutral-800 bg-neutral-900/50 text-neutral-200 hover:border-neutral-700 hover:bg-neutral-900 hover:text-white"
                track={{
                  name: 'external_link_click',
                  data: {
                    url: github,
                    text: 'Source Code',
                    location: 'project_detail',
                  },
                }}
              >
                <Link
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Github className="size-4" />
                  <span>Source Code</span>
                </Link>
              </Button>
            )}
          </div>
        </div>

        <Separator className="bg-neutral-800/80" />
      </header>

      {/* Technology Stack Badges */}
      <div className="mb-10">
        <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-5">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Full Technology Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center rounded-lg border border-neutral-800 bg-neutral-800/60 px-3 py-1.5 text-xs font-medium text-neutral-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Challenges & Learnings Callouts */}
      {(challenges?.length || learnings?.length) && (
        <div className="mb-10 grid gap-6 md:grid-cols-2">
          {challenges && challenges.length > 0 && (
            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
              <h3 className="mb-3 text-base font-semibold text-amber-300 flex items-center gap-2">
                <span className="size-2 rounded-full bg-amber-400" />
                Key Challenges
              </h3>
              <ul className="space-y-2 text-sm leading-relaxed text-amber-200/80">
                {challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-amber-400/60" />
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {learnings && learnings.length > 0 && (
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
              <h3 className="mb-3 text-base font-semibold text-emerald-300 flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-400" />
                Key Learnings
              </h3>
              <ul className="space-y-2 text-sm leading-relaxed text-emerald-200/80">
                {learnings.map((learning, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-emerald-400/60" />
                    <span>{learning}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* MDX Body Content */}
      <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-emerald-400 hover:prose-a:underline prose-img:rounded-xl">
        <MDXRemote
          source={content}
          components={ProjectComponents}
          options={{
            mdxOptions: {
              rehypePlugins: [
                [
                  rehypeHighlight,
                  {
                    theme: 'github-dark',
                  },
                ],
              ],
            },
          }}
        />
      </div>
    </article>
  );
}