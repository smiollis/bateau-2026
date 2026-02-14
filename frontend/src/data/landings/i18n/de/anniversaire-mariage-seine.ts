import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: { title: "Hochzeitstag auf der Seine – Private Bootsfahrt", description: "Feiert euren Hochzeitstag auf der Seine. Privatfahrt für 2 bis 12 Personen, Champagner, romantische Kulisse vor dem Eiffelturm." },
  hero: { title: "Hochzeitstag auf der Seine", subtitle: "Erneuert die Magie eurer Beziehung bei einer Privatfahrt in Paris", cta: { text: "Bootsfahrt buchen" } },
  sections: [
    { type: "richtext", title: "Eine Bootsfahrt, um eure Liebe zu feiern", content: `<p>Ob <strong>Papier-, Silber- oder Goldhochzeit</strong> — ein Hochzeitstag verdient einen außergewöhnlichen Rahmen. An Bord der Senang, einem 12-Meter-Boot nur für euch privatisiert, erlebt ihr die Emotion eures Versprechens erneut auf der Seine.</p><p>Während <strong>2 Stunden Fahrt</strong> gleitet Paris an euch vorbei: der beleuchtete Eiffelturm, die Pont Alexandre III, Notre-Dame... Eine romantische Kulisse, die Paris berühmt gemacht hat. Stoßt mit einem Glas <strong>Champagner</strong> dank des Festpakets an.</p><p>Ihr könnt ein <strong>romantisches Dinner an Bord</strong> organisieren. Bringt euer Essen mit oder bestellt unsere Aperitif-Platten. Ladet eure Liebsten ein: Die Senang bietet <strong>Platz für bis zu 12 Personen</strong>.</p><p>Abfahrt vom <strong>Port de l'Arsenal an der Bastille</strong> (Paris 12.). Die Senang, die bei den <strong>Olympischen Spielen Paris 2024</strong> dabei war, bietet einen perfekten Rahmen, um euer Versprechen zu erneuern.</p>` },
    { type: "benefits", title: "Warum auf der Seine feiern?", items: [
      { icon: "heart", title: "Absolute Romantik", text: "Beleuchtetes Paris als Kulisse, um euer Versprechen zu erneuern." },
      { icon: "champagne", title: "Champagner inklusive", text: "Stoßt auf eure Liebe an – mit dem Festpaket." },
      { icon: "users", title: "Familie und Freunde", text: "Ladet bis zu 12 Personen ein, um diesen Moment zu teilen." },
      { icon: "utensils", title: "Dinner an Bord", text: "Bringt euer Essen mit oder bestellt unsere Platten." },
    ] },
    { type: "gallery", title: "Hochzeitstag-Momente auf der Seine", images: [
      { src: "/images/gallery/2025-03-02-a-21.18.40_52501437.webp", alt: "Hochzeitstag-Bootsfahrt in der Dämmerung" },
      { src: "/images/gallery/2025-04-08-a-20.57.33_c61d5f00.webp", alt: "Romantischer Sonnenuntergang auf der Seine" },
      { src: "/images/gallery/2025-04-15-a-22.21.11_0329a51a.webp", alt: "Intimer Abend an Bord der Senang" },
      { src: "/images/gallery/2025-04-08-a-21.50.25_ac11bce0.webp", alt: "Beleuchtetes Paris zum Hochzeitstag" },
    ] },
    { type: "testimonials", title: "Sie haben ihre Liebe gefeiert", filter: "mariage" },
    { type: "pricing", title: "Unsere Hochzeitstag-Pakete" },
    { type: "faq", title: "Häufig gestellte Fragen – Hochzeitstag", items: [
      { question: "Kann man eine Überraschung für den Partner organisieren?", answer: "Natürlich! Kontaktiert uns im Voraus, um Deko, Champagner und Ankunft an Bord zu koordinieren, ohne Verdacht zu erregen." },
      { question: "Kann man Kuchen oder Essen mitbringen?", answer: "Ja, ihr könnt Kuchen, Catering oder Gourmet-Picknick mitbringen. Wir haben einen Tisch an Bord." },
      { question: "Welcher ist der beste Slot?", answer: "Der Sonnenuntergang ist am romantischsten. Im Winter bietet die Nachtfahrt die beleuchteten Monumente." },
      { question: "Kann man mit Kindern kommen?", answer: "Ja, Kinder sind willkommen. Passende Rettungswesten verfügbar. Kinder unter 3 Jahren kostenlos." },
      { question: "Was kostet die Bootsfahrt?", answer: "Ab 480€ (Basispaket) oder 540€ (Festpaket mit Champagner) für 1 bis 6 Personen." },
    ] },
  ],
};
export default translation;
