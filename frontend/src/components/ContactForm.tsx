"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useThemeVariant } from "@/contexts/ThemeVariantContext";
import { Send, Phone, Mail, MapPin } from "lucide-react";

const contactInfo = [
  { icon: Phone, label: "+33 6 70 34 25 43" },
  { icon: Mail, label: "capitaine@bateau-a-paris.fr" },
  { icon: MapPin, label: "Port de l'Arsenal – Paris 12ème" },
];

const ContactForm = () => {
  const { isDark } = useThemeVariant();
  const { toast } = useToast();
  const t = useTranslations("contact");
  const prefersReducedMotion = useReducedMotion();

  const styles = isDark
    ? {
        section: "bg-[#0a1628]",
        title: "font-heading text-3xl md:text-4xl font-semibold text-blue-100",
        text: "text-blue-200/70 text-lg",
        card: "bg-white/5 border border-blue-400/10 rounded-2xl p-8 md:p-10",
        label: "text-sm font-medium text-blue-100",
        input: "bg-white/5 border-blue-300/10 text-blue-100 focus:border-accent placeholder:text-blue-300/30",
        cta: "btn-gold text-white w-full",
        infoTitle: "font-heading text-xl font-semibold text-blue-100",
        infoText: "text-blue-200/60 text-sm",
        infoIcon: "text-accent",
      }
    : {
        section: "bg-muted/30",
        title: "font-heading text-3xl md:text-4xl font-semibold text-primary",
        text: "text-muted-foreground text-lg",
        card: "bg-white rounded-2xl shadow-lg p-8 md:p-10",
        label: "text-sm font-medium text-foreground",
        input: "border-border focus:border-primary",
        cta: "btn-gold text-white w-full",
        infoTitle: "font-heading text-xl font-semibold text-primary",
        infoText: "text-muted-foreground text-sm",
        infoIcon: "text-primary",
      };

  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [honeypot, setHoneypot] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: t("errorRequired"), variant: "destructive" });
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, website: honeypot }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        if (data.error === "rate_limited") {
          toast({ title: t("errorRateLimit"), variant: "destructive" });
        } else if (data.error === "validation") {
          toast({ title: t("errorValidation"), variant: "destructive" });
        } else {
          toast({ title: t("errorServer"), variant: "destructive" });
        }
        return;
      }
      toast({ title: t("successTitle"), description: t("successDesc") });
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      toast({ title: t("errorServer"), variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  return (
    <section className={`section-padding ${styles.section}`} id="contact">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : undefined }}
          className="text-center mb-12"
        >
          <h2 className={`${styles.title} mb-4`}>{t("title")}</h2>
          <p className={`${styles.text} max-w-2xl mx-auto`}>
            {t("subtitle")} <br/>{t("subtitleDetail")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8 max-w-5xl mx-auto">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0 : undefined }}
          >
            <form onSubmit={handleSubmit} className={styles.card}>
              {/* Honeypot antispam — invisible pour les humains */}
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="absolute opacity-0 h-0 w-0 -z-10"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="contact-name" className={`${styles.label} block mb-1.5`}>{t("nameLabel")}</label>
                  <Input
                    id="contact-name"
                    className={styles.input}
                    placeholder={t("namePlaceholder")}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    maxLength={100}
                    aria-required="true"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className={`${styles.label} block mb-1.5`}>{t("emailLabel")}</label>
                  <Input
                    id="contact-email"
                    type="email"
                    className={styles.input}
                    placeholder={t("emailPlaceholder")}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    maxLength={255}
                    aria-required="true"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="contact-phone" className={`${styles.label} block mb-1.5`}>{t("phoneLabel")}</label>
                <Input
                  id="contact-phone"
                  type="tel"
                  className={styles.input}
                  placeholder={t("phonePlaceholder")}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  maxLength={20}
                />
              </div>

              <div className="mb-6">
                <label htmlFor="contact-message" className={`${styles.label} block mb-1.5`}>{t("messageLabel")}</label>
                <Textarea
                  id="contact-message"
                  className={`${styles.input} min-h-[140px]`}
                  placeholder={t("messagePlaceholder")}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  maxLength={1000}
                  aria-required="true"
                />
              </div>

              <Button type="submit" className={styles.cta} disabled={sending}>
                {sending ? t("sending") : t("send")}
                <Send className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: prefersReducedMotion ? 0 : 0.15, duration: prefersReducedMotion ? 0 : undefined }}
            className="flex flex-col gap-6"
          >
            <div className={styles.card}>
              <h3 className={`${styles.infoTitle} mb-6`}>{t("infoTitle")}</h3>
              <div className="space-y-5">
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex items-start gap-3">
                    <info.icon className={`w-5 h-5 mt-0.5 shrink-0 ${styles.infoIcon}`} />
                    <span className={styles.infoText}>{info.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.card}>
              <h3 className={`${styles.infoTitle} mb-3`}>{t("hoursTitle")}</h3>
              <p className={styles.infoText}>
                {t("hoursText").split("\n").map((line, i) => (
                  <span key={i}>{line}<br /></span>
                ))}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
