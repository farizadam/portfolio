import ExpressJs from '@/components/technologies/ExpressJs';
import JavaScript from '@/components/technologies/JavaScript';
import NextJs from '@/components/technologies/NextJs';
import NodeJs from '@/components/technologies/NodeJs';
import MySQL from '@/components/technologies/MySQL';
import PostgreSQL from '@/components/technologies/PostgreSQL';
import Python from '@/components/technologies/Python';
import ReactIcon from '@/components/technologies/ReactIcon';
import TailwindCss from '@/components/technologies/TailwindCss';
import TypeScript from '@/components/technologies/TypeScript';
import Motion from '@/components/technologies/Motion';

export interface Technology {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export interface Experience {
  company: string;
  position: string;
  location: string;
  image: string;
  description: string[];
  startDate: string;
  endDate: string;
  website: string;
  x?: string;
  linkedin?: string;
  github?: string;
  technologies: Technology[];
  isCurrent: boolean;
  isBlur?: boolean;
}

const react = { name: 'React', href: 'https://react.dev/', icon: <ReactIcon /> };
const next = { name: 'Next.js', href: 'https://nextjs.org/', icon: <NextJs /> };
const node = { name: 'Node.js', href: 'https://nodejs.org/', icon: <NodeJs /> };
const express = { name: 'Express.js', href: 'https://expressjs.com/', icon: <ExpressJs /> };
const tailwind = { name: 'Tailwind CSS', href: 'https://tailwindcss.com/', icon: <TailwindCss /> };
const javascript = { name: 'JavaScript', href: 'https://developer.mozilla.org/docs/Web/JavaScript', icon: <JavaScript /> };
const postgresql = { name: 'PostgreSQL', href: 'https://www.postgresql.org/', icon: <PostgreSQL /> };
const mysql = { name: 'MySQL', href: 'https://www.mysql.com/', icon: <MySQL /> };
const python = { name: 'Python', href: 'https://www.python.org/', icon: <Python /> };
const typescript = { name: 'TypeScript', href: 'https://www.typescriptlang.org/', icon: <TypeScript /> };
const motion = { name: 'Framer Motion', href: 'https://www.framer.com/motion/', icon: <Motion /> };


export const experiences: Experience[] = [
  {
    isCurrent: false,
    company: 'ASSORS',
    position: 'Full Stack Developer Intern',
    location: 'Casablanca, Morocco',
    image: '/company/assors.png',
    description: [
      'Full-stack developer building business software and e-commerce platforms with Next.js, TypeScript, PostgreSQL, and WordPress.',
      '**Hssabati ERP (sole developer)**: Designed and built an ERP covering sales, procurement, inventory, treasury, budgeting, and HR, with 70+ API endpoints and 30+ data models. Features include quote-to-invoice workflows, transactional order confirmation with stock reservation and client credit limits, an executive financial dashboard, role-based access control, PDF document generation, and an AI-assisted recruiting pipeline with CV parsing and candidate scoring.',
      '**Atlas Marketplace (~109k LOC)**: Worked on a multi-vendor B2B/B2C marketplace, strengthening role-based access control and closing authorization gaps, rebuilding the B2B storefront with wholesale pricing tiers, automating business document PDFs, and developing backend workflows for order processing, fulfillment, and courier dispatch across multiple warehouses.',
      '**WordPress & WooCommerce Websites**: Built and launched multiple websites and online stores from scratch, extending them with custom PHP/CSS, automating variable product synchronization across product lines, and eliminating catalog sync and media loading bottlenecks.',
    ],
    startDate: 'July 2026',
    endDate: 'September 2026',
    website: 'https://assors.ma/',
    technologies: [next, react, typescript, postgresql, tailwind, motion],
  },

  {
    isCurrent: false,
    company: 'Big House Marketing',
    position: 'Freelance Full Stack Developer',
    location: 'Remote',
    image: '/company/bighouse.png',
    description: [
      'Designed and developed modern websites and high-converting landing pages for healthcare professionals and marketing agencies.',
      'Built responsive, SEO-friendly applications using React, Node.js, and Tailwind CSS with a strong focus on performance.',
      'Improved Core Web Vitals, page load times, and user experience to increase client engagement and lead generation.',
      'Worked directly with clients to gather requirements, deliver custom solutions, and provide ongoing maintenance.',
    ],
    startDate: 'February 2026',
    endDate: 'May 2026',
    website: 'https://bighousemarketing.ma/',
    technologies: [react, node, express, tailwind, mysql],
  },
{
    isCurrent: false,
    company: 'Team ElGhazi',
    position: 'Full Stack Developer Intern',
    location: 'Morocco',
    image: '/company/elghazi.png',
    description: [
      'Developed full-stack web applications and e-commerce solutions using Next.js, React, Express.js, and Tailwind CSS.',
      'Implemented authentication systems, product management features, and scalable backend APIs.',
      'Converted Figma designs into responsive, production-ready interfaces while maintaining clean component architecture.',
      'Collaborated within an agile development team using Git and modern software development practices.',
    ],
    startDate: 'June 2025',
    endDate: 'August 2025',
    website: 'https://teamelghazi.com/',
    technologies: [next, express, tailwind, react],
  },
  {
    isCurrent: false,
    company: 'Innovation Center',
    position: 'Coding & Robotics Instructor',
    location: 'Morocco',
    image: '/company/innovation.png',
    description: [
      'Taught Python programming fundamentals through interactive coding sessions and real-world programming exercises.',
      'Introduced students to Arduino programming, robotics, and embedded systems using practical laboratory projects.',
      'Prepared educational materials and mentored students in developing problem-solving and computational thinking skills.',
    ],
    startDate: 'November 2025',
    endDate: 'December 2025',
    website: '#',
    technologies: [python, javascript],
  },

  
];
