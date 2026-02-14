import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: { title: "Aperitivo en barco en el Sena – Drinks privados en París", description: "Organiza un aperitivo en el Sena en barco privado. BYO (trae tus bebidas), 2h de crucero, 2 a 12 personas. Desde 62€/pers." },
  hero: { title: "Aperitivo en barco en el Sena", subtitle: "El aperitivo más cool de París — sobre el agua, entre amigos", cta: { text: "Reservar tu aperitivo" } },
  sections: [
    { type: "richtext", title: "El mejor aperitivo de París", content: `<p>¿Por qué tomar el aperitivo en un bar cuando puedes hacerlo <strong>en el Sena</strong>? El Senang te ofrece el concepto más simple y genial de París: un barco de 12 metros privatizado, tus bebidas, tus amigos y 2 horas de navegación por el corazón de la capital.</p><p>El concepto es <strong>BYO (Bring Your Own)</strong>: trae cervezas, vino, rosado, cócteles, patatas, embutido, pizza... Lo que quieras. Cero suplemento, cero restricciones. Conecta tu playlist al altavoz Bluetooth y ¡a disfrutar!</p><p>A <strong>480€ para 6 personas</strong> (80€ cada uno), es la actividad más accesible de París para un momento realmente original. Salida desde el <strong>Puerto del Arsenal en Bastilla</strong>.</p>` },
    { type: "benefits", title: "¿Por qué un aperitivo en el Sena?", items: [
      { icon: "beer", title: "BYO total", text: "Trae todas tus bebidas y comida. Cero suplemento." },
      { icon: "wallet", title: "Desde 80€/pers.", text: "480€ para 6 = la mejor relación calidad-precio de París." },
      { icon: "music", title: "Tu música", text: "Altavoz Bluetooth incluido. Tu playlist, tu ambiente." },
      { icon: "mapPin", title: "Salida Bastilla", text: "En pleno París. Continúa la noche tras el crucero." },
    ] },
    { type: "gallery", title: "Aperitivos en el Sena", images: [
      { src: "/images/gallery/2025-04-08-a-20.58.14_0b6ddf22.webp", alt: "Aperitivo entre amigos en el Sena" },
      { src: "/images/gallery/2025-04-08-a-22.20.42_88a4983b.webp", alt: "Ambiente relajado a bordo" },
      { src: "/images/gallery/2025-04-08-a-22.20.47_261af646.webp", alt: "Grupo disfrutando del aperitivo en el Senang" },
      { src: "/images/gallery/2025-04-04-a-17.33.30_ea0b05c2.webp", alt: "Navegación aperitivo por el corazón de París" },
    ] },
    { type: "testimonials", title: "Tomaron el aperitivo en el Sena", filter: "apero" },
    { type: "pricing", title: "Nuestras fórmulas aperitivo" },
    { type: "faq", title: "Preguntas frecuentes – Aperitivo en barco", items: [
      { question: "¿Se puede traer de todo?", answer: "¡Sí! Cervezas, vino, cócteles, patatas, pizza, embutido... Todo está permitido. Solo pedimos que os llevéis la basura." },
      { question: "¿Cuánto cuesta por persona?", answer: "480€ para 1 a 6 personas = 80€/pers. para 6 amigos. Más allá, +80€ por persona (máx. 12)." },
      { question: "¿Hay nevera a bordo?", answer: "No, pero ¡traed una nevera portátil! El capitán os ayuda a instalarla. Consejo: traed hielo para mantener el rosado fresco." },
      { question: "¿Se puede reservar para un afterwork?", answer: "¡Por supuesto! El horario 18h-20h entre semana es perfecto. Salida Bastilla, ideal tras el trabajo." },
      { question: "¿Ofrecéis tablas de aperitivo?", answer: "Sí, ofrecemos tablas de embutido/queso bajo pedido. Avisadnos con 48h de antelación." },
    ] },
  ],
};
export default translation;
