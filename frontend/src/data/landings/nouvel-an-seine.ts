import type { LandingPageData } from "./types";

export const nouvelAnSeine: LandingPageData = {
  slug: "nouvel-an-seine",
  meta: {
    title: "Nouvel An sur la Seine \u2013 Réveillon privé en bateau à Paris",
    description:
      "Fêtez le Nouvel An sur la Seine à bord d\u2019un bateau privé. Champagne, feux d\u2019artifice, Tour Eiffel illuminée. Croisière du réveillon à Paris.",
  },
  hero: {
    title: "Nouvel An sur la Seine",
    subtitle:
      "Le plus beau réveillon de Paris se vit sur l\u2019eau, face aux feux d\u2019artifice",
    backgroundImage: "/images/gallery/2025-04-08-a-21.50.25_ac11bce0.webp",
    cta: { text: "Réserver le réveillon", href: "/reservation?occasion=nouvel-an" },
  },
  sections: [
    {
      type: "richtext",
      title: "Le réveillon le plus magique de Paris",
      content: `<p>Comptez à rebours face à la <strong>Tour Eiffel illuminée</strong>, une coupe de champagne à la main, sur les eaux de la Seine. Le réveillon du Nouvel An à bord du Senang est une expérience hors du commun que vos invités n\u2019oublieront jamais.</p>

<p>Le Senang, bateau de 12 mètres <strong>privatisé pour votre groupe</strong> (2 à 12 personnes), navigue pendant 2 à 3 heures au cœur de Paris. Vous assistez au spectacle pyrotechnique depuis l\u2019eau, avec une vue imprenable sur les monuments illuminés.</p>

<p>Préparez votre <strong>réveillon sur mesure</strong> : plateau de fruits de mer, foie gras, champagne, cotillons\u2026 Le concept BYO vous permet d\u2019amener tout ce que vous voulez. Ou optez pour la formule Tout Inclus avec traiteur et champagne.</p>

<p>Le passage sous les <strong>ponts de Paris illuminés</strong>, les reflets des lumières sur la Seine, le décompte avec vos proches loin de la foule\u2026 C\u2019est le Nouvel An dont vous avez toujours rêvé. Intime, spectaculaire et inoubliable.</p>

<p>Départ du <strong>Port de l\u2019Arsenal à Bastille</strong>. Créneau spécial réveillon de 22h30 à 1h00. Places très limitées : un seul réveillon par an, une seule chance de le vivre. Réservez dès septembre !</p>`,
    },
    {
      type: "benefits",
      title: "Pourquoi le Nouvel An sur la Seine ?",
      items: [
        { icon: "sparkles", title: "Feux d\u2019artifice", text: "Vue directe sur le spectacle pyrotechnique depuis la Seine." },
        { icon: "champagne", title: "Champagne à minuit", text: "Trinquez face à la Tour Eiffel au passage à la nouvelle année." },
        { icon: "lock", title: "Privatif total", text: "Votre groupe uniquement. Loin de la foule du Trocadéro." },
        { icon: "clock", title: "Créneau étendu", text: "22h30-1h00. Vivez le décompte et célébrez sur l\u2019eau." },
      ],
    },
    {
      type: "gallery",
      title: "Réveillon sur la Seine",
      images: [
        { src: "/images/gallery/2025-04-08-a-21.50.25_ac11bce0.webp", alt: "Paris illuminé depuis la Seine pour le réveillon" },
        { src: "/images/gallery/2025-04-08-a-20.57.33_c61d5f00.webp", alt: "Ambiance festive sur le Senang" },
        { src: "/images/gallery/2025-04-15-a-22.21.11_0329a51a.webp", alt: "Croisière de nuit sur la Seine" },
        { src: "/images/gallery/2025-03-02-a-21.18.40_52501437.webp", alt: "Vue nocturne de Paris depuis le bateau" },
      ],
    },
    { type: "testimonials", title: "Ils ont fêté le Nouvel An sur la Seine", filter: "soiree" },
    { type: "pricing", title: "Nos formules réveillon" },
    {
      type: "faq",
      title: "Questions fréquentes \u2013 Nouvel An",
      items: [
        { question: "Quand faut-il réserver ?", answer: "Le plus tôt possible ! Nous n\u2019avons qu\u2019un seul créneau réveillon. Réservez dès septembre pour être sûr d\u2019avoir votre place." },
        { question: "Quelle est la durée du créneau réveillon ?", answer: "Le créneau spécial réveillon est de 22h30 à 1h00, soit 2h30 de navigation. Tarif spécial sur devis." },
        { question: "Voit-on les feux d\u2019artifice ?", answer: "Oui ! Le parcours est optimisé pour avoir la meilleure vue sur le spectacle pyrotechnique et la Tour Eiffel scintillante." },
        { question: "Peut-on amener notre propre champagne ?", answer: "Bien sûr ! Le concept BYO s\u2019applique aussi au réveillon. Amenez champagne, foie gras, cotillons\u2026 ou optez pour le Tout Inclus." },
        { question: "Combien ça coûte ?", answer: "Le tarif réveillon est sur devis (créneau étendu + période spéciale). Contactez-nous pour un devis personnalisé." },
      ],
    },
  ],
  relatedPages: ["soiree-entre-amis-seine", "coucher-soleil-seine", "apero-bateau-seine"],
  jsonLd: { type: "TouristAttraction", priceFrom: 500 },
};
