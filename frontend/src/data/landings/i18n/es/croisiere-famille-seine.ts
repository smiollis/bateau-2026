import type { LandingPageTranslation } from "../../types";

const translation: LandingPageTranslation = {
  meta: { title: "Crucero familiar en el Sena – Barco privado en París", description: "Ofrece a tu familia un crucero privado por el Sena. Niños bienvenidos, barco seguro, 2h entre la Torre Eiffel y Notre-Dame." },
  hero: { title: "Crucero familiar en el Sena", subtitle: "Un momento de convivencia intergeneracional a bordo de un barco privado", cta: { text: "Reservar en familia" } },
  sections: [
    { type: "richtext", title: "París en familia desde el Sena", content: `<p>Regala a los tuyos un recuerdo inolvidable: un <strong>crucero familiar en el Sena</strong> a bordo del Senang. Este barco de 12 metros, seguro e íntimo, está privatizado para vuestra familia — de 2 a 12 personas, de abuelos a nietos.</p><p>Durante <strong>2 horas</strong>, descubrid los monumentos de París desde una perspectiva única. Los niños adoran navegar y ver París desde el agua. El Senang cuenta con <strong>chalecos salvavidas para adultos y niños</strong>. Los menores de 3 años viajan gratis.</p><p>Sois libres de traer un <strong>pícnic familiar</strong>, una tarta o meriendas para los niños. Ideal para una <strong>reunión familiar</strong>, un cumpleaños o unas vacaciones escolares. Salida desde el Puerto del Arsenal en Bastilla.</p>` },
    { type: "benefits", title: "¿Por qué un crucero familiar?", items: [
      { icon: "shield", title: "Seguridad infantil", text: "Chalecos salvavidas adaptados, barco estable y seguro." },
      { icon: "users", title: "3 generaciones", text: "De 2 a 12 personas, de nietos a abuelos." },
      { icon: "utensils", title: "Pícnic libre", text: "Traed meriendas, tarta y bebidas para toda la familia." },
      { icon: "baby", title: "Niños gratis", text: "Gratis para menores de 3 años. Cochecitos bienvenidos en el puerto." },
    ] },
    { type: "gallery", title: "Familias en el Sena", images: [
      { src: "/images/gallery/2025-04-08-a-20.58.31_fcc03538.webp", alt: "Familia disfrutando de un crucero por el Sena" },
      { src: "/images/gallery/2025-04-08-a-20.57.33_c61d5f00.webp", alt: "Momentos familiares a bordo" },
      { src: "/images/gallery/2025-03-03-a-16.00.24_c635ba48.webp", alt: "Vista de los puentes de París desde el barco" },
      { src: "/images/gallery/2025-07-27-a-12.22.05_77ed38c8.webp", alt: "Navegación familiar por el corazón de París" },
    ] },
    { type: "testimonials", title: "Familias satisfechas", filter: "famille" },
    { type: "pricing", title: "Nuestras fórmulas familiares" },
    { type: "faq", title: "Preguntas frecuentes – Crucero familiar", items: [
      { question: "¿Los niños están seguros a bordo?", answer: "Sí, el Senang cuenta con chalecos salvavidas para adultos y niños. El barco es estable y el capitán vela por la seguridad." },
      { question: "¿A partir de qué edad se puede embarcar?", answer: "No hay edad mínima. Bebés y niños pequeños son bienvenidos. Menores de 3 años gratis." },
      { question: "¿Se puede traer cochecito?", answer: "Sí, el puerto es accesible con cochecito. Se puede dejar en el muelle durante el crucero." },
      { question: "¿Máximo de personas?", answer: "El Senang acoge hasta 12 personas (niños incluidos). Tarifa base 1 a 6 personas, +110€ por persona adicional." },
      { question: "¿Se puede traer comida para los niños?", answer: "¡Por supuesto! Meriendas, biberón, tarta... Traed todo lo necesario." },
    ] },
  ],
};
export default translation;
