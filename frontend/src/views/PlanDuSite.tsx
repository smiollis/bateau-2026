import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getTranslations, getLocale } from "next-intl/server";
import { getAllLandingSlugs, getLandingData } from "@/data/landings";
import { fetchLandingData } from "@/data/landings";

// Static tier definitions — avoids WP API duplicates from Polylang
const TIER_1 = [
  "evjf-seine",
  "evg-seine",
  "croisiere-romantique-seine",
  "demande-en-mariage-seine",
  "anniversaire-seine",
  "soiree-entre-amis-seine",
];
const TIER_2 = [
  "anniversaire-mariage-seine",
  "team-building-seine",
  "croisiere-famille-seine",
  "shooting-photo-seine",
  "coucher-soleil-seine",
  "apero-bateau-seine",
];
const TIER_3 = [
  "saint-valentin-seine",
  "nouvel-an-seine",
  "noel-seine",
  "fete-des-meres-seine",
  "seminaire-seine",
];

async function getLandingTitle(slug: string, locale: string): Promise<string> {
  try {
    const data = await fetchLandingData(slug, locale);
    if (data?.hero?.title) return data.hero.title;
  } catch {
    // fallback to static FR data
  }
  const staticData = getLandingData(slug);
  return staticData?.hero?.title ?? slug;
}

async function buildTier(slugs: string[], locale: string) {
  return Promise.all(
    slugs.map(async (slug) => ({
      slug,
      title: await getLandingTitle(slug, locale),
    }))
  );
}

export default async function PlanDuSite() {
  const t = await getTranslations("sitemap");
  const locale = await getLocale();

  const [tier1, tier2, tier3] = await Promise.all([
    buildTier(TIER_1, locale),
    buildTier(TIER_2, locale),
    buildTier(TIER_3, locale),
  ]);

  const linkClass =
    "text-muted-foreground hover:text-primary transition-colors inline-block";

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container-custom max-w-5xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("backToHome")}
        </Link>

        <h1 className="font-heading text-4xl md:text-5xl font-semibold text-primary mb-4">
          {t("title")}
        </h1>
        <p className="text-lg text-muted-foreground mb-12">
          {t("subtitle")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Pages principales */}
          <section>
            <h2 className="font-heading text-xl font-semibold text-primary mb-4 pb-2 border-b border-border">
              {t("mainPages")}
            </h2>
            <ul className="space-y-2.5">
              <li><Link href="/" className={linkClass}>{t("home")}</Link></li>
              <li><Link href="/croisiere" className={linkClass}>{t("cruise")}</Link></li>
              <li><Link href="/croisiere#tarifs" className={linkClass}>{t("pricing")}</Link></li>
              <li><Link href="/galerie" className={linkClass}>{t("gallery")}</Link></li>
              <li><Link href="/faq" className={linkClass}>{t("faqPage")}</Link></li>
              <li><Link href="/actualites" className={linkClass}>{t("news")}</Link></li>
              <li><Link href="/reservation" className={linkClass}>{t("reservation")}</Link></li>
              <li><Link href="/#contact" className={linkClass}>{t("contact")}</Link></li>
            </ul>
          </section>

          {/* Informations */}
          <section>
            <h2 className="font-heading text-xl font-semibold text-primary mb-4 pb-2 border-b border-border">
              {t("info")}
            </h2>
            <ul className="space-y-2.5">
              <li><Link href="/cgv" className={linkClass}>{t("cgv")}</Link></li>
              <li><Link href="/mentions-legales" className={linkClass}>{t("legalNotice")}</Link></li>
              <li><Link href="/confidentialite" className={linkClass}>{t("privacy")}</Link></li>
              <li><Link href="/plan-du-site" className={linkClass}>{t("sitemapPage")}</Link></li>
            </ul>
          </section>

          {/* Blog */}
          <section>
            <h2 className="font-heading text-xl font-semibold text-primary mb-4 pb-2 border-b border-border">
              {t("blog")}
            </h2>
            <ul className="space-y-2.5">
              <li><Link href="/actualites" className={linkClass}>{t("seeAllArticles")}</Link></li>
            </ul>
          </section>
        </div>

        {/* Landing pages — full width, organized by tier */}
        <section className="mt-12">
          <h2 className="font-heading text-2xl font-semibold text-primary mb-6 pb-2 border-b border-border">
            {t("landingPages")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Tier 1 — Événements */}
            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">
                {t("tierEvents")}
              </h3>
              <ul className="space-y-2.5">
                {tier1.map(({ slug, title }) => (
                  <li key={slug}>
                    <Link href={`/${slug}`} className={linkClass}>{title}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tier 2 — Expériences */}
            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">
                {t("tierExperiences")}
              </h3>
              <ul className="space-y-2.5">
                {tier2.map(({ slug, title }) => (
                  <li key={slug}>
                    <Link href={`/${slug}`} className={linkClass}>{title}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tier 3 — Saisons */}
            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">
                {t("tierSeasons")}
              </h3>
              <ul className="space-y-2.5">
                {tier3.map(({ slug, title }) => (
                  <li key={slug}>
                    <Link href={`/${slug}`} className={linkClass}>{title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
