import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: {
    title: "Drinks on a Boat on the Seine – Private Aperitif in Paris",
    description:
      "Organize drinks on the Seine aboard a private boat. BYO (bring your own drinks), 2-hour cruise, 2 to 12 guests. From 62€/person.",
  },
  hero: {
    title: "Drinks on a Boat on the Seine",
    subtitle:
      "The coolest aperitif in Paris — on the water, with your mates",
    cta: { text: "Book Your Drinks Cruise" },
  },
  sections: [
    {
      type: "richtext",
      title: "The best aperitif in Paris",
      content: `<p>Why have drinks in a bar when you can have them <strong>on the Seine</strong>? The Senang offers you the simplest and most brilliant concept in Paris: a 12-metre privatised boat, your drinks, your friends, and 2 hours of cruising through the heart of the capital.</p>

<p>The concept is <strong>BYO (Bring Your Own)</strong>: bring beers, wine, rosé, cocktails, crisps, charcuterie, pizza... Whatever you want. Zero supplement, zero hassle. It's your aperitif, your vibe. Plug your playlist into the Bluetooth speaker and off you go.</p>

<p>At <strong>480€ for 6 people</strong> (that's 80€ each), it's the most accessible activity in Paris for a truly original experience. Afterwork with colleagues, birthday drinks, evening with mates, pre-party... Any excuse will do.</p>

<p>While Captain Michel steers, you enjoy the <strong>Parisian panorama</strong>: Eiffel Tower, Notre-Dame, Pont Alexandre III, Seine embankments... All with a glass in hand. Much better than a crowded terrace.</p>

<p>Departure from the <strong>Port de l'Arsenal at Bastille</strong>. After the cruise, you're steps away from neighbourhood bars to carry on. We also offer <strong>charcuterie boards</strong> on request if you'd rather we take care of everything.</p>`,
    },
    {
      type: "benefits",
      title: "Why drinks on the Seine?",
      items: [
        { icon: "beer", title: "Total BYO", text: "Bring all your drinks and food. Zero supplement." },
        { icon: "wallet", title: "From 80€/person", text: "480€ for 6 = the best value for money in Paris." },
        { icon: "music", title: "Your music", text: "Bluetooth speaker provided. Your playlist, your vibe." },
        { icon: "mapPin", title: "Bastille departure", text: "Central Paris. Continue the evening after the cruise." },
      ],
    },
    {
      type: "gallery",
      title: "Drinks on the Seine",
      images: [
        { src: "/images/gallery/2025-04-08-a-20.58.14_0b6ddf22.webp", alt: "Aperitif with friends on the Seine" },
        { src: "/images/gallery/2025-04-08-a-22.20.42_88a4983b.webp", alt: "Relaxed drinks atmosphere on board" },
        { src: "/images/gallery/2025-04-08-a-22.20.47_261af646.webp", alt: "Group enjoying drinks on the Senang" },
        { src: "/images/gallery/2025-04-04-a-17.33.30_ea0b05c2.webp", alt: "Drinks cruise through the heart of Paris" },
      ],
    },
    { type: "testimonials", title: "They had drinks on the Seine", filter: "apero" },
    { type: "pricing", title: "Our drinks packages" },
    {
      type: "faq",
      title: "Frequently asked questions – Boat drinks",
      items: [
        { question: "Can we really bring anything we want?", answer: "Yes! Beers, wine, cocktails, crisps, pizza, charcuterie... Everything's allowed. We just ask that you take your rubbish with you." },
        { question: "How much does it cost per person?", answer: "480€ for 1 to 6 people = 80€/person for 6 friends. Beyond that, +80€ per person (max 12)." },
        { question: "Is there a fridge on board?", answer: "No, but bring a cool box! The captain will help you set it up on board. Tip: bring ice to keep the rosé chilled." },
        { question: "Can we book for an afterwork?", answer: "Absolutely! The 6pm-8pm weekday slot is perfect. Bastille departure, ideal after work." },
        { question: "Do you offer charcuterie boards?", answer: "Yes, we offer charcuterie and cheese boards on request. Let us know 48 hours in advance." },
      ],
    },
  ],
};

export default translation;
