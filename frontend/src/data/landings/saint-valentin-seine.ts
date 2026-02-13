import type { LandingPageData } from "./types";

export const saintValentinSeine: LandingPageData = {
  slug: "saint-valentin-seine",
  meta: {
    title: "Saint-Valentin sur la Seine \u2013 Croisière romantique à Paris",
    description:
      "Offrez une croisière privée sur la Seine pour la Saint-Valentin. Champagne, Tour Eiffel illuminée, 2h en amoureux. À partir de 420\u00a0€.",
  },
  hero: {
    title: "Saint-Valentin sur la Seine",
    subtitle:
      "La plus belle déclaration d\u2019amour se fait sur l\u2019eau, face à la Tour Eiffel",
    backgroundImage: "/images/gallery/2025-04-08-a-20.57.33_c61d5f00.webp",
    cta: { text: "Réserver la Saint-Valentin", href: "/reservation?occasion=saint-valentin" },
  },
  sections: [
    {
      type: "richtext",
      title: "La Saint-Valentin la plus romantique de Paris",
      content: `<p>Oubliez les restaurants bondés et les menus imposés : cette année, offrez à votre moitié une <strong>croisière privée sur la Seine</strong> pour la Saint-Valentin. Le Senang, bateau de 12 mètres privatisé rien que pour vous deux, navigue 2 heures au cœur de Paris illuminé.</p>

<p>Imaginez : une <strong>coupe de champagne</strong> à la main, votre playlist romantique sur l\u2019enceinte Bluetooth, et la Tour Eiffel qui scintille devant vous. Le Pont Alexandre III, Notre-Dame, les quais de Seine baignés de lumière\u2026 Chaque minute est un souvenir.</p>

<p>La <strong>formule festive</strong> est parfaite pour l\u2019occasion : champagne inclus, ambiance intimiste. Vous pouvez aussi préparer un pique-nique romantique (fromage, macarons, fraises\u2026) ou commander nos planches apéritives. Le concept BYO vous laisse libre de tout.</p>

<p>Le créneau du <strong>coucher de soleil</strong> est le plus demandé pour la Saint-Valentin. La golden hour transforme Paris en tableau doré, puis les monuments s\u2019illuminent un à un. Un spectacle qui laisse sans voix \u2014 et qui crée le moment parfait pour une surprise.</p>

<p>Que ce soit pour <strong>célébrer votre couple</strong>, faire une déclaration ou simplement vivre un moment unique, la Saint-Valentin sur la Seine est inoubliable. Départ du Port de l\u2019Arsenal à Bastille. Réservez tôt : les créneaux partent très vite en février !</p>`,
    },
    {
      type: "benefits",
      title: "Pourquoi la Saint-Valentin sur la Seine ?",
      items: [
        { icon: "heart", title: "100 % romantique", text: "Bateau privatisé pour 2. Aucun autre passager, juste vous deux." },
        { icon: "champagne", title: "Champagne inclus", text: "Formule festive avec coupe de champagne face à la Tour Eiffel." },
        { icon: "sparkles", title: "Tour Eiffel scintillante", text: "Le spectacle des 20 000 ampoules vu depuis l\u2019eau." },
        { icon: "music", title: "Votre playlist", text: "Enceinte Bluetooth fournie. Créez votre ambiance romantique." },
      ],
    },
    {
      type: "gallery",
      title: "Saint-Valentin sur la Seine",
      images: [
        { src: "/images/gallery/2025-04-08-a-20.57.33_c61d5f00.webp", alt: "Croisière romantique au coucher du soleil" },
        { src: "/images/gallery/2025-03-02-a-21.18.40_52501437.webp", alt: "Golden hour sur la Seine pour la Saint-Valentin" },
        { src: "/images/gallery/2025-04-08-a-21.50.25_ac11bce0.webp", alt: "Paris illuminé vu depuis le Senang" },
        { src: "/images/gallery/2025-04-15-a-22.21.11_0329a51a.webp", alt: "Soirée romantique à bord du Senang" },
      ],
    },
    { type: "testimonials", title: "Ils ont fêté la Saint-Valentin sur la Seine", filter: "romantique" },
    { type: "pricing", title: "Nos formules Saint-Valentin" },
    {
      type: "faq",
      title: "Questions fréquentes \u2013 Saint-Valentin",
      items: [
        { question: "Faut-il réserver longtemps à l\u2019avance ?", answer: "Oui ! Les créneaux de février sont très demandés. Réservez au moins 2 à 3 semaines à l\u2019avance pour être sûr d\u2019avoir votre date." },
        { question: "Peut-on venir à 2 seulement ?", answer: "Absolument ! Le tarif de base (360\u00a0€ simple, 420\u00a0€ festive) couvre de 1 à 6 personnes. À deux, c\u2019est l\u2019intimité totale." },
        { question: "Peut-on apporter un gâteau ou des fleurs ?", answer: "Bien sûr ! Gâteau, roses, bougies, décorations\u2026 Préparez la surprise, on vous aide à installer à bord." },
        { question: "Le bateau est-il chauffé en février ?", answer: "Le Senang est un bateau semi-ouvert. Nous fournissons des plaids, mais prévoyez des vêtements chauds. L\u2019ambiance cocooning fait partie du charme !" },
        { question: "Peut-on faire une demande en mariage à bord ?", answer: "C\u2019est notre spécialité ! Contactez-nous pour organiser le moment parfait : lieu, timing, décoration. On garde le secret." },
      ],
    },
  ],
  relatedPages: ["croisiere-romantique-seine", "demande-en-mariage-seine", "coucher-soleil-seine"],
  jsonLd: { type: "TouristAttraction", priceFrom: 420 },
};
