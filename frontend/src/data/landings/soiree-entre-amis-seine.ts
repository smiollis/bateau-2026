import type { LandingPageData } from "./types";

export const soireeEntreAmisSeine: LandingPageData = {
  slug: "soiree-entre-amis-seine",
  meta: {
    title: "Soir\u00e9e entre amis sur la Seine \u2013 Ap\u00e9ro bateau \u00e0 Paris",
    description:
      "Organisez une soir\u00e9e entre amis sur la Seine. Bateau privatis\u00e9 jusqu\u2019\u00e0 12 personnes, ap\u00e9ro libre, playlist perso. 2h de croisi\u00e8re d\u00e8s 360\u00a0\u20ac.",
    ogImage: "/images/landings/entre-amis-seine-og.jpg",
  },
  hero: {
    title: "Soir\u00e9e entre amis sur la Seine",
    subtitle:
      "Un ap\u00e9ro flottant au c\u0153ur de Paris, entre potes et sans prise de t\u00eate",
    backgroundImage: "/images/gallery/2025-04-08-a-22.20.47_261af646.webp",
    cta: { text: "R\u00e9server votre soir\u00e9e", href: "/reservation?occasion=amis" },
  },
  sections: [
    {
      type: "richtext",
      title: "Une sortie entre amis originale \u00e0 Paris",
      content: `<p>Envie d\u2019une <strong>sortie entre amis originale \u00e0 Paris</strong> ? Oubliez les bars bond\u00e9s et les terrasses bruyantes : embarquez sur la Seine pour un ap\u00e9ro flottant \u00e0 bord du Senang, un bateau de 12 m\u00e8tres enti\u00e8rement privatis\u00e9 pour votre groupe.</p>

<p>Pendant <strong>2 heures de croisi\u00e8re</strong>, profitez de Paris comme jamais : la Tour Eiffel au coucher du soleil, Notre-Dame illumin\u00e9e, le Pont Alexandre III en toile de fond\u2026 Le tout avec vos potes, vos boissons et votre musique.</p>

<p>Le concept est simple : le bateau est <strong>100\u00a0% privatis\u00e9 pour votre groupe</strong> de 2 \u00e0 12 personnes. Vous amenez ce que vous voulez : bi\u00e8res, vin, pizza, pique-nique, g\u00e2teau\u2026 C\u2019est votre soir\u00e9e, z\u00e9ro contrainte. Branchez votre playlist sur l\u2019enceinte Bluetooth et c\u2019est parti.</p>

<p>La <strong>formule simple \u00e0 360\u00a0\u20ac</strong> (pour 1 \u00e0 6 personnes) est l\u2019option la plus accessible pour un afterwork entre coll\u00e8gues, un ap\u00e9ro entre copains ou une sortie d\u00e9contract\u00e9e. Envie de champagne ? La formule festive \u00e0 420\u00a0\u20ac inclut une coupe par personne.</p>

<p>Le d\u00e9part se fait au <strong>Port de l\u2019Arsenal \u00e0 Bastille</strong>, en plein Paris. Apr\u00e8s la croisi\u00e8re, vous \u00eates \u00e0 deux pas des bars et restaurants du quartier pour continuer la soir\u00e9e si l\u2019envie vous prend.</p>

<p>Le Senang a accueilli la d\u00e9l\u00e9gation de Mauritanie pendant les <strong>JO de Paris 2024</strong> et a servi de plateau de tournage pour Adidas et Le Slip Fran\u00e7ais. Un cadre class\u00e9 pour une soir\u00e9e d\u00e9contract\u00e9e entre amis.</p>`,
    },
    {
      type: "benefits",
      title: "Pourquoi choisir un bateau pour votre soir\u00e9e entre amis ?",
      items: [
        {
          icon: "users",
          title: "Votre groupe, votre bateau",
          text: "Privatis\u00e9 de 2 \u00e0 12 personnes. Pas de touristes, pas de voisins.",
        },
        {
          icon: "beer",
          title: "Ap\u00e9ro libre",
          text: "Amenez boissons et nourriture. Z\u00e9ro contrainte, z\u00e9ro suppl\u00e9ment.",
        },
        {
          icon: "music",
          title: "Ambiance musicale",
          text: "Enceinte Bluetooth fournie. Votre playlist, votre ambiance.",
        },
        {
          icon: "wallet",
          title: "D\u00e8s 60\u00a0\u20ac/pers.",
          text: "360\u00a0\u20ac pour 6 personnes = 60\u00a0\u20ac chacun. Imbattable \u00e0 Paris.",
        },
      ],
    },
    {
      type: "gallery",
      title: "Soir\u00e9es entre amis sur la Seine",
      images: [
        {
          src: "/images/gallery/2025-04-08-a-22.20.47_261af646.webp",
          alt: "Groupe d\u2019amis profitant d\u2019une croisi\u00e8re sur la Seine",
        },
        {
          src: "/images/gallery/2025-04-08-a-20.58.14_0b6ddf22.webp",
          alt: "Ap\u00e9ro entre amis sur le bateau Senang",
        },
        {
          src: "/images/gallery/2025-04-08-a-22.20.42_88a4983b.webp",
          alt: "Ambiance festive entre amis sur la Seine",
        },
        {
          src: "/images/gallery/2025-04-04-a-17.33.30_ea0b05c2.webp",
          alt: "Navigation entre amis au c\u0153ur de Paris",
        },
      ],
    },
    {
      type: "testimonials",
      title: "Ils ont pass\u00e9 une soir\u00e9e m\u00e9morable",
      filter: "amis",
    },
    {
      type: "pricing",
      title: "Nos formules pour votre soir\u00e9e entre amis",
    },
    {
      type: "faq",
      title: "Questions fr\u00e9quentes \u2013 Soir\u00e9e entre amis",
      items: [
        {
          question: "Peut-on apporter nos propres boissons et nourriture ?",
          answer:
            "Oui, c\u2019est le principe ! Amenez bi\u00e8res, vin, chips, pizza, pique-nique\u2026 Tout ce qui vous fait plaisir. Nous proposons aussi des planches ap\u00e9ritives sur commande.",
        },
        {
          question: "Combien \u00e7a co\u00fbte par personne ?",
          answer:
            "La formule simple \u00e0 360\u00a0\u20ac couvre jusqu\u2019\u00e0 6 personnes, soit 60\u00a0\u20ac par personne. Au-del\u00e0, c\u2019est 100\u00a0\u20ac par personne suppl\u00e9mentaire (max 12).",
        },
        {
          question: "Peut-on r\u00e9server pour un afterwork ?",
          answer:
            "Absolument ! Un cr\u00e9neau en semaine en fin de journ\u00e9e (18h-20h) est parfait pour un afterwork original. Le d\u00e9part \u00e0 Bastille est id\u00e9al apr\u00e8s le travail.",
        },
        {
          question: "Y a-t-il une limite de bruit ou d\u2019horaire ?",
          answer:
            "Nous naviguons g\u00e9n\u00e9ralement entre 10h et 22h30. La musique via l\u2019enceinte Bluetooth est autoris\u00e9e \u00e0 volume raisonnable. Nous vous demandons le respect des riverains.",
        },
        {
          question: "Que se passe-t-il en cas de pluie ?",
          answer:
            "Le Senang dispose d\u2019un auvent de protection. En cas de m\u00e9t\u00e9o vraiment d\u00e9favorable, nous vous proposons un report gratuit \u00e0 une date de votre choix.",
        },
      ],
    },
  ],
  relatedPages: ["anniversaire-seine", "apero-bateau-seine", "evg-seine"],
  jsonLd: {
    type: "TouristAttraction",
    priceFrom: 360,
  },
};
