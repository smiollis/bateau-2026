"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useThemeVariant, ThemeVariant } from "@/contexts/ThemeVariantContext";
import { Send, Phone, Mail, MapPin } from "lucide-react";

const variantStyles: Record<ThemeVariant, {
  section: string;
  title: string;
  text: string;
  card: string;
  label: string;
  input: string;
  cta: string;
  infoTitle: string;
  infoText: string;
  infoIcon: string;
}> = {
  classic: {
    section: "bg-muted/30",
    title: "font-heading text-3xl md:text-4xl font-semibold text-primary",
    text: "text-muted-foreground text-lg",
    card: "bg-white rounded-2xl shadow-lg p-8 md:p-10",
    label: "text-sm font-medium text-foreground",
    input: "border-border focus:border-primary",
    cta: "btn-gold w-full",
    infoTitle: "font-heading text-xl font-semibold text-primary",
    infoText: "text-muted-foreground text-sm",
    infoIcon: "text-primary",
  },
  modern: {
    section: "bg-primary/5",
    title: "font-heading-michroma text-2xl md:text-3xl uppercase tracking-wider text-primary",
    text: "text-muted-foreground",
    card: "bg-white rounded-none shadow-lg p-8 md:p-10 border-t-4 border-accent",
    label: "text-xs font-heading-michroma uppercase tracking-wider text-foreground",
    input: "border-border focus:border-accent rounded-none",
    cta: "bg-accent text-accent-foreground font-heading-michroma uppercase tracking-wider w-full hover:bg-accent/90 rounded-none",
    infoTitle: "font-heading-michroma text-lg uppercase tracking-wider text-primary",
    infoText: "text-muted-foreground text-sm",
    infoIcon: "text-accent",
  },
  minimal: {
    section: "bg-background",
    title: "font-heading-orbitron text-xl md:text-2xl uppercase tracking-widest text-foreground",
    text: "text-muted-foreground text-sm",
    card: "border-2 border-border p-8 md:p-10",
    label: "text-xs font-heading-orbitron uppercase tracking-widest text-foreground",
    input: "border-border focus:border-accent rounded-none",
    cta: "bg-transparent border-2 border-accent text-accent font-heading-orbitron uppercase tracking-widest w-full hover:bg-accent hover:text-accent-foreground rounded-none",
    infoTitle: "font-heading-orbitron text-lg uppercase tracking-widest text-foreground",
    infoText: "text-muted-foreground text-xs",
    infoIcon: "text-accent",
  },
  editorial: {
    section: "bg-amber-50",
    title: "font-heading text-3xl md:text-4xl text-amber-900 italic",
    text: "text-amber-800/60 text-lg",
    card: "bg-white rounded-3xl shadow-xl p-8 md:p-10",
    label: "text-sm font-medium text-amber-900",
    input: "border-amber-200 focus:border-amber-600 rounded-xl",
    cta: "bg-amber-700 text-white w-full hover:bg-amber-800 rounded-xl",
    infoTitle: "font-heading text-xl text-amber-900 font-semibold",
    infoText: "text-amber-700/60 text-sm",
    infoIcon: "text-amber-700",
  },
  luxe: {
    section: "bg-neutral-950",
    title: "text-3xl md:text-4xl font-light text-white tracking-tight",
    text: "text-white/50",
    card: "bg-white/5 border border-amber-400/10 rounded-2xl p-8 md:p-10",
    label: "text-xs uppercase tracking-wider text-white/60",
    input: "bg-white/5 border-white/10 text-white focus:border-amber-400 placeholder:text-white/30",
    cta: "bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold w-full hover:from-amber-400 hover:to-amber-500",
    infoTitle: "text-xl font-light text-white",
    infoText: "text-white/40 text-sm",
    infoIcon: "text-amber-400",
  },
  nuit: {
    section: "bg-[#0a1628]",
    title: "font-heading text-3xl md:text-4xl font-semibold text-blue-100",
    text: "text-blue-200/70 text-lg",
    card: "bg-white/5 border border-blue-400/10 rounded-2xl p-8 md:p-10",
    label: "text-sm font-medium text-blue-100",
    input: "bg-white/5 border-blue-300/10 text-blue-100 focus:border-accent placeholder:text-blue-300/30",
    cta: "btn-gold w-full",
    infoTitle: "font-heading text-xl font-semibold text-blue-100",
    infoText: "text-blue-200/60 text-sm",
    infoIcon: "text-accent",
  },
};

const contactInfo = [
  { icon: Phone, label: "+33 6 70 34 25 43" },
  { icon: Mail, label: "capitaine@bateau-a-paris.fr" },
  { icon: MapPin, label: "Port de l'Arsenal – Paris 12ème" },
];

const ContactForm = () => {
  const { variant } = useThemeVariant();
  const styles = variantStyles[variant];
  const { toast } = useToast();

  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: "Veuillez remplir tous les champs obligatoires", variant: "destructive" });
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast({ title: "Message envoyé !", description: "Nous vous répondrons dans les plus brefs délais." });
      setForm({ name: "", email: "", phone: "", message: "" });
    }, 1000);
  };

  return (
    <section className={`section-padding ${styles.section}`} id="contact">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className={`${styles.title} mb-4`}>Contactez-nous</h2>
          <p className={`${styles.text} max-w-2xl mx-auto`}>
            Une question, une demande de devis ? N'hésitez pas à nous écrire, 
            nous vous répondrons dans les plus brefs délais.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8 max-w-5xl mx-auto">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className={styles.card}>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className={`${styles.label} block mb-1.5`}>Nom *</label>
                  <Input
                    className={styles.input}
                    placeholder="Votre nom"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    maxLength={100}
                  />
                </div>
                <div>
                  <label className={`${styles.label} block mb-1.5`}>Email *</label>
                  <Input
                    type="email"
                    className={styles.input}
                    placeholder="votre@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    maxLength={255}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className={`${styles.label} block mb-1.5`}>Téléphone</label>
                <Input
                  type="tel"
                  className={styles.input}
                  placeholder="+33 6 00 00 00 00"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  maxLength={20}
                />
              </div>

              <div className="mb-6">
                <label className={`${styles.label} block mb-1.5`}>Message *</label>
                <Textarea
                  className={`${styles.input} min-h-[140px]`}
                  placeholder="Décrivez votre projet de croisière : date souhaitée, nombre de personnes, occasion…"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  maxLength={1000}
                />
              </div>

              <Button type="submit" className={styles.cta} disabled={sending}>
                {sending ? "Envoi en cours…" : "Envoyer"}
                <Send className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="flex flex-col gap-6"
          >
            <div className={styles.card}>
              <h3 className={`${styles.infoTitle} mb-6`}>Nos coordonnées</h3>
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
              <h3 className={`${styles.infoTitle} mb-3`}>Horaires</h3>
              <p className={styles.infoText}>
                Croisières tous les jours<br />
                de 10h à 22h<br />
                sur réservation uniquement
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
