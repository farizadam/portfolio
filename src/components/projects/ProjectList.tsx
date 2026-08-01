import React from 'react';
import { type Project } from '@/types/project';
import { ProjectCard } from './ProjectCard';

interface ProjectListProps {
  projects: Project[];
  className?: string;
}

export function ProjectList({ projects, className = '' }: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-neutral-800 py-12 text-center">
        <p className="text-sm text-neutral-500">No projects found.</p>
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 gap-6 sm:grid-cols-2 ${className}`}
    >
      {projects.map((project: Project, index: number) => (
        <ProjectCard key={project.title || index} project={project} />
      ))}
    </div>
  );
}