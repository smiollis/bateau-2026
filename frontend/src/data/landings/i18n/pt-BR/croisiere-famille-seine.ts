import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: { title: "Cruzeiro em família no Sena – Barco privado em Paris", description: "Proporcione à sua família um cruzeiro privado no Sena. Crianças bem-vindas, barco seguro, 2h de navegação entre Torre Eiffel e Notre-Dame." },
  hero: { title: "Cruzeiro em família no Sena", subtitle: "Um momento de convivência entre gerações a bordo de um barco privado", cta: { text: "Reserve em família" } },
  sections: [
    { type: "richtext", title: "Paris em família pelo Sena", content: `<p>Proporcione aos seus uma lembrança inesquecível: um <strong>cruzeiro em família no Sena</strong> a bordo do Senang. Este barco de 12 metros, seguro e intimista, é privatizado exclusivamente para sua família — de 2 a 12 pessoas, dos avós aos netos.</p><p>Durante <strong>2 horas</strong>, descubram os monumentos de Paris de um ponto de vista único: a Torre Eiffel, Notre-Dame de Paris, o Louvre, as pontes históricas... As crianças adoram navegar e ver Paris pela água. É também uma ocasião perfeita para transmitir a história da capital.</p><p>O Senang é equipado com <strong>coletes salva-vidas para adultos e crianças</strong>. O Capitão Michel zela pela segurança de todos enquanto vocês aproveitam a paisagem. Crianças menores de 3 anos são gratuitas.</p><p>Vocês são livres para trazer um <strong>piquenique em família</strong>, um bolo de aniversário ou lanches para as crianças. O pacote festivo inclui uma taça de champanhe para os adultos — perfeito para brindar em família.</p><p>Ideal para um <strong>encontro de família</strong>, um aniversário, férias escolares ou simplesmente um domingo em família. Saída do Port de l'Arsenal em Bastille, facilmente acessível de metrô e com carrinho.</p>` },
    { type: "benefits", title: "Por que um cruzeiro em família?", items: [
      { icon: "shield", title: "Segurança infantil", text: "Coletes salva-vidas adaptados, barco estável e seguro." },
      { icon: "users", title: "3 gerações", text: "De 2 a 12 pessoas, dos netos aos avós." },
      { icon: "utensils", title: "Piquenique livre", text: "Tragam lanches, bolo e bebidas para toda a família." },
      { icon: "baby", title: "Crianças gratuitas", text: "Grátis para menores de 3 anos. Carrinho aceito no porto." },
    ] },
    { type: "gallery", title: "Famílias no Sena", images: [
      { src: "/images/gallery/2025-04-08-a-20.58.31_fcc03538.webp", alt: "Família aproveitando cruzeiro no Sena" },
      { src: "/images/gallery/2025-04-08-a-20.56.56_3b100d69.webp", alt: "Momentos em família a bordo" },
      { src: "/images/gallery/2025-03-03-a-16.00.24_c635ba48.webp", alt: "Vista das pontes de Paris do barco" },
      { src: "/images/gallery/2025-07-27-a-12.22.05_77ed38c8.webp", alt: "Navegação em família no coração de Paris" },
    ] },
    { type: "testimonials", title: "Famílias satisfeitas", filter: "famille" },
    { type: "pricing", title: "Nossos pacotes família" },
    { type: "faq", title: "Perguntas frequentes – Cruzeiro em família", items: [
      { question: "As crianças estão seguras a bordo?", answer: "Sim, o Senang é equipado com coletes salva-vidas para adultos e crianças. O barco é estável e o capitão zela pela segurança de todos." },
      { question: "A partir de que idade pode embarcar?", answer: "Não há idade mínima. Bebês e crianças pequenas são bem-vindos. Crianças menores de 3 anos são gratuitas." },
      { question: "Pode trazer carrinho de bebê?", answer: "Sim, o Port de l'Arsenal é acessível com carrinho. O carrinho pode ficar no cais durante o cruzeiro." },
      { question: "Quantas pessoas no máximo?", answer: "O Senang acomoda até 12 pessoas (crianças incluídas). Tarifa base para 1 a 6 pessoas, +100€ por pessoa adicional." },
      { question: "Pode trazer comida para as crianças?", answer: "Com certeza! Lanches, mamadeira, bolo... Tragam tudo o que precisarem. Temos uma mesinha a bordo." },
    ] },
  ],
};
export default translation;
