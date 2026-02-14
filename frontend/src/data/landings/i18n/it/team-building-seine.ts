import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: { title: "Team building sulla Senna – Evento aziendale a Parigi", description: "Organizza un team building originale sulla Senna. Barca privata per 2 a 12 collaboratori, aperitivo, 2 ore di crociera. Fattura aziendale disponibile." },
  hero: { title: "Team building sulla Senna", subtitle: "Rafforza la coesione del tuo team con una crociera privata nel cuore di Parigi", cta: { text: "Prenota il tuo team building" } },
  sections: [
    { type: "richtext", title: "Un team building fuori dal comune", content: `<p>Cerchi un'<strong>uscita aziendale originale a Parigi</strong>? Dimentica le escape room e il bowling: imbarca il tuo team sulla Senna per un team building di cui tutti parleranno. Il Senang, barca di 12 metri privatizzata, offre una cornice unica per rafforzare i legami tra colleghi.</p><p>Durante <strong>2 ore di crociera</strong>, il tuo team da 2 a 12 persone gode di un panorama eccezionale: Torre Eiffel, Notre-Dame, Musée d'Orsay... Lontano dalle mura dell'ufficio, le conversazioni si liberano e le idee fluiscono. Ideale per un afterwork, un pensionamento o la celebrazione di un successo del team.</p><p>Formula flessibile: <strong>aperitivo libero a bordo</strong> (portate le vostre bevande e plateau-repas) o optate per la formula festiva con champagne incluso. Cassa Bluetooth a disposizione per la musica d'ambiente.</p><p><strong>Fatturazione aziendale</strong> disponibile su richiesta. Emettiamo fattura conforme con IVA per il passaggio in spese professionali. Contattateci per un preventivo personalizzato se desiderate la formula Tutto Incluso con catering.</p><p>Partenza dal <strong>Port de l'Arsenal a Bastille</strong>, facilmente raggiungibile in metro. Il Senang, <strong>veterano delle Olimpiadi di Parigi 2024</strong> e set per shooting Adidas, impressionerà i vostri collaboratori.</p>` },
    { type: "benefits", title: "Perché un team building sulla Senna?", items: [
      { icon: "briefcase", title: "Fattura aziendale", text: "Fatturazione professionale disponibile. Passaggio in spese aziendali." },
      { icon: "users", title: "Fino a 12 persone", text: "Formato ideale per un team affiatato. Atmosfera conviviale garantita." },
      { icon: "utensils", title: "Catering possibile", text: "Formula Tutto Incluso con taglieri, buffet o catering su preventivo." },
      { icon: "mapPin", title: "Partenza Bastille", text: "Facilmente raggiungibile in metro. Afterwork possibile dopo la crociera." },
    ] },
    { type: "gallery", title: "Team building sulla Senna", images: [
      { src: "/images/gallery/2025-04-08-a-22.20.47_261af646.webp", alt: "Team in team building sulla Senna" },
      { src: "/images/gallery/2025-04-08-a-20.58.14_0b6ddf22.webp", alt: "Crociera aziendale a Parigi" },
      { src: "/images/gallery/2025-03-03-a-16.00.26_b41cf5f5.webp", alt: "Il Senang sotto i ponti di Parigi" },
      { src: "/images/gallery/2025-04-08-a-22.20.42_88a4983b.webp", alt: "Atmosfera conviviale a bordo" },
    ] },
    { type: "testimonials", title: "Hanno scelto il Senang", filter: "team-building" },
    { type: "pricing", title: "Le nostre formule team building" },
    { type: "faq", title: "Domande frequenti – Team building", items: [
      { question: "Si può ottenere una fattura aziendale?", answer: "Sì, emettiamo una fattura conforme con IVA per il passaggio in spese professionali. Contattateci via email." },
      { question: "Quale formato per un afterwork?", answer: "La fascia 18h-20h infrasettimanale è ideale. Formula semplice a 490€ o festiva a 540€, il vostro team porta l'aperitivo." },
      { question: "Si possono organizzare attività a bordo?", answer: "La barca è ideale per discussioni informali, un brainstorming o un quiz di squadra. Lo spazio è aperto e conviviale." },
      { question: "Quanti collaboratori al massimo?", answer: "Il Senang accoglie fino a 12 persone. Per gruppi più grandi, contattateci per studiare una soluzione." },
      { question: "Qual è la tariffa?", answer: "A partire da 490€ per 1 a 6 persone, +110€ per persona oltre. Formula Tutto Incluso con catering su preventivo." },
    ] },
  ],
};
export default translation;
