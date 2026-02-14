import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: { title: "Crociera di Natale sulla Senna – Feste in barca a Parigi", description: "Vivete la magia del Natale sulla Senna. Crociera privata, Parigi illuminata, atmosfera fiabesca. Barca privata da 2 a 12 persone. Da 480€." },
  hero: { title: "Crociera di Natale sulla Senna", subtitle: "La magia delle feste vista dalla Senna — Parigi brilla per voi", cta: { text: "Prenota la crociera di Natale" } },
  sections: [
    { type: "richtext", title: "La magia natalizia sulla Senna", content: `<p>A dicembre, Parigi brilla di mille luci. E non c'è posto migliore per ammirare questo spettacolo che <strong>dalla Senna</strong>. Il Senang vi offre una crociera privata di 2 ore nel cuore della capitale illuminata per le feste.</p><p>Navigate tra le <strong>decorazioni natalizie dei grandi magazzini</strong>, le ghirlande dei ponti, gli alberi illuminati. Il concetto è perfetto: portate la vostra <strong>cioccolata calda, il vin brulé, le caldarroste</strong>... oppure scegliete la formula festiva con champagne.</p><p>Ideale come <strong>regalo di Natale originale</strong>, uscita in famiglia durante le vacanze o serata natalizia tra amici. Partenza dal <strong>Port de l'Arsenal a Bastille</strong>. Forniamo coperte per le serate fresche.</p>` },
    { type: "benefits", title: "Perché una crociera di Natale?", items: [
      { icon: "sparkles", title: "Parigi illuminata", text: "Decorazioni natalizie, ponti illuminati, Torre Eiffel scintillante." },
      { icon: "gift", title: "Regalo originale", text: "Regalate un'esperienza indimenticabile invece di un oggetto." },
      { icon: "users", title: "In famiglia", text: "Da 2 a 12 persone, bambini benvenuti. Atmosfera accogliente." },
      { icon: "coffee", title: "Cioccolata calda BYO", text: "Portate vin brulé, cioccolata calda, tronchetto di Natale... Tutto è permesso." },
    ] },
    { type: "gallery", title: "Natale sulla Senna", images: [
      { src: "/images/gallery/2025-04-08-a-21.50.25_ac11bce0.webp", alt: "Parigi illuminata per Natale dalla Senna" },
      { src: "/images/gallery/2025-04-08-a-20.57.33_c61d5f00.webp", alt: "Atmosfera fiabesca sul Senang" },
      { src: "/images/gallery/2025-04-08-a-20.58.31_fcc03538.webp", alt: "Crociera in famiglia durante le feste" },
      { src: "/images/gallery/2025-03-02-a-21.18.40_52501437.webp", alt: "Serata natalizia sulla Senna" },
    ] },
    { type: "testimonials", title: "Hanno festeggiato il Natale sulla Senna", filter: "famille" },
    { type: "pricing", title: "Le nostre formule Natale" },
    { type: "faq", title: "Domande frequenti – Crociera di Natale", items: [
      { question: "La barca naviga a dicembre?", answer: "Sì! Il Senang naviga tutto l'anno. Forniamo coperte. Prevedete cappelli e guanti." },
      { question: "Si può regalare la crociera?", answer: "Certamente! Offriamo buoni regalo. Contattateci per un buono personalizzato." },
      { question: "I bambini sono benvenuti?", answer: "Sì, è un'uscita familiare perfetta. Giubbotti di salvataggio per bambini forniti. Sotto i 3 anni gratuiti." },
      { question: "Si può portare il vin brulé?", answer: "Certo! Vin brulé, cioccolata, tronchetto di Natale, caldarroste... Portate tutto ciò che fa spirito natalizio." },
      { question: "Ci sono fasce speciali per le feste?", answer: "I fine settimana di dicembre e la settimana tra Natale e Capodanno sono molto richiesti. Prenotate almeno 2 settimane prima." },
    ] },
  ],
};
export default translation;
