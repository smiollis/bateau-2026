import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: {
    title: "Muttertag auf der Seine \u2013 Geschenk-Bootsfahrt in Paris",
    description:
      "Schenkt eurer Mutter eine private Bootsfahrt auf der Seine zum Muttertag. Champagner, Eiffelturm, Familienzeit. Ab 490\u00a0\u20ac.",
  },
  hero: {
    title: "Muttertag auf der Seine",
    subtitle:
      "Das sch\u00f6nste Geschenk f\u00fcr Mama \u2014 eine private Bootsfahrt im Herzen von Paris",
    cta: { text: "Bootsfahrt verschenken" },
  },
  sections: [
    {
      type: "richtext",
      title: "Das perfekte Geschenk zum Muttertag",
      content: `<p>Dieses Jahr vergesst Blumen und Parf\u00fcm. Schenkt eurer Mutter einen <strong>unvergesslichen Moment auf der Seine</strong>. Die Senang, ein 12-Meter-Boot exklusiv f\u00fcr eure Familie, f\u00e4hrt 2 Stunden zwischen den sch\u00f6nsten Sehensw\u00fcrdigkeiten von Paris.</p>

<p>Stellt euch ihre \u00dcberraschung vor: ein <strong>Boot ganz f\u00fcr sie allein</strong>, ein Glas Champagner, der vorbeigleitende Eiffelturm und die ganze Familie vereint. Das ist weit mehr als ein Geschenk \u2014 es ist eine Erinnerung, die f\u00fcr immer bleibt.</p>

<p>Das <strong>Festpaket</strong> (540\u00a0\u20ac) beinhaltet Champagner \u2014 perfekt, um gemeinsam in der Familie anzusto\u00dfen. Ihr k\u00f6nnt auch einen schwimmenden Brunch vorbereiten oder unsere Aperitif-Platten bestellen. Das BYO-Konzept erlaubt es euch, Kuchen, Getr\u00e4nke und alles mitzubringen, was Mama liebt.</p>

<p>Die Senang bietet Platz f\u00fcr <strong>2 bis 12 Personen</strong>: ideal, um Geschwister, Enkel und Gro\u00dfeltern um Mama zu versammeln. Kinder sind herzlich willkommen und unter 3 Jahren kostenlos.</p>

<p>Wir bieten personalisierte <strong>Geschenkgutscheine</strong> an, die ihr am gro\u00dfen Tag \u00fcberreichen k\u00f6nnt. Abfahrt vom Port de l\u2019Arsenal an der Bastille. Bucht den Sonnenuntergangs-Slot f\u00fcr magisches Licht auf den Familienfotos.</p>`,
    },
    {
      type: "benefits",
      title: "Warum die Seine zum Muttertag?",
      items: [
        {
          icon: "gift",
          title: "Einzigartiges Geschenk",
          text: "Eine unvergessliche Erinnerung, viel besser als ein Gegenstand. Geschenkgutschein verf\u00fcgbar.",
        },
        {
          icon: "heart",
          title: "Familienmoment",
          text: "Vereint die ganze Familie um Mama auf der Seine.",
        },
        {
          icon: "champagne",
          title: "Champagner inklusive",
          text: "Festpaket mit Champagner zum gemeinsamen Ansto\u00dfen.",
        },
        {
          icon: "camera",
          title: "Erinnerungsfotos",
          text: "Eiffelturm und die Br\u00fccken von Paris als Kulisse.",
        },
      ],
    },
    {
      type: "gallery",
      title: "Muttertag auf der Seine",
      images: [
        {
          src: "/images/gallery/2025-04-08-a-20.58.31_fcc03538.webp",
          alt: "Familie vereint auf der Seine zum Muttertag",
        },
        {
          src: "/images/gallery/2025-04-08-a-20.56.56_3b100d69.webp",
          alt: "Gem\u00fctliche Familienmomente an Bord",
        },
        {
          src: "/images/gallery/2025-04-08-a-20.57.33_c61d5f00.webp",
          alt: "Sonnenuntergang auf der Seine",
        },
        {
          src: "/images/gallery/2025-07-27-a-12.22.05_77ed38c8.webp",
          alt: "Familienfahrt im Herzen von Paris",
        },
      ],
    },
    {
      type: "testimonials",
      title: "Sie haben ihre Bootsfahrt geliebt",
      filter: "famille",
    },
    {
      type: "pricing",
      title: "Unsere Muttertag-Pakete",
    },
    {
      type: "faq",
      title: "H\u00e4ufig gestellte Fragen \u2013 Muttertag",
      items: [
        {
          question: "Bietet ihr Geschenkgutscheine an?",
          answer:
            "Ja! Wir bieten personalisierte Geschenkgutscheine an, zum Ausdrucken oder per E-Mail. Ideal, um die \u00dcberraschung bis zum gro\u00dfen Tag zu bewahren.",
        },
        {
          question: "Kann man mit Kleinkindern kommen?",
          answer:
            "Nat\u00fcrlich! Kinder-Rettungswesten sind vorhanden, der Kinderwagen wird am Kai aufbewahrt. Kinder unter 3 Jahren fahren kostenlos.",
        },
        {
          question: "Kann man einen Kuchen mitbringen?",
          answer:
            "Absolut! Kuchen, Blumen, Geschenke, Brunch\u2026 Bringt alles mit, was Mama gl\u00fccklich macht.",
        },
        {
          question: "Welches Zeitfenster empfehlt ihr?",
          answer:
            "Der Sonnenuntergangs-Slot (variiert je nach Saison) bietet das sch\u00f6nste Licht f\u00fcr Fotos und die romantischste Atmosph\u00e4re.",
        },
        {
          question: "Wie viele Personen maximal?",
          answer:
            "Die Senang bietet Platz f\u00fcr bis zu 12 Personen. Grundpreis f\u00fcr 1 bis 6 Personen (490\u00a0\u20ac Basis), +110\u00a0\u20ac pro weitere Person.",
        },
      ],
    },
  ],
};

export default translation;
