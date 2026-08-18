export default function Head() {
  const siteUrl = process.env.NEXT_PUBLIC_URL || 'https://yourdomain.com';
  const title = 'Adam Fariz — Full‑Stack Developer | Portfolio';
  const description = 'Adam Fariz — Full‑Stack Developer. Portfolio featuring projects, blog, and contact. Specializes in React, Next.js, Node.js, and TypeScript.';
  const image = `${siteUrl}/meta/hero.png`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Adam Fariz",
    "url": siteUrl,
    "sameAs": [
      "https://github.com/adamfariz"
    ],
    "jobTitle": "Full‑Stack Developer",
    "image": image,
    "knowsAbout": ["React", "Next.js", "Node.js", "TypeScript", "Tailwind CSS"]
  };

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="full stack developer, portfolio, full-stack dev, Next.js, React, TypeScript, Node.js" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <link rel="canonical" href={siteUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD Person schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
