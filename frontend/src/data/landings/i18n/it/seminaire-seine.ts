import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: { title: "Seminario sulla Senna – Evento aziendale in barca a Parigi", description: "Organizza il tuo seminario sulla Senna. Barca privata per 2 a 12 collaboratori, ambiente ispirante, fatturazione aziendale. Da 490€." },
  hero: { title: "Seminario sulla Senna", subtitle: "Un ambiente ispirante per le tue riunioni di team — lontano dall'ufficio, sull'acqua", cta: { text: "Prenota il tuo seminario" } },
  sections: [
    { type: "richtext", title: "Un seminario fuori dall'ufficio, sulla Senna", content: `<p>Cambia ambiente per <strong>liberare la creatività</strong> del tuo team. Il Senang, barca di 12 metri privatizzata, offre uno spazio unico per organizzare un seminario nel cuore di Parigi. Durante 2 ore di navigazione, i tuoi collaboratori scambiano idee in un ambiente ispirante e disconnesso.</p><p>Il formato è flessibile: <strong>riunione di lavoro</strong> al mattino, brainstorming creativo nel pomeriggio, o afterwork di coesione alla sera. <strong>Fatturazione aziendale</strong> disponibile.</p><p>Il Senang ha ospitato <strong>eventi corporate</strong> per marchi come Adidas e Le Slip Français, ed è stato la barca ufficiale della Mauritania alle Olimpiadi di Parigi 2024. Partenza dal Port de l'Arsenal a Bastille.</p>` },
    { type: "benefits", title: "Perché un seminario sulla Senna?", items: [
      { icon: "lightbulb", title: "Ambiente ispirante", text: "La Senna e i monumenti di Parigi stimolano la creatività." },
      { icon: "briefcase", title: "Fattura aziendale", text: "Fatturazione professionale con IVA. Spese aziendali." },
      { icon: "users", title: "Da 2 a 12 persone", text: "Formato intimo ideale per un comitato di direzione o team di progetto." },
      { icon: "utensils", title: "Catering possibile", text: "Plateau-repas, buffet freddo, taglieri aperitivo su ordinazione." },
    ] },
    { type: "gallery", title: "Seminari sulla Senna", images: [
      { src: "/images/gallery/2025-04-08-a-22.20.47_261af646.webp", alt: "Seminario aziendale sulla Senna" },
      { src: "/images/gallery/2025-04-08-a-20.58.14_0b6ddf22.webp", alt: "Riunione di team a bordo del Senang" },
      { src: "/images/gallery/2025-03-03-a-16.00.26_b41cf5f5.webp", alt: "Il Senang sotto i ponti di Parigi" },
      { src: "/images/gallery/2025-04-08-a-22.20.42_88a4983b.webp", alt: "Atmosfera cordiale per un seminario" },
    ] },
    { type: "testimonials", title: "Hanno organizzato il loro seminario sulla Senna", filter: "team-building" },
    { type: "pricing", title: "Le nostre formule seminario" },
    { type: "faq", title: "Domande frequenti – Seminario", items: [
      { question: "C'è il WiFi a bordo?", answer: "Non c'è WiFi a bordo. Ma la copertura 4G/5G è eccellente sulla Senna. Preparate i vostri documenti in anticipo." },
      { question: "Si può proiettare una presentazione?", answer: "Non c'è proiettore, ma si può trasmettere audio tramite la cassa Bluetooth. Per i contenuti visivi, consigliamo un tablet o uno schermo portatile." },
      { question: "Quale formato per un brainstorming?", answer: "La fascia di 2h è ideale: 30 min di installazione e ice-breaking, 1h di lavoro, 30 min di conclusioni e aperitivo." },
      { question: "Si può prolungare la durata?", answer: "Sì, contattateci per una fascia estesa. Supplemento orario su preventivo." },
      { question: "Qual è la tariffa per 10 persone?", answer: "490€ (base 1-6) + 4 × 110€ = 930€ per 10 persone (formula semplice). Festiva e Tutto Incluso su preventivo." },
    ] },
  ],
};
export default translation;
