import ExpressJs from '@/components/technologies/ExpressJs';
import MongoDB from '@/components/technologies/MongoDB';
import NodeJs from '@/components/technologies/NodeJs';
import ReactIcon from '@/components/technologies/ReactIcon';
import TailwindCss from '@/components/technologies/TailwindCss';
import NextJs from '@/components/technologies/NextJs';
import TypeScript from '@/components/technologies/TypeScript';
import PostgreSQL from '@/components/technologies/PostgreSQL';
import JavaScript from '@/components/technologies/JavaScript';
import Html from '@/components/technologies/Html';
import CSS from '@/components/technologies/CSS';
import Postman from '@/components/technologies/Postman';
import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    title: 'Resume AI',
    description: 'AI-Powered Resume & Mock Interviewer Platform. Engineered an open-source, full-stack web application to automate dynamic resume generation and conduct interactive technical mock interviews.',
    image: '/project/resumeai.jpg',
    link: 'https://github.com/adamfariz/resume-ai',
    technologies: [
      { name: 'Next.js', icon: <NextJs key="nextjs" /> },
      { name: 'Express.js', icon: <ExpressJs key="express" /> },
      { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
      { name: 'MongoDB', icon: <MongoDB key="mongodb" /> },
      { name: 'Tailwind CSS', icon: <TailwindCss key="tailwind" /> },
    ],
    live: 'https://github.com/adamfariz/resume-ai',
    details: false,
    projectDetailsPageSlug: '',
    isWorking: true,
  },
  {
    title: 'Enterprise ERP Platform',
    description: 'Modern Business Management System with deterministic, multi-stage pipelines for procurement and sales, and an automated three-way reconciliation engine.',
    image: '/project/erp.jpg',
    link: '#',
    technologies: [
      { name: 'Next.js', icon: <NextJs key="nextjs" /> },
      { name: 'React', icon: <ReactIcon key="react" /> },
      { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
      { name: 'Tailwind CSS', icon: <TailwindCss key="tailwind" /> },
      { name: 'PostgreSQL', icon: <PostgreSQL key="postgresql" /> },
    ],
    live: '#',
    details: false,
    projectDetailsPageSlug: '',
    isWorking: true,
  },
  {
    title: 'Custom E-Commerce Platform',
    description: 'Lightweight MVC framework built in native PHP to decouple routing, database models, and presentation views, featuring a comprehensive back-office dashboard.',
    image: '/project/ecommerce.png',
    link: 'https://github.com/adamfariz/EcomWebsite',
    technologies: [
      { name: 'JavaScript', icon: <JavaScript key="javascript" /> },
      { name: 'HTML5', icon: <Html key="html" /> },
      { name: 'CSS3', icon: <CSS key="css" /> },
    ],
    live: 'https://github.com/adamfariz/EcomWebsite',
    details: false,
    projectDetailsPageSlug: '',
    isWorking: true,
  },
  {
    title: 'Airport Carpooling Platform',
    description: 'Mobile carpooling application engineered for airport ride matching, featuring a multi-party payment pipeline integrating Stripe Connect Express for automated driver payouts.',
    image: '/project/covoitair.png',
    link: 'https://github.com/adamfariz/airport',
    technologies: [
      { name: 'React Native', icon: <ReactIcon key="react" /> },
      { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
      { name: 'Node.js', icon: <NodeJs key="node" /> },
      { name: 'Express.js', icon: <ExpressJs key="express" /> },
      { name: 'MongoDB', icon: <MongoDB key="mongodb" /> },
    ],
    live: '#',
    details: false,
    projectDetailsPageSlug: '',
    isWorking: true,
  },
  {
    title: 'Learnify',
    description: 'Containerized Learning Management System with dedicated student and instructor portals, dynamic quiz generation, and robust role-based access control.',
    image: '/project/learnify.png',
    link: 'https://github.com/adamfariz/learnify',
    technologies: [
      { name: 'React', icon: <ReactIcon key="react" /> },
      { name: 'Tailwind CSS', icon: <TailwindCss key="tailwind" /> },
      { name: 'Node.js', icon: <NodeJs key="node" /> },
      { name: 'Express.js', icon: <ExpressJs key="express" /> },
      { name: 'MongoDB', icon: <MongoDB key="mongodb" /> },
      { name: 'Postman', icon: <Postman key="postman" /> },
    ],
    live: 'https://github.com/adamfariz/learnify',
    details: false,
    projectDetailsPageSlug: '',
    isWorking: true,
  },
  {
    title: 'Fact Check',
    description: 'Real-Time Browser Extension capturing DOM text for claim verification, backed by an asynchronous Express REST API evaluating claims against external datasets.',
    image: '/project/factcheck.png',
    link: 'https://github.com/adamfariz/fact_check',
    technologies: [
      { name: 'JavaScript', icon: <JavaScript key="javascript" /> },
      { name: 'Node.js', icon: <NodeJs key="node" /> },
      { name: 'Express.js', icon: <ExpressJs key="express" /> },
    ],
    live: 'https://github.com/adamfariz/fact_check',
    details: false,
    projectDetailsPageSlug: '',
    isWorking: true,
  },
];
