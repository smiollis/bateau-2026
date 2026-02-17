import {
  Ship, GlassWater, Camera, Sparkles, Users, Heart,
  Music, Utensils, Sun, Briefcase, PartyPopper, Star,
} from "lucide-react";
import type { BenefitItem } from "@/data/landings/types";
import AnimatedReveal from "@/components/ui/animated-reveal";

const iconMap: Record<string, React.ElementType> = {
  ship: Ship,
  champagne: GlassWater,
  camera: Camera,
  sparkles: Sparkles,
  users: Users,
  heart: Heart,
  music: Music,
  utensils: Utensils,
  sun: Sun,
  briefcase: Briefcase,
  party: PartyPopper,
  star: Star,
};

interface LandingBenefitsProps {
  title: string;
  items: BenefitItem[];
}

const LandingBenefits = ({ title, items }: LandingBenefitsProps) => {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-custom">
        <AnimatedReveal>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-primary text-center mb-12">
            {title}
          </h2>
        </AnimatedReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, i) => {
            const Icon = iconMap[item.icon] || Star;
            return (
              <AnimatedReveal key={item.title} delay={i * 0.1}>
                <div className="text-center p-6 rounded-xl bg-background shadow-sm">
                  <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-gold" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{item.text}</p>
                </div>
              </AnimatedReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LandingBenefits;
