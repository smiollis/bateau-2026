import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: { title: "Sesión de fotos en el Sena – Shooting en barco en París", description: "Realiza una sesión de fotos única en el Sena. Barco privado, luz natural, Puente Alejandro III y Torre Eiffel de fondo. 2h de crucero." },
  hero: { title: "Sesión de fotos en el Sena", subtitle: "Un decorado natural excepcional para tus mejores fotos", cta: { text: "Reservar tu sesión" } },
  sections: [
    { type: "richtext", title: "Una sesión de fotos excepcional sobre el agua", content: `<p>Fotógrafos, parejas, influencers y marcas: el Senang ofrece un <strong>estudio fotográfico flotante</strong> único en el corazón de París. Durante 2 horas de navegación, disfrutad de un decorado en movimiento permanente: Torre Eiffel, Puente Alejandro III, muelles del Sena...</p><p>La <strong>luz natural sobre el Sena</strong> es excepcional. La hora dorada ofrece reflejos dorados sobre el agua — el sueño de cualquier fotógrafo. El Senang ya sirvió de plató para <strong>rodajes profesionales</strong>: Adidas, Le Slip Français, y fue el barco oficial de Mauritania en los <strong>JJOO de París 2024</strong>.</p><p>El barco está <strong>completamente privatizado</strong>: sin viandantes en el encuadre. Salida desde el <strong>Puerto del Arsenal en Bastilla</strong>. Reservad el horario del atardecer para la mejor luz.</p>` },
    { type: "benefits", title: "¿Por qué una sesión en el Sena?", items: [
      { icon: "camera", title: "Decorado excepcional", text: "Torre Eiffel, Puente Alejandro III, muelles del Sena de fondo." },
      { icon: "sunset", title: "Hora dorada", text: "Luz dorada natural para fotos sublimes." },
      { icon: "film", title: "Plató probado", text: "Usado por Adidas, Le Slip Français, JJOO 2024." },
      { icon: "lock", title: "Privacidad total", text: "Nadie en tu encuadre. Tu fotógrafo trabaja libremente." },
    ] },
    { type: "gallery", title: "Sesiones en el Sena", images: [
      { src: "/images/gallery/2025-04-04-a-17.33.30_ea0b05c2.webp", alt: "Sesión de fotos en el Sena con la Torre Eiffel" },
      { src: "/images/gallery/2025-04-08-a-20.57.33_c61d5f00.webp", alt: "Hora dorada en el Sena" },
      { src: "/images/gallery/2025-04-18-a-09.55.02_4b9f3852.webp", alt: "Vista desde el barco durante una sesión" },
      { src: "/images/gallery/2025-03-03-a-16.00.26_b41cf5f5.webp", alt: "El Senang bajo los puentes de París" },
    ] },
    { type: "testimonials", title: "Eligieron el Senang", filter: "shooting" },
    { type: "pricing", title: "Nuestras fórmulas de sesión fotográfica" },
    { type: "faq", title: "Preguntas frecuentes – Sesión de fotos", items: [
      { question: "¿Se puede traer un fotógrafo profesional?", answer: "¡Por supuesto! Vuestro fotógrafo es bienvenido a bordo y puede moverse libremente." },
      { question: "¿Cuál es el mejor horario para la luz?", answer: "La hora dorada (1h antes del atardecer) ofrece la mejor luz. Reservad con antelación." },
      { question: "¿El barco es estable para las fotos?", answer: "Sí, el Senang navega lento y ofrece navegación estable. Sin vibraciones molestas." },
      { question: "¿Se puede hacer un shooting de moda?", answer: "Sí, varias marcas ya han rodado a bordo. El decorado cambia naturalmente durante la navegación." },
      { question: "¿Cuánto cuesta una sesión en el Sena?", answer: "Desde 480€ (fórmula simple, 2h). La tarifa es la misma que un crucero estándar." },
    ] },
  ],
};
export default translation;
