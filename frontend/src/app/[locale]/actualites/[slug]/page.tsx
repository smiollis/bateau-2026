import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import allPosts from '@/data/posts.json';
import ArticleDetail from '@/views/ArticleDetail';

export function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = allPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt.slice(0, 160),
    openGraph: {
      title: post.title,
      description: post.excerpt.slice(0, 160),
      images: post.image ? [{ url: post.image }] : [],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const post = allPosts.find((p) => p.slug === slug);
  if (!post) notFound();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt.slice(0, 160),
            image: post.image || undefined,
            datePublished: post.date,
            author: { "@type": "Organization", name: "Un Bateau à Paris" },
            publisher: { "@type": "Organization", name: "Un Bateau à Paris" },
          }),
        }}
      />
      <ArticleDetail post={post} />
    </>
  );
}
