import Github from '@/components/svgs/Github';
import LinkedIn from '@/components/svgs/LinkedIn';
import Mail from '@/components/svgs/Mail';

export const heroConfig = {
  name: 'Adam Fariz',
  title: 'Full Stack Software Engineer',
  avatar: '/assets/logo.png',
  location: 'Casablanca, Morocco',
  email: 'adam.fariz@um5r.ac.ma',
  headline: 'Engineering robust, scalable web and mobile applications from database schema to polished UI.',
  intro:
    'State engineering student at FSTM and full-stack developer experienced in building production-grade ERPs, real-time mobile apps, and AI-driven platforms using Next.js, React Native, and Node.js.',
  introFr:
    'Élève ingénieur en génie logiciel à la FSTM et développeur full-stack. Conception et développement d’applications web et mobiles performantes. Disponible pour des opportunités professionnelles et missions freelance.',
  availability: 'Open to freelance projects & full-time roles',
  now: 'Mastering advanced system design & building high-performance web systems',
};

export const socialLinks = [
  { 
    name: 'LinkedIn', 
    href: 'https://www.linkedin.com/in/adam-fariz-3bba3b2a9', 
    icon: <LinkedIn /> 
  },
  { 
    name: 'GitHub', 
    href: 'https://github.com/farizadam', 
    icon: <Github /> 
  },
  { 
    name: 'Email', 
    href: 'mailto:adam.fariz@um5r.ac.ma', 
    icon: <Mail /> 
  },
];
