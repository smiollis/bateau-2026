import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: {
    title: "Addio al celibato sulla Senna – Crociera privata a Parigi",
    description:
      "Organizza un addio al celibato memorabile sulla Senna. Barca privata fino a 12 persone, birre e champagne, 2 ore nel cuore di Parigi.",
  },
  hero: {
    title: "Addio al celibato sulla Senna",
    subtitle:
      "Regala al futuro sposo un'esperienza unica e rilassata sulla Senna",
    cta: { text: "Prenota il tuo addio al celibato" },
  },
  sections: [
    {
      type: "richtext",
      title: "Un addio al celibato originale sulla Senna",
      content: `<p>Stufo dei soliti addii al celibato tra bar e discoteche? Regala al futuro sposo un <strong>addio al celibato sulla Senna</strong> che non dimenticherà mai. A bordo del Senang, una barca di 12 metri interamente privatizzata, vivete una serata fuori dal comune tra amici.</p>

<p>Durante <strong>2 ore di navigazione</strong>, godetevi un panorama eccezionale sui più bei monumenti di Parigi: la Torre Eiffel, Notre-Dame, il Louvre, il Pont Alexandre III... Il tutto con la vostra musica, le vostre birre, i vostri snack — è la vostra barca per la serata.</p>

<p>Il Senang è <strong>100% privatizzato</strong> per il vostro gruppo da 2 a 12 persone. Niente turisti, niente vincoli: siete liberi di portare il vostro frigo portatile, i costumi e tutto ciò che renderà questa serata leggendaria. Il Capitano Michel gestisce la navigazione mentre voi vi divertite.</p>

<p>La nostra <strong>formula festiva</strong> include una coppa di champagne per persona — perfetta per il brindisi al futuro sposo. Potete anche optare per la formula semplice e portare le vostre bevande e il cibo. Cassa Bluetooth a disposizione per la vostra playlist.</p>

<p>Partenza dal <strong>Port de l'Arsenal a Bastille</strong> (Parigi 12°), nel cuore della capitale. Dopo la crociera, siete a due passi da rue de Lappe e dalla vita notturna parigina per continuare la festa.</p>

<p><strong>Il Senang ha navigato durante le Olimpiadi di Parigi 2024</strong> per la delegazione della Mauritania ed è stato set per shooting Adidas e Le Slip Français. Una cornice d'eccezione per un addio al celibato degno di nota.</p>`,
    },
    {
      type: "benefits",
      title: "Perché scegliere Un Bateau à Paris per il tuo addio al celibato?",
      items: [
        {
          icon: "ship",
          title: "Barca 100% privata",
          text: "Il Senang tutto per la vostra banda, fino a 12 persone.",
        },
        {
          icon: "beer",
          title: "Le vostre bevande a bordo",
          text: "Portate birre, champagne e snack. È la vostra serata.",
        },
        {
          icon: "music",
          title: "La vostra playlist",
          text: "Cassa Bluetooth a disposizione per un'atmosfera garantita.",
        },
        {
          icon: "mapPin",
          title: "Partenza Bastille",
          text: "Continuate la serata a rue de Lappe dopo la crociera.",
        },
      ],
    },
    {
      type: "gallery",
      title: "Atmosfera addio al celibato sulla Senna",
      images: [
        {
          src: "/images/gallery/2025-04-08-a-22.20.42_88a4983b.webp",
          alt: "Gruppo di amici che festeggiano un addio al celibato sulla Senna",
        },
        {
          src: "/images/gallery/2025-04-08-a-20.58.14_0b6ddf22.webp",
          alt: "Navigazione festosa per un addio al celibato a Parigi",
        },
        {
          src: "/images/gallery/2025-04-08-a-21.50.25_ac11bce0.webp",
          alt: "Parigi illuminata durante un addio al celibato in barca",
        },
        {
          src: "/images/gallery/2025-03-03-a-16.00.26_b41cf5f5.webp",
          alt: "Il Senang sotto i ponti di Parigi",
        },
      ],
    },
    {
      type: "testimonials",
      title: "L'hanno vissuto",
      filter: "evg",
    },
    {
      type: "pricing",
      title: "Le nostre formule addio al celibato",
    },
    {
      type: "faq",
      title: "Domande frequenti – Addio al celibato sulla Senna",
      items: [
        {
          question: "Si possono portare le proprie bevande per l'addio al celibato?",
          answer:
            "Sì! Potete portare birre, champagne, cocktail e tutto quello che volete. Con la formula festiva, una coppa di champagne è offerta a ogni partecipante.",
        },
        {
          question: "Quante persone per un addio al celibato sulla barca?",
          answer:
            "Il Senang accoglie da 2 a 12 persone. La tariffa base copre da 1 a 6 persone, poi 110€ per persona aggiuntiva.",
        },
        {
          question: "Si può collegare la propria musica?",
          answer:
            "Assolutamente! Una cassa Bluetooth è a vostra disposizione. Preparate la vostra playlist e create l'atmosfera.",
        },
        {
          question: "Dov'è il punto di partenza?",
          answer:
            "Partenza dal Port de l'Arsenal, accanto a Place de la Bastille (Parigi 12°). Metro Bastille (linee 1, 5, 8).",
        },
        {
          question: "Quanto costa un addio al celibato sulla Senna?",
          answer:
            "A partire da 490€ per la formula semplice (1 a 6 persone) o 540€ per la formula festiva con champagne. +90€ per persona oltre 6.",
        },
      ],
    },
  ],
};

export default translation;
