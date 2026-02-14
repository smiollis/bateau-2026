import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: { title: "Seminario en el Sena – Evento de empresa en barco en París", description: "Organiza tu seminario en el Sena. Barco privado para 2 a 12 compañeros, entorno inspirador, facturación empresarial. Desde 480€." },
  hero: { title: "Seminario en el Sena", subtitle: "Un entorno inspirador para tus reuniones de equipo — lejos de la oficina, sobre el agua", cta: { text: "Reservar tu seminario" } },
  sections: [
    { type: "richtext", title: "Un seminario fuera de la oficina, en el Sena", content: `<p>Cambia de entorno para <strong>liberar la creatividad</strong> de tu equipo. El Senang, barco de 12 metros privatizado, ofrece un espacio único para organizar un seminario en el corazón de París. Durante 2 horas de navegación, tus compañeros intercambian ideas en un entorno inspirador y desconectado.</p><p>El formato es flexible: <strong>sesión de trabajo</strong> por la mañana, brainstorming creativo por la tarde, o afterwork de cohesión por la noche. <strong>Facturación empresarial</strong> disponible.</p><p>El Senang ha acogido <strong>eventos corporativos</strong> para marcas como Adidas y Le Slip Français, y fue el barco oficial de Mauritania en los JJOO de París 2024. Salida desde el Puerto del Arsenal en Bastilla.</p>` },
    { type: "benefits", title: "¿Por qué un seminario en el Sena?", items: [
      { icon: "lightbulb", title: "Entorno inspirador", text: "El Sena y los monumentos de París estimulan la creatividad." },
      { icon: "briefcase", title: "Factura empresarial", text: "Facturación profesional con IVA. Gasto de empresa." },
      { icon: "users", title: "2 a 12 personas", text: "Formato íntimo ideal para un comité de dirección o equipo de proyecto." },
      { icon: "utensils", title: "Catering posible", text: "Bandejas, buffet frío, tablas de aperitivo bajo pedido." },
    ] },
    { type: "gallery", title: "Seminarios en el Sena", images: [
      { src: "/images/gallery/2025-04-08-a-22.20.47_261af646.webp", alt: "Seminario de empresa en el Sena" },
      { src: "/images/gallery/2025-04-08-a-20.58.14_0b6ddf22.webp", alt: "Reunión de equipo a bordo del Senang" },
      { src: "/images/gallery/2025-03-03-a-16.00.26_b41cf5f5.webp", alt: "El Senang bajo los puentes de París" },
      { src: "/images/gallery/2025-04-08-a-22.20.42_88a4983b.webp", alt: "Ambiente cordial para un seminario" },
    ] },
    { type: "testimonials", title: "Organizaron su seminario en el Sena", filter: "team-building" },
    { type: "pricing", title: "Nuestras fórmulas seminario" },
    { type: "faq", title: "Preguntas frecuentes – Seminario", items: [
      { question: "¿Hay WiFi a bordo?", answer: "No hay WiFi embarcado. Pero la cobertura 4G/5G es excelente en el Sena. Preparad vuestros documentos con antelación." },
      { question: "¿Se puede proyectar una presentación?", answer: "No hay proyector, pero se puede emitir audio por el altavoz Bluetooth. Para visuales, recomendamos una tablet o pantalla portátil." },
      { question: "¿Qué formato para un brainstorming?", answer: "El horario de 2h es ideal: 30 min de instalación e ice-breaking, 1h de trabajo, 30 min de conclusiones y aperitivo." },
      { question: "¿Se puede ampliar la duración?", answer: "Sí, contactadnos para un horario extendido. Suplemento horario bajo presupuesto." },
      { question: "¿Cuál es la tarifa para 10 personas?", answer: "480€ (base 1-6) + 4 × 80€ = 800€ para 10 personas (fórmula simple). Festiva y Todo Incluido bajo presupuesto." },
    ] },
  ],
};
export default translation;
