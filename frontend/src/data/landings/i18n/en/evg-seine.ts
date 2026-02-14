import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: {
    title: "Stag Party on the Seine – Private Cruise in Paris",
    description:
      "Organize a memorable stag party on the Seine. Private boat for up to 12 guests, beers and champagne, 2 hours in the heart of Paris.",
  },
  hero: {
    title: "Stag Party on the Seine",
    subtitle:
      "Treat the groom to a unique, laid-back experience on the Seine",
    cta: { text: "Book Your Stag Party" },
  },
  sections: [
    {
      type: "richtext",
      title: "An Original Stag Party on the Seine",
      content: `<p>Tired of the classic bar-hopping stag do? Treat the groom to a <strong>stag party on the Seine</strong> he'll never forget. Aboard the Senang, a 12-metre boat entirely privatised, enjoy an extraordinary evening with the lads.</p>

<p>During <strong>2 hours of cruising</strong>, take in an exceptional panorama of Paris's finest landmarks: the Eiffel Tower, Notre-Dame, the Louvre, the Pont Alexandre III... All with your own music, your beers, your snacks — it's your boat for the night.</p>

<p>The Senang is <strong>100% privatised</strong> for your group of 2 to 12. No tourists, no restrictions: you're free to bring your cooler, fancy dress accessories and everything to make the night legendary. Captain Michel handles the navigation while you enjoy.</p>

<p>Our <strong>festive package</strong> includes a glass of champagne per person — perfect for toasting the groom. You can also choose the basic package and bring your own drinks and food. Bluetooth speaker available for your stag party playlist.</p>

<p>Departure from the <strong>Port de l'Arsenal at Bastille</strong> (Paris 12th), right in the heart of the capital. After the cruise, you're steps away from the Rue de Lappe and Parisian nightlife to keep the party going.</p>

<p><strong>The Senang sailed during the Paris 2024 Olympics</strong> for the Mauritania delegation and served as a set for Adidas and Le Slip Français shoots. An exceptional setting for a stag do worthy of the name.</p>`,
    },
    {
      type: "benefits",
      title: "Why choose Un Bateau à Paris for your stag party?",
      items: [
        {
          icon: "ship",
          title: "100% private boat",
          text: "The Senang exclusively for your crew, up to 12 guests.",
        },
        {
          icon: "beer",
          title: "Your drinks on board",
          text: "Bring beers, champagne and snacks. It's your night.",
        },
        {
          icon: "music",
          title: "Your playlist",
          text: "Bluetooth speaker available for guaranteed good vibes.",
        },
        {
          icon: "mapPin",
          title: "Bastille departure",
          text: "Continue the night on Rue de Lappe after the cruise.",
        },
      ],
    },
    {
      type: "gallery",
      title: "Stag party vibes on the Seine",
      images: [
        {
          src: "/images/gallery/2025-04-08-a-22.20.42_88a4983b.webp",
          alt: "Group of friends celebrating a stag party on the Seine",
        },
        {
          src: "/images/gallery/2025-04-08-a-20.58.14_0b6ddf22.webp",
          alt: "Festive cruise for a stag party in Paris",
        },
        {
          src: "/images/gallery/2025-04-08-a-21.50.25_ac11bce0.webp",
          alt: "Paris illuminated during a boat stag party",
        },
        {
          src: "/images/gallery/2025-03-03-a-16.00.26_b41cf5f5.webp",
          alt: "The Senang under the bridges of Paris",
        },
      ],
    },
    {
      type: "testimonials",
      title: "They lived it",
      filter: "evg",
    },
    {
      type: "pricing",
      title: "Our stag party packages",
    },
    {
      type: "faq",
      title: "Frequently asked questions – Stag party on the Seine",
      items: [
        {
          question: "Can we bring our own drinks for the stag do?",
          answer:
            "Yes! You can bring beers, champagne, cocktails and whatever you like. With the festive package, a glass of champagne is included for each guest.",
        },
        {
          question: "How many people for a stag party on the boat?",
          answer:
            "The Senang welcomes 2 to 12 people. The base rate covers 1 to 6 people, then 110€ per additional person.",
        },
        {
          question: "Can we play our own music?",
          answer:
            "Absolutely! A Bluetooth speaker is at your disposal. Prepare your stag party playlist and set the mood.",
        },
        {
          question: "Where is the departure point?",
          answer:
            "Departure from Port de l'Arsenal, next to Place de la Bastille (Paris 12th). Metro Bastille (lines 1, 5, 8).",
        },
        {
          question: "How much does a stag party on the Seine cost?",
          answer:
            "From 480€ for the basic package (1 to 6 people) or 540€ for the festive package with champagne. +80€ per person beyond 6.",
        },
      ],
    },
  ],
};

export default translation;
