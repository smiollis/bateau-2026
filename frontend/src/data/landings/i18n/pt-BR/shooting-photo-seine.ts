import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: { title: "Ensaio fotográfico no Sena – Sessão no barco em Paris", description: "Realize um ensaio fotográfico único no Sena. Barco privado, luz natural, Pont Alexandre III e Torre Eiffel como cenário. 2h de cruzeiro." },
  hero: { title: "Ensaio fotográfico no Sena", subtitle: "Um cenário natural excepcional para as suas mais belas fotos", cta: { text: "Reserve seu ensaio" } },
  sections: [
    { type: "richtext", title: "Um ensaio fotográfico de exceção sobre a água", content: `<p>Fotógrafos, casais, influenciadores ou marcas: o Senang oferece um <strong>estúdio fotográfico flutuante</strong> único no coração de Paris. Durante 2 horas de navegação, aproveitem um cenário em movimento permanente: a Torre Eiffel, a Pont Alexandre III, os cais do Sena, as ilhas...</p><p>A <strong>luz natural no Sena</strong> é excepcional. A golden hour oferece reflexos dourados na água e uma luz suave nos rostos — o sonho de qualquer fotógrafo. O barco se desloca lentamente, permitindo tomadas variadas sem mudar de local.</p><p>O Senang já serviu de cenário para <strong>produções profissionais</strong>: Adidas (com Nicolas Karabétic), Le Slip Français, e foi o barco oficial da delegação da Mauritânia nos <strong>Jogos Olímpicos de Paris 2024</strong>. Um cenário comprovado para ensaios de qualidade.</p><p>O barco é <strong>totalmente privatizado</strong>: sem passantes, sem turistas no enquadramento. Seu fotógrafo pode trabalhar livremente. Vocês também podem organizar um <strong>ensaio de despedida de solteira</strong>, um retrato de casal, uma sessão gestante, um lookbook de moda ou conteúdo para redes sociais.</p><p>Saída do <strong>Port de l'Arsenal em Bastille</strong>. O trajeto percorre as duas margens do Sena com os mais belos monumentos ao fundo. Reservem o horário do pôr do sol para a melhor luz.</p>` },
    { type: "benefits", title: "Por que um ensaio no Sena?", items: [
      { icon: "camera", title: "Cenário excepcional", text: "Torre Eiffel, Pont Alexandre III, cais do Sena como cenário." },
      { icon: "sunset", title: "Golden hour", text: "Luz dourada natural para fotos sublimes." },
      { icon: "film", title: "Estúdio comprovado", text: "Já utilizado pela Adidas, Le Slip Français, Jogos 2024." },
      { icon: "lock", title: "Totalmente privativo", text: "Nenhum passante no enquadramento. Seu fotógrafo trabalha livremente." },
    ] },
    { type: "gallery", title: "Ensaios no Sena", images: [
      { src: "/images/gallery/2025-04-04-a-17.33.30_ea0b05c2.webp", alt: "Ensaio fotográfico no Sena com Torre Eiffel" },
      { src: "/images/gallery/2025-04-08-a-20.57.33_c61d5f00.webp", alt: "Golden hour no Sena para ensaio" },
      { src: "/images/gallery/2025-04-18-a-09.55.02_4b9f3852.webp", alt: "Vista do barco durante ensaio" },
      { src: "/images/gallery/2025-03-03-a-16.00.26_b41cf5f5.webp", alt: "O Senang sob as pontes de Paris" },
    ] },
    { type: "testimonials", title: "Eles escolheram o Senang", filter: "shooting" },
    { type: "pricing", title: "Nossos pacotes ensaio fotográfico" },
    { type: "faq", title: "Perguntas frequentes – Ensaio fotográfico", items: [
      { question: "Pode vir com fotógrafo profissional?", answer: "Claro! Seu fotógrafo é bem-vindo a bordo. Ele poderá se movimentar livremente pelo barco para variar os ângulos." },
      { question: "Qual o melhor horário para a luz?", answer: "A golden hour (1h antes do pôr do sol) oferece a luz mais bonita. Reserve esse horário com antecedência pois é muito procurado." },
      { question: "O barco é estável para as fotos?", answer: "Sim, o Senang navega lentamente e oferece navegação estável. Sem vibrações incômodas para as tomadas." },
      { question: "Pode fazer um ensaio de moda/lookbook?", answer: "Com certeza. Várias marcas já filmaram a bordo (Adidas, Le Slip Français). O cenário varia naturalmente ao longo da navegação." },
      { question: "Quanto custa um ensaio no Sena?", answer: "A partir de 480€ (pacote simples, 2h). A tarifa é a mesma de um cruzeiro padrão." },
    ] },
  ],
};
export default translation;
