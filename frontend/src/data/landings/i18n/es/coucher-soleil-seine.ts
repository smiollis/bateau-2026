import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: { title: "Crucero al atardecer en el Sena – Hora dorada en París", description: "Vive la hora dorada en el Sena. Crucero privado de 2h al atardecer, Torre Eiffel iluminada, champán. Desde 480€." },
  hero: { title: "Crucero al atardecer en el Sena", subtitle: "La hora dorada parisina vista desde el agua — un espectáculo inolvidable", cta: { text: "Reservar el atardecer" } },
  sections: [
    { type: "richtext", title: "La luz más bella de París", content: `<p>Hay un momento mágico en París: cuando el sol desciende tras la Torre Eiffel y la ciudad se viste de oro. Vive este espectáculo desde el Sena a bordo del Senang, un barco de 12 metros <strong>privatizado para tu grupo</strong>.</p><p>El <strong>crucero al atardecer</strong> es nuestro horario más solicitado. Durante 2 horas, asistís a la transformación de París: reflejos dorados en el Sena, sombras largas en los muelles, y los monumentos que se iluminan uno a uno.</p><p>¿El momento cumbre? El paso frente a la <strong>Torre Eiffel cuando sus luces centelleantes se encienden</strong>. Con la <strong>fórmula festiva</strong>, brindad con champán frente a este panorama. Salida desde el Puerto del Arsenal en Bastilla. ¡Reservad con antelación!</p>` },
    { type: "benefits", title: "¿Por qué el atardecer?", items: [
      { icon: "sunset", title: "Hora dorada", text: "La luz más bella de París, reflejos dorados en el Sena." },
      { icon: "sparkles", title: "Torre Eiffel centelleante", text: "Contempla la iluminación desde el agua." },
      { icon: "camera", title: "Fotos sublimes", text: "El mejor horario para fotos inolvidables." },
      { icon: "champagne", title: "Champán al sol", text: "Brindad frente al cielo encendido con la fórmula festiva." },
    ] },
    { type: "gallery", title: "Atardeceres en el Sena", images: [
      { src: "/images/gallery/2025-04-08-a-20.57.33_c61d5f00.webp", alt: "Atardecer en el Sena en París" },
      { src: "/images/gallery/2025-03-02-a-21.18.40_52501437.webp", alt: "Hora dorada en el Sena con el Senang" },
      { src: "/images/gallery/2025-04-08-a-21.50.25_ac11bce0.webp", alt: "París iluminado al crepúsculo desde el Sena" },
      { src: "/images/gallery/2025-04-15-a-22.21.11_0329a51a.webp", alt: "Velada en el Senang al atardecer" },
    ] },
    { type: "testimonials", title: "Vieron el atardecer", filter: "coucher-soleil" },
    { type: "pricing", title: "Nuestras fórmulas atardecer" },
    { type: "faq", title: "Preguntas frecuentes – Atardecer", items: [
      { question: "¿A qué hora es el atardecer?", answer: "Varía según la estación: sobre las 17h30 en invierno, 21h30 en verano. Recomendamos reservar 1h30 antes." },
      { question: "¿Este horario es más caro?", answer: "No, las tarifas son las mismas: 480€ (simple) o 540€ (festiva). Pero es muy demandado, reservad con antelación." },
      { question: "¿Se ve la Torre Eiffel centellear?", answer: "¡Sí! Si vuestro crucero cubre la hora en punto (cada hora tras el anochecer), veréis las 20.000 bombillas centellear 5 minutos." },
      { question: "¿Y si el cielo está nublado?", answer: "Incluso nublado, la luz del atardecer es bella. En caso de mal tiempo severo, aplazamiento gratuito." },
      { question: "¿Se puede reservar para una sesión de fotos?", answer: "¡Por supuesto! La hora dorada es el horario favorito de los fotógrafos." },
    ] },
  ],
};
export default translation;
