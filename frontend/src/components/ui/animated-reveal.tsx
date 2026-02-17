"use client";

import { m, useReducedMotion } from "framer-motion";
import type { PropsWithChildren } from "react";

interface AnimatedRevealProps {
  delay?: number;
  className?: string;
}

const AnimatedReveal = ({ delay = 0, className, children }: PropsWithChildren<AnimatedRevealProps>) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <m.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: prefersReducedMotion ? 0 : delay, duration: prefersReducedMotion ? 0 : undefined }}
      className={className}
    >
      {children}
    </m.div>
  );
};

export default AnimatedReveal;
