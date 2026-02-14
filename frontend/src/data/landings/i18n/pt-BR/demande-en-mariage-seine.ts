import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: { title: "Pedido de casamento no Sena – Surpresa privada em Paris", description: "Organize um pedido de casamento inesquecível no Sena. Barco privado, champanhe, cenário de conto de fadas diante da Torre Eiffel. Ajuda na organização incluída." },
  hero: { title: "Pedido de casamento no Sena", subtitle: `O mais lindo "sim" da sua vida, diante da Torre Eiffel`, cta: { text: "Organize seu pedido" } },
  sections: [
    { type: "richtext", title: "Um pedido de casamento original em Paris", content: `<p>Vocês sonham com um <strong>pedido de casamento original em Paris</strong>? Imaginem a cena: vocês estão a bordo de um barco privado no Sena, o sol se põe atrás da Torre Eiffel e vocês ajoelham... Um momento fora do tempo que seu parceiro(a) nunca vai esquecer.</p><p>O Senang é o cenário ideal para um <strong>pedido de casamento no Sena</strong>. Este barco de 12 metros, elegante e intimista, é totalmente privatizado para vocês. Sem olhares alheios, sem turistas: apenas vocês, sua cara-metade e os mais belos monumentos de Paris como cenário.</p><p>Nós ajudamos a <strong>organizar a surpresa</strong>. Entrem em contato com antecedência para preparar o momento perfeito: pétalas de rosa, buquê de flores, playlist especial, fotógrafo discreto... O Capitão Michel está acostumado com esses momentos de emoção.</p><p>O <strong>pacote festivo</strong> inclui uma taça de champanhe para celebrar o "sim". Vocês também podem trazer seu próprio champanhe, um bolo ou uma refeição.</p><p>O momento mais mágico? Quando o barco passa diante da Torre Eiffel ao cair da noite e as <strong>luzes cintilantes</strong> se acendem. É o instante que a maioria dos casais escolhe para fazer a grande pergunta.</p><p>Saída do <strong>Port de l'Arsenal em Bastille</strong>. Fácil de disfarçar como um "simples passeio no Sena" para manter a surpresa.</p>` },
    { type: "benefits", title: "Por que pedir em casamento no Sena?", items: [
      { icon: "heart", title: "Cenário de conto de fadas", text: "A Torre Eiffel iluminada como cenário para o grande momento." },
      { icon: "eyeOff", title: "Surpresa garantida", text: "Ajudamos a organizar a surpresa com total discrição." },
      { icon: "camera", title: "Fotógrafo opcional", text: "Eternize o momento com um fotógrafo discreto a bordo." },
      { icon: "sparkles", title: "Decoração sob medida", text: "Pétalas, velas, flores... Preparamos tudo para vocês." },
    ] },
    { type: "gallery", title: "Pedidos de casamento dos sonhos", images: [
      { src: "/images/gallery/2025-03-02-a-21.18.40_52501437.webp", alt: "Pedido de casamento ao pôr do sol no Sena" },
      { src: "/images/gallery/2025-04-08-a-20.57.33_c61d5f00.webp", alt: "Cruzeiro romântico para pedido de casamento em Paris" },
      { src: "/images/gallery/2025-04-15-a-22.21.11_0329a51a.webp", alt: "Ambiente intimista a bordo do Senang" },
      { src: "/images/gallery/2025-04-08-a-21.50.25_ac11bce0.webp", alt: "Paris iluminada vista do Senang" },
    ] },
    { type: "testimonials", title: "Eles disseram sim no Sena", filter: "mariage" },
    { type: "pricing", title: "Nossos pacotes para pedido de casamento" },
    { type: "faq", title: "Perguntas frequentes – Pedido de casamento", items: [
      { question: "Como organizar a surpresa sem que o(a) parceiro(a) saiba?", answer: "Apresente a saída como um simples passeio no Sena. Entre em contato com antecedência para coordenar detalhes (decoração, timing, fotógrafo) sem que seu parceiro(a) desconfie." },
      { question: "Pode ter um fotógrafo a bordo?", answer: "Sim! Vocês podem convidar um fotógrafo profissional a bordo para capturar o momento. Ajudamos a organizar sua presença discreta." },
      { question: "Qual o melhor momento para o pedido?", answer: "O horário do pôr do sol é o mais romântico. A passagem diante da Torre Eiffel iluminada (à noite) é o momento mais popular." },
      { question: "Pode personalizar a decoração do barco?", answer: "Com certeza! Pétalas de rosa, velas LED, balões, faixas... Vocês podem trazer sua decoração ou confiar a preparação ao nosso pacote Tudo Incluso." },
      { question: "Quanto custa um pedido de casamento no Sena?", answer: "A partir de 540€ pelo pacote festivo (champanhe incluso). O pacote Tudo Incluso com decoração e buffet está disponível sob consulta." },
    ] },
  ],
};
export default translation;
