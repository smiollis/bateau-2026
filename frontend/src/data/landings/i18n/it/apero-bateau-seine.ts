import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: { title: "Aperitivo in barca sulla Senna – Aperitivo privato a Parigi", description: "Organizza un aperitivo sulla Senna a bordo di una barca privata. BYO (porta le tue bevande), 2 ore di crociera, 2 a 12 persone. Da 82€/pers." },
  hero: { title: "Aperitivo in barca sulla Senna", subtitle: "L'aperitivo più cool di Parigi — sull'acqua, tra amici", cta: { text: "Prenota il tuo aperitivo" } },
  sections: [
    { type: "richtext", title: "Il miglior aperitivo di Parigi", content: `<p>Perché prendere l'aperitivo in un bar quando puoi prenderlo <strong>sulla Senna</strong>? Il Senang ti offre il concetto più semplice e geniale di Parigi: una barca di 12 metri privatizzata, le tue bevande, i tuoi amici e 2 ore di navigazione nel cuore della capitale.</p><p>Il concetto è <strong>BYO (Bring Your Own)</strong>: portate birre, vino, rosé, cocktail, patatine, salame, pizza... Tutto quello che volete. Zero supplementi, zero vincoli. È il vostro aperitivo, la vostra atmosfera. Collegate la playlist alla cassa Bluetooth e si parte.</p><p>A <strong>490€ per 6 persone</strong> (cioè 82€ ciascuno), è l'attività più accessibile di Parigi per un momento davvero originale. Afterwork tra colleghi, aperitivo di compleanno, uscita tra amici, pre-serata... Ogni pretesto è buono.</p><p>Mentre il Capitano Michel pilota, voi vi godete il <strong>panorama parigino</strong>: Torre Eiffel, Notre-Dame, Pont Alexandre III, rive della Senna... Il tutto con un bicchiere in mano. Molto meglio di una terrazza affollata.</p><p>Partenza dal <strong>Port de l'Arsenal a Bastille</strong>. Dopo la crociera, siete a due passi dai bar del quartiere per continuare. Offriamo anche <strong>taglieri aperitivo</strong> su ordinazione se preferite che pensiamo a tutto noi.</p>` },
    { type: "benefits", title: "Perché un aperitivo sulla Senna?", items: [
      { icon: "beer", title: "BYO totale", text: "Portate tutte le vostre bevande e il cibo. Zero supplementi." },
      { icon: "wallet", title: "Da 82€/pers.", text: "490€ per 6 = il miglior rapporto qualità-prezzo di Parigi." },
      { icon: "music", title: "La vostra musica", text: "Cassa Bluetooth fornita. La vostra playlist, la vostra atmosfera." },
      { icon: "mapPin", title: "Partenza Bastille", text: "In piena Parigi. Continuate la serata dopo la crociera." },
    ] },
    { type: "gallery", title: "Aperitivi sulla Senna", images: [
      { src: "/images/gallery/2025-04-08-a-20.58.14_0b6ddf22.webp", alt: "Aperitivo tra amici sulla Senna" },
      { src: "/images/gallery/2025-04-08-a-22.20.42_88a4983b.webp", alt: "Atmosfera aperitivo rilassata a bordo" },
      { src: "/images/gallery/2025-04-08-a-22.20.47_261af646.webp", alt: "Gruppo che si gode l'aperitivo sul Senang" },
      { src: "/images/gallery/2025-04-04-a-17.33.30_ea0b05c2.webp", alt: "Navigazione aperitivo nel cuore di Parigi" },
    ] },
    { type: "testimonials", title: "Hanno preso l'aperitivo sulla Senna", filter: "apero" },
    { type: "pricing", title: "Le nostre formule aperitivo" },
    { type: "faq", title: "Domande frequenti – Aperitivo in barca", items: [
      { question: "Si può davvero portare tutto quello che si vuole?", answer: "Sì! Birre, vino, cocktail, patatine, pizza, salame... Tutto è permesso. Vi chiediamo solo di riportare i vostri rifiuti." },
      { question: "Quanto costa a persona?", answer: "490€ per 1 a 6 persone = 82€/pers. per 6 amici. Oltre, +110€ per persona (max 12)." },
      { question: "C'è un frigorifero a bordo?", answer: "No, ma portate una borsa frigo! Il capitano vi aiuta a sistemarla a bordo. Consiglio: prevedete del ghiaccio per tenere il rosé fresco." },
      { question: "Si può prenotare per un afterwork?", answer: "Assolutamente! La fascia 18h-20h infrasettimanale è perfetta. Partenza Bastille, ideale dopo il lavoro." },
      { question: "Offrite taglieri aperitivo?", answer: "Sì, offriamo taglieri di salumi/formaggi su ordinazione. Avvisateci 48h in anticipo." },
    ] },
  ],
};
export default translation;
