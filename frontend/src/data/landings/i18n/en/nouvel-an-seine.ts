import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: {
    title: "New Year's Eve on the Seine – Private Boat Party in Paris",
    description:
      "Ring in the New Year on the Seine aboard a private boat. Champagne, fireworks, illuminated Eiffel Tower. New Year's Eve cruise in Paris.",
  },
  hero: {
    title: "New Year's Eve on the Seine",
    subtitle:
      "The most beautiful New Year's Eve in Paris happens on the water, facing the fireworks",
    cta: { text: "Book New Year's Eve" },
  },
  sections: [
    {
      type: "richtext",
      title: "The most magical New Year's Eve in Paris",
      content: `<p>Count down facing the <strong>illuminated Eiffel Tower</strong>, champagne glass in hand, on the waters of the Seine. New Year's Eve aboard the Senang is an extraordinary experience your guests will never forget.</p>

<p>The Senang, a 12-metre boat <strong>privatised for your group</strong> (2 to 12 guests), cruises for 2 to 3 hours through the heart of Paris. You'll watch the pyrotechnic display from the water, with unobstructed views of the illuminated monuments.</p>

<p>Prepare your <strong>bespoke New Year's Eve</strong>: seafood platter, foie gras, champagne, party poppers... The BYO concept lets you bring everything you want. Or opt for the All-Inclusive package with catering and champagne.</p>

<p>Passing under the <strong>illuminated bridges of Paris</strong>, the reflections of lights on the Seine, counting down with your loved ones away from the crowds... This is the New Year's Eve you've always dreamed of. Intimate, spectacular and unforgettable.</p>

<p>Departure from the <strong>Port de l'Arsenal at Bastille</strong>. Special New Year's Eve slot from 10:30pm to 1:00am. Very limited availability: only one New Year's Eve per year, one chance to experience it. Book from September!</p>`,
    },
    {
      type: "benefits",
      title: "Why New Year's Eve on the Seine?",
      items: [
        { icon: "sparkles", title: "Fireworks", text: "Direct view of the pyrotechnic display from the Seine." },
        { icon: "champagne", title: "Champagne at midnight", text: "Toast facing the Eiffel Tower as the new year arrives." },
        { icon: "lock", title: "Total privacy", text: "Your group only. Away from the Trocadéro crowds." },
        { icon: "clock", title: "Extended slot", text: "10:30pm-1:00am. Experience the countdown and celebrate on the water." },
      ],
    },
    {
      type: "gallery",
      title: "New Year's Eve on the Seine",
      images: [
        { src: "/images/gallery/2025-04-08-a-21.50.25_ac11bce0.webp", alt: "Paris illuminated from the Seine for New Year's Eve" },
        { src: "/images/gallery/2025-04-08-a-20.57.33_c61d5f00.webp", alt: "Festive atmosphere on the Senang" },
        { src: "/images/gallery/2025-04-15-a-22.21.11_0329a51a.webp", alt: "Night cruise on the Seine" },
        { src: "/images/gallery/2025-03-02-a-21.18.40_52501437.webp", alt: "Night view of Paris from the boat" },
      ],
    },
    { type: "testimonials", title: "They celebrated New Year's Eve on the Seine", filter: "soiree" },
    { type: "pricing", title: "Our New Year's Eve packages" },
    {
      type: "faq",
      title: "Frequently asked questions – New Year's Eve",
      items: [
        { question: "When should we book?", answer: "As early as possible! We only have one New Year's Eve slot. Book from September to secure your spot." },
        { question: "How long is the New Year's Eve slot?", answer: "The special New Year's Eve slot runs from 10:30pm to 1:00am, 2.5 hours of cruising. Special rate on request." },
        { question: "Will we see the fireworks?", answer: "Yes! The route is optimised for the best view of the pyrotechnic display and the sparkling Eiffel Tower." },
        { question: "Can we bring our own champagne?", answer: "Of course! The BYO concept applies to New Year's Eve too. Bring champagne, foie gras, party poppers... or opt for All-Inclusive." },
        { question: "How much does it cost?", answer: "The New Year's Eve rate is on request (extended slot + special period). Contact us for a personalised quote." },
      ],
    },
  ],
};

export default translation;
