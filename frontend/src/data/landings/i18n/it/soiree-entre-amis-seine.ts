import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: {
    title: "Serata tra amici sulla Senna – Aperitivo in barca a Parigi",
    description:
      "Organizza una serata tra amici sulla Senna. Barca privata fino a 12 persone, aperitivo libero, playlist personale. 2 ore di crociera da 490€.",
  },
  hero: {
    title: "Serata tra amici sulla Senna",
    subtitle:
      "Un aperitivo galleggiante nel cuore di Parigi, tra amici e senza pensieri",
    cta: { text: "Prenota la tua serata" },
  },
  sections: [
    {
      type: "richtext",
      title: "Un'uscita tra amici originale a Parigi",
      content: `<p>Voglia di un'<strong>uscita tra amici originale a Parigi</strong>? Dimentica i bar affollati e le terrazze rumorose: imbarcati sulla Senna per un aperitivo galleggiante a bordo del Senang, una barca di 12 metri interamente privatizzata per il vostro gruppo.</p>

<p>Durante <strong>2 ore di crociera</strong>, godetevi Parigi come mai prima: la Torre Eiffel al tramonto, Notre-Dame illuminata, il Pont Alexandre III come sfondo... Il tutto con i vostri amici, le vostre bevande e la vostra musica.</p>

<p>Il concetto è semplice: la barca è <strong>100% privatizzata per il vostro gruppo</strong> da 2 a 12 persone. Portate quello che volete: birre, vino, pizza, picnic, torta... È la vostra serata, zero vincoli. Collegate la vostra playlist alla cassa Bluetooth e si parte.</p>

<p>La <strong>formula semplice a 490€</strong> (per 1 a 6 persone) è l'opzione più accessibile per un afterwork tra colleghi, un aperitivo tra amici o un'uscita rilassata. Voglia di champagne? La formula festiva a 540€ include una coppa per persona.</p>

<p>La partenza è dal <strong>Port de l'Arsenal a Bastille</strong>, in piena Parigi. Dopo la crociera, siete a due passi da bar e ristoranti del quartiere per continuare la serata.</p>

<p>Il Senang ha ospitato la delegazione della Mauritania durante le <strong>Olimpiadi di Parigi 2024</strong> ed è stato set per shooting Adidas e Le Slip Français. Una cornice di classe per una serata rilassata tra amici.</p>`,
    },
    {
      type: "benefits",
      title: "Perché scegliere una barca per la serata tra amici?",
      items: [
        {
          icon: "users",
          title: "Il vostro gruppo, la vostra barca",
          text: "Privatizzata da 2 a 12 persone. Niente turisti, niente vicini.",
        },
        {
          icon: "beer",
          title: "Aperitivo libero",
          text: "Portate bevande e cibo. Zero vincoli, zero supplementi.",
        },
        {
          icon: "music",
          title: "Atmosfera musicale",
          text: "Cassa Bluetooth fornita. La vostra playlist, la vostra atmosfera.",
        },
        {
          icon: "wallet",
          title: "Da 82€/pers.",
          text: "490€ per 6 persone = 82€ ciascuno. Imbattibile a Parigi.",
        },
      ],
    },
    {
      type: "gallery",
      title: "Serate tra amici sulla Senna",
      images: [
        {
          src: "/images/gallery/2025-04-08-a-22.20.47_261af646.webp",
          alt: "Gruppo di amici che si godono una crociera sulla Senna",
        },
        {
          src: "/images/gallery/2025-04-08-a-20.58.14_0b6ddf22.webp",
          alt: "Aperitivo tra amici sulla barca Senang",
        },
        {
          src: "/images/gallery/2025-04-08-a-22.20.42_88a4983b.webp",
          alt: "Atmosfera festosa tra amici sulla Senna",
        },
        {
          src: "/images/gallery/2025-04-04-a-17.33.30_ea0b05c2.webp",
          alt: "Navigazione tra amici nel cuore di Parigi",
        },
      ],
    },
    {
      type: "testimonials",
      title: "Hanno trascorso una serata memorabile",
      filter: "amis",
    },
    {
      type: "pricing",
      title: "Le nostre formule per la serata tra amici",
    },
    {
      type: "faq",
      title: "Domande frequenti – Serata tra amici",
      items: [
        {
          question: "Si possono portare le proprie bevande e il cibo?",
          answer:
            "Sì, è il principio! Portate birre, vino, patatine, pizza, picnic... Tutto ciò che vi piace. Offriamo anche taglieri aperitivo su ordinazione.",
        },
        {
          question: "Quanto costa a persona?",
          answer:
            "La formula semplice a 490€ copre fino a 6 persone, ovvero 82€ per persona. Oltre, 110€ per persona aggiuntiva (max 12).",
        },
        {
          question: "Si può prenotare per un afterwork?",
          answer:
            "Assolutamente! Una fascia infrasettimanale in tardo pomeriggio (18h-20h) è perfetta per un afterwork originale. La partenza da Bastille è ideale dopo il lavoro.",
        },
        {
          question: "Ci sono limiti di rumore o di orario?",
          answer:
            "Navighiamo generalmente tra le 10h e le 22h30. La musica tramite cassa Bluetooth è consentita a volume ragionevole. Vi chiediamo rispetto per i residenti.",
        },
        {
          question: "Cosa succede in caso di pioggia?",
          answer:
            "Il Senang dispone di un tendalino di protezione. In caso di meteo davvero sfavorevole, vi proponiamo un rinvio gratuito a una data di vostra scelta.",
        },
      ],
    },
  ],
};

export default translation;
