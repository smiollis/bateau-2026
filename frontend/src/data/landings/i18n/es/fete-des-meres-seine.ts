import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: { title: "Día de la Madre en el Sena – Crucero regalo en París", description: "Regala a tu madre un crucero privado en el Sena para el Día de la Madre. Champán, Torre Eiffel, momento familiar. Desde 480€." },
  hero: { title: "Día de la Madre en el Sena", subtitle: "El regalo más bonito para mamá — un crucero privado en el corazón de París", cta: { text: "Regalar el crucero" } },
  sections: [
    { type: "richtext", title: "El regalo perfecto para el Día de la Madre", content: `<p>Este año, olvida las flores y el perfume. Regala a tu madre un <strong>momento inolvidable en el Sena</strong>. El Senang, barco de 12 metros privatizado para vuestra familia, navega 2 horas entre los monumentos más bellos de París.</p><p>Imagina su sorpresa: un <strong>barco solo para ella</strong>, una copa de champán, la Torre Eiffel desfilando, y toda la familia reunida. Es mucho más que un regalo — es un recuerdo que quedará grabado para siempre.</p><p>El Senang acoge <strong>de 2 a 12 personas</strong>. Ofrecemos <strong>bonos regalo</strong> personalizados. Salida desde el Puerto del Arsenal en Bastilla.</p>` },
    { type: "benefits", title: "¿Por qué el Sena para el Día de la Madre?", items: [
      { icon: "gift", title: "Regalo único", text: "Un recuerdo inolvidable, mejor que un objeto. Bono regalo disponible." },
      { icon: "heart", title: "Momento familiar", text: "Reunid a toda la familia alrededor de mamá en el Sena." },
      { icon: "champagne", title: "Champán incluido", text: "Fórmula festiva con champán para brindar en familia." },
      { icon: "camera", title: "Fotos de recuerdo", text: "La Torre Eiffel y los puentes de París de fondo." },
    ] },
    { type: "gallery", title: "Día de la Madre en el Sena", images: [
      { src: "/images/gallery/2025-04-08-a-20.58.31_fcc03538.webp", alt: "Familia reunida en el Sena para el Día de la Madre" },
      { src: "/images/gallery/2025-04-08-a-21.50.25_ac11bce0.webp", alt: "Momentos familiares a bordo" },
      { src: "/images/gallery/2025-04-08-a-20.57.33_c61d5f00.webp", alt: "Atardecer en el Sena" },
      { src: "/images/gallery/2025-07-27-a-12.22.05_77ed38c8.webp", alt: "Navegación familiar por el corazón de París" },
    ] },
    { type: "testimonials", title: "Les encantó su crucero", filter: "famille" },
    { type: "pricing", title: "Nuestras fórmulas Día de la Madre" },
    { type: "faq", title: "Preguntas frecuentes – Día de la Madre", items: [
      { question: "¿Ofrecéis bonos regalo?", answer: "¡Sí! Ofrecemos bonos regalo personalizados, imprimibles o por email. Ideal para guardar la sorpresa." },
      { question: "¿Se puede venir con niños pequeños?", answer: "¡Claro! Chalecos salvavidas infantiles incluidos, cochecito guardado en el muelle. Menores de 3 años gratis." },
      { question: "¿Se puede traer una tarta?", answer: "¡Por supuesto! Tarta, flores, regalos, brunch... Traed todo lo que haga feliz a mamá." },
      { question: "¿Qué horario recomendáis?", answer: "El atardecer (variable según la estación) ofrece la luz más bonita para las fotos." },
      { question: "¿Máximo de personas?", answer: "El Senang acoge hasta 12 personas. Tarifa base 1 a 6 personas (480€ simple), +80€ por persona adicional." },
    ] },
  ],
};
export default translation;
