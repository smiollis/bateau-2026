import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: {
    title: "Birthday on the Seine – Private Boat Party in Paris",
    description:
      "Celebrate your birthday on the Seine aboard a private boat. Up to 12 guests, champagne, bring your cake. 2-hour cruise in the heart of Paris.",
  },
  hero: {
    title: "Celebrate Your Birthday on the Seine",
    subtitle:
      "An unforgettable birthday aboard a private boat in the heart of Paris",
    cta: { text: "Book Your Birthday" },
  },
  sections: [
    {
      type: "richtext",
      title: "An original birthday on the Seine",
      content: `<p>Looking for an original idea to <strong>celebrate a birthday in Paris</strong>? Embark with your loved ones aboard the Senang for a 2-hour private cruise on the Seine. From the Eiffel Tower to Notre-Dame, enjoy an exceptional panorama to blow out your candles.</p>

<p>The Senang is a 12-metre boat <strong>entirely privatised for your group</strong> of 2 to 12 guests. No noisy neighbours: it's your party, your vibe, your moment. You're free to bring your birthday cake, gifts and decorations.</p>

<p>With the <strong>festive package</strong>, each guest receives a glass of champagne for the toast. You can also bring your own drinks and food, or order our charcuterie boards for a convivial cruise.</p>

<p>Connect your birthday playlist on the <strong>Bluetooth speaker</strong> provided and let Captain Michel navigate while you enjoy your guests. The route passes Paris's most beautiful landmarks: Eiffel Tower, Musée d'Orsay, Île de la Cité, Pont Neuf...</p>

<p>Whether you're celebrating your 30th, 40th, 50th or beyond, this <strong>birthday cruise</strong> suits every mood: family afternoon, evening with friends, or romantic dinner for two. Departure from Port de l'Arsenal at Bastille (Paris 12th).</p>

<p>The Senang, a <strong>veteran of the Paris 2024 Olympics</strong> and filming location for Adidas, offers an exceptional setting to celebrate in style. A birthday your guests won't forget anytime soon.</p>`,
    },
    {
      type: "benefits",
      title: "Why celebrate your birthday on the Seine?",
      items: [
        {
          icon: "cake",
          title: "Cake on board",
          text: "Bring your birthday cake and blow out your candles facing Paris.",
        },
        {
          icon: "users",
          title: "Up to 12 guests",
          text: "The boat is privatised for your group, intimate atmosphere guaranteed.",
        },
        {
          icon: "champagne",
          title: "Complimentary champagne",
          text: "A glass per person with the festive package for the toast.",
        },
        {
          icon: "music",
          title: "Your playlist",
          text: "Bluetooth speaker available for your party soundtrack.",
        },
      ],
    },
    {
      type: "gallery",
      title: "Birthday parties on the Seine",
      images: [
        {
          src: "/images/gallery/2025-04-08-a-20.58.31_fcc03538.webp",
          alt: "Birthday party on the Seine in Paris",
        },
        {
          src: "/images/gallery/2025-04-08-a-20.57.33_c61d5f00.webp",
          alt: "Group celebrating a birthday on the boat",
        },
        {
          src: "/images/gallery/2025-04-08-a-22.20.47_261af646.webp",
          alt: "The Senang cruising for a birthday",
        },
        {
          src: "/images/gallery/2025-03-03-a-16.00.24_c635ba48.webp",
          alt: "View of Paris bridges from the boat",
        },
      ],
    },
    {
      type: "testimonials",
      title: "They celebrated their birthday on the Seine",
      filter: "anniversaire",
    },
    {
      type: "pricing",
      title: "Our birthday packages",
    },
    {
      type: "faq",
      title: "Frequently asked questions – Birthday on the Seine",
      items: [
        {
          question: "Can we bring a birthday cake?",
          answer:
            "Of course! You can bring your cake, candles, and everything you need to celebrate. We have a small table on board to set it up.",
        },
        {
          question: "How many people can be invited?",
          answer:
            "The Senang welcomes up to 12 guests. The base rate covers 1 to 6 people, then 110€ per additional person.",
        },
        {
          question: "Are children welcome on board?",
          answer:
            "Yes, children are welcome. Suitable life jackets are available on board. Children under 3 are free.",
        },
        {
          question: "Can we bring decorations?",
          answer:
            "Absolutely! Balloons, banners, garlands... You're free to decorate the boat for the occasion. We just ask that you don't use confetti.",
        },
        {
          question: "How much does a birthday on the Seine cost?",
          answer:
            "From 480€ (basic package) or 540€ (festive package with champagne) for a group of up to 6 people. +110€ per person beyond that.",
        },
      ],
    },
  ],
};

export default translation;
