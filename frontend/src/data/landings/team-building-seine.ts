import type { LandingPageData } from "./types";

export const teamBuildingSeine: LandingPageData = {
  slug: "team-building-seine",
  meta: {
    title: "Team building sur la Seine \u2013 Sortie entreprise \u00e0 Paris",
    description:
      "Organisez un team building original sur la Seine. Bateau privatis\u00e9 pour 2 \u00e0 12 collaborateurs, ap\u00e9ritif, 2h de croisi\u00e8re. Facture entreprise disponible.",
  },
  hero: {
    title: "Team building sur la Seine",
    subtitle:
      "Renforcez la coh\u00e9sion de votre \u00e9quipe lors d\u2019une croisi\u00e8re priv\u00e9e au c\u0153ur de Paris",
    backgroundImage: "/images/gallery/2025-04-08-a-22.20.47_261af646.webp",
    cta: { text: "R\u00e9server votre team building", href: "/reservation?occasion=team-building" },
  },
  sections: [
    {
      type: "richtext",
      title: "Un team building hors du commun",
      content: `<p>Vous cherchez une <strong>sortie d\u2019entreprise originale \u00e0 Paris</strong> ? Oubliez les escape games et les bowling : embarquez votre \u00e9quipe sur la Seine pour un team building dont tout le monde parlera. Le Senang, bateau de 12 m\u00e8tres privatis\u00e9, offre un cadre unique pour renforcer les liens entre collaborateurs.</p>

<p>Pendant <strong>2 heures de croisi\u00e8re</strong>, votre \u00e9quipe de 2 \u00e0 12 personnes profite d\u2019un panorama exceptionnel : Tour Eiffel, Notre-Dame, Mus\u00e9e d\u2019Orsay\u2026 Loin des murs du bureau, les conversations se lib\u00e8rent et les id\u00e9es fusent. Id\u00e9al pour un afterwork, un d\u00e9part \u00e0 la retraite ou la c\u00e9l\u00e9bration d\u2019un succ\u00e8s d\u2019\u00e9quipe.</p>

<p>Formule souple : <strong>ap\u00e9ritif libre \u00e0 bord</strong> (amenez vos boissons et plateaux-repas) ou optez pour la formule festive avec champagne inclus. Enceinte Bluetooth \u00e0 disposition pour la musique d\u2019ambiance.</p>

<p><strong>Facturation entreprise</strong> disponible sur demande. Nous \u00e9mettons une facture conforme permettant le passage en frais professionnels. Contactez-nous pour un devis personnalis\u00e9 si vous souhaitez la formule Tout Inclus avec traiteur.</p>

<p>D\u00e9part du <strong>Port de l\u2019Arsenal \u00e0 Bastille</strong>, facilement accessible en m\u00e9tro. Le Senang, <strong>v\u00e9t\u00e9ran des JO de Paris 2024</strong> et plateau de tournage Adidas, impressionnera vos collaborateurs.</p>`,
    },
    {
      type: "benefits",
      title: "Pourquoi un team building sur la Seine ?",
      items: [
        { icon: "briefcase", title: "Facture entreprise", text: "Facturation professionnelle disponible. Passage en frais d\u2019entreprise." },
        { icon: "users", title: "Jusqu\u2019\u00e0 12 personnes", text: "Format id\u00e9al pour une \u00e9quipe proche. Ambiance conviviale garantie." },
        { icon: "utensils", title: "Traiteur possible", text: "Formule Tout Inclus avec planches, buffet ou traiteur sur devis." },
        { icon: "mapPin", title: "D\u00e9part Bastille", text: "Facilement accessible en m\u00e9tro. Afterwork possible apr\u00e8s la croisi\u00e8re." },
      ],
    },
    {
      type: "gallery",
      title: "Team buildings sur la Seine",
      images: [
        { src: "/images/gallery/2025-04-08-a-22.20.47_261af646.webp", alt: "\u00c9quipe en team building sur la Seine" },
        { src: "/images/gallery/2025-04-08-a-20.58.14_0b6ddf22.webp", alt: "Croisi\u00e8re d\u2019entreprise \u00e0 Paris" },
        { src: "/images/gallery/2025-03-03-a-16.00.26_b41cf5f5.webp", alt: "Le Senang sous les ponts de Paris" },
        { src: "/images/gallery/2025-04-08-a-22.20.42_88a4983b.webp", alt: "Ambiance conviviale \u00e0 bord" },
      ],
    },
    { type: "testimonials", title: "Ils ont choisi le Senang", filter: "team-building" },
    { type: "pricing", title: "Nos formules team building" },
    {
      type: "faq",
      title: "Questions fr\u00e9quentes \u2013 Team building",
      items: [
        { question: "Peut-on obtenir une facture entreprise ?", answer: "Oui, nous \u00e9mettons une facture conforme avec TVA pour le passage en frais professionnels. Contactez-nous par email." },
        { question: "Quel format pour un afterwork ?", answer: "Le cr\u00e9neau 18h-20h en semaine est id\u00e9al. Formule simple \u00e0 360\u00a0\u20ac ou festive \u00e0 420\u00a0\u20ac, votre \u00e9quipe am\u00e8ne l\u2019ap\u00e9ro." },
        { question: "Peut-on organiser des activit\u00e9s \u00e0 bord ?", answer: "Le bateau est id\u00e9al pour des discussions informelles, un brainstorming ou un quiz d\u2019\u00e9quipe. L\u2019espace est ouvert et convivial." },
        { question: "Combien de collaborateurs maximum ?", answer: "Le Senang accueille jusqu\u2019\u00e0 12 personnes. Pour des groupes plus importants, contactez-nous pour \u00e9tudier une solution." },
        { question: "Quel est le tarif ?", answer: "\u00c0 partir de 360\u00a0\u20ac pour 1 \u00e0 6 personnes, +100\u00a0\u20ac par personne au-del\u00e0. Formule Tout Inclus avec traiteur sur devis." },
      ],
    },
  ],
  relatedPages: ["seminaire-seine", "apero-bateau-seine", "soiree-entre-amis-seine"],
  jsonLd: { type: "TouristAttraction", priceFrom: 360 },
};
