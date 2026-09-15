import Container from '@/components/common/Container';
import PageHeader from '@/components/common/PageHeader';
import { TrackedLink } from '@/components/common/TrackedLink';
import ArrowUpRight from '@/components/svgs/ArrowUpRight';
import CV from '@/components/svgs/CV';
import { Button } from '@/components/ui/button';
import { generateMetadata as getMetadata } from '@/config/Meta';
import { resumeConfig } from '@/config/Resume';
import { Metadata } from 'next';
import { Link } from 'next-view-transitions';
import React from 'react';

export const metadata: Metadata = {
  ...getMetadata('/resume'),
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

export default function ResumePage() {
  return (
    <Container className="py-10 sm:py-14">
      <PageHeader
        eyebrow="CV"
        title="Resume"
        description="A one-page summary of my experience, skills, and education. Download it or read it inline."
      >
        <Button asChild>
          <a href={resumeConfig.url} download>
            <CV className="size-4" />
            Download PDF
          </a>
        </Button>
        <Button asChild variant="outline">
          <a href={resumeConfig.url} target="_blank" rel="noopener noreferrer">
            Open in new tab
            <ArrowUpRight className="size-4" />
          </a>
        </Button>
      </PageHeader>

      <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card/50">
        <object
          data={`${resumeConfig.url}#toolbar=0&navpanes=0`}
          type="application/pdf"
          className="h-[80vh] min-h-[600px] w-full"
        >
          <div className="flex min-h-[300px] flex-col items-center justify-center p-8 text-center">
            <p className="mb-4 text-muted-foreground">
              Your browser cannot display the PDF inline.
            </p>
            <Button asChild>
              <a href={resumeConfig.url} target="_blank" rel="noopener noreferrer">
                Open the resume
              </a>
            </Button>
          </div>
        </object>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        Prefer a conversation?{' '}
        <TrackedLink
          href="/contact"
          className="font-medium text-foreground underline-offset-4 hover:underline"
          track={{ name: 'button_click', data: { buttonId: 'resume_contact', section: 'resume' } }}
        >
          Get in touch
        </TrackedLink>{' '}
        or browse the{' '}
        <Link href="/work-experience" className="font-medium text-foreground underline-offset-4 hover:underline">
          full work history
        </Link>
        .
      </p>
    </Container>
  );
}
