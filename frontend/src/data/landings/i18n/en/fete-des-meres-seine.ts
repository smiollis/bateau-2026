import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: {
    title: "Mother's Day on the Seine – Gift Cruise in Paris",
    description:
      "Treat your mum to a private cruise on the Seine for Mother's Day. Champagne, Eiffel Tower, family time. From 480€.",
  },
  hero: {
    title: "Mother's Day on the Seine",
    subtitle:
      "The most beautiful gift for mum — a private cruise in the heart of Paris",
    cta: { text: "Gift the Cruise" },
  },
  sections: [
    {
      type: "richtext",
      title: "The perfect Mother's Day gift",
      content: `<p>This year, forget flowers and perfume. Treat your mum to an <strong>unforgettable moment on the Seine</strong>. The Senang, a 12-metre boat privatised for your family, cruises for 2 hours past Paris's most beautiful landmarks.</p>

<p>Imagine her surprise: a <strong>boat just for her</strong>, a glass of champagne, the Eiffel Tower gliding by, and the whole family together. It's so much more than a gift — it's a memory that will last forever.</p>

<p>The <strong>festive package</strong> (540€) includes champagne, ideal for a family toast. You can also prepare a floating brunch or order our charcuterie boards. The BYO concept lets you bring cake, drinks and everything mum loves.</p>

<p>The Senang welcomes <strong>2 to 12 guests</strong>: perfect for bringing together siblings, grandchildren and grandparents around mum. Children are welcome and those under 3 travel free.</p>

<p>We offer personalised <strong>gift vouchers</strong> to give on the day. Departure from Port de l'Arsenal at Bastille. Book the sunset slot for magical light in the family photos.</p>`,
    },
    {
      type: "benefits",
      title: "Why the Seine for Mother's Day?",
      items: [
        { icon: "gift", title: "Unique gift", text: "An unforgettable memory, much better than an object. Gift voucher available." },
        { icon: "heart", title: "Family moment", text: "Bring the whole family together around mum on the Seine." },
        { icon: "champagne", title: "Champagne included", text: "Festive package with champagne for a family toast." },
        { icon: "camera", title: "Photo memories", text: "The Eiffel Tower and Paris bridges as your backdrop." },
      ],
    },
    {
      type: "gallery",
      title: "Mother's Day on the Seine",
      images: [
        { src: "/images/gallery/2025-04-08-a-20.58.31_fcc03538.webp", alt: "Family gathered on the Seine for Mother's Day" },
        { src: "/images/gallery/2025-04-08-a-21.50.25_ac11bce0.webp", alt: "Family togetherness moments on board" },
        { src: "/images/gallery/2025-04-08-a-20.57.33_c61d5f00.webp", alt: "Sunset on the Seine" },
        { src: "/images/gallery/2025-07-27-a-12.22.05_77ed38c8.webp", alt: "Family cruise through the heart of Paris" },
      ],
    },
    { type: "testimonials", title: "They loved their cruise", filter: "famille" },
    { type: "pricing", title: "Our Mother's Day packages" },
    {
      type: "faq",
      title: "Frequently asked questions – Mother's Day",
      items: [
        { question: "Do you offer gift vouchers?", answer: "Yes! We offer personalised gift vouchers, printable or sent by email. Ideal for keeping the surprise until the big day." },
        { question: "Can we bring young children?", answer: "Of course! Child life jackets provided, pushchair stored at the port. Children under 3 travel free." },
        { question: "Can we bring a cake?", answer: "Absolutely! Cake, flowers, gifts, brunch... Bring everything that will make mum happy." },
        { question: "What time slot do you recommend?", answer: "The sunset slot (varies by season) offers the most beautiful light for photos and the most romantic atmosphere." },
        { question: "What's the maximum number of guests?", answer: "The Senang welcomes up to 12 people. Base rate for 1 to 6 (480€ basic), +80€ per person beyond." },
      ],
    },
  ],
};

export default translation;
