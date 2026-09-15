import { pageMetadata, siteConfig } from '@/config/Meta';
import { getPublishedBlogPosts } from '@/lib/blog';
import { getPublishedProjectCaseStudies } from '@/lib/project';
import type { MetadataRoute } from 'next';

const PRIORITY: Record<string, number> = {
  '/': 1,
  '/projects': 0.9,
  '/work-experience': 0.8,
  '/contact': 0.8,
  '/resume': 0.7,
  '/blog': 0.6,
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = Object.entries(pageMetadata)
    .filter(([, meta]) => meta.index !== false)
    .map(([path]) => ({
      url: `${base}${path === '/' ? '' : path}`,
      lastModified: now,
      changeFrequency: path === '/' ? 'weekly' : 'monthly',
      priority: PRIORITY[path] ?? 0.5,
    }));

  const projectPages: MetadataRoute.Sitemap = getPublishedProjectCaseStudies()
    .map((p) => ({
      url: `${base}/projects/${p.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

  const blogPages: MetadataRoute.Sitemap = getPublishedBlogPosts()
    .map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: new Date(p.frontmatter.date),
      changeFrequency: 'monthly',
      priority: 0.6,
    }));

  return [...staticPages, ...projectPages, ...blogPages];
}
