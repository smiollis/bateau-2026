import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: { title: "Team building no Sena – Evento corporativo em Paris", description: "Organize um team building original no Sena. Barco privativo para 2 a 12 colaboradores, aperitivo, 2h de cruzeiro. Fatura empresarial disponível." },
  hero: { title: "Team building no Sena", subtitle: "Fortaleça a coesão da sua equipe em um cruzeiro privado no coração de Paris", cta: { text: "Reserve seu team building" } },
  sections: [
    { type: "richtext", title: "Um team building fora do comum", content: `<p>Está procurando uma <strong>atividade corporativa original em Paris</strong>? Esqueça escape rooms e boliche: embarque sua equipe no Sena para um team building inesquecível. O Senang, barco de 12 metros privatizado, oferece um cenário único para fortalecer os laços entre colegas.</p><p>Durante <strong>2 horas de cruzeiro</strong>, sua equipe de 2 a 12 pessoas aproveita um panorama excepcional: Torre Eiffel, Notre-Dame, Musée d'Orsay... Longe das paredes do escritório, as conversas fluem e as ideias surgem. Ideal para um afterwork, uma despedida de aposentadoria ou a celebração de um sucesso da equipe.</p><p>Formato flexível: <strong>aperitivo livre a bordo</strong> (tragam suas bebidas e bandejas) ou optem pelo pacote festivo com champanhe incluso. Caixa de som Bluetooth à disposição para música ambiente.</p><p><strong>Faturamento empresarial</strong> disponível sob solicitação. Emitimos nota fiscal conforme para dedução em despesas profissionais. Entre em contato para um orçamento personalizado se desejarem o pacote Tudo Incluso com buffet.</p><p>Saída do <strong>Port de l'Arsenal em Bastille</strong>, facilmente acessível de metrô. O Senang, <strong>veterano dos Jogos Olímpicos de Paris 2024</strong> e cenário para filmagens da Adidas, impressionará seus colaboradores.</p>` },
    { type: "benefits", title: "Por que um team building no Sena?", items: [
      { icon: "briefcase", title: "Fatura empresarial", text: "Faturamento profissional disponível. Dedutível em despesas empresariais." },
      { icon: "users", title: "Até 12 pessoas", text: "Formato ideal para equipes. Ambiente descontraído garantido." },
      { icon: "utensils", title: "Buffet disponível", text: "Pacote Tudo Incluso com tábuas, buffet ou catering sob orçamento." },
      { icon: "mapPin", title: "Saída em Bastille", text: "Fácil acesso de metrô. Afterwork possível após o cruzeiro." },
    ] },
    { type: "gallery", title: "Team buildings no Sena", images: [
      { src: "/images/gallery/2025-04-08-a-22.20.47_261af646.webp", alt: "Equipe em team building no Sena" },
      { src: "/images/gallery/2025-04-08-a-20.58.14_0b6ddf22.webp", alt: "Cruzeiro corporativo em Paris" },
      { src: "/images/gallery/2025-03-03-a-16.00.26_b41cf5f5.webp", alt: "O Senang sob as pontes de Paris" },
      { src: "/images/gallery/2025-04-08-a-22.20.42_88a4983b.webp", alt: "Clima descontraído a bordo" },
    ] },
    { type: "testimonials", title: "Eles escolheram o Senang", filter: "team-building" },
    { type: "pricing", title: "Nossos pacotes team building" },
    { type: "faq", title: "Perguntas frequentes – Team building", items: [
      { question: "Pode obter fatura empresarial?", answer: "Sim, emitimos nota fiscal conforme com IVA para dedução em despesas profissionais. Entre em contato por e-mail." },
      { question: "Qual formato para um afterwork?", answer: "O horário das 18h às 20h durante a semana é ideal. Pacote simples a 480€ ou festivo a 540€, sua equipe traz o aperitivo." },
      { question: "Pode organizar atividades a bordo?", answer: "O barco é ideal para conversas informais, brainstorming ou quiz de equipe. O espaço é aberto e acolhedor." },
      { question: "Quantos colaboradores no máximo?", answer: "O Senang acomoda até 12 pessoas. Para grupos maiores, entre em contato para estudarmos uma solução." },
      { question: "Qual é o valor?", answer: "A partir de 480€ para 1 a 6 pessoas, +110€ por pessoa adicional. Pacote Tudo Incluso com buffet sob orçamento." },
    ] },
  ],
};
export default translation;
