import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: { title: "Crociera in famiglia sulla Senna – Barca privata a Parigi", description: "Regala alla tua famiglia una crociera privata sulla Senna. Bambini benvenuti, barca sicura, 2 ore di navigazione tra Torre Eiffel e Notre-Dame." },
  hero: { title: "Crociera in famiglia sulla Senna", subtitle: "Un momento di condivisione intergenerazionale a bordo di una barca privata", cta: { text: "Prenota in famiglia" } },
  sections: [
    { type: "richtext", title: "Parigi in famiglia dalla Senna", content: `<p>Regala ai tuoi cari un ricordo indimenticabile: una <strong>crociera in famiglia sulla Senna</strong> a bordo del Senang. Questa barca di 12 metri, sicura e intima, è privatizzata solo per la tua famiglia — da 2 a 12 persone, dai nonni ai nipotini.</p><p>Durante <strong>2 ore</strong>, scoprite i monumenti di Parigi da un punto di vista unico: la Torre Eiffel, Notre-Dame de Paris, il Louvre, i ponti storici... I bambini adorano navigare e vedere Parigi dall'acqua. È anche un'occasione perfetta per trasmettere la storia della capitale.</p><p>Il Senang è equipaggiato con <strong>giubbotti di salvataggio per adulti e bambini</strong>. Il Capitano Michel veglia sulla sicurezza di tutti mentre voi vi godete il panorama. I bambini sotto i 3 anni sono gratuiti.</p><p>Siete liberi di portare un <strong>picnic familiare</strong>, una torta di compleanno o merende per i bambini. La formula festiva include una coppa di champagne per gli adulti — perfetta per brindare in famiglia.</p><p>Ideale per una <strong>riunione di famiglia</strong>, un compleanno, le vacanze scolastiche o semplicemente una domenica in famiglia. Partenza dal Port de l'Arsenal a Bastille, facilmente raggiungibile in metro e con passeggino.</p>` },
    { type: "benefits", title: "Perché scegliere una crociera in famiglia?", items: [
      { icon: "shield", title: "Sicurezza bambini", text: "Giubbotti di salvataggio adatti, barca stabile e sicura." },
      { icon: "users", title: "3 generazioni", text: "Da 2 a 12 persone, dai nipotini ai nonni." },
      { icon: "utensils", title: "Picnic libero", text: "Portate merende, torta e bevande per tutta la famiglia." },
      { icon: "baby", title: "Bambini gratuiti", text: "Gratuito per i meno di 3 anni. Passeggino benvenuto al porto." },
    ] },
    { type: "gallery", title: "Famiglie sulla Senna", images: [
      { src: "/images/gallery/2025-04-08-a-20.58.31_fcc03538.webp", alt: "Famiglia che si gode una crociera sulla Senna" },
      { src: "/images/gallery/2025-04-08-a-21.50.25_ac11bce0.webp", alt: "Momenti di convivialità in famiglia a bordo" },
      { src: "/images/gallery/2025-03-03-a-16.00.24_c635ba48.webp", alt: "Vista sui ponti di Parigi dalla barca" },
      { src: "/images/gallery/2025-07-27-a-12.22.05_77ed38c8.webp", alt: "Navigazione familiare nel cuore di Parigi" },
    ] },
    { type: "testimonials", title: "Famiglie soddisfatte", filter: "famille" },
    { type: "pricing", title: "Le nostre formule famiglia" },
    { type: "faq", title: "Domande frequenti – Crociera in famiglia", items: [
      { question: "I bambini sono al sicuro a bordo?", answer: "Sì, il Senang è equipaggiato con giubbotti di salvataggio per adulti e bambini. La barca è stabile e il capitano veglia sulla sicurezza di tutti." },
      { question: "A partire da quale età si può imbarcare?", answer: "Non c'è età minima. Neonati e bambini piccoli sono i benvenuti. I bambini sotto i 3 anni sono gratuiti." },
      { question: "Si può portare un passeggino?", answer: "Sì, il Port de l'Arsenal è accessibile con passeggino. Il passeggino può restare sulla banchina durante la crociera." },
      { question: "Quante persone al massimo?", answer: "Il Senang accoglie fino a 12 persone (bambini inclusi). Tariffa base per 1 a 6 persone, +110€ per persona oltre." },
      { question: "Si può portare cibo per i bambini?", answer: "Assolutamente! Merende, biberon, torta... Portate tutto il necessario. Abbiamo un tavolino a bordo." },
    ] },
  ],
};
export default translation;
