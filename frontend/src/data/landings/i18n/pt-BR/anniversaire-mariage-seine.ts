import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: { title: "Aniversário de casamento no Sena – Cruzeiro privado", description: "Celebre seu aniversário de casamento no Sena. Cruzeiro privado para 2 a 12 pessoas, champanhe, decoração romântica diante da Torre Eiffel." },
  hero: { title: "Aniversário de casamento no Sena", subtitle: "Renovem a magia do casal em um cruzeiro privado em Paris", cta: { text: "Reserve seu cruzeiro" } },
  sections: [
    { type: "richtext", title: "Um cruzeiro para celebrar o amor de vocês", content: `<p>Seja para comemorar as <strong>bodas de algodão, prata ou ouro</strong>, um aniversário de casamento merece um cenário excepcional. A bordo do Senang, um barco de 12 metros privatizado só para vocês, revivam a emoção do compromisso ao longo do Sena.</p><p>Durante <strong>2 horas de navegação</strong>, deixem Paris desfilar diante dos olhos: a Torre Eiffel iluminada, a Pont Alexandre III, Notre-Dame... Um cenário romântico que fez a fama da Cidade Luz. Brindem com uma taça de <strong>champanhe incluso</strong> no pacote festivo.</p><p>Vocês podem organizar um <strong>jantar romântico a bordo</strong> trazendo sua própria refeição, seu buffet ou pedindo nossas tábuas de aperitivo. O Capitão Michel, discreto e atencioso, garante uma navegação tranquila enquanto vocês aproveitam a noite.</p><p>Convidem seus entes queridos para celebrar juntos: o Senang acomoda <strong>até 12 pessoas</strong>. Seja a dois ou em petit comité com padrinhos e amigos próximos, a intimidade do barco cria um clima acolhedor e emocionante.</p><p>Saída do <strong>Port de l'Arsenal em Bastille</strong> (Paris 12°). O Senang, que navegou nos <strong>Jogos Olímpicos de Paris 2024</strong>, oferece um cenário de exceção para renovar suas promessas.</p>` },
    { type: "benefits", title: "Por que celebrar no Sena?", items: [
      { icon: "heart", title: "Romantismo absoluto", text: "Paris iluminada como cenário para renovar seu compromisso." },
      { icon: "champagne", title: "Champanhe incluso", text: "Brindem ao amor de vocês com o pacote festivo." },
      { icon: "users", title: "Família e amigos", text: "Convidem até 12 pessoas para compartilhar esse momento." },
      { icon: "utensils", title: "Jantar a bordo", text: "Tragam sua refeição ou peçam nossas tábuas de aperitivo." },
    ] },
    { type: "gallery", title: "Momentos de aniversário no Sena", images: [
      { src: "/images/gallery/2025-03-02-a-21.18.40_52501437.webp", alt: "Cruzeiro de aniversário de casamento ao crepúsculo" },
      { src: "/images/gallery/2025-04-08-a-20.57.33_c61d5f00.webp", alt: "Pôr do sol romântico no Sena" },
      { src: "/images/gallery/2025-04-15-a-22.21.11_0329a51a.webp", alt: "Noite intimista a bordo do Senang" },
      { src: "/images/gallery/2025-04-08-a-21.50.25_ac11bce0.webp", alt: "Paris iluminada para aniversário de casamento" },
    ] },
    { type: "testimonials", title: "Eles celebraram o amor", filter: "mariage" },
    { type: "pricing", title: "Nossos pacotes aniversário de casamento" },
    { type: "faq", title: "Perguntas frequentes – Aniversário de casamento", items: [
      { question: "Pode organizar uma surpresa para o cônjuge?", answer: "Claro! Entre em contato com antecedência para coordenar decoração, champanhe e a chegada a bordo sem levantar suspeitas." },
      { question: "Pode trazer bolo ou refeição?", answer: "Sim, vocês são livres para trazer bolo, refeição de buffet ou piquenique gourmet. Temos uma mesinha a bordo." },
      { question: "Qual o melhor horário?", answer: "O pôr do sol é o mais romântico. No inverno, o cruzeiro noturno oferece os monumentos iluminados." },
      { question: "Pode trazer crianças?", answer: "Sim, crianças são bem-vindas. Coletes salva-vidas adaptados disponíveis. Crianças menores de 3 anos são gratuitas." },
      { question: "Quanto custa o cruzeiro?", answer: "A partir de 360€ (pacote simples) ou 420€ (pacote festivo com champanhe) para 1 a 6 pessoas." },
    ] },
  ],
};
export default translation;
