import type { ReactNode } from 'react';
import JavaScript from '@/components/technologies/JavaScript';
import MongoDB from '@/components/technologies/MongoDB';
import NextJs from '@/components/technologies/NextJs';
import NodeJs from '@/components/technologies/NodeJs';
import PostgreSQL from '@/components/technologies/PostgreSQL';
import ReactIcon from '@/components/technologies/ReactIcon';
import TailwindCss from '@/components/technologies/TailwindCss';

interface SkillItem {
  name: string;
  icon: ReactNode;
}

export const mySkills: SkillItem[] = [
  { name: 'JavaScript', icon: <JavaScript /> },
  { name: 'React', icon: <ReactIcon /> },
  { name: 'Next.js', icon: <NextJs /> },
  { name: 'Node.js', icon: <NodeJs /> },
  { name: 'MongoDB', icon: <MongoDB /> },
  { name: 'PostgreSQL', icon: <PostgreSQL /> },
  { name: 'Tailwind CSS', icon: <TailwindCss /> },
];

export const about = {
  name: 'Adam Fariz',
  description:
    'Full Stack Developer based in Casablanca and Rabat, Morocco. I build responsive web and mobile products, secure APIs, and AI-powered tools using modern JavaScript technologies.',
};
