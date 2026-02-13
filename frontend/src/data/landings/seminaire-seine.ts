import type { LandingPageData } from "./types";

export const seminaireSeine: LandingPageData = {
  slug: "seminaire-seine",
  meta: {
    title: "Séminaire sur la Seine \u2013 Événement entreprise en bateau à Paris",
    description:
      "Organisez votre séminaire sur la Seine. Bateau privatisé pour 2 à 12 collaborateurs, cadre inspirant, facturation entreprise. Dès 360\u00a0€.",
  },
  hero: {
    title: "Séminaire sur la Seine",
    subtitle:
      "Un cadre inspirant pour vos réunions d\u2019équipe \u2014 loin du bureau, sur l\u2019eau",
    backgroundImage: "/images/gallery/2025-04-08-a-22.20.47_261af646.webp",
    cta: { text: "Réserver votre séminaire", href: "/reservation?occasion=seminaire" },
  },
  sections: [
    {
      type: "richtext",
      title: "Un séminaire hors les murs, sur la Seine",
      content: `<p>Changez de cadre pour <strong>libérer la créativité</strong> de votre équipe. Le Senang, bateau de 12 mètres privatisé, offre un espace unique pour organiser un séminaire au cœur de Paris. Pendant 2 heures de navigation, vos collaborateurs échangent dans un cadre inspirant et déconnecté.</p>

<p>L\u2019ambiance sur la Seine favorise les <strong>échanges informels et les idées nouvelles</strong>. Loin des salles de réunion, les discussions sont plus libres, les liens plus forts. Le panorama parisien \u2014 Tour Eiffel, Notre-Dame, ponts historiques \u2014 offre un cadre stimulant pour brainstormer.</p>

<p>Le format est flexible : <strong>réunion de travail</strong> le matin, brainstorming créatif l\u2019après-midi, ou afterwork de cohésion en soirée. L\u2019enceinte Bluetooth permet de diffuser une présentation audio. Le bateau dispose d\u2019un espace ouvert propice aux échanges de groupe.</p>

<p><strong>Facturation entreprise</strong> disponible : nous émettons une facture conforme avec TVA pour le passage en frais professionnels. Pour les groupes de plus de 6, contactez-nous pour un devis Tout Inclus avec traiteur (plateaux-repas, buffet froid\u2026).</p>

<p>Le Senang a accueilli des <strong>événements corporate</strong> pour des marques comme Adidas et Le Slip Français, et a été le bateau officiel de la délégation de Mauritanie aux JO de Paris 2024. Un cadre éprouvé pour vos événements d\u2019entreprise. Départ du Port de l\u2019Arsenal à Bastille.</p>`,
    },
    {
      type: "benefits",
      title: "Pourquoi un séminaire sur la Seine ?",
      items: [
        { icon: "lightbulb", title: "Cadre inspirant", text: "La Seine et les monuments de Paris stimulent la créativité." },
        { icon: "briefcase", title: "Facture entreprise", text: "Facturation professionnelle avec TVA. Passage en frais." },
        { icon: "users", title: "2 à 12 personnes", text: "Format intimiste idéal pour un comité de direction ou une équipe projet." },
        { icon: "utensils", title: "Traiteur possible", text: "Plateaux-repas, buffet froid, planches apéritives sur commande." },
      ],
    },
    {
      type: "gallery",
      title: "Séminaires sur la Seine",
      images: [
        { src: "/images/gallery/2025-04-08-a-22.20.47_261af646.webp", alt: "Séminaire d\u2019entreprise sur la Seine" },
        { src: "/images/gallery/2025-04-08-a-20.58.14_0b6ddf22.webp", alt: "Réunion d\u2019équipe à bord du Senang" },
        { src: "/images/gallery/2025-03-03-a-16.00.26_b41cf5f5.webp", alt: "Le Senang sous les ponts de Paris" },
        { src: "/images/gallery/2025-04-08-a-22.20.42_88a4983b.webp", alt: "Ambiance conviviale pour un séminaire" },
      ],
    },
    { type: "testimonials", title: "Ils ont organisé leur séminaire sur la Seine", filter: "team-building" },
    { type: "pricing", title: "Nos formules séminaire" },
    {
      type: "faq",
      title: "Questions fréquentes \u2013 Séminaire",
      items: [
        { question: "Y a-t-il du wifi à bord ?", answer: "Non, pas de wifi embarqué. Mais la couverture 4G/5G est excellente sur la Seine à Paris. Préparez vos documents en amont." },
        { question: "Peut-on projeter une présentation ?", answer: "Il n\u2019y a pas de vidéoprojecteur, mais vous pouvez diffuser l\u2019audio via l\u2019enceinte Bluetooth. Pour les visuels, nous recommandons une tablette ou un écran portable." },
        { question: "Quel format pour un brainstorming ?", answer: "Le créneau de 2h est idéal : 30 min d\u2019installation et ice-breaker, 1h de travail, 30 min de débrief et apéritif." },
        { question: "Peut-on prolonger la durée ?", answer: "Oui, contactez-nous pour un créneau étendu. Supplément horaire sur devis." },
        { question: "Quel est le tarif pour 10 personnes ?", answer: "360\u00a0€ (base 1-6) + 4 × 100\u00a0€ = 760\u00a0€ pour 10 personnes (formule simple). Formule festive et Tout Inclus sur devis." },
      ],
    },
  ],
  relatedPages: ["team-building-seine", "apero-bateau-seine", "shooting-photo-seine"],
  jsonLd: { type: "TouristAttraction", priceFrom: 360 },
};
