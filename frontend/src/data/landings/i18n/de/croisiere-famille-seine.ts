import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: { title: "Familienbootsfahrt auf der Seine – Privatboot in Paris", description: "Schenkt eurer Familie eine private Bootsfahrt auf der Seine. Kinder willkommen, sicheres Boot, 2 Stunden zwischen Eiffelturm und Notre-Dame." },
  hero: { title: "Familienbootsfahrt auf der Seine", subtitle: "Ein generationsübergreifender Moment an Bord eines Privatbootes", cta: { text: "Familienfahrt buchen" } },
  sections: [
    { type: "richtext", title: "Paris mit der Familie von der Seine aus", content: `<p>Schenkt euren Liebsten eine unvergessliche Erinnerung: eine <strong>Familienbootsfahrt auf der Seine</strong> an Bord der Senang. Dieses 12-Meter-Boot, sicher und intim, ist nur für eure Familie privatisiert — von 2 bis 12 Personen, von den Großeltern bis zu den Enkeln.</p><p>Während <strong>2 Stunden</strong> entdeckt ihr die Monumente von Paris aus einer einzigartigen Perspektive: Eiffelturm, Notre-Dame de Paris, Louvre, historische Brücken... Kinder lieben es, Paris vom Wasser aus zu sehen.</p><p>Die Senang ist mit <strong>Rettungswesten für Erwachsene und Kinder</strong> ausgestattet. Kapitän Michel sorgt für die Sicherheit aller. Kinder unter 3 Jahren sind kostenlos.</p><p>Ihr könnt ein <strong>Familienpicknick</strong>, einen Geburtstagskuchen oder Snacks für die Kinder mitbringen. Das Festpaket beinhaltet ein Glas Champagner für die Erwachsenen.</p><p>Ideal für ein <strong>Familientreffen</strong>, einen Geburtstag, die Schulferien oder einfach einen Sonntag mit der Familie. Abfahrt vom Port de l'Arsenal an der Bastille, kinderwagentauglich.</p>` },
    { type: "benefits", title: "Warum eine Familienbootsfahrt?", items: [
      { icon: "shield", title: "Kindersicherheit", text: "Passende Rettungswesten, stabiles und sicheres Boot." },
      { icon: "users", title: "3 Generationen", text: "Von 2 bis 12 Personen, von Enkeln bis Großeltern." },
      { icon: "utensils", title: "Freies Picknick", text: "Bringt Snacks, Kuchen und Getränke für die ganze Familie." },
      { icon: "baby", title: "Kinder kostenlos", text: "Kostenlos unter 3 Jahren. Kinderwagen am Hafen willkommen." },
    ] },
    { type: "gallery", title: "Familien auf der Seine", images: [
      { src: "/images/gallery/2025-04-08-a-20.58.31_fcc03538.webp", alt: "Familie genießt Bootsfahrt auf der Seine" },
      { src: "/images/gallery/2025-04-08-a-21.50.25_ac11bce0.webp", alt: "Gesellige Familienmomente an Bord" },
      { src: "/images/gallery/2025-03-03-a-16.00.24_c635ba48.webp", alt: "Blick auf die Brücken von Paris vom Boot" },
      { src: "/images/gallery/2025-07-27-a-12.22.05_77ed38c8.webp", alt: "Familienfahrt im Herzen von Paris" },
    ] },
    { type: "testimonials", title: "Zufriedene Familien", filter: "famille" },
    { type: "pricing", title: "Unsere Familienpakete" },
    { type: "faq", title: "Häufig gestellte Fragen – Familienbootsfahrt", items: [
      { question: "Sind Kinder an Bord sicher?", answer: "Ja, die Senang ist mit Rettungswesten für Erwachsene und Kinder ausgestattet. Das Boot ist stabil und der Kapitän sorgt für die Sicherheit aller." },
      { question: "Ab welchem Alter kann man mitfahren?", answer: "Es gibt kein Mindestalter. Babys und Kleinkinder sind willkommen. Kinder unter 3 Jahren sind kostenlos." },
      { question: "Kann man einen Kinderwagen mitbringen?", answer: "Ja, der Port de l'Arsenal ist kinderwagentauglich. Der Kinderwagen kann während der Fahrt am Kai bleiben." },
      { question: "Wie viele Personen maximal?", answer: "Die Senang bietet Platz für bis zu 12 Personen (Kinder inklusive). Grundpreis für 1 bis 6 Personen, +110€ pro weitere Person." },
      { question: "Kann man Essen für die Kinder mitbringen?", answer: "Absolut! Snacks, Fläschchen, Kuchen... Bringt alles Nötige mit. Wir haben einen kleinen Tisch an Bord." },
    ] },
  ],
};
export default translation;
