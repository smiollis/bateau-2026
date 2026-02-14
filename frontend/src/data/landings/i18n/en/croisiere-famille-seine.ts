import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: {
    title: "Family Cruise on the Seine – Private Boat in Paris",
    description:
      "Treat your family to a private cruise on the Seine. Children welcome, safe boat, 2 hours between the Eiffel Tower and Notre-Dame.",
  },
  hero: {
    title: "Family Cruise on the Seine",
    subtitle:
      "A multigenerational sharing moment aboard a private boat",
    cta: { text: "Book a Family Cruise" },
  },
  sections: [
    {
      type: "richtext",
      title: "Paris with the family from the Seine",
      content: `<p>Give your loved ones an unforgettable memory: a <strong>family cruise on the Seine</strong> aboard the Senang. This 12-metre boat, safe and intimate, is privatised just for your family — from 2 to 12 people, from grandparents to grandchildren.</p>

<p>During <strong>2 hours</strong>, discover Paris's landmarks from a unique perspective: the Eiffel Tower, Notre-Dame de Paris, the Louvre, historic bridges... Children love cruising and seeing Paris from the water. It's also the perfect opportunity to share the capital's history.</p>

<p>The Senang is equipped with <strong>life jackets for adults and children</strong>. Captain Michel ensures everyone's safety while you enjoy the scenery. Children under 3 travel free.</p>

<p>You're free to bring a <strong>family picnic</strong>, a birthday cake or snacks for the kids. The festive package includes a glass of champagne for adults — perfect for a family toast.</p>

<p>Ideal for a <strong>family reunion</strong>, a birthday, school holidays or simply a Sunday with the family. Departure from Port de l'Arsenal at Bastille, easily accessible by metro and pushchair.</p>`,
    },
    {
      type: "benefits",
      title: "Why choose a family cruise?",
      items: [
        { icon: "shield", title: "Child safety", text: "Suitable life jackets, stable and safe boat." },
        { icon: "users", title: "3 generations", text: "2 to 12 people, from grandchildren to grandparents." },
        { icon: "utensils", title: "BYO picnic", text: "Bring snacks, cake and drinks for the whole family." },
        { icon: "baby", title: "Free for toddlers", text: "Free for children under 3. Pushchairs welcome at the port." },
      ],
    },
    {
      type: "gallery",
      title: "Families on the Seine",
      images: [
        { src: "/images/gallery/2025-04-08-a-20.58.31_fcc03538.webp", alt: "Family enjoying a cruise on the Seine" },
        { src: "/images/gallery/2025-04-08-a-20.57.33_c61d5f00.webp", alt: "Family moments of togetherness on board" },
        { src: "/images/gallery/2025-03-03-a-16.00.24_c635ba48.webp", alt: "View of Paris bridges from the boat" },
        { src: "/images/gallery/2025-07-27-a-12.22.05_77ed38c8.webp", alt: "Family cruise through the heart of Paris" },
      ],
    },
    { type: "testimonials", title: "Happy families", filter: "famille" },
    { type: "pricing", title: "Our family packages" },
    {
      type: "faq",
      title: "Frequently asked questions – Family cruise",
      items: [
        { question: "Are children safe on board?", answer: "Yes, the Senang is equipped with adult and child life jackets. The boat is stable and the captain ensures everyone's safety." },
        { question: "What's the minimum age to board?", answer: "There's no minimum age. Babies and young children are welcome. Children under 3 travel free." },
        { question: "Can we bring a pushchair?", answer: "Yes, Port de l'Arsenal is pushchair-accessible. The pushchair can be left on the quay during the cruise." },
        { question: "What's the maximum number of people?", answer: "The Senang welcomes up to 12 people (including children). Base rate for 1 to 6 people, +110€ per person beyond." },
        { question: "Can we bring food for the children?", answer: "Absolutely! Snacks, bottles, cake... Bring everything you need. We have a small table on board." },
      ],
    },
  ],
};

export default translation;
