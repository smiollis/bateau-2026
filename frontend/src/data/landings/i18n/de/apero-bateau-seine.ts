import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: { title: "Aperitif auf dem Boot auf der Seine – Privater Aperitif in Paris", description: "Organisiert einen Aperitif auf der Seine an Bord eines Privatbootes. BYO (bringt eure Getränke mit), 2 Stunden Fahrt, 2 bis 12 Personen. Ab 80€/Pers." },
  hero: { title: "Aperitif auf dem Boot auf der Seine", subtitle: "Der coolste Aperitif von Paris — auf dem Wasser, mit Freunden", cta: { text: "Aperitif buchen" } },
  sections: [
    { type: "richtext", title: "Der beste Aperitif von Paris", content: `<p>Warum den Aperitif in einer Bar nehmen, wenn man ihn <strong>auf der Seine</strong> haben kann? Die Senang bietet euch das einfachste und genialste Konzept von Paris: ein 12-Meter-Privatboot, eure Getränke, eure Freunde und 2 Stunden Fahrt im Herzen der Hauptstadt.</p><p>Das Konzept ist <strong>BYO (Bring Your Own)</strong>: Bringt Bier, Wein, Rosé, Cocktails, Chips, Wurst, Pizza... alles mit, was ihr wollt. Null Aufpreis, null Einschränkungen. Es ist euer Aperitif, eure Atmosphäre. Schließt eure Playlist an den Bluetooth-Lautsprecher an und los geht's.</p><p>Für <strong>480€ für 6 Personen</strong> (also 80€ pro Person) ist es die günstigste Aktivität in Paris für einen wirklich originellen Moment. Afterwork unter Kollegen, Geburtstags-Aperitif, Freunde-Ausflug, Vorglühen... Jeder Anlass ist gut.</p><p>Während Kapitän Michel steuert, genießt ihr das <strong>Pariser Panorama</strong>: Eiffelturm, Notre-Dame, Pont Alexandre III, Seine-Ufer... Das alles mit einem Glas in der Hand. Viel besser als eine überfüllte Terrasse.</p><p>Abfahrt vom <strong>Port de l'Arsenal an der Bastille</strong>. Nach der Fahrt seid ihr wenige Schritte von den Bars des Viertels entfernt. Wir bieten auch <strong>Aperitif-Platten</strong> auf Bestellung an.</p>` },
    { type: "benefits", title: "Warum ein Aperitif auf der Seine?", items: [
      { icon: "beer", title: "Komplettes BYO", text: "Bringt alle eure Getränke und Snacks mit. Null Aufpreis." },
      { icon: "wallet", title: "Ab 80€/Pers.", text: "480€ für 6 = das beste Preis-Leistungs-Verhältnis in Paris." },
      { icon: "music", title: "Eure Musik", text: "Bluetooth-Lautsprecher bereit. Eure Playlist, eure Atmosphäre." },
      { icon: "mapPin", title: "Abfahrt Bastille", text: "Mitten in Paris. Feiert nach der Fahrt weiter." },
    ] },
    { type: "gallery", title: "Aperitifs auf der Seine", images: [
      { src: "/images/gallery/2025-04-08-a-20.58.14_0b6ddf22.webp", alt: "Aperitif unter Freunden auf der Seine" },
      { src: "/images/gallery/2025-04-08-a-22.20.42_88a4983b.webp", alt: "Entspannte Aperitif-Stimmung an Bord" },
      { src: "/images/gallery/2025-04-08-a-22.20.47_261af646.webp", alt: "Gruppe genießt Aperitif auf der Senang" },
      { src: "/images/gallery/2025-04-04-a-17.33.30_ea0b05c2.webp", alt: "Aperitif-Fahrt im Herzen von Paris" },
    ] },
    { type: "testimonials", title: "Sie haben auf der Seine angestoßen", filter: "apero" },
    { type: "pricing", title: "Unsere Aperitif-Pakete" },
    { type: "faq", title: "Häufig gestellte Fragen – Aperitif-Boot", items: [
      { question: "Kann man wirklich alles mitbringen?", answer: "Ja! Bier, Wein, Cocktails, Chips, Pizza, Wurst... Alles ist erlaubt. Wir bitten nur darum, euren Müll wieder mitzunehmen." },
      { question: "Was kostet es pro Person?", answer: "480€ für 1 bis 6 Personen = 80€/Pers. für 6 Freunde. Darüber hinaus +110€ pro Person (max 12)." },
      { question: "Gibt es einen Kühlschrank an Bord?", answer: "Nein, aber bringt eine Kühlbox mit! Der Kapitän hilft beim Verstauen. Tipp: Nehmt Eis mit, um den Rosé kühl zu halten." },
      { question: "Kann man für einen Afterwork buchen?", answer: "Absolut! Der Slot 18-20 Uhr unter der Woche ist perfekt. Abfahrt Bastille, ideal nach der Arbeit." },
      { question: "Bietet ihr Aperitif-Platten an?", answer: "Ja, wir bieten Wurst-/Käseplatten auf Bestellung an. Bestellt mindestens 48h im Voraus." },
    ] },
  ],
};
export default translation;
