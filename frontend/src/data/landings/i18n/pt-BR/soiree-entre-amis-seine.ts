import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: { title: "Noite entre amigos no Sena – Aperitivo no barco em Paris", description: "Organize uma noite entre amigos no Sena. Barco privativo até 12 pessoas, aperitivo livre, playlist pessoal. 2h de cruzeiro a partir de 480€." },
  hero: { title: "Noite entre amigos no Sena", subtitle: "Um aperitivo flutuante no coração de Paris, entre amigos e sem complicação", cta: { text: "Reserve sua noite" } },
  sections: [
    { type: "richtext", title: "Um programa entre amigos original em Paris", content: `<p>Quer um <strong>programa entre amigos original em Paris</strong>? Esqueça os bares lotados e terraços barulhentos: embarque no Sena para um aperitivo flutuante a bordo do Senang, um barco de 12 metros totalmente privatizado para seu grupo.</p><p>Durante <strong>2 horas de cruzeiro</strong>, curtam Paris como nunca: a Torre Eiffel ao pôr do sol, Notre-Dame iluminada, a Pont Alexandre III como cenário... Tudo com seus amigos, suas bebidas e sua música.</p><p>O conceito é simples: o barco é <strong>100% privatizado para seu grupo</strong> de 2 a 12 pessoas. Tragam o que quiserem: cerveja, vinho, pizza, piquenique, bolo... É a noite de vocês, zero complicação. Conectem a playlist na caixa de som Bluetooth e bora.</p><p>O <strong>pacote simples a 480€</strong> (para 1 a 6 pessoas) é a opção mais acessível para um afterwork entre colegas, um aperitivo entre amigos ou uma saída descontraída. Quer champanhe? O pacote festivo a 540€ inclui uma taça por pessoa.</p><p>Saída do <strong>Port de l'Arsenal em Bastille</strong>, em plena Paris. Após o cruzeiro, vocês estão a dois passos de bares e restaurantes do bairro para continuar a noite.</p><p>O Senang participou das <strong>Olimpíadas de Paris 2024</strong> e serviu de cenário para ensaios da Adidas e Le Slip Français. Um cenário de classe para uma noite descontraída entre amigos.</p>` },
    { type: "benefits", title: "Por que escolher um barco para a noite entre amigos?", items: [
      { icon: "users", title: "Seu grupo, seu barco", text: "Privatizado de 2 a 12 pessoas. Sem turistas, sem vizinhos." },
      { icon: "beer", title: "Aperitivo livre", text: "Tragam bebidas e comida. Zero complicação, zero acréscimo." },
      { icon: "music", title: "Clima musical", text: "Caixa de som Bluetooth fornecida. Sua playlist, seu clima." },
      { icon: "wallet", title: "A partir de 80€/pes.", text: "480€ para 6 pessoas = 80€ cada. Imbatível em Paris." },
    ] },
    { type: "gallery", title: "Noites entre amigos no Sena", images: [
      { src: "/images/gallery/2025-04-08-a-22.20.47_261af646.webp", alt: "Grupo de amigos curtindo cruzeiro no Sena" },
      { src: "/images/gallery/2025-04-08-a-20.58.14_0b6ddf22.webp", alt: "Aperitivo entre amigos no barco Senang" },
      { src: "/images/gallery/2025-04-08-a-22.20.42_88a4983b.webp", alt: "Clima festivo entre amigos no Sena" },
      { src: "/images/gallery/2025-04-04-a-17.33.30_ea0b05c2.webp", alt: "Navegação entre amigos no coração de Paris" },
    ] },
    { type: "testimonials", title: "Eles tiveram uma noite memorável", filter: "amis" },
    { type: "pricing", title: "Nossos pacotes para noite entre amigos" },
    { type: "faq", title: "Perguntas frequentes – Noite entre amigos", items: [
      { question: "Pode trazer bebidas e comida próprias?", answer: "Sim, esse é o princípio! Tragam cerveja, vinho, salgadinhos, pizza, piquenique... Tudo o que quiserem. Também oferecemos tábuas de aperitivo por encomenda." },
      { question: "Quanto custa por pessoa?", answer: "O pacote simples a 480€ cobre até 6 pessoas, ou seja, 80€ por pessoa. Além disso, 110€ por pessoa adicional (máx. 12)." },
      { question: "Pode reservar para um afterwork?", answer: "Com certeza! Um horário durante a semana no fim da tarde (18h-20h) é perfeito para um afterwork original. Saída em Bastille, ideal após o trabalho." },
      { question: "Há limite de barulho ou horário?", answer: "Navegamos geralmente entre 10h e 22h30. A música pela caixa Bluetooth é permitida em volume razoável. Pedimos respeito aos moradores." },
      { question: "O que acontece em caso de chuva?", answer: "O Senang tem uma cobertura de proteção. Em caso de tempo realmente desfavorável, oferecemos reagendamento gratuito para uma data à sua escolha." },
    ] },
  ],
};
export default translation;
