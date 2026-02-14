import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: { title: "Seminário no Sena – Evento corporativo no barco em Paris", description: "Organize seu seminário no Sena. Barco privatizado para 2 a 12 colaboradores, cenário inspirador, faturamento empresarial. A partir de 480€." },
  hero: { title: "Seminário no Sena", subtitle: "Um cenário inspirador para suas reuniões de equipe — longe do escritório, sobre a água", cta: { text: "Reserve seu seminário" } },
  sections: [
    { type: "richtext", title: "Um seminário fora de sede, no Sena", content: `<p>Mudem de cenário para <strong>liberar a criatividade</strong> da sua equipe. O Senang, barco de 12 metros privatizado, oferece um espaço único para organizar um seminário no coração de Paris. Durante 2 horas de navegação, seus colaboradores trocam ideias em um ambiente inspirador e isolado.</p><p>A atmosfera no Sena favorece as <strong>conversas informais e ideias novas</strong>. Longe das salas de reunião, as discussões são mais livres, os laços mais fortes. O panorama parisiense — Torre Eiffel, Notre-Dame, pontes históricas — oferece um cenário estimulante para brainstorming.</p><p>O formato é flexível: <strong>reunião de trabalho</strong> pela manhã, brainstorming criativo à tarde, ou afterwork de integração à noite. A caixa de som Bluetooth permite reproduzir uma apresentação em áudio. O barco dispõe de um espaço aberto propício para trocas em grupo.</p><p><strong>Faturamento empresarial</strong> disponível: emitimos nota fiscal conforme com IVA para dedução em despesas profissionais. Para grupos acima de 6 pessoas, entre em contato para um orçamento Tudo Incluso com buffet (marmitas, buffet frio...).</p><p>O Senang já recebeu <strong>eventos corporativos</strong> de marcas como Adidas e Le Slip Français, e foi o barco oficial da delegação da Mauritânia nos Jogos Olímpicos de Paris 2024. Um cenário comprovado para seus eventos empresariais. Saída do Port de l'Arsenal em Bastille.</p>` },
    { type: "benefits", title: "Por que um seminário no Sena?", items: [
      { icon: "lightbulb", title: "Cenário inspirador", text: "O Sena e os monumentos de Paris estimulam a criatividade." },
      { icon: "briefcase", title: "Fatura empresarial", text: "Faturamento profissional com IVA. Dedutível em despesas." },
      { icon: "users", title: "2 a 12 pessoas", text: "Formato intimista ideal para comitê de direção ou equipe de projeto." },
      { icon: "utensils", title: "Buffet disponível", text: "Marmitas, buffet frio, tábuas de aperitivo sob encomenda." },
    ] },
    { type: "gallery", title: "Seminários no Sena", images: [
      { src: "/images/gallery/2025-04-08-a-22.20.47_261af646.webp", alt: "Seminário empresarial no Sena" },
      { src: "/images/gallery/2025-04-08-a-20.58.14_0b6ddf22.webp", alt: "Reunião de equipe a bordo do Senang" },
      { src: "/images/gallery/2025-03-03-a-16.00.26_b41cf5f5.webp", alt: "O Senang sob as pontes de Paris" },
      { src: "/images/gallery/2025-04-08-a-22.20.42_88a4983b.webp", alt: "Clima descontraído em seminário" },
    ] },
    { type: "testimonials", title: "Eles organizaram o seminário no Sena", filter: "team-building" },
    { type: "pricing", title: "Nossos pacotes seminário" },
    { type: "faq", title: "Perguntas frequentes – Seminário", items: [
      { question: "Tem Wi-Fi a bordo?", answer: "Não, sem Wi-Fi embarcado. Mas a cobertura 4G/5G é excelente no Sena em Paris. Preparem seus documentos com antecedência." },
      { question: "Pode projetar uma apresentação?", answer: "Não há projetor, mas vocês podem reproduzir áudio pela caixa Bluetooth. Para visuais, recomendamos um tablet ou tela portátil." },
      { question: "Qual formato para um brainstorming?", answer: "O bloco de 2h é ideal: 30 min de acolhida e quebra-gelo, 1h de trabalho concentrado, 30 min de resumo e aperitivo." },
      { question: "Pode estender a duração?", answer: "Sim, entre em contato para um bloco estendido. Suplemento por hora sob consulta." },
      { question: "Qual o valor para 10 pessoas?", answer: "480€ (base 1-6 pessoas) + 4 x 110€ = 920€ para 10 pessoas (pacote simples). Pacote festivo e Tudo Incluso sob consulta." },
    ] },
  ],
};
export default translation;
