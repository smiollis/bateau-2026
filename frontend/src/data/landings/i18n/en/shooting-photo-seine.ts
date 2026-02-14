import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: {
    title: "Photo Shoot on the Seine – Boat Session in Paris",
    description:
      "Create a unique photo shoot on the Seine. Private boat, natural light, Pont Alexandre III and Eiffel Tower as your backdrop. 2-hour cruise.",
  },
  hero: {
    title: "Photo Shoot on the Seine",
    subtitle:
      "An exceptional natural backdrop for your most beautiful photos",
    cta: { text: "Book Your Shoot" },
  },
  sections: [
    {
      type: "richtext",
      title: "An exceptional photo shoot on the water",
      content: `<p>Photographers, couples, influencers and brands: the Senang offers a unique <strong>floating photo studio</strong> in the heart of Paris. During 2 hours of cruising, enjoy an ever-changing backdrop: the Eiffel Tower, the Pont Alexandre III, the Seine embankments, the islands...</p>

<p>The <strong>natural light on the Seine</strong> is exceptional. The golden hour offers golden reflections on the water and soft light on faces — a photographer's dream. The boat moves slowly, allowing varied shots without changing location.</p>

<p>The Senang has already served as a backdrop for <strong>professional shoots</strong>: Adidas (with Nicolas Karabatic), Le Slip Français, and was the official boat of the Mauritania delegation at the <strong>Paris 2024 Olympics</strong>. A proven setting for quality shoots.</p>

<p>The boat is <strong>entirely privatised</strong>: no passers-by, no tourists in the frame. Your photographer can work freely. You can also organise a <strong>bachelorette party shoot</strong>, couple portraits, maternity session, fashion lookbook or social media content.</p>

<p>Departure from the <strong>Port de l'Arsenal at Bastille</strong>. The route follows both banks of the Seine with the most beautiful landmarks as your background. Book the sunset slot for the best light.</p>`,
    },
    {
      type: "benefits",
      title: "Why a photo shoot on the Seine?",
      items: [
        { icon: "camera", title: "Exceptional backdrop", text: "Eiffel Tower, Pont Alexandre III, Seine embankments as your backdrop." },
        { icon: "sunset", title: "Golden hour", text: "Natural golden light for stunning photos." },
        { icon: "film", title: "Proven location", text: "Already used by Adidas, Le Slip Français, Paris 2024 Olympics." },
        { icon: "lock", title: "Total privacy", text: "No passers-by in your frame. Your photographer works freely." },
      ],
    },
    {
      type: "gallery",
      title: "Photo shoots on the Seine",
      images: [
        { src: "/images/gallery/2025-04-04-a-17.33.30_ea0b05c2.webp", alt: "Photo shoot on the Seine with the Eiffel Tower" },
        { src: "/images/gallery/2025-04-08-a-20.57.33_c61d5f00.webp", alt: "Golden hour on the Seine for a shoot" },
        { src: "/images/gallery/2025-04-18-a-09.55.02_4b9f3852.webp", alt: "View from the boat during a shoot" },
        { src: "/images/gallery/2025-03-03-a-16.00.26_b41cf5f5.webp", alt: "The Senang under the bridges of Paris" },
      ],
    },
    { type: "testimonials", title: "They chose the Senang", filter: "shooting" },
    { type: "pricing", title: "Our photo shoot packages" },
    {
      type: "faq",
      title: "Frequently asked questions – Photo shoot",
      items: [
        { question: "Can we bring a professional photographer?", answer: "Of course! Your photographer is welcome on board. They can move freely around the boat to vary the angles." },
        { question: "What's the best time slot for lighting?", answer: "The golden hour (1 hour before sunset) offers the most beautiful light. Book this slot in advance as it's very popular." },
        { question: "Is the boat stable enough for photos?", answer: "Yes, the Senang cruises slowly and provides a stable ride. No annoying vibrations for your shots." },
        { question: "Can we do a fashion/lookbook shoot?", answer: "Absolutely. Several brands have already filmed on board (Adidas, Le Slip Français). The backdrop changes naturally as you cruise." },
        { question: "How much does a shoot on the Seine cost?", answer: "From 480€ (basic package, 2 hours). The rate is the same as for a standard cruise." },
      ],
    },
  ],
};

export default translation;
