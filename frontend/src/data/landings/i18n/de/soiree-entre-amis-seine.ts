import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: { title: "Abend mit Freunden auf der Seine – Aperitif-Boot in Paris", description: "Organisiere einen Abend mit Freunden auf der Seine. Privatboot bis 12 Personen, freies Catering, eigene Playlist. 2 Stunden Fahrt ab 490€." },
  hero: { title: "Abend mit Freunden auf der Seine", subtitle: "Ein schwimmender Aperitif im Herzen von Paris, mit Freunden und ohne Stress", cta: { text: "Abend buchen" } },
  sections: [
    { type: "richtext", title: "Ein origineller Freunde-Abend in Paris", content: `<p>Lust auf einen <strong>originellen Abend mit Freunden in Paris</strong>? Vergiss die überfüllten Bars und lauten Terrassen: Steigt auf die Seine für einen schwimmenden Aperitif an Bord der Senang, einem vollständig privatisierten 12-Meter-Boot.</p><p>Während <strong>2 Stunden Fahrt</strong> genießt ihr Paris wie nie zuvor: den Eiffelturm bei Sonnenuntergang, die beleuchtete Notre-Dame, die Pont Alexandre III als Kulisse... Das alles mit euren Freunden, euren Getränken und eurer Musik.</p><p>Das Konzept ist einfach: Das Boot ist <strong>100% privatisiert für eure Gruppe</strong> von 2 bis 12 Personen. Bringt mit, was ihr wollt: Bier, Wein, Pizza, Picknick, Kuchen... Es ist euer Abend, null Einschränkungen. Schließt eure Playlist an den Bluetooth-Lautsprecher an und los geht's.</p><p>Das <strong>Basispaket ab 490€</strong> (für 1 bis 6 Personen) ist die zugänglichste Option für einen Afterwork unter Kollegen, einen Aperitif unter Freunden oder einen entspannten Ausflug. Lust auf Champagner? Das Festpaket für 540€ beinhaltet ein Glas pro Person.</p><p>Abfahrt vom <strong>Port de l'Arsenal an der Bastille</strong>, mitten in Paris. Nach der Fahrt seid ihr nur wenige Schritte von den Bars und Restaurants des Viertels entfernt.</p><p>Die Senang war bei den <strong>Olympischen Spielen Paris 2024</strong> dabei und diente als Set für Adidas und Le Slip Français. Ein stilvoller Rahmen für einen entspannten Freunde-Abend.</p>` },
    { type: "benefits", title: "Warum ein Boot für den Freunde-Abend?", items: [
      { icon: "users", title: "Eure Gruppe, euer Boot", text: "Privatisiert für 2 bis 12 Personen. Keine Touristen, keine Nachbarn." },
      { icon: "beer", title: "Freier Aperitif", text: "Bringt Getränke und Essen mit. Null Aufpreis, null Einschränkungen." },
      { icon: "music", title: "Musikalische Stimmung", text: "Bluetooth-Lautsprecher bereit. Eure Playlist, eure Atmosphäre." },
      { icon: "wallet", title: "Ab 82€/Pers.", text: "490€ für 6 Personen = 82€ pro Person. Unschlagbar in Paris." },
    ] },
    { type: "gallery", title: "Freunde-Abende auf der Seine", images: [
      { src: "/images/gallery/2025-04-08-a-22.20.47_261af646.webp", alt: "Freundesgruppe genießt Bootsfahrt auf der Seine" },
      { src: "/images/gallery/2025-04-08-a-20.58.14_0b6ddf22.webp", alt: "Aperitif unter Freunden auf der Senang" },
      { src: "/images/gallery/2025-04-08-a-22.20.42_88a4983b.webp", alt: "Festliche Stimmung unter Freunden auf der Seine" },
      { src: "/images/gallery/2025-04-04-a-17.33.30_ea0b05c2.webp", alt: "Fahrt unter Freunden im Herzen von Paris" },
    ] },
    { type: "testimonials", title: "Sie hatten einen unvergesslichen Abend", filter: "amis" },
    { type: "pricing", title: "Unsere Pakete für den Freunde-Abend" },
    { type: "faq", title: "Häufig gestellte Fragen – Abend mit Freunden", items: [
      { question: "Kann man eigene Getränke und Essen mitbringen?", answer: "Ja, das ist das Prinzip! Bringt Bier, Wein, Chips, Pizza, Picknick... alles was euch gefällt. Wir bieten auch Aperitif-Platten auf Bestellung." },
      { question: "Was kostet es pro Person?", answer: "Das Basispaket für 490€ gilt für bis zu 6 Personen, also 82€ pro Person. Darüber hinaus 110€ pro zusätzliche Person (max 12)." },
      { question: "Kann man für einen Afterwork buchen?", answer: "Absolut! Ein Slot unter der Woche am späten Nachmittag (18-20 Uhr) ist perfekt für einen originellen Afterwork. Abfahrt Bastille, ideal nach der Arbeit." },
      { question: "Gibt es Lärm- oder Zeitbeschränkungen?", answer: "Wir fahren in der Regel zwischen 10 und 22:30 Uhr. Musik über den Bluetooth-Lautsprecher ist in angemessener Lautstärke erlaubt. Wir bitten um Rücksicht auf die Anwohner." },
      { question: "Was passiert bei Regen?", answer: "Die Senang hat ein Schutzverdeck. Bei wirklich ungünstigem Wetter bieten wir eine kostenlose Verschiebung auf ein Datum eurer Wahl an." },
    ] },
  ],
};
export default translation;
