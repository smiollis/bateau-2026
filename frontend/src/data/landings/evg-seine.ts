import type { LandingPageData } from "./types";

export const evgSeine: LandingPageData = {
  slug: "evg-seine",
  meta: {
    title: "EVG sur la Seine \u2013 Croisi\u00e8re priv\u00e9e \u00e0 Paris",
    description:
      "Organisez un enterrement de vie de gar\u00e7on m\u00e9morable sur la Seine. Bateau privatis\u00e9 jusqu\u2019\u00e0 12 personnes, bi\u00e8res et champagne, 2h au c\u0153ur de Paris.",
    ogImage: "/images/landings/evg-seine-og.jpg",
  },
  hero: {
    title: "Enterrement de vie de gar\u00e7on sur la Seine",
    subtitle:
      "Offrez au futur mari\u00e9 une exp\u00e9rience unique et d\u00e9contract\u00e9e sur la Seine",
    backgroundImage: "/images/gallery/2025-04-08-a-22.20.42_88a4983b.webp",
    cta: { text: "R\u00e9server votre EVG", href: "/reservation?occasion=evg" },
  },
  sections: [
    {
      type: "richtext",
      title: "Un EVG original sur la Seine",
      content: `<p>Marre des EVG classiques entre bar et bo\u00eete de nuit ? Offrez au futur mari\u00e9 un <strong>enterrement de vie de gar\u00e7on sur la Seine</strong> qu\u2019il n\u2019oubliera jamais. \u00c0 bord du Senang, un bateau de 12 m\u00e8tres enti\u00e8rement privatis\u00e9, vivez une soir\u00e9e hors du commun entre potes.</p>

<p>Pendant <strong>2 heures de navigation</strong>, profitez d\u2019un panorama exceptionnel sur les plus beaux monuments de Paris : la Tour Eiffel, Notre-Dame, le Louvre, le Pont Alexandre III\u2026 Le tout avec votre propre musique, vos bi\u00e8res, vos snacks \u2014 c\u2019est votre bateau pour la soir\u00e9e.</p>

<p>Le Senang est <strong>100\u00a0% privatis\u00e9</strong> pour votre groupe de 2 \u00e0 12 personnes. Pas de touristes, pas de contraintes : vous \u00eates libres d\u2019amener votre glaciere, vos accessoires de d\u00e9guisement et tout ce qui rendra cette soir\u00e9e l\u00e9gendaire. Le Capitaine Michel g\u00e8re la navigation pendant que vous profitez.</p>

<p>Notre <strong>formule festive</strong> inclut une coupe de champagne par personne \u2014 parfait pour le toast au futur mari\u00e9. Vous pouvez \u00e9galement opter pour la formule simple et apporter vos propres boissons et nourriture. Enceinte Bluetooth \u00e0 disposition pour votre playlist EVG.</p>

<p>D\u00e9part du <strong>Port de l\u2019Arsenal \u00e0 Bastille</strong> (Paris 12\u00e8me), en plein c\u0153ur de la capitale. Apr\u00e8s la croisi\u00e8re, vous \u00eates \u00e0 deux pas de la rue de Lappe et de la vie nocturne parisienne pour continuer la f\u00eate.</p>

<p><strong>Le Senang a navigu\u00e9 pendant les JO de Paris 2024</strong> pour la d\u00e9l\u00e9gation de Mauritanie et a servi de d\u00e9cor pour des shootings Adidas et Le Slip Fran\u00e7ais. Un cadre d\u2019exception pour un EVG digne de ce nom.</p>`,
    },
    {
      type: "benefits",
      title: "Pourquoi choisir Un Bateau \u00e0 Paris pour votre EVG ?",
      items: [
        {
          icon: "ship",
          title: "Bateau 100\u00a0% privatis\u00e9",
          text: "Le Senang rien que pour votre bande, jusqu\u2019\u00e0 12 personnes.",
        },
        {
          icon: "beer",
          title: "Vos boissons \u00e0 bord",
          text: "Ramenez bi\u00e8res, champagne et snacks. C\u2019est votre soir\u00e9e.",
        },
        {
          icon: "music",
          title: "Votre playlist",
          text: "Enceinte Bluetooth \u00e0 disposition pour ambiance garantie.",
        },
        {
          icon: "mapPin",
          title: "D\u00e9part Bastille",
          text: "Continuez la soir\u00e9e rue de Lappe apr\u00e8s la croisi\u00e8re.",
        },
      ],
    },
    {
      type: "gallery",
      title: "Ambiance EVG sur la Seine",
      images: [
        {
          src: "/images/gallery/2025-04-08-a-22.20.42_88a4983b.webp",
          alt: "Groupe d\u2019amis c\u00e9l\u00e9brant un EVG sur la Seine",
        },
        {
          src: "/images/gallery/2025-04-08-a-20.58.14_0b6ddf22.webp",
          alt: "Navigation festive pour un EVG \u00e0 Paris",
        },
        {
          src: "/images/gallery/2025-04-08-a-21.50.25_ac11bce0.webp",
          alt: "Paris illumin\u00e9 pendant un EVG en bateau",
        },
        {
          src: "/images/gallery/2025-03-03-a-16.00.26_b41cf5f5.webp",
          alt: "Le Senang sous les ponts de Paris",
        },
      ],
    },
    {
      type: "testimonials",
      title: "Ils l\u2019ont v\u00e9cu",
      filter: "evg",
    },
    {
      type: "pricing",
      title: "Nos formules EVG",
    },
    {
      type: "faq",
      title: "Questions fr\u00e9quentes \u2013 EVG sur la Seine",
      items: [
        {
          question:
            "Peut-on apporter nos propres boissons pour l\u2019EVG ?",
          answer:
            "Oui ! Vous pouvez apporter bi\u00e8res, champagne, cocktails et tout ce que vous voulez. Avec la formule festive, une coupe de champagne est offerte \u00e0 chaque participant.",
        },
        {
          question: "Combien de personnes pour un EVG sur le bateau ?",
          answer:
            "Le Senang accueille de 2 \u00e0 12 personnes. Le tarif de base couvre 1 \u00e0 6 personnes, puis 100\u00a0\u20ac par personne suppl\u00e9mentaire.",
        },
        {
          question: "Peut-on brancher notre musique ?",
          answer:
            "Absolument ! Une enceinte Bluetooth est \u00e0 votre disposition. Pr\u00e9parez votre playlist EVG et mettez l\u2019ambiance.",
        },
        {
          question: "O\u00f9 se situe le point de d\u00e9part ?",
          answer:
            "D\u00e9part du Port de l\u2019Arsenal, \u00e0 c\u00f4t\u00e9 de la Place de la Bastille (Paris 12\u00e8me). M\u00e9tro Bastille (lignes 1, 5, 8).",
        },
        {
          question: "Combien co\u00fbte un EVG sur la Seine ?",
          answer:
            "\u00c0 partir de 360\u00a0\u20ac pour la formule simple (1 \u00e0 6 personnes) ou 420\u00a0\u20ac pour la formule festive avec champagne. +100\u00a0\u20ac par personne au-del\u00e0 de 6.",
        },
      ],
    },
  ],
  relatedPages: ["evjf-seine", "soiree-entre-amis-seine", "apero-bateau-seine"],
  jsonLd: {
    type: "TouristAttraction",
    priceFrom: 360,
  },
};
