import { motion } from "framer-motion";
import { useThemeVariant, ThemeVariant } from "@/contexts/ThemeVariantContext";
import capitaineMichel from "@/assets/capitaine-michel.jpg";

const variantStyles: Record<ThemeVariant, {
  section: string;
  title: string;
  text: string;
  name: string;
  role: string;
  imageBorder: string;
  quote: string;
}> = {
  classic: {
    section: "bg-muted/30",
    title: "font-heading text-2xl md:text-3xl font-semibold text-primary",
    text: "text-muted-foreground",
    name: "font-heading text-lg font-semibold text-primary",
    role: "text-muted-foreground text-sm",
    imageBorder: "ring-4 ring-primary/20",
    quote: "text-muted-foreground italic text-lg border-l-4 border-primary/30 pl-6",
  },
  modern: {
    section: "bg-primary/5",
    title: "font-heading-michroma text-xl md:text-2xl uppercase tracking-wider text-primary",
    text: "text-muted-foreground",
    name: "font-heading-michroma uppercase tracking-wide text-primary text-sm",
    role: "text-muted-foreground text-xs uppercase tracking-wider",
    imageBorder: "ring-4 ring-accent",
    quote: "text-muted-foreground text-base border-l-4 border-accent pl-6",
  },
  minimal: {
    section: "bg-background",
    title: "font-heading-orbitron text-lg md:text-xl uppercase tracking-widest text-foreground",
    text: "text-muted-foreground text-sm",
    name: "font-heading-orbitron uppercase tracking-widest text-foreground text-sm",
    role: "text-muted-foreground text-xs",
    imageBorder: "ring-2 ring-accent",
    quote: "text-muted-foreground text-sm border-l-2 border-accent pl-4",
  },
  editorial: {
    section: "bg-amber-50/50",
    title: "font-heading text-2xl md:text-3xl text-amber-900 italic",
    text: "text-amber-800/70",
    name: "font-heading text-lg text-amber-900 font-semibold",
    role: "text-amber-700/60 text-sm italic",
    imageBorder: "ring-4 ring-amber-200",
    quote: "text-amber-800/70 italic text-lg border-l-4 border-amber-300 pl-6",
  },
  luxe: {
    section: "bg-neutral-900",
    title: "text-2xl md:text-3xl font-light text-white tracking-tight",
    text: "text-white/60",
    name: "text-white font-light tracking-wide",
    role: "text-amber-400/80 text-sm uppercase tracking-wider",
    imageBorder: "ring-4 ring-amber-400/30",
    quote: "text-white/50 text-lg border-l-4 border-amber-400/30 pl-6 italic",
  },
  nuit: {
    section: "bg-[#0d1d35]",
    title: "font-heading text-2xl md:text-3xl font-semibold text-blue-100",
    text: "text-blue-200/70",
    name: "font-heading text-lg font-semibold text-blue-100",
    role: "text-accent text-sm",
    imageBorder: "ring-4 ring-accent/30",
    quote: "text-blue-200/70 italic text-lg border-l-4 border-accent/40 pl-6",
  },
};

const CaptainSection = () => {
  const { variant } = useThemeVariant();
  const styles = variantStyles[variant];

  return (
    <section className={`py-16 lg:py-24 ${styles.section}`}>
      <div className="container-custom">
        <div className="grid lg:grid-cols-[300px_1fr] gap-12 items-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <img
              src={capitaineMichel}
              alt="Capitaine Michel"
              className={`w-56 h-56 lg:w-72 lg:h-72 rounded-full object-cover ${styles.imageBorder}`}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className={`${styles.title} mb-4`}>Votre Capitaine</h3>
            <p className={`${styles.quote} mb-6`}>
              « Notre équipe dévouée et expérimentée est là pour veiller à ce que votre voyage soit 
              exceptionnel à tous égards. Nous nous engageons à vous offrir une expérience de croisière 
              à la hauteur de vos attentes les plus élevées. »
            </p>
            <div>
              <p className={styles.name}>Michel</p>
              <p className={styles.role}>Capitaine du Senang</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CaptainSection;
