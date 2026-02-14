import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: {
    title: "Seminar on the Seine – Corporate Event by Boat in Paris",
    description:
      "Organize your seminar on the Seine. Private boat for 2 to 12 colleagues, inspiring setting, business invoicing. From 480€.",
  },
  hero: {
    title: "Seminar on the Seine",
    subtitle:
      "An inspiring setting for your team meetings — away from the office, on the water",
    cta: { text: "Book Your Seminar" },
  },
  sections: [
    {
      type: "richtext",
      title: "An off-site seminar on the Seine",
      content: `<p>Change the setting to <strong>unlock your team's creativity</strong>. The Senang, a 12-metre privatised boat, offers a unique space to organise a seminar in the heart of Paris. During 2 hours of cruising, your colleagues exchange in an inspiring, disconnected setting.</p>

<p>The atmosphere on the Seine encourages <strong>informal exchanges and fresh ideas</strong>. Away from meeting rooms, discussions are freer, bonds are stronger. The Parisian panorama — Eiffel Tower, Notre-Dame, historic bridges — provides a stimulating brainstorming backdrop.</p>

<p>The format is flexible: <strong>morning work session</strong>, creative afternoon brainstorm, or evening team bonding afterwork. The Bluetooth speaker lets you play a presentation audio. The boat has an open space perfect for group discussions.</p>

<p><strong>Business invoicing</strong> available: we issue a compliant invoice with VAT for business expense processing. For groups over 6, contact us for an All-Inclusive quote with catering (lunch boxes, cold buffet...).</p>

<p>The Senang has hosted <strong>corporate events</strong> for brands like Adidas and Le Slip Français, and was the official boat for the Mauritania delegation at the Paris 2024 Olympics. A proven setting for your business events. Departure from Port de l'Arsenal at Bastille.</p>`,
    },
    {
      type: "benefits",
      title: "Why a seminar on the Seine?",
      items: [
        { icon: "lightbulb", title: "Inspiring setting", text: "The Seine and Paris landmarks stimulate creativity." },
        { icon: "briefcase", title: "Business invoicing", text: "Professional invoicing with VAT. Business expense eligible." },
        { icon: "users", title: "2 to 12 people", text: "Intimate format ideal for an executive committee or project team." },
        { icon: "utensils", title: "Catering available", text: "Lunch boxes, cold buffet, charcuterie boards on request." },
      ],
    },
    {
      type: "gallery",
      title: "Seminars on the Seine",
      images: [
        { src: "/images/gallery/2025-04-08-a-22.20.47_261af646.webp", alt: "Corporate seminar on the Seine" },
        { src: "/images/gallery/2025-04-08-a-20.58.14_0b6ddf22.webp", alt: "Team meeting aboard the Senang" },
        { src: "/images/gallery/2025-03-03-a-16.00.26_b41cf5f5.webp", alt: "The Senang under the bridges of Paris" },
        { src: "/images/gallery/2025-04-08-a-22.20.42_88a4983b.webp", alt: "Friendly atmosphere for a seminar" },
      ],
    },
    { type: "testimonials", title: "They held their seminar on the Seine", filter: "team-building" },
    { type: "pricing", title: "Our seminar packages" },
    {
      type: "faq",
      title: "Frequently asked questions – Seminar",
      items: [
        { question: "Is there WiFi on board?", answer: "No onboard WiFi. But 4G/5G coverage is excellent on the Seine in Paris. Prepare your documents in advance." },
        { question: "Can we project a presentation?", answer: "There's no projector, but you can play audio via the Bluetooth speaker. For visuals, we recommend a tablet or portable screen." },
        { question: "What format for a brainstorming session?", answer: "The 2-hour slot is ideal: 30 min for setup and ice-breaking, 1 hour of work, 30 min for debrief and drinks." },
        { question: "Can we extend the duration?", answer: "Yes, contact us for an extended slot. Hourly supplement on request." },
        { question: "What's the rate for 10 people?", answer: "480€ (base 1-6) + 4 x 80€ = 800€ for 10 people (basic package). Festive and All-Inclusive packages on request." },
      ],
    },
  ],
};

export default translation;
