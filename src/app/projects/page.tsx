import Container from '@/components/common/Container';
import PageHeader from '@/components/common/PageHeader';
import { ProjectsExplorer } from '@/components/projects/ProjectsExplorer';
import { generateMetadata as getMetadata } from '@/config/Meta';
import { projects } from '@/config/Projects';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...getMetadata('/projects'),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function ProjectsPage() {
  const live = projects.filter((p) => p.isWorking).length;

  return (
    <Container className="py-10 sm:py-14">
      <PageHeader
        eyebrow="Work"
        title="Projects"
        description="Full stack products I have designed, built, and shipped. Filter by category or stack, or search for a keyword."
      >
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>
            <b className="text-foreground">{projects.length}</b> projects
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            <b className="text-foreground">{live}</b> live
          </span>
        </div>
      </PageHeader>

      <div className="mt-8">
        <ProjectsExplorer projects={projects} />
      </div>
    </Container>
  );
}
