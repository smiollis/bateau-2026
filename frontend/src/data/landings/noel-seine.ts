import type { LandingPageData } from "./types";

export const noelSeine: LandingPageData = {
  slug: "noel-seine",
  meta: {
    title: "Croisière de Noël sur la Seine \u2013 Fêtes en bateau à Paris",
    description:
      "Vivez la magie de Noël sur la Seine. Croisière privée, Paris illuminé, ambiance féerique. Bateau privatisé de 2 à 12 personnes. Dès 360\u00a0€.",
  },
  hero: {
    title: "Croisière de Noël sur la Seine",
    subtitle:
      "La magie des fêtes vue depuis la Seine \u2014 Paris scintille pour vous",
    backgroundImage: "/images/gallery/2025-04-08-a-21.50.25_ac11bce0.webp",
    cta: { text: "Réserver votre croisière de Noël", href: "/reservation?occasion=noel" },
  },
  sections: [
    {
      type: "richtext",
      title: "La féerie de Noël sur la Seine",
      content: `<p>En décembre, Paris brille de mille feux. Et il n\u2019y a pas de meilleur endroit pour admirer ce spectacle que <strong>depuis la Seine</strong>. Le Senang vous offre une croisière privée de 2 heures au cœur de la capitale illuminée pour les fêtes.</p>

<p>Naviguez entre les <strong>décorations de Noël des grands magasins</strong>, les guirlandes des ponts, les sapins illuminés des quais. La Tour Eiffel scintille, Notre-Dame se pare de lumière, et l\u2019ambiance est tout simplement féerique.</p>

<p>Le concept est parfait pour les fêtes : amenez votre <strong>chocolat chaud, vin chaud, marrons grillés</strong>\u2026 ou optez pour la formule festive avec champagne. Préparez un pique-nique de Noël ou commandez nos planches apéritives. Le BYO vous laisse libre.</p>

<p>Idéal pour un <strong>cadeau de Noël original</strong>, une sortie en famille pendant les vacances scolaires, ou une soirée de Noël entre amis. Le Senang accueille de 2 à 12 personnes dans une ambiance intimiste et chaleureuse.</p>

<p>Départ du <strong>Port de l\u2019Arsenal à Bastille</strong>. Nous fournissons des plaids pour les soirées fraîches. Prévoyez des vêtements chauds et profitez de la magie de Paris en hiver.</p>`,
    },
    {
      type: "benefits",
      title: "Pourquoi une croisière de Noël ?",
      items: [
        { icon: "sparkles", title: "Paris illuminé", text: "Décorations de Noël, ponts éclairés, Tour Eiffel scintillante." },
        { icon: "gift", title: "Cadeau original", text: "Offrez une expérience inoubliable plutôt qu\u2019un objet." },
        { icon: "users", title: "En famille", text: "De 2 à 12 personnes, enfants bienvenus. Ambiance cocooning." },
        { icon: "coffee", title: "Chocolat chaud BYO", text: "Amenez vin chaud, chocolat chaud, bûche de Noël\u2026 Tout est permis." },
      ],
    },
    {
      type: "gallery",
      title: "Noël sur la Seine",
      images: [
        { src: "/images/gallery/2025-04-08-a-21.50.25_ac11bce0.webp", alt: "Paris illuminé pour Noël depuis la Seine" },
        { src: "/images/gallery/2025-04-08-a-20.57.33_c61d5f00.webp", alt: "Ambiance féerique sur le Senang" },
        { src: "/images/gallery/2025-04-08-a-20.58.31_fcc03538.webp", alt: "Croisière en famille pendant les fêtes" },
        { src: "/images/gallery/2025-03-02-a-21.18.40_52501437.webp", alt: "Soirée de Noël sur la Seine" },
      ],
    },
    { type: "testimonials", title: "Ils ont fêté Noël sur la Seine", filter: "famille" },
    { type: "pricing", title: "Nos formules Noël" },
    {
      type: "faq",
      title: "Questions fréquentes \u2013 Croisière de Noël",
      items: [
        { question: "Le bateau navigue-t-il en décembre ?", answer: "Oui ! Le Senang navigue toute l\u2019année, y compris en décembre. Nous fournissons des plaids. Prévoyez bonnets et gants pour profiter pleinement." },
        { question: "Peut-on offrir la croisière en cadeau ?", answer: "Absolument ! Nous proposons des bons cadeaux. Contactez-nous pour un bon personnalisé avec la date de votre choix." },
        { question: "Les enfants sont-ils bienvenus ?", answer: "Oui, c\u2019est une sortie familiale parfaite. Gilets de sauvetage enfants fournis. Les moins de 3 ans sont gratuits." },
        { question: "Peut-on amener du vin chaud ?", answer: "Bien sûr ! Vin chaud, chocolat chaud, bûche, marrons\u2026 Amenez tout ce qui fait l\u2019esprit de Noël. Le BYO est total." },
        { question: "Y a-t-il des créneaux spéciaux pour les fêtes ?", answer: "Les week-ends de décembre et la semaine entre Noël et le Jour de l\u2019An sont très demandés. Réservez au moins 2 semaines à l\u2019avance." },
      ],
    },
  ],
  relatedPages: ["nouvel-an-seine", "croisiere-famille-seine", "coucher-soleil-seine"],
  jsonLd: { type: "TouristAttraction", priceFrom: 360 },
};
