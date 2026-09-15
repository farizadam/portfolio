export interface Project {
  title: string;
  description: string;
  image: string;
  video?: string;
  link: string;
  technologies: { name: string; icon: React.ReactNode }[];
  github?: string;
  live: string;
  details: boolean;
  projectDetailsPageSlug: string;
  isWorking: boolean;
  /** Short grouping label used by the projects page filter, e.g. "Web App" */
  category?: string;
  /** Optional one-line highlight shown on the card, e.g. "Stripe Connect payouts" */
  highlight?: string;
}

export interface ProjectCaseStudyFrontmatter {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github: string;
  live: string;
  timeline: string;
  role: string;
  team?: string;
  status: 'completed' | 'in-progress' | 'archived';
  featured: boolean;
  challenges?: string[];
  learnings?: string[];
  isPublished: boolean;
}

export interface ProjectCaseStudy {
  slug: string;
  frontmatter: ProjectCaseStudyFrontmatter;
  content: string;
}

export interface ProjectCaseStudyPreview {
  slug: string;
  frontmatter: ProjectCaseStudyFrontmatter;
}
