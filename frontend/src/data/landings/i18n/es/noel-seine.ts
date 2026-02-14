import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: { title: "Crucero de Navidad en el Sena – Fiestas en barco en París", description: "Vive la magia de la Navidad en el Sena. Crucero privado, París iluminado, ambiente de cuento. Barco privado de 2 a 12 personas. Desde 480€." },
  hero: { title: "Crucero de Navidad en el Sena", subtitle: "La magia de las fiestas vista desde el Sena — París brilla para vosotros", cta: { text: "Reservar tu crucero de Navidad" } },
  sections: [
    { type: "richtext", title: "La magia navideña en el Sena", content: `<p>En diciembre, París brilla con mil luces. Y no hay mejor lugar para admirar este espectáculo que <strong>desde el Sena</strong>. El Senang os ofrece un crucero privado de 2 horas por el corazón de la capital iluminada para las fiestas.</p><p>Navegad entre las <strong>decoraciones navideñas de los grandes almacenes</strong>, las guirnaldas de los puentes, los árboles iluminados. El concepto es perfecto: traed vuestro <strong>chocolate caliente, vino caliente, castañas asadas</strong>... o elegid la fórmula festiva con champán.</p><p>Ideal como <strong>regalo de Navidad original</strong>, salida familiar durante las vacaciones, o velada navideña entre amigos. Salida desde el <strong>Puerto del Arsenal en Bastilla</strong>. Proporcionamos mantas para las noches frescas.</p>` },
    { type: "benefits", title: "¿Por qué un crucero de Navidad?", items: [
      { icon: "sparkles", title: "París iluminado", text: "Decoraciones navideñas, puentes iluminados, Torre Eiffel centelleante." },
      { icon: "gift", title: "Regalo original", text: "Regala una experiencia inolvidable en vez de un objeto." },
      { icon: "users", title: "En familia", text: "De 2 a 12 personas, niños bienvenidos. Ambiente acogedor." },
      { icon: "coffee", title: "Chocolate caliente BYO", text: "Traed vino caliente, chocolate caliente, tronco de Navidad... Todo vale." },
    ] },
    { type: "gallery", title: "Navidad en el Sena", images: [
      { src: "/images/gallery/2025-04-08-a-21.50.25_ac11bce0.webp", alt: "París iluminado por Navidad desde el Sena" },
      { src: "/images/gallery/2025-04-08-a-20.57.33_c61d5f00.webp", alt: "Ambiente de cuento en el Senang" },
      { src: "/images/gallery/2025-04-08-a-20.58.31_fcc03538.webp", alt: "Crucero familiar durante las fiestas" },
      { src: "/images/gallery/2025-03-02-a-21.18.40_52501437.webp", alt: "Velada navideña en el Sena" },
    ] },
    { type: "testimonials", title: "Celebraron Navidad en el Sena", filter: "famille" },
    { type: "pricing", title: "Nuestras fórmulas de Navidad" },
    { type: "faq", title: "Preguntas frecuentes – Crucero de Navidad", items: [
      { question: "¿El barco navega en diciembre?", answer: "¡Sí! El Senang navega todo el año. Proporcionamos mantas. Traed gorros y guantes." },
      { question: "¿Se puede regalar el crucero?", answer: "¡Por supuesto! Ofrecemos bonos regalo. Contactadnos para un bono personalizado." },
      { question: "¿Los niños son bienvenidos?", answer: "Sí, es una salida familiar perfecta. Chalecos salvavidas infantiles incluidos. Menores de 3 años gratis." },
      { question: "¿Se puede traer vino caliente?", answer: "¡Claro! Vino caliente, chocolate, tronco de Navidad, castañas... Traed todo lo que haga espíritu navideño." },
      { question: "¿Hay horarios especiales para las fiestas?", answer: "Los fines de semana de diciembre y la semana entre Navidad y Año Nuevo son muy demandados. Reservad al menos 2 semanas antes." },
    ] },
  ],
};
export default translation;
