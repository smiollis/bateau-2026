import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: { title: "Nochevieja en el Sena – Fiesta privada en barco en París", description: "Celebra la Nochevieja en el Sena a bordo de un barco privado. Champán, fuegos artificiales, Torre Eiffel iluminada." },
  hero: { title: "Nochevieja en el Sena", subtitle: "La Nochevieja más bonita de París se vive sobre el agua, frente a los fuegos artificiales", cta: { text: "Reservar la Nochevieja" } },
  sections: [
    { type: "richtext", title: "La Nochevieja más mágica de París", content: `<p>Cuenta atrás frente a la <strong>Torre Eiffel iluminada</strong>, copa de champán en mano, sobre las aguas del Sena. La Nochevieja a bordo del Senang es una experiencia extraordinaria que vuestros invitados no olvidarán jamás.</p><p>El Senang, barco de 12 metros <strong>privatizado para vuestro grupo</strong> (2 a 12 personas), navega durante 2 a 3 horas. Asistís al espectáculo pirotécnico desde el agua. Preparad vuestra <strong>Nochevieja a medida</strong>: mariscos, foie gras, champán, cotillones...</p><p>Salida desde el <strong>Puerto del Arsenal en Bastilla</strong>. Horario especial de 22h30 a 1h00. Plazas muy limitadas: ¡reservad desde septiembre!</p>` },
    { type: "benefits", title: "¿Por qué Nochevieja en el Sena?", items: [
      { icon: "sparkles", title: "Fuegos artificiales", text: "Vista directa del espectáculo pirotécnico desde el Sena." },
      { icon: "champagne", title: "Champán a medianoche", text: "Brindad frente a la Torre Eiffel al cambio de año." },
      { icon: "lock", title: "Privacidad total", text: "Solo vuestro grupo. Lejos de las multitudes del Trocadero." },
      { icon: "clock", title: "Horario extendido", text: "22h30-1h00. Vivid la cuenta atrás y celebrad sobre el agua." },
    ] },
    { type: "gallery", title: "Nochevieja en el Sena", images: [
      { src: "/images/gallery/2025-04-08-a-21.50.25_ac11bce0.webp", alt: "París iluminado desde el Sena en Nochevieja" },
      { src: "/images/gallery/2025-04-08-a-20.57.33_c61d5f00.webp", alt: "Ambiente festivo en el Senang" },
      { src: "/images/gallery/2025-04-15-a-22.21.11_0329a51a.webp", alt: "Crucero nocturno por el Sena" },
      { src: "/images/gallery/2025-03-02-a-21.18.40_52501437.webp", alt: "Vista nocturna de París desde el barco" },
    ] },
    { type: "testimonials", title: "Celebraron Nochevieja en el Sena", filter: "soiree" },
    { type: "pricing", title: "Nuestras fórmulas Nochevieja" },
    { type: "faq", title: "Preguntas frecuentes – Nochevieja", items: [
      { question: "¿Cuándo hay que reservar?", answer: "¡Lo antes posible! Solo tenemos un horario de Nochevieja. Reservad desde septiembre." },
      { question: "¿Cuánto dura el horario de Nochevieja?", answer: "El horario especial es de 22h30 a 1h00, 2h30 de navegación. Tarifa especial bajo presupuesto." },
      { question: "¿Se ven los fuegos artificiales?", answer: "¡Sí! El recorrido está optimizado para la mejor vista del espectáculo pirotécnico." },
      { question: "¿Se puede traer nuestro champán?", answer: "¡Por supuesto! El BYO se aplica también a Nochevieja. Traed champán, foie gras, cotillones... o elegid el Todo Incluido." },
      { question: "¿Cuánto cuesta?", answer: "La tarifa de Nochevieja es bajo presupuesto (horario extendido + período especial). Contactadnos para un presupuesto personalizado." },
    ] },
  ],
};
export default translation;
