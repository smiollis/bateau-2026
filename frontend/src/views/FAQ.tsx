"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useThemeVariant } from "@/contexts/ThemeVariantContext";
import HeaderVariants from "@/components/HeaderVariants";
import FooterVariants from "@/components/FooterVariants";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems: { question: string; answer: string | React.ReactNode }[] = [
  {
    question: "Quels types d&apos;événements puis-je organiser à bord du Senang ?",
    answer:
      "Un Bateau à Paris offre des croisières privées sur la Seine pour diverses occasions telles que des soirées romantiques, des sorties en famille, des réunions entre amis ou entre collègues et de nombreux événements professionnels. Que ce soit pour un anniversaire, un enterrement de vie de jeune fille, des photos de mariage devant la Tour Eiffel, Notre-Dame, la Conciergerie, le Louvre ou la Statue de la Liberté, nous nous efforçons de vous offrir une expérience inoubliable.",
  },
  {
    question: "Comment puis-je réserver une croisière avec Un Bateau à Paris ?",
    answer:
      "Vous pouvez facilement réserver votre croisière en ligne. Choisissez la date, précisez le nombre de passagers, l&apos;heure de départ souhaitée et la formule qui correspondent à vos préférences, puis validez votre réservation.",
  },
  {
    question: "Comment se passe l&apos;embarquement ?",
    answer:
      "Pour que vous profitiez pleinement de votre croisière privée sur la Seine, nous vous donnons rendez-vous 15 minutes avant l&apos;heure du départ au Port de l&apos;Arsenal à Bastille (Paris 12ème).",
  },
  {
    question: "Combien ça coûte ?",
    answer:
      "Le bateau est exclusivement réservé pour votre soirée romantique, vos retrouvailles entre amis, votre célébration d&apos;anniversaire, votre sortie en famille ou votre événement professionnel. Le coût de la privatisation du bateau est fixe pour 1 à 6 passagers (600 €), puis augmente à 100 € par personne au-delà de 6. Consultez notre section « Tarifs » pour plus de détails.",
  },
  {
    question: "Comment se déroule le paiement ?",
    answer:
      "Le paiement s&apos;effectue en ligne lors de la réservation de manière complètement sécurisée par l&apos;intermédiaire de PayPal. Nous acceptons les principales cartes de crédit (American Express, MasterCard, Visa). Pour des arrangements spécifiques ou des événements sur mesure, contactez notre équipe pour discuter des modalités.",
  },
  {
    question: "Quelle est la politique d&apos;annulation ?",
    answer: (<>Consultez notre page « <Link href="/cgv" className="text-accent font-semibold hover:underline">Conditions Générales de Vente</Link> » pour connaître notre politique d&apos;annulation détaillée. En cas d&apos;annulation, nous favorisons dans la mesure du possible la modification. Contactez-nous dès que possible pour discuter des options disponibles.</>),
  },
  {
    question: "Y a-t-il des restrictions liées à la météo ?",
    answer:
      "Les croisières privées sur la Seine sont généralement maintenues par tous les temps. En cas de conditions météorologiques extrêmes, nous vous contacterons pour discuter des options disponibles, y compris la possibilité de reporter ou de modifier votre croisière.",
  },
  {
    question: "Le bateau est-il accessible aux personnes handicapées ?",
    answer:
      "L&apos;embarquement des passagers se fait avec l&apos;assistance du Capitaine et peut présenter quelques difficultés aux personnes à mobilité réduite. Nous nous efforçons d&apos;accueillir tout le monde mais ne pouvons pas garantir que l&apos;embarquement sera possible pour les personnes handicapées qui ne disposent pas d&apos;une aide appropriée.",
  },
  {
    question: "Vous acceptez les enfants ?",
    answer:
      "Les enfants de tous âges sont évidemment les bienvenus à bord, sous la supervision des adultes les accompagnant tout au long de la croisière. Nous vous prions de respecter un ratio d&apos;un adulte pour deux enfants de moins de 11 ans lors des déplacements de l&apos;avant à l&apos;arrière du bateau.",
  },
  {
    question: "Les animaux sont-ils admis ?",
    answer:
      "Malheureusement, nos croisières ne sont pas adaptées aux compagnons à poils. Nous voulons nous assurer que tous nos passagers profitent d&apos;une expérience confortable et sécurisée, et c&apos;est pourquoi nous ne pouvons pas accueillir d&apos;animaux à bord. Nous espérons que vous comprendrez.",
  },
];

const FAQ = () => {
  const { isDark } = useThemeVariant();

  return (
    <div className="min-h-screen bg-background">
      <HeaderVariants />
      <main className="pt-24 pb-16">
        <div className="container-custom max-w-4xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l&apos;accueil
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-heading text-4xl md:text-5xl font-semibold text-primary mb-4">
              Foire Aux Questions
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mb-4">
              Bienvenue dans notre section FAQ dédiée à votre expérience exceptionnelle de croisière privée sur la Seine.
            </p>
            <p className="text-muted-foreground mb-12 max-w-2xl">
              Chez nous, chaque moment compte, c&apos;est pourquoi nous nous efforçons de personnaliser votre voyage en répondant à toutes vos questions dès le départ. Explorez ci-dessous les réponses aux questions fréquemment posées.
            </p>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="border border-border rounded-xl px-6 bg-card"
                >
                  <AccordionTrigger className="text-left font-heading text-base md:text-lg font-medium text-primary hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={`mt-12 p-8 rounded-2xl text-center ${isDark ? "bg-white/5" : "bg-primary/5"}`}
          >
            <p className="text-foreground/80 mb-2">
              Pour toute <strong>question supplémentaire</strong> ou des <strong>demandes spécifiques</strong>, n&apos;hésitez pas à <Link href="/#contact" className="text-accent font-semibold hover:underline">nous contacter</Link>.
            </p>
            <p className="text-muted-foreground text-sm">
              Nous sommes ravis de rendre votre expérience avec Un Bateau à Paris aussi exceptionnelle que possible.
            </p>
          </motion.div>
        </div>
      </main>
      <FooterVariants />
    </div>
  );
};

export default FAQ;
