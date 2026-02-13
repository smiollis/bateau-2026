import type { LandingPageData } from "./types";

export const aperoBateauSeine: LandingPageData = {
  slug: "apero-bateau-seine",
  meta: {
    title: "Ap\u00e9ritif sur un bateau sur la Seine \u2013 Ap\u00e9ro priv\u00e9 \u00e0 Paris",
    description:
      "Organisez un ap\u00e9ro sur la Seine \u00e0 bord d\u2019un bateau priv\u00e9. BYO (amenez vos boissons), 2h de croisi\u00e8re, 2 \u00e0 12 personnes. D\u00e8s 60\u00a0\u20ac/pers.",
  },
  hero: {
    title: "Ap\u00e9ritif sur un bateau sur la Seine",
    subtitle:
      "L\u2019ap\u00e9ro le plus cool de Paris \u2014 sur l\u2019eau, entre potes",
    backgroundImage: "/images/gallery/2025-04-08-a-20.58.14_0b6ddf22.webp",
    cta: { text: "R\u00e9server votre ap\u00e9ro", href: "/reservation?occasion=apero" },
  },
  sections: [
    {
      type: "richtext",
      title: "Le meilleur ap\u00e9ro de Paris",
      content: `<p>Pourquoi prendre l\u2019ap\u00e9ro dans un bar quand on peut le prendre <strong>sur la Seine</strong> ? Le Senang vous offre le concept le plus simple et le plus g\u00e9nial de Paris : un bateau de 12 m\u00e8tres privatis\u00e9, vos boissons, vos amis, et 2 heures de navigation au c\u0153ur de la capitale.</p>

<p>Le concept est <strong>BYO (Bring Your Own)</strong> : amenez bi\u00e8res, vin, ros\u00e9, cocktails, chips, saucisson, pizza\u2026 Tout ce que vous voulez. Z\u00e9ro suppl\u00e9ment, z\u00e9ro contrainte. C\u2019est votre ap\u00e9ro, votre ambiance. Branchez votre playlist sur l\u2019enceinte Bluetooth et c\u2019est parti.</p>

<p>\u00c0 <strong>360\u00a0\u20ac pour 6 personnes</strong> (soit 60\u00a0\u20ac chacun), c\u2019est l\u2019activit\u00e9 la plus accessible de Paris pour un moment vraiment original. Afterwork entre coll\u00e8gues, ap\u00e9ro d\u2019anniversaire, sortie entre potes, pr\u00e9-soir\u00e9e\u2026 Tous les pr\u00e9textes sont bons.</p>

<p>Pendant que le Capitaine Michel pilote, vous profitez du <strong>panorama parisien</strong> : Tour Eiffel, Notre-Dame, Pont Alexandre III, quais de Seine\u2026 Le tout avec un verre \u00e0 la main. Beaucoup mieux qu\u2019une terrasse bond\u00e9e.</p>

<p>D\u00e9part du <strong>Port de l\u2019Arsenal \u00e0 Bastille</strong>. Apr\u00e8s la croisi\u00e8re, vous \u00eates \u00e0 deux pas des bars du quartier pour continuer. Nous proposons aussi des <strong>planches ap\u00e9ritives</strong> sur commande si vous pr\u00e9f\u00e9rez qu\u2019on s\u2019occupe de tout.</p>`,
    },
    {
      type: "benefits",
      title: "Pourquoi un ap\u00e9ro sur la Seine ?",
      items: [
        { icon: "beer", title: "BYO total", text: "Amenez toutes vos boissons et nourriture. Z\u00e9ro suppl\u00e9ment." },
        { icon: "wallet", title: "D\u00e8s 60\u00a0\u20ac/pers.", text: "360\u00a0\u20ac pour 6 = le meilleur rapport qualit\u00e9-prix de Paris." },
        { icon: "music", title: "Votre musique", text: "Enceinte Bluetooth fournie. Votre playlist, votre ambiance." },
        { icon: "mapPin", title: "D\u00e9part Bastille", text: "En plein Paris. Continuez la soir\u00e9e apr\u00e8s la croisi\u00e8re." },
      ],
    },
    {
      type: "gallery",
      title: "Ap\u00e9ros sur la Seine",
      images: [
        { src: "/images/gallery/2025-04-08-a-20.58.14_0b6ddf22.webp", alt: "Ap\u00e9ritif entre amis sur la Seine" },
        { src: "/images/gallery/2025-04-08-a-22.20.42_88a4983b.webp", alt: "Ambiance ap\u00e9ro d\u00e9contract\u00e9e \u00e0 bord" },
        { src: "/images/gallery/2025-04-08-a-22.20.47_261af646.webp", alt: "Groupe profitant de l\u2019ap\u00e9ro sur le Senang" },
        { src: "/images/gallery/2025-04-04-a-17.33.30_ea0b05c2.webp", alt: "Navigation ap\u00e9ro au c\u0153ur de Paris" },
      ],
    },
    { type: "testimonials", title: "Ils ont pris l\u2019ap\u00e9ro sur la Seine", filter: "apero" },
    { type: "pricing", title: "Nos formules ap\u00e9ro" },
    {
      type: "faq",
      title: "Questions fr\u00e9quentes \u2013 Ap\u00e9ro bateau",
      items: [
        { question: "Peut-on vraiment amener tout ce qu\u2019on veut ?", answer: "Oui ! Bi\u00e8res, vin, cocktails, chips, pizza, saucisson\u2026 Tout est permis. Nous demandons juste de repartir avec vos d\u00e9chets." },
        { question: "Combien \u00e7a co\u00fbte par personne ?", answer: "360\u00a0\u20ac pour 1 \u00e0 6 personnes = 60\u00a0\u20ac/pers. pour 6 amis. Au-del\u00e0, +100\u00a0\u20ac par personne (max 12)." },
        { question: "Y a-t-il un frigo \u00e0 bord ?", answer: "Non, mais amenez une glaciere ! Le capitaine vous aide \u00e0 l\u2019installer \u00e0 bord. Conseil : pr\u00e9voyez des gla\u00e7ons pour garder le ros\u00e9 frais." },
        { question: "Peut-on r\u00e9server pour un afterwork ?", answer: "Absolument ! Le cr\u00e9neau 18h-20h en semaine est parfait. D\u00e9part Bastille, id\u00e9al apr\u00e8s le travail." },
        { question: "Proposez-vous des planches ap\u00e9ritives ?", answer: "Oui, nous proposons des planches charcuterie/fromage sur commande. Pr\u00e9venez-nous 48h \u00e0 l\u2019avance." },
      ],
    },
  ],
  relatedPages: ["soiree-entre-amis-seine", "evg-seine", "team-building-seine"],
  jsonLd: { type: "TouristAttraction", priceFrom: 360 },
};
