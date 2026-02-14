import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: { title: "Aperitivo no barco no Sena – Happy hour privado em Paris", description: "Organize um aperitivo no Sena a bordo de um barco privado. BYO (traga suas bebidas), 2h de cruzeiro, 2 a 12 pessoas. A partir de 60€/pes." },
  hero: { title: "Aperitivo no barco no Sena", subtitle: "O happy hour mais descolado de Paris — na água, entre amigos", cta: { text: "Reserve seu aperitivo" } },
  sections: [
    { type: "richtext", title: "O melhor aperitivo de Paris", content: `<p>Por que tomar um aperitivo em um bar quando se pode tomá-lo <strong>no Sena</strong>? O Senang oferece o conceito mais simples e genial de Paris: um barco de 12 metros privatizado, suas bebidas, seus amigos, e 2 horas de navegação no coração da capital.</p><p>O conceito é <strong>BYO (Bring Your Own)</strong>: tragam cervejas, vinho, rosé, coquetéis, salgadinhos, pizza... Tudo o que quiserem. Zero acréscimo, zero complicação. É o aperitivo de vocês, o clima de vocês. Conectem a playlist na caixa de som Bluetooth e bora.</p><p>A <strong>360€ para 6 pessoas</strong> (ou seja, 60€ cada), é a atividade mais acessível de Paris para um momento realmente original. Afterwork entre colegas, aperitivo de aniversário, saída entre amigos, pré-balada... Todos os pretextos servem.</p><p>Enquanto o Capitão Michel pilota, vocês aproveitam o <strong>panorama parisiense</strong>: Torre Eiffel, Notre-Dame, Pont Alexandre III, cais do Sena... Tudo isso com um copo na mão. Muito melhor que um terraço lotado.</p><p>Saída do <strong>Port de l'Arsenal em Bastille</strong>. Após o cruzeiro, vocês estão a dois passos dos bares do bairro para continuar a noite. Também oferecemos <strong>tábuas de aperitivo</strong> sob encomenda se preferirem que a gente cuide de tudo.</p>` },
    { type: "benefits", title: "Por que um aperitivo no Sena?", items: [
      { icon: "beer", title: "BYO total", text: "Tragam todas as bebidas e comida. Zero acréscimo." },
      { icon: "wallet", title: "A partir de 60€/pes.", text: "360€ para 6 = o melhor custo-benefício de Paris." },
      { icon: "music", title: "Sua música", text: "Caixa de som Bluetooth fornecida. Sua playlist, seu clima." },
      { icon: "mapPin", title: "Saída em Bastille", text: "Em plena Paris. Continuem a noite após o cruzeiro." },
    ] },
    { type: "gallery", title: "Aperitivos no Sena", images: [
      { src: "/images/gallery/2025-04-08-a-20.58.14_0b6ddf22.webp", alt: "Aperitivo entre amigos no Sena" },
      { src: "/images/gallery/2025-04-08-a-22.20.42_88a4983b.webp", alt: "Clima descontraído de aperitivo a bordo" },
      { src: "/images/gallery/2025-04-08-a-22.20.47_261af646.webp", alt: "Grupo curtindo aperitivo no Senang" },
      { src: "/images/gallery/2025-04-04-a-17.33.30_ea0b05c2.webp", alt: "Navegação aperitivo no coração de Paris" },
    ] },
    { type: "testimonials", title: "Eles tomaram aperitivo no Sena", filter: "apero" },
    { type: "pricing", title: "Nossos pacotes aperitivo" },
    { type: "faq", title: "Perguntas frequentes – Aperitivo no barco", items: [
      { question: "Pode mesmo trazer tudo o que quiser?", answer: "Sim! Cervejas, vinho, coquetéis, salgadinhos, pizza... Tudo é permitido. Pedimos apenas que levem seu lixo de volta." },
      { question: "Quanto custa por pessoa?", answer: "360€ para 1 a 6 pessoas = 60€/pes. para 6 amigos. Além disso, +100€ por pessoa (máx. 12)." },
      { question: "Tem geladeira a bordo?", answer: "Não, mas tragam uma caixa térmica! O capitão ajuda a instalá-la a bordo. Dica: levem gelo para manter o rosé gelado." },
      { question: "Pode reservar para um afterwork?", answer: "Com certeza! O horário das 18h às 20h durante a semana é perfeito. Saída em Bastille, ideal após o trabalho." },
      { question: "Vocês oferecem tábuas de aperitivo?", answer: "Sim, oferecemos tábuas de frios/queijos sob encomenda. Avisem com 48h de antecedência." },
    ] },
  ],
};
export default translation;
