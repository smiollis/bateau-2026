import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: {
    title: "Marriage Proposal on the Seine – Private Surprise in Paris",
    description:
      "Organize an unforgettable marriage proposal on the Seine. Private boat, champagne, fairytale setting facing the Eiffel Tower. Help with planning included.",
  },
  hero: {
    title: "Marriage Proposal on the Seine",
    subtitle:
      "The most beautiful 'yes' of your life, facing the Eiffel Tower",
    cta: { text: "Plan Your Proposal" },
  },
  sections: [
    {
      type: "richtext",
      title: "An original marriage proposal in Paris",
      content: `<p>Dreaming of an <strong>original marriage proposal in Paris</strong>? Picture this: you're aboard a private boat on the Seine, the sun is setting behind the Eiffel Tower, and you get down on one knee... A timeless moment your partner will never forget.</p>

<p>The Senang is the ideal setting for a <strong>marriage proposal on the Seine</strong>. This elegant, intimate 12-metre boat is entirely privatised for you. No outside eyes, no tourists: just you, your other half, and Paris's most beautiful landmarks as your backdrop.</p>

<p>We'll help you <strong>plan the surprise</strong>. Contact us in advance to prepare the perfect moment: rose petals, flower bouquet, special playlist, discreet photographer... Captain Michel is accustomed to these emotional moments and knows how to create the ideal conditions.</p>

<p>The <strong>festive package</strong> includes a glass of champagne to celebrate the 'yes'. You can also bring your own champagne, a cake or a meal to turn the cruise into a romantic dinner on the water.</p>

<p>The most magical moment? When the boat passes the Eiffel Tower at nightfall and the <strong>twinkling lights</strong> come on. That's the moment most of our couples choose to pop the big question.</p>

<p>Departure from the <strong>Port de l'Arsenal at Bastille</strong>. Easy to disguise as a 'simple stroll on the Seine' to keep the surprise. The Senang, which sailed for the <strong>Paris 2024 Olympics</strong>, offers an exceptional setting for the most beautiful day of your life.</p>`,
    },
    {
      type: "benefits",
      title: "Why propose on the Seine?",
      items: [
        {
          icon: "heart",
          title: "Fairytale setting",
          text: "The illuminated Eiffel Tower as your backdrop for the big moment.",
        },
        {
          icon: "eyeOff",
          title: "Surprise guaranteed",
          text: "We help you plan the surprise with complete discretion.",
        },
        {
          icon: "camera",
          title: "Optional photographer",
          text: "Capture the moment with a discreet photographer on board.",
        },
        {
          icon: "sparkles",
          title: "Bespoke decorations",
          text: "Petals, candles, flowers... We prepare everything for you.",
        },
      ],
    },
    {
      type: "gallery",
      title: "Dream proposals",
      images: [
        {
          src: "/images/gallery/2025-03-02-a-21.18.40_52501437.webp",
          alt: "Marriage proposal at sunset on the Seine",
        },
        {
          src: "/images/gallery/2025-04-08-a-20.57.33_c61d5f00.webp",
          alt: "Romantic cruise for a marriage proposal in Paris",
        },
        {
          src: "/images/gallery/2025-04-15-a-22.21.11_0329a51a.webp",
          alt: "Intimate atmosphere aboard the Senang",
        },
        {
          src: "/images/gallery/2025-04-08-a-21.50.25_ac11bce0.webp",
          alt: "Paris illuminated from the Senang",
        },
      ],
    },
    {
      type: "testimonials",
      title: "They said yes on the Seine",
      filter: "mariage",
    },
    {
      type: "pricing",
      title: "Our packages for your proposal",
    },
    {
      type: "faq",
      title: "Frequently asked questions – Marriage proposal",
      items: [
        {
          question: "How can I plan the surprise without my partner knowing?",
          answer:
            "Present the outing as a simple stroll on the Seine. Contact us in advance to coordinate the details (decorations, timing, photographer) without your partner suspecting a thing.",
        },
        {
          question: "Can we have a photographer on board?",
          answer:
            "Yes! You can invite a professional photographer on board to capture the moment. Contact us and we'll help arrange their discreet presence.",
        },
        {
          question: "What's the best moment for the proposal?",
          answer:
            "The sunset slot is the most romantic. Passing the illuminated Eiffel Tower (in the evening) is the most popular moment for popping the question.",
        },
        {
          question: "Can we customise the boat decorations?",
          answer:
            "Absolutely! Rose petals, LED candles, balloons, banners... You can bring your own decorations or let us handle the preparation with our All-Inclusive package.",
        },
        {
          question: "How much does a proposal on the Seine cost?",
          answer:
            "From 540€ for the festive package (champagne included). The All-Inclusive package with decorations and catering is available on request.",
        },
      ],
    },
  ],
};

export default translation;
