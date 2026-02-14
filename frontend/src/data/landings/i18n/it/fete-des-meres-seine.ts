import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: { title: "Festa della Mamma sulla Senna – Crociera regalo a Parigi", description: "Regala a tua madre una crociera privata sulla Senna per la Festa della Mamma. Champagne, Torre Eiffel, momento in famiglia. Da 480€." },
  hero: { title: "Festa della Mamma sulla Senna", subtitle: "Il regalo più bello per la mamma — una crociera privata nel cuore di Parigi", cta: { text: "Regala la crociera" } },
  sections: [
    { type: "richtext", title: "Il regalo perfetto per la Festa della Mamma", content: `<p>Quest'anno, dimenticate fiori e profumo. Regalate a vostra madre un <strong>momento indimenticabile sulla Senna</strong>. Il Senang, barca di 12 metri privatizzata per la vostra famiglia, naviga 2 ore tra i più bei monumenti di Parigi.</p><p>Immaginate la sua sorpresa: una <strong>barca tutta per lei</strong>, una coppa di champagne, la Torre Eiffel che sfila e tutta la famiglia riunita. È molto più di un regalo — è un ricordo che resterà inciso per sempre.</p><p>Il Senang accoglie <strong>da 2 a 12 persone</strong>. Offriamo <strong>buoni regalo</strong> personalizzati. Partenza dal Port de l'Arsenal a Bastille.</p>` },
    { type: "benefits", title: "Perché la Senna per la Festa della Mamma?", items: [
      { icon: "gift", title: "Regalo unico", text: "Un ricordo indimenticabile, meglio di un oggetto. Buono regalo disponibile." },
      { icon: "heart", title: "Momento in famiglia", text: "Riunite tutta la famiglia intorno alla mamma sulla Senna." },
      { icon: "champagne", title: "Champagne incluso", text: "Formula festiva con champagne per brindare in famiglia." },
      { icon: "camera", title: "Foto ricordo", text: "La Torre Eiffel e i ponti di Parigi come sfondo." },
    ] },
    { type: "gallery", title: "Festa della Mamma sulla Senna", images: [
      { src: "/images/gallery/2025-04-08-a-20.58.31_fcc03538.webp", alt: "Famiglia riunita sulla Senna per la Festa della Mamma" },
      { src: "/images/gallery/2025-04-08-a-21.50.25_ac11bce0.webp", alt: "Momenti familiari a bordo" },
      { src: "/images/gallery/2025-04-08-a-20.57.33_c61d5f00.webp", alt: "Tramonto sulla Senna" },
      { src: "/images/gallery/2025-07-27-a-12.22.05_77ed38c8.webp", alt: "Navigazione familiare nel cuore di Parigi" },
    ] },
    { type: "testimonials", title: "Hanno adorato la loro crociera", filter: "famille" },
    { type: "pricing", title: "Le nostre formule Festa della Mamma" },
    { type: "faq", title: "Domande frequenti – Festa della Mamma", items: [
      { question: "Offrite buoni regalo?", answer: "Sì! Offriamo buoni regalo personalizzati, stampabili o via email. Ideale per mantenere la sorpresa." },
      { question: "Si può venire con bambini piccoli?", answer: "Certo! Giubbotti di salvataggio per bambini forniti, passeggino custodito sulla banchina. Sotto i 3 anni gratuiti." },
      { question: "Si può portare una torta?", answer: "Assolutamente! Torta, fiori, regali, brunch... Portate tutto ciò che renderà felice la mamma." },
      { question: "Quale fascia consigliate?", answer: "Il tramonto (variabile secondo la stagione) offre la luce più bella per le foto." },
      { question: "Quante persone al massimo?", answer: "Il Senang accoglie fino a 12 persone. Tariffa base 1 a 6 persone (480€ semplice), +110€ per persona oltre." },
    ] },
  ],
};
export default translation;
