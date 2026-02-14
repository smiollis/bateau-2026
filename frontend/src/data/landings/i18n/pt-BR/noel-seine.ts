import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: { title: "Cruzeiro de Natal no Sena – Festas no barco em Paris", description: "Viva a magia do Natal no Sena. Cruzeiro privado, Paris iluminada, clima de conto de fadas. Barco privatizado de 2 a 12 pessoas. A partir de 480€." },
  hero: { title: "Cruzeiro de Natal no Sena", subtitle: "A magia das festas vista do Sena — Paris brilha para vocês", cta: { text: "Reserve seu cruzeiro de Natal" } },
  sections: [
    { type: "richtext", title: "O encanto do Natal no Sena", content: `<p>Em dezembro, Paris brilha com mil luzes. E não há lugar melhor para admirar esse espetáculo do que <strong>desde o Sena</strong>. O Senang oferece um cruzeiro privado de 2 horas pelo coração da capital iluminada para as festas.</p><p>Naveguem entre as <strong>decorações de Natal das grandes lojas</strong>, as guirlandas das pontes, as árvores iluminadas dos cais. A Torre Eiffel cintila, Notre-Dame se veste de luz, e o clima é simplesmente de conto de fadas.</p><p>O conceito é perfeito para as festas: tragam <strong>chocolate quente, vinho quente, castanhas assadas</strong>... ou optem pelo pacote festivo com champanhe. Preparem um piquenique natalino ou peçam nossas tábuas de aperitivo. O BYO deixa vocês livres.</p><p>Ideal como <strong>presente de Natal original</strong>, um passeio em família nas férias escolares, ou uma noite de Natal entre amigos. O Senang acomoda de 2 a 12 pessoas em um clima intimista e acolhedor.</p><p>Saída do <strong>Port de l'Arsenal em Bastille</strong>. Fornecemos mantas para as noites frias. Levem roupas quentes e aproveitem a magia de Paris no inverno.</p>` },
    { type: "benefits", title: "Por que um cruzeiro de Natal?", items: [
      { icon: "sparkles", title: "Paris iluminada", text: "Decorações natalinas, pontes iluminadas, Torre Eiffel cintilante." },
      { icon: "gift", title: "Presente original", text: "Ofereça uma experiência inesquecível em vez de um objeto." },
      { icon: "users", title: "Em família", text: "De 2 a 12 pessoas, crianças bem-vindas. Clima aconchegante." },
      { icon: "coffee", title: "Chocolate quente BYO", text: "Tragam vinho quente, chocolate quente, rabanada... Tudo é permitido." },
    ] },
    { type: "gallery", title: "Natal no Sena", images: [
      { src: "/images/gallery/2025-04-08-a-21.50.25_ac11bce0.webp", alt: "Paris iluminada para o Natal desde o Sena" },
      { src: "/images/gallery/2025-04-08-a-20.57.33_c61d5f00.webp", alt: "Clima de conto de fadas no Senang" },
      { src: "/images/gallery/2025-04-08-a-20.58.31_fcc03538.webp", alt: "Cruzeiro em família durante as festas" },
      { src: "/images/gallery/2025-03-02-a-21.18.40_52501437.webp", alt: "Noite de Natal no Sena" },
    ] },
    { type: "testimonials", title: "Eles comemoraram o Natal no Sena", filter: "famille" },
    { type: "pricing", title: "Nossos pacotes de Natal" },
    { type: "faq", title: "Perguntas frequentes – Cruzeiro de Natal", items: [
      { question: "O barco navega em dezembro?", answer: "Sim! O Senang navega o ano todo, inclusive em dezembro. Fornecemos mantas. Levem gorro e luvas para aproveitar ao máximo." },
      { question: "Pode presentear o cruzeiro?", answer: "Com certeza! Oferecemos vales-presente. Entre em contato para um vale personalizado com a data de sua escolha." },
      { question: "Crianças são bem-vindas?", answer: "Sim, é um passeio em família perfeito. Coletes salva-vidas infantis fornecidos. Menores de 3 anos são gratuitos." },
      { question: "Pode trazer vinho quente?", answer: "Claro! Vinho quente, chocolate quente, panetone, castanhas... Tragam tudo que faz o espírito natalino. O BYO é total." },
      { question: "Há horários especiais para as festas?", answer: "Os finais de semana de dezembro e a semana entre Natal e Ano-Novo são muito procurados. Reserve com pelo menos 2 semanas de antecedência." },
    ] },
  ],
};
export default translation;
