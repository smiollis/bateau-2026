import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import postsFr from '@/data/posts.json';
import postsEn from '@/data/posts-en.json';
import postsEs from '@/data/posts-es.json';
import postsIt from '@/data/posts-it.json';
import postsDe from '@/data/posts-de.json';
import postsPtBR from '@/data/posts-pt-BR.json';
import { getTranslations } from 'next-intl/server';
import { getBlogAlternates, getOgLocale, getOgAlternateLocales } from '@/lib/metadata';
import { generateBreadcrumbJsonLd } from '@/lib/seo/jsonld';
import LandingBreadcrumb from '@/components/landing/LandingBreadcrumb';
import { locales } from '@/i18n/routing';
import ArticleDetail from '@/views/ArticleDetail';
import type { BlogPost } from '@/lib/wordpress/transformers';

// Static JSON — refreshed by GitHub Actions cron + WP webhook
const postsMap: Record<string, typeof postsFr> = {
  fr: postsFr,
  en: postsEn,
  es: postsEs,
  it: postsIt,
  de: postsDe,
  "pt-BR": postsPtBR,
};

function getPost(slug: string, locale: string): BlogPost | undefined {
  const posts = postsMap[locale] ?? postsFr;
  return posts.find((p) => p.slug === slug);
}

/** Strip leading title duplication from excerpt ("Le pont X Le Pont X est..." → "Le Pont X est...") */
function cleanExcerpt(title: string, excerpt: string): string {
  const titleNorm = title.toLowerCase().replace(/\s+/g, " ").trim();
  const excerptTrimmed = excerpt.replace(/^\s+/, "");
  const excerptNorm = excerptTrimmed.toLowerCase().replace(/\s+/g, " ").trim();
  if (excerptNorm.startsWith(titleNorm)) {
    return excerptTrimmed.slice(title.length).replace(/^\s+/, "");
  }
  return excerpt;
}

export function generateStaticParams() {
  return locales.flatMap((locale) => {
    const posts = postsMap[locale] ?? postsFr;
    return posts.map((post) => ({ locale, slug: post.slug }));
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(slug, locale);
  if (!post) return {};

  const seoTitle = post.seo?.title || post.title;
  const seoDesc = post.seo?.description || cleanExcerpt(post.title, post.excerpt).slice(0, 160);

  return {
    title: seoTitle,
    description: seoDesc,
    alternates: getBlogAlternates(locale, slug),
    openGraph: {
      locale: getOgLocale(locale),
      alternateLocale: getOgAlternateLocales(locale),
      title: seoTitle,
      description: seoDesc,
      images: post.image
        ? [{ url: post.image, width: 1200, height: 630, alt: post.title }]
        : [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Un Bateau à Paris — Actualités" }],
    },
    ...(post.seo?.robots?.includes('noindex') && {
      robots: { index: false, follow: true },
    }),
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = getPost(slug, locale);
  if (!post) notFound();

  const seoTitle = post.seo?.title || post.title;
  const seoDesc = post.seo?.description || cleanExcerpt(post.title, post.excerpt).slice(0, 160);
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tBreadcrumb = await getTranslations({ locale, namespace: "breadcrumb" });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: seoTitle,
            description: seoDesc,
            image: post.image || undefined,
            datePublished: post.date,
            dateModified: post.modified || post.date,
            author: { "@type": "Organization", name: "Un Bateau à Paris" },
            publisher: {
              "@type": "Organization",
              name: "Un Bateau à Paris",
              logo: {
                "@type": "ImageObject",
                url: "https://bateau-a-paris.fr/og-image.jpg",
              },
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbJsonLd([
            { name: tBreadcrumb("home"), url: `/${locale}` },
            { name: tNav("actualites"), url: `/${locale}/actualites` },
            { name: post.title, url: `/${locale}/actualites/${slug}` },
          ])),
        }}
      />
      <LandingBreadcrumb items={[{ name: tNav("actualites"), href: "/actualites" }, { name: post.title }]} />
      <ArticleDetail post={post} />
    </>
  );
}
