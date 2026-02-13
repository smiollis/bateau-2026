import type { LandingPageData } from "./types";

export const anniversaireMariageSeine: LandingPageData = {
  slug: "anniversaire-mariage-seine",
  meta: {
    title: "Anniversaire de mariage sur la Seine \u2013 Croisi\u00e8re priv\u00e9e",
    description:
      "C\u00e9l\u00e9brez votre anniversaire de mariage sur la Seine. Croisi\u00e8re priv\u00e9e pour 2 \u00e0 12 personnes, champagne, d\u00e9cor romantique face \u00e0 la Tour Eiffel.",
  },
  hero: {
    title: "Anniversaire de mariage sur la Seine",
    subtitle:
      "Renouvelez la magie de votre couple lors d\u2019une croisi\u00e8re priv\u00e9e \u00e0 Paris",
    backgroundImage: "/images/gallery/2025-03-02-a-21.18.40_52501437.webp",
    cta: { text: "R\u00e9server votre croisi\u00e8re", href: "/reservation?occasion=anniversaire-mariage" },
  },
  sections: [
    {
      type: "richtext",
      title: "Une croisi\u00e8re pour c\u00e9l\u00e9brer votre amour",
      content: `<p>Que vous f\u00eatiez vos <strong>noces de coton, d\u2019argent ou d\u2019or</strong>, un anniversaire de mariage m\u00e9rite un cadre exceptionnel. \u00c0 bord du Senang, un bateau de 12 m\u00e8tres privatis\u00e9 rien que pour vous, revivez l\u2019\u00e9motion de votre engagement au fil de la Seine.</p>

<p>Pendant <strong>2 heures de navigation</strong>, laissez Paris d\u00e9filer sous vos yeux : la Tour Eiffel illumin\u00e9e, le Pont Alexandre III, Notre-Dame\u2026 Un d\u00e9cor romantique qui a fait la renomm\u00e9e de la Ville Lumi\u00e8re. Trinquez avec une coupe de <strong>champagne offerte</strong> gr\u00e2ce \u00e0 la formule festive.</p>

<p>Vous pouvez organiser un <strong>d\u00eener romantique \u00e0 bord</strong> en apportant votre repas, votre traiteur ou en commandant nos planches ap\u00e9ritives. Le Capitaine Michel, discret et attentionn\u00e9, assure une navigation fluide pendant que vous profitez de votre soir\u00e9e.</p>

<p>Invitez vos proches pour c\u00e9l\u00e9brer ensemble : le Senang accueille <strong>jusqu\u2019\u00e0 12 personnes</strong>. Que ce soit en couple ou en petit comit\u00e9 avec vos t\u00e9moins et amis proches, l\u2019intimit\u00e9 du bateau cr\u00e9e une ambiance chaleureuse et \u00e9mouvante.</p>

<p>D\u00e9part du <strong>Port de l\u2019Arsenal \u00e0 Bastille</strong> (Paris 12\u00e8me). Le Senang, qui a navigu\u00e9 pour les <strong>JO de Paris 2024</strong>, vous offre un \u00e9crin d\u2019exception pour renouveler votre promesse.</p>`,
    },
    {
      type: "benefits",
      title: "Pourquoi c\u00e9l\u00e9brer sur la Seine ?",
      items: [
        { icon: "heart", title: "Romantisme absolu", text: "Paris illumin\u00e9 en toile de fond pour renouveler votre engagement." },
        { icon: "champagne", title: "Champagne offert", text: "Trinquez \u00e0 votre amour avec la formule festive." },
        { icon: "users", title: "Famille et proches", text: "Invitez jusqu\u2019\u00e0 12 personnes pour partager ce moment." },
        { icon: "utensils", title: "D\u00eener \u00e0 bord", text: "Apportez votre repas ou commandez nos planches." },
      ],
    },
    {
      type: "gallery",
      title: "Moments d\u2019anniversaire sur la Seine",
      images: [
        { src: "/images/gallery/2025-03-02-a-21.18.40_52501437.webp", alt: "Croisi\u00e8re anniversaire de mariage au cr\u00e9puscule" },
        { src: "/images/gallery/2025-04-08-a-20.57.33_c61d5f00.webp", alt: "Coucher de soleil romantique sur la Seine" },
        { src: "/images/gallery/2025-04-15-a-22.21.11_0329a51a.webp", alt: "Soir\u00e9e intimiste \u00e0 bord du Senang" },
        { src: "/images/gallery/2025-04-08-a-21.50.25_ac11bce0.webp", alt: "Paris illumin\u00e9 pour un anniversaire de mariage" },
      ],
    },
    { type: "testimonials", title: "Ils ont c\u00e9l\u00e9br\u00e9 leur amour", filter: "mariage" },
    { type: "pricing", title: "Nos formules anniversaire de mariage" },
    {
      type: "faq",
      title: "Questions fr\u00e9quentes \u2013 Anniversaire de mariage",
      items: [
        { question: "Peut-on organiser une surprise pour son conjoint ?", answer: "Bien s\u00fbr ! Contactez-nous en amont pour coordonner la d\u00e9coration, le champagne et l\u2019arriv\u00e9e \u00e0 bord sans \u00e9veiller les soup\u00e7ons." },
        { question: "Peut-on apporter un g\u00e2teau ou un repas ?", answer: "Oui, vous \u00eates libres d\u2019apporter g\u00e2teau, repas traiteur ou pique-nique gastronomique. Nous avons une table \u00e0 bord." },
        { question: "Quel est le meilleur cr\u00e9neau ?", answer: "Le coucher du soleil est le plus romantique. En hiver, la croisi\u00e8re de nuit offre les monuments illumin\u00e9s." },
        { question: "Peut-on venir avec des enfants ?", answer: "Oui, les enfants sont bienvenus. Gilets de sauvetage adapt\u00e9s disponibles. Enfants de moins de 3 ans gratuits." },
        { question: "Combien co\u00fbte la croisi\u00e8re ?", answer: "\u00c0 partir de 360\u00a0\u20ac (formule simple) ou 420\u00a0\u20ac (formule festive avec champagne) pour 1 \u00e0 6 personnes." },
      ],
    },
  ],
  relatedPages: ["croisiere-romantique-seine", "demande-en-mariage-seine", "coucher-soleil-seine"],
  jsonLd: { type: "TouristAttraction", priceFrom: 360 },
};
