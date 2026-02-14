import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: {
    title: "Pedida de mano en el Sena – Sorpresa privada en París",
    description:
      "Organiza una pedida de mano inolvidable en el Sena. Barco privado, champán, decorado de cuento frente a la Torre Eiffel.",
  },
  hero: {
    title: "Pedida de mano en el Sena",
    subtitle: "El \"sí\" más bonito de tu vida, frente a la Torre Eiffel",
    cta: { text: "Organizar tu pedida" },
  },
  sections: [
    {
      type: "richtext",
      title: "Una pedida de mano original en París",
      content: `<p>¿Sueñas con una <strong>pedida de mano original en París</strong>? Imagina la escena: estás a bordo de un barco privado en el Sena, el sol se pone tras la Torre Eiffel y te arrodillas... Un momento fuera del tiempo que tu pareja no olvidará jamás.</p>

<p>El Senang es el marco ideal para una <strong>pedida de mano en el Sena</strong>. Este barco de 12 metros, elegante e íntimo, está completamente privatizado para vosotros. Sin miradas ajenas, sin turistas: solo vosotros dos y los monumentos más bellos de París de fondo.</p>

<p>Os ayudamos a <strong>organizar la sorpresa</strong>. Contactadnos con antelación para preparar el momento perfecto: pétalos de rosa, ramo de flores, playlist especial, fotógrafo discreto... El Capitán Michel está acostumbrado a estos momentos de emoción.</p>

<p>La <strong>fórmula festiva</strong> incluye una copa de champán para celebrar el \"sí\". También podéis traer vuestro propio champán, una tarta o una cena para convertir el crucero en una cena romántica sobre el agua.</p>

<p>¿El momento más mágico? Cuando el barco pasa frente a la Torre Eiffel al anochecer y las <strong>luces centelleantes</strong> se encienden. Es el instante que eligen la mayoría de nuestras parejas para hacer la gran pregunta.</p>

<p>Salida desde el <strong>Puerto del Arsenal en Bastilla</strong>. Fácil de presentar como un \"simple paseo por el Sena\" para mantener la sorpresa. El Senang, que navegó para los <strong>JJOO de París 2024</strong>, ofrece un marco excepcional.</p>`,
    },
    {
      type: "benefits",
      title: "¿Por qué pedir matrimonio en el Sena?",
      items: [
        { icon: "heart", title: "Marco de cuento", text: "La Torre Eiffel iluminada de fondo para el gran momento." },
        { icon: "eyeOff", title: "Sorpresa garantizada", text: "Os ayudamos a organizar la sorpresa con toda discreción." },
        { icon: "camera", title: "Fotógrafo opcional", text: "Inmortaliza el momento con un fotógrafo discreto a bordo." },
        { icon: "sparkles", title: "Decoración a medida", text: "Pétalos, velas, flores... Lo preparamos todo para vosotros." },
      ],
    },
    {
      type: "gallery",
      title: "Pedidas de mano de ensueño",
      images: [
        { src: "/images/gallery/2025-03-02-a-21.18.40_52501437.webp", alt: "Pedida de mano al atardecer en el Sena" },
        { src: "/images/gallery/2025-04-08-a-20.57.33_c61d5f00.webp", alt: "Crucero romántico para una pedida de mano en París" },
        { src: "/images/gallery/2025-04-15-a-22.21.11_0329a51a.webp", alt: "Ambiente íntimo a bordo del Senang" },
        { src: "/images/gallery/2025-04-08-a-21.50.25_ac11bce0.webp", alt: "París iluminado desde el Senang" },
      ],
    },
    { type: "testimonials", title: "Dijeron sí en el Sena", filter: "mariage" },
    { type: "pricing", title: "Nuestras fórmulas para tu pedida" },
    {
      type: "faq",
      title: "Preguntas frecuentes – Pedida de mano",
      items: [
        { question: "¿Cómo organizar la sorpresa sin que mi pareja lo sepa?", answer: "Presenta la salida como un simple paseo por el Sena. Contactadnos para coordinar los detalles (decoración, momento, fotógrafo) sin que sospeche nada." },
        { question: "¿Se puede tener un fotógrafo a bordo?", answer: "¡Sí! Podéis invitar a un fotógrafo profesional a bordo. Contactadnos y os ayudaremos a organizar su presencia discreta." },
        { question: "¿Cuál es el mejor momento para la pedida?", answer: "El atardecer es el más romántico. El paso frente a la Torre Eiffel iluminada (por la noche) es el momento más popular." },
        { question: "¿Se puede personalizar la decoración del barco?", answer: "¡Por supuesto! Pétalos de rosa, velas LED, globos... Podéis traer vuestra decoración o encargarnos la preparación." },
        { question: "¿Cuánto cuesta una pedida de mano en el Sena?", answer: "Desde 540€ para la fórmula festiva (champán incluido). La fórmula Todo Incluido con decoración y catering disponible bajo presupuesto." },
      ],
    },
  ],
};

export default translation;
