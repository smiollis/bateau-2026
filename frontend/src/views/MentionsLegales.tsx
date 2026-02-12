"use client";

import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useThemeVariant } from "@/contexts/ThemeVariantContext";
import HeaderVariants from "@/components/HeaderVariants";
import FooterVariants from "@/components/FooterVariants";

const MentionsLegales = () => {
  const { isDark } = useThemeVariant();

  return (
    <div className="min-h-screen bg-background">
      <HeaderVariants />
      <main className="pt-24 pb-16">
        <div className="container-custom max-w-4xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </Link>

          <h1 className="font-heading text-4xl md:text-5xl font-semibold text-primary mb-8">
            Informations légales
          </h1>

          <div className="prose prose-lg max-w-none text-foreground/80 space-y-8">
            <p>
              En vertu de l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, il est précisé aux utilisateurs du site https://bateau-a-paris.fr/ l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi.
            </p>

            <p>
              <strong>Propriétaire :</strong> VIVALIS – SARL au capital de 10 000,00 € – 9 Rue Dauphin 94800 Villejuif – Registre du Commerce et des Sociétés de Créteil immatriculé sous le n° 480 018 464
            </p>
            <p><strong>Responsable publication :</strong> VIVALIS – capitaine@bateau-a-paris.fr</p>
            <p>Le responsable publication est une personne morale.</p>
            <p><strong>Hébergeur :</strong> OVH – 2 rue Kellermann, 59100 Roubaix</p>

            <p>
              L'utilisation du site https://bateau-a-paris.fr implique l'acceptation pleine et entière des conditions générales d'utilisation ci-après décrites. Ces conditions d'utilisation sont susceptibles d'être modifiées ou complétées à tout moment, les utilisateurs du site sont donc invités à les consulter de manière régulière.
            </p>

            <p>
              Ce site est normalement accessible à tout moment aux utilisateurs. Une interruption pour raison de maintenance technique peut être toutefois décidée par VIVALIS, qui s'efforcera alors de communiquer préalablement aux utilisateurs les dates et heures de l'intervention.
            </p>

            <h2 className="font-heading text-2xl font-semibold text-primary mt-10">Description des services fournis</h2>
            <p>
              Les renseignements figurant sur le site https://bateau-a-paris.fr ne sont pas exhaustifs. Ils sont donnés sous réserve de modifications ayant été apportées depuis leur mise en ligne.
            </p>

            <h2 className="font-heading text-2xl font-semibold text-primary mt-10">Limitations contractuelles sur les données techniques</h2>
            <p>
              VIVALIS est propriétaire des droits de propriété intellectuelle ou détient les droits d'usage sur tous les éléments accessibles sur le site, notamment les textes, images, graphismes, logo, icônes, sons, logiciels.
            </p>
            <p>
              VIVALIS ne pourra être tenue responsable des dommages directs et indirects causés au matériel de l'utilisateur, lors de l'utilisation du site, soit de l'apparition d'un bug ou d'une incompatibilité.
            </p>
            <p>
              Des espaces interactifs (possibilité de poser des questions dans l'espace contact) sont à la disposition des utilisateurs. VIVALIS se réserve le droit de supprimer, sans mise en demeure préalable, tout contenu déposé dans cet espace qui contreviendrait à la législation applicable en France, en particulier aux dispositions relatives à la protection des données.
            </p>

            <h2 className="font-heading text-2xl font-semibold text-primary mt-10">Gestion des données personnelles</h2>
            <p>
              En France, les données personnelles sont notamment protégées par la loi n° 78-87 du 6 janvier 1978, la loi n° 2004-801 du 6 août 2004, l'article L226-13 du Code pénal et la Directive Européenne du 24 octobre 1995.
            </p>
            <p>
              À l'occasion de l'utilisation du site https://bateau-a-paris.fr, peuvent être recueillies : l'URL des liens par l'intermédiaire desquels l'utilisateur a accédé au site, le fournisseur d'accès de l'utilisateur, l'adresse de protocole Internet (IP) de l'utilisateur.
            </p>
            <p>
              Conformément aux dispositions des articles 38 et suivants de la loi 78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers et aux libertés, tout utilisateur dispose d'un droit d'accès, de rectification et d'opposition aux données personnelles le concernant.
            </p>
            <p>
              Aucune information personnelle de l'utilisateur du site https://bateau-a-paris.fr n'est publiée à l'insu de l'utilisateur, échangée, transférée, cédée ou vendue sur un support quelconque à des tiers.
            </p>

            <h2 className="font-heading text-2xl font-semibold text-primary mt-10">Liens hypertextes et cookies</h2>
            <p>
              La navigation sur le site https://bateau-a-paris.fr est susceptible de provoquer l'installation de cookie(s) sur l'ordinateur de l'utilisateur. Ces cookies ont également vocation à permettre diverses mesures de fréquentation.
            </p>
            <p>
              Le refus d'installation d'un cookie peut entraîner l'impossibilité d'accéder à certains services. L'utilisateur peut toutefois configurer son ordinateur pour refuser l'installation des cookies.
            </p>

            <h2 className="font-heading text-2xl font-semibold text-primary mt-10">Droit applicable et attribution de juridiction</h2>
            <p>
              Tout litige en relation avec l'utilisation du site https://bateau-a-paris.fr est soumis au droit français. Il est fait attribution exclusive de juridiction aux tribunaux compétents de Créteil.
            </p>

            <h2 className="font-heading text-2xl font-semibold text-primary mt-10">Les principales lois concernées</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Loi n° 78-87 du 6 janvier 1978, notamment modifiée par la loi n° 2004-801 du 6 août 2004 relative à l'informatique, aux fichiers et aux libertés.</li>
              <li>Loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique.</li>
            </ul>

            <h2 className="font-heading text-2xl font-semibold text-primary mt-10">Lexique</h2>
            <p>
              <strong>Utilisateur :</strong> Internaute se connectant, utilisant le site susnommé.
            </p>
            <p>
              <strong>Informations personnelles :</strong> « les informations qui permettent, sous quelque forme que ce soit, directement ou non, l'identification des personnes physiques auxquelles elles s'appliquent » (article 4 de la loi n° 78-17 du 6 janvier 1978).
            </p>
          </div>
        </div>
      </main>
      <FooterVariants />
    </div>
  );
};

export default MentionsLegales;
