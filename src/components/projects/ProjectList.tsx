'use client';

import { type Project } from '@/types/project';
import { motion, useReducedMotion } from 'motion/react';
import React from 'react';

import { ProjectCard } from './ProjectCard';

interface ProjectListProps {
  projects: Project[];
  className?: string;
}

export function ProjectList({ projects, className = '' }: ProjectListProps) {
  const reduced = useReducedMotion();

  if (projects.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border py-12 text-center">
        <p className="text-sm text-muted-foreground">No projects found.</p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 ${className}`}>
      {projects.map((project: Project, index: number) => (
        <motion.div
          key={project.title || index}
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -8% 0px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: (index % 2) * 0.08 }}
          className="h-full"
        >
          <ProjectCard project={project} />
        </motion.div>
      ))}
    </div>
  );
}
