import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: {
    title: "Team Building on the Seine – Corporate Outing in Paris",
    description:
      "Organize an original team building on the Seine. Private boat for 2 to 12 colleagues, drinks, 2-hour cruise. Business invoicing available.",
  },
  hero: {
    title: "Team Building on the Seine",
    subtitle:
      "Strengthen your team's cohesion with a private cruise in the heart of Paris",
    cta: { text: "Book Your Team Building" },
  },
  sections: [
    {
      type: "richtext",
      title: "An extraordinary team building experience",
      content: `<p>Looking for an <strong>original corporate outing in Paris</strong>? Forget escape rooms and bowling: take your team on the Seine for a team building everyone will talk about. The Senang, a 12-metre privatised boat, offers a unique setting to strengthen bonds between colleagues.</p>

<p>During <strong>2 hours of cruising</strong>, your team of 2 to 12 enjoys an exceptional panorama: Eiffel Tower, Notre-Dame, Musée d'Orsay... Away from the office walls, conversations flow freely and ideas spark. Ideal for an afterwork, a retirement party or celebrating a team success.</p>

<p>Flexible format: <strong>BYO drinks on board</strong> (bring your own drinks and platters) or opt for the festive package with champagne included. Bluetooth speaker available for background music.</p>

<p><strong>Business invoicing</strong> available on request. We issue a compliant invoice with VAT for business expense processing. Contact us for a bespoke quote if you'd like the All-Inclusive package with catering.</p>

<p>Departure from the <strong>Port de l'Arsenal at Bastille</strong>, easily accessible by metro. The Senang, a <strong>veteran of the Paris 2024 Olympics</strong> and Adidas filming location, will impress your colleagues.</p>`,
    },
    {
      type: "benefits",
      title: "Why a team building on the Seine?",
      items: [
        { icon: "briefcase", title: "Business invoicing", text: "Professional invoicing available. Can be claimed as a business expense." },
        { icon: "users", title: "Up to 12 people", text: "Ideal format for a close-knit team. Friendly atmosphere guaranteed." },
        { icon: "utensils", title: "Catering available", text: "All-Inclusive package with platters, buffet or catering on request." },
        { icon: "mapPin", title: "Bastille departure", text: "Easily accessible by metro. Afterwork possible after the cruise." },
      ],
    },
    {
      type: "gallery",
      title: "Team building events on the Seine",
      images: [
        { src: "/images/gallery/2025-04-08-a-22.20.47_261af646.webp", alt: "Team building on the Seine" },
        { src: "/images/gallery/2025-04-08-a-20.58.14_0b6ddf22.webp", alt: "Corporate cruise in Paris" },
        { src: "/images/gallery/2025-03-03-a-16.00.26_b41cf5f5.webp", alt: "The Senang under the bridges of Paris" },
        { src: "/images/gallery/2025-04-08-a-22.20.42_88a4983b.webp", alt: "Friendly atmosphere on board" },
      ],
    },
    { type: "testimonials", title: "They chose the Senang", filter: "team-building" },
    { type: "pricing", title: "Our team building packages" },
    {
      type: "faq",
      title: "Frequently asked questions – Team building",
      items: [
        { question: "Can we get a business invoice?", answer: "Yes, we issue a compliant invoice with VAT for business expense processing. Contact us by email." },
        { question: "What format for an afterwork?", answer: "The 6pm-8pm weekday slot is ideal. Basic package at 480€ or festive at 540€, your team brings the drinks." },
        { question: "Can we organise activities on board?", answer: "The boat is ideal for informal discussions, brainstorming or team quizzes. The space is open and convivial." },
        { question: "What's the maximum number of colleagues?", answer: "The Senang welcomes up to 12 people. For larger groups, contact us to explore options." },
        { question: "What's the price?", answer: "From 480€ for 1 to 6 people, +80€ per person beyond. All-Inclusive package with catering available on request." },
      ],
    },
  ],
};

export default translation;
