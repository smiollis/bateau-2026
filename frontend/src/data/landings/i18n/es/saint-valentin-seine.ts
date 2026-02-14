import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: { title: "San Valentín en el Sena – Crucero romántico en París", description: "Regala un crucero privado en el Sena para San Valentín. Champán, Torre Eiffel iluminada, 2h en pareja. Desde 540€." },
  hero: { title: "San Valentín en el Sena", subtitle: "La declaración de amor más bonita se hace sobre el agua, frente a la Torre Eiffel", cta: { text: "Reservar San Valentín" } },
  sections: [
    { type: "richtext", title: "El San Valentín más romántico de París", content: `<p>Olvida los restaurantes abarrotados: este año regala a tu pareja un <strong>crucero privado en el Sena</strong> para San Valentín. El Senang, barco de 12 metros privatizado para vosotros dos, navega 2 horas por el París iluminado.</p><p>Imagina: una <strong>copa de champán</strong> en mano, vuestra playlist romántica en el altavoz Bluetooth y la Torre Eiffel centelleando. El Puente Alejandro III, Notre-Dame, los muelles del Sena bañados de luz... Cada minuto es un recuerdo.</p><p>El horario del <strong>atardecer</strong> es el más demandado. La hora dorada transforma París en un cuadro dorado. Salida desde el Puerto del Arsenal en Bastilla. ¡Reservad pronto: los horarios de febrero se agotan rápido!</p>` },
    { type: "benefits", title: "¿Por qué San Valentín en el Sena?", items: [
      { icon: "heart", title: "100% romántico", text: "Barco privatizado para 2. Sin otros pasajeros, solo vosotros." },
      { icon: "champagne", title: "Champán incluido", text: "Fórmula festiva con champán frente a la Torre Eiffel." },
      { icon: "sparkles", title: "Torre Eiffel centelleante", text: "El espectáculo de las 20.000 bombillas desde el agua." },
      { icon: "music", title: "Tu playlist", text: "Altavoz Bluetooth incluido. Crea tu ambiente romántico." },
    ] },
    { type: "gallery", title: "San Valentín en el Sena", images: [
      { src: "/images/gallery/2025-04-08-a-20.57.33_c61d5f00.webp", alt: "Crucero romántico al atardecer" },
      { src: "/images/gallery/2025-03-02-a-21.18.40_52501437.webp", alt: "Hora dorada en el Sena para San Valentín" },
      { src: "/images/gallery/2025-04-08-a-21.50.25_ac11bce0.webp", alt: "París iluminado desde el Senang" },
      { src: "/images/gallery/2025-04-15-a-22.21.11_0329a51a.webp", alt: "Velada romántica a bordo del Senang" },
    ] },
    { type: "testimonials", title: "Celebraron San Valentín en el Sena", filter: "romantique" },
    { type: "pricing", title: "Nuestras fórmulas San Valentín" },
    { type: "faq", title: "Preguntas frecuentes – San Valentín", items: [
      { question: "¿Hay que reservar con mucha antelación?", answer: "¡Sí! Los horarios de febrero son muy demandados. Reservad al menos 2 a 3 semanas antes." },
      { question: "¿Se puede venir solo en pareja?", answer: "¡Por supuesto! La tarifa base (480€ simple, 540€ festiva) cubre de 1 a 6 personas. En pareja, es intimidad total." },
      { question: "¿Se puede traer tarta o flores?", answer: "¡Claro! Tarta, rosas, velas, decoración... Preparad la sorpresa, os ayudamos a instalarlo a bordo." },
      { question: "¿El barco tiene calefacción en febrero?", answer: "El Senang es un barco semi-abierto. Proporcionamos mantas, pero abrigaos bien. ¡El ambiente acogedor forma parte del encanto!" },
      { question: "¿Se puede pedir matrimonio a bordo?", answer: "¡Es nuestra especialidad! Contactadnos para organizar el momento perfecto. Guardamos el secreto." },
    ] },
  ],
};
export default translation;
