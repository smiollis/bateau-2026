import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: {
    title: "Noche entre amigos en el Sena – Aperitivo en barco en París",
    description:
      "Organiza una noche entre amigos en el Sena. Barco privado hasta 12 personas, bebidas libres, tu playlist. 2h de crucero desde 480€.",
  },
  hero: {
    title: "Noche entre amigos en el Sena",
    subtitle: "Un aperitivo flotante en el corazón de París, entre colegas y sin complicaciones",
    cta: { text: "Reservar tu velada" },
  },
  sections: [
    {
      type: "richtext",
      title: "Un plan original entre amigos en París",
      content: `<p>¿Quieres un <strong>plan original entre amigos en París</strong>? Olvida los bares abarrotados y las terrazas ruidosas: embarca en el Sena para un aperitivo flotante a bordo del Senang, un barco de 12 metros completamente privatizado.</p>

<p>Durante <strong>2 horas de crucero</strong>, disfruta de París como nunca: la Torre Eiffel al atardecer, Notre-Dame iluminada, el Puente Alejandro III de fondo... Todo con tus amigos, tus bebidas y tu música.</p>

<p>El concepto es simple: el barco está <strong>100% privatizado para tu grupo</strong> de 2 a 12 personas. Traed lo que queráis: cervezas, vino, pizza, pícnic, tarta... Es vuestra noche, cero restricciones. Conectad vuestra playlist al altavoz Bluetooth y ¡a disfrutar!</p>

<p>La <strong>fórmula simple a 480€</strong> (para 1 a 6 personas) es la opción más accesible para un afterwork entre compañeros o una salida relajada. ¿Queréis champán? La fórmula festiva a 540€ incluye una copa por persona.</p>

<p>La salida es desde el <strong>Puerto del Arsenal en Bastilla</strong>. Tras el crucero, estáis a dos pasos de los bares y restaurantes del barrio para continuar la noche.</p>

<p>El Senang acogió la delegación de Mauritania durante los <strong>JJOO de París 2024</strong> y sirvió de plató para Adidas y Le Slip Français. Un marco con clase para una velada relajada entre amigos.</p>`,
    },
    {
      type: "benefits",
      title: "¿Por qué elegir un barco para tu noche entre amigos?",
      items: [
        { icon: "users", title: "Tu grupo, tu barco", text: "Privatizado de 2 a 12 personas. Sin turistas, sin vecinos." },
        { icon: "beer", title: "Bebidas libres", text: "Traed bebidas y comida. Cero restricciones, cero suplemento." },
        { icon: "music", title: "Ambiente musical", text: "Altavoz Bluetooth incluido. Vuestra playlist, vuestro ambiente." },
        { icon: "wallet", title: "Desde 62€/pers.", text: "480€ para 6 personas = 80€ cada uno. Imbatible en París." },
      ],
    },
    {
      type: "gallery",
      title: "Noches entre amigos en el Sena",
      images: [
        { src: "/images/gallery/2025-04-08-a-22.20.47_261af646.webp", alt: "Grupo de amigos disfrutando de un crucero por el Sena" },
        { src: "/images/gallery/2025-04-08-a-20.58.14_0b6ddf22.webp", alt: "Aperitivo entre amigos en el Senang" },
        { src: "/images/gallery/2025-04-08-a-22.20.42_88a4983b.webp", alt: "Ambiente festivo entre amigos en el Sena" },
        { src: "/images/gallery/2025-04-04-a-17.33.30_ea0b05c2.webp", alt: "Navegación entre amigos por el corazón de París" },
      ],
    },
    { type: "testimonials", title: "Pasaron una velada memorable", filter: "amis" },
    { type: "pricing", title: "Nuestras fórmulas para tu noche entre amigos" },
    {
      type: "faq",
      title: "Preguntas frecuentes – Noche entre amigos",
      items: [
        { question: "¿Podemos traer nuestras propias bebidas y comida?", answer: "¡Sí, esa es la idea! Traed cervezas, vino, patatas, pizza, pícnic... Lo que os apetezca. También ofrecemos tablas de aperitivo bajo pedido." },
        { question: "¿Cuánto cuesta por persona?", answer: "La fórmula simple a 480€ cubre hasta 6 personas, es decir 80€ por persona. Más allá, 80€ por persona adicional (máx. 12)." },
        { question: "¿Se puede reservar para un afterwork?", answer: "¡Por supuesto! El horario de 18h a 20h entre semana es perfecto para un afterwork original. La salida en Bastilla es ideal tras el trabajo." },
        { question: "¿Hay límite de ruido u horario?", answer: "Navegamos generalmente entre las 10h y las 22h30. La música por Bluetooth está permitida a volumen razonable." },
        { question: "¿Qué pasa si llueve?", answer: "El Senang tiene un toldo de protección. En caso de mal tiempo severo, ofrecemos un aplazamiento gratuito a la fecha que elijáis." },
      ],
    },
  ],
};

export default translation;
