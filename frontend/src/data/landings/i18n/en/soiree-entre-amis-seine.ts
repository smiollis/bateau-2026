import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: {
    title: "Friends Night Out on the Seine – Boat Drinks in Paris",
    description:
      "Organize a night out with friends on the Seine. Private boat for up to 12, BYO drinks, your own playlist. 2-hour cruise from 480€.",
  },
  hero: {
    title: "Friends Night Out on the Seine",
    subtitle:
      "A floating drinks party in the heart of Paris, with your mates and zero hassle",
    cta: { text: "Book Your Evening" },
  },
  sections: [
    {
      type: "richtext",
      title: "An original outing with friends in Paris",
      content: `<p>Looking for an <strong>original outing with friends in Paris</strong>? Forget the crowded bars and noisy terraces: hop on the Seine for a floating drinks party aboard the Senang, a 12-metre boat entirely privatised for your group.</p>

<p>During <strong>2 hours of cruising</strong>, enjoy Paris like never before: the Eiffel Tower at sunset, Notre-Dame illuminated, the Pont Alexandre III as your backdrop... All with your mates, your drinks and your music.</p>

<p>The concept is simple: the boat is <strong>100% privatised for your group</strong> of 2 to 12. Bring whatever you want: beers, wine, pizza, picnic, cake... It's your night, zero hassle. Plug your playlist into the Bluetooth speaker and off you go.</p>

<p>The <strong>basic package at 480€</strong> (for 1 to 6 people) is the most accessible option for an afterwork with colleagues, drinks with friends or a laid-back evening out. Fancy champagne? The festive package at 540€ includes a glass per person.</p>

<p>Departure from the <strong>Port de l'Arsenal at Bastille</strong>, in central Paris. After the cruise, you're steps away from the neighbourhood's bars and restaurants to carry on the evening.</p>

<p>The Senang hosted the Mauritania delegation during the <strong>Paris 2024 Olympics</strong> and served as a filming location for Adidas and Le Slip Français. A classy setting for a relaxed evening with friends.</p>`,
    },
    {
      type: "benefits",
      title: "Why choose a boat for your night out with friends?",
      items: [
        {
          icon: "users",
          title: "Your group, your boat",
          text: "Privatised for 2 to 12 people. No tourists, no neighbours.",
        },
        {
          icon: "beer",
          title: "BYO drinks",
          text: "Bring drinks and food. Zero hassle, zero supplement.",
        },
        {
          icon: "music",
          title: "Music on board",
          text: "Bluetooth speaker provided. Your playlist, your vibe.",
        },
        {
          icon: "wallet",
          title: "From 62€/person",
          text: "480€ for 6 = 80€ each. Unbeatable value in Paris.",
        },
      ],
    },
    {
      type: "gallery",
      title: "Nights out with friends on the Seine",
      images: [
        {
          src: "/images/gallery/2025-04-08-a-22.20.47_261af646.webp",
          alt: "Group of friends enjoying a cruise on the Seine",
        },
        {
          src: "/images/gallery/2025-04-08-a-20.58.14_0b6ddf22.webp",
          alt: "Drinks with friends on the Senang",
        },
        {
          src: "/images/gallery/2025-04-08-a-22.20.42_88a4983b.webp",
          alt: "Festive atmosphere with friends on the Seine",
        },
        {
          src: "/images/gallery/2025-04-04-a-17.33.30_ea0b05c2.webp",
          alt: "Cruising with friends through the heart of Paris",
        },
      ],
    },
    {
      type: "testimonials",
      title: "They had an unforgettable evening",
      filter: "amis",
    },
    {
      type: "pricing",
      title: "Our packages for your night out with friends",
    },
    {
      type: "faq",
      title: "Frequently asked questions – Night out with friends",
      items: [
        {
          question: "Can we bring our own drinks and food?",
          answer:
            "Yes, that's the whole idea! Bring beers, wine, crisps, pizza, picnic... Whatever you like. We also offer charcuterie boards on request.",
        },
        {
          question: "How much does it cost per person?",
          answer:
            "The basic package at 480€ covers up to 6 people, that's 80€ per person. Beyond that, 80€ per additional person (max 12).",
        },
        {
          question: "Can we book for an afterwork?",
          answer:
            "Absolutely! A weekday slot in the late afternoon (6pm-8pm) is perfect for an original afterwork. The Bastille departure point is ideal after work.",
        },
        {
          question: "Is there a noise or time limit?",
          answer:
            "We generally cruise between 10am and 10:30pm. Music via the Bluetooth speaker is allowed at a reasonable volume. We ask for respect towards riverside residents.",
        },
        {
          question: "What happens if it rains?",
          answer:
            "The Senang has a protective awning. In case of really bad weather, we offer a free reschedule to a date of your choice.",
        },
      ],
    },
  ],
};

export default translation;
