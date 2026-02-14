import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: {
    title: "Crociera romantica sulla Senna – Serata privata a Parigi",
    description:
      "Regala una crociera romantica privata sulla Senna. 2 ore in coppia con champagne, tramonto e monumenti illuminati. A partire da 540€.",
  },
  hero: {
    title: "Crociera romantica sulla Senna",
    subtitle:
      "Vivete un momento magico in due sull'acqua, con Parigi come sfondo",
    cta: { text: "Prenota la tua serata" },
  },
  sections: [
    {
      type: "richtext",
      title: "Una serata romantica indimenticabile a Parigi",
      content: `<p>Parigi è la città dell'amore, e non c'è modo migliore di scoprirla in coppia che navigando sulla Senna. Imbarcatevi per una <strong>crociera romantica privata</strong> a bordo del Senang, un'elegante barca di 12 metri, tutta per voi due.</p>

<p>Durante <strong>2 ore di navigazione</strong>, lasciatevi trasportare dalla magia di Parigi al tramonto. La Torre Eiffel che si illumina, i riflessi dorati sulla Senna, il Pont Alexandre III decorato con i suoi lampioni... Ogni istante è una cartolina vivente.</p>

<p>Con la <strong>formula festiva</strong>, godetevi una coppa di champagne offerta per brindare di fronte alla Torre Eiffel. Potete anche preparare un picnic gourmet o ordinare i nostri taglieri aperitivo per rendere il momento ancora più speciale.</p>

<p>Il Senang è <strong>interamente privatizzato</strong>: niente gruppi di turisti, niente rumore, solo lo sciabordio dell'acqua e il mormorio della città. Il Capitano Michel, discreto e professionale, vi lascia assaporare la vostra intimità garantendo una navigazione fluida.</p>

<p>Che sia per un <strong>anniversario di coppia</strong>, una sorpresa romantica, o semplicemente per ritrovarsi lontano dal quotidiano, questa crociera vi offre una cornice eccezionale. Partenza dal Port de l'Arsenal a Bastille, facilmente raggiungibile in metro.</p>

<p>Per un'esperienza ancora più memorabile, prenotate la fascia del tramonto: la golden hour sulla Senna è uno spettacolo che non dimenticherete. <strong>Il Senang, veterano delle Olimpiadi di Parigi 2024</strong>, vi offre una cornice d'eccezione per la vostra serata in coppia.</p>`,
    },
    {
      type: "benefits",
      title: "Perché scegliere una crociera romantica sulla Senna?",
      items: [
        {
          icon: "heart",
          title: "Intimità assoluta",
          text: "Barca privatizzata solo per voi due (o il vostro piccolo gruppo).",
        },
        {
          icon: "champagne",
          title: "Champagne incluso",
          text: "Brindisi di fronte alla Torre Eiffel con la formula festiva.",
        },
        {
          icon: "sunset",
          title: "Tramonto",
          text: "Prenotate la fascia golden hour per un momento magico.",
        },
        {
          icon: "utensils",
          title: "Cena a bordo",
          text: "Portate il vostro picnic o ordinate i nostri taglieri.",
        },
      ],
    },
    {
      type: "gallery",
      title: "Momenti romantici sulla Senna",
      images: [
        {
          src: "/images/gallery/2025-04-08-a-20.57.33_c61d5f00.webp",
          alt: "Tramonto romantico sulla Senna",
        },
        {
          src: "/images/gallery/2025-03-02-a-21.18.40_52501437.webp",
          alt: "Crociera in coppia al crepuscolo a Parigi",
        },
        {
          src: "/images/gallery/2025-04-08-a-20.58.31_fcc03538.webp",
          alt: "Il Senang che naviga sotto i ponti di Parigi",
        },
        {
          src: "/images/gallery/2025-04-15-a-22.21.11_0329a51a.webp",
          alt: "Serata romantica a bordo del Senang",
        },
      ],
    },
    {
      type: "testimonials",
      title: "Hanno vissuto la magia",
      filter: "romantique",
    },
    {
      type: "pricing",
      title: "Le nostre formule per una serata romantica",
    },
    {
      type: "faq",
      title: "Domande frequenti – Crociera romantica",
      items: [
        {
          question: "Si può prenotare solo per due persone?",
          answer:
            "Assolutamente! La barca è privatizzata anche per una coppia. La tariffa base copre da 1 a 6 persone, quindi avrete la barca tutta per voi.",
        },
        {
          question: "Qual è il momento migliore per una crociera romantica?",
          answer:
            "Il tramonto è la fascia più richiesta: la luce dorata sui monumenti e la Torre Eiffel che si illumina creano un momento magico. Prenotate in anticipo per questa fascia.",
        },
        {
          question: "Si può organizzare una sorpresa?",
          answer:
            "Sì! Contattateci per preparare una sorpresa: decorazione speciale, champagne, petali di rosa... Vi aiutiamo a organizzare il momento perfetto.",
        },
        {
          question: "Si può portare un pasto a bordo?",
          answer:
            "Sì, potete preparare un picnic gourmet o un plateau-repas. Offriamo anche taglieri aperitivo su ordinazione.",
        },
        {
          question: "Quanto costa una crociera romantica?",
          answer:
            "A partire da 490€ (formula semplice) o 540€ (formula festiva con champagne) per una crociera privata di 2 ore.",
        },
      ],
    },
  ],
};

export default translation;
