import Container from '@/components/common/Container';
import { Separator } from '@/components/ui/separator';
import { generateMetadata as getMetadata } from '@/config/Meta';
import { resumeConfig } from '@/config/Resume';
import { Metadata } from 'next';
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
    <Container className="py-16">
      <div className="space-y-8">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            Resume
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            My resume.
          </p>
        </div>
        <Separator />
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4">
          <object
            data={resumeConfig.url}
            type="application/pdf"
            className="min-h-screen w-full rounded-md border"
          >
            <div className="flex flex-col items-center justify-center p-8 text-center border rounded-md min-h-[300px]">
              <p className="mb-4">It looks like your browser cannot display the PDF directly.</p>
              <a
                href={resumeConfig.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md font-medium"
              >
                Download Resume
              </a>
            </div>
          </object>
          
          <div className="mt-4">
            <a
              href={resumeConfig.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:underline"
            >
              Open PDF in a new tab
            </a>
          </div>
        </div>
      </div>
    </Container>
  );
}
