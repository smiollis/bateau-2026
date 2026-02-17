import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import postsFr from '@/data/posts.json';
import postsEn from '@/data/posts-en.json';
import postsEs from '@/data/posts-es.json';
import postsIt from '@/data/posts-it.json';
import postsDe from '@/data/posts-de.json';
import postsPtBR from '@/data/posts-pt-BR.json';
import { getAlternates, getOgLocale } from '@/lib/metadata';
import { locales } from '@/i18n/routing';
import ArticleDetail from '@/views/ArticleDetail';
import { getPost as wpGetPost } from '@/lib/wordpress/client';
import { transformToPost } from '@/lib/wordpress/transformers';
import type { BlogPost } from '@/lib/wordpress/transformers';

function getPostsByLocale(locale: string) {
  switch (locale) {
    case 'en': return postsEn;
    case 'es': return postsEs;
    case 'it': return postsIt;
    case 'de': return postsDe;
    case 'pt-BR': return postsPtBR;
    default: return postsFr;
  }
}

/**
 * Fetch a single post: API first, then static JSON fallback.
 */
async function fetchPost(slug: string, locale: string): Promise<BlogPost | undefined> {
  try {
    const wp = await wpGetPost(slug, locale);
    if (wp) return transformToPost(wp);
  } catch {
    // API unavailable — fall through to static data
  }
  const allPosts = getPostsByLocale(locale);
  return allPosts.find((p) => p.slug === slug);
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    postsFr.map((post) => ({ locale, slug: post.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await fetchPost(slug, locale);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt.slice(0, 160),
    alternates: getAlternates(locale, `/actualites/${slug}`),
    openGraph: {
      locale: getOgLocale(locale),
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
  const post = await fetchPost(slug, locale);
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
