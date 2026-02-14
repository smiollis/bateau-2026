import type { LandingPageData } from "./types";

export const shootingPhotoSeine: LandingPageData = {
  slug: "shooting-photo-seine",
  meta: {
    title: "Shooting photo sur la Seine \u2013 S\u00e9ance bateau \u00e0 Paris",
    description:
      "R\u00e9alisez un shooting photo unique sur la Seine. Bateau priv\u00e9, lumi\u00e8re naturelle, Pont Alexandre III et Tour Eiffel en toile de fond. 2h de croisi\u00e8re.",
  },
  hero: {
    title: "Shooting photo sur la Seine",
    subtitle:
      "Un d\u00e9cor naturel exceptionnel pour vos plus belles photos",
    backgroundImage: "/images/gallery/2025-04-04-a-17.33.30_ea0b05c2.webp",
    cta: { text: "R\u00e9server votre shooting", href: "/reservation?occasion=shooting" },
  },
  sections: [
    {
      type: "richtext",
      title: "Un shooting photo d\u2019exception sur l\u2019eau",
      content: `<p>Photographes, couples, influenceurs ou marques : le Senang offre un <strong>plateau photo flottant</strong> unique au c\u0153ur de Paris. Pendant 2 heures de navigation, profitez d\u2019un d\u00e9cor en mouvement permanent : la Tour Eiffel, le Pont Alexandre III, les quais de Seine, les \u00eeles\u2026</p>

<p>La <strong>lumi\u00e8re naturelle sur la Seine</strong> est exceptionnelle. La golden hour offre des reflets dor\u00e9s sur l\u2019eau et une lumi\u00e8re douce sur les visages \u2014 le r\u00eave de tout photographe. Le bateau se d\u00e9place lentement, permettant des prises de vue vari\u00e9es sans changer de lieu.</p>

<p>Le Senang a d\u00e9j\u00e0 servi de d\u00e9cor pour des <strong>tournages professionnels</strong> : Adidas (avec Nicolas Karab\u00e9tic), Le Slip Fran\u00e7ais, et a \u00e9t\u00e9 le bateau officiel de la d\u00e9l\u00e9gation de Mauritanie aux <strong>JO de Paris 2024</strong>. Un cadre \u00e9prouv\u00e9 pour des shootings de qualit\u00e9.</p>

<p>Le bateau est <strong>enti\u00e8rement privatis\u00e9</strong> : pas de passants, pas de touristes dans le cadre. Votre photographe peut travailler librement. Vous pouvez aussi y organiser un <strong>shooting EVJF</strong>, un portrait de couple, une s\u00e9ance grossesse, un lookbook mode ou du contenu pour les r\u00e9seaux sociaux.</p>

<p>D\u00e9part du <strong>Port de l\u2019Arsenal \u00e0 Bastille</strong>. Le parcours longe les deux rives de la Seine avec les plus beaux monuments en arri\u00e8re-plan. Pr\u00e9voyez le cr\u00e9neau du coucher de soleil pour la meilleure lumi\u00e8re.</p>`,
    },
    {
      type: "benefits",
      title: "Pourquoi un shooting sur la Seine ?",
      items: [
        { icon: "camera", title: "D\u00e9cor exceptionnel", text: "Tour Eiffel, Pont Alexandre III, quais de Seine en toile de fond." },
        { icon: "sunset", title: "Golden hour", text: "Lumi\u00e8re dor\u00e9e naturelle pour des photos sublimes." },
        { icon: "film", title: "Plateau \u00e9prouv\u00e9", text: "D\u00e9j\u00e0 utilis\u00e9 par Adidas, Le Slip Fran\u00e7ais, JO 2024." },
        { icon: "lock", title: "Privatif total", text: "Aucun passant dans le cadre. Votre photographe travaille librement." },
      ],
    },
    {
      type: "gallery",
      title: "Shootings sur la Seine",
      images: [
        { src: "/images/gallery/2025-04-04-a-17.33.30_ea0b05c2.webp", alt: "Shooting photo sur la Seine avec Tour Eiffel" },
        { src: "/images/gallery/2025-04-08-a-20.57.33_c61d5f00.webp", alt: "Golden hour sur la Seine pour shooting" },
        { src: "/images/gallery/2025-04-18-a-09.55.02_4b9f3852.webp", alt: "Vue depuis le bateau lors d\u2019un shooting" },
        { src: "/images/gallery/2025-03-03-a-16.00.26_b41cf5f5.webp", alt: "Le Senang sous les ponts de Paris" },
      ],
    },
    { type: "testimonials", title: "Ils ont choisi le Senang", filter: "shooting" },
    { type: "pricing", title: "Nos formules shooting photo" },
    {
      type: "faq",
      title: "Questions fr\u00e9quentes \u2013 Shooting photo",
      items: [
        { question: "Peut-on venir avec un photographe professionnel ?", answer: "Bien s\u00fbr ! Votre photographe est le bienvenu \u00e0 bord. Il pourra se d\u00e9placer librement sur le bateau pour varier les angles." },
        { question: "Quel est le meilleur cr\u00e9neau pour la lumi\u00e8re ?", answer: "La golden hour (1h avant le coucher du soleil) offre la plus belle lumi\u00e8re. R\u00e9servez ce cr\u00e9neau \u00e0 l\u2019avance car il est tr\u00e8s demand\u00e9." },
        { question: "Le bateau est-il stable pour les photos ?", answer: "Oui, le Senang navigue lentement et offre une navigation stable. Pas de vibrations g\u00eanantes pour les prises de vue." },
        { question: "Peut-on faire un shooting de mode/lookbook ?", answer: "Absolument. Plusieurs marques ont d\u00e9j\u00e0 tourn\u00e9 \u00e0 bord (Adidas, Le Slip Fran\u00e7ais). Le d\u00e9cor varie naturellement au fil de la navigation." },
        { question: "Combien co\u00fbte un shooting sur la Seine ?", answer: "\u00c0 partir de 360\u00a0\u20ac (formule simple, 2h). Le tarif est le m\u00eame que pour une croisi\u00e8re standard." },
      ],
    },
  ],
  relatedPages: ["evjf-seine", "croisiere-romantique-seine", "coucher-soleil-seine"],
  jsonLd: { type: "TouristAttraction", priceFrom: 480 },
};
