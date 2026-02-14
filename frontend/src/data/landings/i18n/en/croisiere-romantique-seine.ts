import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: {
    title: "Romantic Cruise on the Seine – Private Evening in Paris",
    description:
      "Enjoy a private romantic cruise on the Seine. 2 hours for two with champagne, sunset and illuminated monuments. From 540€.",
  },
  hero: {
    title: "Romantic Cruise on the Seine",
    subtitle:
      "Experience a magical moment for two on the water, with Paris as your backdrop",
    cta: { text: "Book Your Evening" },
  },
  sections: [
    {
      type: "richtext",
      title: "An unforgettable romantic evening in Paris",
      content: `<p>Paris is the city of love, and there is no better way to discover it as a couple than along the Seine. Embark on a <strong>private romantic cruise</strong> aboard the Senang, an elegant 12-metre boat, just for the two of you.</p>

<p>During <strong>2 hours of cruising</strong>, let yourself be carried away by the magic of Paris at sunset. The Eiffel Tower lighting up, the golden reflections on the Seine, the Pont Alexandre III adorned with its lampposts... Every moment is a living postcard.</p>

<p>With the <strong>festive package</strong>, enjoy a complimentary glass of champagne each, toasting facing the Eiffel Tower. You can also prepare a gourmet picnic or order our charcuterie boards to make the moment even more special.</p>

<p>The Senang is <strong>entirely privatised</strong>: no tourist groups, no noise, just the gentle lapping of water and the murmur of the city. Captain Michel, discreet and professional, lets you savour your privacy while ensuring a smooth cruise.</p>

<p>Whether for a <strong>couple's anniversary</strong>, a romantic surprise, or simply to escape the everyday, this cruise offers you an exceptional setting. Departure from Port de l'Arsenal at Bastille, easily accessible by metro.</p>

<p>For an even more memorable experience, book the sunset slot: the golden hour on the Seine is a spectacle you won't forget. <strong>The Senang, a veteran of the Paris 2024 Olympics</strong>, offers an exceptional setting for your romantic evening.</p>`,
    },
    {
      type: "benefits",
      title: "Why choose a romantic cruise on the Seine?",
      items: [
        {
          icon: "heart",
          title: "Total privacy",
          text: "Boat privatised just for the two of you (or your small group).",
        },
        {
          icon: "champagne",
          title: "Champagne included",
          text: "Toast facing the Eiffel Tower with the festive package.",
        },
        {
          icon: "sunset",
          title: "Sunset",
          text: "Book the golden hour slot for a magical moment.",
        },
        {
          icon: "utensils",
          title: "Dining on board",
          text: "Bring your picnic or order our charcuterie boards.",
        },
      ],
    },
    {
      type: "gallery",
      title: "Romantic moments on the Seine",
      images: [
        {
          src: "/images/gallery/2025-04-08-a-20.57.33_c61d5f00.webp",
          alt: "Romantic sunset on the Seine",
        },
        {
          src: "/images/gallery/2025-03-02-a-21.18.40_52501437.webp",
          alt: "Romantic cruise at dusk in Paris",
        },
        {
          src: "/images/gallery/2025-04-08-a-20.58.31_fcc03538.webp",
          alt: "The Senang cruising under the bridges of Paris",
        },
        {
          src: "/images/gallery/2025-04-15-a-22.21.11_0329a51a.webp",
          alt: "Romantic evening aboard the Senang",
        },
      ],
    },
    {
      type: "testimonials",
      title: "They experienced the magic",
      filter: "romantique",
    },
    {
      type: "pricing",
      title: "Our packages for a romantic evening",
    },
    {
      type: "faq",
      title: "Frequently asked questions – Romantic cruise",
      items: [
        {
          question: "Can we book for just two people?",
          answer:
            "Absolutely! The boat is privatised even for a couple. The base rate covers 1 to 6 people, so you'll have the entire boat to yourselves.",
        },
        {
          question: "What's the best time for a romantic cruise?",
          answer:
            "Sunset is the most popular slot: the golden light on the monuments and the Eiffel Tower lighting up create a magical moment. Book in advance for this slot.",
        },
        {
          question: "Can we organise a surprise?",
          answer:
            "Yes! Contact us to prepare a surprise: special decorations, champagne, rose petals... We'll help you create the perfect moment.",
        },
        {
          question: "Can we bring a meal on board?",
          answer:
            "Yes, you can prepare a gourmet picnic or a meal platter. We also offer charcuterie boards on request.",
        },
        {
          question: "How much does a romantic cruise cost?",
          answer:
            "From 480€ (basic package) or 540€ (festive package with champagne) for a 2-hour private cruise.",
        },
      ],
    },
  ],
};

export default translation;
