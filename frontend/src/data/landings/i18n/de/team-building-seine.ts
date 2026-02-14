import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: { title: "Teambuilding auf der Seine – Firmenevent in Paris", description: "Organisiere ein originelles Teambuilding auf der Seine. Privatboot für 2 bis 12 Kollegen, Aperitif, 2 Stunden Fahrt. Firmenrechnung verfügbar." },
  hero: { title: "Teambuilding auf der Seine", subtitle: "Stärkt den Teamzusammenhalt bei einer Privatfahrt im Herzen von Paris", cta: { text: "Teambuilding buchen" } },
  sections: [
    { type: "richtext", title: "Ein außergewöhnliches Teambuilding", content: `<p>Ihr sucht einen <strong>originellen Firmenausflug in Paris</strong>? Vergesst Escape Rooms und Bowling: Nehmt euer Team mit auf die Seine für ein Teambuilding, über das alle sprechen werden. Die Senang, ein 12-Meter-Privatboot, bietet einen einzigartigen Rahmen zur Stärkung der Teambeziehungen.</p><p>Während <strong>2 Stunden Fahrt</strong> genießt euer Team von 2 bis 12 Personen ein außergewöhnliches Panorama: Eiffelturm, Notre-Dame, Musée d'Orsay... Fernab der Bürowände werden Gespräche lockerer und Ideen fließen. Ideal für Afterwork, Verabschiedung oder Teamerfolg-Feier.</p><p>Flexibles Konzept: <strong>Freier Aperitif an Bord</strong> (bringt eure Getränke und Speisen mit) oder wählt das Festpaket mit Champagner. Bluetooth-Lautsprecher bereit für die Hintergrundmusik.</p><p><strong>Firmenrechnung</strong> auf Anfrage verfügbar. Wir stellen eine konforme Rechnung mit MwSt. aus. Kontaktiert uns für ein personalisiertes Angebot mit Alles-Inklusive-Paket und Catering.</p><p>Abfahrt vom <strong>Port de l'Arsenal an der Bastille</strong>, leicht mit der Metro erreichbar. Die Senang, <strong>Veteran der Olympischen Spiele Paris 2024</strong> und Adidas-Set, wird eure Kollegen beeindrucken.</p>` },
    { type: "benefits", title: "Warum Teambuilding auf der Seine?", items: [
      { icon: "briefcase", title: "Firmenrechnung", text: "Professionelle Rechnung mit MwSt. verfügbar. Betriebsausgabe." },
      { icon: "users", title: "Bis zu 12 Personen", text: "Ideales Format für ein eingespieltes Team. Gesellige Atmosphäre garantiert." },
      { icon: "utensils", title: "Catering möglich", text: "Alles-Inklusive-Paket mit Platten, Buffet oder Catering auf Anfrage." },
      { icon: "mapPin", title: "Abfahrt Bastille", text: "Leicht mit der Metro erreichbar. Afterwork nach der Fahrt möglich." },
    ] },
    { type: "gallery", title: "Teambuilding auf der Seine", images: [
      { src: "/images/gallery/2025-04-08-a-22.20.47_261af646.webp", alt: "Team beim Teambuilding auf der Seine" },
      { src: "/images/gallery/2025-04-08-a-20.58.14_0b6ddf22.webp", alt: "Firmen-Bootsfahrt in Paris" },
      { src: "/images/gallery/2025-03-03-a-16.00.26_b41cf5f5.webp", alt: "Die Senang unter den Brücken von Paris" },
      { src: "/images/gallery/2025-04-08-a-22.20.42_88a4983b.webp", alt: "Gesellige Atmosphäre an Bord" },
    ] },
    { type: "testimonials", title: "Sie haben die Senang gewählt", filter: "team-building" },
    { type: "pricing", title: "Unsere Teambuilding-Pakete" },
    { type: "faq", title: "Häufig gestellte Fragen – Teambuilding", items: [
      { question: "Kann man eine Firmenrechnung bekommen?", answer: "Ja, wir stellen eine konforme Rechnung mit MwSt. aus. Kontaktiert uns per E-Mail." },
      { question: "Welches Format für einen Afterwork?", answer: "Der Slot 18-20 Uhr unter der Woche ist ideal. Basispaket ab 490€ oder Festpaket ab 540€, euer Team bringt den Aperitif mit." },
      { question: "Kann man Aktivitäten an Bord organisieren?", answer: "Das Boot ist ideal für informelle Gespräche, Brainstorming oder ein Team-Quiz. Der Raum ist offen und gesellig." },
      { question: "Wie viele Kollegen maximal?", answer: "Die Senang bietet Platz für bis zu 12 Personen. Für größere Gruppen kontaktiert uns für eine Lösung." },
      { question: "Was ist der Preis?", answer: "Ab 490€ für 1 bis 6 Personen, +110€ pro weitere Person. Alles-Inklusive-Paket mit Catering auf Anfrage." },
    ] },
  ],
};
export default translation;
