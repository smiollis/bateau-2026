import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import postsFr from '@/data/posts.json';
import postsEn from '@/data/posts-en.json';
import ArticleDetail from '@/views/ArticleDetail';

function getPostsByLocale(locale: string) {
  return locale === 'en' ? postsEn : postsFr;
}

export function generateStaticParams() {
  return postsFr.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const allPosts = getPostsByLocale(locale);
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
  const { locale, slug } = await params;
  const allPosts = getPostsByLocale(locale);
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
