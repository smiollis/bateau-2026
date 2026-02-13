import type { LandingPageData } from "./types";

export const demandeEnMariageSeine: LandingPageData = {
  slug: "demande-en-mariage-seine",
  meta: {
    title: "Demande en mariage sur la Seine \u2013 Surprise priv\u00e9e \u00e0 Paris",
    description:
      "Organisez une demande en mariage inoubliable sur la Seine. Bateau priv\u00e9, champagne, d\u00e9cor f\u00e9erique face \u00e0 la Tour Eiffel. Aide \u00e0 l\u2019organisation incluse.",
    ogImage: "/images/landings/demande-mariage-og.jpg",
  },
  hero: {
    title: "Demande en mariage sur la Seine",
    subtitle:
      "Le plus beau \u00ab\u00a0oui\u00a0\u00bb de votre vie, face \u00e0 la Tour Eiffel",
    backgroundImage: "/images/gallery/2025-03-02-a-21.18.40_52501437.webp",
    cta: { text: "Organiser votre demande", href: "/reservation?occasion=mariage" },
  },
  sections: [
    {
      type: "richtext",
      title: "Une demande en mariage originale \u00e0 Paris",
      content: `<p>Vous r\u00eavez d\u2019une <strong>demande en mariage originale \u00e0 Paris</strong> ? Imaginez la sc\u00e8ne : vous \u00eates \u00e0 bord d\u2019un bateau priv\u00e9 sur la Seine, le soleil se couche derri\u00e8re la Tour Eiffel, et vous posez le genou \u00e0 terre\u2026 Un moment hors du temps que votre partenaire n\u2019oubliera jamais.</p>

<p>Le Senang est le cadre id\u00e9al pour une <strong>demande en mariage sur la Seine</strong>. Ce bateau de 12 m\u00e8tres, \u00e9l\u00e9gant et intimiste, est enti\u00e8rement privatis\u00e9 pour vous. Pas de regard ext\u00e9rieur, pas de touristes : juste vous, votre moiti\u00e9, et les plus beaux monuments de Paris en toile de fond.</p>

<p>Nous vous aidons \u00e0 <strong>organiser la surprise</strong>. Contactez-nous en amont pour pr\u00e9parer le moment parfait : p\u00e9tales de rose, bouquet de fleurs, playlist sp\u00e9ciale, photographe discret\u2026 Le Capitaine Michel est habitu\u00e9 \u00e0 ces moments d\u2019\u00e9motion et sait cr\u00e9er les conditions id\u00e9ales.</p>

<p>La <strong>formule festive</strong> inclut une coupe de champagne pour c\u00e9l\u00e9brer le \u00ab\u00a0oui\u00a0\u00bb. Vous pouvez aussi apporter votre propre champagne, un g\u00e2teau ou un repas pour transformer la croisi\u00e8re en d\u00eener romantique sur l\u2019eau.</p>

<p>Le moment le plus magique ? Quand le bateau passe devant la Tour Eiffel \u00e0 la tomb\u00e9e de la nuit et que les <strong>lumi\u00e8res scintillantes</strong> s\u2019allument. C\u2019est l\u2019instant que choisissent la plupart de nos couples pour poser la grande question.</p>

<p>D\u00e9part du <strong>Port de l\u2019Arsenal \u00e0 Bastille</strong>. Facile \u00e0 organiser comme une \u00ab\u00a0simple balade sur la Seine\u00a0\u00bb pour garder la surprise. Le Senang, qui a navigu\u00e9 pour les <strong>JO de Paris 2024</strong>, offre un cadre d\u2019exception pour le plus beau jour de votre vie.</p>`,
    },
    {
      type: "benefits",
      title: "Pourquoi demander en mariage sur la Seine ?",
      items: [
        {
          icon: "heart",
          title: "Cadre f\u00e9erique",
          text: "La Tour Eiffel illumin\u00e9e en toile de fond pour le grand moment.",
        },
        {
          icon: "eyeOff",
          title: "Surprise garantie",
          text: "Nous vous aidons \u00e0 organiser la surprise en toute discrr\u00e9tion.",
        },
        {
          icon: "camera",
          title: "Photographe en option",
          text: "Immortalisez le moment avec un photographe discret \u00e0 bord.",
        },
        {
          icon: "sparkles",
          title: "D\u00e9coration sur-mesure",
          text: "P\u00e9tales, bougies, fleurs\u2026 Nous pr\u00e9parons tout pour vous.",
        },
      ],
    },
    {
      type: "gallery",
      title: "Des demandes en mariage de r\u00eave",
      images: [
        {
          src: "/images/gallery/2025-03-02-a-21.18.40_52501437.webp",
          alt: "Demande en mariage au coucher du soleil sur la Seine",
        },
        {
          src: "/images/gallery/2025-04-08-a-20.57.33_c61d5f00.webp",
          alt: "Croisi\u00e8re romantique pour une demande en mariage \u00e0 Paris",
        },
        {
          src: "/images/gallery/2025-04-15-a-22.21.11_0329a51a.webp",
          alt: "Ambiance intimiste \u00e0 bord du Senang",
        },
        {
          src: "/images/gallery/2025-04-08-a-21.50.25_ac11bce0.webp",
          alt: "Paris illumin\u00e9 depuis le Senang",
        },
      ],
    },
    {
      type: "testimonials",
      title: "Ils ont dit oui sur la Seine",
      filter: "mariage",
    },
    {
      type: "pricing",
      title: "Nos formules pour votre demande en mariage",
    },
    {
      type: "faq",
      title: "Questions fr\u00e9quentes \u2013 Demande en mariage",
      items: [
        {
          question: "Comment organiser la surprise sans que mon/ma partenaire le sache ?",
          answer:
            "Pr\u00e9sentez la sortie comme une simple balade sur la Seine. Contactez-nous en amont pour coordonner les d\u00e9tails (d\u00e9coration, timing, photographe) sans que votre partenaire ne se doute de rien.",
        },
        {
          question: "Peut-on avoir un photographe \u00e0 bord ?",
          answer:
            "Oui ! Vous pouvez inviter un photographe professionnel \u00e0 bord pour capturer le moment. Contactez-nous et nous vous aiderons \u00e0 organiser sa pr\u00e9sence discr\u00e8te.",
        },
        {
          question: "Quel est le meilleur moment pour la demande ?",
          answer:
            "Le cr\u00e9neau au coucher du soleil est le plus romantique. Le passage devant la Tour Eiffel illumin\u00e9e (en soir\u00e9e) est le moment le plus populaire pour poser la question.",
        },
        {
          question: "Peut-on personnaliser la d\u00e9coration du bateau ?",
          answer:
            "Absolument ! P\u00e9tales de rose, bougies LED, ballons, banderole\u2026 Vous pouvez apporter votre d\u00e9coration ou nous confier la pr\u00e9paration via notre formule Tout Inclus.",
        },
        {
          question: "Combien co\u00fbte une demande en mariage sur la Seine ?",
          answer:
            "\u00c0 partir de 420\u00a0\u20ac pour la formule festive (champagne inclus). La formule Tout Inclus avec d\u00e9coration et traiteur est disponible sur devis.",
        },
      ],
    },
  ],
  relatedPages: ["croisiere-romantique-seine", "anniversaire-mariage-seine", "coucher-soleil-seine"],
  jsonLd: {
    type: "TouristAttraction",
    priceFrom: 420,
  },
};
