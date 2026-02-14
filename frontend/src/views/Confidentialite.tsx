import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export default async function Confidentialite() {
  const t = await getTranslations("confidentialite");

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
            <h2 className="font-heading text-2xl font-semibold text-primary mt-10">{t("ownerTitle")}</h2>
            <p>{t("ownerContent")}</p>

            <h2 className="font-heading text-2xl font-semibold text-primary mt-10">{t("dataCollectedTitle")}</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t("dataCollectedItem1")}</li>
              <li>{t("dataCollectedItem2")}</li>
              <li>{t("dataCollectedItem3")}</li>
            </ul>

            <h2 className="font-heading text-2xl font-semibold text-primary mt-10">{t("purposeTitle")}</h2>
            <p>{t("purposeContent")}</p>

            <h2 className="font-heading text-2xl font-semibold text-primary mt-10">{t("legalBasisTitle")}</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t("legalBasisItem1")}</li>
              <li>{t("legalBasisItem2")}</li>
              <li>{t("legalBasisItem3")}</li>
            </ul>

            <h2 className="font-heading text-2xl font-semibold text-primary mt-10">{t("retentionTitle")}</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t("retentionItem1")}</li>
              <li>{t("retentionItem2")}</li>
              <li>{t("retentionItem3")}</li>
            </ul>

            <h2 className="font-heading text-2xl font-semibold text-primary mt-10">{t("sharingTitle")}</h2>
            <p>{t("sharingContent")}</p>

            <h2 className="font-heading text-2xl font-semibold text-primary mt-10">{t("rightsTitle")}</h2>
            <p>{t("rightsContent")}</p>

            <h2 className="font-heading text-2xl font-semibold text-primary mt-10">{t("securityTitle")}</h2>
            <p>{t("securityContent")}</p>

            <h2 className="font-heading text-2xl font-semibold text-primary mt-10">{t("cookiesTitle")}</h2>
            <p>{t("cookiesContent1")}</p>
            <p>{t("cookiesContent2")}</p>

            <h2 className="font-heading text-2xl font-semibold text-primary mt-10">{t("modificationTitle")}</h2>
            <p>{t("modificationContent")}</p>
          </div>
      </div>
    </div>
  );
}
