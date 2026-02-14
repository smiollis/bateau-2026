import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: { title: "Réveillon no Sena – Ano-Novo privado no barco em Paris", description: "Celebre o Ano-Novo no Sena a bordo de um barco privado. Champanhe, fogos de artifício, Torre Eiffel iluminada. Cruzeiro de réveillon em Paris." },
  hero: { title: "Réveillon no Sena", subtitle: "O mais belo Ano-Novo de Paris se vive na água, diante dos fogos de artifício", cta: { text: "Reserve o réveillon" } },
  sections: [
    { type: "richtext", title: "O réveillon mais mágico de Paris", content: `<p>Contagem regressiva diante da <strong>Torre Eiffel iluminada</strong>, uma taça de champanhe na mão, sobre as águas do Sena. O réveillon de Ano-Novo a bordo do Senang é uma experiência fora do comum que seus convidados nunca vão esquecer.</p><p>O Senang, barco de 12 metros <strong>privatizado para seu grupo</strong> (2 a 12 pessoas), navega durante 2 a 3 horas pelo coração de Paris. Vocês assistem ao espetáculo pirotécnico desde a água, com uma vista privilegiada dos monumentos iluminados.</p><p>Preparem o <strong>réveillon sob medida</strong>: platô de frutos do mar, foie gras, champanhe, adereços festivos... O conceito BYO permite trazer tudo o que quiserem. Ou optem pelo pacote Tudo Incluso com buffet e champanhe.</p><p>A passagem sob as <strong>pontes de Paris iluminadas</strong>, os reflexos das luzes no Sena, a contagem regressiva com seus entes queridos longe da multidão... É o Ano-Novo com que vocês sempre sonharam. Íntimo, espetacular e inesquecível.</p><p>Saída do <strong>Port de l'Arsenal em Bastille</strong>. Horário especial de réveillon das 22h30 à 1h00. Vagas muito limitadas: um único réveillon por ano, uma única chance de vivê-lo. Reservem a partir de setembro!</p>` },
    { type: "benefits", title: "Por que o Réveillon no Sena?", items: [
      { icon: "sparkles", title: "Fogos de artifício", text: "Vista direta do espetáculo pirotécnico desde o Sena." },
      { icon: "champagne", title: "Champanhe à meia-noite", text: "Brindem diante da Torre Eiffel na virada do ano." },
      { icon: "lock", title: "Totalmente privativo", text: "Apenas seu grupo. Longe da multidão do Trocadéro." },
      { icon: "clock", title: "Horário estendido", text: "22h30-1h00. Vivam a contagem e celebrem sobre a água." },
    ] },
    { type: "gallery", title: "Réveillon no Sena", images: [
      { src: "/images/gallery/2025-04-08-a-21.50.25_ac11bce0.webp", alt: "Paris iluminada desde o Sena no réveillon" },
      { src: "/images/gallery/2025-04-08-a-20.57.33_c61d5f00.webp", alt: "Clima festivo no Senang" },
      { src: "/images/gallery/2025-04-15-a-22.21.11_0329a51a.webp", alt: "Cruzeiro noturno no Sena" },
      { src: "/images/gallery/2025-03-02-a-21.18.40_52501437.webp", alt: "Vista noturna de Paris desde o barco" },
    ] },
    { type: "testimonials", title: "Eles comemoraram o Ano-Novo no Sena", filter: "soiree" },
    { type: "pricing", title: "Nossos pacotes réveillon" },
    { type: "faq", title: "Perguntas frequentes – Réveillon", items: [
      { question: "Quando precisa reservar?", answer: "O mais cedo possível! Temos apenas um horário de réveillon. Reserve a partir de setembro para garantir sua vaga." },
      { question: "Qual a duração do horário de réveillon?", answer: "O horário especial de réveillon é das 22h30 à 1h00, ou seja, 2h30 de navegação. Tarifa especial sob consulta." },
      { question: "Dá para ver os fogos de artifício?", answer: "Sim! O trajeto é otimizado para a melhor vista do espetáculo pirotécnico e da Torre Eiffel cintilante." },
      { question: "Pode trazer seu próprio champanhe?", answer: "Claro! O conceito BYO vale também para o réveillon. Tragam champanhe, foie gras, adereços... ou optem pelo Tudo Incluso." },
      { question: "Quanto custa?", answer: "A tarifa de réveillon é sob consulta (horário estendido + período especial). Entre em contato para um orçamento personalizado." },
    ] },
  ],
};
export default translation;
