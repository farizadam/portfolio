import Github from '@/components/svgs/Github';
import LinkedIn from '@/components/svgs/LinkedIn';
import Mail from '@/components/svgs/Mail';
import JavaScript from '@/components/technologies/JavaScript';
import MongoDB from '@/components/technologies/MongoDB';
import NextJs from '@/components/technologies/NextJs';
import NodeJs from '@/components/technologies/NodeJs';
import ReactIcon from '@/components/technologies/ReactIcon';

export const skillComponents = {
  JavaScript,
  ReactIcon,
  NextJs,
  NodeJs,
  MongoDB,
};

export const heroConfig = {
  name: 'Adam Fariz',
  title: 'Full Stack Developer',
  avatar: '/assets/logo.png',
  skills: [
    { name: 'JavaScript', href: 'https://developer.mozilla.org/docs/Web/JavaScript', component: 'JavaScript' },
    { name: 'React', href: 'https://react.dev/', component: 'ReactIcon' },
    { name: 'Next.js', href: 'https://nextjs.org/', component: 'NextJs' },
    { name: 'Node.js', href: 'https://nodejs.org/', component: 'NodeJs' },
    { name: 'MongoDB', href: 'https://www.mongodb.com/', component: 'MongoDB' },
  ],
  description: {
    template:
      'I build secure, scalable web and mobile applications with {skills:0}, {skills:1}, {skills:2}, {skills:3}, and {skills:4}. I enjoy turning complex product ideas into polished, reliable software.',
  },
  buttons: [
    { variant: 'outline', text: 'Resume / CV', href: '/resume', icon: 'CV' },
    { variant: 'default', text: 'Get in touch', href: '/contact', icon: 'Chat' },
  ],
};

export const socialLinks = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/adam-fariz-3bba3b2a9', icon: <LinkedIn /> },
  { name: 'GitHub', href: 'https://github.com/adamfariz', icon: <Github /> },
  { name: 'Email', href: 'mailto:adam.fariz@um5r.ac.ma', icon: <Mail /> },
];
