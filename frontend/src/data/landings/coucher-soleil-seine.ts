import type { LandingPageData } from "./types";

export const coucherSoleilSeine: LandingPageData = {
  slug: "coucher-soleil-seine",
  meta: {
    title: "Croisi\u00e8re au coucher du soleil sur la Seine \u2013 Golden hour \u00e0 Paris",
    description:
      "Vivez la golden hour sur la Seine. Croisi\u00e8re priv\u00e9e de 2h au coucher du soleil, Tour Eiffel illumin\u00e9e, champagne. \u00c0 partir de 360\u00a0\u20ac.",
  },
  hero: {
    title: "Croisi\u00e8re au coucher du soleil sur la Seine",
    subtitle:
      "La golden hour parisienne vue depuis l\u2019eau \u2014 un spectacle inoubliable",
    backgroundImage: "/images/gallery/2025-04-08-a-20.57.33_c61d5f00.webp",
    cta: { text: "R\u00e9server le coucher de soleil", href: "/reservation?occasion=coucher-soleil" },
  },
  sections: [
    {
      type: "richtext",
      title: "La plus belle lumi\u00e8re de Paris",
      content: `<p>Il y a un moment magique \u00e0 Paris : quand le soleil descend derri\u00e8re la Tour Eiffel et que la ville s\u2019habille d\u2019or. Vivez ce spectacle depuis la Seine \u00e0 bord du Senang, un bateau de 12 m\u00e8tres <strong>privatis\u00e9 pour votre groupe</strong>.</p>

<p>La <strong>croisi\u00e8re au coucher du soleil</strong> est notre cr\u00e9neau le plus demand\u00e9 \u2014 et pour cause. Pendant 2 heures, vous assistez \u00e0 la transformation de Paris : les reflets dor\u00e9s sur la Seine, les ombres longues sur les quais, puis les monuments qui s\u2019illuminent un \u00e0 un.</p>

<p>Le moment fort ? Le passage devant la <strong>Tour Eiffel au moment o\u00f9 ses lumi\u00e8res scintillent</strong>. Un spectacle qui laisse sans voix, encore plus impressionnant vu depuis l\u2019eau. Le Pont Alexandre III, le Grand Palais, le Mus\u00e9e d\u2019Orsay\u2026 Chaque monument prend une dimension f\u00e9erique \u00e0 la tomb\u00e9e de la nuit.</p>

<p>Avec la <strong>formule festive</strong>, trinquez au champagne face \u00e0 ce panorama. Vous pouvez aussi pr\u00e9parer un pique-nique romantique ou commander nos planches ap\u00e9ritives. L\u2019enceinte Bluetooth est \u00e0 disposition pour votre playlist d\u2019ambiance.</p>

<p>Ce cr\u00e9neau est id\u00e9al pour un <strong>rendez-vous romantique</strong>, un anniversaire, un shooting photo ou simplement pour profiter de Paris autrement. D\u00e9part du Port de l\u2019Arsenal \u00e0 Bastille. R\u00e9servez \u00e0 l\u2019avance : les cr\u00e9neaux golden hour partent vite !</p>`,
    },
    {
      type: "benefits",
      title: "Pourquoi le coucher de soleil ?",
      items: [
        { icon: "sunset", title: "Golden hour", text: "La plus belle lumi\u00e8re de Paris, reflets dor\u00e9s sur la Seine." },
        { icon: "sparkles", title: "Tour Eiffel scintillante", text: "Assistez \u00e0 l\u2019illumination depuis l\u2019eau." },
        { icon: "camera", title: "Photos sublimes", text: "Le meilleur cr\u00e9neau pour des photos inoubliables." },
        { icon: "champagne", title: "Champagne au soleil", text: "Trinquez face au ciel emmbras\u00e9 avec la formule festive." },
      ],
    },
    {
      type: "gallery",
      title: "Couchers de soleil sur la Seine",
      images: [
        { src: "/images/gallery/2025-04-08-a-20.57.33_c61d5f00.webp", alt: "Coucher de soleil sur la Seine \u00e0 Paris" },
        { src: "/images/gallery/2025-03-02-a-21.18.40_52501437.webp", alt: "Golden hour sur la Seine avec le Senang" },
        { src: "/images/gallery/2025-04-08-a-21.50.25_ac11bce0.webp", alt: "Paris illumin\u00e9 au cr\u00e9puscule depuis la Seine" },
        { src: "/images/gallery/2025-04-15-a-22.21.11_0329a51a.webp", alt: "Soir\u00e9e sur le Senang au coucher du soleil" },
      ],
    },
    { type: "testimonials", title: "Ils ont vu le coucher de soleil", filter: "coucher-soleil" },
    { type: "pricing", title: "Nos formules coucher de soleil" },
    {
      type: "faq",
      title: "Questions fr\u00e9quentes \u2013 Coucher de soleil",
      items: [
        { question: "\u00c0 quelle heure est le coucher de soleil ?", answer: "L\u2019heure varie selon la saison : environ 17h30 en hiver, 21h30 en \u00e9t\u00e9. Nous vous conseillons de r\u00e9server 1h30 avant le coucher du soleil." },
        { question: "Ce cr\u00e9neau est-il plus cher ?", answer: "Non, les tarifs sont les m\u00eames : 360\u00a0\u20ac (simple) ou 420\u00a0\u20ac (festive). Mais ce cr\u00e9neau est tr\u00e8s demand\u00e9, r\u00e9servez \u00e0 l\u2019avance." },
        { question: "Voit-on la Tour Eiffel scintiller ?", answer: "Oui ! Si votre croisi\u00e8re couvre l\u2019heure pile (chaque heure apr\u00e8s la tomb\u00e9e de la nuit), vous verrez les 20 000 ampoules scintiller pendant 5 minutes." },
        { question: "Et si le ciel est couvert ?", answer: "M\u00eame par temps couvert, la lumi\u00e8re du coucher de soleil est belle. En cas de m\u00e9t\u00e9o vraiment d\u00e9favorable, report gratuit \u00e0 une date de votre choix." },
        { question: "Peut-on r\u00e9server pour un shooting photo ?", answer: "Absolument ! La golden hour est le cr\u00e9neau pr\u00e9f\u00e9r\u00e9 des photographes. Le Senang a servi de plateau pour Adidas et Le Slip Fran\u00e7ais." },
      ],
    },
  ],
  relatedPages: ["croisiere-romantique-seine", "shooting-photo-seine", "demande-en-mariage-seine"],
  jsonLd: { type: "TouristAttraction", priceFrom: 480 },
};
