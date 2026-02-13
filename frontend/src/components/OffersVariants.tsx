"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useThemeVariant, ThemeVariant } from "@/contexts/ThemeVariantContext";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import formulePremiumImg from "@/assets/formule-premium.jpg";

const formuleImage = typeof formulePremiumImg === 'string' ? formulePremiumImg : formulePremiumImg.src;

const variantStyles: Record<ThemeVariant, {
  section: string;
  title: string;
  subtitle: string;
  card: string;
  cardTitle: string;
  price: string;
  cta: string;
  popularBadge: string;
}> = {
  classic: {
    section: "bg-secondary/30",
    title: "font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-primary",
    subtitle: "text-muted-foreground text-lg",
    card: "bg-card rounded-2xl border border-border",
    cardTitle: "font-heading text-xl font-semibold text-primary",
    price: "text-3xl font-bold text-primary",
    cta: "btn-gold text-white w-full",
    popularBadge: "bg-accent text-white",
  },
  nuit: {
    section: "bg-[#0a1628]",
    title: "font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-blue-100",
    subtitle: "text-blue-200/70 text-lg",
    card: "bg-white/5 backdrop-blur-sm border border-blue-400/10 rounded-2xl overflow-hidden hover:border-accent/30 transition-all",
    cardTitle: "font-heading text-xl font-semibold text-blue-100",
    price: "text-3xl font-bold text-accent",
    cta: "btn-gold text-white w-full",
    popularBadge: "bg-accent text-white",
  },
};

const OffersVariants = () => {
  const { variant } = useThemeVariant();
  const t = useTranslations("offers");
  const styles = variantStyles[variant];

  const offers = [
    {
      title: t("offer1Title"),
      price: 420,
      priceExtra: 70,
      description: t("offer1Desc"),
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: [t("feature_2h"), t("feature_6pers"), t("feature_comments"), t("feature_music")],
      popular: false,
    },
    {
      title: t("offer2Title"),
      price: 480,
      priceExtra: 80,
      description: t("offer2Desc"),
      image: "https://images.unsplash.com/photo-1547595628-c61a29f496f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: [t("feature_2h"), t("feature_6pers"), t("feature_champagne"), t("feature_music")],
      popular: true,
    },
    {
      title: t("offer3Title"),
      price: 600,
      priceExtra: 100,
      description: t("offer3Desc"),
      image: formuleImage,
      features: [t("feature_2h"), t("feature_6pers"), t("feature_champagnePremium"), t("feature_food")],
      popular: false,
    },
    {
      title: t("offer4Title"),
      price: 600,
      priceExtra: 100,
      description: t("offer4Desc"),
      image: "https://images.unsplash.com/photo-1478391679764-b2d8b3cd1e94?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: [t("feature_2h"), t("feature_6pers"), t("feature_guide"), t("feature_anecdotes")],
      popular: false,
    },
  ];

  // Default: Grid layout for Classic, Nuit
  return (
    <section className={`section-padding ${styles.section}`} id="tarifs">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`${styles.title} mb-4`}>{t("title")}</h2>
          <p className={styles.subtitle}>{t("subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className={`${styles.card} overflow-hidden card-hover h-full flex flex-col ${offer.popular ? 'ring-2 ring-accent' : ''}`}>
                {offer.popular && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className={`${styles.popularBadge} text-xs font-semibold px-3 py-1 rounded-full`}>
                      {t("popular")}
                    </span>
                  </div>
                )}

                <div className="relative h-48 overflow-hidden">
                  <Image src={offer.image} alt={offer.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className={`absolute inset-0 ${variant === "nuit" ? "bg-[#0a1628]/50" : "bg-gradient-to-t from-primary/40 to-transparent"}`} />
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className={`${styles.cardTitle} mb-2`}>{offer.title}</h3>
                  <p className={`${variant === "nuit" ? "text-blue-200/60" : "text-muted-foreground"} text-sm mb-4`}>
                    {offer.description}
                  </p>

                  <div className="mb-4">
                    <span className={`${variant === "nuit" ? "text-blue-200/50" : "text-muted-foreground"} text-xs`}>{t("from")}</span>
                    <div>
                      <span className={styles.price}>{offer.price}€</span>
                      <span className={`${variant === "nuit" ? "text-blue-200/50" : "text-muted-foreground"} text-sm ml-1`}>
                        {t("perGroup")}
                      </span>
                    </div>
                    <span className={`${variant === "nuit" ? "text-blue-200/50" : "text-muted-foreground"} text-xs`}>{t("extraPerson", { price: offer.priceExtra })}</span>
                  </div>

                  <ul className="space-y-2 mb-6 flex-grow">
                    {offer.features.map((f) => (
                      <li key={f} className={`flex items-start gap-2 text-sm ${variant === "nuit" ? "text-blue-100/80" : "text-foreground/80"}`}>
                        <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Button className={offer.popular ? styles.cta : `w-full ${variant === "nuit" ? "bg-white/10 border border-accent/40 text-accent hover:bg-accent hover:text-white" : ""}`} variant={offer.popular ? "default" : "outline"} asChild>
                    <Link href="/reservation">{t("cta")}</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OffersVariants;
