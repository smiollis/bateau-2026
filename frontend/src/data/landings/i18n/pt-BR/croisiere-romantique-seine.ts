import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: { title: "Cruzeiro romântico no Sena – Noite privada em Paris", description: "Presenteie com um cruzeiro romântico privado no Sena. 2h a dois com champanhe, pôr do sol e monumentos iluminados. A partir de 480€." },
  hero: { title: "Cruzeiro romântico no Sena", subtitle: "Vivam um momento mágico a dois sobre as águas, com Paris como cenário", cta: { text: "Reserve sua noite" } },
  sections: [
    { type: "richtext", title: "Uma noite romântica inesquecível em Paris", content: `<p>Paris é a cidade do amor, e não há melhor forma de descobri-la a dois do que navegando pelo Sena. Embarquem para um <strong>cruzeiro romântico privado</strong> a bordo do Senang, um elegante barco de 12 metros, só para vocês dois.</p><p>Durante <strong>2 horas de navegação</strong>, deixem-se levar pela magia de Paris ao pôr do sol. A Torre Eiffel se iluminando, os reflexos dourados no Sena, a Pont Alexandre III decorada com seus lampiões... Cada instante é um cartão-postal vivo.</p><p>Com o <strong>pacote festivo</strong>, desfrutem de uma taça de champanhe para brindar diante da Torre Eiffel. Vocês também podem preparar um piquenique gourmet ou pedir nossas tábuas de aperitivo.</p><p>O Senang é <strong>totalmente privatizado</strong>: sem grupos de turistas, sem barulho, apenas o som da água e o murmúrio da cidade. O Capitão Michel, discreto e profissional, deixa vocês aproveitarem sua intimidade enquanto garante uma navegação tranquila.</p><p>Seja para um <strong>aniversário de casal</strong>, uma surpresa romântica ou simplesmente para se reencontrar longe do cotidiano, este cruzeiro oferece um cenário excepcional. Saída do Port de l'Arsenal em Bastille.</p><p>Para uma experiência ainda mais memorável, reservem o horário do pôr do sol: a golden hour no Sena é um espetáculo inesquecível. <strong>O Senang, veterano das Olimpíadas de Paris 2024</strong>, oferece o cenário perfeito para sua noite a dois.</p>` },
    { type: "benefits", title: "Por que um cruzeiro romântico no Sena?", items: [
      { icon: "heart", title: "Intimidade total", text: "Barco privatizado só para vocês dois (ou seu pequeno grupo)." },
      { icon: "champagne", title: "Champanhe incluso", text: "Brindem diante da Torre Eiffel com o pacote festivo." },
      { icon: "sunset", title: "Pôr do sol", text: "Reservem o horário golden hour para um momento mágico." },
      { icon: "utensils", title: "Refeição a bordo", text: "Tragam seu piquenique ou peçam nossas tábuas." },
    ] },
    { type: "gallery", title: "Momentos românticos no Sena", images: [
      { src: "/images/gallery/2025-04-08-a-20.57.33_c61d5f00.webp", alt: "Pôr do sol romântico no Sena" },
      { src: "/images/gallery/2025-03-02-a-21.18.40_52501437.webp", alt: "Cruzeiro a dois no crepúsculo em Paris" },
      { src: "/images/gallery/2025-04-08-a-20.58.31_fcc03538.webp", alt: "O Senang navegando sob as pontes de Paris" },
      { src: "/images/gallery/2025-04-15-a-22.21.11_0329a51a.webp", alt: "Noite romântica a bordo do Senang" },
    ] },
    { type: "testimonials", title: "Eles viveram a magia", filter: "romantique" },
    { type: "pricing", title: "Nossos pacotes para uma noite romântica" },
    { type: "faq", title: "Perguntas frequentes – Cruzeiro romântico", items: [
      { question: "Pode reservar só para duas pessoas?", answer: "Com certeza! O barco é privatizado mesmo para um casal. A tarifa base cobre de 1 a 6 pessoas, então vocês têm o barco todo para vocês." },
      { question: "Qual o melhor momento para um cruzeiro romântico?", answer: "O pôr do sol é o horário mais procurado: a luz dourada nos monumentos e a Torre Eiffel que se ilumina criam um momento mágico. Reservem com antecedência." },
      { question: "Pode organizar uma surpresa?", answer: "Sim! Entrem em contato para prepararmos uma surpresa: decoração especial, champanhe, pétalas de rosa... Ajudamos a organizar o momento perfeito." },
      { question: "Pode trazer refeição a bordo?", answer: "Sim, vocês podem preparar um piquenique gourmet. Também oferecemos tábuas de aperitivo por encomenda." },
      { question: "Quanto custa um cruzeiro romântico?", answer: "A partir de 480€ (pacote simples) ou 540€ (pacote festivo com champanhe) para um cruzeiro privado de 2 horas." },
    ] },
  ],
};
export default translation;
