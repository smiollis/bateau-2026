import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: { title: "Aniversario de boda en el Sena – Crucero privado", description: "Celebra tu aniversario de boda en el Sena. Crucero privado para 2 a 12 personas, champán, decorado romántico frente a la Torre Eiffel." },
  hero: { title: "Aniversario de boda en el Sena", subtitle: "Renueva la magia de vuestra pareja con un crucero privado en París", cta: { text: "Reservar tu crucero" } },
  sections: [
    { type: "richtext", title: "Un crucero para celebrar vuestro amor", content: `<p>Ya celebréis vuestras <strong>bodas de algodón, plata u oro</strong>, un aniversario de boda merece un marco excepcional. A bordo del Senang, un barco de 12 metros privatizado, revivid la emoción de vuestro compromiso navegando por el Sena.</p><p>Durante <strong>2 horas de navegación</strong>, dejad que París desfila ante vuestros ojos: la Torre Eiffel iluminada, el Puente Alejandro III, Notre-Dame... Brindad con una copa de <strong>champán incluida</strong> con la fórmula festiva.</p><p>Podéis organizar una <strong>cena romántica a bordo</strong> trayendo vuestra comida o pidiendo nuestras tablas de aperitivo. Invitad a vuestros seres queridos: el Senang acoge <strong>hasta 12 personas</strong>.</p><p>Salida desde el <strong>Puerto del Arsenal en Bastilla</strong>. El Senang, que navegó para los <strong>JJOO de París 2024</strong>, os ofrece un marco excepcional.</p>` },
    { type: "benefits", title: "¿Por qué celebrar en el Sena?", items: [
      { icon: "heart", title: "Romanticismo absoluto", text: "París iluminado de fondo para renovar vuestro compromiso." },
      { icon: "champagne", title: "Champán incluido", text: "Brindad por vuestro amor con la fórmula festiva." },
      { icon: "users", title: "Familia y amigos", text: "Invitad hasta 12 personas para compartir el momento." },
      { icon: "utensils", title: "Cena a bordo", text: "Traed vuestra comida o pedid nuestras tablas." },
    ] },
    { type: "gallery", title: "Momentos de aniversario en el Sena", images: [
      { src: "/images/gallery/2025-03-02-a-21.18.40_52501437.webp", alt: "Crucero de aniversario al crepúsculo" },
      { src: "/images/gallery/2025-04-08-a-20.57.33_c61d5f00.webp", alt: "Atardecer romántico en el Sena" },
      { src: "/images/gallery/2025-04-15-a-22.21.11_0329a51a.webp", alt: "Velada íntima a bordo del Senang" },
      { src: "/images/gallery/2025-04-08-a-21.50.25_ac11bce0.webp", alt: "París iluminado para un aniversario" },
    ] },
    { type: "testimonials", title: "Celebraron su amor", filter: "mariage" },
    { type: "pricing", title: "Nuestras fórmulas aniversario de boda" },
    { type: "faq", title: "Preguntas frecuentes – Aniversario de boda", items: [
      { question: "¿Se puede organizar una sorpresa?", answer: "¡Por supuesto! Contactadnos para coordinar decoración, champán y llegada a bordo sin levantar sospechas." },
      { question: "¿Se puede traer tarta o comida?", answer: "Sí, sois libres de traer tarta, catering o pícnic gourmet. Tenemos mesa a bordo." },
      { question: "¿Cuál es el mejor horario?", answer: "El atardecer es el más romántico. En invierno, el crucero nocturno ofrece monumentos iluminados." },
      { question: "¿Se puede venir con niños?", answer: "Sí, los niños son bienvenidos. Chalecos salvavidas infantiles disponibles. Menores de 3 años gratis." },
      { question: "¿Cuánto cuesta?", answer: "Desde 480€ (fórmula simple) o 540€ (fórmula festiva con champán) para 1 a 6 personas." },
    ] },
  ],
};
export default translation;
