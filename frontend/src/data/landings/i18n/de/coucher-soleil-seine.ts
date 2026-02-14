import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: { title: "Bootsfahrt bei Sonnenuntergang auf der Seine – Golden Hour in Paris", description: "Erlebt die Golden Hour auf der Seine. 2-stündige Privatfahrt bei Sonnenuntergang, beleuchteter Eiffelturm, Champagner. Ab 480€." },
  hero: { title: "Bootsfahrt bei Sonnenuntergang auf der Seine", subtitle: "Die Pariser Golden Hour vom Wasser aus — ein unvergessliches Spektakel", cta: { text: "Sonnenuntergang buchen" } },
  sections: [
    { type: "richtext", title: "Das schönste Licht von Paris", content: `<p>Es gibt einen magischen Moment in Paris: wenn die Sonne hinter dem Eiffelturm untergeht und die Stadt sich in Gold kleidet. Erlebt dieses Spektakel von der Seine aus an Bord der Senang, einem 12-Meter-Boot, <strong>privatisiert für eure Gruppe</strong>.</p><p>Die <strong>Sonnenuntergangs-Fahrt</strong> ist unser meistgebuchter Slot — und das aus gutem Grund. Während 2 Stunden erlebt ihr die Verwandlung von Paris: goldene Reflexe auf der Seine, lange Schatten an den Ufern, dann die Monumente, die eines nach dem anderen erstrahlen.</p><p>Der Höhepunkt? Die Passage vor dem <strong>Eiffelturm, wenn seine Lichter funkeln</strong>. Ein Spektakel, das sprachlos macht, noch beeindruckender vom Wasser aus. Pont Alexandre III, Grand Palais, Musée d'Orsay... Jedes Monument bekommt eine märchenhafte Dimension bei Einbruch der Nacht.</p><p>Mit dem <strong>Festpaket</strong> stoßt ihr mit Champagner vor diesem Panorama an. Ihr könnt auch ein romantisches Picknick vorbereiten oder unsere Aperitif-Platten bestellen.</p><p>Dieser Slot ist ideal für ein <strong>romantisches Date</strong>, einen Geburtstag, ein Fotoshooting oder einfach um Paris anders zu erleben. Abfahrt vom Port de l'Arsenal an der Bastille. Bucht im Voraus: die Golden-Hour-Slots sind schnell vergeben!</p>` },
    { type: "benefits", title: "Warum der Sonnenuntergang?", items: [
      { icon: "sunset", title: "Golden Hour", text: "Das schönste Licht von Paris, goldene Reflexe auf der Seine." },
      { icon: "sparkles", title: "Funkelnder Eiffelturm", text: "Erlebt die Illumination vom Wasser aus." },
      { icon: "camera", title: "Atemberaubende Fotos", text: "Der beste Slot für unvergessliche Fotos." },
      { icon: "champagne", title: "Champagner im Abendrot", text: "Stoßt vor dem glühenden Himmel an — mit dem Festpaket." },
    ] },
    { type: "gallery", title: "Sonnenuntergänge auf der Seine", images: [
      { src: "/images/gallery/2025-04-08-a-20.57.33_c61d5f00.webp", alt: "Sonnenuntergang auf der Seine in Paris" },
      { src: "/images/gallery/2025-03-02-a-21.18.40_52501437.webp", alt: "Golden Hour auf der Seine mit der Senang" },
      { src: "/images/gallery/2025-04-08-a-21.50.25_ac11bce0.webp", alt: "Beleuchtetes Paris in der Dämmerung von der Seine" },
      { src: "/images/gallery/2025-04-15-a-22.21.11_0329a51a.webp", alt: "Abend auf der Senang bei Sonnenuntergang" },
    ] },
    { type: "testimonials", title: "Sie haben den Sonnenuntergang gesehen", filter: "coucher-soleil" },
    { type: "pricing", title: "Unsere Sonnenuntergangs-Pakete" },
    { type: "faq", title: "Häufig gestellte Fragen – Sonnenuntergang", items: [
      { question: "Wann ist der Sonnenuntergang?", answer: "Die Uhrzeit variiert je nach Saison: etwa 17:30 im Winter, 21:30 im Sommer. Wir empfehlen, 1,5h vor Sonnenuntergang zu buchen." },
      { question: "Ist dieser Slot teurer?", answer: "Nein, die Preise sind identisch: 480€ (Basis) oder 540€ (Fest). Aber dieser Slot ist sehr gefragt, bucht im Voraus." },
      { question: "Sieht man den Eiffelturm funkeln?", answer: "Ja! Wenn eure Fahrt die volle Stunde abdeckt (jede Stunde nach Einbruch der Dunkelheit), seht ihr die 20.000 Glühbirnen 5 Minuten lang funkeln." },
      { question: "Und wenn der Himmel bedeckt ist?", answer: "Auch bei bedecktem Himmel ist das Sonnenuntergangslicht schön. Bei wirklich ungünstigem Wetter, kostenlose Verschiebung auf ein Datum eurer Wahl." },
      { question: "Kann man für ein Fotoshooting buchen?", answer: "Absolut! Die Golden Hour ist der Lieblings-Slot der Fotografen. Die Senang war Set für Adidas und Le Slip Français." },
    ] },
  ],
};
export default translation;
