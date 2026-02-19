import React from 'react';
import { getTranslations } from 'next-intl/server';
import { getAlternates, getOgLocale, getOgAlternateLocales } from '@/lib/metadata';
import { generateBreadcrumbJsonLd } from '@/lib/seo/jsonld';
import LandingBreadcrumb from '@/components/landing/LandingBreadcrumb';
import { locales } from '@/i18n/routing';
import Page from '@/views/Actualites';
import type { PostSummary } from '@/views/Actualites';

// Static JSON — refreshed by GitHub Actions cron + WP webhook
import postsFr from "@/data/posts.json";
import postsEn from "@/data/posts-en.json";
import postsEs from "@/data/posts-es.json";
import postsIt from "@/data/posts-it.json";
import postsDe from "@/data/posts-de.json";
import postsPtBR from "@/data/posts-pt-BR.json";

const postsMap: Record<string, typeof postsFr> = {
  fr: postsFr,
  en: postsEn,
  es: postsEs,
  it: postsIt,
  de: postsDe,
  "pt-BR": postsPtBR,
};

/** Strip heavy `content` and unused `link` fields — only send list-view data to client */
function stripContent(
  posts: Array<PostSummary & { content?: string; link?: string; modified?: string; seo?: unknown }>
): PostSummary[] {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return posts.map(({ content, link, modified, seo, ...rest }) => rest);
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("actualitesTitle"),
    description: t("actualitesDescription"),
    alternates: getAlternates(locale, "/actualites"),
    openGraph: { locale: getOgLocale(locale), alternateLocale: getOgAlternateLocales(locale) },
  };
}

export default async function RouteWrapper({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const posts = stripContent(postsMap[locale] ?? postsFr);
  const t = await getTranslations({ locale, namespace: "nav" });
  const tBreadcrumb = await getTranslations({ locale, namespace: "breadcrumb" });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbJsonLd([{ name: tBreadcrumb("home"), url: `/${locale}` }, { name: t("actualites"), url: `/${locale}/actualites` }])) }}
      />
      <LandingBreadcrumb items={[{ name: t("actualites") }]} />
      <Page posts={posts} />
    </>
  );
}
