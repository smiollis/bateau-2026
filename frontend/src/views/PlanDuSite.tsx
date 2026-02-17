import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getTranslations, getLocale } from "next-intl/server";
import { fetchAllLandingSlugs, fetchLandingData } from "@/data/landings";

export default async function PlanDuSite() {
  const t = await getTranslations("sitemap");
  const locale = await getLocale();

  const landingSlugs = await fetchAllLandingSlugs();

  const landingPages = await Promise.all(
    landingSlugs.map(async (slug) => {
      const data = await fetchLandingData(slug, locale);
      return {
        slug,
        title: data?.hero?.title ?? slug,
      };
    })
  );

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container-custom max-w-4xl">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Main pages */}
          <section>
            <h2 className="font-heading text-2xl font-semibold text-primary mb-4">
              {t("mainPages")}
            </h2>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link href="/croisiere" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("cruise")}
                </Link>
              </li>
              <li>
                <Link href="/galerie" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("gallery")}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("faqPage")}
                </Link>
              </li>
              <li>
                <Link href="/actualites" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("news")}
                </Link>
              </li>
              <li>
                <Link href="/reservation" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("reservation")}
                </Link>
              </li>
            </ul>
          </section>

          {/* Information */}
          <section>
            <h2 className="font-heading text-2xl font-semibold text-primary mb-4">
              {t("info")}
            </h2>
            <ul className="space-y-3">
              <li>
                <Link href="/cgv" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("cgv")}
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("legalNotice")}
                </Link>
              </li>
              <li>
                <Link href="/confidentialite" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("privacy")}
                </Link>
              </li>
              <li>
                <Link href="/plan-du-site" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("sitemapPage")}
                </Link>
              </li>
            </ul>
          </section>

          {/* Landing pages */}
          <section>
            <h2 className="font-heading text-2xl font-semibold text-primary mb-4">
              {t("landingPages")}
            </h2>
            <ul className="space-y-3">
              {landingPages.map(({ slug, title }) => (
                <li key={slug}>
                  <Link
                    href={`/${slug}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Blog */}
          <section>
            <h2 className="font-heading text-2xl font-semibold text-primary mb-4">
              {t("blog")}
            </h2>
            <ul className="space-y-3">
              <li>
                <Link href="/actualites" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("seeAllArticles")}
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
