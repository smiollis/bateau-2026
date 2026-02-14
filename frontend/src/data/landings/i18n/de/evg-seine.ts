import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: {
    title: "Junggesellenabschied auf der Seine – Private Bootsfahrt in Paris",
    description:
      "Organisiere einen unvergesslichen Junggesellenabschied auf der Seine. Privatboot für bis zu 12 Personen, Bier und Champagner, 2 Stunden im Herzen von Paris.",
  },
  hero: {
    title: "Junggesellenabschied auf der Seine",
    subtitle:
      "Schenke dem zukünftigen Bräutigam ein einzigartiges und entspanntes Erlebnis auf der Seine",
    cta: { text: "JGA jetzt buchen" },
  },
  sections: [
    {
      type: "richtext",
      title: "Ein origineller JGA auf der Seine",
      content: `<p>Keine Lust auf den klassischen JGA zwischen Bar und Club? Schenke dem zukünftigen Bräutigam einen <strong>Junggesellenabschied auf der Seine</strong>, den er nie vergessen wird. An Bord der Senang, einem vollständig privatisierten 12-Meter-Boot, erlebt ihr einen außergewöhnlichen Abend unter Kumpels.</p>

<p>Während <strong>2 Stunden Fahrt</strong> genießt ihr ein außergewöhnliches Panorama der schönsten Sehenswürdigkeiten von Paris: Eiffelturm, Notre-Dame, Louvre, Pont Alexandre III... Das alles mit eurer eigenen Musik, euren Bieren, euren Snacks — es ist euer Boot für den Abend.</p>

<p>Die Senang ist <strong>100% privatisiert</strong> für eure Gruppe von 2 bis 12 Personen. Keine Touristen, keine Einschränkungen: Ihr könnt eure Kühlbox, eure Kostüme und alles mitbringen, was diesen Abend legendär macht. Kapitän Michel steuert das Boot, während ihr feiert.</p>

<p>Unser <strong>Festpaket</strong> beinhaltet ein Glas Champagner pro Person — perfekt für den Toast auf den zukünftigen Bräutigam. Ihr könnt auch das Basispaket wählen und eure eigenen Getränke und Snacks mitbringen. Bluetooth-Lautsprecher steht für eure JGA-Playlist bereit.</p>

<p>Abfahrt vom <strong>Port de l'Arsenal an der Bastille</strong> (Paris 12.), mitten im Herzen der Hauptstadt. Nach der Fahrt seid ihr nur wenige Schritte von der rue de Lappe und dem Pariser Nachtleben entfernt, um die Party fortzusetzen.</p>

<p><strong>Die Senang war bei den Olympischen Spielen Paris 2024 dabei</strong> (Delegation Mauritaniens) und diente als Kulisse für Shootings von Adidas und Le Slip Français. Ein außergewöhnlicher Rahmen für einen JGA, der diesen Namen verdient.</p>`,
    },
    {
      type: "benefits",
      title: "Warum Un Bateau à Paris für euren JGA?",
      items: [
        { icon: "ship", title: "100% privates Boot", text: "Die Senang exklusiv für eure Truppe, bis zu 12 Personen." },
        { icon: "beer", title: "Eigene Getränke", text: "Bringt Bier, Champagner und Snacks mit. Es ist euer Abend." },
        { icon: "music", title: "Eure Playlist", text: "Bluetooth-Lautsprecher bereit für garantierte Stimmung." },
        { icon: "mapPin", title: "Abfahrt Bastille", text: "Feiert in der rue de Lappe nach der Bootsfahrt weiter." },
      ],
    },
    {
      type: "gallery",
      title: "JGA-Stimmung auf der Seine",
      images: [
        { src: "/images/gallery/2025-04-08-a-22.20.42_88a4983b.webp", alt: "Freundesgruppe feiert JGA auf der Seine" },
        { src: "/images/gallery/2025-04-08-a-20.58.14_0b6ddf22.webp", alt: "Festliche Fahrt zum JGA in Paris" },
        { src: "/images/gallery/2025-04-08-a-21.50.25_ac11bce0.webp", alt: "Beleuchtetes Paris beim JGA auf dem Boot" },
        { src: "/images/gallery/2025-03-03-a-16.00.26_b41cf5f5.webp", alt: "Die Senang unter den Brücken von Paris" },
      ],
    },
    { type: "testimonials", title: "Sie haben es erlebt", filter: "evg" },
    { type: "pricing", title: "Unsere JGA-Pakete" },
    {
      type: "faq",
      title: "Häufig gestellte Fragen – JGA auf der Seine",
      items: [
        { question: "Kann man eigene Getränke zum JGA mitbringen?", answer: "Ja! Ihr könnt Bier, Champagner, Cocktails und alles mitbringen, was ihr wollt. Mit dem Festpaket gibt es ein Glas Champagner für jeden Teilnehmer." },
        { question: "Wie viele Personen für einen JGA auf dem Boot?", answer: "Die Senang bietet Platz für 2 bis 12 Personen. Der Grundpreis gilt für 1 bis 6 Personen, dann 110€ pro zusätzliche Person." },
        { question: "Kann man eigene Musik anschließen?", answer: "Absolut! Ein Bluetooth-Lautsprecher steht zur Verfügung. Bereitet eure JGA-Playlist vor und sorgt für Stimmung." },
        { question: "Wo ist der Abfahrtspunkt?", answer: "Abfahrt vom Port de l'Arsenal, neben der Place de la Bastille (Paris 12.). Metro Bastille (Linien 1, 5, 8)." },
        { question: "Was kostet ein JGA auf der Seine?", answer: "Ab 480€ für das Basispaket (1 bis 6 Personen) oder 540€ für das Festpaket mit Champagner. +90€ pro Person über 6." },
      ],
    },
  ],
};

export default translation;
