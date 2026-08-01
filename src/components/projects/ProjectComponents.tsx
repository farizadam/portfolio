import React from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

// Technology icons
import Bun from '@/components/technologies/Bun';
import JavaScript from '@/components/technologies/JavaScript';
import MongoDB from '@/components/technologies/MongoDB';
import NextJs from '@/components/technologies/NextJs';
import NodeJs from '@/components/technologies/NodeJs';
import PostgreSQL from '@/components/technologies/PostgreSQL';
import Prisma from '@/components/technologies/Prisma';
import ReactIcon from '@/components/technologies/ReactIcon';
import TypeScript from '@/components/technologies/TypeScript';

import { CodeCopyButton } from '../blog/CodeCopyButton';

// Technology mapping for dynamic components
const TechnologyComponents: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  'Next.js': NextJs,
  nextjs: NextJs,
  React: ReactIcon,
  react: ReactIcon,
  TypeScript: TypeScript,
  typescript: TypeScript,
  JavaScript: JavaScript,
  javascript: JavaScript,
  'Node.js': NodeJs,
  nodejs: NodeJs,
  node: NodeJs,
  MongoDB: MongoDB,
  mongodb: MongoDB,
  PostgreSQL: PostgreSQL,
  postgresql: PostgreSQL,
  Prisma: Prisma,
  prisma: Prisma,
  Bun: Bun,
  bun: Bun,
};

// Custom Technology component for displaying technology badges with icons
const Technology = ({ name }: { name: string }) => {
  const TechComponent =
    TechnologyComponents[name] || TechnologyComponents[name.toLowerCase()];

  return (
    <div className="inline-flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900/80 px-3 py-1.5 text-xs font-medium text-neutral-300">
      {TechComponent && <TechComponent className="size-4 shrink-0" />}
      <span>{name}</span>
    </div>
  );
};

// Custom TechStack component for displaying multiple technologies
const TechStack = ({ technologies }: { technologies: string[] }) => {
  return (
    <div className="my-8 rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-5">
      <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">
        Technology Stack
      </h4>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <Technology key={tech} name={tech} />
        ))}
      </div>
    </div>
  );
};

// Custom ProjectMeta component for project information
const ProjectMeta = ({
  timeline,
  role,
  team,
  status,
}: {
  timeline?: string;
  role?: string;
  team?: string;
  status?: string;
}) => {
  return (
    <div className="my-8 grid gap-4 rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-5 sm:grid-cols-2 lg:grid-cols-4">
      {timeline && (
        <div>
          <h5 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Timeline
          </h5>
          <p className="mt-1 text-sm font-medium text-neutral-200">{timeline}</p>
        </div>
      )}
      {role && (
        <div>
          <h5 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Role
          </h5>
          <p className="mt-1 text-sm font-medium text-neutral-200">{role}</p>
        </div>
      )}
      {team && (
        <div>
          <h5 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Team
          </h5>
          <p className="mt-1 text-sm font-medium text-neutral-200">{team}</p>
        </div>
      )}
      {status && (
        <div>
          <h5 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Status
          </h5>
          <div className="mt-1">
            <Badge
              variant="outline"
              className={`capitalize text-xs font-medium border-0 ${
                status === 'completed'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  : status === 'in-progress'
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                  : 'bg-neutral-800 text-neutral-300'
              }`}
            >
              {status}
            </Badge>
          </div>
        </div>
      )}
    </div>
  );
};

// Custom Challenges component
const Challenges = ({ challenges }: { challenges: string[] }) => {
  return (
    <div className="my-8 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
      <h4 className="mb-3 text-base font-semibold text-amber-300 flex items-center gap-2">
        <span className="size-2 rounded-full bg-amber-400" />
        Key Challenges
      </h4>
      <ul className="space-y-2">
        {challenges.map((challenge, index) => (
          <li
            key={index}
            className="flex items-start gap-2 text-sm text-amber-200/80"
          >
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-amber-400/60" />
            <span>{challenge}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Custom Learnings component
const Learnings = ({ learnings }: { learnings: string[] }) => {
  return (
    <div className="my-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
      <h4 className="mb-3 text-base font-semibold text-emerald-300 flex items-center gap-2">
        <span className="size-2 rounded-full bg-emerald-400" />
        Key Learnings
      </h4>
      <ul className="space-y-2">
        {learnings.map((learning, index) => (
          <li
            key={index}
            className="flex items-start gap-2 text-sm text-emerald-200/80"
          >
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-emerald-400/60" />
            <span>{learning}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const ProjectComponents = {
  // MDX Overrides
  img: ({
    src,
    alt,
    ...props
  }: {
    src: string;
    alt: string;
    [key: string]: unknown;
  }) => (
    <Image
      src={src}
      alt={alt}
      width={800}
      height={400}
      className="my-6 rounded-2xl border border-neutral-800 bg-neutral-900 object-cover"
      {...props}
    />
  ),
  h1: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <h1 className="mt-10 mb-6 text-3xl font-bold tracking-tight text-white sm:text-4xl" {...props}>
      {children}
    </h1>
  ),
  h2: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <h2 className="mt-8 mb-4 text-2xl font-semibold tracking-tight text-white" {...props}>
      {children}
    </h2>
  ),
  h3: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <h3 className="mt-6 mb-3 text-xl font-medium tracking-tight text-neutral-200" {...props}>
      {children}
    </h3>
  ),
  p: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <p className="mb-4 text-base leading-relaxed text-neutral-400" {...props}>
      {children}
    </p>
  ),
  ul: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <ul className="mb-6 ml-6 list-disc space-y-2 text-neutral-400" {...props}>
      {children}
    </ul>
  ),
  ol: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <ol className="mb-6 ml-6 list-decimal space-y-2 text-neutral-400" {...props}>
      {children}
    </ol>
  ),
  li: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <li className="text-base leading-relaxed text-neutral-400" {...props}>
      {children}
    </li>
  ),
  pre: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => {
    const getTextContent = (node: React.ReactNode): string => {
      if (typeof node === 'string') return node;
      if (typeof node === 'number') return String(node);
      if (
        React.isValidElement(node) &&
        node.props &&
        typeof node.props === 'object'
      ) {
        return getTextContent(
          (node.props as { children?: React.ReactNode }).children,
        );
      }
      if (Array.isArray(node)) {
        return node.map(getTextContent).join('');
      }
      return '';
    };

    const codeText = getTextContent(children);

    return (
      <div className="group relative my-6">
        <pre
          className="overflow-x-auto rounded-2xl border border-neutral-800 bg-neutral-950 p-4 font-mono text-sm leading-relaxed text-neutral-300 [&>code]:bg-transparent [&>code]:p-0"
          {...props}
        >
          {children}
        </pre>
        <CodeCopyButton code={codeText} />
      </div>
    );
  },
  code: ({
    children,
    className,
    ...props
  }: {
    children: React.ReactNode;
    className?: string;
    [key: string]: unknown;
  }) => {
    if (className?.includes('language-')) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }

    return (
      <code className="rounded-md border border-neutral-800 bg-neutral-900/80 px-1.5 py-0.5 font-mono text-sm text-neutral-200" {...props}>
        {children}
      </code>
    );
  },
  blockquote: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <blockquote
      className="my-6 border-l-2 border-emerald-500 pl-4 italic text-neutral-400"
      {...props}
    >
      {children}
    </blockquote>
  ),

  // Project-specific custom components
  Technology,
  TechStack,
  ProjectMeta,
  Challenges,
  Learnings,
};