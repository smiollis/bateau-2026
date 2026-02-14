import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: { title: "Crociera al tramonto sulla Senna – Golden hour a Parigi", description: "Vivete la golden hour sulla Senna. Crociera privata di 2h al tramonto, Torre Eiffel illuminata, champagne. A partire da 480€." },
  hero: { title: "Crociera al tramonto sulla Senna", subtitle: "La golden hour parigina vista dall'acqua — uno spettacolo indimenticabile", cta: { text: "Prenota il tramonto" } },
  sections: [
    { type: "richtext", title: "La luce più bella di Parigi", content: `<p>C'è un momento magico a Parigi: quando il sole scende dietro la Torre Eiffel e la città si veste d'oro. Vivete questo spettacolo dalla Senna a bordo del Senang, una barca di 12 metri <strong>privatizzata per il vostro gruppo</strong>.</p><p>La <strong>crociera al tramonto</strong> è la nostra fascia più richiesta — e per buona ragione. Durante 2 ore, assistete alla trasformazione di Parigi: i riflessi dorati sulla Senna, le ombre lunghe sulle rive, poi i monumenti che si illuminano uno dopo l'altro.</p><p>Il momento forte? Il passaggio davanti alla <strong>Torre Eiffel nel momento in cui le sue luci scintillano</strong>. Uno spettacolo che lascia senza parole, ancora più impressionante visto dall'acqua. Il Pont Alexandre III, il Grand Palais, il Musée d'Orsay... Ogni monumento assume una dimensione fiabesca al calare della notte.</p><p>Con la <strong>formula festiva</strong>, brindate con champagne di fronte a questo panorama. Potete anche preparare un picnic romantico o ordinare i nostri taglieri aperitivo. La cassa Bluetooth è a disposizione per la vostra playlist d'ambiente.</p><p>Questa fascia è ideale per un <strong>appuntamento romantico</strong>, un compleanno, uno shooting fotografico o semplicemente per godersi Parigi in modo diverso. Partenza dal Port de l'Arsenal a Bastille. Prenotate in anticipo: le fasce golden hour vanno a ruba!</p>` },
    { type: "benefits", title: "Perché il tramonto?", items: [
      { icon: "sunset", title: "Golden hour", text: "La luce più bella di Parigi, riflessi dorati sulla Senna." },
      { icon: "sparkles", title: "Torre Eiffel scintillante", text: "Assistete all'illuminazione dall'acqua." },
      { icon: "camera", title: "Foto sublimi", text: "La fascia migliore per foto indimenticabili." },
      { icon: "champagne", title: "Champagne al tramonto", text: "Brindate di fronte al cielo infuocato con la formula festiva." },
    ] },
    { type: "gallery", title: "Tramonti sulla Senna", images: [
      { src: "/images/gallery/2025-04-08-a-20.57.33_c61d5f00.webp", alt: "Tramonto sulla Senna a Parigi" },
      { src: "/images/gallery/2025-03-02-a-21.18.40_52501437.webp", alt: "Golden hour sulla Senna con il Senang" },
      { src: "/images/gallery/2025-04-08-a-21.50.25_ac11bce0.webp", alt: "Parigi illuminata al crepuscolo dalla Senna" },
      { src: "/images/gallery/2025-04-15-a-22.21.11_0329a51a.webp", alt: "Serata sul Senang al tramonto" },
    ] },
    { type: "testimonials", title: "Hanno visto il tramonto", filter: "coucher-soleil" },
    { type: "pricing", title: "Le nostre formule tramonto" },
    { type: "faq", title: "Domande frequenti – Tramonto", items: [
      { question: "A che ora è il tramonto?", answer: "L'orario varia secondo la stagione: circa le 17h30 in inverno, le 21h30 in estate. Vi consigliamo di prenotare 1h30 prima del tramonto." },
      { question: "Questa fascia è più cara?", answer: "No, le tariffe sono le stesse: 480€ (semplice) o 540€ (festiva). Ma questa fascia è molto richiesta, prenotate in anticipo." },
      { question: "Si vede la Torre Eiffel scintillare?", answer: "Sì! Se la vostra crociera copre l'ora esatta (ogni ora dopo il calare della notte), vedrete le 20.000 lampadine scintillare per 5 minuti." },
      { question: "E se il cielo è coperto?", answer: "Anche con tempo coperto, la luce del tramonto è bella. In caso di meteo davvero sfavorevole, rinvio gratuito a una data di vostra scelta." },
      { question: "Si può prenotare per uno shooting fotografico?", answer: "Assolutamente! La golden hour è la fascia preferita dai fotografi. Il Senang è stato set per Adidas e Le Slip Français." },
    ] },
  ],
};
export default translation;
