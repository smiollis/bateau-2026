import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: { title: "Valentinstag auf der Seine – Romantische Bootsfahrt in Paris", description: "Verschenkt eine private Bootsfahrt auf der Seine zum Valentinstag. Champagner, beleuchteter Eiffelturm, 2 Stunden zu zweit. Ab 540€." },
  hero: { title: "Valentinstag auf der Seine", subtitle: "Die schönste Liebeserklärung macht man auf dem Wasser, vor dem Eiffelturm", cta: { text: "Valentinstag buchen" } },
  sections: [
    { type: "richtext", title: "Der romantischste Valentinstag in Paris", content: `<p>Vergesst die überfüllten Restaurants: Dieses Jahr schenkt eurer besseren Hälfte eine <strong>private Bootsfahrt auf der Seine</strong> zum Valentinstag. Die Senang, ein 12-Meter-Boot nur für euch zwei privatisiert, fährt 2 Stunden durch das beleuchtete Paris.</p><p>Stellt euch vor: ein <strong>Glas Champagner</strong> in der Hand, eure romantische Playlist auf dem Bluetooth-Lautsprecher und der funkelnde Eiffelturm vor euch. Pont Alexandre III, Notre-Dame, die lichtüberfluteten Seine-Ufer... Jede Minute ist eine Erinnerung.</p><p>Der <strong>Sonnenuntergangs</strong>-Slot ist der beliebteste zum Valentinstag. Die Golden Hour verwandelt Paris in ein goldenes Gemälde. Abfahrt vom Port de l'Arsenal an der Bastille. Bucht frühzeitig: Die Slots im Februar sind schnell vergeben!</p>` },
    { type: "benefits", title: "Warum Valentinstag auf der Seine?", items: [
      { icon: "heart", title: "100% romantisch", text: "Boot privatisiert für 2. Kein anderer Passagier, nur ihr zwei." },
      { icon: "champagne", title: "Champagner inklusive", text: "Festpaket mit Champagner vor dem Eiffelturm." },
      { icon: "sparkles", title: "Funkelnder Eiffelturm", text: "Das Spektakel der 20.000 Glühbirnen vom Wasser aus." },
      { icon: "music", title: "Eure Playlist", text: "Bluetooth-Lautsprecher bereit. Schafft eure romantische Atmosphäre." },
    ] },
    { type: "gallery", title: "Valentinstag auf der Seine", images: [
      { src: "/images/gallery/2025-04-08-a-20.57.33_c61d5f00.webp", alt: "Romantische Fahrt bei Sonnenuntergang" },
      { src: "/images/gallery/2025-03-02-a-21.18.40_52501437.webp", alt: "Golden Hour auf der Seine zum Valentinstag" },
      { src: "/images/gallery/2025-04-08-a-21.50.25_ac11bce0.webp", alt: "Beleuchtetes Paris von der Senang" },
      { src: "/images/gallery/2025-04-15-a-22.21.11_0329a51a.webp", alt: "Romantischer Abend an Bord der Senang" },
    ] },
    { type: "testimonials", title: "Sie haben Valentinstag auf der Seine gefeiert", filter: "romantique" },
    { type: "pricing", title: "Unsere Valentinstag-Pakete" },
    { type: "faq", title: "Häufig gestellte Fragen – Valentinstag", items: [
      { question: "Muss man weit im Voraus buchen?", answer: "Ja! Die Slots im Februar sind sehr gefragt. Bucht mindestens 2-3 Wochen im Voraus." },
      { question: "Kann man nur zu zweit kommen?", answer: "Absolut! Der Grundpreis (490€ Basis, 540€ Fest) gilt für 1 bis 6 Personen. Zu zweit ist es totale Intimität." },
      { question: "Kann man Kuchen oder Blumen mitbringen?", answer: "Natürlich! Kuchen, Rosen, Kerzen, Dekoration... Bereitet die Überraschung vor, wir helfen beim Einrichten an Bord." },
      { question: "Ist das Boot im Februar beheizt?", answer: "Die Senang ist ein halboffenes Boot. Wir stellen Decken bereit, aber zieht euch warm an. Die gemütliche Atmosphäre gehört zum Charme!" },
      { question: "Kann man an Bord einen Heiratsantrag machen?", answer: "Das ist unsere Spezialität! Kontaktiert uns, um den perfekten Moment zu organisieren. Wir bewahren das Geheimnis." },
    ] },
  ],
};
export default translation;
