import Container from '@/components/common/Container';
import PageHeader from '@/components/common/PageHeader';
import { ExperienceTimeline } from '@/components/experience/ExperienceTimeline';
import ArrowRight from '@/components/svgs/ArrowRight';
import { Button } from '@/components/ui/button';
import { experiences } from '@/config/Experience';
import { generateMetadata as getMetadata } from '@/config/Meta';
import { Metadata } from 'next';
import { Robots } from 'next/dist/lib/metadata/types/metadata-types';
import { Link } from 'next-view-transitions';

export const metadata: Metadata = {
  ...getMetadata('/work-experience'),
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
  } as Robots,
};

export default function WorkExperiencePage() {
  return (
    <Container className="py-10 sm:py-14">
      <PageHeader
        eyebrow="Career"
        title="Work Experience"
        description="Internships, freelance engagements, and teaching roles. Each entry lists what I built and the stack behind it."
      >
        <Button asChild variant="outline">
          <Link href="/resume">
            View resume
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </PageHeader>

      <div className="mt-10">
        <ExperienceTimeline experiences={experiences} />
      </div>
    </Container>
  );
}
