import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: { title: "Cruzeiro ao pôr do sol no Sena – Golden hour em Paris", description: "Viva a golden hour no Sena. Cruzeiro privado de 2h ao pôr do sol, Torre Eiffel iluminada, champanhe. A partir de 480€." },
  hero: { title: "Cruzeiro ao pôr do sol no Sena", subtitle: "A golden hour parisiense vista da água — um espetáculo inesquecível", cta: { text: "Reserve o pôr do sol" } },
  sections: [
    { type: "richtext", title: "A mais bela luz de Paris", content: `<p>Há um momento mágico em Paris: quando o sol desce atrás da Torre Eiffel e a cidade se veste de ouro. Vivam esse espetáculo no Sena a bordo do Senang, um barco de 12 metros <strong>privatizado para o seu grupo</strong>.</p><p>O <strong>cruzeiro ao pôr do sol</strong> é nosso horário mais procurado — e com razão. Durante 2 horas, vocês assistem à transformação de Paris: os reflexos dourados no Sena, as sombras longas nos cais, e depois os monumentos que se iluminam um a um.</p><p>O momento forte? A passagem diante da <strong>Torre Eiffel quando suas luzes cintilam</strong>. Um espetáculo que deixa sem palavras, ainda mais impressionante visto da água. A Pont Alexandre III, o Grand Palais, o Musée d'Orsay... Cada monumento ganha uma dimensão de conto de fadas ao cair da noite.</p><p>Com o <strong>pacote festivo</strong>, brindem com champanhe diante desse panorama. Vocês também podem preparar um piquenique romântico ou pedir nossas tábuas de aperitivo. A caixa de som Bluetooth está à disposição para sua playlist de fundo.</p><p>Esse horário é ideal para um <strong>encontro romântico</strong>, um aniversário, um ensaio fotográfico ou simplesmente para curtir Paris de outra forma. Saída do Port de l'Arsenal em Bastille. Reservem com antecedência: os horários golden hour esgotam rápido!</p>` },
    { type: "benefits", title: "Por que o pôr do sol?", items: [
      { icon: "sunset", title: "Golden hour", text: "A mais bela luz de Paris, reflexos dourados no Sena." },
      { icon: "sparkles", title: "Torre Eiffel cintilante", text: "Assistam à iluminação desde a água." },
      { icon: "camera", title: "Fotos sublimes", text: "O melhor horário para fotos inesquecíveis." },
      { icon: "champagne", title: "Champanhe ao sol", text: "Brindem diante do céu em chamas com o pacote festivo." },
    ] },
    { type: "gallery", title: "Pores do sol no Sena", images: [
      { src: "/images/gallery/2025-04-08-a-20.57.33_c61d5f00.webp", alt: "Pôr do sol no Sena em Paris" },
      { src: "/images/gallery/2025-03-02-a-21.18.40_52501437.webp", alt: "Golden hour no Sena com o Senang" },
      { src: "/images/gallery/2025-04-08-a-21.50.25_ac11bce0.webp", alt: "Paris iluminada ao crepúsculo desde o Sena" },
      { src: "/images/gallery/2025-04-15-a-22.21.11_0329a51a.webp", alt: "Noite no Senang ao pôr do sol" },
    ] },
    { type: "testimonials", title: "Eles viram o pôr do sol", filter: "coucher-soleil" },
    { type: "pricing", title: "Nossos pacotes pôr do sol" },
    { type: "faq", title: "Perguntas frequentes – Pôr do sol", items: [
      { question: "A que horas é o pôr do sol?", answer: "O horário varia conforme a estação: cerca de 17h30 no inverno, 21h30 no verão. Recomendamos reservar 1h30 antes do pôr do sol." },
      { question: "Esse horário é mais caro?", answer: "Não, os valores são os mesmos: 480€ (simples) ou 540€ (festivo). Mas esse horário é muito procurado, reserve com antecedência." },
      { question: "Dá para ver a Torre Eiffel cintilar?", answer: "Sim! Se o cruzeiro cobrir a hora cheia (a cada hora após o anoitecer), vocês verão as 20.000 lâmpadas cintilando por 5 minutos." },
      { question: "E se o céu estiver nublado?", answer: "Mesmo com tempo nublado, a luz do pôr do sol é linda. Em caso de tempo realmente desfavorável, reagendamento gratuito para uma data à sua escolha." },
      { question: "Pode reservar para um ensaio fotográfico?", answer: "Com certeza! A golden hour é o horário preferido dos fotógrafos. O Senang já serviu de cenário para Adidas e Le Slip Français." },
    ] },
  ],
};
export default translation;
