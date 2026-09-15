'use client';

import { projects } from '@/config/Projects';
import { Link } from 'next-view-transitions';
import React from 'react';

import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import { ProjectList } from '../projects/ProjectList';
import ArrowRight from '../svgs/ArrowRight';
import { Button } from '../ui/button';

export default function Projects() {
  return (
    <Container id="projects" className="py-10 sm:py-14">
      <div className="flex items-end justify-between gap-4">
        <SectionHeading subHeading="Featured" heading="Projects" />
        <Link
          href="/projects"
          className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
        >
          View all
        </Link>
      </div>

      <ProjectList className="mt-8" projects={projects.slice(0, 4)} />

      <div className="mt-8 flex justify-center">
        <Button
          variant="outline"
          asChild
          track={{
            name: 'button_click',
            data: { buttonId: 'show_all_projects', section: 'projects' },
          }}
        >
          <Link href="/projects">
            Show all projects
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </Container>
  );
}
