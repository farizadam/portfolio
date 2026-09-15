import Github from '@/components/svgs/Github';
import LinkedIn from '@/components/svgs/LinkedIn';
import Mail from '@/components/svgs/Mail';

export const heroConfig = {
  name: 'Adam Fariz',
  title: 'Full Stack Developer',
  avatar: '/assets/logo.png',
  location: 'Casablanca / Rabat, Morocco',
  email: 'adam.fariz@um5r.ac.ma',
  headline: 'I turn complex product ideas into secure, production-ready web and mobile apps.',
  intro:
    'From PostgreSQL schemas and REST APIs to polished Next.js and React Native interfaces. Currently building an enterprise ERP and AI-powered recruitment tools at ASSORS.',
  introFr:
    'Développeur full stack basé à Casablanca et Rabat. Disponible pour des missions freelance et des postes à temps plein au Maroc et à distance.',
  availability: 'Open to freelance and full-time roles',
  now: 'Deepening system design and shipping AI features',
};

export const socialLinks = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/adam-fariz-3bba3b2a9', icon: <LinkedIn /> },
  { name: 'GitHub', href: 'https://github.com/adamfariz', icon: <Github /> },
  { name: 'Email', href: 'mailto:adam.fariz@um5r.ac.ma', icon: <Mail /> },
];
