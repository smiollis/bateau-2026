import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: { title: "Geburtstag auf der Seine – Private Feier auf dem Boot in Paris", description: "Feiere deinen Geburtstag auf der Seine an Bord eines Privatbootes. Bis zu 12 Gäste, Champagner, Kuchen an Bord. 2 Stunden Fahrt im Herzen von Paris." },
  hero: { title: "Geburtstag auf der Seine feiern", subtitle: "Ein unvergesslicher Geburtstag an Bord eines Privatbootes im Herzen von Paris", cta: { text: "Geburtstag buchen" } },
  sections: [
    { type: "richtext", title: "Ein origineller Geburtstag auf der Seine", content: `<p>Du suchst eine originelle Idee, um <strong>einen Geburtstag in Paris zu feiern</strong>? Steig mit deinen Liebsten an Bord der Senang für eine 2-stündige Privatfahrt auf der Seine. Vom Eiffelturm bis Notre-Dame – ein außergewöhnliches Panorama zum Kerzenausblasen.</p><p>Die Senang ist ein 12-Meter-Boot, <strong>vollständig privatisiert für eure Gruppe</strong> von 2 bis 12 Personen. Keine Tischnachbarn, kein Lärm: Es ist eure Feier, eure Stimmung, euer Moment. Ihr könnt euren Geburtstagskuchen, Geschenke und Dekoration mitbringen.</p><p>Mit dem <strong>Festpaket</strong> erhält jeder Gast ein Glas Champagner zum Anstoßen. Ihr könnt auch eure eigenen Getränke und Snacks mitbringen oder unsere Aperitif-Platten bestellen.</p><p>Schließt eure Geburtstags-Playlist an den <strong>Bluetooth-Lautsprecher</strong> an und lasst Kapitän Michel steuern, während ihr eure Gäste genießt. Die Route führt an den schönsten Monumenten von Paris vorbei: Eiffelturm, Musée d'Orsay, Île de la Cité, Pont Neuf...</p><p>Ob ihr euren 30., 40., 50. oder mehr feiert — diese <strong>Geburtstags-Bootsfahrt</strong> passt sich jeder Stimmung an. Abfahrt vom Port de l'Arsenal an der Bastille (Paris 12.).</p><p>Die Senang, <strong>Veteran der Olympischen Spiele Paris 2024</strong> und Set für Adidas-Shootings, bietet einen außergewöhnlichen Rahmen zum stilvollen Feiern.</p>` },
    { type: "benefits", title: "Warum den Geburtstag auf der Seine feiern?", items: [
      { icon: "cake", title: "Kuchen an Bord", text: "Bringt euren Geburtstagskuchen mit und blast die Kerzen vor Paris aus." },
      { icon: "users", title: "Bis zu 12 Gäste", text: "Das Boot ist für eure Gruppe privatisiert, intime Atmosphäre garantiert." },
      { icon: "champagne", title: "Champagner inklusive", text: "Ein Glas pro Person mit dem Festpaket zum Anstoßen." },
      { icon: "music", title: "Eure Playlist", text: "Bluetooth-Lautsprecher für die musikalische Stimmung bereit." },
    ] },
    { type: "gallery", title: "Geburtstagsfeiern auf der Seine", images: [
      { src: "/images/gallery/2025-04-08-a-20.58.31_fcc03538.webp", alt: "Geburtstagsfeier auf der Seine in Paris" },
      { src: "/images/gallery/2025-04-08-a-21.50.25_ac11bce0.webp", alt: "Gruppe feiert Geburtstag auf dem Boot" },
      { src: "/images/gallery/2025-04-08-a-22.20.47_261af646.webp", alt: "Die Senang auf Geburtstagsfahrt" },
      { src: "/images/gallery/2025-03-03-a-16.00.24_c635ba48.webp", alt: "Blick auf die Brücken von Paris vom Boot aus" },
    ] },
    { type: "testimonials", title: "Sie haben ihren Geburtstag auf der Seine gefeiert", filter: "anniversaire" },
    { type: "pricing", title: "Unsere Geburtstagspakete" },
    { type: "faq", title: "Häufig gestellte Fragen – Geburtstag auf der Seine", items: [
      { question: "Kann man einen Geburtstagskuchen mitbringen?", answer: "Natürlich! Ihr könnt euren Kuchen, Kerzen und alles zum Feiern mitbringen. Wir haben einen kleinen Tisch an Bord." },
      { question: "Wie viele Personen können eingeladen werden?", answer: "Die Senang bietet Platz für bis zu 12 Personen. Der Grundpreis gilt für 1 bis 6 Personen, dann 110€ pro zusätzliche Person." },
      { question: "Sind Kinder an Bord erlaubt?", answer: "Ja, Kinder sind willkommen. Passende Rettungswesten sind an Bord verfügbar. Kinder unter 3 Jahren sind kostenlos." },
      { question: "Kann man Dekoration mitbringen?", answer: "Absolut! Luftballons, Banner, Girlanden... Ihr könnt das Boot für den Anlass dekorieren. Wir bitten nur darum, kein Konfetti zu verwenden." },
      { question: "Was kostet ein Geburtstag auf der Seine?", answer: "Ab 480€ (Basispaket) oder 540€ (Festpaket mit Champagner) für eine Gruppe bis zu 6 Personen. +110€ pro weitere Person." },
    ] },
  ],
};
export default translation;
