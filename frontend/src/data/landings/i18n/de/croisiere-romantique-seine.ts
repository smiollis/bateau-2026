import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: { title: "Romantische Bootsfahrt auf der Seine – Privater Abend in Paris", description: "Verschenke eine romantische Privatfahrt auf der Seine. 2 Stunden zu zweit mit Champagner, Sonnenuntergang und beleuchteten Monumenten. Ab 540€." },
  hero: { title: "Romantische Bootsfahrt auf der Seine", subtitle: "Erlebt einen magischen Moment zu zweit auf dem Wasser, mit Paris als Kulisse", cta: { text: "Abend buchen" } },
  sections: [
    { type: "richtext", title: "Ein unvergesslicher romantischer Abend in Paris", content: `<p>Paris ist die Stadt der Liebe, und es gibt keinen besseren Weg, sie zu zweit zu entdecken, als auf der Seine. Geht an Bord für eine <strong>romantische Privatfahrt</strong> auf der Senang, einem eleganten 12-Meter-Boot, ganz für euch allein.</p><p>Während <strong>2 Stunden Fahrt</strong> lasst ihr euch von der Magie des Pariser Sonnenuntergangs verzaubern. Der Eiffelturm, der erstrahlt, die goldenen Reflexe auf der Seine, die Pont Alexandre III mit ihren Laternen... Jeder Augenblick ist eine lebende Postkarte.</p><p>Mit dem <strong>Festpaket</strong> genießt ihr ein Glas Champagner, um vor dem Eiffelturm anzustoßen. Ihr könnt auch ein Gourmet-Picknick vorbereiten oder unsere Aperitif-Platten bestellen, um den Moment noch spezieller zu machen.</p><p>Die Senang ist <strong>vollständig privatisiert</strong>: keine Touristengruppen, kein Lärm, nur das Plätschern des Wassers und das Murmeln der Stadt. Kapitän Michel, diskret und professionell, lässt euch eure Zweisamkeit genießen und sorgt für eine reibungslose Fahrt.</p><p>Ob für einen <strong>Jahrestag</strong>, eine romantische Überraschung oder einfach um dem Alltag zu entfliehen — diese Fahrt bietet einen außergewöhnlichen Rahmen. Abfahrt vom Port de l'Arsenal an der Bastille.</p><p>Für ein noch unvergesslicheres Erlebnis bucht den Sonnenuntergangs-Slot: Die Golden Hour auf der Seine ist ein Spektakel, das ihr nicht vergessen werdet. <strong>Die Senang, Veteran der Olympischen Spiele Paris 2024</strong>, bietet den perfekten Rahmen für euren romantischen Abend.</p>` },
    { type: "benefits", title: "Warum eine romantische Bootsfahrt auf der Seine?", items: [
      { icon: "heart", title: "Absolute Intimität", text: "Privatisiertes Boot nur für euch zwei (oder eure kleine Gruppe)." },
      { icon: "champagne", title: "Champagner inklusive", text: "Stoßt vor dem Eiffelturm an – mit dem Festpaket." },
      { icon: "sunset", title: "Sonnenuntergang", text: "Bucht den Golden-Hour-Slot für einen magischen Moment." },
      { icon: "utensils", title: "Essen an Bord", text: "Bringt euer Picknick mit oder bestellt unsere Platten." },
    ] },
    { type: "gallery", title: "Romantische Momente auf der Seine", images: [
      { src: "/images/gallery/2025-04-08-a-20.57.33_c61d5f00.webp", alt: "Romantischer Sonnenuntergang auf der Seine" },
      { src: "/images/gallery/2025-03-02-a-21.18.40_52501437.webp", alt: "Bootsfahrt zu zweit in der Dämmerung in Paris" },
      { src: "/images/gallery/2025-04-08-a-20.58.31_fcc03538.webp", alt: "Die Senang unter den Brücken von Paris" },
      { src: "/images/gallery/2025-04-15-a-22.21.11_0329a51a.webp", alt: "Romantischer Abend an Bord der Senang" },
    ] },
    { type: "testimonials", title: "Sie haben die Magie erlebt", filter: "romantique" },
    { type: "pricing", title: "Unsere Pakete für einen romantischen Abend" },
    { type: "faq", title: "Häufig gestellte Fragen – Romantische Bootsfahrt", items: [
      { question: "Kann man nur zu zweit buchen?", answer: "Absolut! Das Boot ist auch für ein Paar privatisiert. Der Grundpreis gilt für 1 bis 6 Personen, ihr habt also das Boot ganz für euch." },
      { question: "Wann ist die beste Zeit für eine romantische Fahrt?", answer: "Der Sonnenuntergang ist am beliebtesten: Das goldene Licht auf den Monumenten und der Eiffelturm, der erstrahlt, schaffen einen magischen Moment. Bucht frühzeitig für diesen Slot." },
      { question: "Kann man eine Überraschung organisieren?", answer: "Ja! Kontaktiert uns, um eine Überraschung vorzubereiten: Spezielle Dekoration, Champagner, Rosenblätter... Wir helfen euch, den perfekten Moment zu gestalten." },
      { question: "Kann man ein Essen mitbringen?", answer: "Ja, ihr könnt ein Gourmet-Picknick vorbereiten. Wir bieten auch Aperitif-Platten auf Bestellung an." },
      { question: "Was kostet eine romantische Bootsfahrt?", answer: "Ab 480€ (Basispaket) oder 540€ (Festpaket mit Champagner) für eine 2-stündige Privatfahrt." },
    ] },
  ],
};
export default translation;
