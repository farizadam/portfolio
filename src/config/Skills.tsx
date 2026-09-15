import AWS from '@/components/technologies/AWS';
import Bun from '@/components/technologies/Bun';
import CSS from '@/components/technologies/CSS';
import ExpressJs from '@/components/technologies/ExpressJs';
import Figma from '@/components/technologies/Figma';
import Github from '@/components/technologies/Github';
import Html from '@/components/technologies/Html';
import JavaScript from '@/components/technologies/JavaScript';
import MongoDB from '@/components/technologies/MongoDB';
import MySQL from '@/components/technologies/MySQL';
import NestJs from '@/components/technologies/NestJs';
import NextJs from '@/components/technologies/NextJs';
import NodeJs from '@/components/technologies/NodeJs';
import PostgreSQL from '@/components/technologies/PostgreSQL';
import Postman from '@/components/technologies/Postman';
import Prisma from '@/components/technologies/Prisma';
import Python from '@/components/technologies/Python';
import ReactIcon from '@/components/technologies/ReactIcon';
import Shadcn from '@/components/technologies/Shadcn';
import SocketIo from '@/components/technologies/SocketIo';
import TailwindCss from '@/components/technologies/TailwindCss';
import TypeScript from '@/components/technologies/TypeScript';
import Vercel from '@/components/technologies/Vercel';
import type { ReactNode } from 'react';

export interface SkillItem {
  name: string;
  icon: ReactNode;
}

export interface SkillGroup {
  label: string;
  description: string;
  items: SkillItem[];
}

export const skillGroups: SkillGroup[] = [
  {
    label: 'Frontend',
    description: 'Responsive, accessible interfaces',
    items: [
      { name: 'TypeScript', icon: <TypeScript /> },
      { name: 'JavaScript', icon: <JavaScript /> },
      { name: 'React', icon: <ReactIcon /> },
      { name: 'Next.js', icon: <NextJs /> },
      { name: 'React Native', icon: <ReactIcon /> },
      { name: 'Tailwind CSS', icon: <TailwindCss /> },
      { name: 'shadcn/ui', icon: <Shadcn /> },
      { name: 'HTML5', icon: <Html /> },
      { name: 'CSS3', icon: <CSS /> },
    ],
  },
  {
    label: 'Backend',
    description: 'APIs, auth, and real-time systems',
    items: [
      { name: 'Node.js', icon: <NodeJs /> },
      { name: 'Express.js', icon: <ExpressJs /> },
      { name: 'NestJS', icon: <NestJs /> },
      { name: 'Python', icon: <Python /> },
      { name: 'Socket.IO', icon: <SocketIo /> },
      { name: 'Bun', icon: <Bun /> },
    ],
  },
  {
    label: 'Database',
    description: 'Schema design and query tuning',
    items: [
      { name: 'PostgreSQL', icon: <PostgreSQL /> },
      { name: 'MySQL', icon: <MySQL /> },
      { name: 'MongoDB', icon: <MongoDB /> },
      { name: 'Prisma', icon: <Prisma /> },
    ],
  },
  {
    label: 'Tooling & Cloud',
    description: 'Shipping and running in production',
    items: [
      { name: 'Git & GitHub', icon: <Github /> },
      { name: 'Vercel', icon: <Vercel /> },
      { name: 'AWS', icon: <AWS /> },
      { name: 'Postman', icon: <Postman /> },
      { name: 'Figma', icon: <Figma /> },
    ],
  },
];
