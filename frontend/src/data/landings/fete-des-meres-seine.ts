import type { LandingPageData } from "./types";

export const feteDesMeresSeine: LandingPageData = {
  slug: "fete-des-meres-seine",
  meta: {
    title: "Fête des Mères sur la Seine \u2013 Croisière cadeau à Paris",
    description:
      "Offrez à votre maman une croisière privée sur la Seine pour la Fête des Mères. Champagne, Tour Eiffel, moment en famille. Dès 480\u00a0€.",
  },
  hero: {
    title: "Fête des Mères sur la Seine",
    subtitle:
      "Le plus beau cadeau pour maman \u2014 une croisière privée au cœur de Paris",
    backgroundImage: "/images/gallery/2025-04-08-a-20.58.31_fcc03538.webp",
    cta: { text: "Offrir la croisière", href: "/reservation?occasion=fete-des-meres" },
  },
  sections: [
    {
      type: "richtext",
      title: "Le cadeau parfait pour la Fête des Mères",
      content: `<p>Cette année, oubliez les fleurs et le parfum. Offrez à votre maman un <strong>moment inoubliable sur la Seine</strong>. Le Senang, bateau de 12 mètres privatisé pour votre famille, navigue 2 heures entre les plus beaux monuments de Paris.</p>

<p>Imaginez sa surprise : un <strong>bateau rien que pour elle</strong>, une coupe de champagne, la Tour Eiffel qui défile, et toute la famille réunie. C\u2019est bien plus qu\u2019un cadeau \u2014 c\u2019est un souvenir qui restera gravé.</p>

<p>La <strong>formule festive</strong> (540\u00a0€) inclut le champagne, idéale pour trinquer en famille. Vous pouvez aussi préparer un brunch flottant ou commander nos planches apéritives. Le concept BYO vous permet d\u2019apporter gâteau, boissons et tout ce que maman aime.</p>

<p>Le Senang accueille <strong>de 2 à 12 personnes</strong> : parfait pour réunir frères, sœurs, petits-enfants et grands-parents autour de maman. Les enfants sont les bienvenus et les moins de 3 ans sont gratuits.</p>

<p>Nous proposons des <strong>bons cadeaux</strong> personnalisés à offrir le jour J. Départ du Port de l\u2019Arsenal à Bastille. Réservez le créneau du coucher de soleil pour une lumière magique sur les photos de famille.</p>`,
    },
    {
      type: "benefits",
      title: "Pourquoi la Seine pour la Fête des Mères ?",
      items: [
        { icon: "gift", title: "Cadeau unique", text: "Un souvenir inoubliable, bien mieux qu\u2019un objet. Bon cadeau disponible." },
        { icon: "heart", title: "Moment en famille", text: "Réunissez toute la famille autour de maman sur la Seine." },
        { icon: "champagne", title: "Champagne inclus", text: "Formule festive avec champagne pour trinquer en famille." },
        { icon: "camera", title: "Photos souvenirs", text: "La Tour Eiffel et les ponts de Paris en toile de fond." },
      ],
    },
    {
      type: "gallery",
      title: "Fête des Mères sur la Seine",
      images: [
        { src: "/images/gallery/2025-04-08-a-20.58.31_fcc03538.webp", alt: "Famille réunie sur la Seine pour la Fête des Mères" },
        { src: "/images/gallery/2025-04-08-a-21.50.25_ac11bce0.webp", alt: "Moments de convivialité en famille à bord" },
        { src: "/images/gallery/2025-04-08-a-20.57.33_c61d5f00.webp", alt: "Coucher de soleil sur la Seine" },
        { src: "/images/gallery/2025-07-27-a-12.22.05_77ed38c8.webp", alt: "Navigation familiale au cœur de Paris" },
      ],
    },
    { type: "testimonials", title: "Elles ont adoré leur croisière", filter: "famille" },
    { type: "pricing", title: "Nos formules Fête des Mères" },
    {
      type: "faq",
      title: "Questions fréquentes \u2013 Fête des Mères",
      items: [
        { question: "Proposez-vous des bons cadeaux ?", answer: "Oui ! Nous proposons des bons cadeaux personnalisés, imprimables ou envoyés par email. Idéal pour garder la surprise jusqu\u2019au jour J." },
        { question: "Peut-on venir avec des enfants en bas âge ?", answer: "Bien sûr ! Gilets de sauvetage enfants fournis, poussette stockée au port. Les moins de 3 ans sont gratuits." },
        { question: "Peut-on apporter un gâteau ?", answer: "Absolument ! Gâteau, fleurs, cadeaux, brunch\u2026 Amenez tout ce qui fera plaisir à maman." },
        { question: "Quel créneau recommandez-vous ?", answer: "Le créneau du coucher de soleil (variable selon la saison) offre la plus belle lumière pour les photos et l\u2019ambiance la plus romantique." },
        { question: "Combien de personnes maximum ?", answer: "Le Senang accueille jusqu\u2019à 12 personnes. Tarif de base pour 1 à 6 personnes (480\u00a0€ simple), +110\u00a0€ par personne au-delà." },
      ],
    },
  ],
  relatedPages: ["croisiere-famille-seine", "anniversaire-seine", "coucher-soleil-seine"],
  jsonLd: { type: "TouristAttraction", priceFrom: 480 },
};
