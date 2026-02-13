import React from 'react';
import { getTranslations } from 'next-intl/server';
import { getAlternates, getOgLocale } from '@/lib/metadata';
import FAQ from '@/views/FAQ';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("faqTitle"),
    description: t("faqDescription"),
    alternates: getAlternates(locale, "/faq"),
    openGraph: { locale: getOgLocale(locale) },
  };
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Quels types d\u2019\u00e9v\u00e9nements puis-je organiser \u00e0 bord du Senang ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Un Bateau \u00e0 Paris offre des croisi\u00e8res priv\u00e9es sur la Seine pour diverses occasions telles que des soir\u00e9es romantiques, des sorties en famille, des r\u00e9unions entre amis ou entre coll\u00e8gues et de nombreux \u00e9v\u00e9nements professionnels.",
      },
    },
    {
      "@type": "Question",
      name: "Comment puis-je r\u00e9server une croisi\u00e8re avec Un Bateau \u00e0 Paris ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Vous pouvez facilement r\u00e9server votre croisi\u00e8re en ligne. Choisissez la date, pr\u00e9cisez le nombre de passagers, l\u2019heure de d\u00e9part souhait\u00e9e et la formule qui correspondent \u00e0 vos pr\u00e9f\u00e9rences, puis validez votre r\u00e9servation.",
      },
    },
    {
      "@type": "Question",
      name: "Comment se passe l\u2019embarquement ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nous vous donnons rendez-vous 15 minutes avant l\u2019heure du d\u00e9part au Port de l\u2019Arsenal \u00e0 Bastille (Paris 12\u00e8me).",
      },
    },
    {
      "@type": "Question",
      name: "Combien \u00e7a co\u00fbte ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le co\u00fbt de la privatisation du bateau est fixe pour 1 \u00e0 6 passagers (600 \u20ac), puis augmente \u00e0 100 \u20ac par personne au-del\u00e0 de 6. Consultez notre section \u00ab Tarifs \u00bb pour plus de d\u00e9tails.",
      },
    },
    {
      "@type": "Question",
      name: "Comment se d\u00e9roule le paiement ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le paiement s\u2019effectue en ligne lors de la r\u00e9servation de mani\u00e8re compl\u00e8tement s\u00e9curis\u00e9e. Nous acceptons les paiements par carte bancaire (Visa, Mastercard).",
      },
    },
    {
      "@type": "Question",
      name: "Quelle est la politique d\u2019annulation ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Consultez notre page \u00ab Conditions G\u00e9n\u00e9rales de Vente \u00bb pour conna\u00eetre notre politique d\u2019annulation d\u00e9taill\u00e9e. En cas d\u2019annulation, nous favorisons dans la mesure du possible la modification.",
      },
    },
    {
      "@type": "Question",
      name: "Y a-t-il des restrictions li\u00e9es \u00e0 la m\u00e9t\u00e9o ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Les croisi\u00e8res priv\u00e9es sur la Seine sont g\u00e9n\u00e9ralement maintenues par tous les temps. En cas de conditions m\u00e9t\u00e9orologiques extr\u00eames, nous vous contacterons pour discuter des options disponibles.",
      },
    },
    {
      "@type": "Question",
      name: "Le bateau est-il accessible aux personnes handicap\u00e9es ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "L\u2019embarquement des passagers se fait avec l\u2019assistance du Capitaine et peut pr\u00e9senter quelques difficult\u00e9s aux personnes \u00e0 mobilit\u00e9 r\u00e9duite.",
      },
    },
    {
      "@type": "Question",
      name: "Vous acceptez les enfants ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Les enfants de tous \u00e2ges sont les bienvenus \u00e0 bord, sous la supervision des adultes les accompagnant tout au long de la croisi\u00e8re.",
      },
    },
    {
      "@type": "Question",
      name: "Les animaux sont-ils admis ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Malheureusement, nos croisi\u00e8res ne sont pas adapt\u00e9es aux compagnons \u00e0 poils. Nous ne pouvons pas accueillir d\u2019animaux \u00e0 bord.",
      },
    },
  ],
};

export default function RouteWrapper() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <FAQ />
    </>
  );
}
