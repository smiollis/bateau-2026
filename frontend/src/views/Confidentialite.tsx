"use client";

import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import HeaderVariants from "@/components/HeaderVariants";
import FooterVariants from "@/components/FooterVariants";

const Confidentialite = () => {
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
            Retour à l&apos;accueil
          </Link>

          <h1 className="font-heading text-4xl md:text-5xl font-semibold text-primary mb-8">
            Politique de Confidentialité
          </h1>

          <div className="prose prose-lg max-w-none text-foreground/80 space-y-8">
            <h2 className="font-heading text-2xl font-semibold text-primary mt-10">Propriétaire du site</h2>
            <p>
              Le site bateau-a-paris.fr est exploité par Un Bateau à Paris. Contact : capitaine@bateau-a-paris.fr
            </p>

            <h2 className="font-heading text-2xl font-semibold text-primary mt-10">Données collectées</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Données de navigation : adresse IP, type de navigateur, pages visitées, date/heure de visite</li>
              <li>Données volontaires : nom, email, téléphone (formulaire de contact)</li>
              <li>Cookies : cookies techniques et, avec consentement, cookies analytiques (Google Analytics)</li>
            </ul>

            <h2 className="font-heading text-2xl font-semibold text-primary mt-10">Finalité du traitement</h2>
            <p>
              Répondre aux demandes de contact et devis, gérer les réservations, améliorer le site via statistiques anonymisées, assurer le fonctionnement technique du site.
            </p>

            <h2 className="font-heading text-2xl font-semibold text-primary mt-10">Base légale (RGPD Art. 6)</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Consentement pour les cookies analytiques et marketing</li>
              <li>Intérêt légitime pour le traitement des demandes de contact</li>
              <li>Obligation légale pour la conservation des données de facturation</li>
            </ul>

            <h2 className="font-heading text-2xl font-semibold text-primary mt-10">Durée de conservation</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Cookies : selon vos paramètres</li>
              <li>Données de contact : 3 ans après le dernier échange</li>
              <li>Données de réservation : durée légale de conservation comptable</li>
            </ul>

            <h2 className="font-heading text-2xl font-semibold text-primary mt-10">Partage des données</h2>
            <p>
              Google Analytics (avec consentement uniquement). Les données ne sont pas revendues à des tiers. Hébergement en France/UE.
            </p>

            <h2 className="font-heading text-2xl font-semibold text-primary mt-10">Vos droits (RGPD Art. 15 à 22)</h2>
            <p>
              Vous disposez des droits suivants : accès, rectification, effacement, portabilité, opposition, limitation du traitement. Pour exercer vos droits, contactez-nous à capitaine@bateau-a-paris.fr.
            </p>

            <h2 className="font-heading text-2xl font-semibold text-primary mt-10">Sécurité</h2>
            <p>
              Connexion HTTPS, accès restreint aux données, serveurs sécurisés.
            </p>

            <h2 className="font-heading text-2xl font-semibold text-primary mt-10">Cookies</h2>
            <p>
              Cookies strictement nécessaires (pas de consentement requis). Cookies analytiques Google Analytics (soumis au consentement via notre bandeau cookies). Aucun cookie publicitaire.
            </p>
            <p>
              Vous pouvez modifier vos préférences à tout moment via le bandeau cookies.
            </p>

            <h2 className="font-heading text-2xl font-semibold text-primary mt-10">Modification de cette politique</h2>
            <p>
              Dernière mise à jour : février 2026. Nous nous réservons le droit de modifier cette politique. Les modifications seront publiées sur cette page.
            </p>
          </div>
        </div>
      </main>
      <FooterVariants />
    </div>
  );
};

export default Confidentialite;
