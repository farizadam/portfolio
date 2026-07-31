import Container from '@/components/common/Container';
import { generateMetadata as getMetadata } from '@/config/Meta';

export const metadata = getMetadata('/blog');

export default function BlogPage() {
  return (
    <Container className="py-16">
      <h1 className="text-4xl font-bold tracking-tight">Articles</h1>
      <p className="text-muted-foreground mt-4 text-lg">
        New articles are coming soon.
      </p>
    </Container>
  );
}
