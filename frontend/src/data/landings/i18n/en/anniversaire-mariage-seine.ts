import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: {
    title: "Wedding Anniversary on the Seine – Private Cruise",
    description:
      "Celebrate your wedding anniversary on the Seine. Private cruise for 2 to 12 guests, champagne, romantic setting facing the Eiffel Tower.",
  },
  hero: {
    title: "Wedding Anniversary on the Seine",
    subtitle:
      "Rekindle the magic of your love with a private cruise in Paris",
    cta: { text: "Book Your Cruise" },
  },
  sections: [
    {
      type: "richtext",
      title: "A cruise to celebrate your love",
      content: `<p>Whether you're marking your <strong>cotton, silver or golden anniversary</strong>, a wedding anniversary deserves an exceptional setting. Aboard the Senang, a 12-metre boat privatised just for you, relive the emotion of your commitment along the Seine.</p>

<p>During <strong>2 hours of cruising</strong>, let Paris unfold before your eyes: the illuminated Eiffel Tower, the Pont Alexandre III, Notre-Dame... A romantic backdrop that has made the City of Light world-famous. Toast with a <strong>complimentary glass of champagne</strong> with the festive package.</p>

<p>You can organise a <strong>romantic dinner on board</strong> by bringing your own meal, your caterer, or by ordering our charcuterie boards. Captain Michel, discreet and attentive, ensures a smooth cruise while you enjoy your evening.</p>

<p>Invite your loved ones to celebrate together: the Senang welcomes <strong>up to 12 guests</strong>. Whether as a couple or in small company with your witnesses and close friends, the intimacy of the boat creates a warm and moving atmosphere.</p>

<p>Departure from the <strong>Port de l'Arsenal at Bastille</strong> (Paris 12th). The Senang, which sailed for the <strong>Paris 2024 Olympics</strong>, offers an exceptional setting to renew your promise.</p>`,
    },
    {
      type: "benefits",
      title: "Why celebrate on the Seine?",
      items: [
        { icon: "heart", title: "Absolute romance", text: "Illuminated Paris as your backdrop to renew your commitment." },
        { icon: "champagne", title: "Complimentary champagne", text: "Toast to your love with the festive package." },
        { icon: "users", title: "Family and friends", text: "Invite up to 12 people to share the moment." },
        { icon: "utensils", title: "Dinner on board", text: "Bring your meal or order our charcuterie boards." },
      ],
    },
    {
      type: "gallery",
      title: "Anniversary moments on the Seine",
      images: [
        { src: "/images/gallery/2025-03-02-a-21.18.40_52501437.webp", alt: "Wedding anniversary cruise at dusk" },
        { src: "/images/gallery/2025-04-08-a-20.57.33_c61d5f00.webp", alt: "Romantic sunset on the Seine" },
        { src: "/images/gallery/2025-04-15-a-22.21.11_0329a51a.webp", alt: "Intimate evening aboard the Senang" },
        { src: "/images/gallery/2025-04-08-a-21.50.25_ac11bce0.webp", alt: "Paris illuminated for a wedding anniversary" },
      ],
    },
    { type: "testimonials", title: "They celebrated their love", filter: "mariage" },
    { type: "pricing", title: "Our wedding anniversary packages" },
    {
      type: "faq",
      title: "Frequently asked questions – Wedding anniversary",
      items: [
        { question: "Can we organise a surprise for our spouse?", answer: "Of course! Contact us in advance to coordinate decorations, champagne and the arrival on board without raising suspicion." },
        { question: "Can we bring a cake or meal?", answer: "Yes, you're free to bring a cake, catered meal or gourmet picnic. We have a table on board." },
        { question: "What's the best time slot?", answer: "Sunset is the most romantic. In winter, the night cruise offers beautifully illuminated monuments." },
        { question: "Can we bring children?", answer: "Yes, children are welcome. Child-sized life jackets are available. Children under 3 are free." },
        { question: "How much does the cruise cost?", answer: "From 480€ (basic package) or 540€ (festive package with champagne) for 1 to 6 people." },
      ],
    },
  ],
};

export default translation;
