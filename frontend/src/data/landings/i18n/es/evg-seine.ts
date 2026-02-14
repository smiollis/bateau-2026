import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: {
    title: "Despedida de soltero en el Sena – Crucero privado en París",
    description:
      "Organiza una despedida de soltero memorable en el Sena. Barco privado hasta 12 personas, cervezas y champán, 2h en el corazón de París.",
  },
  hero: {
    title: "Despedida de soltero en el Sena",
    subtitle: "Regala al futuro novio una experiencia única y relajada en el Sena",
    cta: { text: "Reservar tu despedida" },
  },
  sections: [
    {
      type: "richtext",
      title: "Una despedida de soltero original en el Sena",
      content: `<p>¿Harto de las despedidas clásicas de bar en bar? Regala al futuro novio una <strong>despedida de soltero en el Sena</strong> que no olvidará jamás. A bordo del Senang, un barco de 12 metros completamente privatizado, vive una velada fuera de lo común entre amigos.</p>

<p>Durante <strong>2 horas de navegación</strong>, disfruta de un panorama excepcional de los monumentos más bellos de París: la Torre Eiffel, Notre-Dame, el Louvre, el Puente Alejandro III... Todo con vuestra propia música, vuestras cervezas, vuestros snacks — es vuestro barco para la noche.</p>

<p>El Senang está <strong>100% privatizado</strong> para tu grupo de 2 a 12 personas. Sin turistas, sin restricciones: sois libres de traer vuestra nevera, vuestros disfraces y todo lo que haga la velada legendaria. El Capitán Michel se encarga de la navegación mientras vosotros disfrutáis.</p>

<p>Nuestra <strong>fórmula festiva</strong> incluye una copa de champán por persona — perfecto para el brindis al futuro novio. También podéis optar por la fórmula simple y traer vuestras propias bebidas y comida. Altavoz Bluetooth a vuestra disposición.</p>

<p>Salida desde el <strong>Puerto del Arsenal en Bastilla</strong> (París 12°). Tras el crucero, estáis a dos pasos de la calle Lappe y la vida nocturna parisina para continuar la fiesta.</p>

<p><strong>El Senang navegó durante los JJOO de París 2024</strong> para la delegación de Mauritania y sirvió de plató para Adidas y Le Slip Français. Un marco excepcional para una despedida a la altura.</p>`,
    },
    {
      type: "benefits",
      title: "¿Por qué elegir Un Bateau à Paris para tu despedida?",
      items: [
        { icon: "ship", title: "Barco 100% privado", text: "El Senang solo para tu grupo, hasta 12 personas." },
        { icon: "beer", title: "Tus bebidas a bordo", text: "Trae cervezas, champán y snacks. Es vuestra noche." },
        { icon: "music", title: "Tu playlist", text: "Altavoz Bluetooth disponible para ambiente garantizado." },
        { icon: "mapPin", title: "Salida Bastilla", text: "Continúa la noche en la calle Lappe tras el crucero." },
      ],
    },
    {
      type: "gallery",
      title: "Ambiente de despedida en el Sena",
      images: [
        { src: "/images/gallery/2025-04-08-a-22.20.42_88a4983b.webp", alt: "Grupo de amigos celebrando una despedida en el Sena" },
        { src: "/images/gallery/2025-04-08-a-20.58.14_0b6ddf22.webp", alt: "Navegación festiva para una despedida en París" },
        { src: "/images/gallery/2025-04-08-a-21.50.25_ac11bce0.webp", alt: "París iluminado durante una despedida en barco" },
        { src: "/images/gallery/2025-03-03-a-16.00.26_b41cf5f5.webp", alt: "El Senang bajo los puentes de París" },
      ],
    },
    { type: "testimonials", title: "Ellos lo vivieron", filter: "evg" },
    { type: "pricing", title: "Nuestras fórmulas de despedida" },
    {
      type: "faq",
      title: "Preguntas frecuentes – Despedida de soltero en el Sena",
      items: [
        { question: "¿Podemos traer nuestras propias bebidas?", answer: "¡Sí! Podéis traer cervezas, champán, cócteles y lo que queráis. Con la fórmula festiva, se incluye una copa de champán por persona." },
        { question: "¿Cuántas personas para una despedida en el barco?", answer: "El Senang acoge de 2 a 12 personas. La tarifa base cubre de 1 a 6 personas, luego 110€ por persona adicional." },
        { question: "¿Podemos poner nuestra música?", answer: "¡Por supuesto! Un altavoz Bluetooth está a vuestra disposición. Preparad vuestra playlist y poned ambiente." },
        { question: "¿Dónde está el punto de salida?", answer: "Salida desde el Puerto del Arsenal, junto a la Plaza de la Bastilla (París 12°). Metro Bastilla (líneas 1, 5, 8)." },
        { question: "¿Cuánto cuesta una despedida en el Sena?", answer: "Desde 480€ para la fórmula simple (1 a 6 personas) o 540€ para la fórmula festiva con champán. +80€ por persona adicional." },
      ],
    },
  ],
};

export default translation;
