"use client";

import { useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navItems = [
  { label: "Le Bateau", href: "#bateau" },
  { label: "La Croisière", href: "#croisiere" },
  { label: "Galerie", href: "#galerie" },
  { label: "Tarifs", href: "#tarifs" },
  { label: "Actualités", href: "#actualites" },
  { label: "Contact", href: "#contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState<"FR" | "EN">("FR");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container-custom">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-heading text-xl md:text-2xl font-semibold text-primary">
              Un Bateau à Paris
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language Switch */}
            <button
              onClick={() => setLang(lang === "FR" ? "EN" : "FR")}
              className="flex items-center gap-1 text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
            >
              <Globe className="w-4 h-4" />
              {lang}
            </button>

            {/* CTA Button */}
            <Button className="btn-gold text-white" asChild>
              <Link href="/reservation">Réservation</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-primary" />
            ) : (
              <Menu className="w-6 h-6 text-primary" />
            )}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-b border-border"
          >
            <div className="container-custom py-4 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-2 text-foreground/80 hover:text-primary transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 border-t border-border flex items-center justify-between">
                <button
                  onClick={() => setLang(lang === "FR" ? "EN" : "FR")}
                  className="flex items-center gap-1 text-sm font-medium text-foreground/70"
                >
                  <Globe className="w-4 h-4" />
                  {lang}
                </button>
                <Button className="btn-gold text-white" asChild>
                  <Link href="/reservation">Réservation</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;