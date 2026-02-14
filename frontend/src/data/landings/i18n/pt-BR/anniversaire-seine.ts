import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: { title: "Aniversário no Sena – Festa privada no barco em Paris", description: "Comemore seu aniversário no Sena a bordo de um barco privativo. Até 12 convidados, champanhe, bolo a bordo. 2 horas de cruzeiro no coração de Paris." },
  hero: { title: "Comemore seu aniversário no Sena", subtitle: "Um aniversário inesquecível a bordo de um barco privado no coração de Paris", cta: { text: "Reserve seu aniversário" } },
  sections: [
    { type: "richtext", title: "Um aniversário original no Sena", content: `<p>Procurando uma ideia original para <strong>comemorar um aniversário em Paris</strong>? Embarque com seus amigos e família a bordo do Senang para um cruzeiro privado de 2 horas no Sena. Da Torre Eiffel a Notre-Dame, um panorama excepcional para soprar as velinhas.</p><p>O Senang é um barco de 12 metros <strong>totalmente privatizado para seu grupo</strong> de 2 a 12 pessoas. Sem vizinhos de mesa, sem barulho: é a sua festa, seu clima, seu momento. Vocês são livres para trazer seu bolo de aniversário, presentes e decoração.</p><p>Com o <strong>pacote festivo</strong>, cada convidado recebe uma taça de champanhe para brindar à sua saúde. Vocês também podem trazer suas próprias bebidas e comida, ou encomendar nossas tábuas de aperitivo.</p><p>Conectem sua playlist de aniversário na <strong>caixa de som Bluetooth</strong> e deixem o Capitão Michel navegar enquanto vocês aproveitam seus convidados. O trajeto passa pelos mais belos monumentos de Paris: Torre Eiffel, Musée d'Orsay, Île de la Cité, Pont Neuf...</p><p>Seja para comemorar os 30, 40, 50 ou mais, este <strong>cruzeiro de aniversário</strong> se adapta a todos os climas. Saída do Port de l'Arsenal em Bastille (Paris 12°).</p><p>O Senang, <strong>veterano das Olimpíadas de Paris 2024</strong> e cenário para ensaios da Adidas, oferece um cenário excepcional para celebrar com estilo.</p>` },
    { type: "benefits", title: "Por que comemorar o aniversário no Sena?", items: [
      { icon: "cake", title: "Bolo a bordo", text: "Traga seu bolo de aniversário e sopre as velinhas com Paris ao fundo." },
      { icon: "users", title: "Até 12 convidados", text: "O barco é privatizado para seu grupo, clima intimista garantido." },
      { icon: "champagne", title: "Champanhe incluso", text: "Uma taça por pessoa com o pacote festivo para brindar." },
      { icon: "music", title: "Sua playlist", text: "Caixa de som Bluetooth à disposição para o clima musical." },
    ] },
    { type: "gallery", title: "Festas de aniversário no Sena", images: [
      { src: "/images/gallery/2025-04-08-a-20.58.31_fcc03538.webp", alt: "Festa de aniversário no Sena em Paris" },
      { src: "/images/gallery/2025-04-08-a-21.50.25_ac11bce0.webp", alt: "Grupo comemorando aniversário no barco" },
      { src: "/images/gallery/2025-04-08-a-22.20.47_261af646.webp", alt: "O Senang navegando para um aniversário" },
      { src: "/images/gallery/2025-03-03-a-16.00.24_c635ba48.webp", alt: "Vista das pontes de Paris do barco" },
    ] },
    { type: "testimonials", title: "Eles comemoraram o aniversário no Sena", filter: "anniversaire" },
    { type: "pricing", title: "Nossos pacotes de aniversário" },
    { type: "faq", title: "Perguntas frequentes – Aniversário no Sena", items: [
      { question: "Pode trazer bolo de aniversário?", answer: "Claro! Vocês podem trazer seu bolo, velinhas e tudo para celebrar. Temos uma mesinha a bordo para acomodar." },
      { question: "Quantas pessoas podem ser convidadas?", answer: "O Senang comporta até 12 pessoas. A tarifa base cobre de 1 a 6 pessoas, depois 110€ por pessoa adicional." },
      { question: "Crianças são aceitas a bordo?", answer: "Sim, crianças são bem-vindas. Coletes salva-vidas infantis estão disponíveis a bordo. Crianças menores de 3 anos são gratuitas." },
      { question: "Pode trazer decoração?", answer: "Com certeza! Balões, faixas, guirlandas... Vocês são livres para decorar o barco. Pedimos apenas que não usem confete." },
      { question: "Quanto custa um aniversário no Sena?", answer: "A partir de 480€ (pacote simples) ou 540€ (pacote festivo com champanhe) para um grupo de até 6 pessoas. +110€ por pessoa adicional." },
    ] },
  ],
};
export default translation;
