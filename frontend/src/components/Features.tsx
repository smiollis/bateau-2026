import { motion } from "framer-motion";
import { Clock, MapPin, Users, Sparkles } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "Croisière de 2h",
    description: "Deux heures de navigation au fil de l'eau pour profiter pleinement de Paris.",
  },
  {
    icon: MapPin,
    title: "Au cœur de Paris",
    description: "Passez devant la Tour Eiffel, Notre-Dame, le Louvre et bien d'autres monuments.",
  },
  {
    icon: Users,
    title: "Jusqu'à 12 personnes",
    description: "Profitez d'un moment privilégié en famille, entre amis ou collègues.",
  },
  {
    icon: Sparkles,
    title: "Croisière à la carte",
    description: "Choisissez parmi nos formules ou personnalisez votre expérience.",
  },
];

const Features = () => {
  return (
    <section className="section-padding bg-background" id="croisiere">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-primary mb-4">
            Une expérience unique
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Découvrez ce qui rend nos croisières privées si spéciales
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-card rounded-xl p-6 lg:p-8 border border-border card-hover h-full text-center">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-5 group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                  <feature.icon className="w-7 h-7" />
                </div>

                {/* Content */}
                <h3 className="font-heading text-xl font-semibold text-primary mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;