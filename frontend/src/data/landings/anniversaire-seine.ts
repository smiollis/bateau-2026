import type { LandingPageData } from "./types";

export const anniversaireSeine: LandingPageData = {
  slug: "anniversaire-seine",
  meta: {
    title: "Anniversaire sur la Seine \u2013 F\u00eate priv\u00e9e en bateau \u00e0 Paris",
    description:
      "F\u00eatez votre anniversaire sur la Seine \u00e0 bord d\u2019un bateau privatis\u00e9. Jusqu\u2019\u00e0 12 invit\u00e9s, champagne, g\u00e2teau \u00e0 bord. 2h de croisi\u00e8re au c\u0153ur de Paris.",
    ogImage: "/images/landings/anniversaire-seine-og.jpg",
  },
  hero: {
    title: "F\u00eater son anniversaire sur la Seine",
    subtitle:
      "Un anniversaire inoubliable \u00e0 bord d\u2019un bateau priv\u00e9 au c\u0153ur de Paris",
    backgroundImage: "/images/gallery/2025-04-08-a-20.58.31_fcc03538.webp",
    cta: { text: "R\u00e9server votre anniversaire", href: "/reservation?occasion=anniversaire" },
  },
  sections: [
    {
      type: "richtext",
      title: "Un anniversaire original sur la Seine",
      content: `<p>Vous cherchez une id\u00e9e originale pour <strong>f\u00eater un anniversaire \u00e0 Paris</strong> ? Embarquez avec vos proches \u00e0 bord du Senang pour une croisi\u00e8re priv\u00e9e de 2 heures sur la Seine. De la Tour Eiffel \u00e0 Notre-Dame, offrez-vous un panorama exceptionnel pour souffler vos bougies.</p>

<p>Le Senang est un bateau de 12 m\u00e8tres <strong>enti\u00e8rement privatis\u00e9 pour votre groupe</strong> de 2 \u00e0 12 personnes. Pas de voisins de table, pas de bruit : c\u2019est votre f\u00eate, votre ambiance, votre moment. Vous \u00eates libres d\u2019amener votre g\u00e2teau d\u2019anniversaire, vos cadeaux et votre d\u00e9coration.</p>

<p>Avec la <strong>formule festive</strong>, chaque invit\u00e9 re\u00e7oit une coupe de champagne pour trinquer \u00e0 votre sant\u00e9. Vous pouvez \u00e9galement apporter vos propres boissons et nourriture, ou commander nos planches ap\u00e9ritives pour un ap\u00e9ro-croisi\u00e8re convivial.</p>

<p>Branchez votre playlist d\u2019anniversaire sur l\u2019<strong>enceinte Bluetooth</strong> \u00e0 disposition et laissez le Capitaine Michel naviguer pendant que vous profitez de vos invit\u00e9s. Le parcours longe les plus beaux monuments de Paris : Tour Eiffel, Mus\u00e9e d\u2019Orsay, \u00cele de la Cit\u00e9, Pont Neuf\u2026</p>

<p>Que vous f\u00eatiez vos 30, 40, 50 ans ou plus, cette <strong>croisi\u00e8re d\u2019anniversaire</strong> s\u2019adapte \u00e0 toutes les ambiances : apr\u00e8s-midi familial, soir\u00e9e entre amis, ou d\u00eener romantique \u00e0 deux. D\u00e9part du Port de l\u2019Arsenal \u00e0 Bastille (Paris 12\u00e8me).</p>

<p>Le Senang, <strong>v\u00e9t\u00e9ran des JO de Paris 2024</strong> et plateau de tournage pour Adidas, offre un cadre d\u2019exception pour c\u00e9l\u00e9brer avec style. Un anniversaire que vos invit\u00e9s n\u2019oublieront pas de sit\u00f4t.</p>`,
    },
    {
      type: "benefits",
      title: "Pourquoi f\u00eater son anniversaire sur la Seine ?",
      items: [
        {
          icon: "cake",
          title: "G\u00e2teau \u00e0 bord",
          text: "Amenez votre g\u00e2teau d\u2019anniversaire et soufflez vos bougies face \u00e0 Paris.",
        },
        {
          icon: "users",
          title: "Jusqu\u2019\u00e0 12 invit\u00e9s",
          text: "Le bateau est privatis\u00e9 pour votre groupe, ambiance intimiste garantie.",
        },
        {
          icon: "champagne",
          title: "Champagne offert",
          text: "Une coupe par personne avec la formule festive pour trinquer.",
        },
        {
          icon: "music",
          title: "Votre playlist",
          text: "Enceinte Bluetooth \u00e0 disposition pour l\u2019ambiance musicale.",
        },
      ],
    },
    {
      type: "gallery",
      title: "F\u00eates d\u2019anniversaire sur la Seine",
      images: [
        {
          src: "/images/gallery/2025-04-08-a-20.58.31_fcc03538.webp",
          alt: "F\u00eate d\u2019anniversaire sur la Seine \u00e0 Paris",
        },
        {
          src: "/images/gallery/2025-04-08-a-21.50.25_ac11bce0.webp",
          alt: "Groupe c\u00e9l\u00e9brant un anniversaire en bateau",
        },
        {
          src: "/images/gallery/2025-04-08-a-22.20.47_261af646.webp",
          alt: "Le Senang naviguant pour un anniversaire",
        },
        {
          src: "/images/gallery/2025-03-03-a-16.00.24_c635ba48.webp",
          alt: "Vue sur les ponts de Paris depuis le bateau",
        },
      ],
    },
    {
      type: "testimonials",
      title: "Ils ont f\u00eat\u00e9 leur anniversaire sur la Seine",
      filter: "anniversaire",
    },
    {
      type: "pricing",
      title: "Nos formules anniversaire",
    },
    {
      type: "faq",
      title: "Questions fr\u00e9quentes \u2013 Anniversaire sur la Seine",
      items: [
        {
          question: "Peut-on apporter un g\u00e2teau d\u2019anniversaire ?",
          answer:
            "Bien s\u00fbr ! Vous pouvez apporter votre g\u00e2teau, des bougies, et tout ce qu\u2019il faut pour c\u00e9l\u00e9brer. Nous avons une petite table \u00e0 bord pour l\u2019installer.",
        },
        {
          question: "Combien de personnes peuvent \u00eatre invit\u00e9es ?",
          answer:
            "Le Senang accueille jusqu\u2019\u00e0 12 personnes. Le tarif de base couvre 1 \u00e0 6 personnes, puis 100\u00a0\u20ac par personne suppl\u00e9mentaire.",
        },
        {
          question: "Les enfants sont-ils accept\u00e9s \u00e0 bord ?",
          answer:
            "Oui, les enfants sont les bienvenus. Des gilets de sauvetage adapt\u00e9s sont disponibles \u00e0 bord. Les enfants de moins de 3 ans sont gratuits.",
        },
        {
          question: "Peut-on amener de la d\u00e9coration ?",
          answer:
            "Absolument ! Ballons, banderoles, guirlandes\u2026 Vous \u00eates libres de d\u00e9corer le bateau pour l\u2019occasion. Nous vous demandons juste de ne pas utiliser de confettis.",
        },
        {
          question: "Combien co\u00fbte un anniversaire sur la Seine ?",
          answer:
            "\u00c0 partir de 360\u00a0\u20ac (formule simple) ou 420\u00a0\u20ac (formule festive avec champagne) pour un groupe jusqu\u2019\u00e0 6 personnes. +100\u00a0\u20ac par personne au-del\u00e0.",
        },
      ],
    },
  ],
  relatedPages: ["soiree-entre-amis-seine", "croisiere-famille-seine", "apero-bateau-seine"],
  jsonLd: {
    type: "TouristAttraction",
    priceFrom: 480,
  },
};
