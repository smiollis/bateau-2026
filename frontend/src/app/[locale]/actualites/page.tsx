import React from 'react';
import { getTranslations } from 'next-intl/server';
import { getAlternates, getOgLocale } from '@/lib/metadata';
import { locales } from '@/i18n/routing';
import Page from '@/views/Actualites';
import type { PostSummary } from '@/views/Actualites';

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
function stripContent(posts: typeof postsFr): PostSummary[] {
  return posts.map(({ content, link, ...rest }) => rest);
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
    openGraph: { locale: getOgLocale(locale) },
  };
}

export default async function RouteWrapper({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const allPosts = postsMap[locale] ?? postsFr;
  const posts = stripContent(allPosts);
  return <Page posts={posts} />;
}
