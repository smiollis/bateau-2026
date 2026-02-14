import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: {
    title: "Cumpleaños en el Sena – Fiesta privada en barco en París",
    description:
      "Celebra tu cumpleaños en el Sena a bordo de un barco privado. Hasta 12 invitados, champán, tarta a bordo. 2h de crucero en el corazón de París.",
  },
  hero: {
    title: "Celebrar tu cumpleaños en el Sena",
    subtitle: "Un cumpleaños inolvidable a bordo de un barco privado en el corazón de París",
    cta: { text: "Reservar tu cumpleaños" },
  },
  sections: [
    {
      type: "richtext",
      title: "Un cumpleaños original en el Sena",
      content: `<p>¿Buscas una idea original para <strong>celebrar un cumpleaños en París</strong>? Embarca con tus seres queridos a bordo del Senang para un crucero privado de 2 horas por el Sena. De la Torre Eiffel a Notre-Dame, disfruta de un panorama excepcional para soplar tus velas.</p>

<p>El Senang es un barco de 12 metros <strong>completamente privatizado para tu grupo</strong> de 2 a 12 personas. Sin vecinos de mesa, sin ruido: es tu fiesta, tu ambiente, tu momento. Sois libres de traer vuestra tarta de cumpleaños, regalos y decoración.</p>

<p>Con la <strong>fórmula festiva</strong>, cada invitado recibe una copa de champán para brindar. También podéis traer vuestras propias bebidas y comida, o pedir nuestras tablas de aperitivo.</p>

<p>Conecta tu playlist de cumpleaños al <strong>altavoz Bluetooth</strong> disponible y deja que el Capitán Michel navegue mientras disfrutas de tus invitados. El recorrido pasa por los monumentos más bellos de París.</p>

<p>Ya celebres tus 30, 40, 50 o más, este <strong>crucero de cumpleaños</strong> se adapta a todos los ambientes. Salida desde el Puerto del Arsenal en Bastilla (París 12°).</p>

<p>El Senang, <strong>veterano de los JJOO de París 2024</strong> y plató de rodaje para Adidas, ofrece un marco excepcional para celebrar con estilo.</p>`,
    },
    {
      type: "benefits",
      title: "¿Por qué celebrar tu cumpleaños en el Sena?",
      items: [
        { icon: "cake", title: "Tarta a bordo", text: "Trae tu tarta de cumpleaños y sopla tus velas frente a París." },
        { icon: "users", title: "Hasta 12 invitados", text: "El barco se privatiza para tu grupo, ambiente íntimo garantizado." },
        { icon: "champagne", title: "Champán incluido", text: "Una copa por persona con la fórmula festiva para brindar." },
        { icon: "music", title: "Tu playlist", text: "Altavoz Bluetooth disponible para la música." },
      ],
    },
    {
      type: "gallery",
      title: "Fiestas de cumpleaños en el Sena",
      images: [
        { src: "/images/gallery/2025-04-08-a-20.58.31_fcc03538.webp", alt: "Fiesta de cumpleaños en el Sena en París" },
        { src: "/images/gallery/2025-04-08-a-20.57.33_c61d5f00.webp", alt: "Grupo celebrando un cumpleaños en barco" },
        { src: "/images/gallery/2025-04-08-a-22.20.47_261af646.webp", alt: "El Senang navegando para un cumpleaños" },
        { src: "/images/gallery/2025-03-03-a-16.00.24_c635ba48.webp", alt: "Vista de los puentes de París desde el barco" },
      ],
    },
    { type: "testimonials", title: "Celebraron su cumpleaños en el Sena", filter: "anniversaire" },
    { type: "pricing", title: "Nuestras fórmulas de cumpleaños" },
    {
      type: "faq",
      title: "Preguntas frecuentes – Cumpleaños en el Sena",
      items: [
        { question: "¿Se puede traer una tarta de cumpleaños?", answer: "¡Por supuesto! Podéis traer vuestra tarta, velas y todo lo necesario. Tenemos una mesita a bordo." },
        { question: "¿Cuántas personas se pueden invitar?", answer: "El Senang acoge hasta 12 personas. Tarifa base de 1 a 6 personas, luego 110€ por persona adicional." },
        { question: "¿Se aceptan niños a bordo?", answer: "Sí, los niños son bienvenidos. Hay chalecos salvavidas adaptados. Los niños menores de 3 años viajan gratis." },
        { question: "¿Se puede traer decoración?", answer: "¡Por supuesto! Globos, pancartas, guirnaldas... Sois libres de decorar el barco. Solo pedimos que no uséis confeti." },
        { question: "¿Cuánto cuesta un cumpleaños en el Sena?", answer: "Desde 480€ (fórmula simple) o 540€ (fórmula festiva con champán) para un grupo de hasta 6 personas. +110€ por persona adicional." },
      ],
    },
  ],
};

export default translation;
