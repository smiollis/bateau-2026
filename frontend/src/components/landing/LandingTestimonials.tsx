"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Star } from "lucide-react";
import reviewsData from "@/data/reviews.json";

interface LandingTestimonialsProps {
  title: string;
  filter?: string;
}

const LandingTestimonials = ({ title }: LandingTestimonialsProps) => {
  const prefersReducedMotion = useReducedMotion();
  // Use all reviews (filter by tag can be added later when reviews are tagged)
  const reviews = reviewsData.reviews.slice(0, 3);

  return (
    <section className="section-padding">
      <div className="container-custom">
        <motion.h2
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : undefined }}
          className="font-heading text-3xl md:text-4xl font-semibold text-primary text-center mb-4"
        >
          {title}
        </motion.h2>
        <p className="text-center text-muted-foreground mb-10">
          {reviewsData.placeRating}/5 sur {reviewsData.totalReviews} avis Google
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: prefersReducedMotion ? 0 : i * 0.1, duration: prefersReducedMotion ? 0 : undefined }}
              className="p-6 rounded-xl bg-background shadow-sm border"
            >
              <div className="flex items-center gap-3 mb-3">
                <Image
                  src={review.avatar}
                  alt={review.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="font-medium text-primary text-sm">{review.name}</p>
                  <div className="flex gap-0.5">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-gold text-gold" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground text-sm line-clamp-4">
                {review.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingTestimonials;
