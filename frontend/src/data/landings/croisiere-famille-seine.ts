import type { LandingPageData } from "./types";

export const croisiereFamilleSeine: LandingPageData = {
  slug: "croisiere-famille-seine",
  meta: {
    title: "Croisi\u00e8re en famille sur la Seine \u2013 Bateau priv\u00e9 \u00e0 Paris",
    description:
      "Offrez \u00e0 votre famille une croisi\u00e8re priv\u00e9e sur la Seine. Enfants bienvenus, bateau s\u00e9curis\u00e9, 2h de navigation entre Tour Eiffel et Notre-Dame.",
  },
  hero: {
    title: "Croisi\u00e8re en famille sur la Seine",
    subtitle:
      "Un moment de partage interg\u00e9n\u00e9rationnel \u00e0 bord d\u2019un bateau priv\u00e9",
    backgroundImage: "/images/gallery/2025-04-08-a-20.58.31_fcc03538.webp",
    cta: { text: "R\u00e9server en famille", href: "/reservation?occasion=famille" },
  },
  sections: [
    {
      type: "richtext",
      title: "Paris en famille depuis la Seine",
      content: `<p>Offrez \u00e0 vos proches un souvenir inoubliable : une <strong>croisi\u00e8re en famille sur la Seine</strong> \u00e0 bord du Senang. Ce bateau de 12 m\u00e8tres, s\u00e9curis\u00e9 et intimiste, est privatis\u00e9 rien que pour votre famille \u2014 de 2 \u00e0 12 personnes, des grands-parents aux petits-enfants.</p>

<p>Pendant <strong>2 heures</strong>, d\u00e9couvrez les monuments de Paris d\u2019un point de vue unique : la Tour Eiffel, Notre-Dame de Paris, le Louvre, les ponts historiques\u2026 Les enfants adorent naviguer et voir Paris depuis l\u2019eau. C\u2019est aussi une occasion parfaite de transmettre l\u2019histoire de la capitale.</p>

<p>Le Senang est \u00e9quip\u00e9 de <strong>gilets de sauvetage pour adultes et enfants</strong>. Le Capitaine Michel veille \u00e0 la s\u00e9curit\u00e9 de tous pendant que vous profitez du paysage. Les enfants de moins de 3 ans sont gratuits.</p>

<p>Vous \u00eates libres d\u2019amener un <strong>pique-nique familial</strong>, un g\u00e2teau d\u2019anniversaire ou des go\u00fbters pour les enfants. La formule festive inclut une coupe de champagne pour les adultes \u2014 parfait pour trinquer en famille.</p>

<p>Id\u00e9al pour une <strong>r\u00e9union de famille</strong>, un anniversaire, les vacances scolaires ou tout simplement un dimanche en famille. D\u00e9part du Port de l\u2019Arsenal \u00e0 Bastille, facilement accessible en m\u00e9tro et poussette.</p>`,
    },
    {
      type: "benefits",
      title: "Pourquoi choisir une croisi\u00e8re en famille ?",
      items: [
        { icon: "shield", title: "S\u00e9curit\u00e9 enfants", text: "Gilets de sauvetage adapt\u00e9s, bateau stable et s\u00e9curis\u00e9." },
        { icon: "users", title: "3 g\u00e9n\u00e9rations", text: "De 2 \u00e0 12 personnes, des petits-enfants aux grands-parents." },
        { icon: "utensils", title: "Pique-nique libre", text: "Amenez go\u00fbters, g\u00e2teau et boissons pour toute la famille." },
        { icon: "baby", title: "Enfants gratuits", text: "Gratuit pour les moins de 3 ans. Poussette bienvenue au port." },
      ],
    },
    {
      type: "gallery",
      title: "Familles sur la Seine",
      images: [
        { src: "/images/gallery/2025-04-08-a-20.58.31_fcc03538.webp", alt: "Famille profitant d\u2019une croisi\u00e8re sur la Seine" },
        { src: "/images/gallery/2025-04-08-a-21.50.25_ac11bce0.webp", alt: "Moments de convivialit\u00e9 en famille \u00e0 bord" },
        { src: "/images/gallery/2025-03-03-a-16.00.24_c635ba48.webp", alt: "Vue sur les ponts de Paris depuis le bateau" },
        { src: "/images/gallery/2025-07-27-a-12.22.05_77ed38c8.webp", alt: "Navigation familiale au c\u0153ur de Paris" },
      ],
    },
    { type: "testimonials", title: "Familles satisfaites", filter: "famille" },
    { type: "pricing", title: "Nos formules famille" },
    {
      type: "faq",
      title: "Questions fr\u00e9quentes \u2013 Croisi\u00e8re en famille",
      items: [
        { question: "Les enfants sont-ils en s\u00e9curit\u00e9 \u00e0 bord ?", answer: "Oui, le Senang est \u00e9quip\u00e9 de gilets de sauvetage adultes et enfants. Le bateau est stable et le capitaine veille \u00e0 la s\u00e9curit\u00e9 de tous." },
        { question: "\u00c0 partir de quel \u00e2ge peut-on embarquer ?", answer: "Il n\u2019y a pas d\u2019\u00e2ge minimum. Les b\u00e9b\u00e9s et jeunes enfants sont les bienvenus. Les enfants de moins de 3 ans sont gratuits." },
        { question: "Peut-on amener une poussette ?", answer: "Oui, le Port de l\u2019Arsenal est accessible en poussette. La poussette peut rester sur le quai pendant la croisi\u00e8re." },
        { question: "Combien de personnes maximum ?", answer: "Le Senang accueille jusqu\u2019\u00e0 12 personnes (enfants compris). Tarif de base pour 1 \u00e0 6 personnes, +100\u00a0\u20ac par personne au-del\u00e0." },
        { question: "Peut-on amener de la nourriture pour les enfants ?", answer: "Absolument ! Go\u00fbters, biberon, g\u00e2teau\u2026 Amenez tout ce qu\u2019il faut. Nous avons une petite table \u00e0 bord." },
      ],
    },
  ],
  relatedPages: ["anniversaire-seine", "croisiere-romantique-seine", "coucher-soleil-seine"],
  jsonLd: { type: "TouristAttraction", priceFrom: 480 },
};
