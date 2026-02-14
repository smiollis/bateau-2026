import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: {
    title: "Crucero romántico en el Sena – Velada privada en París",
    description:
      "Disfruta de un crucero romántico privado en el Sena. 2h en pareja con champán, atardecer y monumentos iluminados. Desde 540€.",
  },
  hero: {
    title: "Crucero romántico en el Sena",
    subtitle: "Vive un momento mágico en pareja al ritmo del agua, con París como decorado",
    cta: { text: "Reservar tu velada" },
  },
  sections: [
    {
      type: "richtext",
      title: "Una velada romántica inolvidable en París",
      content: `<p>París es la ciudad del amor, y no hay mejor forma de descubrirla en pareja que navegando por el Sena. Embarca en un <strong>crucero romántico privado</strong> a bordo del Senang, un elegante barco de 12 metros, solo para vosotros dos.</p>

<p>Durante <strong>2 horas de navegación</strong>, déjate llevar por la magia de París al atardecer. La Torre Eiffel iluminándose, los reflejos dorados en el Sena, el Puente Alejandro III con sus farolas... Cada instante es una postal viviente.</p>

<p>Con la <strong>fórmula festiva</strong>, disfrutad de una copa de champán cada uno para brindar frente a la Torre Eiffel. También podéis preparar un pícnic gourmet o pedir nuestras tablas de aperitivo.</p>

<p>El Senang está <strong>completamente privatizado</strong>: sin grupos de turistas, sin ruido, solo el murmullo del agua y de la ciudad. El Capitán Michel, discreto y profesional, os deja saborear vuestra intimidad.</p>

<p>Ya sea para un <strong>aniversario de pareja</strong>, una sorpresa romántica o simplemente para evadiros de la rutina, este crucero os ofrece un marco excepcional. Salida desde el Puerto del Arsenal en Bastilla.</p>

<p>Para una experiencia aún más memorable, reservad el horario del atardecer: la hora dorada en el Sena es un espectáculo que no olvidaréis. <strong>El Senang, veterano de los JJOO de París 2024</strong>, os ofrece un marco excepcional.</p>`,
    },
    {
      type: "benefits",
      title: "¿Por qué elegir un crucero romántico en el Sena?",
      items: [
        { icon: "heart", title: "Intimidad total", text: "Barco privatizado solo para vosotros dos (o vuestro pequeño grupo)." },
        { icon: "champagne", title: "Champán incluido", text: "Brindad frente a la Torre Eiffel con la fórmula festiva." },
        { icon: "sunset", title: "Atardecer", text: "Reservad el horario de la hora dorada para un momento mágico." },
        { icon: "utensils", title: "Cena a bordo", text: "Traed vuestro pícnic o pedid nuestras tablas de aperitivo." },
      ],
    },
    {
      type: "gallery",
      title: "Momentos románticos en el Sena",
      images: [
        { src: "/images/gallery/2025-04-08-a-20.57.33_c61d5f00.webp", alt: "Atardecer romántico en el Sena" },
        { src: "/images/gallery/2025-03-02-a-21.18.40_52501437.webp", alt: "Crucero en pareja al crepúsculo en París" },
        { src: "/images/gallery/2025-04-08-a-20.58.31_fcc03538.webp", alt: "El Senang navegando bajo los puentes de París" },
        { src: "/images/gallery/2025-04-15-a-22.21.11_0329a51a.webp", alt: "Velada romántica a bordo del Senang" },
      ],
    },
    { type: "testimonials", title: "Vivieron la magia", filter: "romantique" },
    { type: "pricing", title: "Nuestras fórmulas para una velada romántica" },
    {
      type: "faq",
      title: "Preguntas frecuentes – Crucero romántico",
      items: [
        { question: "¿Se puede reservar solo para dos?", answer: "¡Por supuesto! El barco se privatiza incluso para una pareja. La tarifa base cubre de 1 a 6 personas." },
        { question: "¿Cuál es el mejor momento para un crucero romántico?", answer: "El atardecer es el horario más solicitado: la luz dorada sobre los monumentos y la Torre Eiffel iluminándose crean un momento mágico." },
        { question: "¿Se puede organizar una sorpresa?", answer: "¡Sí! Contactadnos para preparar una sorpresa: decoración especial, champán, pétalos de rosa..." },
        { question: "¿Se puede traer una cena a bordo?", answer: "Sí, podéis preparar un pícnic gourmet o un plato. También ofrecemos tablas de aperitivo bajo pedido." },
        { question: "¿Cuánto cuesta un crucero romántico?", answer: "Desde 480€ (fórmula simple) o 540€ (fórmula festiva con champán) para un crucero privado de 2 horas." },
      ],
    },
  ],
};

export default translation;
