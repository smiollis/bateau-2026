"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useThemeVariant } from "@/contexts/ThemeVariantContext";
import HeaderVariants from "@/components/HeaderVariants";
import FooterVariants from "@/components/FooterVariants";

const CGV = () => {
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
            Conditions générales de vente
          </h1>

          <div className="prose prose-lg max-w-none text-foreground/80 space-y-8">
            <p>
              Afin de pouvoir bénéficier des prestations proposées par Un Bateau à Paris, nous vous demandons de lire attentivement les conditions générales ci-dessous. Ces conditions régissent les ventes d'excursions proposées par la société. Le fait de réserver une excursion implique l'adhésion complète à nos conditions générales.
            </p>

            <h2 className="font-heading text-2xl font-semibold text-primary mt-10">Conditions de réservation</h2>
            <ul className="list-disc pl-6 space-y-3">
              <li>La réservation devient effective uniquement avec l'accord d'Un Bateau à Paris, après réception du paiement intégral de la prestation. Le paiement implique l'acceptation des conditions générales de vente lors de la réservation en ligne.</li>
              <li>Les réservations ne lient Un Bateau à Paris que si son service de réservation les a acceptées, ce qu'Un Bateau à Paris est libre de faire ou de refuser, en fonction de la disponibilité.</li>
              <li>Un Bateau à Paris propose des excursions sur la Seine à vocation familiale, au sens traditionnel du terme, ses embarcations étant spécialement conçues à cet effet. Un Bateau à Paris se réserve le droit de refuser toute réservation qui serait contraire à ce principe.</li>
              <li>La réservation d'une excursion est faite à titre strictement personnel. Elle ne peut être cédée, partiellement ou dans son intégralité, sans le consentement préalable d'Un Bateau à Paris.</li>
            </ul>

            <h2 className="font-heading text-2xl font-semibold text-primary mt-10">Tarifs</h2>
            <p>
              Les prix indiqués sont valables pour la saison en cours. Ils correspondent à une excursion dont la durée et les horaires sont fixés à l'avance et pour un nombre de passagers initialement indiqués au moment de la réservation. Les prix s'entendent en euros, TVA et taxes portuaires incluses.
            </p>
            <p>
              Un Bateau à Paris se réserve le droit de refuser accès aux embarcations aux groupes ou familles se présentant avec un nombre de participants supérieur au nombre de passagers initialement déclaré au moment de la réservation.
            </p>
            <p>
              Compte tenu des aléas liés à la navigation sur la Seine (passage d'écluses, trafic, météo), la durée réelle de navigation peut fluctuer de 15 minutes minimum en plus ou en moins, par rapport à la durée théorique initialement prévue. Le client consent à en accepter le principe, sans pouvoir exiger une quelconque indemnité.
            </p>

            <h2 className="font-heading text-2xl font-semibold text-primary mt-10">Conditions de paiement</h2>
            <p>
              Le paiement intégral de la prestation doit être effectué au moment de la réservation, soit en payant directement depuis le site internet au moment de la réservation, soit à réception d'une facture éditée par Un Bateau à Paris. La réservation est bloquée à compter de la date d'envoi par voie électronique de la facture et pour une durée de 24 heures.
            </p>

            <h2 className="font-heading text-2xl font-semibold text-primary mt-10">Absence de droit de rétractation</h2>
            <p>
              Conformément à l'article L121-19 du code de la consommation, Un Bateau à Paris informe ses clients que la vente de prestations de services fournies à une date déterminée, ou selon une périodicité déterminée, n'est pas soumise aux dispositions relatives au délai de rétractation de 14 jours.
            </p>

            <h2 className="font-heading text-2xl font-semibold text-primary mt-10">Annulation et modifications</h2>
            <ol className="list-decimal pl-6 space-y-3">
              <li>
                <strong>Modification de réservation :</strong> Le Client peut demander à modifier sa formule d'excursion (date, horaires, nombre de passagers, prestations complémentaires) sur demande écrite auprès d'Un Bateau à Paris (courrier ou e-mail) et jusqu'à 2 jours avant la date de l'excursion. Faute de disponibilités, le Client devra effectuer son excursion dans les conditions initiales de réservation. Aucun report ne sera accepté à la saison suivante.
              </li>
              <li>
                <strong>Non-présentation à l'embarquement :</strong> Non-présentation à l'embarquement ou excursion interrompue ou écourtée de votre fait (arrivée tardive, demande de retour anticipé) ne pourront donner lieu à un quelconque remboursement.
              </li>
              <li>
                <strong>Annulation du fait d'Un Bateau à Paris :</strong> Sauf en cas de force majeure, le séjour sera totalement remboursé. Cette annulation ne pourra cependant pas donner lieu au versement de dommages et intérêts.
              </li>
              <li>
                <strong>Annulation du fait du client :</strong>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Annulation plus de 2 jours avant la date et heure de départ de l'excursion : 50% des sommes versées seront remboursées.</li>
                  <li>Annulation moins de 2 jours avant la date et heure de départ de l'excursion : le client ne pourra prétendre à aucun remboursement.</li>
                </ul>
              </li>
            </ol>
            <p>
              Les conditions météorologiques ne peuvent être un prétexte suffisant à annuler votre excursion. Seul le pilote peut décider, pour des raisons de sécurité ou de contraintes réglementaires, de ne pas procéder à l'embarquement des passagers.
            </p>

            <h2 className="font-heading text-2xl font-semibold text-primary mt-10">Votre excursion</h2>
            <h3 className="font-heading text-xl font-semibold text-primary mt-6">1. Arrivée, embarquement</h3>
            <p>
              Selon les périodes, les jours et heures de départ sont variables (se reporter aux conditions indiquées sur votre formule). L'embarquement a lieu au Port de l'Arsenal à Bastille (12ème) au ponton d'embarquement des passagers.
            </p>

            <h3 className="font-heading text-xl font-semibold text-primary mt-6">2. Pendant votre excursion</h3>
            <p>
              Le client est responsable de la surveillance de ses objets personnels. Un Bateau à Paris décline toute responsabilité en cas de perte ou de vol. Les clients doivent se conformer aux dispositions du règlement intérieur. Chaque client en titre est responsable des troubles et nuisances causées par les personnes qui l'accompagnent.
            </p>

            <h3 className="font-heading text-xl font-semibold text-primary mt-6">3. Départ, débarquement</h3>
            <p>
              En cas de mise à disposition de la cuisine, le bateau devra être rendu en parfait état de propreté. Tout objet manquant, cassé ou détérioré sera à votre charge, ainsi que la remise en état des lieux si cela s'avérait nécessaire.
            </p>

            <h2 className="font-heading text-2xl font-semibold text-primary mt-10">Animaux</h2>
            <p>
              Vous autorisez Un Bateau à Paris à vous photographier, vous enregistrer ou vous filmer pendant votre excursion et à exploiter lesdites images sur tous supports (en particulier sur les sites Internet d'Un Bateau à Paris, sur les supports de présentation et de promotion). Cette autorisation vaut tant pour vous que pour les personnes vous accompagnant, pour une durée de 5 ans.
            </p>

            <h2 className="font-heading text-2xl font-semibold text-primary mt-10">Litige</h2>
            <p>
              Toute réclamation éventuelle concernant la non-conformité des prestations par rapport aux engagements contractuels peut être signalée par courrier ou e-mail à Un Bateau à Paris.
            </p>

            <h2 className="font-heading text-2xl font-semibold text-primary mt-10">Responsabilité d'Un Bateau à Paris</h2>
            <p>
              Les informations fournies par Un Bateau à Paris ou par ses partenaires ne sont pas contractuelles. Elles n'ont qu'un caractère indicatif. Il peut advenir que certaines activités et installations proposées soient supprimées, notamment pour des raisons climatiques ou en cas de force majeure.
            </p>

            <h2 className="font-heading text-2xl font-semibold text-primary mt-10">Informatique et libertés</h2>
            <p>
              Les informations que vous nous communiquez à l'occasion de votre commande ne seront transmises à aucun tiers. Elles seront traitées uniquement par les services internes d'Un Bateau à Paris. Conformément à la loi informatique et des libertés du 6 janvier 1978, vous disposez d'un droit d'accès, de rectification, et d'opposition aux données personnelles vous concernant. Pour cela, il suffit de nous en faire la demande par courrier à l'adresse suivante :
            </p>
            <address className={`not-italic p-4 rounded-lg ${isDark ? "bg-white/5" : "bg-secondary/50"}`}>
              UN BATEAU À PARIS<br />
              9 Rue Dauphin<br />
              F – 94800 VILLEJUIF
            </address>
          </div>
        </div>
      </main>
      <FooterVariants />
    </div>
  );
};

export default CGV;
