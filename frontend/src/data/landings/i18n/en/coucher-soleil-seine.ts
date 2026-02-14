import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: {
    title: "Sunset Cruise on the Seine – Golden Hour in Paris",
    description:
      "Experience the golden hour on the Seine. 2-hour private cruise at sunset, illuminated Eiffel Tower, champagne. From 480€.",
  },
  hero: {
    title: "Sunset Cruise on the Seine",
    subtitle:
      "The Parisian golden hour seen from the water — an unforgettable spectacle",
    cta: { text: "Book the Sunset Cruise" },
  },
  sections: [
    {
      type: "richtext",
      title: "The most beautiful light in Paris",
      content: `<p>There's a magical moment in Paris: when the sun dips behind the Eiffel Tower and the city dresses in gold. Experience this spectacle from the Seine aboard the Senang, a 12-metre boat <strong>privatised for your group</strong>.</p>

<p>The <strong>sunset cruise</strong> is our most popular time slot — and for good reason. During 2 hours, you witness the transformation of Paris: golden reflections on the Seine, long shadows on the embankments, then the monuments lighting up one by one.</p>

<p>The highlight? Passing the <strong>Eiffel Tower as its lights begin to sparkle</strong>. A breathtaking spectacle, even more impressive from the water. The Pont Alexandre III, the Grand Palais, the Musée d'Orsay... Every landmark takes on a fairytale dimension at nightfall.</p>

<p>With the <strong>festive package</strong>, toast with champagne facing this panorama. You can also prepare a romantic picnic or order our charcuterie boards. The Bluetooth speaker is available for your ambient playlist.</p>

<p>This time slot is ideal for a <strong>romantic date</strong>, a birthday, a photo shoot or simply to enjoy Paris differently. Departure from Port de l'Arsenal at Bastille. Book ahead: golden hour slots sell out fast!</p>`,
    },
    {
      type: "benefits",
      title: "Why the sunset?",
      items: [
        { icon: "sunset", title: "Golden hour", text: "The most beautiful light in Paris, golden reflections on the Seine." },
        { icon: "sparkles", title: "Sparkling Eiffel Tower", text: "Watch the illumination from the water." },
        { icon: "camera", title: "Stunning photos", text: "The best time slot for unforgettable photos." },
        { icon: "champagne", title: "Champagne at sunset", text: "Toast facing the blazing sky with the festive package." },
      ],
    },
    {
      type: "gallery",
      title: "Sunsets on the Seine",
      images: [
        { src: "/images/gallery/2025-04-08-a-20.57.33_c61d5f00.webp", alt: "Sunset on the Seine in Paris" },
        { src: "/images/gallery/2025-03-02-a-21.18.40_52501437.webp", alt: "Golden hour on the Seine with the Senang" },
        { src: "/images/gallery/2025-04-08-a-21.50.25_ac11bce0.webp", alt: "Paris illuminated at dusk from the Seine" },
        { src: "/images/gallery/2025-04-15-a-22.21.11_0329a51a.webp", alt: "Evening on the Senang at sunset" },
      ],
    },
    { type: "testimonials", title: "They saw the sunset", filter: "coucher-soleil" },
    { type: "pricing", title: "Our sunset packages" },
    {
      type: "faq",
      title: "Frequently asked questions – Sunset cruise",
      items: [
        { question: "What time is sunset?", answer: "The time varies with the season: around 5:30pm in winter, 9:30pm in summer. We recommend booking 1.5 hours before sunset." },
        { question: "Is this time slot more expensive?", answer: "No, the rates are the same: 480€ (basic) or 540€ (festive). But this slot is very popular — book in advance." },
        { question: "Will we see the Eiffel Tower sparkle?", answer: "Yes! If your cruise covers the top of the hour (every hour after nightfall), you'll see the 20,000 bulbs sparkle for 5 minutes." },
        { question: "What if the sky is overcast?", answer: "Even with cloud cover, the sunset light is beautiful. In case of really bad weather, we offer a free reschedule to a date of your choice." },
        { question: "Can we book for a photo shoot?", answer: "Absolutely! The golden hour is photographers' favourite time slot. The Senang has served as a location for Adidas and Le Slip Français." },
      ],
    },
  ],
};

export default translation;
