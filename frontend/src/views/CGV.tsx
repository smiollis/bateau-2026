"use client";

import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useThemeVariant } from "@/contexts/ThemeVariantContext";
import { useTranslations } from "next-intl";

const CGV = () => {
  const { isDark } = useThemeVariant();
  const t = useTranslations("cgv");

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

            <h2 className="font-heading text-2xl font-semibold text-primary mt-10">{t("reservationTitle")}</h2>
            <ul className="list-disc pl-6 space-y-3">
              <li>{t("reservationItem1")}</li>
              <li>{t("reservationItem2")}</li>
              <li>{t("reservationItem3")}</li>
              <li>{t("reservationItem4")}</li>
            </ul>

            <h2 className="font-heading text-2xl font-semibold text-primary mt-10">{t("pricesTitle")}</h2>
            <p>{t("pricesContent1")}</p>
            <p>{t("pricesContent2")}</p>
            <p>{t("pricesContent3")}</p>

            <h2 className="font-heading text-2xl font-semibold text-primary mt-10">{t("paymentTitle")}</h2>
            <p>{t("paymentContent")}</p>

            <h2 className="font-heading text-2xl font-semibold text-primary mt-10">{t("withdrawalTitle")}</h2>
            <p>{t("withdrawalContent")}</p>

            <h2 className="font-heading text-2xl font-semibold text-primary mt-10">{t("cancellationTitle")}</h2>
            <ol className="list-decimal pl-6 space-y-3">
              <li>
                <strong>{t("cancellationModifLabel")}</strong> {t("cancellationModifContent")}
              </li>
              <li>
                <strong>{t("cancellationNoShowLabel")}</strong> {t("cancellationNoShowContent")}
              </li>
              <li>
                <strong>{t("cancellationByUsLabel")}</strong> {t("cancellationByUsContent")}
              </li>
              <li>
                <strong>{t("cancellationByClientLabel")}</strong>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>{t("cancellationByClientMore2Days")}</li>
                  <li>{t("cancellationByClientLess2Days")}</li>
                </ul>
              </li>
            </ol>
            <p>{t("cancellationWeather")}</p>

            <h2 className="font-heading text-2xl font-semibold text-primary mt-10">{t("excursionTitle")}</h2>
            <h3 className="font-heading text-xl font-semibold text-primary mt-6">{t("excursionArrivalTitle")}</h3>
            <p>{t("excursionArrivalContent")}</p>

            <h3 className="font-heading text-xl font-semibold text-primary mt-6">{t("excursionDuringTitle")}</h3>
            <p>{t("excursionDuringContent")}</p>

            <h3 className="font-heading text-xl font-semibold text-primary mt-6">{t("excursionDepartureTitle")}</h3>
            <p>{t("excursionDepartureContent")}</p>

            <h2 className="font-heading text-2xl font-semibold text-primary mt-10">{t("animalsTitle")}</h2>
            <p>{t("animalsContent")}</p>

            <h2 className="font-heading text-2xl font-semibold text-primary mt-10">{t("disputeTitle")}</h2>
            <p>{t("disputeContent")}</p>

            <h2 className="font-heading text-2xl font-semibold text-primary mt-10">{t("liabilityTitle")}</h2>
            <p>{t("liabilityContent")}</p>

            <h2 className="font-heading text-2xl font-semibold text-primary mt-10">{t("dataTitle")}</h2>
            <p>{t("dataContent")}</p>
            <address className={`not-italic p-4 rounded-lg ${isDark ? "bg-white/5" : "bg-secondary/50"}`}>
              {t("dataAddress")}
            </address>
          </div>
      </div>
    </div>
  );
};

export default CGV;
