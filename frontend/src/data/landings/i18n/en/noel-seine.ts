import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: {
    title: "Christmas Cruise on the Seine – Festive Boat in Paris",
    description:
      "Experience the magic of Christmas on the Seine. Private cruise, illuminated Paris, fairytale atmosphere. Private boat for 2 to 12 guests. From 480€.",
  },
  hero: {
    title: "Christmas Cruise on the Seine",
    subtitle:
      "The magic of the holidays seen from the Seine — Paris sparkles just for you",
    cta: { text: "Book Your Christmas Cruise" },
  },
  sections: [
    {
      type: "richtext",
      title: "Christmas magic on the Seine",
      content: `<p>In December, Paris glows with a thousand lights. And there's no better place to admire this spectacle than <strong>from the Seine</strong>. The Senang offers you a 2-hour private cruise through the heart of the illuminated capital for the holidays.</p>

<p>Cruise past the <strong>Christmas decorations of the grand department stores</strong>, the garlands on the bridges, the illuminated Christmas trees on the embankments. The Eiffel Tower sparkles, Notre-Dame is bathed in light, and the atmosphere is simply magical.</p>

<p>The concept is perfect for the holidays: bring your <strong>hot chocolate, mulled wine, roasted chestnuts</strong>... or opt for the festive package with champagne. Prepare a Christmas picnic or order our charcuterie boards. The BYO concept gives you total freedom.</p>

<p>Ideal as an <strong>original Christmas gift</strong>, a family outing during school holidays, or a Christmas evening with friends. The Senang welcomes 2 to 12 guests in an intimate and cosy atmosphere.</p>

<p>Departure from the <strong>Port de l'Arsenal at Bastille</strong>. We provide blankets for cool evenings. Dress warmly and enjoy the magic of Paris in winter.</p>`,
    },
    {
      type: "benefits",
      title: "Why a Christmas cruise?",
      items: [
        { icon: "sparkles", title: "Illuminated Paris", text: "Christmas decorations, lit bridges, sparkling Eiffel Tower." },
        { icon: "gift", title: "Original gift", text: "Give an unforgettable experience rather than an object." },
        { icon: "users", title: "Family-friendly", text: "2 to 12 guests, children welcome. Cosy atmosphere." },
        { icon: "coffee", title: "BYO hot chocolate", text: "Bring mulled wine, hot chocolate, yule log... Everything goes." },
      ],
    },
    {
      type: "gallery",
      title: "Christmas on the Seine",
      images: [
        { src: "/images/gallery/2025-04-08-a-21.50.25_ac11bce0.webp", alt: "Paris illuminated for Christmas from the Seine" },
        { src: "/images/gallery/2025-04-08-a-20.57.33_c61d5f00.webp", alt: "Fairytale atmosphere on the Senang" },
        { src: "/images/gallery/2025-04-08-a-20.58.31_fcc03538.webp", alt: "Family cruise during the holidays" },
        { src: "/images/gallery/2025-03-02-a-21.18.40_52501437.webp", alt: "Christmas evening on the Seine" },
      ],
    },
    { type: "testimonials", title: "They celebrated Christmas on the Seine", filter: "famille" },
    { type: "pricing", title: "Our Christmas packages" },
    {
      type: "faq",
      title: "Frequently asked questions – Christmas cruise",
      items: [
        { question: "Does the boat sail in December?", answer: "Yes! The Senang sails all year round, including December. We provide blankets. Bring hats and gloves to enjoy fully." },
        { question: "Can we give the cruise as a gift?", answer: "Absolutely! We offer gift vouchers. Contact us for a personalised voucher with your chosen date." },
        { question: "Are children welcome?", answer: "Yes, it's a perfect family outing. Child life jackets provided. Children under 3 are free." },
        { question: "Can we bring mulled wine?", answer: "Of course! Mulled wine, hot chocolate, yule log, chestnuts... Bring everything that makes Christmas special. BYO is total." },
        { question: "Are there special holiday slots?", answer: "December weekends and the week between Christmas and New Year's Day are in high demand. Book at least 2 weeks in advance." },
      ],
    },
  ],
};

export default translation;
