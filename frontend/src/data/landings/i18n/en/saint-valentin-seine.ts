import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: {
    title: "Valentine's Day on the Seine – Romantic Cruise in Paris",
    description:
      "Treat your partner to a private cruise on the Seine for Valentine's Day. Champagne, illuminated Eiffel Tower, 2 hours for two. From 540€.",
  },
  hero: {
    title: "Valentine's Day on the Seine",
    subtitle:
      "The most beautiful declaration of love happens on the water, facing the Eiffel Tower",
    cta: { text: "Book Valentine's Day" },
  },
  sections: [
    {
      type: "richtext",
      title: "The most romantic Valentine's Day in Paris",
      content: `<p>Forget the packed restaurants and set menus: this year, treat your partner to a <strong>private cruise on the Seine</strong> for Valentine's Day. The Senang, a 12-metre boat privatised just for the two of you, cruises for 2 hours through illuminated Paris.</p>

<p>Imagine: a <strong>glass of champagne</strong> in hand, your romantic playlist on the Bluetooth speaker, and the Eiffel Tower sparkling before you. The Pont Alexandre III, Notre-Dame, the Seine embankments bathed in light... Every minute is a memory.</p>

<p>The <strong>festive package</strong> is perfect for the occasion: champagne included, intimate atmosphere. You can also prepare a romantic picnic (cheese, macarons, strawberries...) or order our charcuterie boards. The BYO concept gives you complete freedom.</p>

<p>The <strong>sunset</strong> slot is the most sought-after for Valentine's Day. The golden hour transforms Paris into a gilded painting, then the monuments light up one by one. A breathtaking spectacle — and the perfect moment for a surprise.</p>

<p>Whether to <strong>celebrate your love</strong>, make a declaration or simply live a unique moment, Valentine's Day on the Seine is unforgettable. Departure from Port de l'Arsenal at Bastille. Book early: February slots sell out very fast!</p>`,
    },
    {
      type: "benefits",
      title: "Why Valentine's Day on the Seine?",
      items: [
        { icon: "heart", title: "100% romantic", text: "Boat privatised for 2. No other passengers, just the two of you." },
        { icon: "champagne", title: "Champagne included", text: "Festive package with champagne facing the Eiffel Tower." },
        { icon: "sparkles", title: "Sparkling Eiffel Tower", text: "The spectacle of 20,000 bulbs seen from the water." },
        { icon: "music", title: "Your playlist", text: "Bluetooth speaker provided. Create your romantic atmosphere." },
      ],
    },
    {
      type: "gallery",
      title: "Valentine's Day on the Seine",
      images: [
        { src: "/images/gallery/2025-04-08-a-20.57.33_c61d5f00.webp", alt: "Romantic cruise at sunset" },
        { src: "/images/gallery/2025-03-02-a-21.18.40_52501437.webp", alt: "Golden hour on the Seine for Valentine's Day" },
        { src: "/images/gallery/2025-04-08-a-21.50.25_ac11bce0.webp", alt: "Illuminated Paris from the Senang" },
        { src: "/images/gallery/2025-04-15-a-22.21.11_0329a51a.webp", alt: "Romantic evening aboard the Senang" },
      ],
    },
    { type: "testimonials", title: "They celebrated Valentine's Day on the Seine", filter: "romantique" },
    { type: "pricing", title: "Our Valentine's Day packages" },
    {
      type: "faq",
      title: "Frequently asked questions – Valentine's Day",
      items: [
        { question: "Should we book well in advance?", answer: "Yes! February time slots are very popular. Book at least 2 to 3 weeks ahead to secure your date." },
        { question: "Can we come as just a couple?", answer: "Absolutely! The base rate (480€ basic, 540€ festive) covers 1 to 6 people. For two, it's total privacy." },
        { question: "Can we bring a cake or flowers?", answer: "Of course! Cake, roses, candles, decorations... Prepare the surprise, we'll help you set up on board." },
        { question: "Is the boat heated in February?", answer: "The Senang is a semi-open boat. We provide blankets, but dress warmly. The cosy atmosphere is part of the charm!" },
        { question: "Can we propose on board?", answer: "It's our speciality! Contact us to organise the perfect moment: location, timing, decorations. We'll keep the secret." },
      ],
    },
  ],
};

export default translation;
