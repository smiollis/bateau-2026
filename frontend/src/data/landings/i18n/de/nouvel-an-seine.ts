import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: { title: "Silvester auf der Seine – Private Feier auf dem Boot in Paris", description: "Feiert Silvester auf der Seine an Bord eines Privatbootes. Champagner, Feuerwerk, beleuchteter Eiffelturm." },
  hero: { title: "Silvester auf der Seine", subtitle: "Der schönste Silvesterabend von Paris erlebt man auf dem Wasser, vor dem Feuerwerk", cta: { text: "Silvester buchen" } },
  sections: [
    { type: "richtext", title: "Der magischste Silvesterabend von Paris", content: `<p>Countdown vor dem <strong>beleuchteten Eiffelturm</strong>, ein Glas Champagner in der Hand, auf den Wassern der Seine. Silvester an Bord der Senang ist ein außergewöhnliches Erlebnis, das eure Gäste nie vergessen werden.</p><p>Die Senang, ein 12-Meter-Boot, <strong>privatisiert für eure Gruppe</strong> (2 bis 12 Personen), fährt 2-3 Stunden durch das Herz von Paris. Ihr erlebt das Feuerwerk vom Wasser aus mit unvergleichlichem Blick auf die beleuchteten Monumente.</p><p>Bereitet euren <strong>maßgeschneiderten Silvesterabend</strong> vor: Meeresfrüchte, Foie Gras, Champagner, Partyhüte... Das BYO-Konzept erlaubt es, alles mitzubringen. Oder wählt das Alles-Inklusive-Paket mit Catering und Champagner.</p><p>Abfahrt vom <strong>Port de l'Arsenal an der Bastille</strong>. Sonder-Slot von 22:30 bis 1:00 Uhr. Plätze sehr begrenzt: Bucht ab September!</p>` },
    { type: "benefits", title: "Warum Silvester auf der Seine?", items: [
      { icon: "sparkles", title: "Feuerwerk", text: "Direkter Blick auf das Feuerwerk von der Seine." },
      { icon: "champagne", title: "Champagner um Mitternacht", text: "Stoßt vor dem Eiffelturm auf das neue Jahr an." },
      { icon: "lock", title: "Totale Privatsphäre", text: "Nur eure Gruppe. Weit weg von der Menge am Trocadéro." },
      { icon: "clock", title: "Verlängerter Slot", text: "22:30-1:00. Erlebt den Countdown und feiert auf dem Wasser." },
    ] },
    { type: "gallery", title: "Silvester auf der Seine", images: [
      { src: "/images/gallery/2025-04-08-a-21.50.25_ac11bce0.webp", alt: "Beleuchtetes Paris von der Seine zu Silvester" },
      { src: "/images/gallery/2025-04-08-a-20.57.33_c61d5f00.webp", alt: "Festliche Stimmung auf der Senang" },
      { src: "/images/gallery/2025-04-15-a-22.21.11_0329a51a.webp", alt: "Nachtfahrt auf der Seine" },
      { src: "/images/gallery/2025-03-02-a-21.18.40_52501437.webp", alt: "Nächtlicher Blick auf Paris vom Boot" },
    ] },
    { type: "testimonials", title: "Sie haben Silvester auf der Seine gefeiert", filter: "soiree" },
    { type: "pricing", title: "Unsere Silvester-Pakete" },
    { type: "faq", title: "Häufig gestellte Fragen – Silvester", items: [
      { question: "Wann sollte man buchen?", answer: "So früh wie möglich! Wir haben nur einen Silvester-Slot. Bucht ab September, um sicher einen Platz zu haben." },
      { question: "Wie lang ist der Silvester-Slot?", answer: "Der Sonder-Slot ist von 22:30 bis 1:00 Uhr, 2,5 Stunden Fahrt. Sonderpreis auf Anfrage." },
      { question: "Sieht man das Feuerwerk?", answer: "Ja! Die Route ist optimiert für den besten Blick auf das Feuerwerk und den funkelnden Eiffelturm." },
      { question: "Kann man eigenen Champagner mitbringen?", answer: "Natürlich! Das BYO-Konzept gilt auch für Silvester. Bringt Champagner, Foie Gras, Partyhüte... oder wählt das Alles-Inklusive-Paket." },
      { question: "Was kostet es?", answer: "Der Silvester-Preis ist auf Anfrage (verlängerter Slot + Sonderzeitraum). Kontaktiert uns für ein individuelles Angebot." },
    ] },
  ],
};
export default translation;
