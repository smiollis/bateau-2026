"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useThemeVariant } from "@/contexts/ThemeVariantContext";
import reviewsData from "@/data/reviews.json";
import { useTranslations } from "next-intl";

const testimonials = reviewsData.reviews;

const TestimonialsVariants = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isDark } = useThemeVariant();
  const t = useTranslations("testimonials");

  const styles = isDark
    ? {
        section: "bg-[#0d1d35]",
        title: "font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-blue-100",
        subtitle: "text-blue-200/70",
        card: "bg-white/5 backdrop-blur-sm border border-blue-400/10 rounded-2xl p-8 md:p-10",
        name: "font-semibold text-accent text-lg",
        text: "text-blue-200/70 text-lg leading-relaxed italic",
        nav: "bg-accent/10 hover:bg-accent/20 text-accent border border-accent/30",
        dots: "bg-blue-300/20",
        activeDot: "bg-accent",
        starColor: "fill-accent text-accent",
        dateColor: "text-blue-200/50",
      }
    : {
        section: "bg-primary",
        title: "font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-primary-foreground",
        subtitle: "text-primary-foreground/80",
        card: "bg-primary-foreground rounded-2xl p-8 md:p-10",
        name: "font-semibold text-primary text-lg",
        text: "text-foreground/80 text-lg leading-relaxed italic",
        nav: "bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground",
        dots: "bg-primary-foreground/30 hover:bg-primary-foreground/50",
        activeDot: "bg-accent",
        starColor: "fill-accent text-accent",
        dateColor: "text-muted-foreground",
      };

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className={`section-padding ${styles.section}`} id="temoignages">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          {isDark ? (
            <p className={styles.subtitle}>{t("label")}</p>
          ) : (
            <div className="flex items-center justify-center gap-2 mb-4">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span className={styles.subtitle}>{t("googleLabel")}</span>
            </div>
          )}

          <h2 className={`${styles.title} ${isDark ? "mt-4" : ""} mb-4`}>
            {isDark ? (
              <>Ce que disent nos <span className="text-accent">passagers</span></>
            ) : (
              t("title")
            )}
          </h2>

          <div className="flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-6 h-6 ${styles.starColor}`} />
            ))}
            <span className={`ml-2 ${styles.subtitle} font-medium`}>{t("ratingLabel", { rating: reviewsData.placeRating, count: reviewsData.totalReviews })}</span>
          </div>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <button
            onClick={prev}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 w-10 h-10 rounded-full ${styles.nav} flex items-center justify-center transition-colors`}
            aria-label={t("prevReview")}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={next}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 w-10 h-10 rounded-full ${styles.nav} flex items-center justify-center transition-colors`}
            aria-label={t("nextReview")}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className={styles.card}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
                <Image
                  src={testimonials[currentIndex].avatar}
                  alt={testimonials[currentIndex].name}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-grow">
                  <h4 className={styles.name}>{testimonials[currentIndex].name}</h4>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${styles.starColor}`} />
                      ))}
                    </div>
                    <span className={`text-sm ${styles.dateColor}`}>
                      {testimonials[currentIndex].date}
                    </span>
                  </div>
                </div>
              </div>
              <p className={styles.text}>&ldquo;{testimonials[currentIndex].text}&rdquo;</p>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((testimonial, index) => (
              <button
                key={`review-${testimonial.name}`}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? `w-6 ${styles.activeDot}` : styles.dots
                }`}
                aria-label={t("viewReview", { index: index + 1 })}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsVariants;
