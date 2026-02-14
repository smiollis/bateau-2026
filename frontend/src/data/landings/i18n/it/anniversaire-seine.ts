import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: {
    title: "Compleanno sulla Senna – Festa privata in barca a Parigi",
    description:
      "Festeggia il tuo compleanno sulla Senna a bordo di una barca privata. Fino a 12 invitati, champagne, torta a bordo. 2 ore di crociera nel cuore di Parigi.",
  },
  hero: {
    title: "Festeggia il tuo compleanno sulla Senna",
    subtitle:
      "Un compleanno indimenticabile a bordo di una barca privata nel cuore di Parigi",
    cta: { text: "Prenota il tuo compleanno" },
  },
  sections: [
    {
      type: "richtext",
      title: "Un compleanno originale sulla Senna",
      content: `<p>Cerchi un'idea originale per <strong>festeggiare un compleanno a Parigi</strong>? Imbarcati con i tuoi cari a bordo del Senang per una crociera privata di 2 ore sulla Senna. Dalla Torre Eiffel a Notre-Dame, regalati un panorama eccezionale per spegnere le candeline.</p>

<p>Il Senang è una barca di 12 metri <strong>interamente privatizzata per il tuo gruppo</strong> da 2 a 12 persone. Niente vicini di tavolo, niente rumore: è la tua festa, la tua atmosfera, il tuo momento. Sei libero di portare la torta di compleanno, i regali e le decorazioni.</p>

<p>Con la <strong>formula festiva</strong>, ogni invitato riceve una coppa di champagne per brindare alla tua salute. Puoi anche portare le tue bevande e il cibo, oppure ordinare i nostri taglieri aperitivo per un aperitivo-crociera conviviale.</p>

<p>Collega la tua playlist di compleanno alla <strong>cassa Bluetooth</strong> a disposizione e lascia che il Capitano Michel navighi mentre tu ti godi i tuoi invitati. Il percorso costeggia i più bei monumenti di Parigi: Torre Eiffel, Musée d'Orsay, Île de la Cité, Pont Neuf...</p>

<p>Che tu festeggi i 30, 40, 50 anni o più, questa <strong>crociera di compleanno</strong> si adatta a tutte le atmosfere: pomeriggio in famiglia, serata tra amici, o cena romantica in due. Partenza dal Port de l'Arsenal a Bastille (Parigi 12°).</p>

<p>Il Senang, <strong>veterano delle Olimpiadi di Parigi 2024</strong> e set per shooting Adidas, offre una cornice d'eccezione per festeggiare con stile. Un compleanno che i tuoi invitati non dimenticheranno facilmente.</p>`,
    },
    {
      type: "benefits",
      title: "Perché festeggiare il compleanno sulla Senna?",
      items: [
        {
          icon: "cake",
          title: "Torta a bordo",
          text: "Porta la tua torta di compleanno e spegni le candeline con vista su Parigi.",
        },
        {
          icon: "users",
          title: "Fino a 12 invitati",
          text: "La barca è privatizzata per il tuo gruppo, atmosfera intima garantita.",
        },
        {
          icon: "champagne",
          title: "Champagne offerto",
          text: "Una coppa per persona con la formula festiva per brindare.",
        },
        {
          icon: "music",
          title: "La tua playlist",
          text: "Cassa Bluetooth a disposizione per l'atmosfera musicale.",
        },
      ],
    },
    {
      type: "gallery",
      title: "Feste di compleanno sulla Senna",
      images: [
        {
          src: "/images/gallery/2025-04-08-a-20.58.31_fcc03538.webp",
          alt: "Festa di compleanno sulla Senna a Parigi",
        },
        {
          src: "/images/gallery/2025-04-08-a-21.50.25_ac11bce0.webp",
          alt: "Gruppo che festeggia un compleanno in barca",
        },
        {
          src: "/images/gallery/2025-04-08-a-22.20.47_261af646.webp",
          alt: "Il Senang che naviga per un compleanno",
        },
        {
          src: "/images/gallery/2025-03-03-a-16.00.24_c635ba48.webp",
          alt: "Vista sui ponti di Parigi dalla barca",
        },
      ],
    },
    {
      type: "testimonials",
      title: "Hanno festeggiato il compleanno sulla Senna",
      filter: "anniversaire",
    },
    {
      type: "pricing",
      title: "Le nostre formule compleanno",
    },
    {
      type: "faq",
      title: "Domande frequenti – Compleanno sulla Senna",
      items: [
        {
          question: "Si può portare una torta di compleanno?",
          answer:
            "Certamente! Potete portare la vostra torta, le candeline e tutto il necessario per festeggiare. Abbiamo un tavolino a bordo per sistemarla.",
        },
        {
          question: "Quante persone possono essere invitate?",
          answer:
            "Il Senang accoglie fino a 12 persone. La tariffa base copre da 1 a 6 persone, poi 110€ per persona aggiuntiva.",
        },
        {
          question: "I bambini sono ammessi a bordo?",
          answer:
            "Sì, i bambini sono i benvenuti. Giubbotti di salvataggio adatti sono disponibili a bordo. I bambini sotto i 3 anni sono gratuiti.",
        },
        {
          question: "Si possono portare decorazioni?",
          answer:
            "Assolutamente! Palloncini, striscioni, ghirlande... Siete liberi di decorare la barca per l'occasione. Vi chiediamo solo di non usare coriandoli.",
        },
        {
          question: "Quanto costa un compleanno sulla Senna?",
          answer:
            "A partire da 480€ (formula semplice) o 540€ (formula festiva con champagne) per un gruppo fino a 6 persone. +110€ per persona oltre.",
        },
      ],
    },
  ],
};

export default translation;
