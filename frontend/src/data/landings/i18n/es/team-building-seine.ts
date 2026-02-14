import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: { title: "Team building en el Sena – Evento de empresa en París", description: "Organiza un team building original en el Sena. Barco privado para 2 a 12 compañeros, aperitivo, 2h de crucero. Facturación empresarial disponible." },
  hero: { title: "Team building en el Sena", subtitle: "Refuerza la cohesión de tu equipo con un crucero privado en el corazón de París", cta: { text: "Reservar tu team building" } },
  sections: [
    { type: "richtext", title: "Un team building fuera de lo común", content: `<p>¿Buscas una <strong>salida de empresa original en París</strong>? Olvida los escape rooms y los bolos: embarca a tu equipo en el Sena para un team building del que todos hablarán. El Senang, barco de 12 metros privatizado, ofrece un marco único.</p><p>Durante <strong>2 horas de crucero</strong>, tu equipo de 2 a 12 personas disfruta de un panorama excepcional. Lejos de las paredes de la oficina, las conversaciones fluyen y las ideas surgen. Ideal para un afterwork o celebrar un éxito del equipo.</p><p>Formato flexible: <strong>aperitivo libre a bordo</strong> o fórmula festiva con champán. Altavoz Bluetooth disponible. <strong>Facturación empresarial</strong> disponible bajo petición.</p><p>Salida desde el <strong>Puerto del Arsenal en Bastilla</strong>. El Senang, <strong>veterano de los JJOO de París 2024</strong>, impresionará a tus compañeros.</p>` },
    { type: "benefits", title: "¿Por qué un team building en el Sena?", items: [
      { icon: "briefcase", title: "Factura empresarial", text: "Facturación profesional disponible. Gasto de empresa." },
      { icon: "users", title: "Hasta 12 personas", text: "Formato ideal para un equipo cercano. Ambiente cordial garantizado." },
      { icon: "utensils", title: "Catering posible", text: "Fórmula Todo Incluido con tablas, buffet o catering bajo presupuesto." },
      { icon: "mapPin", title: "Salida Bastilla", text: "Fácilmente accesible en metro. Afterwork posible tras el crucero." },
    ] },
    { type: "gallery", title: "Team buildings en el Sena", images: [
      { src: "/images/gallery/2025-04-08-a-22.20.47_261af646.webp", alt: "Equipo en team building en el Sena" },
      { src: "/images/gallery/2025-04-08-a-20.58.14_0b6ddf22.webp", alt: "Crucero de empresa en París" },
      { src: "/images/gallery/2025-03-03-a-16.00.26_b41cf5f5.webp", alt: "El Senang bajo los puentes de París" },
      { src: "/images/gallery/2025-04-08-a-22.20.42_88a4983b.webp", alt: "Ambiente cordial a bordo" },
    ] },
    { type: "testimonials", title: "Eligieron el Senang", filter: "team-building" },
    { type: "pricing", title: "Nuestras fórmulas team building" },
    { type: "faq", title: "Preguntas frecuentes – Team building", items: [
      { question: "¿Se puede obtener una factura empresarial?", answer: "Sí, emitimos una factura conforme con IVA para gastos profesionales." },
      { question: "¿Qué formato para un afterwork?", answer: "El horario 18h-20h entre semana es ideal. Fórmula simple a 480€ o festiva a 540€." },
      { question: "¿Se pueden organizar actividades a bordo?", answer: "El barco es ideal para charlas informales, brainstorming o quiz de equipo." },
      { question: "¿Máximo de personas?", answer: "El Senang acoge hasta 12 personas. Para grupos más grandes, contactadnos." },
      { question: "¿Cuál es la tarifa?", answer: "Desde 480€ para 1 a 6 personas, +80€ por persona adicional. Todo Incluido bajo presupuesto." },
    ] },
  ],
};
export default translation;
