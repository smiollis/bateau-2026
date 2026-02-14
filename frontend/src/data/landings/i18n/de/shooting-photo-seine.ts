import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: { title: "Fotoshooting auf der Seine – Bootsession in Paris", description: "Realisiert ein einzigartiges Fotoshooting auf der Seine. Privatboot, natürliches Licht, Pont Alexandre III und Eiffelturm als Kulisse. 2 Stunden Fahrt." },
  hero: { title: "Fotoshooting auf der Seine", subtitle: "Eine außergewöhnliche natürliche Kulisse für eure schönsten Fotos", cta: { text: "Shooting buchen" } },
  sections: [
    { type: "richtext", title: "Ein Fotoshooting der Extraklasse auf dem Wasser", content: `<p>Fotografen, Paare, Influencer oder Marken: Die Senang bietet ein <strong>schwimmendes Fotostudio</strong> mitten in Paris. Während 2 Stunden Fahrt genießt ihr eine sich ständig verändernde Kulisse: Eiffelturm, Pont Alexandre III, Seine-Ufer, Inseln...</p><p>Das <strong>natürliche Licht auf der Seine</strong> ist außergewöhnlich. Die Golden Hour bietet goldene Reflexe auf dem Wasser und weiches Licht auf den Gesichtern — der Traum jedes Fotografen. Das Boot bewegt sich langsam und ermöglicht vielfältige Aufnahmen ohne Ortswechsel.</p><p>Die Senang diente bereits als Set für <strong>professionelle Shootings</strong>: Adidas (mit Nicolas Karabétic), Le Slip Français, und war das offizielle Boot der Delegation Mauritaniens bei den <strong>Olympischen Spielen Paris 2024</strong>. Ein bewährter Rahmen für hochwertige Shootings.</p><p>Das Boot ist <strong>vollständig privatisiert</strong>: keine Passanten, keine Touristen im Bild. Euer Fotograf kann frei arbeiten. Ihr könnt auch ein <strong>JGA-Shooting</strong>, ein Paarporträt, ein Schwangerschaftsshooting, ein Mode-Lookbook oder Social-Media-Content organisieren.</p><p>Abfahrt vom <strong>Port de l'Arsenal an der Bastille</strong>. Die Route führt an beiden Seine-Ufern mit den schönsten Monumenten im Hintergrund vorbei. Bucht den Sonnenuntergangs-Slot für das beste Licht.</p>` },
    { type: "benefits", title: "Warum ein Shooting auf der Seine?", items: [
      { icon: "camera", title: "Außergewöhnliche Kulisse", text: "Eiffelturm, Pont Alexandre III, Seine-Ufer als Hintergrund." },
      { icon: "sunset", title: "Golden Hour", text: "Natürliches goldenes Licht für atemberaubende Fotos." },
      { icon: "film", title: "Bewährtes Set", text: "Bereits genutzt von Adidas, Le Slip Français, Olympia 2024." },
      { icon: "lock", title: "Völlig privat", text: "Keine Passanten im Bild. Euer Fotograf arbeitet frei." },
    ] },
    { type: "gallery", title: "Shootings auf der Seine", images: [
      { src: "/images/gallery/2025-04-04-a-17.33.30_ea0b05c2.webp", alt: "Fotoshooting auf der Seine mit Eiffelturm" },
      { src: "/images/gallery/2025-04-08-a-20.57.33_c61d5f00.webp", alt: "Golden Hour auf der Seine für Shooting" },
      { src: "/images/gallery/2025-04-18-a-09.55.02_4b9f3852.webp", alt: "Blick vom Boot beim Shooting" },
      { src: "/images/gallery/2025-03-03-a-16.00.26_b41cf5f5.webp", alt: "Die Senang unter den Brücken von Paris" },
    ] },
    { type: "testimonials", title: "Sie haben die Senang gewählt", filter: "shooting" },
    { type: "pricing", title: "Unsere Shooting-Pakete" },
    { type: "faq", title: "Häufig gestellte Fragen – Fotoshooting", items: [
      { question: "Kann man mit einem professionellen Fotografen kommen?", answer: "Natürlich! Euer Fotograf ist an Bord willkommen. Er kann sich frei auf dem Boot bewegen für verschiedene Blickwinkel." },
      { question: "Welcher ist der beste Slot für das Licht?", answer: "Die Golden Hour (1h vor Sonnenuntergang) bietet das schönste Licht. Bucht diesen Slot im Voraus, er ist sehr gefragt." },
      { question: "Ist das Boot stabil genug für Fotos?", answer: "Ja, die Senang fährt langsam und bietet eine stabile Fahrt. Keine störenden Vibrationen für die Aufnahmen." },
      { question: "Kann man ein Mode-/Lookbook-Shooting machen?", answer: "Absolut. Mehrere Marken haben bereits an Bord gedreht (Adidas, Le Slip Français). Die Kulisse wechselt natürlich während der Fahrt." },
      { question: "Was kostet ein Shooting auf der Seine?", answer: "Ab 480€ (Basispaket, 2h). Der Preis ist gleich wie für eine Standard-Bootsfahrt." },
    ] },
  ],
};
export default translation;
