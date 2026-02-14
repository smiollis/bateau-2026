import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: { title: "San Valentino sulla Senna – Crociera romantica a Parigi", description: "Regala una crociera privata sulla Senna per San Valentino. Champagne, Torre Eiffel illuminata, 2 ore in coppia. A partire da 540€." },
  hero: { title: "San Valentino sulla Senna", subtitle: "La più bella dichiarazione d'amore si fa sull'acqua, di fronte alla Torre Eiffel", cta: { text: "Prenota San Valentino" } },
  sections: [
    { type: "richtext", title: "Il San Valentino più romantico di Parigi", content: `<p>Dimenticate i ristoranti affollati: quest'anno regalate alla vostra dolce metà una <strong>crociera privata sulla Senna</strong> per San Valentino. Il Senang, barca di 12 metri privatizzata solo per voi due, naviga 2 ore nel cuore di Parigi illuminata.</p><p>Immaginate: una <strong>coppa di champagne</strong> in mano, la vostra playlist romantica sulla cassa Bluetooth e la Torre Eiffel che scintilla davanti a voi. Il Pont Alexandre III, Notre-Dame, le rive della Senna bagnate di luce... Ogni minuto è un ricordo.</p><p>La fascia del <strong>tramonto</strong> è la più richiesta per San Valentino. La golden hour trasforma Parigi in un quadro dorato. Partenza dal Port de l'Arsenal a Bastille. Prenotate presto: le fasce di febbraio vanno a ruba!</p>` },
    { type: "benefits", title: "Perché San Valentino sulla Senna?", items: [
      { icon: "heart", title: "100% romantico", text: "Barca privatizzata per 2. Nessun altro passeggero, solo voi due." },
      { icon: "champagne", title: "Champagne incluso", text: "Formula festiva con champagne di fronte alla Torre Eiffel." },
      { icon: "sparkles", title: "Torre Eiffel scintillante", text: "Lo spettacolo delle 20.000 lampadine visto dall'acqua." },
      { icon: "music", title: "La vostra playlist", text: "Cassa Bluetooth fornita. Create la vostra atmosfera romantica." },
    ] },
    { type: "gallery", title: "San Valentino sulla Senna", images: [
      { src: "/images/gallery/2025-04-08-a-20.57.33_c61d5f00.webp", alt: "Crociera romantica al tramonto" },
      { src: "/images/gallery/2025-03-02-a-21.18.40_52501437.webp", alt: "Golden hour sulla Senna per San Valentino" },
      { src: "/images/gallery/2025-04-08-a-21.50.25_ac11bce0.webp", alt: "Parigi illuminata dal Senang" },
      { src: "/images/gallery/2025-04-15-a-22.21.11_0329a51a.webp", alt: "Serata romantica a bordo del Senang" },
    ] },
    { type: "testimonials", title: "Hanno festeggiato San Valentino sulla Senna", filter: "romantique" },
    { type: "pricing", title: "Le nostre formule San Valentino" },
    { type: "faq", title: "Domande frequenti – San Valentino", items: [
      { question: "Bisogna prenotare con molto anticipo?", answer: "Sì! Le fasce di febbraio sono molto richieste. Prenotate almeno 2-3 settimane prima." },
      { question: "Si può venire solo in coppia?", answer: "Assolutamente! La tariffa base (490€ semplice, 540€ festiva) copre da 1 a 6 persone. In coppia, è intimità totale." },
      { question: "Si può portare torta o fiori?", answer: "Certo! Torta, rose, candele, decorazioni... Preparate la sorpresa, vi aiutiamo a sistemare tutto a bordo." },
      { question: "La barca è riscaldata a febbraio?", answer: "Il Senang è una barca semi-aperta. Forniamo coperte, ma vestitevi caldi. L'atmosfera accogliente fa parte del fascino!" },
      { question: "Si può fare una proposta di matrimonio a bordo?", answer: "È la nostra specialità! Contattateci per organizzare il momento perfetto. Manteniamo il segreto." },
    ] },
  ],
};
export default translation;
