import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: { title: "Dia das Mães no Sena – Cruzeiro presente em Paris", description: "Presenteie sua mãe com um cruzeiro privado no Sena para o Dia das Mães. Champanhe, Torre Eiffel, momento em família. A partir de 480€." },
  hero: { title: "Dia das Mães no Sena", subtitle: "O mais belo presente para a mamãe — um cruzeiro privado no coração de Paris", cta: { text: "Presentear com o cruzeiro" } },
  sections: [
    { type: "richtext", title: "O presente perfeito para o Dia das Mães", content: `<p>Neste ano, esqueça flores e perfume. Presenteie sua mãe com um <strong>momento inesquecível no Sena</strong>. O Senang, barco de 12 metros privatizado para sua família, navega 2 horas entre os mais belos monumentos de Paris.</p><p>Imagine a surpresa dela: um <strong>barco só para ela</strong>, uma taça de champanhe, a Torre Eiffel desfilando, e toda a família reunida. É muito mais que um presente — é uma lembrança que ficará gravada para sempre.</p><p>O <strong>pacote festivo</strong> (540€) inclui champanhe, ideal para brindar em família. Vocês também podem preparar um brunch flutuante ou pedir nossas tábuas de aperitivo. O conceito BYO permite trazer bolo, bebidas e tudo que a mamãe adora.</p><p>O Senang acomoda <strong>de 2 a 12 pessoas</strong>: perfeito para reunir irmãos, netos e avós ao redor da mamãe. Crianças são bem-vindas e menores de 3 anos são gratuitos.</p><p>Oferecemos <strong>vales-presente</strong> personalizados para dar no dia. Saída do Port de l'Arsenal em Bastille. Reserve o horário do pôr do sol para uma luz mágica nas fotos de família.</p>` },
    { type: "benefits", title: "Por que o Sena para o Dia das Mães?", items: [
      { icon: "gift", title: "Presente único", text: "Uma lembrança inesquecível, muito melhor que um objeto. Vale-presente disponível." },
      { icon: "heart", title: "Momento em família", text: "Reúna toda a família ao redor da mamãe no Sena." },
      { icon: "champagne", title: "Champanhe incluso", text: "Pacote festivo com champanhe para brindar em família." },
      { icon: "camera", title: "Fotos de lembrança", text: "A Torre Eiffel e as pontes de Paris como cenário." },
    ] },
    { type: "gallery", title: "Dia das Mães no Sena", images: [
      { src: "/images/gallery/2025-04-08-a-20.58.31_fcc03538.webp", alt: "Família reunida no Sena para o Dia das Mães" },
      { src: "/images/gallery/2025-04-08-a-21.50.25_ac11bce0.webp", alt: "Momentos em família a bordo" },
      { src: "/images/gallery/2025-04-08-a-20.57.33_c61d5f00.webp", alt: "Pôr do sol no Sena" },
      { src: "/images/gallery/2025-07-27-a-12.22.05_77ed38c8.webp", alt: "Navegação em família no coração de Paris" },
    ] },
    { type: "testimonials", title: "Elas adoraram o cruzeiro", filter: "famille" },
    { type: "pricing", title: "Nossos pacotes Dia das Mães" },
    { type: "faq", title: "Perguntas frequentes – Dia das Mães", items: [
      { question: "Vocês oferecem vales-presente?", answer: "Sim! Oferecemos vales-presente personalizados, imprimíveis ou enviados por e-mail. Ideal para manter a surpresa até o dia." },
      { question: "Pode vir com crianças pequenas?", answer: "Claro! Coletes salva-vidas infantis fornecidos, carrinho guardado no cais. Menores de 3 anos são gratuitos." },
      { question: "Pode trazer bolo?", answer: "Com certeza! Bolo, flores, presentes, brunch... Tragam tudo que vai agradar a mamãe." },
      { question: "Qual horário vocês recomendam?", answer: "O horário do pôr do sol (variável conforme a estação) oferece a luz mais bonita para fotos e o clima mais romântico." },
      { question: "Quantas pessoas no máximo?", answer: "O Senang acomoda até 12 pessoas. Tarifa base para 1 a 6 pessoas (480€ simples), +110€ por pessoa adicional." },
    ] },
  ],
};
export default translation;
