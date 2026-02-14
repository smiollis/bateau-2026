import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: {
    title: "Despedida de soltera en el Sena – Crucero privado en París",
    description:
      "Organiza una despedida de soltera inolvidable en el Sena. Barco privado hasta 12 personas, champán incluido, 2h en el corazón de París.",
  },
  hero: {
    title: "Despedida de soltera en el Sena",
    subtitle:
      "Regala a la futura novia un crucero privado inolvidable en el corazón de París",
    cta: { text: "Reservar tu despedida" },
  },
  sections: [
    {
      type: "richtext",
      title: "Una despedida de soltera única en el Sena",
      content: `<p>¿Buscas una idea original para una <strong>despedida de soltera en París</strong>? Olvida los bares y restaurantes de siempre: regala a la futura novia una experiencia única a bordo del Senang, un elegante barco de 12 metros que navega por el corazón de la capital.</p>

<p>Durante un <strong>crucero privado de 2 horas</strong>, tu grupo de 2 a 12 personas disfrutará de un panorama excepcional: la Torre Eiffel iluminada, Notre-Dame de París, el Museo de Orsay, el Puente Alejandro III... Decorados de ensueño para vuestras fotos de recuerdo.</p>

<p>El Senang está completamente <strong>privatizado para tu grupo</strong>. Sin turistas, sin colas: solo vosotras y vuestras amigas en un ambiente íntimo y festivo. Sois libres de traer vuestra decoración, playlist, tarta e incluso vuestro catering.</p>

<p>Nuestra <strong>fórmula festiva</strong> incluye una copa de champán para cada invitada — el brindis perfecto para celebrar a la futura novia con vistas a los monumentos de París. El Capitán Michel, veterano de los JJOO de París 2024, os recibe con una sonrisa.</p>

<p>Ya sea una tarde entre amigas al sol o una velada mágica al atardecer, la despedida de soltera en el Sena se adapta a vuestros deseos. Salida desde el <strong>Puerto del Arsenal en Bastilla</strong> (París 12°), fácilmente accesible en metro.</p>

<p><strong>El Senang acogió los JJOO de París 2024</strong> (delegación de Mauritania) y sirvió como plató para rodajes de Adidas y Le Slip Français — un marco excepcional para tu despedida.</p>`,
    },
    {
      type: "benefits",
      title: "¿Por qué elegir Un Bateau à Paris para tu despedida?",
      items: [
        { icon: "ship", title: "Barco 100% privado", text: "El Senang solo para tu grupo, hasta 12 personas." },
        { icon: "champagne", title: "Champán incluido", text: "Una copa de champán para cada invitada con la fórmula festiva." },
        { icon: "camera", title: "Decorado de ensueño", text: "Torre Eiffel, Notre-Dame, Puente Alejandro III de fondo." },
        { icon: "sparkles", title: "Personalizable", text: "Trae tu decoración, playlist y catering." },
      ],
    },
    {
      type: "gallery",
      title: "Tus momentos de despedida en el Sena",
      images: [
        { src: "/images/gallery/2025-04-08-a-22.20.47_261af646.webp", alt: "Grupo de mujeres celebrando una despedida de soltera en el Sena" },
        { src: "/images/gallery/2025-04-08-a-22.20.47_261af646.webp", alt: "Crucero de despedida con vistas a la Torre Eiffel" },
        { src: "/images/gallery/2025-04-08-a-20.57.33_c61d5f00.webp", alt: "Ambiente festivo a bordo del Senang" },
        { src: "/images/gallery/2025-04-08-a-20.58.31_fcc03538.webp", alt: "Despedida de soltera al atardecer en el Sena" },
      ],
    },
    { type: "testimonials", title: "Ellas lo vivieron", filter: "evjf" },
    { type: "pricing", title: "Nuestras fórmulas de despedida" },
    {
      type: "faq",
      title: "Preguntas frecuentes – Despedida de soltera en el Sena",
      items: [
        { question: "¿Cuántas personas pueden participar?", answer: "El Senang acoge hasta 12 personas. La tarifa base cubre de 1 a 6 personas, luego 110€ por persona adicional." },
        { question: "¿Podemos traer nuestra propia decoración?", answer: "¡Por supuesto! Sois libres de traer globos, pancartas, accesorios de fotos y toda la decoración que queráis." },
        { question: "¿Se puede traer comida a bordo?", answer: "Sí, podéis traer vuestro pícnic, tarta o catering. También ofrecemos tablas de aperitivo bajo pedido." },
        { question: "¿Cuánto cuesta una despedida en el Sena?", answer: "Desde 540€ para la fórmula festiva (champán incluido) para un grupo de hasta 6 personas, luego 90€ por persona adicional." },
        { question: "¿Cuánto dura el crucero?", answer: "El crucero dura 2 horas y recorre los monumentos más bellos de París, de Bastilla a la Torre Eiffel." },
      ],
    },
  ],
};

export default translation;
