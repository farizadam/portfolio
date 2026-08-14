'use client';

import { githubConfig } from '@/config/Github';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import Container from '../common/Container';
import GithubIcon from '../svgs/Github';
import { Button } from '../ui/button';

export default function Github() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = !mounted || resolvedTheme === 'dark';

  const graphUrl = isDark
    ? "https://github-readme-activity-graph.vercel.app/graph?username=adamfariz&theme=tokyo-night&hide_border=true&bg_color=1a1b26&area=true&v=1"
    : "https://github-readme-activity-graph.vercel.app/graph?username=adamfariz&theme=default&hide_border=true&bg_color=ffffff&area=true&v=1";

  return (
    <Container className="mt-20">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-foreground text-2xl font-bold">
              {githubConfig.title}
            </h2>
            <p className="text-muted-foreground text-sm">
              <b>{githubConfig.username}</b>&apos;s {githubConfig.subtitle}
            </p>
          </div>
          <Button
            variant="outline"
            asChild
            track={{
              name: 'external_link_click',
              data: {
                url: `https://github.com/${githubConfig.username}`,
                text: 'View Profile',
                location: 'github_section',
              },
            }}
          >
            <Link
              href={`https://github.com/${githubConfig.username}`}
              className="inline-flex items-center gap-2"
            >
              <GithubIcon className="h-4 w-4" />
              View Profile
            </Link>
          </Button>
        </div>

        {/* Content */}
        <div className="relative overflow-hidden">
          <div className="bg-neutral-100 dark:bg-neutral-950/30 relative rounded-lg border border-neutral-200 dark:border-white/5 p-6 flex justify-center items-center min-h-[200px]">
            {mounted ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                alt="GitHub Activity Graph"
                src={graphUrl}
                width="100%"
                className="max-w-full h-auto rounded-md"
              />
            ) : (
              <div className="h-[200px] w-full animate-pulse bg-neutral-200 dark:bg-neutral-800 rounded-md"></div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
