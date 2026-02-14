import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: { title: "Shooting fotografico sulla Senna – Sessione in barca a Parigi", description: "Realizza uno shooting fotografico unico sulla Senna. Barca privata, luce naturale, Pont Alexandre III e Torre Eiffel come sfondo. 2 ore di crociera." },
  hero: { title: "Shooting fotografico sulla Senna", subtitle: "Uno sfondo naturale eccezionale per le vostre più belle foto", cta: { text: "Prenota il tuo shooting" } },
  sections: [
    { type: "richtext", title: "Uno shooting fotografico d'eccezione sull'acqua", content: `<p>Fotografi, coppie, influencer o brand: il Senang offre un <strong>set fotografico galleggiante</strong> unico nel cuore di Parigi. Durante 2 ore di navigazione, godetevi uno sfondo in movimento permanente: la Torre Eiffel, il Pont Alexandre III, le rive della Senna, le isole...</p><p>La <strong>luce naturale sulla Senna</strong> è eccezionale. La golden hour offre riflessi dorati sull'acqua e una luce morbida sui volti — il sogno di ogni fotografo. La barca si muove lentamente, permettendo scatti variati senza cambiare location.</p><p>Il Senang è già stato set per <strong>shooting professionali</strong>: Adidas (con Nicolas Karabétic), Le Slip Français, ed è stato la barca ufficiale della delegazione della Mauritania alle <strong>Olimpiadi di Parigi 2024</strong>. Una cornice collaudata per shooting di qualità.</p><p>La barca è <strong>interamente privatizzata</strong>: niente passanti, niente turisti nell'inquadratura. Il vostro fotografo può lavorare liberamente. Potete anche organizzare uno <strong>shooting addio al nubilato</strong>, un ritratto di coppia, una sessione premaman, un lookbook moda o contenuti per i social.</p><p>Partenza dal <strong>Port de l'Arsenal a Bastille</strong>. Il percorso costeggia entrambe le rive della Senna con i più bei monumenti sullo sfondo. Prenotate la fascia del tramonto per la migliore luce.</p>` },
    { type: "benefits", title: "Perché uno shooting sulla Senna?", items: [
      { icon: "camera", title: "Sfondo eccezionale", text: "Torre Eiffel, Pont Alexandre III, rive della Senna come sfondo." },
      { icon: "sunset", title: "Golden hour", text: "Luce dorata naturale per foto sublimi." },
      { icon: "film", title: "Set collaudato", text: "Già utilizzato da Adidas, Le Slip Français, Olimpiadi 2024." },
      { icon: "lock", title: "Totalmente privato", text: "Nessun passante nell'inquadratura. Il fotografo lavora liberamente." },
    ] },
    { type: "gallery", title: "Shooting sulla Senna", images: [
      { src: "/images/gallery/2025-04-04-a-17.33.30_ea0b05c2.webp", alt: "Shooting fotografico sulla Senna con Torre Eiffel" },
      { src: "/images/gallery/2025-04-08-a-20.57.33_c61d5f00.webp", alt: "Golden hour sulla Senna per shooting" },
      { src: "/images/gallery/2025-04-18-a-09.55.02_4b9f3852.webp", alt: "Vista dalla barca durante uno shooting" },
      { src: "/images/gallery/2025-03-03-a-16.00.26_b41cf5f5.webp", alt: "Il Senang sotto i ponti di Parigi" },
    ] },
    { type: "testimonials", title: "Hanno scelto il Senang", filter: "shooting" },
    { type: "pricing", title: "Le nostre formule shooting fotografico" },
    { type: "faq", title: "Domande frequenti – Shooting fotografico", items: [
      { question: "Si può venire con un fotografo professionista?", answer: "Certamente! Il vostro fotografo è il benvenuto a bordo. Potrà muoversi liberamente sulla barca per variare le angolazioni." },
      { question: "Qual è la fascia migliore per la luce?", answer: "La golden hour (1h prima del tramonto) offre la luce più bella. Prenotate questa fascia in anticipo perché è molto richiesta." },
      { question: "La barca è stabile per le foto?", answer: "Sì, il Senang naviga lentamente e offre una navigazione stabile. Niente vibrazioni fastidiose per le riprese." },
      { question: "Si può fare uno shooting di moda/lookbook?", answer: "Assolutamente. Diversi brand hanno già girato a bordo (Adidas, Le Slip Français). Lo sfondo varia naturalmente durante la navigazione." },
      { question: "Quanto costa uno shooting sulla Senna?", answer: "A partire da 490€ (formula semplice, 2h). La tariffa è la stessa di una crociera standard." },
    ] },
  ],
};
export default translation;
