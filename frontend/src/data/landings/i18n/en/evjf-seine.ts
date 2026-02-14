import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: {
    title: "Bachelorette Party on the Seine – Private Cruise in Paris",
    description:
      "Organize an unforgettable bachelorette party on the Seine. Private boat for up to 12 guests, complimentary champagne, 2 hours in the heart of Paris.",
  },
  hero: {
    title: "Bachelorette Party on the Seine",
    subtitle:
      "Treat the bride-to-be to an unforgettable private cruise in the heart of Paris",
    cta: { text: "Book Your Bachelorette Party" },
  },
  sections: [
    {
      type: "richtext",
      title: "A Unique Bachelorette Party on the Seine",
      content: `<p>Looking for an original idea for a <strong>bachelorette party in Paris</strong>? Forget the bars and ordinary restaurants: treat the bride-to-be to a one-of-a-kind experience aboard the Senang, an elegant 12-metre boat cruising through the heart of the capital.</p>

<p>During a <strong>2-hour private cruise</strong>, your group of 2 to 12 guests will enjoy an exceptional panorama: the illuminated Eiffel Tower, Notre-Dame de Paris, the Musée d'Orsay, the Pont Alexandre III... Picture-perfect backdrops for unforgettable photos.</p>

<p>The Senang is entirely <strong>privatised for your group</strong>. No tourists, no queues — just you and your friends in an intimate and festive atmosphere. You're free to bring your own decorations, playlist, cake and even your own caterer.</p>

<p>Our <strong>festive package</strong> includes a complimentary glass of champagne for each guest — the perfect toast to the bride-to-be with a view of Paris's iconic landmarks. Captain Michel, a veteran of the Paris 2024 Olympics, welcomes you with a smile and ensures your evening is perfect.</p>

<p>Whether you want a sunny afternoon with the girls or a magical evening at sunset, the bachelorette party on the Seine adapts to your wishes. Departure from the <strong>Port de l'Arsenal at Bastille</strong> (Paris 12th), easily accessible by metro.</p>

<p><strong>The Senang hosted the Paris 2024 Olympics</strong> (Mauritania delegation) and served as a set for Adidas and Le Slip Français shoots — an exceptional setting for your bachelorette party.</p>`,
    },
    {
      type: "benefits",
      title: "Why choose Un Bateau à Paris for your bachelorette party?",
      items: [
        {
          icon: "ship",
          title: "100% private boat",
          text: "The Senang exclusively for your group, up to 12 guests.",
        },
        {
          icon: "champagne",
          title: "Complimentary champagne",
          text: "A glass of champagne for each guest with the festive package.",
        },
        {
          icon: "camera",
          title: "Dream backdrop",
          text: "Eiffel Tower, Notre-Dame, Pont Alexandre III as your backdrop.",
        },
        {
          icon: "sparkles",
          title: "Fully customisable",
          text: "Bring your own decorations, playlist and caterer.",
        },
      ],
    },
    {
      type: "gallery",
      title: "Your bachelorette moments on the Seine",
      images: [
        {
          src: "/images/gallery/2025-04-08-a-22.20.47_261af646.webp",
          alt: "Group of women celebrating a bachelorette party on the Seine",
        },
        {
          src: "/images/gallery/2025-04-08-a-22.20.47_261af646.webp",
          alt: "Bachelorette cruise with a view of the Eiffel Tower",
        },
        {
          src: "/images/gallery/2025-04-08-a-20.57.33_c61d5f00.webp",
          alt: "Festive atmosphere aboard the Senang for a bachelorette party",
        },
        {
          src: "/images/gallery/2025-04-08-a-20.58.31_fcc03538.webp",
          alt: "Bachelorette party on the Seine at sunset",
        },
      ],
    },
    {
      type: "testimonials",
      title: "They lived it",
      filter: "evjf",
    },
    {
      type: "pricing",
      title: "Our bachelorette packages",
    },
    {
      type: "faq",
      title: "Frequently asked questions – Bachelorette on the Seine",
      items: [
        {
          question: "How many people can join the bachelorette party?",
          answer:
            "The Senang can welcome up to 12 guests for your bachelorette party on the Seine. The base rate covers 1 to 6 people, then 110€ per additional person.",
        },
        {
          question: "Can we bring our own decorations?",
          answer:
            "Absolutely! You're free to bring balloons, banners, photo props and any decorations you like.",
        },
        {
          question: "Can we bring food on board?",
          answer:
            "Yes, you can bring your own picnic, cake or caterer. We also offer charcuterie boards on request.",
        },
        {
          question: "How much does a bachelorette party on the Seine cost?",
          answer:
            "From 540€ for the festive package (champagne included) for a group of up to 6, then 90€ per additional person.",
        },
        {
          question: "How long is the cruise?",
          answer:
            "The cruise lasts 2 hours and passes by the most beautiful landmarks of Paris, from Bastille to the Eiffel Tower.",
        },
      ],
    },
  ],
};

export default translation;
