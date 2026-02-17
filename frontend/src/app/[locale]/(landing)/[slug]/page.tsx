import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { fetchLandingData, fetchAllLandingSlugs, getRelatedPages } from "@/data/landings";
import { getAlternates, getOgLocale } from "@/lib/metadata";
import {
  generateFAQPageJsonLd,
  generateTouristAttractionJsonLd,
  generateBreadcrumbJsonLd,
} from "@/lib/seo/jsonld";
import {
  LandingHero,
  LandingBreadcrumb,
  LandingRichtext,
  LandingBenefits,
  LandingGallery,
  LandingTestimonials,
  LandingPricing,
  LandingFAQ,
  LandingCTA,
  LandingStickyBar,
  LandingRelated,
} from "@/components/landing";
import { locales } from "@/i18n/routing";
import type { FAQSection, LandingSection } from "@/data/landings/types";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await fetchAllLandingSlugs();
  return locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const landing = await fetchLandingData(slug, locale);
  if (!landing) return {};

  return {
    title: landing.meta.title,
    description: landing.meta.description,
    alternates: getAlternates(locale, `/${slug}`),
    openGraph: {
      locale: getOgLocale(locale),
      title: landing.meta.title,
      description: landing.meta.description,
      ...(landing.meta.ogImage && {
        images: [{ url: landing.meta.ogImage }],
      }),
    },
  };
}

function SectionRenderer({ section }: { section: LandingSection }) {
  switch (section.type) {
    case "richtext":
      return <LandingRichtext title={section.title} content={section.content} />;
    case "benefits":
      return <LandingBenefits title={section.title} items={section.items} />;
    case "gallery":
      return <LandingGallery title={section.title} images={section.images} />;
    case "testimonials":
      return <LandingTestimonials title={section.title} filter={section.filter} />;
    case "pricing":
      return <LandingPricing title={section.title} />;
    case "faq":
      return <LandingFAQ title={section.title} items={section.items} />;
    default:
      return null;
  }
}

export default async function LandingPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const landing = await fetchLandingData(slug, locale);
  if (!landing) notFound();

  const t = await getTranslations({ locale, namespace: "breadcrumb" });

  const faqSection = landing.sections.find(
    (s): s is FAQSection => s.type === "faq"
  );

  const breadcrumbItems = [
    { name: t("cruises"), href: "/croisiere" },
    { name: landing.hero.title },
  ];

  const relatedPages = getRelatedPages(landing.relatedPages);

  const jsonLdScripts = [
    generateTouristAttractionJsonLd(landing, locale),
    generateBreadcrumbJsonLd([
      { name: t("home"), url: `/${locale}` },
      { name: t("cruises"), url: `/${locale}/croisiere` },
      { name: landing.hero.title, url: `/${locale}/${slug}` },
    ]),
    ...(faqSection ? [generateFAQPageJsonLd(faqSection.items)] : []),
  ];

  return (
    <>
      {jsonLdScripts.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <LandingHero {...landing.hero} />
      <LandingBreadcrumb items={breadcrumbItems} />
      {landing.sections.map((section, i) => (
        <SectionRenderer key={`${section.type}-${i}`} section={section} />
      ))}
      <LandingCTA ctaHref={landing.hero.cta.href} ctaText={landing.hero.cta.text} />
      {relatedPages.length > 0 && <LandingRelated pages={relatedPages} />}
      <LandingStickyBar ctaHref={landing.hero.cta.href} ctaText={landing.hero.cta.text} />
    </>
  );
}
