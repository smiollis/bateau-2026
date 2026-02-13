import type { LandingPageData } from "./types";

export const croisiereRomantiqueSeine: LandingPageData = {
  slug: "croisiere-romantique-seine",
  meta: {
    title: "Croisi\u00e8re romantique sur la Seine \u2013 Soir\u00e9e priv\u00e9e \u00e0 Paris",
    description:
      "Offrez une croisi\u00e8re romantique priv\u00e9e sur la Seine. 2h en amoureux avec champagne, coucher de soleil et monuments illumin\u00e9s. \u00c0 partir de 420\u00a0\u20ac.",
    ogImage: "/images/landings/romantique-seine-og.jpg",
  },
  hero: {
    title: "Croisi\u00e8re romantique sur la Seine",
    subtitle:
      "Vivez un moment magique \u00e0 deux au fil de l\u2019eau, avec Paris comme d\u00e9cor",
    backgroundImage: "/images/gallery/2025-04-08-a-20.57.33_c61d5f00.webp",
    cta: { text: "R\u00e9server votre soir\u00e9e", href: "/reservation?occasion=romantique" },
  },
  sections: [
    {
      type: "richtext",
      title: "Une soir\u00e9e romantique inoubliable \u00e0 Paris",
      content: `<p>Paris est la ville de l\u2019amour, et il n\u2019y a pas de meilleur fa\u00e7on de la d\u00e9couvrir en couple qu\u2019au fil de la Seine. Embarquez pour une <strong>croisi\u00e8re romantique priv\u00e9e</strong> \u00e0 bord du Senang, un \u00e9l\u00e9gant bateau de 12 m\u00e8tres, rien que pour vous deux.</p>

<p>Pendant <strong>2 heures de navigation</strong>, laissez-vous porter par la magie de Paris au coucher du soleil. La Tour Eiffel qui s\u2019illumine, les reflets dor\u00e9s sur la Seine, le Pont Alexandre III d\u00e9cor\u00e9 de ses lampadaires\u2026 Chaque instant est une carte postale vivante.</p>

<p>Avec la <strong>formule festive</strong>, profitez d\u2019une coupe de champagne offerte \u00e0 chacun pour trinquer face \u00e0 la Tour Eiffel. Vous pouvez \u00e9galement pr\u00e9parer un pique-nique gastronomique ou commander nos planches ap\u00e9ritives pour rendre le moment encore plus sp\u00e9cial.</p>

<p>Le Senang est <strong>enti\u00e8rement privatis\u00e9</strong> : pas de groupe de touristes, pas de bruit, juste le clapotis de l\u2019eau et le murmure de la ville. Le Capitaine Michel, discret et professionnel, vous laisse savourer votre intimit\u00e9 tout en assurant une navigation fluide.</p>

<p>Que ce soit pour un <strong>anniversaire de couple</strong>, une surprise romantique, ou simplement pour se retrouver loin du quotidien, cette croisi\u00e8re vous offre un cadre exceptionnel. D\u00e9part du Port de l\u2019Arsenal \u00e0 Bastille, facilement accessible en m\u00e9tro.</p>

<p>Pour une exp\u00e9rience encore plus m\u00e9morable, r\u00e9servez le cr\u00e9neau du coucher du soleil : la golden hour sur la Seine est un spectacle que vous n\u2019oublierez pas. <strong>Le Senang, v\u00e9t\u00e9ran des JO de Paris 2024</strong>, vous offre un cadre d\u2019exception pour votre soir\u00e9e en amoureux.</p>`,
    },
    {
      type: "benefits",
      title: "Pourquoi choisir une croisi\u00e8re romantique sur la Seine ?",
      items: [
        {
          icon: "heart",
          title: "Intimit\u00e9 absolue",
          text: "Bateau privatis\u00e9 rien que pour vous deux (ou votre petit groupe).",
        },
        {
          icon: "champagne",
          title: "Champagne inclus",
          text: "Trinquez face \u00e0 la Tour Eiffel avec la formule festive.",
        },
        {
          icon: "sunset",
          title: "Coucher de soleil",
          text: "R\u00e9servez le cr\u00e9neau golden hour pour un moment magique.",
        },
        {
          icon: "utensils",
          title: "Repas \u00e0 bord",
          text: "Apportez votre pique-nique ou commandez nos planches.",
        },
      ],
    },
    {
      type: "gallery",
      title: "Moments romantiques sur la Seine",
      images: [
        {
          src: "/images/gallery/2025-04-08-a-20.57.33_c61d5f00.webp",
          alt: "Coucher de soleil romantique sur la Seine",
        },
        {
          src: "/images/gallery/2025-03-02-a-21.18.40_52501437.webp",
          alt: "Croisi\u00e8re en amoureux au cr\u00e9puscule \u00e0 Paris",
        },
        {
          src: "/images/gallery/2025-04-08-a-20.58.31_fcc03538.webp",
          alt: "Le Senang naviguant sous les ponts de Paris",
        },
        {
          src: "/images/gallery/2025-04-15-a-22.21.11_0329a51a.webp",
          alt: "Soir\u00e9e romantique \u00e0 bord du Senang",
        },
      ],
    },
    {
      type: "testimonials",
      title: "Ils ont v\u00e9cu la magie",
      filter: "romantique",
    },
    {
      type: "pricing",
      title: "Nos formules pour une soir\u00e9e romantique",
    },
    {
      type: "faq",
      title: "Questions fr\u00e9quentes \u2013 Croisi\u00e8re romantique",
      items: [
        {
          question: "Peut-on r\u00e9server uniquement pour deux personnes ?",
          answer:
            "Absolument ! Le bateau est privatis\u00e9 m\u00eame pour un couple. Le tarif de base couvre 1 \u00e0 6 personnes, vous profitez donc du bateau enti\u00e8rement pour vous.",
        },
        {
          question: "Quel est le meilleur moment pour une croisi\u00e8re romantique ?",
          answer:
            "Le coucher du soleil est le cr\u00e9neau le plus demand\u00e9 : la lumi\u00e8re dor\u00e9e sur les monuments et la Tour Eiffel qui s\u2019illumine cr\u00e9ent un moment magique. R\u00e9servez \u00e0 l\u2019avance pour ce cr\u00e9neau.",
        },
        {
          question: "Peut-on organiser une surprise ?",
          answer:
            "Oui ! Contactez-nous pour pr\u00e9parer une surprise : d\u00e9coration sp\u00e9ciale, champagne, p\u00e9tales de rose\u2026 Nous vous aidons \u00e0 organiser le moment parfait.",
        },
        {
          question: "Peut-on apporter un repas \u00e0 bord ?",
          answer:
            "Oui, vous pouvez pr\u00e9parer un pique-nique gastronomique ou un plateau-repas. Nous proposons \u00e9galement des planches ap\u00e9ritives sur commande.",
        },
        {
          question: "Combien co\u00fbte une croisi\u00e8re romantique ?",
          answer:
            "\u00c0 partir de 360\u00a0\u20ac (formule simple) ou 420\u00a0\u20ac (formule festive avec champagne) pour une croisi\u00e8re priv\u00e9e de 2 heures.",
        },
      ],
    },
  ],
  relatedPages: ["demande-en-mariage-seine", "coucher-soleil-seine", "anniversaire-mariage-seine"],
  jsonLd: {
    type: "TouristAttraction",
    priceFrom: 360,
  },
};
