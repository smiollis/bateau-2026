import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: { title: "Anniversario di matrimonio sulla Senna – Crociera privata", description: "Festeggiate il vostro anniversario di matrimonio sulla Senna. Crociera privata per 2 a 12 persone, champagne, scenografia romantica di fronte alla Torre Eiffel." },
  hero: { title: "Anniversario di matrimonio sulla Senna", subtitle: "Rinnovate la magia della vostra coppia con una crociera privata a Parigi", cta: { text: "Prenota la tua crociera" } },
  sections: [
    { type: "richtext", title: "Una crociera per celebrare il vostro amore", content: `<p>Che festeggiate le <strong>nozze di cotone, d'argento o d'oro</strong>, un anniversario di matrimonio merita una cornice eccezionale. A bordo del Senang, una barca di 12 metri privatizzata solo per voi, rivivete l'emozione del vostro impegno lungo la Senna.</p><p>Durante <strong>2 ore di navigazione</strong>, lasciate che Parigi sfili davanti ai vostri occhi: la Torre Eiffel illuminata, il Pont Alexandre III, Notre-Dame... Uno scenario romantico che ha reso celebre la Ville Lumière. Brindate con una coppa di <strong>champagne offerto</strong> grazie alla formula festiva.</p><p>Potete organizzare una <strong>cena romantica a bordo</strong> portando il vostro pasto, il vostro catering o ordinando i nostri taglieri aperitivo. Il Capitano Michel, discreto e premuroso, garantisce una navigazione fluida mentre voi vi godete la serata.</p><p>Invitate i vostri cari per festeggiare insieme: il Senang accoglie <strong>fino a 12 persone</strong>. Che sia in coppia o in piccolo comitato con i vostri testimoni e amici intimi, l'intimità della barca crea un'atmosfera calda e commovente.</p><p>Partenza dal <strong>Port de l'Arsenal a Bastille</strong> (Parigi 12°). Il Senang, che ha navigato per le <strong>Olimpiadi di Parigi 2024</strong>, vi offre una cornice d'eccezione per rinnovare la vostra promessa.</p>` },
    { type: "benefits", title: "Perché festeggiare sulla Senna?", items: [
      { icon: "heart", title: "Romanticismo assoluto", text: "Parigi illuminata come sfondo per rinnovare il vostro impegno." },
      { icon: "champagne", title: "Champagne offerto", text: "Brindate al vostro amore con la formula festiva." },
      { icon: "users", title: "Famiglia e amici", text: "Invitate fino a 12 persone per condividere questo momento." },
      { icon: "utensils", title: "Cena a bordo", text: "Portate il vostro pasto o ordinate i nostri taglieri." },
    ] },
    { type: "gallery", title: "Momenti di anniversario sulla Senna", images: [
      { src: "/images/gallery/2025-03-02-a-21.18.40_52501437.webp", alt: "Crociera anniversario di matrimonio al crepuscolo" },
      { src: "/images/gallery/2025-04-08-a-20.57.33_c61d5f00.webp", alt: "Tramonto romantico sulla Senna" },
      { src: "/images/gallery/2025-04-15-a-22.21.11_0329a51a.webp", alt: "Serata intima a bordo del Senang" },
      { src: "/images/gallery/2025-04-08-a-21.50.25_ac11bce0.webp", alt: "Parigi illuminata per un anniversario di matrimonio" },
    ] },
    { type: "testimonials", title: "Hanno celebrato il loro amore", filter: "mariage" },
    { type: "pricing", title: "Le nostre formule anniversario di matrimonio" },
    { type: "faq", title: "Domande frequenti – Anniversario di matrimonio", items: [
      { question: "Si può organizzare una sorpresa per il coniuge?", answer: "Certamente! Contattateci in anticipo per coordinare la decorazione, lo champagne e l'arrivo a bordo senza destare sospetti." },
      { question: "Si può portare una torta o un pasto?", answer: "Sì, siete liberi di portare torta, pasto del catering o picnic gourmet. Abbiamo un tavolino a bordo." },
      { question: "Qual è la fascia migliore?", answer: "Il tramonto è la più romantica. In inverno, la crociera notturna offre i monumenti illuminati." },
      { question: "Si può venire con i bambini?", answer: "Sì, i bambini sono i benvenuti. Giubbotti di salvataggio adatti disponibili. Bambini sotto i 3 anni gratuiti." },
      { question: "Quanto costa la crociera?", answer: "A partire da 480€ (formula semplice) o 540€ (formula festiva con champagne) per 1 a 6 persone." },
    ] },
  ],
};
export default translation;
