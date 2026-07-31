import ExpressJs from '@/components/technologies/ExpressJs';
import MongoDB from '@/components/technologies/MongoDB';
import NodeJs from '@/components/technologies/NodeJs';
import ReactIcon from '@/components/technologies/ReactIcon';
import TailwindCss from '@/components/technologies/TailwindCss';
import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    title: 'CovoitAir',
    description:
      'Cross-platform airport ride-sharing application connecting travelers with drivers. Features secure authentication, role-based dashboards, Stripe payment integration, ride management, booking history, and real-time trip administration.',
    image: '/project/notesbuddy.png',
    link: 'https://github.com/adamfariz/airport',
    technologies: [
      { name: 'React Native', icon: <ReactIcon key="react" /> },
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
    title: 'AI Live Fact-Checking Extension',
    description:
      'AI-powered Chrome extension that captures live audio, transcribes speech using Groq Whisper, extracts factual claims, and prepares structured JSON for automated verification using Llama 3.3.',
    image: '/project/appwrite.png',
    link: 'https://github.com/adamfariz/fact_check',
    technologies: [
      { name: 'JavaScript', icon: <ReactIcon key="javascript" /> },
      { name: 'Node.js', icon: <NodeJs key="node" /> },
      { name: 'Express.js', icon: <ExpressJs key="express" /> },
    ],
    live: 'https://github.com/adamfariz/fact_check',
    details: false,
    projectDetailsPageSlug: '',
    isWorking: true,
  },

  {
    title: 'Learnify',
    description:
      'Full-stack e-learning platform featuring course management, interactive quizzes, student progress tracking, authentication, REST APIs, and a modern responsive interface built for scalable online learning.',
    image: '/project/syncify.png',
    link: 'https://github.com/adamfariz/learnify',
    technologies: [
      { name: 'React', icon: <ReactIcon key="react" /> },
      { name: 'Node.js', icon: <NodeJs key="node" /> },
      { name: 'Express.js', icon: <ExpressJs key="express" /> },
      { name: 'MongoDB', icon: <MongoDB key="mongodb" /> },
    ],
    live: 'https://github.com/adamfariz/learnify',
    details: false,
    projectDetailsPageSlug: '',
    isWorking: true,
  },

  {
    title: 'AI E-Commerce Platform',
    description:
      'Full-stack e-commerce website built with PHP and MySQL featuring product management, shopping cart, authentication, order processing, and AI-powered image search that allows users to find products by uploading an image.',
    image: '/project/that-startup.png',
    link: 'https://github.com/adamfariz/EcomWebsite',
    technologies: [
      { name: 'PHP', icon: <NodeJs key="php" /> },
      { name: 'MySQL', icon: <MongoDB key="mysql" /> },
      { name: 'Tailwind CSS', icon: <TailwindCss key="tailwind" /> },
    ],
    live: 'https://github.com/adamfariz/EcomWebsite',
    details: false,
    projectDetailsPageSlug: '',
    isWorking: false,
  },
];
