import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export default async function MentionsLegales() {
  const t = await getTranslations("mentions");

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

          <h1 className="font-heading text-4xl md:text-5xl font-semibold text-primary mb-8">
            {t("title")}
          </h1>

          <div className="prose prose-lg max-w-none text-foreground/80 space-y-8">
            <p>{t("intro")}</p>

            <p><strong>{t("ownerLabel")}</strong> {t("ownerContent")}</p>
            <p><strong>{t("publisherLabel")}</strong> {t("publisherContent")}</p>
            <p>{t("publisherNote")}</p>
            <p><strong>{t("hostLabel")}</strong> {t("hostContent")}</p>

            <p>{t("usageTerms")}</p>
            <p>{t("availability")}</p>

            <h2 className="font-heading text-2xl font-semibold text-primary mt-10">{t("servicesTitle")}</h2>
            <p>{t("servicesContent")}</p>

            <h2 className="font-heading text-2xl font-semibold text-primary mt-10">{t("technicalTitle")}</h2>
            <p>{t("technicalContent1")}</p>
            <p>{t("technicalContent2")}</p>
            <p>{t("technicalContent3")}</p>

            <h2 className="font-heading text-2xl font-semibold text-primary mt-10">{t("personalDataTitle")}</h2>
            <p>{t("personalDataContent1")}</p>
            <p>{t("personalDataContent2")}</p>
            <p>{t("personalDataContent3")}</p>
            <p>{t("personalDataContent4")}</p>

            <h2 className="font-heading text-2xl font-semibold text-primary mt-10">{t("cookiesTitle")}</h2>
            <p>{t("cookiesContent1")}</p>
            <p>{t("cookiesContent2")}</p>

            <h2 className="font-heading text-2xl font-semibold text-primary mt-10">{t("jurisdictionTitle")}</h2>
            <p>{t("jurisdictionContent")}</p>

            <h2 className="font-heading text-2xl font-semibold text-primary mt-10">{t("lawsTitle")}</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t("lawsItem1")}</li>
              <li>{t("lawsItem2")}</li>
            </ul>

            <h2 className="font-heading text-2xl font-semibold text-primary mt-10">{t("glossaryTitle")}</h2>
            <p><strong>{t("glossaryUserLabel")}</strong> {t("glossaryUserContent")}</p>
            <p><strong>{t("glossaryPersonalInfoLabel")}</strong> {t("glossaryPersonalInfoContent")}</p>
          </div>
      </div>
    </div>
  );
}
