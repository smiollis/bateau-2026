import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: { title: "Dia dos Namorados no Sena – Cruzeiro romântico em Paris", description: "Presenteie com um cruzeiro privado no Sena para o Dia dos Namorados. Champanhe, Torre Eiffel iluminada, 2h a dois. A partir de 420€." },
  hero: { title: "Dia dos Namorados no Sena", subtitle: "A mais bela declaração de amor acontece sobre a água, diante da Torre Eiffel", cta: { text: "Reserve o Dia dos Namorados" } },
  sections: [
    { type: "richtext", title: "O Dia dos Namorados mais romântico de Paris", content: `<p>Esqueça os restaurantes lotados e os menus fixos: neste ano, presenteie sua cara-metade com um <strong>cruzeiro privado no Sena</strong> para o Dia dos Namorados. O Senang, barco de 12 metros privatizado só para vocês dois, navega 2 horas pelo coração de Paris iluminada.</p><p>Imaginem: uma <strong>taça de champanhe</strong> na mão, sua playlist romântica na caixa de som Bluetooth, e a Torre Eiffel cintilando diante de vocês. A Pont Alexandre III, Notre-Dame, os cais do Sena banhados de luz... Cada minuto é uma lembrança.</p><p>O <strong>pacote festivo</strong> é perfeito para a ocasião: champanhe incluso, clima intimista. Vocês também podem preparar um piquenique romântico (queijos, macarons, morangos...) ou pedir nossas tábuas de aperitivo. O conceito BYO deixa vocês livres.</p><p>O horário do <strong>pôr do sol</strong> é o mais procurado para o Dia dos Namorados. A golden hour transforma Paris em um quadro dourado, depois os monumentos se iluminam um a um. Um espetáculo que deixa sem palavras — e que cria o momento perfeito para uma surpresa.</p><p>Seja para <strong>celebrar o casal</strong>, fazer uma declaração ou simplesmente viver um momento único, o Dia dos Namorados no Sena é inesquecível. Saída do Port de l'Arsenal em Bastille. Reservem cedo: os horários esgotam muito rápido em fevereiro!</p>` },
    { type: "benefits", title: "Por que o Dia dos Namorados no Sena?", items: [
      { icon: "heart", title: "100% romântico", text: "Barco privatizado para 2. Nenhum outro passageiro, apenas vocês." },
      { icon: "champagne", title: "Champanhe incluso", text: "Pacote festivo com taça de champanhe diante da Torre Eiffel." },
      { icon: "sparkles", title: "Torre Eiffel cintilante", text: "O espetáculo das 20.000 lâmpadas visto desde a água." },
      { icon: "music", title: "Sua playlist", text: "Caixa de som Bluetooth fornecida. Criem o clima romântico." },
    ] },
    { type: "gallery", title: "Dia dos Namorados no Sena", images: [
      { src: "/images/gallery/2025-04-08-a-20.57.33_c61d5f00.webp", alt: "Cruzeiro romântico ao pôr do sol" },
      { src: "/images/gallery/2025-03-02-a-21.18.40_52501437.webp", alt: "Golden hour no Sena para o Dia dos Namorados" },
      { src: "/images/gallery/2025-04-08-a-21.50.25_ac11bce0.webp", alt: "Paris iluminada vista do Senang" },
      { src: "/images/gallery/2025-04-15-a-22.21.11_0329a51a.webp", alt: "Noite romântica a bordo do Senang" },
    ] },
    { type: "testimonials", title: "Eles comemoraram o Dia dos Namorados no Sena", filter: "romantique" },
    { type: "pricing", title: "Nossos pacotes Dia dos Namorados" },
    { type: "faq", title: "Perguntas frequentes – Dia dos Namorados", items: [
      { question: "Precisa reservar com muita antecedência?", answer: "Sim! Os horários de fevereiro são muito procurados. Reserve com pelo menos 2 a 3 semanas de antecedência para garantir sua data." },
      { question: "Pode vir só a dois?", answer: "Com certeza! A tarifa base (360€ simples, 420€ festivo) cobre de 1 a 6 pessoas. A dois, é a intimidade total." },
      { question: "Pode trazer bolo ou flores?", answer: "Claro! Bolo, rosas, velas, decorações... Preparem a surpresa, ajudamos a instalar a bordo." },
      { question: "O barco é aquecido em fevereiro?", answer: "O Senang é um barco semi-aberto. Fornecemos mantas, mas levem roupas quentes. O clima aconchegante faz parte do charme!" },
      { question: "Pode fazer um pedido de casamento a bordo?", answer: "É nossa especialidade! Entre em contato para organizar o momento perfeito: local, timing, decoração. Guardamos segredo." },
    ] },
  ],
};
export default translation;
