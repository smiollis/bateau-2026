import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: { title: "Capodanno sulla Senna – Festa privata in barca a Parigi", description: "Festeggia il Capodanno sulla Senna a bordo di una barca privata. Champagne, fuochi d'artificio, Torre Eiffel illuminata." },
  hero: { title: "Capodanno sulla Senna", subtitle: "Il Capodanno più bello di Parigi si vive sull'acqua, di fronte ai fuochi d'artificio", cta: { text: "Prenota il Capodanno" } },
  sections: [
    { type: "richtext", title: "Il Capodanno più magico di Parigi", content: `<p>Conto alla rovescia di fronte alla <strong>Torre Eiffel illuminata</strong>, una coppa di champagne in mano, sulle acque della Senna. Il Capodanno a bordo del Senang è un'esperienza straordinaria che i vostri invitati non dimenticheranno mai.</p><p>Il Senang, barca di 12 metri <strong>privatizzata per il vostro gruppo</strong> (da 2 a 12 persone), naviga per 2-3 ore nel cuore di Parigi. Assistete allo spettacolo pirotecnico dall'acqua, con una vista impareggiabile sui monumenti illuminati.</p><p>Preparate il vostro <strong>Capodanno su misura</strong>: frutti di mare, foie gras, champagne, cotillon... Il concetto BYO vi permette di portare tutto quello che volete. Oppure optate per la formula Tutto Incluso con catering e champagne.</p><p>Partenza dal <strong>Port de l'Arsenal a Bastille</strong>. Fascia speciale Capodanno dalle 22h30 all'1h00. Posti molto limitati: prenotate da settembre!</p>` },
    { type: "benefits", title: "Perché il Capodanno sulla Senna?", items: [
      { icon: "sparkles", title: "Fuochi d'artificio", text: "Vista diretta sullo spettacolo pirotecnico dalla Senna." },
      { icon: "champagne", title: "Champagne a mezzanotte", text: "Brindate di fronte alla Torre Eiffel al passaggio al nuovo anno." },
      { icon: "lock", title: "Privacy totale", text: "Solo il vostro gruppo. Lontano dalla folla del Trocadéro." },
      { icon: "clock", title: "Fascia estesa", text: "22h30-1h00. Vivete il conto alla rovescia e festeggiate sull'acqua." },
    ] },
    { type: "gallery", title: "Capodanno sulla Senna", images: [
      { src: "/images/gallery/2025-04-08-a-21.50.25_ac11bce0.webp", alt: "Parigi illuminata dalla Senna a Capodanno" },
      { src: "/images/gallery/2025-04-08-a-20.57.33_c61d5f00.webp", alt: "Atmosfera festosa sul Senang" },
      { src: "/images/gallery/2025-04-15-a-22.21.11_0329a51a.webp", alt: "Crociera notturna sulla Senna" },
      { src: "/images/gallery/2025-03-02-a-21.18.40_52501437.webp", alt: "Vista notturna di Parigi dalla barca" },
    ] },
    { type: "testimonials", title: "Hanno festeggiato il Capodanno sulla Senna", filter: "soiree" },
    { type: "pricing", title: "Le nostre formule Capodanno" },
    { type: "faq", title: "Domande frequenti – Capodanno", items: [
      { question: "Quando bisogna prenotare?", answer: "Il prima possibile! Abbiamo solo una fascia Capodanno. Prenotate da settembre per essere sicuri di avere il vostro posto." },
      { question: "Quanto dura la fascia Capodanno?", answer: "La fascia speciale è dalle 22h30 all'1h00, 2h30 di navigazione. Tariffa speciale su preventivo." },
      { question: "Si vedono i fuochi d'artificio?", answer: "Sì! Il percorso è ottimizzato per la migliore vista sullo spettacolo pirotecnico e la Torre Eiffel scintillante." },
      { question: "Si può portare il proprio champagne?", answer: "Certamente! Il BYO si applica anche a Capodanno. Portate champagne, foie gras, cotillon... oppure optate per il Tutto Incluso." },
      { question: "Quanto costa?", answer: "La tariffa Capodanno è su preventivo (fascia estesa + periodo speciale). Contattateci per un preventivo personalizzato." },
    ] },
  ],
};
export default translation;
