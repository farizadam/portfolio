import Container from '@/components/common/Container';
import PageHeader from '@/components/common/PageHeader';
import ArrowRight from '@/components/svgs/ArrowRight';
import { Button } from '@/components/ui/button';
import { generateMetadata as getMetadata } from '@/config/Meta';
import { Link } from 'next-view-transitions';

export const metadata = getMetadata('/blog');

export default function BlogPage() {
  return (
    <Container className="py-10 sm:py-14">
      <PageHeader
        eyebrow="Writing"
        title="Articles"
        description="Notes on building full stack products: architecture decisions, performance work, and lessons from shipping."
      />

      <div className="mt-8 rounded-2xl border border-dashed border-border px-6 py-14 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          Coming soon
        </p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight">The first articles are in progress.</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          Until then, the projects page shows what I have been building and the stack behind it.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link href="/projects">
              Browse projects
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">Get in touch</Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}
